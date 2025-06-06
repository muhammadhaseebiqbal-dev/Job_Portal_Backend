// Debug enterprise client permission issue
const { Redis } = require('@upstash/redis');
require('dotenv').config();

// Initialize Redis client
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

async function debugClientPermissionFlow() {
    console.log('=== Debugging Enterprise Client Permission Issue ===\n');
    
    try {
        // 1. Check what enterprise clients exist in the system
        console.log('1. Finding enterprise clients in the system...');
        const allPermissionKeys = await redis.keys('client:permissions:*');
        console.log(`   Found ${allPermissionKeys.length} clients with permissions`);
        
        const enterpriseClients = [];
        for (const key of allPermissionKeys) {
            const data = await redis.get(key);
            if (data && data.permissions && data.permissions.length === 22) {
                const clientUuid = key.replace('client:permissions:', '');
                enterpriseClients.push({
                    uuid: clientUuid,
                    permissions: data.permissions.length,
                    hasJobsCreate: data.permissions.includes('jobs_create')
                });
            }
        }
        
        console.log(`   Found ${enterpriseClients.length} enterprise clients (22 permissions each):`);
        enterpriseClients.slice(0, 5).forEach((client, index) => {
            console.log(`   ${index + 1}. UUID: ${client.uuid}, Has jobs_create: ${client.hasJobsCreate}`);
        });
        console.log('');

        // 2. Check if any enterprise clients have auth credentials
        console.log('2. Checking which enterprise clients have login credentials...');
        const allAuthKeys = await redis.keys('client:auth:*');
        console.log(`   Found ${allAuthKeys.length} clients with auth credentials`);
        
        const enterpriseClientEmails = [];
        for (const key of allAuthKeys) {
            const authData = await redis.get(key);
            if (authData && authData.clientUuid) {
                // Check if this UUID has enterprise permissions
                const isEnterprise = enterpriseClients.some(ec => ec.uuid === authData.clientUuid);
                if (isEnterprise) {
                    const email = key.replace('client:auth:', '');
                    enterpriseClientEmails.push({
                        email,
                        uuid: authData.clientUuid
                    });
                }
            }
        }
        
        console.log(`   Found ${enterpriseClientEmails.length} enterprise clients with login credentials:`);
        enterpriseClientEmails.forEach((client, index) => {
            console.log(`   ${index + 1}. Email: ${client.email}, UUID: ${client.uuid}`);
        });
        console.log('');

        // 3. Test the permission flow for an enterprise client if we have one
        if (enterpriseClientEmails.length > 0) {
            const testClient = enterpriseClientEmails[0];
            console.log(`3. Testing permission flow for enterprise client: ${testClient.email}`);
            
            // Simulate what happens during login
            console.log(`   a) Client logs in with email: ${testClient.email}`);
            console.log(`   b) Auth system returns UUID: ${testClient.uuid}`);
            
            // Check ServiceM8 data (simulated)
            console.log(`   c) ServiceM8 lookup with UUID: ${testClient.uuid}`);
            
            // Check permissions
            const permissionKey = `client:permissions:${testClient.uuid}`;
            const permissionData = await redis.get(permissionKey);
            console.log(`   d) Permission lookup: ${permissionKey}`);
            console.log(`   e) Permissions found: ${!!(permissionData && permissionData.permissions)}`);
            
            if (permissionData && permissionData.permissions) {
                console.log(`   f) Permission count: ${permissionData.permissions.length}`);
                console.log(`   g) Has jobs_create: ${permissionData.permissions.includes('jobs_create')}`);
                console.log(`   h) All permissions: ${permissionData.permissions.join(', ')}`);
            }
            console.log('');
        }

        // 4. Check for any UUID mismatches
        console.log('4. Checking for potential UUID mismatches...');
        
        // Get all ServiceM8 client data patterns that might be stored
        const clientDataKeys = await redis.keys('*client*');
        console.log(`   Found ${clientDataKeys.length} Redis keys containing 'client':`);
        
        const relevantKeys = clientDataKeys.filter(key => 
            !key.includes('permissions') && 
            !key.includes('auth') && 
            !key.includes('mapping')
        ).slice(0, 10);
        
        for (const key of relevantKeys) {
            const data = await redis.get(key);
            console.log(`   - ${key}: ${typeof data} ${data ? '(has data)' : '(empty)'}`);
        }

        console.log('\n=== Debug Complete ===');
        
    } catch (error) {
        console.error('Debug failed:', error);
    }
}

debugClientPermissionFlow();
