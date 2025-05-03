const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { refreshAccessToken } = require('../utils/tokenManager');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
require('dotenv').config();

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

// GET route to fetch all clients
router.get('/clients', async (req, res) => {
    try {
        // Ensure the access token is refreshed before making API calls
        const accessToken = await refreshAccessToken();
        servicem8.auth(accessToken);

        const data = await handleServiceM8Request(() => servicem8.getCompanyAll());
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
            active: req.body.active || 1
        };

        const clientData = await handleServiceM8Request(() => servicem8.postCompanyCreate(newClient));

        res.status(201).json({ message: 'Client created successfully', client: clientData });
    } catch (err) {
        console.error('Error creating client in ServiceM8:', err.response?.data || err.message);
        res.status(400).json({ error: 'Failed to create client in ServiceM8', details: err.response?.data });
    }
});

// Route to check if a client exists by UUID
router.get('/clientLogin/:uuid', async (req, res) => {
    try {
        const accessToken = await refreshAccessToken();
        servicem8.auth(accessToken);

        const { uuid } = req.params;

        servicem8.getCompanySingle({ uuid })
            .then(({ data }) => {
                if (data) {
                    res.status(200).json({ exists: true, client: data });
                } else {
                    res.status(404).json({ exists: false, message: 'Client not found' });
                }
            })
            .catch(err => {
                console.error('Error fetching client:', err.response?.data || err.message);
                res.status(500).json({ error: 'Failed to fetch client', details: err.response?.data });
            });
    } catch (err) {
        console.error('Error refreshing access token:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to refresh access token' });
    }
});

module.exports = router;