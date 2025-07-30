const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { getValidAccessToken } = require('./src/utils/tokenManager');

// Test the official 3-step ServiceM8 attachment process
async function testOfficial3StepProcess() {
    console.log('🧪 Testing Official ServiceM8 3-Step Attachment Process');
    console.log('====================================================');
    console.log('Following the exact documentation steps:');
    console.log('1. Create job record (already exists)');
    console.log('2. Create attachment record');
    console.log('3. Submit binary data to .file endpoint');
    console.log('====================================================\n');
    
    try {
        // Get access token
        const accessToken = await getValidAccessToken();
        console.log('✅ Access token obtained');
        
        // Create a test file
        const testFilePath = path.join(__dirname, 'test_official_3step.txt');
        const testContent = `Official 3-step test file created at ${new Date().toISOString()}\nFollowing ServiceM8 documentation exactly.`;
        fs.writeFileSync(testFilePath, testContent);
        console.log('✅ Test file created:', testFilePath);
        
        // Use existing job UUID from your logs
        const testJobUuid = '70a4b519-8d35-409e-8c02-23104f2d304b';
        console.log('📋 Using existing job UUID:', testJobUuid);
        
        // STEP 2: Create the attachment record (following documentation exactly)
        console.log('\n🔄 STEP 2: Creating attachment record...');
        const attachmentData = {
            "related_object": "job",
            "related_object_uuid": testJobUuid,
            "attachment_name": "test_official_3step.txt",
            "file_type": ".txt",
            "active": true  // Use boolean as in documentation
        };
        
        console.log('📋 Attachment record payload:', JSON.stringify(attachmentData, null, 2));
        
        const createResponse = await fetch('https://api.servicem8.com/api_1.0/Attachment.json', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(attachmentData)
        });
        
        const createResponseText = await createResponse.text();
        const attachmentUuid = createResponse.headers.get('x-record-uuid');
        
        console.log('Create Response Status:', createResponse.status);
        console.log('Create Response Headers:', Object.fromEntries(createResponse.headers.entries()));
        console.log('Create Response Body:', createResponseText);
        
        if (!createResponse.ok || !attachmentUuid) {
            throw new Error(`Failed to create attachment record: ${createResponseText}`);
        }
        
        console.log('✅ STEP 2 Complete: Attachment record created');
        console.log('📋 Attachment UUID:', attachmentUuid);
        
        // STEP 3: Submit the binary data (following documentation exactly)
        console.log('\n🔄 STEP 3: Submitting binary data to .file endpoint...');
        const fileBuffer = fs.readFileSync(testFilePath);
        
        const fileUploadUrl = `https://api.servicem8.com/api_1.0/Attachment/${attachmentUuid}.file`;
        console.log('📋 File upload URL:', fileUploadUrl);
        console.log('📋 File size:', fileBuffer.length, 'bytes');
        
        const fileUploadResponse = await fetch(fileUploadUrl, {
            method: 'POST',
            headers: {
                'X-Api-Key': process.env.SERVICEM8_API_KEY,
                'Content-Type': 'text/plain'  // Match the file type
            },
            body: fileBuffer
        });
        
        const fileUploadResponseText = await fileUploadResponse.text();
        
        console.log('File Upload Response Status:', fileUploadResponse.status);
        console.log('File Upload Response Headers:', Object.fromEntries(fileUploadResponse.headers.entries()));
        console.log('File Upload Response Body:', fileUploadResponseText);
        
        if (!fileUploadResponse.ok) {
            console.log('❌ STEP 3 Failed: Binary data upload failed');
            console.log('Error:', fileUploadResponseText);
        } else {
            console.log('✅ STEP 3 Complete: Binary data uploaded successfully');
        }
        
        // VERIFICATION: Check the final attachment status
        console.log('\n🔍 VERIFICATION: Checking final attachment status...');
        
        const verifyResponse = await fetch(`https://api.servicem8.com/api_1.0/Attachment/${attachmentUuid}.json`, {
            method: 'GET',
            headers: {
                'X-Api-Key': process.env.SERVICEM8_API_KEY,
                'Accept': 'application/json'
            }
        });
        
        if (verifyResponse.ok) {
            const verifyData = JSON.parse(await verifyResponse.text());
            console.log('📋 Final attachment status:', {
                uuid: verifyData.uuid,
                active: verifyData.active,
                attachment_name: verifyData.attachment_name,
                file_type: verifyData.file_type,
                edit_date: verifyData.edit_date,
                photo_width: verifyData.photo_width,
                photo_height: verifyData.photo_height,
                attachment_source: verifyData.attachment_source,
                tags: verifyData.tags,
                related_object: verifyData.related_object,
                related_object_uuid: verifyData.related_object_uuid
            });
            
            // Check if the attachment is now active and has file content
            const hasFileContent = verifyData.edit_date !== '0000-00-00 00:00:00';
            const isActive = verifyData.active === 1 || verifyData.active === true;
            
            console.log('\n📊 RESULTS:');
            console.log('===========');
            console.log('✅ Attachment Record Created:', !!attachmentUuid);
            console.log('✅ Binary Data Uploaded:', fileUploadResponse.ok);
            console.log('✅ File Content Processed:', hasFileContent);
            console.log('✅ Attachment Active:', isActive);
            
            if (isActive && hasFileContent) {
                console.log('\n🎉 SUCCESS: Complete 3-step process worked!');
                console.log('The attachment is now active and has file content.');
            } else if (isActive && !hasFileContent) {
                console.log('\n⚠️ PARTIAL SUCCESS: Attachment is active but file content may not be processed.');
            } else {
                console.log('\n❌ ISSUE: Attachment is still inactive or missing file content.');
            }
            
        } else {
            console.log('❌ Failed to verify attachment:', await verifyResponse.text());
        }
        
        // Cleanup test file
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
            console.log('\n🧹 Test file cleaned up');
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Error details:', error);
    }
}

// Run the test
if (require.main === module) {
    testOfficial3StepProcess();
}

module.exports = { testOfficial3StepProcess };