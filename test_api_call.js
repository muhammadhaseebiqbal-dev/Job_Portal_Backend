// Test frontend API call to permissions endpoint
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000'; // Adjust if different
const TEST_CLIENT_UUID = '0d26bab5-7021-4fa7-aefc-f1c13027e6c1'; // Use one from our Redis test

async function testPermissionAPI() {
    console.log('=== Testing Frontend Permission API Call ===\n');
    
    try {
        // 1. Test the permission endpoint directly
        console.log('1. Testing permission API endpoint...');
        const url = `${API_BASE_URL}/fetch/clients/${TEST_CLIENT_UUID}/permissions`;
        console.log(`   Calling: GET ${url}`);
        
        const response = await axios.get(url);
        console.log(`   Status: ${response.status}`);
        console.log(`   Response:`, JSON.stringify(response.data, null, 2));
        
        if (response.data && response.data.permissions) {
            const permissions = response.data.permissions;
            console.log(`   ✓ Retrieved ${permissions.length} permissions`);
            console.log(`   ✓ Includes jobs_create: ${permissions.includes('jobs_create')}`);
        } else {
            console.log(`   ❌ No permissions in response`);
        }
        
    } catch (error) {
        console.error('API call failed:');
        console.error(`   Status: ${error.response?.status || 'No response'}`);
        console.error(`   Message: ${error.message}`);
        console.error(`   Response data:`, error.response?.data);
    }
    
    console.log('\n=== Test Complete ===');
}

testPermissionAPI();
