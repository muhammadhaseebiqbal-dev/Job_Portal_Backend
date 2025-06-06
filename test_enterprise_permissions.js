const { Redis } = require('@upstash/redis');
const { CLIENT_PERMISSIONS, CLIENT_PERMISSION_TEMPLATES } = require('../Job_Portal_Frontend/src/types/clientPermissions.js');

require('dotenv').config();

// Initialize Redis client
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

// Test enterprise client UUID
const TEST_CLIENT_UUID = 'test-enterprise-client-123';

async function testEnterprisePermissions() {
    console.log('=== Testing Enterprise Client Permissions ===\n');
    
    try {
        // 1. First, let's see what permissions are supposed to be for Enterprise Client
        console.log('1. Expected Enterprise Client permissions:');
        const enterprisePermissions = CLIENT_PERMISSION_TEMPLATES['Enterprise Client'];
        console.log(`   Total permissions: ${enterprisePermissions.length}`);
        console.log(`   Sample permissions: ${enterprisePermissions.slice(0, 5).join(', ')}...`);
        console.log(`   Includes JOBS_CREATE: ${enterprisePermissions.includes(CLIENT_PERMISSIONS.JOBS_CREATE)}`);
        console.log('');

        // 2. Store enterprise permissions for our test client
        console.log('2. Storing enterprise permissions for test client...');
        const permissionKey = `client:permissions:${TEST_CLIENT_UUID}`;
        const permissionData = {
            clientUuid: TEST_CLIENT_UUID,
            permissions: enterprisePermissions,
            updatedAt: new Date().toISOString()
        };
        
        await redis.set(permissionKey, permissionData);
        console.log(`   ✓ Stored ${enterprisePermissions.length} permissions for client ${TEST_CLIENT_UUID}`);
        console.log('');

        // 3. Retrieve and verify permissions
        console.log('3. Retrieving permissions from Redis...');
        const retrievedData = await redis.get(permissionKey);
        console.log(`   Retrieved data type: ${typeof retrievedData}`);
        console.log(`   Has permissions array: ${!!(retrievedData && retrievedData.permissions)}`);
        
        if (retrievedData && retrievedData.permissions) {
            const permissions = retrievedData.permissions;
            console.log(`   Retrieved ${permissions.length} permissions`);
            console.log(`   Includes JOBS_CREATE: ${permissions.includes(CLIENT_PERMISSIONS.JOBS_CREATE)}`);
            console.log(`   Sample permissions: ${permissions.slice(0, 5).join(', ')}...`);
        } else {
            console.log('   ❌ No permissions found!');
        }
        console.log('');

        // 4. Test the getClientPermissions function logic
        console.log('4. Testing getClientPermissions function logic...');
        const getClientPermissions = async (clientUuid) => {
            try {
                const permissionKey = `client:permissions:${clientUuid}`;
                const permissionData = await redis.get(permissionKey);
                
                if (permissionData && permissionData.permissions) {
                    return permissionData.permissions;
                }
                
                return [];
            } catch (error) {
                console.error('Error getting client permissions:', error);
                return [];
            }
        };

        const permissions = await getClientPermissions(TEST_CLIENT_UUID);
        console.log(`   Function returned ${permissions.length} permissions`);
        console.log(`   Includes JOBS_CREATE: ${permissions.includes(CLIENT_PERMISSIONS.JOBS_CREATE)}`);
        console.log('');

        // 5. Test API endpoint simulation
        console.log('5. Simulating API endpoint response...');
        const apiResponse = {
            success: true,
            clientId: TEST_CLIENT_UUID,
            permissions: permissions
        };
        console.log(`   API would return: ${JSON.stringify(apiResponse, null, 2)}`);
        console.log('');

        // 6. Test permission checking logic
        console.log('6. Testing permission checking logic...');
        const hasPermission = (userPermissions, requiredPermission) => {
            return userPermissions && userPermissions.includes(requiredPermission);
        };

        const hasJobsCreate = hasPermission(permissions, CLIENT_PERMISSIONS.JOBS_CREATE);
        console.log(`   hasPermission(permissions, 'jobs_create'): ${hasJobsCreate}`);
        console.log(`   CLIENT_PERMISSIONS.JOBS_CREATE value: '${CLIENT_PERMISSIONS.JOBS_CREATE}'`);
        
        // 7. Check if there are any real client permissions stored
        console.log('7. Checking for existing client permissions in Redis...');
        const allKeys = await redis.keys('client:permissions:*');
        console.log(`   Found ${allKeys.length} permission keys in Redis:`);
        
        for (const key of allKeys.slice(0, 5)) { // Show first 5
            const data = await redis.get(key);
            const clientId = key.replace('client:permissions:', '');
            console.log(`   - ${clientId}: ${data?.permissions?.length || 0} permissions`);
        }

        console.log('\n=== Test Complete ===');
        
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testEnterprisePermissions();
