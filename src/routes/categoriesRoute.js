const express = require('express');
const servicem8 = require('@api/servicem8');
const router = express.Router();
require('dotenv').config();
const { getValidAccessToken } = require('../utils/tokenManager');

// Get all categories from ServiceM8 an 
router.get('/categories', async (req, res) => {
    try {
        const accessToken = await getValidAccessToken();
        servicem8.auth(accessToken);
        
        const response = await servicem8.getCategoryAll();
        
        // Filter only active categories and add custom fields for job portal
        const categories = response.data
            .filter(category => category.active === 1)
            .map(category => ({
                ...category,
                // Add custom fields for role-based access
                allowed_roles: category.allowed_roles || ['Administrator', 'Office Manager', 'Technician', 'Technician Apprentice'],
                category_type: category.category_type || 'general', // 'maintenance', 'project', 'general'
                description: category.description || category.name
            }));
        
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ 
            error: 'Failed to fetch categories',
            details: error.message 
        });
    }
});

// Create a new category
router.post('/categories', async (req, res) => {
    try {
        const accessToken = await getValidAccessToken();
        servicem8.auth(accessToken);
        
        const { name, description, category_type, allowed_roles } = req.body;
        
        // Create the category in ServiceM8
        const categoryData = {
            name: name,
            active: 1,
            // Store custom fields in ServiceM8 compatible format
            description: description || name,
            // Note: ServiceM8 may not support custom fields directly
            // We'll store role information in description or custom fields if available
        };
        
        const response = await servicem8.postCategoryCreate(categoryData);
        
        // Return enhanced category data
        const newCategory = {
            ...response.data,
            category_type: category_type || 'general',
            allowed_roles: allowed_roles || ['Administrator', 'Office Manager', 'Technician', 'Technician Apprentice']
        };
        
        res.json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ 
            error: 'Failed to create category',
            details: error.message 
        });
    }
});

// Update a category
router.put('/categories/:uuid', async (req, res) => {
    try {
        const accessToken = await getValidAccessToken();
        servicem8.auth(accessToken);
        
        const { uuid } = req.params;
        const { name, description, category_type, allowed_roles, active } = req.body;
        
        const categoryData = {
            name: name,
            description: description || name,
            active: active !== undefined ? active : 1
        };
        
        const response = await servicem8.postCategorySingle(categoryData, { uuid });
        
        // Return enhanced category data
        const updatedCategory = {
            ...response.data,
            category_type: category_type || 'general',
            allowed_roles: allowed_roles || ['Administrator', 'Office Manager', 'Technician', 'Technician Apprentice']
        };
        
        res.json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ 
            error: 'Failed to update category',
            details: error.message 
        });
    }
});

// Delete (archive) a category
router.delete('/categories/:uuid', async (req, res) => {
    try {
        const accessToken = await getValidAccessToken();
        servicem8.auth(accessToken);
        
        const { uuid } = req.params;
        
        // ServiceM8 archives records instead of deleting them
        const response = await servicem8.deleteCategorySingle({ uuid });
        
        res.json({ 
            success: true, 
            message: 'Category archived successfully',
            data: response.data 
        });
    } catch (error) {
        console.error('Error archiving category:', error);
        res.status(500).json({ 
            error: 'Failed to archive category',
            details: error.message 
        });
    }
});

// Get categories filtered by user role
router.get('/categories/role/:role', async (req, res) => {
    try {
        const accessToken = await getValidAccessToken();
        servicem8.auth(accessToken);
        
        const { role } = req.params;
        const { type } = req.query; // Optional: filter by category type (maintenance/project)
        
        const response = await servicem8.getCategoryAll();
        
        // Filter categories based on role and type
        let filteredCategories = response.data.filter(category => category.active === 1);
        
        // Apply role-based filtering
        // For now, we'll implement basic role-based access
        // Administrator and Office Manager can see all categories
        // Technicians can see maintenance categories
        // Technician Apprentices can see basic maintenance categories
        
        if (role === 'Technician') {
            // Technicians can see maintenance and general categories
            filteredCategories = filteredCategories.filter(category => {
                const categoryName = category.name.toLowerCase();
                return categoryName.includes('maintenance') || 
                       categoryName.includes('repair') || 
                       categoryName.includes('service') ||
                       categoryName.includes('general');
            });
        } else if (role === 'Technician Apprentice') {
            // Apprentices can see basic maintenance categories only
            filteredCategories = filteredCategories.filter(category => {
                const categoryName = category.name.toLowerCase();
                return categoryName.includes('basic') || 
                       categoryName.includes('routine') ||
                       categoryName.includes('inspection');
            });        } else if (role === 'Client Admin' || role === 'Client User') {
            // Clients can see service-related categories that are appropriate for client requests
            filteredCategories = filteredCategories.filter(category => {
                const categoryName = category.name.toLowerCase();
                // Allow common service categories that clients might need
                return categoryName.includes('domestic') || 
                       categoryName.includes('commercial') ||
                       categoryName.includes('maintenance') ||
                       categoryName.includes('repair') ||
                       categoryName.includes('air-conditioning') ||
                       categoryName.includes('construction') ||
                       categoryName.includes('real estate') ||
                       categoryName.includes('warranty') ||
                       categoryName.includes('insurance') ||
                       categoryName.includes('solar') ||
                       categoryName.includes('lighting') ||
                       categoryName.includes('digital') ||
                       categoryName.includes('strata') ||
                       // Allow "Uncategorized" as a fallback option
                       categoryName.includes('uncategorized') ||
                       // Also allow by category type
                       category.category_type === 'general';
            });
        }
        // Administrator and Office Manager see all categories (no additional filtering)
        
        // Apply type filtering if specified
        if (type) {
            filteredCategories = filteredCategories.filter(category => {
                const categoryName = category.name.toLowerCase();
                if (type === 'maintenance') {
                    return categoryName.includes('maintenance') || 
                           categoryName.includes('repair') || 
                           categoryName.includes('service');
                } else if (type === 'project') {
                    return categoryName.includes('project') || 
                           categoryName.includes('installation') || 
                           categoryName.includes('upgrade');
                }
                return true; // 'general' or no type filter
            });
        }
        
        // Enhance categories with role and type information
        const enhancedCategories = filteredCategories.map(category => ({
            ...category,
            category_type: getCategoryType(category.name),
            allowed_roles: getAllowedRoles(category.name),
            description: category.description || category.name
        }));
        
        res.json(enhancedCategories);
    } catch (error) {
        console.error('Error fetching role-filtered categories:', error);
        res.status(500).json({ 
            error: 'Failed to fetch categories for role',
            details: error.message 
        });
    }
});

// Helper function to determine category type based on name
function getCategoryType(categoryName) {
    const name = categoryName.toLowerCase();
    if (name.includes('maintenance') || name.includes('repair') || name.includes('service')) {
        return 'maintenance';
    } else if (name.includes('project') || name.includes('installation') || name.includes('upgrade')) {
        return 'project';
    }
    return 'general';
}

// Helper function to determine allowed roles based on category name
function getAllowedRoles(categoryName) {
    const name = categoryName.toLowerCase();
    
    if (name.includes('basic') || name.includes('routine') || name.includes('inspection')) {
        // Basic categories - all roles can access
        return ['Administrator', 'Office Manager', 'Technician', 'Technician Apprentice'];
    } else if (name.includes('advanced') || name.includes('complex') || name.includes('specialized')) {
        // Advanced categories - only experienced roles
        return ['Administrator', 'Office Manager', 'Technician'];
    } else if (name.includes('project') || name.includes('installation')) {
        // Project categories - admin and managers primarily
        return ['Administrator', 'Office Manager', 'Client Admin'];
    } else if (name.includes('domestic') || name.includes('commercial') || name.includes('maintenance') || 
               name.includes('repair') || name.includes('air-conditioning') || name.includes('construction') || 
               name.includes('real estate') || name.includes('warranty') || name.includes('insurance') || 
               name.includes('solar') || name.includes('lighting') || name.includes('digital') || 
               name.includes('strata') || name.includes('uncategorized')) {
        // Client-accessible service categories
        return ['Administrator', 'Office Manager', 'Technician', 'Technician Apprentice', 'Client Admin', 'Client User'];
    }
    
    // Default - most roles can access (excluding clients for security)
    return ['Administrator', 'Office Manager', 'Technician'];
}

module.exports = router;
