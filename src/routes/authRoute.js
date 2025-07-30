// filepath: c:\Users\Beast\OneDrive\Desktop\Job_Portal\Job_Portal_Backend\src\routes\authRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const { readTokenData, writeTokenData, refreshAccessToken, calculateTokenExpiry } = require('../utils/tokenManager');
require('dotenv').config();

const { SERVICEM8_CLIENT_ID, SERVICEM8_CLIENT_SECRET, SERVICEM8_REDIRECT_URI } = process.env;

router.get('/', (req, res) => {
    res.send("Working");
});

// Redirect to ServiceM8 OAuth
router.get('/auth/servicem8', (req, res) => {
    const authUrl = new URL('https://go.servicem8.com/oauth/authorize');
    const params = {
        client_id: SERVICEM8_CLIENT_ID,
        redirect_uri: SERVICEM8_REDIRECT_URI,
        response_type: 'code',
        scope: 'staff_locations staff_activity publish_sms publish_email vendor vendor_logo vendor_email read_locations manage_locations read_staff manage_staff read_customers manage_customers manage_customer_contacts read_jobs manage_jobs create_jobs read_job_contacts manage_job_contacts read_job_materials manage_job_materials read_job_categories manage_job_categories read_job_queues manage_job_queues read_tasks manage_tasks read_schedule manage_schedule read_inventory manage_inventory read_job_notes publish_job_notes read_job_photos publish_job_photos read_job_attachments publish_job_attachments read_inbox read_messages manage_notifications manage_templates manage_badges read_assets manage_assets',
        state: Math.random().toString(36).substring(7),
    };
    authUrl.search = new URLSearchParams(params).toString();
    res.redirect(authUrl.toString());
});

// Generate access token
router.get('/auth/generateAccessToken', async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).json({
            error: true,
            message: 'Missing authorization code'
        });
    }

    try {
        const formData = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            client_id: SERVICEM8_CLIENT_ID,
            client_secret: SERVICEM8_CLIENT_SECRET,
            redirect_uri: SERVICEM8_REDIRECT_URI
        });
        const tokenResponse = await axios.post(
            'https://go.servicem8.com/oauth/access_token',
            formData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            });
        const tokenData = tokenResponse.data;

        // Calculate expiry timestamp and save tokens properly
        const expires_at = calculateTokenExpiry(tokenData.expires_in);
        const tokenDataWithExpiry = {
            ...tokenData,
            expires_at
        };

        await writeTokenData(tokenDataWithExpiry);
        console.log('✅ New OAuth tokens saved successfully');
        // console.log('🔑 Access token expires in:', tokenData.expires_in, 'seconds');

        // Debug environment variable
        console.log('🔍 DASHBOARD_URL from env:', process.env.DASHBOARD_URL);

        if (!process.env.DASHBOARD_URL) {
            console.error('❌ DASHBOARD_URL environment variable is not defined');
            return res.status(500).json({
                error: true,
                message: 'Dashboard URL configuration is missing'
            });
        }

        const dashboardUrl = `${process.env.DASHBOARD_URL}/login?access_token=${tokenData.access_token}&refresh_token=${tokenData.refresh_token}&expires_in=${tokenData.expires_in}&token_type=${tokenData.token_type}&scope=${encodeURIComponent(tokenData.scope)}`;
        console.log('🔗 Redirecting to:', dashboardUrl);
        return res.redirect(dashboardUrl);
    } catch (error) {
        console.error('❌ Token generation failed:', error);
        console.error('Error details:', error.response?.data || error.message);

        // If it's a configuration error, return a more specific message
        if (error.message && error.message.includes('dashboardUrl is not defined')) {
            return res.status(500).json({
                error: true,
                message: 'Server configuration error: Dashboard URL not configured',
                details: 'DASHBOARD_URL environment variable is missing'
            });
        }

        return res.status(401).json({
            error: true,
            message: 'Token generation failed',
            details: error.response?.data || error.message
        });
    }
});

// Refresh access token
router.get('/auth/refreshAccessToken', async (req, res) => {
    try {
        const accessToken = await refreshAccessToken();
        // Log the access token being refreshed
        // console.log('Access token refreshed:', accessToken);
        res.status(200).json({
            message: 'Access token refreshed successfully.',
            accessToken
        });
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to refresh access token.',
            details: error.message
        });
    }
});

module.exports = router;