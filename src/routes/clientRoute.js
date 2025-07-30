const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');
const { v4: uuidv4 } = require('uuid');
const { getUserEmails } = require('../utils/userEmailManager');
const { generatePasswordSetupToken, authenticateClient, validateClientActiveStatus } = require('../utils/clientCredentialsManager');
const axios = require('axios');
const { Redis } = require('@upstash/redis');
require('dotenv').config();

/**
 * CLIENT ROUTES - ServiceM8 Integration (READ-ONLY)
 * 
 * IMPORTANT: ServiceM8 client data is READ-ONLY. All create, update, and delete operations
 * for client data have been disabled to ensure data integrity.
 * 
 * ALLOWED OPERATIONS:
 * - Read/View client data from ServiceM8
 * - Client authentication and session management
 * - Dashboard statistics and data display
 * 
 * DISABLED OPERATIONS:
 * - Client creation (POST /clients)
 * - Client updates (PUT /clients/:uuid)
 * - Client status updates (PUT /clients/:uuid/status)
 * - Client mapping creation/updates/deletion (POST/PUT/DELETE /clients/mappings/*)
 * - Username assignment (POST /clients/:uuid/assign-username)
 * 
 * All disabled endpoints return HTTP 410 (Gone) with appropriate error messages.
 */

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:5000';

// Initialize Redis client for data storage
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

// Cache for client status validation (5 minute TTL)
const CLIENT_STATUS_CACHE_TTL = 5 * 60; // 5 minutes in seconds

// Constants for quotes system
const QUOTES_KEY = 'quotes_data'; // Redis key for storing quotes

// Helper function to read quotes data directly from Redis
const readQuotesData = async () => {
    try {
        // Try to get quotes from Redis
        const quotesData = await redis.get(QUOTES_KEY);
        
        // If no data exists yet, return empty array
        if (!quotesData) {
            return [];
        }
        
        return quotesData;
    } catch (error) {
        console.error('Error reading quotes data from Redis:', error);
        return [];
    }
};

// Helper function to cache client status
const cacheClientStatus = async (clientUuid, isActive) => {
    try {
        const cacheKey = `client:status:${clientUuid}`;
        const statusData = {
            clientUuid,
            isActive,
            cachedAt: new Date().toISOString()
        };
        
        await redis.setex(cacheKey, CLIENT_STATUS_CACHE_TTL, JSON.stringify(statusData));
        console.log(`Cached status for client ${clientUuid}: ${isActive ? 'active' : 'inactive'}`);
        return true;
    } catch (error) {
        console.error('Error caching client status:', error);
        return false;
    }
};

// Helper function to get cached client status
const getCachedClientStatus = async (clientUuid) => {
    try {
        const cacheKey = `client:status:${clientUuid}`;
        const statusDataStr = await redis.get(cacheKey);
        
        if (statusDataStr) {
            const statusData = typeof statusDataStr === 'string' ? JSON.parse(statusDataStr) : statusDataStr;
            if (statusData && statusData.isActive !== undefined) {
                console.log(`Using cached status for client ${clientUuid}: ${statusData.isActive ? 'active' : 'inactive'}`);
                return statusData.isActive;
            }
        }
        
        return null; // No cached data
    } catch (error) {
        console.error('Error getting cached client status:', error);
        return null;
    }
};

// Middleware to ensure a valid token for all client routes
const ensureValidToken = async (req, res, next) => {
    try {
        // This will refresh the token if it's expired
        const accessToken = await getValidAccessToken();
        
        // Store the token in the request for route handlers to use
        req.accessToken = accessToken;
        
        // Set the auth for the ServiceM8 API
        servicem8.auth(accessToken);
        
        next();
    } catch (error) {
        console.error('Token validation error:', error);
        return res.status(401).json({
            error: true,
            message: 'Failed to authenticate with ServiceM8. Please try again.'
        });
    }
};

// Middleware to validate client active status for API protection
const validateClientAccess = async (req, res, next) => {
    try {        // Extract client UUID from request - check multiple possible sources
        const clientUuid = req.params.clientId || 
                          req.params.uuid || 
                          req.headers['x-client-uuid'] || 
                          (req.body && req.body.clientUuid) ||
                          req.query.clientId ||
                          req.query.uuid;
        
        // Add debug logging for client UUID extraction
        if (process.env.NODE_ENV === 'development') {
            console.log('Client UUID extraction debug:', {
                path: req.path,
                method: req.method,
                params: req.params,
                headers: {
                    'x-client-uuid': req.headers['x-client-uuid']
                },
                body: req.body ? { hasClientUuid: !!req.body.clientUuid } : null,
                query: req.query,
                extractedClientUuid: clientUuid
            });
        }
        
        if (!clientUuid) {
            // For routes that don't have client-specific data, skip this check
            console.log(`No client UUID found in request to ${req.path}, skipping client validation`);
            return next();
        }
        
        // Special handling for clientLogin route - don't validate the URL param UUID
        if (req.path.includes('/clientLogin/')) {
            console.log(`Skipping validation for clientLogin route: ${req.path}`);
            return next();
        }
        
        // Check if we have cached status
        const cachedStatus = await getCachedClientStatus(clientUuid);
        if (cachedStatus === false) {
            console.log(`API access blocked - cached status shows client is inactive: ${clientUuid}`);
            return res.status(403).json({
                error: 'Account access has been restricted. Please contact support.',
                code: 'ACCOUNT_DEACTIVATED',
                message: 'Client account has been deactivated'
            });
        }
        
        if (cachedStatus === true) {
            console.log(`Using cached status for client ${clientUuid}: active`);
            // Client is cached as active, proceed without API call
            req.clientUuid = clientUuid;
            return next();
        }
        
        // No cached status, try to validate with ServiceM8
        try {
            const accessToken = req.accessToken || await getValidAccessToken();
            servicem8.auth(accessToken);
            
            // Use a timeout to prevent hanging
            const statusCheck = await Promise.race([
                validateClientActiveStatus(clientUuid, servicem8),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Status check timeout')), 5000)
                )
            ]);
            
            // Cache the result
            await cacheClientStatus(clientUuid, statusCheck.isActive);
            
            if (!statusCheck.isActive) {
                console.log(`API access blocked for deactivated client: ${clientUuid}`);
                return res.status(403).json({
                    error: 'Account access has been restricted. Please contact support.',
                    code: 'ACCOUNT_DEACTIVATED',
                    message: statusCheck.message
                });
            }
        } catch (statusError) {
            // Log the error and allow access (fallback behavior)
            console.warn(`Status check failed for client ${clientUuid}, allowing access:`, statusError.message);
            
            // Cache as active since we couldn't verify otherwise
            await cacheClientStatus(clientUuid, true);
        }
        
        // Client passed validation, allow access
        req.clientUuid = clientUuid;
        next();
    } catch (error) {
        console.error('Error validating client access:', error);
        
        // Final fallback - allow access but log the error
        const clientUuid = req.params.clientId || 
                          req.params.uuid || 
                          req.headers['x-client-uuid'] || 
                          (req.body && req.body.clientUuid);
        if (clientUuid) {
            req.clientUuid = clientUuid;
            return next();
        }
        
        return res.status(403).json({
            error: 'Unable to verify account access. Please try again later.',
            code: 'ACCESS_VERIFICATION_FAILED'
        });
    }
};

// Apply the token middleware to routes that need ServiceM8 access (exclude auth-related routes)
const skipAuthRoutes = ['/password-setup', '/client-login', '/validate-setup-token'];
const skipClientValidationRoutes = [
    '/password-setup', 
    '/client-login', 
    '/validate-setup-token', 
    '/clients', 
    '/client-details',
    '/dashboard-stats',
    '/client-cache'
];

router.use((req, res, next) => {
    // Skip authentication for setup and login routes
    if (skipAuthRoutes.some(route => req.path.includes(route))) {
        return next();
    }
    // Apply authentication for other routes
    return ensureValidToken(req, res, next);
});

router.use((req, res, next) => {
    // Skip client validation for auth routes and admin routes
    if (skipClientValidationRoutes.some(route => req.path.includes(route))) {
        return next();
    }
    
    // Skip client validation for GET requests to /clients endpoint (admin functionality)
    if (req.method === 'GET' && req.path === '/clients') {
        return next();
    }
    
    // Apply client active status validation for client-specific routes
    return validateClientAccess(req, res, next);
});

// GET route to fetch all clients
router.get('/clients', async (req, res) => {
    try {
        const { data } = await servicem8.getCompanyAll();
        res.json(data);
    } catch (err) {
        console.error('Error fetching clients from ServiceM8:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch clients from ServiceM8' });
    }
});

// POST route to register a new client (DISABLED - Use User Management instead)
router.post('/clients', async (req, res) => {
    return res.status(410).json({
        error: 'Client creation has been disabled',
        message: 'Client creation functionality has been moved to User Management. Please use the User Management section in the admin panel to create new users.',
        redirect: '/admin/users'
    });
});

// Route to check if a client exists by UUID
router.get('/clientLogin/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;

        const { data } = await servicem8.getCompanySingle({ uuid });
        
        if (data) {
            res.status(200).json({ exists: true, client: data });
        } else {
            res.status(404).json({ exists: false, message: 'Client not found' });
        }
    } catch (err) {
        console.error('Error fetching client:', err.response?.data || err.message);
        
        if (err.status === 404) {
            return res.status(404).json({ exists: false, message: 'Client not found' });
        }
        
        res.status(500).json({ error: 'Failed to fetch client', details: err.response?.data });
    }
});

// Helper function to get portal URL
const getPortalUrl = () => {
    return process.env.PORTAL_URL || 'http://localhost:3000';
};

// Helper function to send notification for client events
// Helper function to send notification for client events (DISABLED)
// This function is disabled since client creation/updates are no longer allowed
const sendClientNotification = async (type, clientData, userId) => {
    console.warn('sendClientNotification called but client modifications are disabled');
    return false;
};

// Helper function to send welcome email to new clients (DISABLED)
// This function is disabled since client creation is no longer allowed
const sendClientWelcomeEmail = async (clientData) => {
    console.warn('sendClientWelcomeEmail called but client creation is disabled');
    return false;
};

// PUT route to update a client
// Client dashboard stats route
// Client dashboard stats route
router.get('/dashboard-stats/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params;
        
        // Handle 'default' clientId - return mock data for demo purposes
        if (!clientId || clientId === 'default' || clientId === 'null' || clientId === 'undefined') {
            console.log('Using default client data as no valid clientId was provided');
            const mockData = createMockDashboardData();
            return res.json(mockData);
        }        // Get jobs filtered by client UUID - Enhanced to handle parent-child company relationships
        let allJobs = [];
        let relatedCompanyUuids = [clientId]; // Start with the main client ID
        
        try {
            // First, get all companies to find parent-child relationships
            const companiesResponse = await servicem8.getCompanyAll();
            const allCompanies = companiesResponse.data || [];
            
            // console.log(`Dashboard: Analy
            // zing company relationships for client ${clientId}`);
            
            // Find the current client company
            const currentClient = allCompanies.find(company => company.uuid === clientId);
            
            if (currentClient) {
                // console.log(`Dashboard: Found client company: ${currentClient.name}`);
                
                // If this is a parent company, find all child companies
                const childCompanies = allCompanies.filter(company => 
                    company.parent_uuid === clientId || 
                    company.parent_company_uuid === clientId ||
                    company.company_parent_uuid === clientId
                );
                
                if (childCompanies.length > 0) {
                    const childUuids = childCompanies.map(child => child.uuid);
                    relatedCompanyUuids = relatedCompanyUuids.concat(childUuids);
                    // console.log(`Dashboard: Found ${childCompanies.length} child companies:`, childCompanies.map(c => c.name));
                    // console.log(`Dashboard: Child UUIDs:`, childUuids);
                }
                
                // If this is a child company, also include the parent
                if (currentClient.parent_uuid || currentClient.parent_company_uuid || currentClient.company_parent_uuid) {
                    const parentUuid = currentClient.parent_uuid || currentClient.parent_company_uuid || currentClient.company_parent_uuid;
                    if (!relatedCompanyUuids.includes(parentUuid)) {
                        relatedCompanyUuids.push(parentUuid);
                        console.log(`Dashboard: Added parent company UUID: ${parentUuid}`);
                    }
                    
                    // Also find sibling companies (other children of the same parent)
                    const siblingCompanies = allCompanies.filter(company => 
                        (company.parent_uuid === parentUuid || 
                         company.parent_company_uuid === parentUuid ||
                         company.company_parent_uuid === parentUuid) &&
                        company.uuid !== clientId
                    );
                    
                    if (siblingCompanies.length > 0) {
                        const siblingUuids = siblingCompanies.map(sibling => sibling.uuid);
                        relatedCompanyUuids = relatedCompanyUuids.concat(siblingUuids.filter(uuid => !relatedCompanyUuids.includes(uuid)));
                        // console.log(`Dashboard: Found ${siblingCompanies.length} sibling companies:`, siblingCompanies.map(c => c.name));
                    }
                }
            }
            
            // console.log(`Dashboard: Total related company UUIDs: ${relatedCompanyUuids.length}`, relatedCompanyUuids);
            
            // Now get jobs for all related companies
            const jobResponse = await servicem8.getJobAll();
            const allJobsData = jobResponse.data || [];
            
            // Enhanced filtering to include parent-child relationships
            allJobs = allJobsData.filter(job => {
                return relatedCompanyUuids.includes(job.company_uuid) || 
                       relatedCompanyUuids.includes(job.created_by_staff_uuid) ||
                       relatedCompanyUuids.includes(job.client_uuid);
            });
            
            // console.log(`Dashboard: Found ${allJobs.length} jobs for client ${clientId} and related companies out of ${allJobsData.length} total jobs`);
            
            // Log job distribution by company
            const jobsByCompany = {};
            allJobs.forEach(job => {
                const companyUuid = job.company_uuid || job.created_by_staff_uuid || job.client_uuid;
                const company = allCompanies.find(c => c.uuid === companyUuid);
                const companyName = company ? company.name : companyUuid;
                jobsByCompany[companyName] = (jobsByCompany[companyName] || 0) + 1;
            });
            
            // console.log(`Dashboard: Jobs by company:`, jobsByCompany);
            
        } catch (jobErr) {
            console.error('Error fetching jobs or companies:', jobErr.response?.data || jobErr.message);
            // Fallback to original logic if company relationship lookup fails
            try {
                const jobResponse = await servicem8.getJobAll();
                const allJobsData = jobResponse.data || [];
                
                allJobs = allJobsData.filter(job => {
                    return job.company_uuid === clientId || 
                           job.created_by_staff_uuid === clientId ||
                           job.client_uuid === clientId;
                });
                
                // console.log(`Dashboard: Fallback - Found ${allJobs.length} jobs for client ${clientId}`);
            } catch (fallbackErr) {
                console.error('Error in fallback job fetching:', fallbackErr);
            }
        }        // Get quotes from ServiceM8 jobs - same system as work orders
        let allQuotes = [];
        // console.log(`🔍 DASHBOARD: Filtering quotes from ServiceM8 jobs for client ${clientId}`);
        
        // Filter jobs to only include ACTIVE Quotes
        allQuotes = allJobs.filter(job => {
            // First check if job is active
            const isActive = job.active === 1 || job.active === '1' || job.active === true;
            
            // Then check if it's a quote
            const isQuote = job.status === 'Quote' || job.status === 'Quotes';
            
            // console.log(`🔍 DASHBOARD: Job ${job.uuid}: active=${job.active}, status="${job.status}", isActive=${isActive}, isQuote=${isQuote}`);
            
            return isActive && isQuote;
        });
        
        // console.log(`✅ DASHBOARD: Found ${allQuotes.length} quote jobs for client ${clientId} from ServiceM8 jobs`);
          // Get upcoming services - filtered by client
        let upcomingServices = [];
        try {
            // Try to get job activities as upcoming services
            const activityResponse = await servicem8.getJobActivityAll();
            const today = new Date().toISOString().split('T')[0];
            const allActivities = activityResponse.data || [];
            
            // Filter activities for this client's jobs and upcoming dates
            const clientJobUuids = allJobs.map(job => job.uuid);
            upcomingServices = allActivities
                .filter(activity => {
                    return activity.date >= today && 
                           clientJobUuids.includes(activity.job_uuid);
                })
                .slice(0, 5); // Limit to 5 upcoming services
                
            // console.log(`Dashboard: Found ${upcomingServices.length} upcoming services for client ${clientId}`);
        } catch (serviceErr) {
            console.error('Error fetching services:', serviceErr.response?.data || serviceErr.message);
        }        // Recent activities - filtered by client jobs
        let recentActivity = [];
        try {
            // Use client's job data for activities, sort by date descending (newest first)
            recentActivity = allJobs
                .map(job => ({
                    uuid: job.uuid,
                    activity_type: job.status === 'Quote' ? 'quote_sent' : 
                                job.status === 'Completed' ? 'job_completed' : 'job_created',
                    title: job.job_name || job.description || 'Job Update',
                    description: job.description || job.job_description || '',
                    date: job.date || job.job_date || new Date().toISOString().split('T')[0]
                }))
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort newest first
                .slice(0, 10); // Take top 10 most recent
                
            // console.log(`Dashboard: Created ${recentActivity.length} recent activities for client ${clientId} (sorted newest first)`);
        } catch (activityErr) {
            console.error('Error creating activity feed:', activityErr);
        }
          // Filter jobs to only include ACTIVE Work Orders (exclude quotes)
        const workOrderJobs = allJobs.filter(job => {
            // First check if job is active
            const isActive = job.active === 1 || job.active === '1' || job.active === true;
            
            // Then check if it's a work order (not a quote)
            const isWorkOrder = job.status === 'Work Order' || 
                               job.type === 'Work Order' ||
                               (job.status !== 'Quote' && job.status !== 'Quotes' && job.status !== 'Unsuccessful' && job.status !== 'Cancelled');
            
            // console.log(`🔍 DASHBOARD: Work Order Job ${job.uuid}: active=${job.active}, status="${job.status}", isActive=${isActive}, isWorkOrder=${isWorkOrder}`);
            
            return isActive && isWorkOrder;
        });
        
        // console.log(`Dashboard: Filtered to ${workOrderJobs.length} work order jobs out of ${allJobs.length} total jobs`);
        
        // Calculate statistics - Work Orders and Quotes from ServiceM8 jobs
        const stats = {
            activeJobs: workOrderJobs.filter(job => job.status !== 'Completed').length,
            inProgressJobs: workOrderJobs.filter(job => job.status === 'In Progress' || job.status === 'Work Order').length,
            pendingQuotes: allQuotes.length, // Quotes from ServiceM8 jobs
            quotesTotalValue: allQuotes.reduce((sum, quote) => {
                // Handle ServiceM8 job format
                const amount = quote.total_amount || quote.total_invoice_amount || quote.price || 0;
                return sum + parseFloat(amount || 0);
            }, 0).toFixed(2),
            completedJobs: workOrderJobs.filter(job => job.status === 'Completed').length,
            completedJobsLast30Days: workOrderJobs.filter(job => {
                return job.status === 'Completed' && 
                       job.completed_date && 
                       new Date(job.completed_date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            }).length,
            upcomingServices: upcomingServices.length,
            nextServiceDate: upcomingServices.length > 0 ? 
                upcomingServices[0].date : null,
            // Add status percentages for the progress bars
            statusBreakdown: {
                quotes: allJobs.length ? (allQuotes.length / allJobs.length * 100).toFixed(1) : 0,
                inProgress: workOrderJobs.length ? (workOrderJobs.filter(j => j.status === 'In Progress' || j.status === 'Work Order').length / workOrderJobs.length * 100).toFixed(1) : 0,
                scheduled: workOrderJobs.length ? (workOrderJobs.filter(j => j.status === 'Scheduled').length / workOrderJobs.length * 100).toFixed(1) : 0,
                completed: workOrderJobs.length ? (workOrderJobs.filter(j => j.status === 'Completed').length / workOrderJobs.length * 100).toFixed(1) : 0
            }
        };
        
        // console.log(`📊 DASHBOARD: Final stats - Work Orders: ${workOrderJobs.length}, Quotes: ${allQuotes.length}, Total Jobs: ${allJobs.length}`);
          // Format job data to include only Work Orders
        const formattedJobs = workOrderJobs.map(job => ({
            id: job.uuid,
            jobNumber: job.generated_job_id || job.uuid?.substring(0, 8), // Use ServiceM8's generated job ID
            title: job.job_name || job.description || 'Untitled Job',
            status: job.status,
            date: job.job_date || job.date,
            dueDate: job.due_date,
            completedDate: job.completed_date,
            type: 'Work Order',
            description: job.description || job.job_description || '',
            assignedTech: job.assigned_to_name || '',
            location: job.site_name || job.job_address || 'Main Location',
            attachments: job.attachments_count || 0
        }));        const formattedQuotes = allQuotes.map(quote => ({
            id: quote.uuid,
            quoteNumber: quote.generated_job_id || quote.uuid?.substring(0, 8), // Use ServiceM8's generated job ID
            title: quote.job_name || quote.description || 'Untitled Quote',
            status: quote.status,
            date: quote.job_date || quote.date,
            dueDate: quote.due_date,
            type: 'Quote',
            price: parseFloat(quote.total_amount || quote.total_invoice_amount || quote.price || 0).toFixed(2),
            description: quote.description || quote.job_description || '',
            location: quote.site_name || quote.job_address || 'Main Location',
            attachments: quote.attachments_count || 0
        }));
        
        // Format upcoming services
        const formattedServices = upcomingServices.map(service => ({
            id: service.uuid,
            title: service.job_name || service.description || 'Scheduled Service',
            date: service.date,
            startTime: service.start_time || '09:00',
            endTime: service.finish_time || '10:00',
            technician: service.staff_name || 'Unassigned',
            location: service.address || 'Main Location'
        }));
          // Format activity feed
        const formattedActivity = recentActivity.map(activity => {
            let type = 'other';
            if (activity.activity_type === 'job_created') type = 'job_created';
            else if (activity.activity_type === 'quote_sent') type = 'quote_received';
            else if (activity.activity_type === 'job_completed') type = 'job_completed';
            else if (activity.activity_type === 'document_uploaded') type = 'document_uploaded';
            else if (activity.activity_type === 'invoice_paid') type = 'invoice_paid';
            
            return {
                id: activity.uuid,
                type,
                title: activity.title || (activity.activity_type ? activity.activity_type.replace('_', ' ') : 'Activity'),
                description: activity.description || '',
                date: activity.date || new Date().toISOString().split('T')[0]
            };
        }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Ensure final sorting by date descending (newest first)
          // If no real data found for this client, return mock data for demo purposes
        if (allJobs.length === 0 && allQuotes.length === 0 && upcomingServices.length === 0) {
            console.log(`No real data found for client ${clientId}, returning mock data for demo`);
            const mockData = createMockDashboardData();
            return res.json(mockData);
        }

        // Return the formatted data
        const responseData = {
            stats,
            jobs: formattedJobs,
            quotes: formattedQuotes,
            upcomingServices: formattedServices,
            recentActivity: formattedActivity
        };
        
        // console.log(`📤 DASHBOARD: Sending response - Jobs: ${formattedJobs.length}, Quotes: ${formattedQuotes.length}, Stats.pendingQuotes: ${stats.pendingQuotes}`);
        
        res.json(responseData);
        
    } catch (err) {
        // console.error('Error fetching dashboard data:', err.response?.data || err.message);
        // Fallback to mock data on error
        console.log(`Error occurred for client ${clientId}, returning mock data as fallback`);
        const mockData = createMockDashboardData();
        res.json(mockData);
    }
});

// Helper function to create mock data when the API fails
function createMockDashboardData() {
    return {
        stats: {
            activeJobs: 3,
            inProgressJobs: 1,
            pendingQuotes: 1,
            quotesTotalValue: "4850.00",
            completedJobs: 1,
            completedJobsLast30Days: 1,
            upcomingServices: 2,
            nextServiceDate: "2025-05-15",
            statusBreakdown: {
                quotes: "25.0",
                inProgress: "25.0",
                scheduled: "25.0",
                completed: "25.0"
            }
        },
        jobs: [
            {
                id: 'JOB-2025-0423',
                jobNumber: 'JOB-2025-0423',
                title: 'Network Installation',
                status: 'In Progress',
                date: '2025-05-01',
                dueDate: '2025-05-20',
                type: 'Work Order',
                description: 'Install new network infrastructure including switches and access points',
                assignedTech: 'Alex Johnson',
                location: 'Main Office',
                attachments: 2
            },
            {
                id: 'JOB-2025-0418',
                jobNumber: 'JOB-2025-0418',
                title: 'Digital Signage Installation',
                status: 'Completed',
                date: '2025-04-10',
                completedDate: '2025-04-15',
                type: 'Work Order',
                description: 'Install 3 digital signage displays in reception area',
                assignedTech: 'Sarah Davis',
                location: 'Main Office',
                attachments: 3
            },
            {
                id: 'JOB-2025-0415',
                jobNumber: 'JOB-2025-0415',
                title: 'Surveillance System Maintenance',
                status: 'Scheduled',
                date: '2025-05-20',
                type: 'Work Order',
                description: 'Routine maintenance check on surveillance system',
                assignedTech: 'Miguel Rodriguez',
                location: 'Branch Office',
                attachments: 0
            }
        ],
        quotes: [
            {
                id: 'QUOTE-2025-0422',
                quoteNumber: 'QUOTE-2025-0422',
                title: 'Security System Upgrade',
                status: 'Quote',
                date: '2025-05-02',
                dueDate: '2025-05-25',
                type: 'Quote',
                price: "4850.00",
                description: 'Upgrade existing security cameras to 4K resolution',
                location: 'Warehouse',
                attachments: 1
            }
        ],
        upcomingServices: [
            { 
                id: 1, 
                title: 'Surveillance System Maintenance', 
                date: '2025-05-20', 
                startTime: '09:00',
                endTime: '11:00',
                technician: 'Miguel Rodriguez', 
                location: 'Branch Office' 
            },
            { 
                id: 2, 
                title: 'Network Performance Review', 
                date: '2025-05-28', 
                startTime: '13:00',
                endTime: '15:00',
                technician: 'Alex Johnson', 
                location: 'Main Office' 
            }        ],
        recentActivity: [
            { id: 5, type: 'invoice_paid', title: 'Invoice Paid', description: 'INV-2025-0056', date: '2025-05-05' },
            { id: 2, type: 'quote_received', title: 'New Quote Received', description: 'Security System Upgrade', date: '2025-05-02' },
            { id: 1, type: 'job_created', title: 'New Job Request Created', description: 'Network Installation', date: '2025-05-01' },
            { id: 4, type: 'document_uploaded', title: 'Document Uploaded', description: 'Network Diagram.pdf', date: '2025-04-20' },
            { id: 3, type: 'job_completed', title: 'Job Completed', description: 'Digital Signage Installation', date: '2025-04-15' }
        ]};
}

// Route to get client details by UUID (new endpoint for proper name resolution)
router.get('/client-details/:uuid', async (req, res) => {
    try {
        const accessToken = await refreshAccessToken();
        servicem8.auth(accessToken);

        const { uuid } = req.params;

        const clientData = await handleServiceM8Request(() =>
            servicem8.getCompanySingle({ uuid })
        );

        if (clientData && clientData.data) {
            res.status(200).json({ 
                success: true, 
                client: {
                    uuid: clientData.data.uuid,
                    name: clientData.data.name,
                    email: clientData.data.email,
                    phone: clientData.data.phone,
                    address: clientData.data.address,
                    address_city: clientData.data.address_city,
                    address_state: clientData.data.address_state,
                    address_postcode: clientData.data.address_postcode,
                    address_country: clientData.data.address_country
                }
            });
        } else {
            res.status(404).json({ success: false, message: 'Client not found' });
        }
    } catch (err) {
        console.error('Error fetching client details:', err.response?.data || err.message);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch client details', 
            details: err.response?.data        });
    }
});

// Route for client login with email and password
router.post('/client-login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email and password are required' 
            });
        }

        // Get a valid access token for ServiceM8 API calls
        const accessToken = await getValidAccessToken();
        servicem8.auth(accessToken);

        // Authenticate client using the credentials manager with active status check
        const authResult = await authenticateClient(email, password, servicem8);

        if (authResult.success) {
            // Fetch client data from ServiceM8 using the UUID
            try {
                const { data: clientData } = await servicem8.getCompanySingle({ 
                    uuid: authResult.clientUuid 
                });
                
                // Double-check active status here as well for extra security
                if (!clientData || clientData.active === 0) {
                    console.log(`Login blocked: Client ${authResult.clientUuid} is deactivated`);
                    return res.status(403).json({ 
                        error: 'Your account has been deactivated. Please contact support.',
                        code: 'ACCOUNT_DEACTIVATED'
                    });
                }
                
                res.status(200).json({ 
                    success: true,
                    client: {
                        ...clientData,
                        email: email // Add email back since ServiceM8 doesn't store it
                    },
                    message: 'Login successful'
                });
            } catch (fetchError) {
                console.error('Error fetching client data after authentication:', fetchError);
                res.status(500).json({ 
                    error: 'Authentication successful but failed to fetch client data' 
                });
            }
        } else {
            // Check if this is a deactivation error
            if (authResult.message.includes('deactivated')) {
                res.status(403).json({ 
                    error: authResult.message,
                    code: 'ACCOUNT_DEACTIVATED'
                });
            } else {
                res.status(401).json({ 
                    error: authResult.message 
                });
            }
        }
    } catch (error) {
        console.error('Error in client login:', error);
        res.status(500).json({ 
            error: 'Internal server error during login' 
        });
    }
});

// Route for password setup (used when client first sets up their account)
router.post('/api/password-setup', async (req, res) => {
    try {
        console.log('Password setup request received:', { 
            hasToken: !!req.body.token, 
            hasPassword: !!req.body.password,
            tokenLength: req.body.token?.length,
            body: { ...req.body, password: req.body.password ? '[HIDDEN]' : undefined }
        });

        const { token, password } = req.body;

        if (!token || !password) {
            console.log('Missing token or password:', { token: !!token, password: !!password });
            return res.status(400).json({ 
                error: 'Token and password are required',
                details: {
                    tokenProvided: !!token,
                    passwordProvided: !!password
                }
            });
        }        // Import the validation and consumption functions
        const { consumePasswordSetupToken, storeClientCredentials } = require('../utils/clientCredentialsManager');

        console.log('Consuming token for password setup...');
        // Validate and consume the setup token (single use)
        const tokenData = await consumePasswordSetupToken(token);

        if (!tokenData.valid) {
            console.log('Token validation failed:', tokenData);
            return res.status(400).json({ 
                error: 'Invalid or expired setup token',
                message: tokenData.message || 'Token validation failed'
            });
        }

        console.log('Token valid, storing credentials for:', tokenData.email);
        // Store the client's credentials
        const success = await storeClientCredentials(
            tokenData.email, 
            password, 
            tokenData.clientUuid
        );

        if (success) {
            console.log('Password setup completed successfully for:', tokenData.email);
            res.status(200).json({ 
                success: true, 
                message: 'Password setup completed successfully',
                email: tokenData.email
            });
        } else {
            console.log('Failed to store credentials for:', tokenData.email);
            res.status(500).json({ 
                error: 'Failed to store credentials' 
            });
        }
    } catch (error) {
        console.error('Error in password setup:', error);
        res.status(500).json({ 
            error: 'Internal server error during password setup',
            details: error.message
        });
    }
});

// Route to validate a password setup token (for frontend validation)
router.get('/validate-setup-token/:token', async (req, res) => {
    try {
        const { token } = req.params;
        console.log('Token validation request received for token:', token?.substring(0, 10) + '...');

        const { validatePasswordSetupToken } = require('../utils/clientCredentialsManager');
        const tokenData = await validatePasswordSetupToken(token);
        
        console.log('Token validation result:', { valid: tokenData.valid, email: tokenData.email });

        if (tokenData.valid) {
            // Fetch client name from ServiceM8 (only if we have valid ServiceM8 auth)
            let clientName = 'Client';
            try {
                // Skip ServiceM8 fetch for now since this route doesn't have auth
                console.log('Skipping ServiceM8 client name fetch for setup validation');
            } catch (fetchError) {
                console.error('Error fetching client name:', fetchError);
                // Continue with default name
            }

            res.status(200).json({ 
                valid: true, 
                email: tokenData.email,
                clientName: clientName
            });
        } else {
            res.status(400).json({ 
                valid: false, 
                message: 'Invalid or expired setup token'
            });
        }
    } catch (error) {
        console.error('Error validating setup token:', error);
        res.status(500).json({ 
            error: 'Internal server error during token validation' 
        });    }
});

// ========== CLIENT NAME MAPPING ROUTES (READ-ONLY) ==========
// NOTE: Create, Update, Delete operations are disabled for ServiceM8 client data

// Helper function to get all client name mappings (READ-ONLY)
const getAllClientNameMappings = async () => {
    try {
        const indexKey = 'client:name_mappings_index';
        const mappingIndex = await redis.get(indexKey) || [];
        
        if (!Array.isArray(mappingIndex) || mappingIndex.length === 0) {
            return [];
        }
        
        // Fetch all mappings
        const mappings = [];
        for (const indexItem of mappingIndex) {
            const mappingKey = `client:name_mapping:${indexItem.id}`;
            const mapping = await redis.get(mappingKey);
            if (mapping) {
                mappings.push(mapping);
            }
        }
        
        return mappings;
    } catch (error) {
        console.error('Error getting client name mappings:', error);
        return [];
    }
};

// Helper functions for create/update/delete operations (DISABLED)
// These functions are kept for legacy compatibility but are no longer used
// since ServiceM8 client data is now read-only

const storeClientNameMapping = async (mappingData) => {
    console.warn('storeClientNameMapping called but client data modifications are disabled');
    return false;
};

const deleteClientNameMapping = async (mappingId) => {
    console.warn('deleteClientNameMapping called but client data modifications are disabled');
    return false;
};

// GET all client name mappings
router.get('/clients/mappings', async (req, res) => {
    try {
        const mappings = await getAllClientNameMappings();
        res.status(200).json({
            success: true,
            data: mappings
        });
    } catch (error) {
        console.error('Error fetching client name mappings:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch client name mappings',
            details: error.message
        });
    }
});

// POST create new client name mapping (DISABLED - ServiceM8 client data is read-only)
router.post('/clients/mappings', async (req, res) => {
    return res.status(410).json({
        error: 'Client mapping creation has been disabled',
        message: 'ServiceM8 client data is read-only. Mapping creation is not allowed.',
        code: 'OPERATION_DISABLED'
    });
});

// PUT update existing client name mapping (DISABLED - ServiceM8 client data is read-only)
router.put('/clients/mappings/:id', async (req, res) => {
    return res.status(410).json({
        error: 'Client mapping updates have been disabled',
        message: 'ServiceM8 client data is read-only. Mapping updates are not allowed.',
        code: 'OPERATION_DISABLED'
    });
});

// DELETE client name mapping (DISABLED - ServiceM8 client data is read-only)
router.delete('/clients/mappings/:id', async (req, res) => {
    return res.status(410).json({
        error: 'Client mapping deletion has been disabled',
        message: 'ServiceM8 client data is read-only. Mapping deletion is not allowed.',
        code: 'OPERATION_DISABLED'
    });
});

// GET client name mapping by email (utility endpoint)
router.get('/clients/mappings/by-email/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const mappings = await getAllClientNameMappings();
        const mapping = mappings.find(m => m.clientEmail === email && m.isActive);
        
        if (mapping) {
            res.status(200).json({
                success: true,
                data: mapping
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'No active mapping found for this email'
            });
        }
    } catch (error) {
        console.error('Error fetching client name mapping by email:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            details: error.message
        });
    }
});

// Route to assign username to existing client (DISABLED - ServiceM8 client data is read-only)
router.post('/clients/:uuid/assign-username', async (req, res) => {
    return res.status(410).json({
        error: 'Username assignment has been disabled',
        message: 'ServiceM8 client data is read-only. Username assignment is not allowed.',
        code: 'OPERATION_DISABLED'
    });
});

// Route to clear client status cache (for debugging/admin purposes)
router.delete('/client-cache/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params;
        const cacheKey = `client:status:${clientId}`;
        
        await redis.del(cacheKey);
        
        res.json({
            success: true,
            message: `Cache cleared for client ${clientId}`
        });
    } catch (error) {
        console.error('Error clearing client cache:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to clear cache',
            details: error.message
        });
    }
});

// Route to check client cache status (for debugging)
router.get('/client-cache/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params;
        const cachedStatus = await getCachedClientStatus(clientId);
        const permissions = await getClientPermissions(clientId);
        
        res.json({
            success: true,
            clientId,
            cachedStatus,
            hasPermissions: permissions && permissions.length > 0,
            permissionCount: permissions ? permissions.length : 0
        });    } catch (error) {
        console.error('Error checking client cache:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to check cache',
            details: error.message
        });
    }
});

module.exports = router;