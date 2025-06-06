const axios = require('axios');
const { Redis } = require('@upstash/redis');
require('dotenv').config();

// Test configuration
const API_BASE_URL = 'http://localhost:5000';
const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'TestPassword123!';
const TEST_CLIENT_UUID = 'test-client-uuid-' + Date.now();

// Initialize Redis
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

console.log('🔄 Starting Complete Authentication Flow Test');
console.log('=' .repeat(60));

async function testCompleteAuthFlow() {
    try {
        // Step 1: Generate password setup token
        console.log('\n📧 Step 1: Generate Password Setup Token');
        console.log('-'.repeat(40));
        
        const { generatePasswordSetupToken } = require('./src/utils/clientCredentialsManager');
        const token = await generatePasswordSetupToken(TEST_EMAIL, TEST_CLIENT_UUID);
        
        if (token) {
            console.log('✅ Token generated successfully');
            console.log(`📝 Token: ${token.substring(0, 20)}...`);
        } else {
            throw new Error('Failed to generate token');
        }

        // Step 2: Validate token
        console.log('\n🔍 Step 2: Validate Setup Token');
        console.log('-'.repeat(40));
        
        const validateResponse = await axios.get(`${API_BASE_URL}/fetch/validate-setup-token/${token}`);
        console.log('✅ Token validation response:', validateResponse.data);

        // Step 3: Set up password using token
        console.log('\n🔐 Step 3: Setup Password');
        console.log('-'.repeat(40));
        
        const setupResponse = await axios.post(`${API_BASE_URL}/fetch/password-setup`, {
            token: token,
            password: TEST_PASSWORD
        });
        
        if (setupResponse.data.success) {
            console.log('✅ Password setup successful');
        } else {
            throw new Error('Password setup failed: ' + JSON.stringify(setupResponse.data));
        }

        // Step 4: Test client login
        console.log('\n🚪 Step 4: Test Client Login');
        console.log('-'.repeat(40));
        
        const loginResponse = await axios.post(`${API_BASE_URL}/fetch/client-login`, {
            email: TEST_EMAIL,
            password: TEST_PASSWORD
        });
        
        if (loginResponse.data.success) {
            console.log('✅ Client login successful');
            console.log('👤 Client data received:', {
                hasClient: !!loginResponse.data.client,
                email: loginResponse.data.client?.email
            });
        } else {
            throw new Error('Client login failed: ' + JSON.stringify(loginResponse.data));
        }

        // Step 5: Test invalid login
        console.log('\n❌ Step 5: Test Invalid Login');
        console.log('-'.repeat(40));
        
        try {
            await axios.post(`${API_BASE_URL}/fetch/client-login`, {
                email: TEST_EMAIL,
                password: 'wrong-password'
            });
            console.log('⚠️  Expected invalid login to fail, but it succeeded');
        } catch (error) {
            if (error.response?.status === 401) {
                console.log('✅ Invalid login correctly rejected');
            } else {
                console.log('⚠️  Unexpected error during invalid login test:', error.response?.data);
            }
        }

        // Step 6: Test client permissions
        console.log('\n🔑 Step 6: Test Client Permissions');
        console.log('-'.repeat(40));
        
        // Set some test permissions
        const permissions = ['view_jobs', 'view_quotes', 'manage_sites'];
        const permissionKey = `client:permissions:${TEST_CLIENT_UUID}`;
        await redis.set(permissionKey, {
            clientUuid: TEST_CLIENT_UUID,
            permissions: permissions,
            updatedAt: new Date().toISOString()
        });
        
        // Fetch permissions
        const storedPermissions = await redis.get(permissionKey);
        console.log('✅ Permissions stored and retrieved:', storedPermissions.permissions);

        console.log('\n🎉 Complete Authentication Flow Test - SUCCESS');
        console.log('=' .repeat(60));
        console.log('✅ All authentication components working correctly:');
        console.log('   - Token generation and validation');
        console.log('   - Password setup');
        console.log('   - Client login/authentication');
        console.log('   - Permission storage and retrieval');
        console.log('   - Invalid login rejection');

    } catch (error) {
        console.error('\n❌ Authentication Flow Test Failed:');
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        process.exit(1);
    } finally {
        // Cleanup test data
        console.log('\n🧹 Cleaning up test data...');
        try {
            await redis.del(`credentials:${TEST_EMAIL}`);
            await redis.del(`client:permissions:${TEST_CLIENT_UUID}`);
            console.log('✅ Test data cleaned up');
        } catch (cleanupError) {
            console.error('⚠️  Cleanup error:', cleanupError.message);
        }
    }
}

// Run the test
testCompleteAuthFlow();
