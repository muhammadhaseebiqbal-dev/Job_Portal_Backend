// Script to verify and update enterprise client permissions
const { Redis } = require('@upstash/redis');
require('dotenv').config();

// Initialize Redis client
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

// Important permissions that should exist for all enterprise clients
const CRITICAL_PERMISSIONS = [
    'dashboard_view',
    'jobs_view',   // Added this newly introduced permission
    'jobs_create',
    'jobs_edit',
    'jobs_status_update',
    'attachments_view',
    'attachments_upload',
    'attachments_download'
];

async function verifyAndUpdatePermissions() {
    console.log('=== Verifying Enterprise Client Permissions ===\n');
    
    try {
        // 1. Get all client permission keys
        console.log('1. Finding clients in the system...');
        const allPermissionKeys = await redis.keys('client:permissions:*');
        console.log(`   Found ${allPermissionKeys.length} clients with permissions`);
        
        // 2. Verify and update permissions for each client
        console.log('2. Verifying permissions for each client...');
        let updatedCount = 0;
        
        for (const key of allPermissionKeys) {
            const clientUuid = key.replace('client:permissions:', '');
            const data = await redis.get(key);
            
            if (data && data.permissions) {
                console.log(`   Checking client ${clientUuid}...`);
                
                // Create a set of current permissions for fast lookups
                const currentPermissions = new Set(data.permissions);
                let needsUpdate = false;
                
                // Check if any critical permissions are missing
                for (const permission of CRITICAL_PERMISSIONS) {
                    if (!currentPermissions.has(permission)) {
                        console.log(`     Missing permission: ${permission}`);
                        currentPermissions.add(permission);
                        needsUpdate = true;
                    }
                }
                
                // Update permissions if needed
                if (needsUpdate) {
                    const updatedPermissionData = {
                        ...data,
                        permissions: Array.from(currentPermissions),
                        updatedAt: new Date().toISOString()
                    };
                    
                    await redis.set(key, updatedPermissionData);
                    updatedCount++;
                    console.log(`     ✓ Updated permissions for client ${clientUuid}`);
                } else {
                    console.log(`     ✓ Client ${clientUuid} has all critical permissions`);
                }
            }
        }
        
        console.log(`\n3. Summary: Updated ${updatedCount} clients with missing permissions`);
        
    } catch (error) {
        console.error('Error verifying permissions:', error);
    }
}

verifyAndUpdatePermissions()
    .then(() => console.log('Verification complete'))
    .catch(err => console.error('Error:', err));
