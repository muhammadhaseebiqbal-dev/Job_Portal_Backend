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
        const newClient = {
            uuid: req.body.uuid || uuidv4(),
            name: req.body.name,
            address: req.body.address,
            address_city: req.body.address_city,
            address_state: req.body.address_state,
            address_postcode: req.body.address_postcode,
            address_country: req.body.address_country,
            email: req.body.email,
            phone: req.body.phone,
            active: req.body.active || 1
        };

        // Log the client data we're sending to ServiceM8
        console.log('Creating client with data:', newClient);

        const { data: clientData } = await servicem8.postCompanyCreate(newClient);
        
        // Log the response from ServiceM8 to check the structure
        console.log('ServiceM8 client creation response:', clientData);
        
        // Merge the incoming data with the response to ensure we have all fields
        // This ensures we use our submitted data if the response is missing fields
        const completeClientData = {
            ...newClient,
            ...clientData
        };
        
        // Send notification for client creation to admin
        if (completeClientData) {
            const userId = req.body.userId || 'admin-user';
            await sendClientNotification('clientCreation', completeClientData, userId);
            
            // Also send welcome email to the new client if they provided an email
            if (completeClientData.email) {
                await sendClientWelcomeEmail(completeClientData);
            }
        }

        res.status(201).json({ message: 'Client created successfully', client: clientData });
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
        // Get user's primary email
        const userEmailData = getUserEmails(userId || 'admin-user');
        if (!userEmailData.primaryEmail) {
            console.log('No primary email found for user, skipping notification');
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
            portalUrl: `${getPortalUrl()}/client/login/${clientData.uuid}`,
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
                // Get admin's primary email
                const adminUserData = getUserEmails('admin-user');
                if (!adminUserData.primaryEmail) {
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

module.exports = router;