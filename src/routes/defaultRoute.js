const express = require('express');
const router = express.Router();

// Default Route.
router.get('/', (req, res) => {
    res.send("Working")
})

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Job Portal Backend is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000
    });
});

// API Health check endpoint
router.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Job Portal Backend API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 5000,
        routes: {
            auth: '/api/auth',
            jobs: '/fetch/jobs',
            clients: '/fetch/clients',
            users: '/api/users',
            categories: '/api/categories',
            sites: '/api/sites'
        }
    });
});

module.exports = router