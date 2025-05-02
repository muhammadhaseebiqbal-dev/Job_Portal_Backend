const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { refreshAccessToken } = require('../utils/tokenManager');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// GET route to fetch all clients
router.get('/clients', async (req, res) => {
    try {
        const accessToken = await refreshAccessToken();
        servicem8.auth(accessToken);

        servicem8.getCompanyAll()
            .then(({ data }) => res.json(data))
            .catch(err => {
                console.error('Error fetching clients from ServiceM8:', err.response?.data || err.message);
                res.status(500).json({ error: 'Failed to fetch clients from ServiceM8' });
            });
    } catch (err) {
        console.error('Error refreshing access token:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to refresh access token' });
    }
});

// POST route to register a new client
router.post('/clients', async (req, res) => {
    try {
        const accessToken = await refreshAccessToken();
        servicem8.auth(accessToken);

        const newClient = {
            uuid: req.body.uuid || uuidv4(), // Generate a valid UUID if not provided
            name: req.body.name,
            address: req.body.address,
            address_city: req.body.address_city,
            address_state: req.body.address_state,
            address_postcode: req.body.address_postcode,
            address_country: req.body.address_country,
            active: req.body.active || 1
        };

        servicem8.postCompanyCreate(newClient)
            .then(({ data }) => res.status(201).json(data))
            .catch(err => {
                console.error('Error creating client in ServiceM8:', err.response?.data || err.message);
                res.status(400).json({ error: 'Failed to create client in ServiceM8', details: err.response?.data });
            });
    } catch (err) {
        console.error('Error refreshing access token:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to refresh access token' });
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