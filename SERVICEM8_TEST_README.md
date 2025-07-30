# ServiceM8 API Test Script

This script provides comprehensive testing for ServiceM8 API operations including job contact creation, attachment uploads, and job management.

## Prerequisites

Make sure you have the required dependencies installed:

```bash
npm install node-fetch form-data
```

## Usage

### Run All Tests
```bash
node servicem8_test_script.js all
# or simply
node servicem8_test_script.js
```

### Run Individual Tests

#### Test Job Contact Creation
```bash
node servicem8_test_script.js contact
```

#### Test Attachment Upload
```bash
# Upload with auto-generated test file
node servicem8_test_script.js attachment

# Upload specific file
node servicem8_test_script.js attachment "path/to/your/file.pdf"
```

#### Test Job Creation
```bash
node servicem8_test_script.js job
```

#### Test Job Retrieval
```bash
node servicem8_test_script.js get-job
```

## Configuration

The script uses these default settings (modify in the CONFIG object):

- **API_KEY**: `smk-c72bdb-6c4c732b43636206-01358eed87df8ad4`
- **TEST_JOB_UUID**: `2d4063b7-40d7-4ea1-beaa-230fe303955b`
- **BASE_URL**: `https://api.servicem8.com/api_1.0`

## Test Data

### Default Job Contact Data
```json
{
  "job_uuid": "2d4063b7-40d7-4ea1-beaa-230fe303955b",
  "active": 1,
  "first": "Clint",
  "last": "Karam",
  "phone": "Test",
  "mobile": "0400000000",
  "email": "clint@gcce.com.au",
  "type": "Job Contact"
}
```

### Default Job Data
```json
{
  "active": 1,
  "job_address": "123 Test Street, Test City, NSW 2000",
  "job_description": "Test job created by script",
  "job_notes": "This is a test job created by the ServiceM8 test script",
  "status": "Quote",
  "job_priority": "Normal",
  "generated_job_id": "TEST-{timestamp}"
}
```

## Output

The script provides detailed output for each operation:

- ✅ Success indicators with full response data
- ❌ Error indicators with detailed error messages
- 📊 Request/response headers and payloads
- 🧹 Automatic cleanup of temporary files

## Using as a Module

You can also import and use individual functions in other scripts:

```javascript
const { createJobContact, uploadAttachment, createJob, getJobDetails } = require('./servicem8_test_script.js');

// Use individual functions
const contact = await createJobContact('your-job-uuid');
const attachment = await uploadAttachment('your-job-uuid', 'file-path');
const job = await createJob(customJobData);
const jobDetails = await getJobDetails('your-job-uuid');
```

## Error Handling

The script includes comprehensive error handling:

- Network errors
- API response errors
- File system errors
- Automatic cleanup of temporary files

Each function returns `null` on error and logs detailed error information.
