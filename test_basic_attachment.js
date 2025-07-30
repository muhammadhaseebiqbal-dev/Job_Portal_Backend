const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Basic test for job creation with attachment using the 3-step process
async function testBasicAttachment() {
    console.log('🧪 Basic Test: Job Creation with 3-Step Attachment');
    console.log('='.repeat(60));
    
    try {
        // Create a small test file
        const testFileName = 'basic_test_attachment.txt';
        const testFilePath = path.join(__dirname, testFileName);
        const testFileContent = `Basic Test File
Created: ${new Date().toISOString()}
Size: Small for quick testing
Process: ServiceM8 3-Step Attachment`;
        
        fs.writeFileSync(testFilePath, testFileContent);
        console.log('✅ Test file created:', testFileName);
        console.log('📋 File size:', testFileContent.length, 'bytes');
        
        // Prepare form data
        const formData = new FormData();
        
        // Basic job data
        formData.append('job_name', 'Basic Attachment Test');
        formData.append('job_description', 'Basic test for 3-step attachment process');
        formData.append('status', 'Quote');
        formData.append('active', '1');
        formData.append('company_name', 'Basic Test Company');
        
        // Contact data for job contact creation
        formData.append('site_contact_name', 'Test Contact');
        formData.append('site_contact_number', '1234567890');
        formData.append('job_contact_email', 'test@basic.com');
        
        // Attach the file
        formData.append('file', fs.createReadStream(testFilePath));
        
        console.log('\n📋 Request data:');
        console.log('- Job: Basic Attachment Test');
        console.log('- Contact: Test Contact');
        console.log('- File: basic_test_attachment.txt');
        
        // Make the request
        console.log('\n🔄 Sending request to server...');
        const startTime = Date.now();
        
        const response = await axios.post('http://localhost:4000/fetch/jobs/create', formData, {
            headers: {
                ...formData.getHeaders()
            },
            timeout: 45000, // 45 second timeout
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        console.log(`\n📊 RESPONSE (${duration}ms):`);
        console.log('Status:', response.status);
        console.log('Success:', response.data.success);
        console.log('Message:', response.data.message);
        
        if (response.data.data) {
            const jobData = response.data.data;
            
            console.log('\n📋 Job Created:');
            console.log('UUID:', jobData.uuid);
            console.log('Name:', jobData.job_name || jobData.customfield_job_name || 'N/A');
            console.log('Description:', jobData.job_description || jobData.description || 'N/A');
            console.log('Status:', jobData.status || 'N/A');
            
            // Check job contact
            if (jobData.job_contact) {
                console.log('\n📋 Job Contact:');
                console.log('UUID:', jobData.job_contact.uuid);
                console.log('Name:', `${jobData.job_contact.first || ''} ${jobData.job_contact.last || ''}`.trim());
                console.log('Phone:', jobData.job_contact.phone || 'N/A');
                console.log('Email:', jobData.job_contact.email || 'N/A');
                console.log('✅ Job Contact Created Successfully');
            } else {
                console.log('\n⚠️ No job contact data in response');
            }
            
            // Check attachment
            if (jobData.attachment) {
                console.log('\n📋 Attachment:');
                console.log('UUID:', jobData.attachment.uuid);
                console.log('Name:', jobData.attachment.attachment_name);
                console.log('Active:', jobData.attachment.active);
                console.log('File Type:', jobData.attachment.file_type);
                console.log('Edit Date:', jobData.attachment.edit_date);
                console.log('Related Object:', jobData.attachment.related_object);
                console.log('Related UUID:', jobData.attachment.related_object_uuid);
                
                // Verify attachment success
                const isActive = jobData.attachment.active === 1;
                const isLinked = jobData.attachment.related_object_uuid === jobData.uuid;
                const hasContent = jobData.attachment.edit_date && jobData.attachment.edit_date !== '';
                
                console.log('\n📊 ATTACHMENT VERIFICATION:');
                console.log('✅ Record Created:', !!jobData.attachment.uuid);
                console.log('✅ Is Active:', isActive);
                console.log('✅ Properly Linked:', isLinked);
                console.log('✅ Has Content:', hasContent);
                
                if (isActive && isLinked && hasContent) {
                    console.log('\n🎉 SUCCESS: 3-Step Attachment Process Completed!');
                    console.log('✅ Job created with working attachment');
                    console.log('✅ Job contact created');
                    console.log('✅ Attachment is active and processed');
                } else {
                    console.log('\n⚠️ Attachment created but may have issues:');
                    console.log('   Active:', isActive);
                    console.log('   Linked:', isLinked);
                    console.log('   Content:', hasContent);
                }
            } else {
                console.log('\n⚠️ No attachment data in response');
            }
        }
        
        console.log('\n✅ Basic attachment test completed');
        
    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Headers:', error.response.headers);
            console.error('Response Data:', error.response.data);
        }
        
        if (error.code === 'ECONNREFUSED') {
            console.error('💡 Server not running on http://localhost:4000');
        } else if (error.code === 'ECONNRESET') {
            console.error('💡 Connection reset - server may have restarted or crashed');
        } else if (error.code === 'ETIMEDOUT') {
            console.error('💡 Request timed out - server may be processing slowly');
        }
    } finally {
        // Clean up test file
        const testFilePath = path.join(__dirname, 'basic_test_attachment.txt');
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
            console.log('\n🧹 Test file cleaned up');
        }
    }
}

// Run the test
testBasicAttachment();