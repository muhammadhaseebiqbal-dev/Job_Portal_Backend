// Test actual enterprise client API call
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000';
const TEST_ENTERPRISE_CLIENT = 'fa11d9d9-cd2a-464c-9e65-db9cff41914e'; // Real enterprise client

async function testRealEnterpriseClient() {
    console.log('=== Testing Real Enterprise Client Permission API ===\n');
    
    try {
        console.log(`Testing enterprise client: ${TEST_ENTERPRISE_CLIENT}`);
        console.log(`Associated email: 2a09rh5y0h@xkxkud.com`);
        console.log('');
        
        // Test the permission endpoint
        const url = `${API_BASE_URL}/fetch/clients/${TEST_ENTERPRISE_CLIENT}/permissions`;
        console.log(`API Call: GET ${url}`);
        
        const response = await axios.get(url);
        console.log(`Status: ${response.status}`);
        console.log(`Response:`, JSON.stringify(response.data, null, 2));
        
        // Check specific permission
        if (response.data && response.data.permissions) {
            const permissions = response.data.permissions;
            console.log('');
            console.log('Permission Analysis:');
            console.log(`- Total permissions: ${permissions.length}`);
            console.log(`- Has JOBS_CREATE: ${permissions.includes('jobs_create')}`);
            console.log(`- Has DASHBOARD_VIEW: ${permissions.includes('dashboard_view')}`);
            console.log(`- Has QUOTES_VIEW: ${permissions.includes('quotes_view')}`);
            
            // Test the permission checking logic that would be used in frontend
            const hasPermission = (userPermissions, requiredPermission) => {
                return userPermissions && userPermissions.includes(requiredPermission);
            };
            
            console.log('');
            console.log('Frontend Permission Check Simulation:');
            console.log(`- checkPermission('jobs_create'): ${hasPermission(permissions, 'jobs_create')}`);
            console.log(`- Should allow job creation: ${hasPermission(permissions, 'jobs_create') ? 'YES ✓' : 'NO ❌'}`);
        }
        
    } catch (error) {
        console.error('API call failed:');
        console.error(`Status: ${error.response?.status || 'No response'}`);
        console.error(`Message: ${error.message}`);
        if (error.response && error.response.data) {
            console.error(`Response data:`, JSON.stringify(error.response.data, null, 2));
        }
    }
    
    console.log('\n=== Test Complete ===');
}

testRealEnterpriseClient();
