const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { Redis } = require('@upstash/redis');
require('dotenv').config();

/**
 * SITES ROUTES - ServiceM8 Integration (READ-ONLY)
 * 
 * IMPORTANT: ServiceM8 site data is READ-ONLY. All create, update, and delete operations
 * for site data have been disabled to ensure data integrity.
 * 
 * ALLOWED OPERATIONS:
 * - Read/View site data from ServiceM8
 * - Get client sites
 * - Get default site
 * - Get all sites (admin view)
 * 
 * DISABLED OPERATIONS:
 * - Site creation (POST /clients/:clientId/sites)
 * - Site updates (PUT /clients/:clientId/sites/:siteId)
 * - Site deletion (DELETE /clients/:clientId/sites/:siteId)
 * - Set default site (PUT /clients/:clientId/sites/:siteId/set-default)
 * 
 * All disabled endpoints return HTTP 410 (Gone) with appropriate error messages.
 */

// Initialize Redis client for sites storage
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

// Helper function to get all sites for a client (READ-ONLY)
const getClientSites = async (clientId) => {
    try {
        const sitesKey = `client:sites:${clientId}`;
        const sites = await redis.get(sitesKey);
        return sites || [];
    } catch (error) {
        console.error('Error getting client sites:', error);
        return [];
    }
};

// Helper function to store sites for a client (DISABLED)
// This function is disabled since ServiceM8 site data is now read-only
const storeClientSites = async (clientId, sites) => {
    console.warn('storeClientSites called but site data modifications are disabled');
    return false;
};

// GET all sites for a client
router.get('/clients/:clientId/sites', async (req, res) => {
    try {
        const { clientId } = req.params;
        const sites = await getClientSites(clientId);
          res.json({
            success: true,
            sites: sites
        });
    } catch (error) {
        console.error('Error fetching sites:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch sites'
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
        const sites = await getClientSites(clientId);
        
        const defaultSite = sites.find(site => site.isDefault);
        
        if (defaultSite) {            res.json({
                success: true,
                site: defaultSite
            });
        } else {
            res.status(404).json({
                error: true,
                message: 'No default site found'
            });
        }
    } catch (error) {
        console.error('Error fetching default site:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch default site'
        });
    }
});

// PUT set a site as default (DISABLED - ServiceM8 site data is read-only)
router.put('/clients/:clientId/sites/:siteId/set-default', async (req, res) => {
    return res.status(410).json({
        error: 'Setting default site has been disabled',
        message: 'ServiceM8 site data is read-only. Modifying default site is not allowed.',
        code: 'OPERATION_DISABLED'
    });
});

// GET all sites from all clients (global sites view)
router.get('/sites/all', async (req, res) => {
    try {
        console.log('Fetching all sites from all clients...');
        
        // Get all keys that match the client sites pattern
        const allKeys = await redis.keys('client:sites:*');
        console.log(`Found ${allKeys.length} client site keys`);
        
        const allSites = [];
        
        // Fetch sites for each client
        for (const key of allKeys) {
            try {
                const clientId = key.replace('client:sites:', '');
                const sites = await redis.get(key);
                
                if (sites && Array.isArray(sites)) {
                    // Add client information to each site
                    const sitesWithClient = sites.map(site => ({
                        ...site,
                        clientId: clientId,
                        clientInfo: {
                            id: clientId,
                            // We could fetch more client details from ServiceM8 API if needed
                        }
                    }));
                    
                    allSites.push(...sitesWithClient);
                }
            } catch (clientError) {
                console.error(`Error fetching sites for client ${key}:`, clientError);
                // Continue with other clients
            }
        }
        
        console.log(`Total sites found: ${allSites.length}`);
        
        // Sort sites by name for better UX
        allSites.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        
        res.json({
            success: true,
            sites: allSites,
            totalSites: allSites.length,
            totalClients: allKeys.length
        });
    } catch (error) {
        console.error('Error fetching all sites:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch all sites'
        });
    }
});

module.exports = router;
