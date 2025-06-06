const express = require('express');
const router = express.Router();
const { Redis } = require('@upstash/redis');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Initialize Redis client for site storage
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

// Helper function to store client sites
const storeClientSites = async (clientUuid, sites) => {
    try {
        const siteKey = `client:sites:${clientUuid}`;
        const siteData = {
            clientUuid,
            sites: Array.isArray(sites) ? sites : [],
            updatedAt: new Date().toISOString()
        };
        
        await redis.set(siteKey, siteData);
        console.log(`Stored sites for client ${clientUuid}:`, sites);
        return true;
    } catch (error) {
        console.error('Error storing client sites:', error);
        return false;
    }
};

// Helper function to get client sites
const getClientSites = async (clientUuid) => {
    try {
        const siteKey = `client:sites:${clientUuid}`;
        const siteData = await redis.get(siteKey);
        
        if (siteData && siteData.sites) {
            return siteData.sites;
        }
        
        // Return default site if no sites found
        return [{
            id: uuidv4(),
            name: 'Main Office',
            address: '',
            description: 'Primary business location',
            isDefault: true,
            active: true,
            createdAt: new Date().toISOString()
        }];
    } catch (error) {
        console.error('Error getting client sites:', error);
        return [];
    }
};

// GET route to fetch all sites for a client
router.get('/clients/:clientId/sites', async (req, res) => {
    try {
        const { clientId } = req.params;
        
        if (!clientId) {
            return res.status(400).json({
                error: true,
                message: 'Client ID is required.'
            });
        }
        
        const sites = await getClientSites(clientId);
        
        res.status(200).json({
            success: true,
            clientId,
            sites
        });
    } catch (error) {
        console.error('Error fetching client sites:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch client sites.',
            details: error.message
        });
    }
});

// POST route to create a new site for a client
router.post('/clients/:clientId/sites', async (req, res) => {
    try {
        const { clientId } = req.params;
        const { name, address, description, isDefault } = req.body;
        
        if (!clientId) {
            return res.status(400).json({
                error: true,
                message: 'Client ID is required.'
            });
        }
        
        if (!name) {
            return res.status(400).json({
                error: true,
                message: 'Site name is required.'
            });
        }
        
        // Get existing sites
        const existingSites = await getClientSites(clientId);
        
        // If this is set as default, make all other sites non-default
        if (isDefault) {
            existingSites.forEach(site => {
                site.isDefault = false;
            });
        }
        
        // Create new site
        const newSite = {
            id: uuidv4(),
            name: name.trim(),
            address: address || '',
            description: description || '',
            isDefault: isDefault || false,
            active: true,
            createdAt: new Date().toISOString()
        };
        
        // Add new site to the list
        const updatedSites = [...existingSites, newSite];
        
        // Store updated sites
        const success = await storeClientSites(clientId, updatedSites);
        
        if (success) {
            res.status(201).json({
                success: true,
                message: 'Site created successfully.',
                site: newSite,
                sites: updatedSites
            });
        } else {
            res.status(500).json({
                error: true,
                message: 'Failed to create site.'
            });
        }
    } catch (error) {
        console.error('Error creating site:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to create site.',
            details: error.message
        });
    }
});

// PUT route to update a site
router.put('/clients/:clientId/sites/:siteId', async (req, res) => {
    try {
        const { clientId, siteId } = req.params;
        const { name, address, description, isDefault, active } = req.body;
        
        if (!clientId || !siteId) {
            return res.status(400).json({
                error: true,
                message: 'Client ID and Site ID are required.'
            });
        }
        
        // Get existing sites
        const existingSites = await getClientSites(clientId);
        
        // Find the site to update
        const siteIndex = existingSites.findIndex(site => site.id === siteId);
        
        if (siteIndex === -1) {
            return res.status(404).json({
                error: true,
                message: 'Site not found.'
            });
        }
        
        // If this is set as default, make all other sites non-default
        if (isDefault) {
            existingSites.forEach(site => {
                site.isDefault = false;
            });
        }
        
        // Update the site
        const updatedSite = {
            ...existingSites[siteIndex],
            ...(name && { name: name.trim() }),
            ...(address !== undefined && { address }),
            ...(description !== undefined && { description }),
            ...(isDefault !== undefined && { isDefault }),
            ...(active !== undefined && { active }),
            updatedAt: new Date().toISOString()
        };
        
        existingSites[siteIndex] = updatedSite;
        
        // Store updated sites
        const success = await storeClientSites(clientId, existingSites);
        
        if (success) {
            res.status(200).json({
                success: true,
                message: 'Site updated successfully.',
                site: updatedSite,
                sites: existingSites
            });
        } else {
            res.status(500).json({
                error: true,
                message: 'Failed to update site.'
            });
        }
    } catch (error) {
        console.error('Error updating site:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to update site.',
            details: error.message
        });
    }
});

// DELETE route to delete a site
router.delete('/clients/:clientId/sites/:siteId', async (req, res) => {
    try {
        const { clientId, siteId } = req.params;
        
        if (!clientId || !siteId) {
            return res.status(400).json({
                error: true,
                message: 'Client ID and Site ID are required.'
            });
        }
        
        // Get existing sites
        const existingSites = await getClientSites(clientId);
        
        // Find the site to delete
        const siteToDelete = existingSites.find(site => site.id === siteId);
        
        if (!siteToDelete) {
            return res.status(404).json({
                error: true,
                message: 'Site not found.'
            });
        }
        
        // Prevent deletion of the last remaining site
        if (existingSites.length === 1) {
            return res.status(400).json({
                error: true,
                message: 'Cannot delete the last remaining site. At least one site must exist.'
            });
        }
        
        // Remove the site
        const updatedSites = existingSites.filter(site => site.id !== siteId);
        
        // If we deleted the default site, make another one default
        if (siteToDelete.isDefault && updatedSites.length > 0) {
            updatedSites[0].isDefault = true;
        }
        
        // Store updated sites
        const success = await storeClientSites(clientId, updatedSites);
        
        if (success) {
            res.status(200).json({
                success: true,
                message: 'Site deleted successfully.',
                sites: updatedSites
            });
        } else {
            res.status(500).json({
                error: true,
                message: 'Failed to delete site.'
            });
        }
    } catch (error) {
        console.error('Error deleting site:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to delete site.',
            details: error.message
        });
    }
});

// GET route to get the default site for a client
router.get('/clients/:clientId/sites/default', async (req, res) => {
    try {
        const { clientId } = req.params;
        
        if (!clientId) {
            return res.status(400).json({
                error: true,
                message: 'Client ID is required.'
            });
        }
        
        const sites = await getClientSites(clientId);
        const defaultSite = sites.find(site => site.isDefault) || sites[0];
        
        res.status(200).json({
            success: true,
            clientId,
            defaultSite
        });
    } catch (error) {
        console.error('Error fetching default site:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch default site.',
            details: error.message
        });
    }
});

// PUT route to set a site as default
router.put('/clients/:clientId/sites/:siteId/set-default', async (req, res) => {
    try {
        const { clientId, siteId } = req.params;
        
        if (!clientId || !siteId) {
            return res.status(400).json({
                error: true,
                message: 'Client ID and Site ID are required.'
            });
        }
        
        // Get existing sites
        const existingSites = await getClientSites(clientId);
        
        // Find the site to set as default
        const siteIndex = existingSites.findIndex(site => site.id === siteId);
        
        if (siteIndex === -1) {
            return res.status(404).json({
                error: true,
                message: 'Site not found.'
            });
        }
        
        // Make all sites non-default first
        existingSites.forEach(site => {
            site.isDefault = false;
        });
        
        // Set the target site as default
        existingSites[siteIndex].isDefault = true;
        existingSites[siteIndex].updatedAt = new Date().toISOString();
        
        // Store updated sites
        const success = await storeClientSites(clientId, existingSites);
        
        if (success) {
            res.status(200).json({
                success: true,
                message: 'Default site updated successfully.',
                defaultSite: existingSites[siteIndex],
                sites: existingSites
            });
        } else {
            res.status(500).json({
                error: true,
                message: 'Failed to update default site.'
            });
        }
    } catch (error) {
        console.error('Error setting default site:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to set default site.',
            details: error.message
        });
    }
});

module.exports = router;
