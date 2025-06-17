const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');
require('dotenv').config();

/**
 * SITES ROUTES - ServiceM8 Integration (READ-ONLY)
 * 
 * IMPORTANT: ServiceM8 site data is READ-ONLY and fetched directly from ServiceM8 locations API.
 * In ServiceM8, sites are referred to as "locations" in the API.
 * 
 * ALLOWED OPERATIONS:
 * - Read/View location data from ServiceM8 as "sites"
 * - Get all locations for client sites
 * - Get all sites (admin view)
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

// Middleware to ensure a valid token for all site routes
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

// Helper function to transform ServiceM8 location to site format
const transformLocationToSite = (location) => {
    return {
        uuid: location.uuid,
        id: location.uuid, // For backward compatibility
        name: location.name,
        address: location.line1 || '',
        address_2: location.line2 || '',
        city: location.city || '',
        state: location.state || '',
        postcode: location.post_code || '',
        country: location.country || 'Australia',
        isDefault: false, // ServiceM8 locations don't have a default concept per client
        active: location.active === 1 || location.active === '1',
        // Keep original ServiceM8 fields for reference
        servicem8_data: {
            line1: location.line1,
            line2: location.line2,
            line3: location.line3,
            post_code: location.post_code,
            phone_1: location.phone_1,
            lat: location.lat,
            lng: location.lng
        }
    };
};

// Helper function to get all sites from ServiceM8 locations
const getAllSitesFromServiceM8 = async () => {
    try {
        const { data: locations } = await servicem8.getLocationAll();
        console.log(`Retrieved ${locations.length} locations from ServiceM8`);
        
        // Transform locations to site format and filter active ones
        const sites = locations
            .filter(location => location.active === 1 || location.active === '1')
            .map(transformLocationToSite);
            
        console.log(`Transformed ${sites.length} active locations to sites`);
        return sites;
    } catch (error) {
        console.error('Error fetching locations from ServiceM8:', error);
        throw error;
    }
};

// GET all sites for a client - now fetches from ServiceM8 locations
router.get('/clients/:clientId/sites', async (req, res) => {
    try {
        const { clientId } = req.params;
        console.log(`Fetching sites for client: ${clientId}`);
        
        // Get all active locations from ServiceM8 and transform to sites
        const sites = await getAllSitesFromServiceM8();
        
        // Note: ServiceM8 locations are not client-specific, so we return all active locations
        // In a real implementation, you might want to filter based on job associations or other criteria
        console.log(`Returning ${sites.length} sites for client ${clientId}`);
        
        res.json({
            success: true,
            sites: sites,
            count: sites.length,
            totalClients: [...new Set(sites.map(s => s.clientId))].length,
            source: 'ServiceM8'
        });
    } catch (error) {
        console.error('Error fetching sites from ServiceM8:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch sites from ServiceM8',
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

// GET default site for a client - now uses ServiceM8 locations
router.get('/clients/:clientId/sites/default', async (req, res) => {
    try {
        const { clientId } = req.params;
        console.log(`Fetching default site for client: ${clientId}`);
        
        // Get all sites from ServiceM8
        const sites = await getAllSitesFromServiceM8();
        
        // Since ServiceM8 doesn't have a concept of default sites per client,
        // we'll return the first active site or a specific one based on your business logic
        const defaultSite = sites.length > 0 ? sites[0] : null;
        
        if (defaultSite) {
            res.json({
                success: true,
                site: defaultSite
            });        } else {
            res.status(404).json({
                error: true,
                message: 'No sites found'
            });
        }
    } catch (error) {
        console.error('Error fetching default site from ServiceM8:', error);
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

// GET all sites from all clients (global sites view) - now fetches from ServiceM8 locations
router.get('/sites/all', async (req, res) => {
    try {
        console.log('Fetching all sites from ServiceM8 locations...');
        
        // Get all active locations from ServiceM8 and transform to sites
        const allSites = await getAllSitesFromServiceM8();
        
        // Sort sites by name for better UX
        allSites.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        
        console.log(`Total sites found: ${allSites.length}`);
        
        res.json({
            success: true,
            sites: allSites,
            totalSites: allSites.length,
            source: 'ServiceM8 Locations API'
        });
    } catch (error) {
        console.error('Error fetching all sites from ServiceM8:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch all sites from ServiceM8',
            details: error.message
        });
    }
});

// GET sites extracted from client jobs - matches ClientSites.jsx implementation
router.get('/clients/:clientId/sites/from-jobs', async (req, res) => {
    try {
        const { clientId } = req.params;
        console.log(`Extracting sites from jobs for client: ${clientId}`);
        
        // We need to import the JobsRoutes logic here or make an internal call
        // For now, let's use the servicem8 API directly like JobsRoutes does
        const servicem8 = require('@api/servicem8');
        
        // Get all jobs and filter for this client (same logic as JobsRoutes)
        const { data: allJobs } = await servicem8.getJobAll();
        
        const clientJobs = allJobs.filter(job => {
            const isClientJob = job.company_uuid === clientId || 
                               job.created_by_staff_uuid === clientId ||
                               job.client_uuid === clientId;
            const isActiveJob = job.active === 1 || job.active === '1' || job.active === true;
            const isNotUnsuccessful = job.status !== 'Unsuccessful' && 
                                    job.status !== 'Cancelled' && 
                                    job.status !== 'Rejected';
            return isClientJob && isActiveJob && isNotUnsuccessful;
        });
        
        console.log(`Found ${clientJobs.length} jobs for site extraction`);
        
        // Extract unique sites from jobs (same logic as ClientSites.jsx)
        const uniqueAddresses = new Set();
        const extractedSites = [];
        
        clientJobs.forEach((job, index) => {
            const address = job.job_address;
            
            if (address && !uniqueAddresses.has(address)) {
                uniqueAddresses.add(address);
                
                const site = {
                    id: `site-${index}`,
                    uuid: `site-${index}`,
                    name: address.split(',')[0]?.trim() || `Site ${extractedSites.length + 1}`,
                    address: address,
                    active: true,
                    source: 'extracted_from_jobs'
                };
                
                extractedSites.push(site);
            }
        });
        
        extractedSites.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        
        console.log(`Extracted ${extractedSites.length} unique sites`);
        
        res.json({
            success: true,
            sites: extractedSites,
            totalSites: extractedSites.length,
            source: 'extracted_from_jobs'
        });
        
    } catch (error) {
        console.error('Error extracting sites from jobs:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to extract sites from jobs',
            details: error.message
        });
    }
});

module.exports = router;
