const axios = require('axios');

// Test simple job creation without attachment
async function testSimpleJobCreation() {
    console.log('🧪 Testing Simple Job Creation (No Attachment)');
    console.log('='.repeat(50));
    
    try {
        // Prepare simple job creation data
        const jobData = {
            job_name: 'Simple Test Job',
            job_description: 'Testing basic job creation without attachment',
            status: 'Quote',
            active: '1',
            company_name: 'Test Company',
            location_address: '123 Test Street, Test City'
        };
        
        console.log('📋 Job creation payload:', jobData);
        
        // Make the job creation request
        console.log('\n🔄 Creating simple job...');
        const response = await axios.post('http://localhost:4000/fetch/jobs/create', jobData, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 15000 // 15 second timeout
        });
        
        console.log('\n📊 RESPONSE:');
        console.log('Status:', response.status);
        console.log('Success:', response.data.success);
        console.log('Message:', response.data.message);
        
        if (response.data.data) {
            console.log('\n📋 Job Details:');
            console.log('UUID:', response.data.data.uuid);
            console.log('Job Name:', response.data.data.job_name || response.data.data.customfield_job_name);
            console.log('Description:', response.data.data.job_description || response.data.data.description);
            console.log('Status:', response.data.data.status);
            console.log('Active:', response.data.data.active);
        }
        
        console.log('\n✅ Simple job creation test completed successfully');
        
    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
        
        if (error.code === 'ECONNREFUSED') {
            console.error('💡 Make sure the backend server is running on http://localhost:4000');
        } else if (error.code === 'ECONNRESET') {
            console.error('💡 Connection was reset - server might be processing or have an error');
        }
    }
}

// Run the test
testSimpleJobCreation();