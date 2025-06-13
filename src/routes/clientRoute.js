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

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:5000';

// Initialize Redis client for permission storage
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

// Helper function to store client permissions
const storeClientPermissions = async (clientUuid, permissions) => {
    try {
        const permissionKey = `client:permissions:${clientUuid}`;
        const permissionData = {
            clientUuid,
            permissions: Array.isArray(permissions) ? permissions : [],
            updatedAt: new Date().toISOString()
        };
        
        await redis.set(permissionKey, JSON.stringify(permissionData));
        console.log(`Stored permissions for client ${clientUuid}:`, permissions);
        return true;
    } catch (error) {
        console.error('Error storing client permissions:', error);
        return false;
    }
};

// Helper function to get client permissions
const getClientPermissions = async (clientUuid) => {
    try {
        const permissionKey = `client:permissions:${clientUuid}`;
        const permissionDataStr = await redis.get(permissionKey);
        
        if (permissionDataStr) {
            const permissionData = typeof permissionDataStr === 'string' ? JSON.parse(permissionDataStr) : permissionDataStr;
            if (permissionData && permissionData.permissions) {
                return permissionData.permissions;
            }
        }
        
        // Return empty array if no permissions found
        return [];
    } catch (error) {
        console.error('Error getting client permissions:', error);
        return [];
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
    try {
        // Extract client UUID from request - check multiple possible sources
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
        
        // First, check if we have valid permissions for this client (fastest check)
        const permissions = await getClientPermissions(clientUuid);
        if (!permissions || permissions.length === 0) {
            console.log(`API access blocked - no permissions found for client: ${clientUuid}`);
            return res.status(403).json({
                error: 'Account access has been restricted. Please contact support.',
                code: 'NO_PERMISSIONS',
                message: 'Client has no assigned permissions'
            });
        }
        
        // Check if we have cached status (second fastest check)
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
            // Client is cached as active, proceed without API call
            req.clientUuid = clientUuid;
            return next();
        }
        
        // No cached status, try to validate with ServiceM8 (but don't block if it fails)
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
            // Log the error but don't block the request if client has permissions
            console.warn(`Status check failed for client ${clientUuid}, but allowing access due to valid permissions:`, statusError.message);
            
            // Cache as active since we couldn't verify otherwise and they have permissions
            await cacheClientStatus(clientUuid, true);
        }
        
        // Client has permissions and passed validation (or status check was inconclusive), allow access
        req.clientUuid = clientUuid;
        next();
    } catch (error) {
        console.error('Error validating client access:', error);
          // Try to get client permissions as a fallback
        try {
            const clientUuid = req.params.clientId || 
                              req.params.uuid || 
                              req.headers['x-client-uuid'] || 
                              (req.body && req.body.clientUuid);
            if (clientUuid) {
                const permissions = await getClientPermissions(clientUuid);
                if (permissions && permissions.length > 0) {
                    console.warn(`Allowing access for client ${clientUuid} based on permissions despite validation error`);
                    req.clientUuid = clientUuid;
                    return next();
                }
            }
        } catch (fallbackError) {
            console.error('Fallback permission check also failed:', fallbackError);
        }
        
        // Final fallback - block access
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
const sendClientNotification = async (type, clientData, userId) => {
    try {
        // Get user's primary email - now properly awaiting the async call
        const userEmailData = await getUserEmails(userId || 'admin-user');
        if (!userEmailData || !userEmailData.primaryEmail) {
            console.log(`No primary email found for user ${userId || 'admin-user'}, skipping notification`);
            return false;
        }

        // Prepare data for email template
        const notificationData = {
            clientName: clientData.name,
            clientId: clientData.uuid, // Add the UUID as clientId for consistent property naming
            address: [
                clientData.address,
                clientData.address_city,
                clientData.address_state,
                clientData.address_postcode,
                clientData.address_country
            ].filter(Boolean).join(', '),
            email: clientData.email,
            phone: clientData.phone,
            portalUrl: `${getPortalUrl()}/admin/clients`,
            changes: clientData.changes || []        };

        // Send notification
        const response = await axios.post(`${apiBaseUrl}/api/notifications/send-templated`, {
            type,
            data: notificationData,
            recipientEmail: userEmailData.primaryEmail
        });

        return response.status === 200;
    } catch (error) {
        console.error(`Error sending ${type} notification:`, error.message);
        return false;
    }
};

// Helper function to send welcome email to new clients
const sendClientWelcomeEmail = async (clientData) => {
    try {
        if (!clientData.email) {
            console.log('No client email provided, skipping welcome email');
            return false;
        }

        // Generate password setup token for the new client
        const setupToken = await generatePasswordSetupToken(clientData.email, clientData.uuid);
        if (!setupToken) {
            console.error('Failed to generate password setup token');
            return false;
        }        // Create setup URL with the token
        const setupUrl = `${getPortalUrl()}/password-setup/${setupToken}`;
        
        // Prepare data for client welcome email
        const welcomeData = {
            clientName: clientData.name || 'Valued Client',
            address: [
                clientData.address,
                clientData.address_city,
                clientData.address_state,
                clientData.address_postcode,
                clientData.address_country
            ].filter(Boolean).join(', '),
            email: clientData.email,
            phone: clientData.phone,
            setupUrl: setupUrl, // New password setup URL instead of portal URL
        };        try {
            // First attempt: Try to send welcome email directly to client            console.log(`Attempting to send welcome email with setup link to client: ${clientData.email}`);
            const response = await axios.post(`${apiBaseUrl}/api/notifications/send-templated`, {
                type: 'clientWelcome',
                data: welcomeData,
                recipientEmail: clientData.email
            });
            
            console.log(`Welcome email with password setup link sent to new client: ${clientData.email}`);
            return response.status === 200;
        } catch (directSendError) {
            console.error('Direct client welcome email failed:', directSendError.message);
            
            // If direct sending fails, try to notify admin about the new client
            try {
                // Get admin's primary email - properly await the async call
                const adminUserData = await getUserEmails('admin-user');
                if (!adminUserData || !adminUserData.primaryEmail) {
                    console.log('No admin email found for notification');
                    return false;
                }
                  // Send a notification to admin about the new client with login info to share
                const adminResponse = await axios.post(`${apiBaseUrl}/api/notifications/send`, {
                    type: 'clientCreation',
                    recipientEmail: adminUserData.primaryEmail,
                    subject: `New Client Portal Account: ${welcomeData.clientName}`,
                    message: `
A new client has been created but the welcome email could not be sent directly.

Client Details:
- Name: ${welcomeData.clientName}
- Email: ${welcomeData.email}
- Setup Link: ${welcomeData.setupUrl}

Please contact the client manually to provide their password setup link.`
                });
                
                console.log(`Fallback notification sent to admin: ${adminUserData.primaryEmail}`);
                return adminResponse.status === 200;
            } catch (adminNotifyError) {
                console.error('Failed to notify admin about client creation:', adminNotifyError.message);
                return false;
            }
        }
    } catch (error) {
        console.error('Error sending client welcome email:', error.message);
        return false;
    }
};

// PUT route to update a client
router.put('/clients/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
        
        // First get the existing client data to track changes
        const { data: existingClient } = await servicem8.getCompanySingle({ uuid });
        
        // Build update payload
        const clientUpdate = {
            uuid,
            name: req.body.name,
            address: req.body.address,
            address_city: req.body.address_city,
            address_state: req.body.address_state,
            address_postcode: req.body.address_postcode,
            address_country: req.body.address_country,
            email: req.body.email,
            phone: req.body.phone,
            active: req.body.active !== undefined ? req.body.active : existingClient.active
        };

        // Track changes for notification email
        const changes = [];
        if (existingClient.name !== clientUpdate.name) {
            changes.push(`Name changed from "${existingClient.name}" to "${clientUpdate.name}"`);
        }
        if (existingClient.email !== clientUpdate.email) {
            changes.push(`Email changed from "${existingClient.email || 'none'}" to "${clientUpdate.email || 'none'}"`);
        }
        if (existingClient.phone !== clientUpdate.phone) {
            changes.push(`Phone changed from "${existingClient.phone || 'none'}" to "${clientUpdate.phone || 'none'}"`);
        }
        
        // Address change detection
        const oldAddress = [
            existingClient.address,
            existingClient.address_city,
            existingClient.address_state,
            existingClient.address_postcode,
            existingClient.address_country
        ].filter(Boolean).join(', ');
        
        const newAddress = [
            clientUpdate.address,
            clientUpdate.address_city,
            clientUpdate.address_state,
            clientUpdate.address_postcode,
            clientUpdate.address_country
        ].filter(Boolean).join(', ');
        
        if (oldAddress !== newAddress) {
            changes.push(`Address changed from "${oldAddress || 'none'}" to "${newAddress || 'none'}"`);
        }        // Update client in ServiceM8
        const result = await servicem8.postCompanySingle(clientUpdate, { uuid });
        
        // Add changes to the updated client data for notification
        const updatedClientData = {
            ...clientUpdate,
            changes
        };
        
        // Send notification for client update if there were changes
        if (changes.length > 0) {
            const userId = req.body.userId || 'admin-user';
            await sendClientNotification('clientUpdate', updatedClientData, userId);
        }

        res.status(200).json({ 
            message: 'Client updated successfully', 
            client: clientUpdate,
            changesDetected: changes
        });    } catch (err) {
        console.error('Error updating client in ServiceM8:', err.response?.data || err.message);
        res.status(400).json({ error: 'Failed to update client in ServiceM8', details: err.response?.data });
    }
});

// PUT route to update client status only
router.put('/clients/:uuid/status', async (req, res) => {
    try {
        const { uuid } = req.params;
        const { active } = req.body;
        
        console.log(`Updating client ${uuid} status to ${active}`);
        
        // First get the existing client data
        const { data: existingClient } = await servicem8.getCompanySingle({ uuid });
        
        if (!existingClient) {
            return res.status(404).json({ 
                success: false, 
                error: 'Client not found' 
            });
        }
        
        // Build update payload with only the status change
        const clientUpdate = {
            uuid,
            name: existingClient.name,
            address: existingClient.address,
            address_city: existingClient.address_city,
            address_state: existingClient.address_state,
            address_postcode: existingClient.address_postcode,
            address_country: existingClient.address_country,
            email: existingClient.email,
            phone: existingClient.phone,
            active: active
        };        // Update client in ServiceM8
        await servicem8.postCompanySingle(clientUpdate, { uuid });
        
        // Send notification for status change
        const statusText = active === 1 ? 'activated' : 'deactivated';
        const updatedClientData = {
            ...existingClient,
            active: active,
            changes: [`Client access ${statusText}`]
        };
        
        const userId = req.body.userId || 'admin-user';
        await sendClientNotification('clientUpdate', updatedClientData, userId);        res.status(200).json({ 
            success: true,
            message: `Client status updated successfully - ${statusText}`, 
            client: { ...existingClient, active: active }
        });
    } catch (err) {
        console.error('Error updating client status in ServiceM8:', err.response?.data || err.message);
        res.status(400).json({ 
            success: false, 
            error: 'Failed to update client status in ServiceM8', 
            details: err.response?.data 
        });
    }
});

// PUT route to bulk update client status
router.put('/clients/bulk-status', async (req, res) => {
    try {
        const { active, clientUuids } = req.body;
        
        console.log(`Bulk updating ${clientUuids?.length || 'all'} clients to status ${active}`);
        
        if (active === undefined || active === null) {
            return res.status(400).json({ 
                success: false, 
                error: 'Active status is required (0 for inactive, 1 for active)' 
            });
        }

        // Validate active status value
        if (active !== 0 && active !== 1) {
            return res.status(400).json({ 
                success: false, 
                error: 'Active status must be 0 (inactive) or 1 (active)' 
            });
        }

        // Get all clients first
        const { data: allClients } = await servicem8.getCompanyAll();
        
        if (!allClients || !Array.isArray(allClients)) {
            return res.status(500).json({ 
                success: false, 
                error: 'Failed to fetch clients from ServiceM8' 
            });
        }

        // Filter clients to update
        let clientsToUpdate = allClients;
        if (clientUuids && Array.isArray(clientUuids) && clientUuids.length > 0) {
            clientsToUpdate = allClients.filter(client => clientUuids.includes(client.uuid));
            console.log(`Filtering to specific clients: ${clientUuids.length} requested, ${clientsToUpdate.length} found`);
        }

        console.log(`Found ${clientsToUpdate.length} clients to update out of ${allClients.length} total`);

        const results = {
            successful: [],
            failed: [],
            skipped: []
        };

        // Update each client
        for (const client of clientsToUpdate) {
            try {
                // Skip if already in the desired state
                if (client.active === active) {
                    results.skipped.push({
                        uuid: client.uuid,
                        name: client.name || 'Unnamed Client',
                        reason: `Already ${active === 1 ? 'active' : 'inactive'}`
                    });
                    continue;
                }

                // Build update payload preserving all existing data and only changing status
                const clientUpdate = {
                    uuid: client.uuid,
                    name: client.name || '',
                    address: client.address || '',
                    address_city: client.address_city || '',
                    address_state: client.address_state || '',
                    address_postcode: client.address_postcode || '',
                    address_country: client.address_country || '',
                    email: client.email || '',
                    phone: client.phone || '',
                    active: active
                };

                console.log(`Updating client ${client.uuid} (${client.name}) from status ${client.active} to ${active}`);

                // Update client in ServiceM8
                const updateResult = await servicem8.postCompanySingle(clientUpdate, { uuid: client.uuid });
                
                results.successful.push({
                    uuid: client.uuid,
                    name: client.name || 'Unnamed Client',
                    previousStatus: client.active,
                    newStatus: active
                });

                console.log(`✅ Successfully updated client ${client.uuid} (${client.name}) to ${active === 1 ? 'active' : 'inactive'}`);
                
            } catch (updateError) {
                console.error(`❌ Failed to update client ${client.uuid} (${client.name}):`, updateError.response?.data || updateError.message);
                results.failed.push({
                    uuid: client.uuid,
                    name: client.name || 'Unnamed Client',
                    error: updateError.response?.data?.message || updateError.message || 'Unknown error'
                });
            }
        }

        // Send notification about bulk operation if we have successful updates
        if (results.successful.length > 0) {
            try {
                const statusText = active === 1 ? 'activated' : 'deactivated';
                const notificationData = {
                    type: 'bulkClientUpdate',
                    statusText,
                    successful: results.successful.length,
                    failed: results.failed.length,
                    skipped: results.skipped.length,
                    total: clientsToUpdate.length,
                    clients: results.successful.map(c => c.name).join(', ')
                };

                const userId = req.body.userId || 'admin-user';
                await sendClientNotification('clientBulkUpdate', notificationData, userId);
            } catch (notificationError) {
                console.error('Failed to send bulk update notification:', notificationError.message);
            }
        }

        const statusText = active === 1 ? 'activated' : 'deactivated';
        
        res.status(200).json({ 
            success: true,
            message: `Bulk client status update completed. ${results.successful.length} clients ${statusText}, ${results.skipped.length} skipped, ${results.failed.length} failed.`,
            results: {
                total: clientsToUpdate.length,
                successful: results.successful.length,
                failed: results.failed.length,
                skipped: results.skipped.length,
                details: results
            }
        });
        
    } catch (err) {
        console.error('Error in bulk client status update:', err.response?.data || err.message);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to perform bulk client status update', 
            details: err.response?.data?.message || err.message || 'Unknown server error'
        });
    }
});

// GET route for client dashboard stats
router.get('/dashboard-stats/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params;
        
        // Handle 'default' clientId - return mock data for demo purposes
        if (!clientId || clientId === 'default' || clientId === 'null' || clientId === 'undefined') {
            console.log('Using default client data as no valid clientId was provided');
            const mockData = createMockDashboardData();
            return res.json(mockData);
        }        // Get jobs filtered by client UUID - same logic as /jobs/client/:clientUuid endpoint
        let allJobs = [];
        try {
            const jobResponse = await servicem8.getJobAll();
            const allJobsData = jobResponse.data || [];
            
            // Server-side filtering by client UUID - same logic as JobsRoutes.js
            allJobs = allJobsData.filter(job => {
                return job.company_uuid === clientId || 
                       job.created_by_staff_uuid === clientId ||
                       job.client_uuid === clientId;
            });
            
            console.log(`Dashboard: Found ${allJobs.length} jobs for client ${clientId} out of ${allJobsData.length} total jobs`);
        } catch (jobErr) {
            console.error('Error fetching jobs:', jobErr.response?.data || jobErr.message);
        }        // Get quotes from the quotes system (Redis-based) - using direct Redis call
        let allQuotes = [];
        try {
            console.log(`🔍 DASHBOARD: Fetching quotes for clientId: "${clientId}"`);
            const quotesData = await readQuotesData();
            
            // Filter quotes by client ID
            allQuotes = quotesData.filter(quote => quote.clientId === clientId);
            
            console.log(`✅ DASHBOARD: Found ${allQuotes.length} quotes for client ${clientId} from quotes system (direct Redis)`);
            console.log(`📊 DASHBOARD: Total quotes in Redis: ${quotesData.length}`);
            
            // If no quotes found for this client, create demo quote to show the system is working
            if (allQuotes.length === 0) {
                console.log(`💡 DASHBOARD: No quotes found for client ${clientId}, creating demo quote for dashboard display`);
                const demoQuote = {
                    id: `DEMO-${Date.now()}`,
                    clientId: clientId,
                    title: 'Security System Upgrade',
                    description: 'Upgrade existing security cameras to 4K resolution with enhanced night vision capabilities',
                    price: 4850.00,
                    status: 'Pending',
                    createdAt: new Date().toISOString(),
                    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                    location: 'Main Location'
                };
                allQuotes = [demoQuote];
                console.log(`🎯 DASHBOARD: Created demo quote for display: "${demoQuote.title}"`);
            } else {
                console.log(`📋 DASHBOARD: Client quotes:`, allQuotes.map(q => ({ id: q.id, title: q.title })));
            }
        } catch (quotesErr) {
            console.error('❌ DASHBOARD: Error fetching quotes from quotes system:', quotesErr.message);
            console.log('🔄 DASHBOARD: Falling back to filtering jobs with status=Quote');
            // Fallback to the old method if quotes system is unavailable
            allQuotes = allJobs.filter(job => job.status === 'Quote');
        }
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
                
            console.log(`Dashboard: Found ${upcomingServices.length} upcoming services for client ${clientId}`);
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
                
            console.log(`Dashboard: Created ${recentActivity.length} recent activities for client ${clientId} (sorted newest first)`);
        } catch (activityErr) {
            console.error('Error creating activity feed:', activityErr);
        }
          // Calculate statistics
        const stats = {
            activeJobs: allJobs.filter(job => job.status !== 'Completed').length,
            inProgressJobs: allJobs.filter(job => job.status === 'In Progress').length,
            pendingQuotes: allQuotes.length, // Now uses the correct quotes from quotes system
            quotesTotalValue: allQuotes.reduce((sum, quote) => {
                // Handle both ServiceM8 job format and quotes system format
                const amount = quote.price || quote.total_amount || quote.total_invoice_amount || 0;
                return sum + parseFloat(amount);
            }, 0).toFixed(2),
            completedJobs: allJobs.filter(job => job.status === 'Completed').length,
            completedJobsLast30Days: allJobs.filter(job => {
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
                inProgress: allJobs.length ? (allJobs.filter(j => j.status === 'In Progress').length / allJobs.length * 100).toFixed(1) : 0,
                scheduled: allJobs.length ? (allJobs.filter(j => j.status === 'Scheduled').length / allJobs.length * 100).toFixed(1) : 0,
                completed: allJobs.length ? (allJobs.filter(j => j.status === 'Completed').length / allJobs.length * 100).toFixed(1) : 0
            }
        };
        
        // Format job and quotes data to include only necessary fields
        const formattedJobs = allJobs
            .filter(job => job.status !== 'Quote') // Exclude quotes from jobs list
            .map(job => ({
                id: job.uuid,
                jobNumber: job.job_number || job.uuid?.substring(0, 8),
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
            id: quote.id || quote.uuid,
            quoteNumber: quote.id || quote.quote_number || quote.uuid?.substring(0, 8),
            title: quote.title || quote.job_name || quote.description || 'Untitled Quote',
            status: quote.status || 'Quote',
            date: quote.createdAt || quote.date || quote.job_date,
            dueDate: quote.expiryDate || quote.expiry_date || quote.due_date,
            type: 'Quote',
            price: parseFloat(quote.price || quote.total_amount || quote.total_invoice_amount || 0).toFixed(2),
            description: quote.description || quote.job_description || '',
            location: quote.location || quote.site_name || quote.job_address || 'Main Location',
            attachments: quote.attachments?.length || quote.attachments_count || 0
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
        res.json({
            stats,
            jobs: formattedJobs,
            quotes: formattedQuotes,
            upcomingServices: formattedServices,
            recentActivity: formattedActivity
        });
        
    } catch (err) {
        console.error('Error fetching dashboard data:', err.response?.data || err.message);
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

// GET route to fetch client permissions
router.get('/clients/:clientId/permissions', async (req, res) => {
    try {
        const { clientId } = req.params;
        
        if (!clientId) {
            return res.status(400).json({
                error: true,
                message: 'Client ID is required.'
            });
        }
        
        const permissions = await getClientPermissions(clientId);
        
        res.status(200).json({
            success: true,
            clientId,
            permissions
        });
    } catch (error) {
        console.error('Error fetching client permissions:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch client permissions.',
            details: error.message
        });
    }
});

// PUT route to update client permissions
router.put('/clients/:clientId/permissions', async (req, res) => {
    try {
        const { clientId } = req.params;
        const { permissions } = req.body;
        
        if (!clientId) {
            return res.status(400).json({
                error: true,
                message: 'Client ID is required.'
            });
        }
        
        if (!Array.isArray(permissions)) {
            return res.status(400).json({
                error: true,
                message: 'Permissions must be an array.'
            });
        }
        
        const success = await storeClientPermissions(clientId, permissions);
        
        if (success) {
            res.status(200).json({
                success: true,
                message: 'Client permissions updated successfully.',
                clientId,
                permissions
            });
        } else {
            res.status(500).json({
                error: true,
                message: 'Failed to store client permissions.'
            });
        }
    } catch (error) {
        console.error('Error updating client permissions:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to update client permissions.',
            details: error.message
        });
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

// ========== CLIENT NAME MAPPING ROUTES ==========

// Helper function to store client name mappings
const storeClientNameMapping = async (mappingData) => {
    try {
        const mappingKey = `client:name_mapping:${mappingData.id}`;
        const dataWithTimestamp = {
            ...mappingData,
            createdAt: mappingData.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: mappingData.isActive !== undefined ? mappingData.isActive : true
        };
        
        await redis.set(mappingKey, dataWithTimestamp);
        
        // Also maintain an index of all mappings for easy retrieval
        const indexKey = 'client:name_mappings_index';
        let currentIndex = await redis.get(indexKey) || [];
        if (!Array.isArray(currentIndex)) {
            currentIndex = [];
        }
        
        // Add or update in index
        const existingIndex = currentIndex.findIndex(m => m.id === mappingData.id);
        if (existingIndex >= 0) {
            currentIndex[existingIndex] = { id: mappingData.id, email: mappingData.clientEmail };
        } else {
            currentIndex.push({ id: mappingData.id, email: mappingData.clientEmail });
        }
        
        await redis.set(indexKey, currentIndex);
        console.log(`Stored client name mapping for ${mappingData.clientEmail}`);
        return true;
    } catch (error) {
        console.error('Error storing client name mapping:', error);
        return false;
    }
};

// Helper function to get all client name mappings
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

// Helper function to delete client name mapping
const deleteClientNameMapping = async (mappingId) => {
    try {
        const mappingKey = `client:name_mapping:${mappingId}`;
        await redis.del(mappingKey);
        
        // Remove from index
        const indexKey = 'client:name_mappings_index';
        let currentIndex = await redis.get(indexKey) || [];
        if (Array.isArray(currentIndex)) {
            currentIndex = currentIndex.filter(m => m.id !== mappingId);
            await redis.set(indexKey, currentIndex);
        }
        
        console.log(`Deleted client name mapping ${mappingId}`);
        return true;
    } catch (error) {
        console.error('Error deleting client name mapping:', error);
        return false;
    }
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

// POST create new client name mapping
router.post('/clients/mappings', async (req, res) => {
    try {
        const { clientEmail, displayName, username, clientUuid } = req.body;
        
        if (!clientEmail || !displayName || !username) {
            return res.status(400).json({
                success: false,
                error: 'clientEmail, displayName, and username are required'
            });
        }
        
        // Check if email or username already exists
        const existingMappings = await getAllClientNameMappings();
        const emailExists = existingMappings.find(m => m.clientEmail === clientEmail);
        const usernameExists = existingMappings.find(m => m.username === username);
        
        if (emailExists) {
            return res.status(400).json({
                success: false,
                error: 'A mapping for this email already exists'
            });
        }
        
        if (usernameExists) {
            return res.status(400).json({
                success: false,
                error: 'This username is already taken'
            });
        }
        
        // Create new mapping
        const newMapping = {
            id: Date.now().toString(), // Simple ID generation for now
            clientEmail,
            displayName,
            username,
            clientUuid: clientUuid || null,
            isActive: true,
            createdAt: new Date().toISOString()
        };
        
        const success = await storeClientNameMapping(newMapping);
        
        if (success) {
            res.status(201).json({
                success: true,
                message: 'Client name mapping created successfully',
                data: newMapping
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Failed to store client name mapping'
            });
        }
    } catch (error) {
        console.error('Error creating client name mapping:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            details: error.message
        });
    }
});

// PUT update existing client name mapping
router.put('/clients/mappings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { clientEmail, displayName, username, clientUuid, isActive } = req.body;
        
        if (!clientEmail || !displayName || !username) {
            return res.status(400).json({
                success: false,
                error: 'clientEmail, displayName, and username are required'
            });
        }
        
        // Check if the mapping exists
        const mappingKey = `client:name_mapping:${id}`;
        const existingMapping = await redis.get(mappingKey);
        
        if (!existingMapping) {
            return res.status(404).json({
                success: false,
                error: 'Client name mapping not found'
            });
        }
        
        // Check for conflicts with other mappings (excluding current one)
        const allMappings = await getAllClientNameMappings();
        const emailConflict = allMappings.find(m => m.id !== id && m.clientEmail === clientEmail);
        const usernameConflict = allMappings.find(m => m.id !== id && m.username === username);
        
        if (emailConflict) {
            return res.status(400).json({
                success: false,
                error: 'A mapping for this email already exists'
            });
        }
        
        if (usernameConflict) {
            return res.status(400).json({
                success: false,
                error: 'This username is already taken'
            });
        }
        
        // Update mapping
        const updatedMapping = {
            ...existingMapping,
            clientEmail,
            displayName,
            username,
            clientUuid: clientUuid || null,
            isActive: isActive !== undefined ? isActive : existingMapping.isActive,
            updatedAt: new Date().toISOString()
        };
        
        const success = await storeClientNameMapping(updatedMapping);
        
        if (success) {
            res.status(200).json({
                success: true,
                message: 'Client name mapping updated successfully',
                data: updatedMapping
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Failed to update client name mapping'
            });
        }
    } catch (error) {
        console.error('Error updating client name mapping:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            details: error.message
        });
    }
});

// DELETE client name mapping
router.delete('/clients/mappings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if the mapping exists
        const mappingKey = `client:name_mapping:${id}`;
        const existingMapping = await redis.get(mappingKey);
        
        if (!existingMapping) {
            return res.status(404).json({
                success: false,
                error: 'Client name mapping not found'
            });
        }
        
        const success = await deleteClientNameMapping(id);
        
        if (success) {
            res.status(200).json({
                success: true,
                message: 'Client name mapping deleted successfully'
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Failed to delete client name mapping'
            });
        }
    } catch (error) {
        console.error('Error deleting client name mapping:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            details: error.message
        });
    }
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

// Route to assign username to existing client and send password setup email
router.post('/clients/:uuid/assign-username', async (req, res) => {
    try {
        const { uuid } = req.params;
        const { email, username, displayName } = req.body;

        if (!email || !username) {
            return res.status(400).json({
                success: false,
                error: 'Email and username are required'
            });
        }

        // Get a valid access token for ServiceM8 API calls
        const accessToken = await getValidAccessToken();
        servicem8.auth(accessToken);

        // Verify the client exists in ServiceM8
        const { data: clientData } = await servicem8.getCompanySingle({ uuid });
        
        if (!clientData) {
            return res.status(404).json({
                success: false,
                error: 'Client not found'
            });
        }

        // Check if email or username already exists in mappings
        const existingMappings = await getAllClientNameMappings();
        const emailExists = existingMappings.find(m => m.clientEmail === email && m.isActive);
        const usernameExists = existingMappings.find(m => m.username === username && m.isActive);

        if (emailExists) {
            return res.status(400).json({
                success: false,
                error: 'A username is already assigned to this email address'
            });
        }

        if (usernameExists) {
            return res.status(400).json({
                success: false,
                error: 'This username is already taken'
            });
        }

        // Create new mapping
        const newMapping = {
            id: Date.now().toString(),
            clientEmail: email,
            displayName: displayName || clientData.name,
            username: username,
            clientUuid: uuid,
            isActive: true,
            createdAt: new Date().toISOString()
        };

        // Store the mapping
        const mappingStored = await storeClientNameMapping(newMapping);

        if (!mappingStored) {
            return res.status(500).json({
                success: false,
                error: 'Failed to store username mapping'
            });
        }

        // Generate password setup token for the client
        const setupToken = await generatePasswordSetupToken(email, uuid);
        
        if (!setupToken) {
            return res.status(500).json({
                success: false,
                error: 'Failed to generate password setup token'
            });
        }

        // Create setup URL with the token
        const setupUrl = `${getPortalUrl()}/password-setup/${setupToken}`;

        // Prepare data for client welcome email
        const welcomeData = {
            clientName: displayName || clientData.name,
            username: username,
            address: [
                clientData.address,
                clientData.address_city,
                clientData.address_state,
                clientData.address_postcode,
                clientData.address_country
            ].filter(Boolean).join(', '),
            email: email,
            phone: clientData.phone,
            setupUrl: setupUrl,
        };

        // Send welcome email with setup link
        try {            console.log(`Sending username assignment email to: ${email}`);
            const response = await axios.post(`${apiBaseUrl}/api/notifications/send-templated`, {
                type: 'clientWelcome',
                data: welcomeData,
                recipientEmail: email
            });

            if (response.status === 200) {
                console.log(`Username assignment email sent successfully to: ${email}`);
                
                res.status(200).json({
                    success: true,
                    message: `Username assigned successfully and setup email sent to ${email}`,
                    data: {
                        mapping: newMapping,
                        setupEmailSent: true
                    }
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Username assigned successfully but email sending failed',
                    data: {
                        mapping: newMapping,
                        setupEmailSent: false
                    }
                });
            }
        } catch (emailError) {
            console.error('Error sending setup email:', emailError.message);
            
            // Try to notify admin about the assignment
            try {
                const adminUserData = await getUserEmails('admin-user');
                if (adminUserData && adminUserData.primaryEmail) {
                    await axios.post(`${apiBaseUrl}/api/notifications/send`, {
                        type: 'clientUpdate',
                        recipientEmail: adminUserData.primaryEmail,
                        subject: `Username Assigned - Manual Setup Required: ${clientData.name}`,
                        message: `
Username has been assigned but the setup email could not be sent directly.

Client Details:
- Name: ${welcomeData.clientName}
- Email: ${email}
- Username: ${username}
- Setup Link: ${setupUrl}

Please contact the client manually to provide their password setup link.`
                    });
                }
            } catch (adminNotifyError) {
                console.error('Failed to notify admin about username assignment:', adminNotifyError.message);
            }

            res.status(200).json({
                success: true,
                message: 'Username assigned successfully but email sending failed. Admin has been notified.',
                data: {
                    mapping: newMapping,
                    setupEmailSent: false,
                    setupUrl: setupUrl
                }
            });
        }    } catch (error) {
        console.error('Error assigning username to client:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error during username assignment',
            details: error.message
        });
    }
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
        });
    } catch (error) {
        console.error('Error checking client cache:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to check cache',
            details: error.message
        });
    }
});

module.exports = router;