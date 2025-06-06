const axios = require('axios');

// Test client creation with email to see the debugging output
const testClientCreation = async () => {
    try {
        console.log('=== TESTING CLIENT CREATION WITH EMAIL ===');
        
        const testClientData = {
            name: 'Test Client for Email Debug',
            email: 'test.client@example.com',
            address: '123 Test Street',
            address_city: 'Test City',
            address_state: 'Test State',
            address_postcode: '12345',
            phone: '555-0123',
            permissions: ['view_jobs', 'view_quotes']
        };
        
        console.log('Sending client creation request with data:', testClientData);
        
        const response = await axios.post('http://localhost:5000/fetch/clients', testClientData);
        
        console.log('Client creation response:', response.data);
        
    } catch (error) {
        console.error('Error testing client creation:', error.response?.data || error.message);
    }
};

testClientCreation();
