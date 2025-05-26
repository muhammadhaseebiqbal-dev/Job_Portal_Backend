const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');
const { v4: uuidv4 } = require('uuid');
const { getUserEmails } = require('../utils/userEmailManager');
const axios = require('axios');
require('dotenv').config();

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:5000';

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

// Apply the token middleware to all routes
router.use(ensureValidToken);

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

// POST route to register a new client
router.post('/clients', async (req, res) => {
    try {
        // Store email in a separate variable before sending to ServiceM8
        const clientEmail = req.body.email;
        
        const newClient = {
            uuid: req.body.uuid || uuidv4(),
            name: req.body.name,
            address: req.body.address,
            address_city: req.body.address_city,
            address_state: req.body.address_state,
            address_postcode: req.body.address_postcode,
            address_country: req.body.address_country,
            // Note: email is removed as ServiceM8 ignores it anyway
            phone: req.body.phone,
            active: req.body.active || 1
        };

        // Log the client data we're sending to ServiceM8
        console.log('Creating client with data:', newClient);

        const { data: clientData } = await servicem8.postCompanyCreate(newClient);
        
        // Log the response from ServiceM8 to check the structure
        console.log('ServiceM8 client creation response:', clientData);
        
        // Add back the email that was ignored by ServiceM8 for our application's use
        const completeClientData = {
            ...newClient,
            ...clientData,
            email: clientEmail // Ensure we keep the email for our own use
        };
        
        // Store the email in Redis if it's provided
        if (clientEmail) {
            try {
                // Use storeUserEmail to save client email for notifications
                const { storeUserEmail } = require('../utils/userEmailManager');
                await storeUserEmail(completeClientData.uuid, clientEmail);
                console.log(`Stored client email ${clientEmail} in our database for client ${completeClientData.uuid}`);
            } catch (emailStoreError) {
                console.error('Failed to store client email:', emailStoreError.message);
                // Continue with the process even if email storage fails
            }
        }
        
        // Send notification for client creation to admin
        if (completeClientData) {
            const userId = req.body.userId || 'admin-user';
            await sendClientNotification('clientCreation', completeClientData, userId);
            
            // Also send welcome email to the new client if they provided an email
            if (clientEmail) {
                await sendClientWelcomeEmail(completeClientData);
            }
        }

        res.status(201).json({ 
            message: 'Client created successfully', 
            client: completeClientData // Return our complete data including email
        });
    } catch (err) {
        console.error('Error creating client in ServiceM8:', err.response?.data || err.message);
        res.status(400).json({ error: 'Failed to create client in ServiceM8', details: err.response?.data });
    }
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

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

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
            changes: clientData.changes || []
        };

        // Send notification
        const response = await axios.post(`${API_BASE_URL}/api/notifications/send-templated`, {
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

        // Prepare data for client welcome email
        const welcomeData = {
            clientName: clientData.name || 'Valued Client',
            clientId: clientData.uuid, // Changed from uuid to clientId for consistency with email templates
            address: [
                clientData.address,
                clientData.address_city,
                clientData.address_state,
                clientData.address_postcode,
                clientData.address_country
            ].filter(Boolean).join(', '),
            email: clientData.email,
            phone: clientData.phone,
            portalUrl: `${getPortalUrl()}/login`, // Changed to direct users to main login page
        };

        try {
            // First attempt: Try to send welcome email directly to client
            console.log(`Attempting to send welcome email to client: ${clientData.email}`);
            const response = await axios.post(`${API_BASE_URL}/api/notifications/send-templated`, {
                type: 'clientWelcome',
                data: welcomeData,
                recipientEmail: clientData.email
            });
            
            console.log(`Welcome email sent to new client: ${clientData.email}`);
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
                const adminResponse = await axios.post(`${API_BASE_URL}/api/notifications/send`, {
                    type: 'clientWelcome',
                    recipientEmail: adminUserData.primaryEmail,
                    subject: `New Client Portal Account: ${welcomeData.clientName}`,
                    message: `
A new client has been created but the welcome email could not be sent directly.

Client Details:
- Name: ${welcomeData.clientName}
- Email: ${welcomeData.email}
- Client ID (for login): ${welcomeData.clientId}
- Portal URL: ${welcomeData.portalUrl}

Please contact the client manually to provide their login information.`
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
        }

        // Update client in ServiceM8
        const result = await servicem8.putCompanyEdit(clientUpdate);
        
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
        });
    } catch (err) {
        console.error('Error updating client in ServiceM8:', err.response?.data || err.message);
        res.status(400).json({ error: 'Failed to update client in ServiceM8', details: err.response?.data });
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
        }
        
        // Get quotes - these are just jobs with status='Quote'
        const allQuotes = allJobs.filter(job => job.status === 'Quote');
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
        }
          // Recent activities - filtered by client jobs
        let recentActivity = [];
        try {
            // Use client's job data for activities 
            recentActivity = allJobs
                .slice(0, 10)
                .map(job => ({
                    uuid: job.uuid,
                    activity_type: job.status === 'Quote' ? 'quote_sent' : 
                                job.status === 'Completed' ? 'job_completed' : 'job_created',
                    title: job.job_name || job.description || 'Job Update',
                    description: job.description || job.job_description || '',
                    date: job.date || job.job_date || new Date().toISOString().split('T')[0]
                }));
                
            console.log(`Dashboard: Created ${recentActivity.length} recent activities for client ${clientId}`);
        } catch (activityErr) {
            console.error('Error creating activity feed:', activityErr);
        }
        
        // Calculate statistics
        const stats = {
            activeJobs: allJobs.filter(job => job.status !== 'Completed').length,
            inProgressJobs: allJobs.filter(job => job.status === 'In Progress').length,
            pendingQuotes: allQuotes.length,
            quotesTotalValue: allQuotes.reduce((sum, quote) => sum + parseFloat(quote.total_amount || 0 || quote.total_invoice_amount || 0), 0).toFixed(2),
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
            }        };
        
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
            }));
          const formattedQuotes = allQuotes.map(quote => ({
            id: quote.uuid,
            quoteNumber: quote.quote_number || quote.uuid?.substring(0, 8),
            title: quote.job_name || quote.description || 'Untitled Quote',
            status: 'Quote',
            date: quote.date || quote.job_date,
            dueDate: quote.expiry_date || quote.due_date,
            type: 'Quote',
            price: parseFloat(quote.total_amount || quote.total_invoice_amount || 0).toFixed(2),
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
        });
        
        // Return the formatted data
        res.json({
            stats,
            jobs: formattedJobs,
            quotes: formattedQuotes,
            upcomingServices: formattedServices,
            recentActivity: formattedActivity
        });
        
    } catch (err) {
        console.error('Error fetching client dashboard stats:', err);
        
        // Send fallback mock data if there's an error for development purposes
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
            }
        ],
        recentActivity: [
            { id: 1, type: 'job_created', title: 'New Job Request Created', description: 'Network Installation', date: '2025-05-01' },
            { id: 2, type: 'quote_received', title: 'New Quote Received', description: 'Security System Upgrade', date: '2025-05-02' },
            { id: 3, type: 'job_completed', title: 'Job Completed', description: 'Digital Signage Installation', date: '2025-04-15' },
            { id: 4, type: 'document_uploaded', title: 'Document Uploaded', description: 'Network Diagram.pdf', date: '2025-04-20' },
            { id: 5, type: 'invoice_paid', title: 'Invoice Paid', description: 'INV-2025-0056', date: '2025-05-05' }
        ]
    };
}

module.exports = router;