const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { Redis } = require('@upstash/redis');
require('dotenv').config();

// Initialize Redis client for sites storage
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

// Helper function to get all sites for a client
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

// Helper function to store sites for a client
const storeClientSites = async (clientId, sites) => {
    try {
        const sitesKey = `client:sites:${clientId}`;
        await redis.set(sitesKey, sites);
        return true;
    } catch (error) {
        console.error('Error storing client sites:', error);
        return false;
    }
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

// POST create a new site for a client
router.post('/clients/:clientId/sites', async (req, res) => {
    try {
        const { clientId } = req.params;
        const { name, address, description, isDefault = false } = req.body;

        if (!name || !address) {
            return res.status(400).json({
                error: true,
                message: 'Name and address are required'
            });
        }

        const sites = await getClientSites(clientId);
        
        // If this is the first site or isDefault is true, handle default logic
        const shouldBeDefault = sites.length === 0 || isDefault;
        
        // If setting as default, remove default from other sites
        if (shouldBeDefault) {
            sites.forEach(site => site.isDefault = false);
        }

        const newSite = {
            id: uuidv4(),
            name,
            address,
            description: description || '',
            isDefault: shouldBeDefault,
            active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        sites.push(newSite);
        
        const success = await storeClientSites(clientId, sites);
        
        if (success) {            res.status(201).json({
                success: true,
                site: newSite
            });
        } else {
            res.status(500).json({
                error: true,
                message: 'Failed to create site'
            });
        }
    } catch (error) {
        console.error('Error creating site:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to create site'
        });
    }
});

// PUT update a site
router.put('/clients/:clientId/sites/:siteId', async (req, res) => {
    try {
        const { clientId, siteId } = req.params;
        const { name, address, description, isDefault, active } = req.body;

        const sites = await getClientSites(clientId);
        const siteIndex = sites.findIndex(site => site.id === siteId);

        if (siteIndex === -1) {
            return res.status(404).json({
                error: true,
                message: 'Site not found'
            });
        }

        // If setting as default, remove default from other sites
        if (isDefault) {
            sites.forEach(site => site.isDefault = false);
        }

        // Update the site
        const updatedSite = {
            ...sites[siteIndex],
            ...(name !== undefined && { name }),
            ...(address !== undefined && { address }),
            ...(description !== undefined && { description }),
            ...(isDefault !== undefined && { isDefault }),
            ...(active !== undefined && { active }),
            updatedAt: new Date().toISOString()
        };

        sites[siteIndex] = updatedSite;
        
        const success = await storeClientSites(clientId, sites);
        
        if (success) {            res.json({
                success: true,
                site: updatedSite
            });
        } else {
            res.status(500).json({
                error: true,
                message: 'Failed to update site'
            });
        }
    } catch (error) {
        console.error('Error updating site:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to update site'
        });
    }
});

// DELETE a site
router.delete('/clients/:clientId/sites/:siteId', async (req, res) => {
    try {
        const { clientId, siteId } = req.params;

        const sites = await getClientSites(clientId);
        const siteIndex = sites.findIndex(site => site.id === siteId);

        if (siteIndex === -1) {
            return res.status(404).json({
                error: true,
                message: 'Site not found'
            });
        }

        const deletedSite = sites[siteIndex];
        sites.splice(siteIndex, 1);

        // If the deleted site was default and there are other sites, make the first one default
        if (deletedSite.isDefault && sites.length > 0) {
            sites[0].isDefault = true;
            sites[0].updatedAt = new Date().toISOString();
        }
        
        const success = await storeClientSites(clientId, sites);
        
        if (success) {            res.json({
                success: true,
                message: 'Site deleted successfully',
                site: deletedSite
            });
        } else {
            res.status(500).json({
                error: true,
                message: 'Failed to delete site'
            });
        }
    } catch (error) {
        console.error('Error deleting site:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to delete site'
        });
    }
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

// PUT set a site as default
router.put('/clients/:clientId/sites/:siteId/set-default', async (req, res) => {
    try {
        const { clientId, siteId } = req.params;

        const sites = await getClientSites(clientId);
        const siteIndex = sites.findIndex(site => site.id === siteId);

        if (siteIndex === -1) {
            return res.status(404).json({
                error: true,
                message: 'Site not found'
            });
        }

        // Remove default from all sites
        sites.forEach(site => site.isDefault = false);
        
        // Set the target site as default
        sites[siteIndex].isDefault = true;
        sites[siteIndex].updatedAt = new Date().toISOString();
        
        const success = await storeClientSites(clientId, sites);
        
        if (success) {            res.json({
                success: true,
                site: sites[siteIndex]
            });
        } else {
            res.status(500).json({
                error: true,
                message: 'Failed to set default site'
            });
        }
    } catch (error) {
        console.error('Error setting default site:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to set default site'
        });
    }
});

module.exports = router;
