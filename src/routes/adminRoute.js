const express = require('express');
const { Redis } = require('@upstash/redis');
const router = express.Router();

require('dotenv').config();

// Initialize Redis client using environment variables from Upstash integration
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

// Default admin settings
const defaultAdminSettings = {
    company: 'MH IT Solutions',
    businessEmail: 'info@mhitsolutions.com',
    phone: '+61 2 1234 5678',
    address: '123 Business Ave, Suite 100, Sydney, NSW 2000',
    abn: '12 345 678 901',
    timezone: 'Australia/Sydney',
};

// GET /api/admin/settings - Get admin settings
router.get('/settings', async (req, res) => {
    try {
        console.log('📖 Fetching admin settings from Upstash...');
        
        // Get settings from Redis
        const settings = await redis.get('admin:settings');
        
        if (settings) {
            console.log('✅ Admin settings found in Upstash');
            res.json({
                success: true,
                settings: settings
            });
        } else {
            console.log('📝 No admin settings found, returning defaults');
            // Return default settings if none exist
            res.json({
                success: true,
                settings: defaultAdminSettings
            });
        }
    } catch (error) {
        console.error('❌ Error fetching admin settings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch admin settings',
            error: error.message
        });
    }
});

// PUT /api/admin/settings - Update admin settings
router.put('/settings', async (req, res) => {
    try {
        console.log('💾 Saving admin settings to Upstash...');
        console.log('📝 Settings data:', req.body);
        
        const {
            company,
            businessEmail,
            phone,
            address,
            abn,
            timezone
        } = req.body;

        // Validate required fields
        if (!company || !businessEmail || !phone || !address || !abn || !timezone) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(businessEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Prepare settings object
        const settings = {
            company: company.trim(),
            businessEmail: businessEmail.trim().toLowerCase(),
            phone: phone.trim(),
            address: address.trim(),
            abn: abn.trim(),
            timezone: timezone.trim(),
            updatedAt: new Date().toISOString()
        };

        // Save to Redis
        await redis.set('admin:settings', settings);
        
        console.log('✅ Admin settings saved successfully to Upstash');
        
        res.json({
            success: true,
            message: 'Admin settings saved successfully',
            settings: settings
        });
        
    } catch (error) {
        console.error('❌ Error saving admin settings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save admin settings',
            error: error.message
        });
    }
});

module.exports = router;