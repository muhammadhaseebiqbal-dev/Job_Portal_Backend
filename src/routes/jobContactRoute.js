const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');

/**
 * JOB CONTACT ROUTES - ServiceM8 Integration
 * 
 * Handles job contact creation for ServiceM8 API
 * Used for the chain workflow: Job -> Contact -> Attachment
 */

// Middleware to ensure a valid token for all job contact routes
const ensureValidToken = async (req, res, next) => {
    try {
        const accessToken = await getValidAccessToken();
        req.accessToken = accessToken;
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

// POST route to create a job contact
router.post('/jobcontact', async (req, res) => {
    try {
        console.log('🔄 Creating job contact for chain workflow...');
        
        const {
            job_uuid,
            first,
            last,
            phone,
            mobile,
            email,
            type = 'Site Contact',
            active = 1,
            is_primary_contact
        } = req.body;

        // Validate required fields
        if (!job_uuid) {
            return res.status(400).json({
                success: false,
                error: 'job_uuid is required'
            });
        }

        // Create job contact payload
        const jobContactData = {
            job_uuid,
            first: first || '',
            last: last || '',
            phone: phone || '',
            mobile: mobile || phone || '', // Use phone as fallback for mobile
            email: email || '',
            type: type,
            active: active,
            is_primary_contact: is_primary_contact || '1'
        };

        console.log('📤 Creating job contact with data:', jobContactData);

        // Create the job contact using ServiceM8 API
        const result = await servicem8.postJobContactCreate(jobContactData);
        
        console.log('✅ Job contact created successfully:', result.data);

        res.status(201).json({
            success: true,
            message: 'Job contact created successfully',
            data: result.data
        });

    } catch (error) {
        console.error('❌ Error creating job contact:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create job contact',
            details: error.message,
            servicem8Error: error.data || 'No additional details provided by ServiceM8'
        });
    }
});

module.exports = router;
