const express = require('express');
const servicem8 = require('@api/servicem8');
const router = express.Router();
require('dotenv').config();
const { refreshAccessToken } = require('../utils/tokenManager');

// Helper function to handle API calls with token refresh
const handleServiceM8Request = async (apiCall) => {
    try {
        return await apiCall();
    } catch (err) {
        if (err.response?.status === 401) {
            console.warn('Access token expired. Refreshing token...');
            const accessToken = await refreshAccessToken();
            servicem8.auth(accessToken);
            return await apiCall();
        }
        throw err;
    }
};

// GET route to fetch all categories
router.get('/categories', async (req, res) => {
    try {
        const accessToken = await refreshAccessToken();
        servicem8.auth(accessToken);

        const data = await handleServiceM8Request(() => servicem8.getCategoryAll());
        res.json(data);
    } catch (err) {
        console.error('Error fetching categories from ServiceM8:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch categories from ServiceM8' });
    }
});

// POST route to create a new category
router.post('/categories', async (req, res) => {
    try {
        const accessToken = await refreshAccessToken();
        servicem8.auth(accessToken);

        const newCategory = {
            uuid: req.body.uuid,
            name: req.body.name,
            colour: req.body.colour || '#3B82F6', // Default blue color
            active: 1
        };

        const categoryData = await handleServiceM8Request(() => 
            servicem8.postCategoryCreate(newCategory)
        );
        
        res.status(201).json({ 
            message: 'Category created successfully', 
            category: categoryData 
        });
    } catch (err) {
        console.error('Error creating category in ServiceM8:', err.response?.data || err.message);
        res.status(400).json({ 
            error: 'Failed to create category in ServiceM8', 
            details: err.response?.data 
        });
    }
});

module.exports = router;
