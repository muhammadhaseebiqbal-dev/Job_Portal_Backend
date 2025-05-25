const express = require('express');
const servicem8 = require('@api/servicem8');
const router = express.Router();
require('dotenv').config();
const { getValidAccessToken } = require('../utils/tokenManager');
const { getUserEmails } = require('../utils/userEmailManager');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

// Helper function to get portal URL
const getPortalUrl = () => {
    return process.env.PORTAL_URL || 'http://localhost:3000';
};

// Helper function to send notification for job events
const sendJobNotification = async (type, jobData, userId) => {
    try {
        // Check if notifications for this type are enabled in the notification settings
        // This will make an API call to get the current notification settings first
        let notificationSettings;
        try {
            const settingsResponse = await axios.get(`${API_BASE_URL}/api/notifications/settings`);
            notificationSettings = settingsResponse.data;
            
            // Early return if email notifications are disabled globally or for this type
            if (!notificationSettings.channels.email || !notificationSettings.types[type]) {
                console.log(`Email notifications are disabled for type '${type}' or globally. Skipping notification.`);
                return false;
            }
        } catch (error) {
            console.error('Error fetching notification settings:', error.message);
            // Default to not sending if we can't verify settings
            return false;
        }
        
        // Get user's primary email - await the async call
        const userEmailData = await getUserEmails(userId || 'admin-user');
        if (!userEmailData || !userEmailData.primaryEmail) {
            console.log(`No primary email found for user ${userId || 'admin-user'}, skipping notification`);
            return false;
        }

        // Format date if available
        let formattedDate = '';
        if (jobData.start_date) {
            const date = new Date(jobData.start_date);
            formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        // Prepare data for email template
        const notificationData = {
            jobId: jobData.job_id || jobData.uuid,
            jobDescription: jobData.job_description || jobData.description || 'No description provided',
            client: jobData.client_name || jobData.company_name || 'Unknown Client',
            status: jobData.status || jobData.job_status || '',
            oldStatus: jobData.oldStatus || '',
            newStatus: jobData.newStatus || '',
            date: formattedDate,
            amount: jobData.amount,
            dueDate: jobData.due_date,
            invoiceId: jobData.invoice_id,
            quoteId: jobData.quote_id,
            portalUrl: `${getPortalUrl()}/admin/jobs`,
            changes: jobData.changes || []
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

// Middleware to ensure a valid token for all job routes
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

// Get a single job by UUID
router.get('/job/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
        console.log(`Fetching job details for UUID: ${uuid}`);
        
        // Use the ServiceM8 API to get a single job
        const result = await servicem8.getJobSingle({ uuid });
        
        // Process the job data to ensure consistent field names for frontend
        const jobData = result.data;
        
        // If job has description but no job_description, copy it to job_description
        if (jobData.description && !jobData.job_description) {
            jobData.job_description = jobData.description;
        }
        // If job has job_description but no description, copy it to description
        if (jobData.job_description && !jobData.description) {
            jobData.description = jobData.job_description;
        }
        
        res.status(200).json(jobData);
    } catch (error) {
        console.error('Error fetching job details:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch job details.',
            details: error.message
        });
    }
});

// Get all jobs
router.get('/jobs', (req, res) => {
    // Log the access token being used
    console.log('Using access token:', req.accessToken);

    servicem8.getJobAll()
        .then(({ data }) => {
            // Process the job data to ensure consistent field names for frontend
            const processedData = data.map(job => {
                // If job has description but no job_description, copy it to job_description
                if (job.description && !job.job_description) {
                    job.job_description = job.description;
                }
                // If job has job_description but no description, copy it to description
                if (job.job_description && !job.description) {
                    job.description = job.job_description;
                }
                return job;
            });
            
            res.status(200).json(processedData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: true,
                message: 'Failed to fetch jobs.'
            });
        });
});

// Get jobs filtered by client UUID - optimized for client portal
router.get('/jobs/client/:clientUuid', (req, res) => {
    const { clientUuid } = req.params;
    
    // Validate client UUID
    if (!clientUuid) {
        return res.status(400).json({
            error: true,
            message: 'Client UUID is required.'
        });
    }
    
    console.log(`Fetching jobs for client UUID: ${clientUuid}`);
    console.log('Using access token:', req.accessToken);

    servicem8.getJobAll()
        .then(({ data }) => {
            // Server-side filtering by client UUID
            const clientJobs = data.filter(job => {
                return job.company_uuid === clientUuid || 
                       job.created_by_staff_uuid === clientUuid ||
                       job.client_uuid === clientUuid;
            });
            
            console.log(`Found ${clientJobs.length} jobs for client ${clientUuid} out of ${data.length} total jobs`);
            
            // Process the job data to ensure consistent field names for frontend
            const processedData = clientJobs.map(job => {
                // If job has description but no job_description, copy it to job_description
                if (job.description && !job.job_description) {
                    job.job_description = job.description;
                }
                // If job has job_description but no description, copy it to description
                if (job.job_description && !job.description) {
                    job.description = job.job_description;
                }
                return job;
            });
            
            res.status(200).json(processedData);
        })
        .catch(err => {
            console.error('Error fetching client jobs:', err);
            res.status(500).json({
                error: true,
                message: 'Failed to fetch client jobs.',
                details: err.message
            });
        });
});

// Delete all jobs
router.delete('/jobs/deleteAll', async (req, res) => {
    try {
        // Fetch all jobs
        const { data: jobs } = await servicem8.getJobAll();

        // Delete each job one by one
        for (const job of jobs) {
            await servicem8.deleteJobSingle({ uuid: job.uuid });
            console.log(`Deleted job with UUID: ${job.uuid}`);
        }

        res.status(200).json({ message: 'All jobs deleted successfully.' });
    } catch (error) {
        console.error('Error deleting jobs:', error);
        res.status(500).json({ error: 'Failed to delete all jobs.' });
    }
});

// Create a new job
router.post('/jobs/create', async (req, res) => {
    try {
        // Get job data from request body and create a new object to modify
        const jobData = { ...req.body };
        
        // Remove category_uuid as it's causing errors and is optional
        if (jobData.category_uuid) {
            console.log(`Removing optional category_uuid: ${jobData.category_uuid}`);
            delete jobData.category_uuid;
        }
        
        // Handle the description field - ServiceM8 API ignores "description" field
        // Use job_description as the primary field for ServiceM8
        if (jobData.description && !jobData.job_description) {
            jobData.job_description = jobData.description;
        }
        
        // CONFIRMED working ServiceM8 status values: "Completed", "Quote", "Work Order"
        if (jobData.status) {
            // Map status values to confirmed working ServiceM8 status values
            const statusMapping = {
                'quote': 'Quote',
                'work order': 'Work Order',
                'completed': 'Completed'
            };
            
            // Check if we have a direct match for confirmed working statuses
            if (["Completed", "Quote", "Work Order"].includes(jobData.status)) {
                // Status is already in the correct format, no need to change
                console.log(`Status "${jobData.status}" is valid.`);
            } else {
                // Try to normalize the status value
                const normalizedStatus = jobData.status.toLowerCase();
                if (statusMapping[normalizedStatus]) {
                    jobData.status = statusMapping[normalizedStatus];
                    console.log(`Normalized status from "${req.body.status}" to "${jobData.status}"`);
                } else {
                    // Default to "Work Order" if status is invalid
                    console.log(`Invalid status "${jobData.status}" provided. Defaulting to "Work Order".`);
                    jobData.status = "Work Order";
                }
            }
        } else {
            // If no status provided, default to Work Order
            jobData.status = "Work Order";
            console.log("No status provided. Defaulting to 'Work Order'.");
        }
        
        // Ensure active is set to 1 (required by ServiceM8)
        if (!jobData.active) {
            jobData.active = 1;
        }
        
        console.log('Creating job with payload:', jobData);
        
        // Use postJobCreate to create the job
        const result = await servicem8.postJobCreate(jobData);
        console.log('Job created successfully:', result.data);
        
        // Send notification about the new job
        await sendJobNotification('jobCreation', {
            ...result.data,
            job_description: jobData.job_description || jobData.description || 'New job created',
            company_name: jobData.company_name
        }, req.body.userId || 'admin-user');

        res.status(201).json({
            success: true,
            message: 'Job created successfully',
            data: result.data
        });
    } catch (error) {
        console.error('Error creating job:', error);
        
        // Provide more detailed error information to help with debugging
        res.status(500).json({
            error: true,
            message: 'Failed to create job.',
            details: error.message,
            serviceM8Error: error.data || 'No additional details provided by ServiceM8'
        });
    }
});

// Update a job
router.put('/jobs/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
        
        // Get the existing job data to track changes
        const { data: existingJob } = await servicem8.getJobSingle({ uuid });
        
        // Create job update payload
        const jobUpdate = {
            uuid,
            ...req.body
        };
        
        // Standardize status field
        if (jobUpdate.status) {
            // Map status values to confirmed working ServiceM8 status values
            const statusMapping = {
                'quote': 'Quote',
                'work order': 'Work Order',
                'completed': 'Completed'
            };
            
            // Try to normalize the status value
            const normalizedStatus = jobUpdate.status.toLowerCase();
            if (statusMapping[normalizedStatus]) {
                jobUpdate.status = statusMapping[normalizedStatus];
            }
        }
        
        // Track changes for notification email
        const changes = [];
        
        // Check for status change - this is important for workflow notifications
        let statusChanged = false;
        if (existingJob.status !== jobUpdate.status && jobUpdate.status) {
            changes.push(`Status changed from "${existingJob.status || 'None'}" to "${jobUpdate.status}"`);
            statusChanged = true;
        }
        
        // Check for description change
        if (existingJob.description !== jobUpdate.description && jobUpdate.description) {
            changes.push(`Description changed from "${existingJob.description || 'None'}" to "${jobUpdate.description}"`);
        }
        
        // Check for start date change
        if (existingJob.start_date !== jobUpdate.start_date && jobUpdate.start_date) {
            const oldDate = existingJob.start_date ? new Date(existingJob.start_date).toLocaleDateString() : 'None';
            const newDate = new Date(jobUpdate.start_date).toLocaleDateString();
            changes.push(`Start date changed from ${oldDate} to ${newDate}`);
        }
        
        // Update job in ServiceM8
        const result = await servicem8.putJobEdit(jobUpdate);
        
        // Send notification about the job update if there were changes
        if (changes.length > 0) {
            await sendJobNotification('jobUpdate', {
                ...jobUpdate,
                job_description: jobUpdate.description || existingJob.description,
                client_name: existingJob.company_name,
                changes,
                oldStatus: existingJob.status,
                newStatus: jobUpdate.status
            }, req.body.userId || 'admin-user');
        }

        res.status(200).json({
            success: true,
            message: 'Job updated successfully',
            data: jobUpdate,
            changes
        });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to update job.',
            details: error.message
        });
    }
});

// Create a new quote
router.post('/quotes/create', async (req, res) => {
    try {
        const { jobUuid, amount, details } = req.body;
        
        if (!jobUuid) {
            return res.status(400).json({
                error: true,
                message: 'Job UUID is required to create a quote'
            });
        }
        
        // Get the job details first
        const { data: jobData } = await servicem8.getJobSingle({ uuid: jobUuid });
        
        if (!jobData) {
            return res.status(404).json({
                error: true,
                message: 'Job not found'
            });
        }
        
        // Create a quote object
        const quoteData = {
            uuid: req.body.uuid || uuidv4(), // Generate UUID if not provided
            job_uuid: jobUuid,
            amount: amount || 0,
            description: details || jobData.description || 'Quote',
            active: 1
        };
        
        // Create the quote in ServiceM8
        const result = await servicem8.postQuoteCreate(quoteData);
        
        // If quote created successfully, update job status to Quote if needed
        if (result.data && jobData.status !== 'Quote') {
            await servicem8.putJobEdit({
                uuid: jobUuid,
                status: 'Quote'
            });
        }
        
        // Send notification about the new quote
        await sendJobNotification('quoteCreation', {
            ...result.data,
            jobId: jobData.job_id,
            job_description: jobData.description,
            client_name: jobData.company_name,
            amount: amount,
            date: new Date().toISOString().split('T')[0]
        }, req.body.userId || 'admin-user');
        
        res.status(201).json({
            success: true,
            message: 'Quote created successfully',
            data: result.data
        });
    } catch (error) {
        console.error('Error creating quote:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to create quote',
            details: error.message
        });
    }
});

// Create a new invoice
router.post('/invoices/create', async (req, res) => {
    try {
        const { jobUuid, amount, dueDate, details } = req.body;
        
        if (!jobUuid) {
            return res.status(400).json({
                error: true,
                message: 'Job UUID is required to create an invoice'
            });
        }
        
        // Get the job details first
        const { data: jobData } = await servicem8.getJobSingle({ uuid: jobUuid });
        
        if (!jobData) {
            return res.status(404).json({
                error: true,
                message: 'Job not found'
            });
        }
        
        // Create an invoice object
        const invoiceData = {
            uuid: req.body.uuid || uuidv4(), // Generate UUID if not provided
            job_uuid: jobUuid,
            amount: amount || 0,
            description: details || jobData.description || 'Invoice',
            due_date: dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default to 14 days from now
            active: 1
        };
        
        // Create the invoice in ServiceM8
        const result = await servicem8.postInvoiceCreate(invoiceData);
        
        // Send notification about the new invoice
        await sendJobNotification('invoiceGenerated', {
            ...result.data,
            jobId: jobData.job_id,
            job_description: jobData.description,
            client_name: jobData.company_name,
            amount: amount,
            dueDate: invoiceData.due_date
        }, req.body.userId || 'admin-user');
        
        res.status(201).json({
            success: true,
            message: 'Invoice created successfully',
            data: result.data
        });
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to create invoice',
            details: error.message
        });    }
});

// Update job status
router.put('/jobs/:uuid/status', async (req, res) => {
    try {
        const { uuid } = req.params;
        const { status } = req.body;
        
        console.log(`Updating job status for UUID: ${uuid} to status: ${status}`);
        
        // Validate status
        const validStatuses = ['Quote', 'Work Order', 'Unsuccessful', 'Completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                error: true,
                message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}`
            });
        }        // Update the job status in ServiceM8
        const updateData = {
            uuid: uuid, // Include UUID in the payload for the job to update
            status: status,
            active: 1 // Keep the job active
        };
        
        const result = await servicem8.postJobSingle(updateData, { uuid });
        
        // Send notification for job status update
        try {
            await sendJobNotification('jobStatusUpdate', {
                ...result.data,
                status: status,
                uuid: uuid
            }, req.body.userId || 'admin-user');
        } catch (notificationError) {
            console.error('Error sending job status update notification:', notificationError);
            // Continue even if notification fails
        }
        
        res.status(200).json({
            success: true,
            message: 'Job status updated successfully',
            data: result.data
        });
        
    } catch (error) {
        console.error('Error updating job status:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to update job status',
            details: error.message
        });
    }
});

module.exports = router;