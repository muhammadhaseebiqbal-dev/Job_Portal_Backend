const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');
const { getValidAccessToken } = require('./src/utils/tokenManager');

// Test the new 2-step attachment upload approach
async function testJobAttachmentUpload() {
    console.log('🧪 Testing Job Attachment Upload with 2-Step Approach');
    console.log('====================================================');
    
    try {
        // Get access token
        const accessToken = await getValidAccessToken();
        console.log('✅ Access token obtained');
        
        // Create a test file
        const testFilePath = path.join(__dirname, 'test_job_attachment.txt');
        const testContent = `Test job attachment file created at ${new Date().toISOString()}\nThis is a test to verify the 2-step attachment upload approach.`;
        fs.writeFileSync(testFilePath, testContent);
        console.log('✅ Test file created:', testFilePath);
        
        // Test job UUID (replace with a valid job UUID from your system)
        const testJobUuid = '70a4b519-8d35-409e-8c02-23104f2d304b'; // From your logs
        
        // Simulate file buffer like multer would provide
        const fileBuffer = fs.readFileSync(testFilePath);
        const fileName = 'test_job_attachment.txt';
        const mimeType = 'text/plain';
        const fileExtension = '.txt';
        
        // Convert file to base64 for potential use
        const base64Content = fileBuffer.toString('base64');
        const dataUri = `data:${mimeType};base64,${base64Content}`;
        
        let attachmentUuid;
        let uploadSuccess = false;
        
        // APPROACH 1: Try creating attachment with file content included (single step)
        console.log('🔄 Approach 1: Single-step attachment creation with file content...');
        try {
            const singleStepData = {
                related_object: 'job',
                related_object_uuid: testJobUuid,
                attachment_name: fileName,
                file_type: fileExtension,
                active: 1,
                attachment_source: 'Job Portal Test',
                tags: `job_portal,test,${new Date().toISOString().split('T')[0]}`,
                file_content: dataUri // Include base64 file content
            };
            
            const singleStepResponse = await fetch('https://api.servicem8.com/api_1.0/attachment.json', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(singleStepData)
            });
            
            const singleStepText = await singleStepResponse.text();
            attachmentUuid = singleStepResponse.headers.get('x-record-uuid');
            
            console.log('Single-step response status:', singleStepResponse.status);
            console.log('Single-step response:', singleStepText);
            
            if (attachmentUuid) {
                console.log('✅ Approach 1 successful: Attachment created with file content, UUID:', attachmentUuid);
                uploadSuccess = true;
            } else {
                console.log('❌ Approach 1 failed:', singleStepText);
            }
            
        } catch (singleStepError) {
            console.log('❌ Approach 1 failed:', singleStepError.message);
        }
        
        // APPROACH 2: If single-step failed, try the 2-step process
        if (!uploadSuccess) {
            console.log('🔄 Approach 2: Two-step attachment process...');
            try {
                // STEP 1: Create attachment record (without file data)
                console.log('📝 Step 1: Creating attachment record...');
                const attachmentData = {
                    related_object: 'job',
                    related_object_uuid: testJobUuid,
                    attachment_name: fileName,
                    file_type: fileExtension,
                    active: 1,
                    attachment_source: 'Job Portal Test',
                    tags: `job_portal,test,${new Date().toISOString().split('T')[0]}`
                };
                
                const createResponse = await fetch('https://api.servicem8.com/api_1.0/attachment.json', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(attachmentData)
                });
                
                const createText = await createResponse.text();
                attachmentUuid = createResponse.headers.get('x-record-uuid');
                
                console.log('Create response status:', createResponse.status);
                console.log('Create response:', createText);
                
                if (!attachmentUuid) {
                    throw new Error('Failed to get attachment UUID from ServiceM8 response');
                }
                
                console.log('✅ Step 1 complete: Attachment record created with UUID:', attachmentUuid);
                
                // STEP 2: Try multiple methods to upload file data
                console.log('📤 Step 2: Trying multiple file upload methods...');
                
                // Method 2A: Try .file endpoint with binary data
                try {
                    console.log('🔄 Method 2A: Binary upload to .file endpoint...');
                    const uploadResponse = await fetch(`https://api.servicem8.com/api_1.0/attachment/${attachmentUuid}.file`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': mimeType
                        },
                        body: fileBuffer
                    });
                    
                    const uploadText = await uploadResponse.text();
                    console.log('Binary upload response status:', uploadResponse.status);
                    console.log('Binary upload response:', uploadText);
                    
                    if (uploadResponse.ok) {
                        console.log('✅ Method 2A successful: Binary upload completed');
                        uploadSuccess = true;
                    } else {
                        console.log('❌ Method 2A failed:', uploadText);
                    }
                } catch (binaryError) {
                    console.log('❌ Method 2A failed:', binaryError.message);
                    
                    // Method 2B: Try updating attachment record with file_content
                    try {
                        console.log('🔄 Method 2B: Update attachment with base64 content...');
                        const updateResponse = await fetch(`https://api.servicem8.com/api_1.0/attachment/${attachmentUuid}.json`, {
                            method: 'PUT',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                file_content: dataUri,
                                active: 1
                            })
                        });
                        
                        const updateText = await updateResponse.text();
                        console.log('Update response status:', updateResponse.status);
                        console.log('Update response:', updateText);
                        
                        if (updateResponse.ok) {
                            console.log('✅ Method 2B successful: Base64 content updated');
                            uploadSuccess = true;
                        } else {
                            console.log('❌ Method 2B failed:', updateText);
                        }
                    } catch (base64Error) {
                        console.log('❌ Method 2B failed:', base64Error.message);
                    }
                }
                
            } catch (twoStepError) {
                console.log('❌ Approach 2 failed:', twoStepError.message);
            }
        }
        
        // Verify final attachment status
        if (attachmentUuid) {
            console.log('🔍 Verifying final attachment status...');
            try {
                const verifyResponse = await fetch(`https://api.servicem8.com/api_1.0/attachment/${attachmentUuid}.json`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'accept': 'application/json'
                    }
                });
                
                if (verifyResponse.ok) {
                    const verifyData = JSON.parse(await verifyResponse.text());
                    console.log('📋 Final attachment verification:', {
                        uuid: verifyData.uuid,
                        active: verifyData.active,
                        attachment_name: verifyData.attachment_name,
                        edit_date: verifyData.edit_date,
                        photo_width: verifyData.photo_width,
                        photo_height: verifyData.photo_height,
                        attachment_source: verifyData.attachment_source,
                        tags: verifyData.tags
                    });
                    
                    if (verifyData.active === 1) {
                        console.log('🎉 SUCCESS: Attachment is active!');
                    } else {
                        console.log('❌ ISSUE: Attachment is still inactive');
                        
                        // Try to force activate
                        console.log('🔄 Attempting to force activate...');
                        const forceActivateResponse = await fetch(`https://api.servicem8.com/api_1.0/attachment/${attachmentUuid}.json`, {
                            method: 'PUT',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                                'accept': 'application/json',
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                active: 1,
                                attachment_source: 'Job Portal Test - Force Activated',
                                tags: `job_portal,test,force_activated,${new Date().toISOString().split('T')[0]}`
                            })
                        });
                        
                        if (forceActivateResponse.ok) {
                            console.log('✅ Force activation successful');
                        } else {
                            console.log('❌ Force activation failed:', await forceActivateResponse.text());
                        }
                    }
                } else {
                    console.log('❌ Failed to verify attachment:', await verifyResponse.text());
                }
            } catch (verifyError) {
                console.log('❌ Verification error:', verifyError.message);
            }
        }
        
        // Summary
        console.log('\n📊 SUMMARY:');
        console.log('===========');
        console.log('Upload Success:', uploadSuccess);
        console.log('Attachment UUID:', attachmentUuid || 'None');
        console.log('Test Job UUID:', testJobUuid);
        
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
    testJobAttachmentUpload();
}

module.exports = { testJobAttachmentUpload };