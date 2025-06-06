// fix_enterprise_permissions.js
// Script to automatically fix permissions for enterprise clients
const { Redis } = require('@upstash/redis');
require('dotenv').config();

// Initialize Redis client
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

// Critical permissions that all enterprise clients should have
const ENTERPRISE_CRITICAL_PERMISSIONS = [
    'dashboard_view',
    'jobs_view',
    'jobs_create', 
    'jobs_edit',
    'jobs_status_update',
    'attachments_view',
    'attachments_upload',
    'attachments_download',
    'quotes_view',
    'invoices_view'
];

// Identify clients likely to be enterprise clients
async function identifyEnterpriseClients() {
    console.log('=== Identifying Enterprise Clients ===\n');
    const enterpriseClientUuids = [];
    
    try {
        // Get all permission keys in Redis
        const allKeys = await redis.keys('client:permissions:*');
        console.log(`Found ${allKeys.length} clients with permissions`);
        
        for (const key of allKeys) {
            const clientUuid = key.replace('client:permissions:', '');
            const data = await redis.get(key);
            
            if (data && data.permissions) {
                // Check if this client has characteristic enterprise permissions
                const permissions = data.permissions;
                
                // Enterprise criteria: 
                // 1. Has more than 8 permissions 
                // 2. Has access to invoices or reports
                const hasMultiplePermissions = permissions.length >= 8;
                const hasInvoiceAccess = permissions.some(p => 
                    p.includes('invoice') || p.includes('report')
                );
                
                if (hasMultiplePermissions && hasInvoiceAccess) {
                    console.log(`Client ${clientUuid} appears to be an enterprise client`);
                    console.log(`  Current permissions: ${permissions.length} total`);
                    enterpriseClientUuids.push(clientUuid);
                }
            }
        }
        
        console.log(`\nIdentified ${enterpriseClientUuids.length} likely enterprise clients`);
        return enterpriseClientUuids;
        
    } catch (error) {
        console.error('Error identifying enterprise clients:', error);
        return [];
    }
}

// Fix permissions for identified enterprise clients
async function fixEnterprisePermissions(enterpriseClientUuids) {
    console.log('\n=== Fixing Enterprise Client Permissions ===\n');
    
    try {
        let fixedCount = 0;
        
        for (const clientUuid of enterpriseClientUuids) {
            console.log(`Checking permissions for client ${clientUuid}...`);
            
            const key = `client:permissions:${clientUuid}`;
            const data = await redis.get(key);
            
            if (data && data.permissions) {
                let needsUpdate = false;
                const currentPermissions = new Set(data.permissions);
                
                // Check if any critical permissions are missing
                for (const permission of ENTERPRISE_CRITICAL_PERMISSIONS) {
                    if (!currentPermissions.has(permission)) {
                        console.log(`  Adding missing permission: ${permission}`);
                        currentPermissions.add(permission);
                        needsUpdate = true;
                    }
                }
                
                // Update permissions if needed
                if (needsUpdate) {
                    const updatedData = {
                        ...data,
                        permissions: Array.from(currentPermissions),
                        updatedAt: new Date().toISOString()
                    };
                    
                    await redis.set(key, updatedData);
                    fixedCount++;
                    console.log(`✓ Updated permissions for client ${clientUuid}`);
                } else {
                    console.log(`✓ Client ${clientUuid} already has all critical permissions`);
                }
            }
        }
        
        console.log(`\nFixed permissions for ${fixedCount} enterprise clients`);
        
    } catch (error) {
        console.error('Error fixing enterprise permissions:', error);
    }
}

// Main function
async function main() {
    try {
        const enterpriseClients = await identifyEnterpriseClients();
        
        if (enterpriseClients.length > 0) {
            await fixEnterprisePermissions(enterpriseClients);
        } else {
            console.log('No enterprise clients identified. Nothing to fix.');
        }
        
        console.log('\nEnterprise permission fix completed');
        
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

// Run the script
main()
    .then(() => console.log('Script completed'))
    .catch(err => console.error('Error running script:', err));
