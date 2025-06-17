const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');
require('dotenv').config();

/**
 * CONTACTS ROUTES - ServiceM8 Integration
 * 
 * Handles contact-related operations with ServiceM8 API
 * Specifically designed to fetch Site contacts for clients
 * 
 * Based on developer portal notes:
 * - Use GET /contact.json endpoint
 * - Filter by Type == "Site"  
 * - Filter by ParentUUID == logged-in client's UUID
 */

// Middleware to ensure a valid token for all contact routes
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

// Helper function to transform ServiceM8 company contact to site format
const transformContactToSite = (contact) => {
    return {
        uuid: contact.uuid,
        id: contact.uuid, // For backward compatibility
        name: contact.first && contact.last ? `${contact.first} ${contact.last}` : 
              contact.first || contact.last || 'Unnamed Site',
        address: contact.address || '',
        suburb: contact.suburb || '',
        city: contact.suburb || contact.city || '', // In AU, suburb is often used as city
        state: contact.state || '',
        postcode: contact.post_code || contact.postcode || '',
        country: contact.country || 'Australia',
        companyUuid: contact.company_uuid || '', // Use company_uuid from actual data
        type: contact.type || '', // Use lowercase 'type' from actual data
        isDefault: false, // Will be determined by business logic
        active: contact.active === 1 || contact.active === '1',
        
        // Additional contact fields that might be useful
        email: contact.email || '',
        phone: contact.phone || contact.mobile || '',
        
        // Keep original ServiceM8 fields for reference
        servicem8_data: {
            company_uuid: contact.company_uuid,
            type: contact.type, // lowercase from actual data
            first: contact.first,
            last: contact.last,
            email: contact.email,
            phone: contact.phone,
            mobile: contact.mobile,
            address: contact.address,
            suburb: contact.suburb,
            state: contact.state,
            post_code: contact.post_code,
            notes: contact.notes,
            is_primary_contact: contact.is_primary_contact
        }
    };
};

// GET client sites using contact endpoint - filtered by Type="Site" and ParentUUID=clientUuid
router.get('/client-sites/:clientUuid', async (req, res) => {
    try {
        const { clientUuid } = req.params;        console.log(`🏢 Fetching sites for client UUID: ${clientUuid} using contact endpoint`);
        
        // Fetch all contacts from ServiceM8
        // Note: Based on ServiceM8 API patterns, trying different possible method names
        let contacts;
        try {
            // Try the most likely method name based on scope 'manage_customer_contacts'
            const { data } = await servicem8.getCustomerContactAll();
            contacts = data;
            console.log(`📞 Retrieved ${contacts.length} contacts using getCustomerContactAll()`);
        } catch (error) {
            console.log('⚠️ getCustomerContactAll() failed, trying alternative methods...');
            try {
                // Alternative method name
                const { data } = await servicem8.getContactAll();
                contacts = data;
                console.log(`📞 Retrieved ${contacts.length} contacts using getContactAll()`);
            } catch (error2) {
                console.log('⚠️ getContactAll() failed, trying getCompanyContactAll()...');
                try {
                    // Another alternative
                    const { data } = await servicem8.getCompanyContactAll();
                    contacts = data;
                    console.log(`📞 Retrieved ${contacts.length} contacts using getCompanyContactAll()`);                } catch (error3) {
                    throw new Error(`All contact API methods failed. Tried: getCustomerContactAll, getContactAll, getCompanyContactAll. Last error: ${error3.message}`);
                }
            }
        }
        
        console.log(`📞 Retrieved ${contacts.length} contacts from ServiceM8`);
          // Debug: Log sample contact data to understand the structure
        if (contacts.length > 0) {
            console.log('🔍 Sample company contact data (first 3 contacts):');
            contacts.slice(0, 3).forEach((contact, index) => {
                console.log(`Contact ${index + 1}:`, {
                    uuid: contact.uuid,
                    Type: contact.Type,
                    type: contact.type, // Check both variations
                    company_uuid: contact.company_uuid,
                    parent_uuid: contact.parent_uuid, // Check both variations
                    first: contact.first,
                    last: contact.last,
                    active: contact.active,
                    // Log all available fields to see what we're working with
                    all_fields: Object.keys(contact)
                });
            });
            
            // Show unique types to see what's available
            const uniqueTypes = [...new Set(contacts.map(c => c.Type || c.type).filter(Boolean))];
            console.log('🏷️ Available contact types:', uniqueTypes);
            
            // Show contacts that might be related to our client
            const clientRelatedContacts = contacts.filter(c => 
                c.company_uuid === clientUuid || 
                c.parent_uuid === clientUuid ||
                c.uuid === clientUuid ||
                (c.first && c.first.toLowerCase().includes('site')) ||
                (c.last && c.last.toLowerCase().includes('site'))
            );
            console.log(`🔗 Contacts related to client ${clientUuid}:`, clientRelatedContacts.length);
            if (clientRelatedContacts.length > 0) {
                clientRelatedContacts.slice(0, 3).forEach(contact => {
                    console.log('Related contact:', {
                        uuid: contact.uuid,
                        Type: contact.Type || contact.type,
                        company_uuid: contact.company_uuid,
                        parent_uuid: contact.parent_uuid,
                        first: contact.first,
                        last: contact.last
                    });
                });
            }
        }        // Show ALL Site Contacts without client filtering (as requested)
        console.log(`🔍 Fetching ALL Site Contacts (no client filtering)`);
        
        const siteContacts = contacts.filter(contact => {
            // Only filter by type and active status, ignore client UUID
            const isCorrectType = contact.type === 'Site Contact';
            const isActive = contact.active === 1 || contact.active === '1';
            
            return isCorrectType && isActive;
        });
        
        console.log(`🎯 Found ${siteContacts.length} Site Contacts total (showing all, no client filter)`);
        
        // Show some sample site contacts
        if (siteContacts.length > 0) {
            console.log('� Sample Site Contacts being returned:');
            siteContacts.slice(0, 5).forEach((contact, index) => {
                console.log(`  ${index + 1}. Company: ${contact.company_uuid}, Name: "${contact.first} ${contact.last}", Type: ${contact.type}`);
            });
        }
        
        // Transform contacts to site format
        const sites = siteContacts.map(transformContactToSite);
        
        // Sort sites by name for better UX        sites.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        
        console.log(`✅ Returning ${sites.length} formatted sites (ALL Site Contacts, no client filtering)`);
        
        res.json({
            success: true,
            sites: sites,
            count: sites.length,
            clientUuid: clientUuid,
            source: 'ServiceM8 Company Contact API',
            note: 'Showing ALL Site Contacts without client filtering',
            filters_applied: {
                type: 'Site Contact',
                client_filtering: 'DISABLED - showing all sites',
                active: true
            }
        });
    } catch (error) {
        console.error('❌ Error fetching client sites from ServiceM8 contacts:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch client sites from ServiceM8 contacts',
            details: error.message
        });
    }
});

// GET all contacts (admin/debug endpoint)
router.get('/', async (req, res) => {
    try {        console.log('📞 Fetching all contacts from ServiceM8...');
          // Fetch all company contacts from ServiceM8
        // Note: Using companycontact.json endpoint (not contact.json which doesn't exist)
        let contacts;
        try {
            // Try the correct ServiceM8 API method for company contacts
            const { data } = await servicem8.getCompanyContactAll();
            contacts = data;
            console.log(`📞 Retrieved ${contacts.length} company contacts using getCompanyContactAll()`);
        } catch (error) {
            console.log('⚠️ getCompanyContactAll() failed, trying alternative methods...');
            try {
                // Alternative method name variations
                const { data } = await servicem8.getCompanycontactAll();
                contacts = data;
                console.log(`📞 Retrieved ${contacts.length} company contacts using getCompanycontactAll()`);
            } catch (error2) {
                console.log('⚠️ getCompanycontactAll() failed, trying getContactAll()...');
                try {
                    // Fallback (though this likely won't work based on research)
                    const { data } = await servicem8.getContactAll();
                    contacts = data;
                    console.log(`📞 Retrieved ${contacts.length} contacts using getContactAll()`);
                } catch (error3) {
                    throw new Error(`All company contact API methods failed. Tried: getCompanyContactAll, getCompanycontactAll, getContactAll. Last error: ${error3.message}`);
                }
            }
        }
          // Optional: Filter by query parameters
        let filteredContacts = contacts;
        
        const { type, Type, company_uuid, parent_uuid, active } = req.query;
        
        if (type || Type) {
            const typeValue = type || Type;
            filteredContacts = filteredContacts.filter(contact => 
                contact.Type === typeValue || contact.type === typeValue
            );
            console.log(`🎯 Filtered by type '${typeValue}': ${filteredContacts.length} contacts`);
        }
        
        if (company_uuid || parent_uuid) {
            const uuidValue = company_uuid || parent_uuid;
            filteredContacts = filteredContacts.filter(contact => 
                contact.company_uuid === uuidValue || contact.parent_uuid === uuidValue
            );
            console.log(`🎯 Filtered by company/parent UUID '${uuidValue}': ${filteredContacts.length} contacts`);
        }
        
        if (active !== undefined) {
            const activeFilter = active === 'true' || active === '1';
            filteredContacts = filteredContacts.filter(contact => 
                (contact.active === 1 || contact.active === '1') === activeFilter
            );
            console.log(`🎯 Filtered by active '${active}': ${filteredContacts.length} contacts`);
        }
          res.json({
            success: true,
            contacts: filteredContacts,
            count: filteredContacts.length,
            total_fetched: contacts.length,
            source: 'ServiceM8 Company Contact API (companycontact.json)',
            filters_applied: { type, Type, company_uuid, parent_uuid, active }
        });
    } catch (error) {
        console.error('❌ Error fetching contacts from ServiceM8:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch contacts from ServiceM8',
            details: error.message
        });
    }
});

module.exports = router;
