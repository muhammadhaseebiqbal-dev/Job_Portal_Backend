const axios = require('axios');

async function testJobCreationDebug() {
    // This matches the exact data from your screenshot
    const testJobData = {
        job_name: "Bendigo tester",
        job_description: "test 2",
        description: "test 2",
        
        // Contact information - matching your form
        site_contact_name: "Clint Karam",
        site_contact_number: "0410535057", 
        email: "clint@gcce.com.au",
        
        // ServiceM8 job contact fields
        job_contact_first_name: "Clint",
        job_contact_email: "clint@gcce.com.au",
        
        // Site contact information for Job Contact creation
        site_contact_email: "clint@gcce.com.au",
        
        // Purchase order
        purchase_order_number: "332244",
        
        // Dates
        work_start_date: "2025-07-30",
        work_completion_date: "2025-08-08",
        
        // Custom fields
        customfield_rough_in_date: "2025-07-30",
        customfield_handover_date: "2025-08-08", 
        customfield_job_name: "Bendigo tester",
        
        // Status and company
        status: "Work Order",
        active: 1,
        company_uuid: "74a5fc26-7ba8-46b0-b86f-1d317c85b63b",
        company_name: "Skinkandy Bendigo"
    };

    try {
        console.log('🧪 Testing job creation with debug data...');
        console.log('📤 Sending payload:', JSON.stringify(testJobData, null, 2));
        
        const response = await axios.post('http://localhost:4000/api/jobs/create', testJobData, {
            headers: {
                'Content-Type': 'application/json',
                'x-client-uuid': '74a5fc26-7ba8-46b0-b86f-1d317c85b63b'
            }
        });
        
        console.log('\n✅ SUCCESS! Job created successfully!');
        console.log('📄 Response:', JSON.stringify(response.data, null, 2));
        
        if (response.data.data && response.data.data.job_contact) {
            console.log('\n🎉 Job Contact Information:');
            const contact = response.data.data.job_contact;
            console.log(`   First Name: ${contact.first}`);
            console.log(`   Last Name: ${contact.last}`);
            console.log(`   Phone: ${contact.phone}`);
            console.log(`   Mobile: ${contact.mobile}`);
            console.log(`   Email: ${contact.email}`);
            console.log(`   Type: ${contact.type}`);
            console.log(`   Primary: ${contact.is_primary_contact}`);
        }
        
        // Test attachment endpoint separately
        if (response.data.data && response.data.data.uuid) {
            console.log('\n🔗 Testing attachment endpoint...');
            await testAttachmentEndpoint(response.data.data.uuid);
        }
        
    } catch (error) {
        console.error('\n❌ FAILED! Job creation error:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
    }
}

async function testAttachmentEndpoint(jobUuid) {
    try {
        // Test getting attachments for the job
        const response = await axios.get(`http://localhost:4000/api/servicem8-attachments/${jobUuid}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('📎 Attachment endpoint working:', response.data.success);
        console.log('📎 Attachment count:', response.data.attachments?.length || 0);
        
    } catch (attachError) {
        console.error('❌ Attachment endpoint failed:', attachError.response?.data || attachError.message);
    }
}

async function checkServerHealth() {
    try {
        const response = await axios.get('http://localhost:4000/api/health');
        console.log('✅ Server health check passed');
        return true;
    } catch (error) {
        console.error('❌ Server not responding on port 4000');
        console.log('Make sure backend is running: cd Job_Portal_Backend && npm start');
        return false;
    }
}

async function main() {
    console.log('🔍 ServiceM8 Job Creation Debug Test\n');
    
    const serverOk = await checkServerHealth();
    if (serverOk) {
        await testJobCreationDebug();
    }
}

main();
