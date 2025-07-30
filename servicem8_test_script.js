const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

// Configuration
const CONFIG = {
    API_KEY: 'smk-c72bdb-6c4c732b43636206-01358eed87df8ad4',
    BASE_URL: 'https://api.servicem8.com/api_1.0',
    TEST_JOB_UUID: '2d4063b7-40d7-4ea1-beaa-230fe303955b'
};

// Headers for ServiceM8 API
const getHeaders = (isFormData = false) => {
    const headers = {
        'X-Api-Key': CONFIG.API_KEY,
        'accept': 'application/json'
    };
    
    if (!isFormData) {
        headers['content-type'] = 'application/json';
    }
    
    return headers;
};

// Module 1: Create Job Contact
async function createJobContact(jobUuid = CONFIG.TEST_JOB_UUID, contactData = null) {
    console.log('\n=== CREATING JOB CONTACT ===');
    
    const defaultContactData = {
        job_uuid: jobUuid,
        active: 1,
        first: "Clint",
        last: "Karam",
        phone: "Test",
        mobile: "0400000000",
        email: "clint@gcce.com.au",
        type: "Job Contact"
    };
    
    const payload = contactData || defaultContactData;
    
    try {
        console.log('Request URL:', `${CONFIG.BASE_URL}/jobcontact.json`);
        console.log('Request Headers:', JSON.stringify(getHeaders(), null, 2));
        console.log('Request Payload:', JSON.stringify(payload, null, 2));
        
        const response = await fetch(`${CONFIG.BASE_URL}/jobcontact.json`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(payload)
        });
        
        const responseText = await response.text();
        console.log('\nResponse Status:', response.status);
        console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
        
        if (response.ok) {
            const data = JSON.parse(responseText);
            console.log('✅ Job Contact Created Successfully!');
            console.log('Response Data:', JSON.stringify(data, null, 2));
            
            // Extract UUID from response header if not in response body
            const recordUuid = response.headers.get('x-record-uuid');
            if (recordUuid) {
                data.uuid = recordUuid;
                console.log('Contact UUID extracted from header:', recordUuid);
            }
            
            return data;
        } else {
            console.log('❌ Failed to create job contact');
            console.log('Error Response:', responseText);
            return null;
        }
    } catch (error) {
        console.error('❌ Error creating job contact:', error.message);
        return null;
    }
}

// Module 2: Upload Attachment
async function uploadAttachment(jobUuid = CONFIG.TEST_JOB_UUID, filePath = null) {
    console.log('\n=== UPLOADING ATTACHMENT ===');
    
    // Create a test file if none provided
    let actualFilePath = filePath;
    let isTemporaryFile = false;
    
    if (!actualFilePath) {
        actualFilePath = path.join(__dirname, 'test_attachment.txt');
        fs.writeFileSync(actualFilePath, `Test attachment file created at ${new Date().toISOString()}\nJob UUID: ${jobUuid}\nThis is a sample attachment for testing purposes.`);
        isTemporaryFile = true;
        console.log('Created temporary test file:', actualFilePath);
    }
    
    if (!fs.existsSync(actualFilePath)) {
        console.error('❌ File not found:', actualFilePath);
        return null;
    }
    
    // Try the correct approach based on existing attachment data
    const approaches = [
        {
            name: 'Correct Approach: Using related_object and related_object_uuid',
            formData: {
                related_object_uuid: jobUuid,
                active: '1',
                related_object: 'job'
            }
        },
        {
            name: 'Fallback 1: Using object_uuid with related_object',
            formData: {
                object_uuid: jobUuid,
                active: '1',
                related_object: 'job'
            }
        },
        {
            name: 'Fallback 2: Using both related_ and object_ fields',
            formData: {
                related_object_uuid: jobUuid,
                object_uuid: jobUuid,
                active: '1',
                related_object: 'job',
                object_name: 'job'
            }
        }
    ];
    
    for (let i = 0; i < approaches.length; i++) {
        const approach = approaches[i];
        console.log(`\n🔄 Trying ${approach.name}...`);
        
        try {
            const formData = new FormData();
            
            // Add all form data fields
            Object.keys(approach.formData).forEach(key => {
                formData.append(key, approach.formData[key]);
            });
            
            formData.append('attachment_name', path.basename(actualFilePath));
            formData.append('file', fs.createReadStream(actualFilePath));
            
            console.log('Request URL:', `${CONFIG.BASE_URL}/attachment.json`);
            console.log('Request Headers (FormData):', JSON.stringify(getHeaders(true), null, 2));
            console.log('Form Data Fields:');
            Object.keys(approach.formData).forEach(key => {
                console.log(`- ${key}: ${approach.formData[key]}`);
            });
            console.log('- attachment_name:', path.basename(actualFilePath));
            console.log('- file:', actualFilePath);
            
            const response = await fetch(`${CONFIG.BASE_URL}/attachment.json`, {
                method: 'POST',
                headers: getHeaders(true),
                body: formData
            });
            
            const responseText = await response.text();
            console.log('\nResponse Status:', response.status);
            console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
            
            if (response.ok) {
                const data = JSON.parse(responseText);
                console.log(`✅ Attachment Uploaded Successfully with ${approach.name}!`);
                console.log('Response Data:', JSON.stringify(data, null, 2));
                
                // Extract UUID from response header if not in response body
                const recordUuid = response.headers.get('x-record-uuid');
                if (recordUuid) {
                    data.uuid = recordUuid;
                    console.log('Attachment UUID extracted from header:', recordUuid);
                }
                
                // Cleanup temporary file
                if (isTemporaryFile) {
                    fs.unlinkSync(actualFilePath);
                    console.log('Cleaned up temporary file');
                }
                
                return data;
            } else {
                console.log(`❌ ${approach.name} failed`);
                console.log('Error Response:', responseText);
                
                // If this is not the last approach, continue to next one
                if (i < approaches.length - 1) {
                    console.log('Trying next approach...');
                    continue;
                }
            }
        } catch (error) {
            console.error(`❌ Error with ${approach.name}:`, error.message);
            
            // If this is not the last approach, continue to next one
            if (i < approaches.length - 1) {
                console.log('Trying next approach...');
                continue;
            }
        }
    }
    
    // If we get here, all approaches failed
    console.log('❌ All attachment upload approaches failed');
    
    // Cleanup temporary file
    if (isTemporaryFile && fs.existsSync(actualFilePath)) {
        fs.unlinkSync(actualFilePath);
        console.log('Cleaned up temporary file');
    }
    
    return null;
}

// Module 3: Create Job
async function createJob(jobData = null) {
    console.log('\n=== CREATING JOB ===');
    
    const defaultJobData = {
        active: 1,
        job_address: "123 Test Street, Test City, NSW 2000",
        job_description: "Test job created by script",
        job_notes: "This is a test job created by the ServiceM8 test script",
        status: "Quote",
        job_priority: "Normal",
        generated_job_id: `TEST-${Date.now()}`
    };
    
    const payload = jobData || defaultJobData;
    
    try {
        console.log('Request URL:', `${CONFIG.BASE_URL}/job.json`);
        console.log('Request Headers:', JSON.stringify(getHeaders(), null, 2));
        console.log('Request Payload:', JSON.stringify(payload, null, 2));
        
        const response = await fetch(`${CONFIG.BASE_URL}/job.json`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(payload)
        });
        
        const responseText = await response.text();
        console.log('\nResponse Status:', response.status);
        console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
        
        if (response.ok) {
            const data = JSON.parse(responseText);
            console.log('✅ Job Created Successfully!');
            console.log('Response Data:', JSON.stringify(data, null, 2));
            
            // Extract UUID from response header if not in response body
            const recordUuid = response.headers.get('x-record-uuid');
            if (recordUuid) {
                data.uuid = recordUuid;
                console.log('Job UUID extracted from header:', recordUuid);
            }
            
            return data;
        } else {
            console.log('❌ Failed to create job');
            console.log('Error Response:', responseText);
            return null;
        }
    } catch (error) {
        console.error('❌ Error creating job:', error.message);
        return null;
    }
}

// Module 4: Get Job Details
async function getJobDetails(jobUuid = CONFIG.TEST_JOB_UUID) {
    console.log('\n=== GETTING JOB DETAILS ===');
    
    try {
        console.log('Request URL:', `${CONFIG.BASE_URL}/job/${jobUuid}.json`);
        console.log('Request Headers:', JSON.stringify(getHeaders(), null, 2));
        
        const response = await fetch(`${CONFIG.BASE_URL}/job/${jobUuid}.json`, {
            method: 'GET',
            headers: getHeaders()
        });
        
        const responseText = await response.text();
        console.log('\nResponse Status:', response.status);
        console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
        
        if (response.ok) {
            const data = JSON.parse(responseText);
            console.log('✅ Job Details Retrieved Successfully!');
            console.log('Response Data:', JSON.stringify(data, null, 2));
            return data;
        } else {
            console.log('❌ Failed to get job details');
            console.log('Error Response:', responseText);
            return null;
        }
    } catch (error) {
        console.error('❌ Error getting job details:', error.message);
        return null;
    }
}

// Module 5: Chain Test - Complete Job Creation Workflow
async function chainTest() {
    console.log('🔗 STARTING SERVICEM8 CHAIN TEST');
    console.log('=================================');
    console.log('This test will:');
    console.log('1. Create a new job with sample data');
    console.log('2. Add a job contact to the created job');
    console.log('3. Upload an attachment to the job');
    console.log('4. Return the job UUID for manual verification');
    console.log('=================================\n');
    
    // Step 1: Create a new job with comprehensive sample data
    console.log('STEP 1: Creating a new job...');
    const jobData = {
        active: 1,
        job_address: "123 Sample Street, Test City, NSW 2000, Australia",
        job_description: "Chain Test Job - Plumbing Repair Service",
        job_notes: `Comprehensive test job created via API chain test on ${new Date().toISOString()}. This job includes sample contact and attachment data for testing purposes.`,
        status: "Quote",
        job_priority: "Normal",
        generated_job_id: `CHAIN-TEST-${Date.now()}`,
        job_location: "Test Location",
        job_is_quote: 1
    };
    
    const createdJob = await createJob(jobData);
    
    if (!createdJob || !createdJob.uuid) {
        console.log('❌ Chain test failed: Could not create job');
        return null;
    }
    
    const jobUuid = createdJob.uuid;
    console.log(`✅ Job created successfully with UUID: ${jobUuid}\n`);
    
    // Step 2: Add job contact with sample data
    console.log('STEP 2: Adding job contact...');
    const contactData = {
        job_uuid: jobUuid,
        active: 1,
        first: "John",
        last: "Smith",
        phone: "02 9876 5432",
        mobile: "0412 345 678",
        email: "john.smith@example.com",
        type: "Job Contact",
        address: "123 Sample Street, Test City, NSW 2000",
        company: "Sample Company Pty Ltd"
    };
    
    const createdContact = await createJobContact(jobUuid, contactData);
    
    if (!createdContact) {
        console.log('⚠️ Warning: Job contact creation failed, but continuing with test...\n');
    } else {
        console.log('✅ Job contact added successfully\n');
    }
    
    // Step 3: Upload attachment (with note about potential issues)
    console.log('STEP 3: Uploading attachment...');
    console.log('Note: Attachment upload may fail due to object_name validation issues');
    
    const attachmentResult = await uploadAttachment(jobUuid);
    
    if (!attachmentResult) {
        console.log('⚠️ Warning: Attachment upload failed (known issue with object_name parameter)\n');
    } else {
        console.log('✅ Attachment uploaded successfully\n');
    }
    
    // Step 4: Final summary
    console.log('🎯 CHAIN TEST COMPLETED');
    console.log('========================');
    console.log(`Created Job UUID: ${jobUuid}`);
    console.log(`Job Description: ${jobData.job_description}`);
    console.log(`Job Address: ${jobData.job_address}`);
    console.log(`Contact Name: ${contactData.first} ${contactData.last}`);
    console.log(`Contact Email: ${contactData.email}`);
    console.log('========================');
    console.log('\n📋 VERIFICATION STEPS:');
    console.log('1. Copy the Job UUID above');
    console.log('2. Log into ServiceM8');
    console.log('3. Search for the job using the UUID or generated job ID');
    console.log('4. Verify the job details match the test data');
    console.log('5. Check if the contact was added to the job');
    console.log('6. Look for any attachments (if upload succeeded)');
    console.log('\n🔍 You can also test this job UUID in other API calls');
    
    return {
        jobUuid: jobUuid,
        jobData: jobData,
        contactData: contactData,
        success: true
    };
}

// Module 6: Run All Tests
async function runAllTests() {
    console.log('🚀 STARTING SERVICEM8 API TESTS');
    console.log('=====================================');
    console.log('Using API Key:', CONFIG.API_KEY);
    console.log('Test Job UUID:', CONFIG.TEST_JOB_UUID);
    console.log('=====================================');
    
    // Test 1: Get existing job details
    await getJobDetails();
    
    // Test 2: Create job contact
    await createJobContact();
    
    // Test 3: Upload attachment
    await uploadAttachment();
    
    // Test 4: Create a new job (optional)
    const customJobData = {
        active: 1,
        job_address: "456 Script Test Ave, Automation City, QLD 4000",
        job_description: "New job created by test script",
        job_notes: `Test job created at ${new Date().toISOString()}`,
        status: "Quote",
        job_priority: "High"
    };
    
    const newJob = await createJob(customJobData);
    
    if (newJob && newJob.uuid) {
        console.log('\n=== TESTING WITH NEW JOB ===');
        // Test with the newly created job
        await createJobContact(newJob.uuid, {
            job_uuid: newJob.uuid,
            active: 1,
            first: "Test",
            last: "User",
            phone: "0312345678",
            mobile: "0412345678",
            email: "test@example.com",
            type: "Job Contact"
        });
        
        await uploadAttachment(newJob.uuid);
    }
    
    console.log('\n🏁 ALL TESTS COMPLETED');
}

// Individual test functions for standalone use
async function testJobContact() {
    console.log('🧪 Testing Job Contact Creation Only');
    await createJobContact();
}

async function testAttachmentUpload(filePath = null) {
    console.log('🧪 Testing Attachment Upload Only');
    await uploadAttachment(CONFIG.TEST_JOB_UUID, filePath);
}

async function testJobCreation() {
    console.log('🧪 Testing Job Creation Only');
    await createJob();
}

async function testJobRetrieval() {
    console.log('🧪 Testing Job Retrieval Only');
    await getJobDetails();
}

async function testChainWorkflow() {
    console.log('🧪 Testing Complete Job Creation Chain');
    await chainTest();
}

// Command line interface
if (require.main === module) {
    const args = process.argv.slice(2);
    const command = args[0];
    
    switch (command) {
        case 'contact':
            testJobContact();
            break;
        case 'attachment':
            const filePath = args[1];
            testAttachmentUpload(filePath);
            break;
        case 'job':
            testJobCreation();
            break;
        case 'get-job':
            testJobRetrieval();
            break;
        case 'chain':
            testChainWorkflow();
            break;
        case 'all':
        default:
            runAllTests();
            break;
    }
}

// Export modules for use in other scripts
module.exports = {
    createJobContact,
    uploadAttachment,
    createJob,
    getJobDetails,
    runAllTests,
    chainTest,
    CONFIG
};
