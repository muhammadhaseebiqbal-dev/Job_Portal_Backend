const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');
const { getValidAccessToken } = require('./src/utils/tokenManager');

// Test the final attachment approach with API key verification
async function testFinalAttachmentApproach() {
    console.log('🧪 Testing Final Attachment Approach');
    console.log('====================================');
    
    try {
        // Get access token
        const accessToken = await getValidAccessToken();
        console.log('✅ Access token obtained');
        
        // Create a test file
        const testFilePath = path.join(__dirname, 'test_final_attachment.txt');
        const testContent = `Final test attachment file created at ${new Date().toISOString()}\nThis tests the complete attachment workflow with verification and activation.`;
        fs.writeFileSync(testFilePath, testContent);
        console.log('✅ Test file created:', testFilePath);
        
        // Test job UUID (replace with a valid job UUID from your system)
        const testJobUuid = '70a4b519-8d35-409e-8c02-23104f2d304b'; // From your logs
        
        // Create FormData like the job creation route does
        const formData = new FormData();
        const fileExtension = '.txt';
        
        formData.append('related_object_uuid', testJobUuid);
        formData.append('active', 1); // Use integer instead of string
        formData.append('related_object', 'job');
        formData.append('attachment_name', 'test_final_attachment.txt');
        formData.append('file_type', fileExtension);
        formData.append('attachment_source', 'Job Portal Final Test');
        formData.append('tags', `job_portal,final_test,${new Date().toISOString().split('T')[0]}`);
        formData.append('file', fs.createReadStream(testFilePath));
        
        console.log('📤 Uploading attachment with FormData...');
        
        // Upload attachment using FormData (like job creation route)
        const attachmentResponse = await fetch('https://api.servicem8.com/api_1.0/attachment.json', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'accept': 'application/json',
                ...formData.getHeaders()
            },
            body: formData
        });
        
        const attachmentResponseText = await attachmentResponse.text();
        console.log('Attachment Response Status:', attachmentResponse.status);
        console.log('Attachment Response Headers:', Object.fromEntries(attachmentResponse.headers.entries()));
        
        if (attachmentResponse.ok) {
            const attachmentData = JSON.parse(attachmentResponseText);
            console.log('✅ Attachment uploaded successfully:', attachmentData);
            
            // Extract UUID from response header
            const recordUuid = attachmentResponse.headers.get('x-record-uuid');
            if (recordUuid) {
                console.log('Attachment UUID extracted from header:', recordUuid);
                
                // Verify attachment status using API key
                console.log('🔍 Verifying attachment status with API key...');
                try {
                    const verifyResponse = await fetch(`https://api.servicem8.com/api_1.0/attachment/${recordUuid}.json`, {
                        method: 'GET',
                        headers: {
                            'X-Api-Key': process.env.SERVICEM8_API_KEY,
                            'accept': 'application/json'
                        }
                    });
                    
                    if (verifyResponse.ok) {
                        const verifyData = JSON.parse(await verifyResponse.text());
                        console.log('📋 Attachment verification:', {
                            uuid: verifyData.uuid,
                            active: verifyData.active,
                            attachment_name: verifyData.attachment_name,
                            edit_date: verifyData.edit_date,
                            photo_width: verifyData.photo_width,
                            photo_height: verifyData.photo_height,
                            attachment_source: verifyData.attachment_source,
                            tags: verifyData.tags
                        });
                        
                        // If attachment is inactive, try to activate it
                        if (verifyData.active === 0) {
                            console.log('⚠️ Attachment is inactive, attempting to activate...');
                            const activateResponse = await fetch(`https://api.servicem8.com/api_1.0/attachment/${recordUuid}.json`, {
                                method: 'PUT',
                                headers: {
                                    'X-Api-Key': process.env.SERVICEM8_API_KEY,
                                    'accept': 'application/json',
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify({
                                    active: 1,
                                    attachment_source: 'Job Portal Final Test - Activated',
                                    tags: `job_portal,final_test,activated,${new Date().toISOString().split('T')[0]}`
                                })
                            });
                            
                            const activateText = await activateResponse.text();
                            console.log('Activate response status:', activateResponse.status);
                            console.log('Activate response:', activateText);
                            
                            if (activateResponse.ok) {
                                console.log('✅ Attachment activated successfully');
                                
                                // Final verification
                                const finalVerifyResponse = await fetch(`https://api.servicem8.com/api_1.0/attachment/${recordUuid}.json`, {
                                    method: 'GET',
                                    headers: {
                                        'X-Api-Key': process.env.SERVICEM8_API_KEY,
                                        'accept': 'application/json'
                                    }
                                });
                                
                                if (finalVerifyResponse.ok) {
                                    const finalVerifyData = JSON.parse(await finalVerifyResponse.text());
                                    console.log('📋 Final attachment status:', {
                                        uuid: finalVerifyData.uuid,
                                        active: finalVerifyData.active,
                                        attachment_name: finalVerifyData.attachment_name,
                                        attachment_source: finalVerifyData.attachment_source,
                                        tags: finalVerifyData.tags
                                    });
                                    
                                    if (finalVerifyData.active === 1) {
                                        console.log('🎉 SUCCESS: Attachment is now active!');
                                    } else {
                                        console.log('❌ FAILED: Attachment is still inactive');
                                    }
                                }
                            } else {
                                console.log('❌ Failed to activate attachment:', activateText);
                            }
                        } else {
                            console.log('🎉 SUCCESS: Attachment is already active!');
                        }
                    } else {
                        console.log('❌ Failed to verify attachment:', await verifyResponse.text());
                    }
                } catch (verifyError) {
                    console.log('⚠️ Could not verify attachment status:', verifyError.message);
                }
            }
        } else {
            console.log('❌ Failed to upload attachment');
            console.log('Error Response:', attachmentResponseText);
        }
        
        // Cleanup test file
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
            console.log('🧹 Test file cleaned up');
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Error details:', error);
    }
}

// Run the test
if (require.main === module) {
    testFinalAttachmentApproach();
}

module.exports = { testFinalAttachmentApproach };