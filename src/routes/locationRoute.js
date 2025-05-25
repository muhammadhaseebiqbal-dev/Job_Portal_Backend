const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');
const { v4: uuidv4 } = require('uuid');

// Middleware to ensure a valid token for all location routes
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

// GET all locations
router.get('/locations', async (req, res) => {
    try {
        const { data } = await servicem8.getLocationAll();
        res.json(data);
    } catch (err) {
        console.error('Error fetching locations from ServiceM8:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch locations from ServiceM8' });
    }
});

// GET locations for a specific client
router.get('/locations/client/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params;
        const { data: allLocations } = await servicem8.getLocationAll();
        
        // Filter locations for the specific client
        // Note: ServiceM8 locations might not have direct client association,
        // so we'll need to implement client-location mapping
        const clientLocations = allLocations.filter(location => 
            location.client_uuid === clientId || 
            location.company_uuid === clientId
        );
        
        res.json(clientLocations);
    } catch (err) {
        console.error('Error fetching client locations:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch client locations' });
    }
});

// POST create new location
router.post('/locations', async (req, res) => {
    try {        // Map frontend fields to ServiceM8 API fields
        const locationData = {
            uuid: req.body.uuid || uuidv4(),
            // Required fields for ServiceM8
            name: req.body.location_name || req.body.name || `Site - ${req.body.address}`,
            state: req.body.state || 'VIC', // state is required, default to VIC if not provided
            
            // ServiceM8 uses different address field structure
            line1: req.body.address || req.body.line1 || '', // Main address line
            line2: req.body.address_2 || req.body.line2 || '',
            line3: req.body.line3 || '',
            city: req.body.city || '',
            post_code: req.body.postcode || req.body.post_code || '', // ServiceM8 uses post_code
            country: req.body.country || 'Australia',
            
            // Optional fields
            lng: req.body.lng,
            lat: req.body.lat,
            active: req.body.active || 1
            
            // Note: client_uuid is not supported by ServiceM8 location API
            // ServiceM8 locations are not directly associated with companies
        };

        console.log('Frontend data received:', req.body);
        console.log('Mapped data for ServiceM8:', locationData);

        const { data } = await servicem8.postLocationCreate(locationData);
        
        res.status(201).json({ 
            success: true,
            message: 'Location created successfully', 
            location: { ...locationData, ...data }
        });
    } catch (err) {
        console.error('Error creating location in ServiceM8:', err.response?.data || err.message);
        res.status(400).json({ 
            success: false,
            error: 'Failed to create location in ServiceM8', 
            details: err.response?.data 
        });
    }
});

// GET single location
router.get('/locations/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
        const { data } = await servicem8.getLocationSingle({ uuid });
        res.json(data);
    } catch (err) {
        console.error('Error fetching location:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch location', details: err.response?.data });
    }
});

// PUT update location
router.put('/locations/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
          // Map frontend fields to ServiceM8 API fields for updates
        const locationUpdate = {
            uuid,
            // Required fields for ServiceM8
            name: req.body.location_name || req.body.name,
            state: req.body.state || 'VIC', // state is required
            
            // ServiceM8 address structure
            line1: req.body.address || req.body.line1 || '',
            line2: req.body.address_2 || req.body.line2 || '',
            line3: req.body.line3 || '',
            city: req.body.city,
            post_code: req.body.postcode || req.body.post_code || '',
            country: req.body.country,
            
            // Optional fields
            lng: req.body.lng,
            lat: req.body.lat,
            active: req.body.active
            
            // Note: ServiceM8 locations don't support client_uuid
        };

        console.log('Frontend update data received:', req.body);
        console.log('Mapped update data for ServiceM8:', locationUpdate);

        const result = await servicem8.postLocationSingle(locationUpdate, { uuid });
        
        res.status(200).json({ 
            success: true,
            message: 'Location updated successfully', 
            location: locationUpdate
        });
    } catch (err) {
        console.error('Error updating location in ServiceM8:', err.response?.data || err.message);
        res.status(400).json({ 
            success: false,
            error: 'Failed to update location in ServiceM8', 
            details: err.response?.data 
        });
    }
});

// DELETE location (archives it in ServiceM8)
router.delete('/locations/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
        await servicem8.deleteLocationSingle({ uuid });
        
        res.status(200).json({ 
            success: true,
            message: 'Location archived successfully' 
        });
    } catch (err) {
        console.error('Error archiving location in ServiceM8:', err.response?.data || err.message);
        res.status(400).json({ 
            success: false,
            error: 'Failed to archive location in ServiceM8', 
            details: err.response?.data 
        });
    }
});

// Helper route to create a location from job address
router.post('/locations/from-job-address', async (req, res) => {
    try {
        const { client_uuid, job_address, location_name } = req.body;
        
        if (!client_uuid || !job_address) {
            return res.status(400).json({ 
                error: 'client_uuid and job_address are required' 
            });
        }

        // Parse address components if possible
        const addressParts = job_address.split(',').map(part => part.trim());
          // Map fields properly for ServiceM8 API
        const locationData = {
            uuid: uuidv4(),
            name: location_name || `Site - ${addressParts[0]}`,
            
            // ServiceM8 requires state and uses different address structure
            state: addressParts[2] || 'VIC', // Required field, default to VIC
            line1: job_address,              // ServiceM8 uses line1 for main address
            line2: '',
            line3: '',
            city: addressParts[1] || '',
            post_code: addressParts[3] || '', // ServiceM8 uses post_code
            country: addressParts[4] || 'Australia',
            active: 1
            
            // Note: ServiceM8 locations don't support client_uuid direct association
        };

        console.log('Creating location from job address with mapped data:', locationData);

        const { data } = await servicem8.postLocationCreate(locationData);
        
        res.status(201).json({ 
            success: true,
            message: 'Location created from job address', 
            location: { ...locationData, ...data }
        });
    } catch (err) {
        console.error('Error creating location from job address:', err.response?.data || err.message);
        res.status(400).json({ 
            success: false,
            error: 'Failed to create location', 
            details: err.response?.data 
        });
    }
});

module.exports = router;
