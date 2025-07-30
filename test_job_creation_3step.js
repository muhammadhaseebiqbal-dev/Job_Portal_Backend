const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Test the updated job creation route with 3-step attachment process
async function testJobCreationWith3StepAttachment() {
    console.log('🧪 Testing Job Creation with Official 3-Step Attachment Process');
    console.log('='.repeat(70));
    
    try {
        // Create a test file
        const testFileName = 'test_job_creation_attachment.txt';
        const testFilePath = path.join(__dirname, testFileName);
        const testFileContent = `Test attachment for job creation
Created: ${new Date().toISOString()}
Process: Official ServiceM8 3-Step Attachment
Flow: Job -> JobContact -> Attachment -> Attachment Binary
Authentication: API Key for both attachment tasks`;
        
        fs.writeFileSync(testFilePath, testFileContent);
        console.log('✅ Test file created:', testFilePath);
        
        // Prepare job creation data
        const formData = new FormData();
        
        // Job data
        formData.append('job_name', 'Test Job with 3-Step Attachment');
        formData.append('job_description', 'Testing the official ServiceM8 3-step attachment process in job creation');
        formData.append('status', 'Quote');
        formData.append('active', '1');
        
        // Contact information for job contact creation
        formData.append('site_contact_name', 'John Test Contact');
        formData.append('site_contact_number', '+1234567890');
        formData.append('job_contact_email', 'test@example.com');
        
        // Company information
        formData.append('company_name', 'Test Company');
        formData.append('location_address', '123 Test Street, Test City');
        
        // Attach the test file
        formData.append('file', fs.createReadStream(testFilePath));
        
        console.log('📋 Job creation payload prepared with:');
        console.log('- Job name: Test Job with 3-Step Attachment');
        console.log('- Job description: Testing the official ServiceM8 3-step attachment process');
        console.log('- Contact: John Test Contact');
        console.log('- File: test_job_creation_attachment.txt');
        
        // Make the job creation request
        console.log('\n🔄 Creating job with attachment...');
        const response = await axios.post('http://localhost:4000/fetch/jobs/create', formData, {
            headers: {
                ...formData.getHeaders(),
                'Content-Type': 'multipart/form-data'
            },
            timeout: 60000 // 60 second timeout
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
            
            if (response.data.data.job_contact) {
                console.log('\n📋 Job Contact Details:');
                console.log('UUID:', response.data.data.job_contact.uuid);
                console.log('Name:', `${response.data.data.job_contact.first} ${response.data.data.job_contact.last}`);
                console.log('Phone:', response.data.data.job_contact.phone);
                console.log('Email:', response.data.data.job_contact.email);
            }
            
            if (response.data.data.attachment) {
                console.log('\n📋 Attachment Details:');
                console.log('UUID:', response.data.data.attachment.uuid);
                console.log('Name:', response.data.data.attachment.attachment_name);
                console.log('Active:', response.data.data.attachment.active);
                console.log('File Type:', response.data.data.attachment.file_type);
                console.log('Related Object:', response.data.data.attachment.related_object);
                console.log('Related UUID:', response.data.data.attachment.related_object_uuid);
                console.log('Edit Date:', response.data.data.attachment.edit_date);
                
                // Check if attachment is properly processed
                const isActive = response.data.data.attachment.active === 1;
                const hasContent = response.data.data.attachment.edit_date && response.data.data.attachment.edit_date !== '';
                
                console.log('\n📊 ATTACHMENT VERIFICATION:');
                console.log('✅ Record Created:', !!response.data.data.attachment.uuid);
                console.log('✅ Is Active:', isActive);
                console.log('✅ Has Content:', hasContent);
                console.log('✅ Properly Linked:', response.data.data.attachment.related_object_uuid === response.data.data.uuid);
                
                if (isActive && hasContent) {
                    console.log('\n🎉 SUCCESS: 3-Step Attachment Process Completed Successfully!');
                    console.log('The attachment is active and has been processed by ServiceM8.');
                } else {
                    console.log('\n⚠️ WARNING: Attachment may not be fully processed');
                    console.log('Active:', isActive, '| Has Content:', hasContent);
                }
            } else {
                console.log('\n⚠️ No attachment data in response');
            }
        }
        
        console.log('\n✅ Job creation test completed successfully');
        
    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        }
        
        if (error.code === 'ECONNREFUSED') {
            console.error('💡 Make sure the backend server is running on http://localhost:4000');
        }
    } finally {
        // Clean up test file
        const testFilePath = path.join(__dirname, 'test_job_creation_attachment.txt');
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
            console.log('\n🧹 Test file cleaned up');
        }
    }
}

// Run the test
testJobCreationWith3StepAttachment();