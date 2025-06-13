const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');
require('dotenv').config();

/**
 * SITES ROUTES - ServiceM8 Integration (READ-ONLY)
 * 
 * IMPORTANT: ServiceM8 location data is READ-ONLY. Most create, update, and delete operations
 * for location data have been disabled to ensure data integrity.
 * 
 * ALLOWED OPERATIONS:
 * - Read/View location data from ServiceM8
 * - Get client locations
 * - Get all locations (admin view)
 * 
 * DISABLED OPERATIONS:
 * - Location creation (POST /clients/:clientId/sites)
 * - Location updates (PUT /clients/:clientId/sites/:siteId)
 * - Location deletion (DELETE /clients/:clientId/sites/:siteId)
 *  * NOTES:
 * - Sites are actually locations in ServiceM8
 * - Data is fetched directly from ServiceM8 using getLocationAll()
 * - No Redis storage for locations - always fresh from ServiceM8
 * 
 * All disabled endpoints return HTTP 410 (Gone) with appropriate error messages.
 */

// Token middleware for ServiceM8 API authentication
const tokenMiddleware = async (req, res, next) => {
    try {
        const accessToken = await getValidAccessToken();
        if (!accessToken) {
            return res.status(401).json({
                error: 'ServiceM8 authentication failed',
                message: 'Unable to get valid access token for ServiceM8 API'
            });
        }
        
        // Set the auth for ServiceM8 API
        servicem8.auth(accessToken);
        req.accessToken = accessToken;
        next();
    } catch (error) {
        console.error('Token middleware error:', error);
        res.status(401).json({
            error: 'Authentication failed',
            message: 'Failed to authenticate with ServiceM8. Please try again.'
        });
    }
};

// Helper function to get all locations from ServiceM8
const getLocationsFromServiceM8 = async () => {
    try {
        const { data } = await servicem8.getLocationAll();
        return data || [];
    } catch (error) {
        console.error('Error fetching locations from ServiceM8:', error);
        return [];
    }
};

// Helper function to filter locations by client (if needed)
const filterLocationsByClient = (locations, clientId) => {
    // ServiceM8 locations might have company_uuid or similar field
    // Filter based on the client relationship
    return locations.filter(location => 
        location.company_uuid === clientId || 
        location.client_uuid === clientId ||
        location.clientId === clientId
    );
};
// Apply token middleware to routes that need ServiceM8 access
router.use(tokenMiddleware);

// GET all sites (locations) for a client
router.get('/clients/:clientId/sites', async (req, res) => {
    try {
        const { clientId } = req.params;
        
        // Fetch locations from ServiceM8
        const locations = await getLocationsFromServiceM8();
        
        // Filter locations for this client (if needed)
        // Note: ServiceM8 locations might be global or client-specific
        let clientLocations = locations;
        if (clientId && clientId !== 'all') {
            clientLocations = filterLocationsByClient(locations, clientId);
        }
        
        // Transform ServiceM8 location data to our site format
        const sites = clientLocations.map(location => ({
            id: location.uuid || location.id,
            name: location.name || location.location_name || 'Unnamed Location',
            address: location.address || `${location.street || ''} ${location.suburb || ''} ${location.state || ''} ${location.postcode || ''}`.trim(),
            description: location.description || location.notes || '',
            isDefault: false, // ServiceM8 doesn't have a default concept, we'll handle this separately
            active: location.active !== false, // Assume active unless explicitly false
            clientId: location.company_uuid || location.client_uuid || clientId,
            // Additional ServiceM8 location fields
            street: location.street,
            suburb: location.suburb,
            state: location.state,
            postcode: location.postcode,
            country: location.country,
            phone: location.phone,
            email: location.email,
            latitude: location.latitude,
            longitude: location.longitude,
            createdAt: location.edit_date || location.add_date,
            updatedAt: location.edit_date
        }));
        
        // If no sites found, provide a default fallback
        if (sites.length === 0) {
            sites.push({
                id: 'default',
                name: 'Main Office',
                address: '',
                description: 'Default location',
                isDefault: true,
                active: true,
                clientId: clientId
            });
        } else {
            // Set first site as default if none specified
            sites[0].isDefault = true;
        }
        
        res.json({
            success: true,
            sites: sites,
            count: sites.length,
            source: 'ServiceM8'
        });
    } catch (error) {
        console.error('Error fetching locations from ServiceM8:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch locations from ServiceM8',
            details: error.message
        });
    }
});

// GET all sites globally (admin view)
router.get('/sites/all', async (req, res) => {
    try {
        // Fetch all locations from ServiceM8
        const locations = await getLocationsFromServiceM8();
        
        // Transform ServiceM8 location data to our site format
        const sites = locations.map(location => ({
            id: location.uuid || location.id,
            name: location.name || location.location_name || 'Unnamed Location',
            address: location.address || `${location.street || ''} ${location.suburb || ''} ${location.state || ''} ${location.postcode || ''}`.trim(),
            description: location.description || location.notes || '',
            isDefault: false,
            active: location.active !== false,
            clientId: location.company_uuid || location.client_uuid || 'unknown',
            // Additional ServiceM8 location fields
            street: location.street,
            suburb: location.suburb,
            state: location.state,
            postcode: location.postcode,
            country: location.country,
            phone: location.phone,
            email: location.email,
            latitude: location.latitude,
            longitude: location.longitude,
            createdAt: location.edit_date || location.add_date,
            updatedAt: location.edit_date
        }));
        
        res.json({
            success: true,
            sites: sites,
            count: sites.length,
            totalClients: [...new Set(sites.map(s => s.clientId))].length,
            source: 'ServiceM8'
        });
    } catch (error) {
        console.error('Error fetching all locations from ServiceM8:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch all locations from ServiceM8',
            details: error.message
        });
    }
});

// POST create a new site for a client (DISABLED - ServiceM8 site data is read-only)
router.post('/clients/:clientId/sites', async (req, res) => {
    return res.status(410).json({
        error: 'Site creation has been disabled',
        message: 'ServiceM8 site data is read-only. Site creation is not allowed.',
        code: 'OPERATION_DISABLED'
    });
});

// PUT update a site (DISABLED - ServiceM8 site data is read-only)
router.put('/clients/:clientId/sites/:siteId', async (req, res) => {
    return res.status(410).json({
        error: 'Site updates have been disabled',
        message: 'ServiceM8 site data is read-only. Site updates are not allowed.',
        code: 'OPERATION_DISABLED'
    });
});

// DELETE a site (DISABLED - ServiceM8 site data is read-only)
router.delete('/clients/:clientId/sites/:siteId', async (req, res) => {
    return res.status(410).json({
        error: 'Site deletion has been disabled',
        message: 'ServiceM8 site data is read-only. Site deletion is not allowed.',
        code: 'OPERATION_DISABLED'
    });
});

// GET default site for a client
router.get('/clients/:clientId/sites/default', async (req, res) => {
    try {
        const { clientId } = req.params;
        
        // Fetch locations from ServiceM8
        const locations = await getLocationsFromServiceM8();
        let clientLocations = filterLocationsByClient(locations, clientId);
        
        if (clientLocations.length === 0) {
            return res.status(404).json({
                error: true,
                message: 'No sites found for this client'
            });
        }
        
        // Return first location as default (ServiceM8 doesn't have default concept)
        const defaultSite = {
            id: clientLocations[0].uuid || clientLocations[0].id,
            name: clientLocations[0].name || clientLocations[0].location_name || 'Default Location',
            address: clientLocations[0].address || `${clientLocations[0].street || ''} ${clientLocations[0].suburb || ''} ${clientLocations[0].state || ''} ${clientLocations[0].postcode || ''}`.trim(),
            description: clientLocations[0].description || clientLocations[0].notes || '',
            isDefault: true,
            active: clientLocations[0].active !== false,
            clientId: clientId
        };
        
        res.json({
            success: true,
            site: defaultSite,
            source: 'ServiceM8'
        });
    } catch (error) {
        console.error('Error fetching default site:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch default site from ServiceM8',
            details: error.message
        });
    }
});

// PUT set a site as default (DISABLED - ServiceM8 locations are read-only)
router.put('/clients/:clientId/sites/:siteId/set-default', async (req, res) => {
    return res.status(410).json({
        error: 'Setting default site has been disabled',
        message: 'ServiceM8 location data is read-only. Default site setting is not supported.',
        code: 'OPERATION_DISABLED'
    });
});

module.exports = router;
