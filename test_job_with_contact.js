const axios = require('axios');

// Test job creation with contact but no attachment
async function testJobWithContact() {
    console.log('🧪 Test: Job Creation with Contact (No Attachment)');
    console.log('='.repeat(55));
    
    try {
        // Prepare job data with contact info
        const jobData = {
            job_name: 'Test Job with Contact',
            job_description: 'Testing job creation with contact information',
            status: 'Quote',
            active: '1',
            company_name: 'Test Company',
            location_address: '123 Test Street',
            
            // Contact information
            site_contact_name: 'John Test Contact',
            site_contact_number: '1234567890',
            job_contact_email: 'john@test.com'
        };
        
        console.log('📋 Job data with contact info:');
        console.log('- Job:', jobData.job_name);
        console.log('- Contact:', jobData.site_contact_name);
        console.log('- Phone:', jobData.site_contact_number);
        console.log('- Email:', jobData.job_contact_email);
        
        // Make the request
        console.log('\n🔄 Creating job with contact...');
        const response = await axios.post('http://localhost:4000/fetch/jobs/create', jobData, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 20000
        });
        
        console.log('\n📊 RESPONSE:');
        console.log('Status:', response.status);
        console.log('Success:', response.data.success);
        console.log('Message:', response.data.message);
        
        if (response.data.data) {
            const jobResult = response.data.data;
            
            console.log('\n📋 Job Details:');
            console.log('UUID:', jobResult.uuid);
            console.log('Name:', jobResult.job_name || jobResult.customfield_job_name || 'N/A');
            console.log('Description:', jobResult.job_description || jobResult.description || 'N/A');
            console.log('Status:', jobResult.status || 'N/A');
            
            // Check if job contact was created
            if (jobResult.job_contact) {
                console.log('\n📋 Job Contact Created:');
                console.log('UUID:', jobResult.job_contact.uuid);
                console.log('First Name:', jobResult.job_contact.first);
                console.log('Last Name:', jobResult.job_contact.last);
                console.log('Phone:', jobResult.job_contact.phone);
                console.log('Email:', jobResult.job_contact.email);
                console.log('Type:', jobResult.job_contact.type);
                console.log('✅ Job Contact Creation: SUCCESS');
            } else {
                console.log('\n⚠️ No job contact created');
            }
        }
        
        console.log('\n✅ Job with contact test completed successfully');
        
    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
        
        if (error.code === 'ECONNRESET') {
            console.error('💡 Connection reset - check server logs for errors');
        }
    }
}

// Run the test
testJobWithContact();