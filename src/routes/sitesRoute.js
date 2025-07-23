const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');
require('dotenv').config();

/**
 * SITES ROUTES - ServiceM8 Integration (READ-ONLY)
 * 
 * IMPORTANT: ServiceM8 site data is READ-ONLY and fetched directly from ServiceM8 companies API.
 * In ServiceM8, sites are represented as "companies" with parent-child relationships.
 * 
 * ALLOWED OPERATIONS:
 * - Read/View company data from ServiceM8 as "sites"
 * - Get all companies for client sites
 * - Get all sites (admin view)
 * - Get company hierarchy (parent-child relationships)
 * - Get child companies by parent UUID
 * 
 * DISABLED OPERATIONS:
 * - Company creation (POST /clients/:clientId/sites)
 * - Company updates (PUT /clients/:clientId/sites/:siteId)
 * - Company deletion (DELETE /clients/:clientId/sites/:siteId)
 * 
 * NOTES:
 * - Sites are actually companies in ServiceM8 with hierarchical relationships
 * - Data is fetched directly from ServiceM8 using getCompanyAll()
 * - No Redis storage for companies - always fresh from ServiceM8
 * - Parent companies can have multiple child companies (locations/branches)
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

// Helper function to transform ServiceM8 company to site format
const transformCompanyToSite = (company) => {
    return {
        uuid: company.uuid,
        id: company.uuid, // For backward compatibility
        name: company.name,
        address: company.address || '',
        address_street: company.address_street || '',
        city: company.address_city || '',
        state: company.address_state || '',
        postcode: company.address_postcode || '',
        country: company.address_country || 'Australia',
        billing_address: company.billing_address || '',
        website: company.website || '',
        abn_number: company.abn_number || '',
        parent_company_uuid: company.parent_company_uuid || '',
        isDefault: false, // ServiceM8 companies don't have a default concept per client
        active: company.active === 1 || company.active === '1',
        is_individual: company.is_individual === 1 || company.is_individual === '1',
        // Keep original ServiceM8 fields for reference
        servicem8_data: {
            edit_date: company.edit_date,
            badges: company.badges,
            fax_number: company.fax_number,
            tax_rate_uuid: company.tax_rate_uuid,
            billing_attention: company.billing_attention,
            payment_terms: company.payment_terms,
            customfield_payment_terms: company.customfield_payment_terms,
            customfield_proj_manager: company.customfield_proj_manager,
            customfield_job_documents: company.customfield_job_documents,
            customfield_groundplan: company.customfield_groundplan
        }
    };
};

// Helper function to get all sites from ServiceM8 companies
const getAllSitesFromServiceM8 = async () => {
    try {
        const { data: companies } = await servicem8.getCompanyAll();
        console.log(`Retrieved ${companies.length} companies from ServiceM8`);
        
        // Transform companies to site format and filter active ones
        const sites = companies
            .filter(company => company.active === 1 || company.active === '1')
            .map(transformCompanyToSite);
            
        console.log(`Transformed ${sites.length} active companies to sites`);
        return sites;
    } catch (error) {
        console.error('Error fetching companies from ServiceM8:', error);
        throw error;
    }
};

// GET all sites for a client - now filters companies by client UUID
router.get('/clients/:clientId/sites', async (req, res) => {
    try {
        const { clientId } = req.params;
        console.log(`Fetching sites for client: ${clientId}`);
        
        // Get all active companies from ServiceM8
        const { data: companies } = await servicem8.getCompanyAll();
        console.log(`Retrieved ${companies.length} companies from ServiceM8`);
        
        // Filter companies for this specific client and active status
        const clientCompanies = companies.filter(company => {
            const isClientCompany = company.uuid === clientId || 
                                   company.parent_company_uuid === clientId;
            const isActive = company.active === 1 || company.active === '1';
            return isClientCompany && isActive;
        });
        
        // Transform companies to site format
        const sites = clientCompanies.map(transformCompanyToSite);
        
        // Sort by name, with parent companies first, then children
        sites.sort((a, b) => {
            // Parent companies (no parent_company_uuid) come first
            if (!a.parent_company_uuid && b.parent_company_uuid) return -1;
            if (a.parent_company_uuid && !b.parent_company_uuid) return 1;
            
            // Then sort alphabetically within each group
            return (a.name || '').localeCompare(b.name || '');
        });
        
        console.log(`Returning ${sites.length} sites for client ${clientId}`);
        
        res.json({
            success: true,
            sites: sites,
            count: sites.length,
            clientId: clientId,
            source: 'ServiceM8 Companies API (Client Filtered)'
        });
    } catch (error) {
        console.error('Error fetching client sites from ServiceM8:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch client sites from ServiceM8',
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

// GET default site for a client - now uses client UUID to find parent or first site
router.get('/clients/:clientId/sites/default', async (req, res) => {
    try {
        const { clientId } = req.params;
        console.log(`Fetching default site for client: ${clientId}`);
        
        // Get all companies from ServiceM8
        const { data: companies } = await servicem8.getCompanyAll();
        
        // Find the parent company for this client
        const parentCompany = companies.find(company => 
            company.uuid === clientId && 
            (company.active === 1 || company.active === '1') &&
            !company.parent_company_uuid
        );
        
        let defaultSite = null;
        
        if (parentCompany) {
            // If client is a parent company, use it as default
            defaultSite = transformCompanyToSite(parentCompany);
        } else {
            // If client is a child company, find it
            const childCompany = companies.find(company => 
                company.uuid === clientId && 
                (company.active === 1 || company.active === '1')
            );
            
            if (childCompany) {
                defaultSite = transformCompanyToSite(childCompany);
            }
        }
        
        if (defaultSite) {
            res.json({
                success: true,
                site: defaultSite,
                isParent: !defaultSite.parent_company_uuid
            });
        } else {
            res.status(404).json({
                error: true,
                message: `No default site found for client ${clientId}`
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

// GET all sites from all clients (global sites view) - now fetches from ServiceM8 companies
router.get('/sites/all', async (req, res) => {
    try {
        console.log('Fetching all sites from ServiceM8 companies...');
        
        // Get all active companies from ServiceM8 and transform to sites
        const allSites = await getAllSitesFromServiceM8();
        
        // Sort sites by name for better UX
        allSites.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        
        console.log(`Total sites found: ${allSites.length}`);
        
        res.json({
            success: true,
            sites: allSites,
            totalSites: allSites.length,
            source: 'ServiceM8 Companies API'
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

// GET companies with parent-child relationships
router.get('/sites/companies/hierarchy', async (req, res) => {
    try {
        console.log('Fetching company hierarchy from ServiceM8...');
        
        const { data: companies } = await servicem8.getCompanyAll();
        console.log(`Retrieved ${companies.length} companies from ServiceM8`);
        
        // Filter active companies and organize by parent-child relationships
        const activeCompanies = companies.filter(company => company.active === 1 || company.active === '1');
        
        // Separate parent companies and child companies
        const parentCompanies = activeCompanies.filter(company => !company.parent_company_uuid);
        const childCompanies = activeCompanies.filter(company => company.parent_company_uuid);
        
        // Group child companies by parent UUID
        const companyHierarchy = parentCompanies.map(parent => {
            const children = childCompanies.filter(child => child.parent_company_uuid === parent.uuid);
            return {
                parent: transformCompanyToSite(parent),
                children: children.map(transformCompanyToSite),
                childCount: children.length
            };
        });
        
        // Also include orphaned child companies (where parent might not be active)
        const orphanedChildren = childCompanies.filter(child => 
            !parentCompanies.find(parent => parent.uuid === child.parent_company_uuid)
        );
        
        console.log(`Found ${parentCompanies.length} parent companies, ${childCompanies.length} child companies, ${orphanedChildren.length} orphaned children`);
        
        res.json({
            success: true,
            hierarchy: companyHierarchy,
            orphanedChildren: orphanedChildren.map(transformCompanyToSite),
            stats: {
                totalCompanies: activeCompanies.length,
                parentCompanies: parentCompanies.length,
                childCompanies: childCompanies.length,
                orphanedChildren: orphanedChildren.length
            },
            source: 'ServiceM8 Companies API'
        });
    } catch (error) {
        console.error('Error fetching company hierarchy from ServiceM8:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch company hierarchy from ServiceM8',
            details: error.message
        });
    }
});

// GET child companies by parent UUID
router.get('/sites/companies/:parentUuid/children', async (req, res) => {
    try {
        const { parentUuid } = req.params;
        console.log(`Fetching child companies for parent: ${parentUuid}`);
        
        const { data: companies } = await servicem8.getCompanyAll();
        
        // Filter for active child companies with the specified parent UUID
        const childCompanies = companies.filter(company => 
            (company.active === 1 || company.active === '1') && 
            company.parent_company_uuid === parentUuid
        );
        
        const childSites = childCompanies.map(transformCompanyToSite);
        
        console.log(`Found ${childSites.length} child companies for parent ${parentUuid}`);
        
        res.json({
            success: true,
            parentUuid: parentUuid,
            childSites: childSites,
            count: childSites.length,
            source: 'ServiceM8 Companies API'
        });
    } catch (error) {
        console.error('Error fetching child companies from ServiceM8:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch child companies from ServiceM8',
            details: error.message
        });
    }
});

// GET sites with client filtering - enhanced endpoint for client-specific hierarchy
router.get('/clients/:clientId/sites/hierarchy', async (req, res) => {
    try {
        const { clientId } = req.params;
        console.log(`Fetching site hierarchy for client: ${clientId}`);
        
        const { data: companies } = await servicem8.getCompanyAll();
        
        // Find if this client is a parent company
        const parentCompany = companies.find(company => 
            company.uuid === clientId && 
            (company.active === 1 || company.active === '1') &&
            !company.parent_company_uuid
        );
        
        if (parentCompany) {
            // Client is a parent - get all children
            const childCompanies = companies.filter(company => 
                (company.active === 1 || company.active === '1') && 
                company.parent_company_uuid === clientId
            );
            
            const result = {
                parent: transformCompanyToSite(parentCompany),
                children: childCompanies.map(transformCompanyToSite),
                childCount: childCompanies.length,
                totalSites: childCompanies.length + 1
            };
            
            console.log(`Client is parent with ${childCompanies.length} child sites`);
            
            res.json({
                success: true,
                clientId: clientId,
                isParent: true,
                hierarchy: result,
                source: 'ServiceM8 Companies API'
            });
        } else {
            // Client might be a child - find parent and siblings
            const childCompany = companies.find(company => 
                company.uuid === clientId && 
                (company.active === 1 || company.active === '1')
            );
            
            if (childCompany && childCompany.parent_company_uuid) {
                const parent = companies.find(company => 
                    company.uuid === childCompany.parent_company_uuid &&
                    (company.active === 1 || company.active === '1')
                );
                
                const siblings = companies.filter(company => 
                    (company.active === 1 || company.active === '1') && 
                    company.parent_company_uuid === childCompany.parent_company_uuid
                );
                
                const result = {
                    parent: parent ? transformCompanyToSite(parent) : null,
                    currentSite: transformCompanyToSite(childCompany),
                    siblings: siblings.map(transformCompanyToSite),
                    siblingCount: siblings.length,
                    totalSites: siblings.length + (parent ? 1 : 0)
                };
                
                console.log(`Client is child with ${siblings.length} sibling sites`);
                
                res.json({
                    success: true,
                    clientId: clientId,
                    isParent: false,
                    hierarchy: result,
                    source: 'ServiceM8 Companies API'
                });
            } else {
                // Client is standalone
                res.json({
                    success: true,
                    clientId: clientId,
                    isParent: false,
                    hierarchy: {
                        currentSite: childCompany ? transformCompanyToSite(childCompany) : null,
                        totalSites: childCompany ? 1 : 0
                    },
                    source: 'ServiceM8 Companies API'
                });
            }
        }
    } catch (error) {
        console.error('Error fetching client hierarchy from ServiceM8:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch client hierarchy from ServiceM8',
            details: error.message
        });
    }
});

// GET filtered sites with search and client context
router.get('/clients/:clientId/sites/filtered', async (req, res) => {
    try {
        const { clientId } = req.params;
        const { search, includeParent, includeSiblings } = req.query;
        
        console.log(`Fetching filtered sites for client: ${clientId}, search: ${search}`);
        
        const { data: companies } = await servicem8.getCompanyAll();
        const activeCompanies = companies.filter(company => company.active === 1 || company.active === '1');
        
        let filteredCompanies = [];
        
        // Find client's context
        const clientCompany = activeCompanies.find(company => company.uuid === clientId);
        
        if (!clientCompany) {
            return res.status(404).json({
                error: true,
                message: `Client ${clientId} not found`
            });
        }
        
        // Determine filtering scope
        if (clientCompany.parent_company_uuid) {
            // Client is a child - get parent and siblings
            if (includeParent === 'true') {
                const parent = activeCompanies.find(company => company.uuid === clientCompany.parent_company_uuid);
                if (parent) filteredCompanies.push(parent);
            }
            
            if (includeSiblings === 'true') {
                const siblings = activeCompanies.filter(company => 
                    company.parent_company_uuid === clientCompany.parent_company_uuid
                );
                filteredCompanies.push(...siblings);
            } else {
                filteredCompanies.push(clientCompany);
            }
        } else {
            // Client is a parent - get self and all children
            filteredCompanies.push(clientCompany);
            const children = activeCompanies.filter(company => company.parent_company_uuid === clientId);
            filteredCompanies.push(...children);
        }
        
        // Apply search filter
        if (search && search.trim()) {
            const searchTerm = search.toLowerCase().trim();
            filteredCompanies = filteredCompanies.filter(company => 
                (company.name && company.name.toLowerCase().includes(searchTerm)) ||
                (company.address && company.address.toLowerCase().includes(searchTerm))
            );
        }
        
        // Transform and sort
        const sites = filteredCompanies.map(transformCompanyToSite);
        sites.sort((a, b) => {
            // Parent companies first, then alphabetical
            if (!a.parent_company_uuid && b.parent_company_uuid) return -1;
            if (a.parent_company_uuid && !b.parent_company_uuid) return 1;
            return (a.name || '').localeCompare(b.name || '');
        });
        
        console.log(`Returning ${sites.length} filtered sites`);
        
        res.json({
            success: true,
            sites: sites,
            count: sites.length,
            clientId: clientId,
            searchTerm: search || null,
            source: 'ServiceM8 Companies API (Filtered)'
        });
        
    } catch (error) {
        console.error('Error fetching filtered sites from ServiceM8:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch filtered sites from ServiceM8',
            details: error.message
        });
    }
});

module.exports = router;
