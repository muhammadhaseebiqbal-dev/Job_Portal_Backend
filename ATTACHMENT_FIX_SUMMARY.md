# ServiceM8 Attachment Upload Fix

## Issue Description
Attachments were being uploaded to ServiceM8 successfully (status 200), but they were showing as `active: 0` (inactive) in the API response. This meant the attachments existed in ServiceM8 but were not visible or accessible.

## Root Cause Analysis
1. **Authentication Method**: The original code was using `X-Api-Key` header in some places, but the system uses Bearer token authentication
2. **Active Field Type**: The `active` field was being sent as a string `'1'` instead of integer `1`
3. **Missing Metadata**: Some important fields like `attachment_source` and `tags` were missing
4. **No Verification**: There was no verification step to check if the attachment was properly activated after upload

## Key Findings from Logs
- Attachment UUID: `c7ba0bad-c057-46e9-8cb7-231042edfc4b`
- Status: `active: 0` (inactive)
- Edit date: `0000-00-00 00:00:00` (indicates no file content was processed)
- Photo dimensions: `0x0` (indicates no image processing occurred)
- Missing: `attachment_source`, `tags` fields were empty

## Implemented Fixes

### 1. Fixed Authentication
```javascript
// Before (incorrect)
headers: {
    'X-Api-Key': process.env.SERVICEM8_API_KEY,
    'accept': 'application/json',
    ...formData.getHeaders()
}

// After (correct)
headers: {
    'Authorization': `Bearer ${accessToken}`,
    'accept': 'application/json',
    ...formData.getHeaders()
}
```

### 2. Fixed Active Field Type
```javascript
// Before
formData.append('active', '1'); // String

// After
formData.append('active', 1); // Integer
```

### 3. Added Missing Metadata
```javascript
formData.append('attachment_source', 'Job Portal');
formData.append('tags', `job_portal,${new Date().toISOString().split('T')[0]}`);
```

### 4. Added Verification and Activation Logic
```javascript
// Verify attachment status after upload
const verifyResponse = await fetch(`https://api.servicem8.com/api_1.0/attachment/${recordUuid}.json`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'accept': 'application/json'
    }
});

// If inactive, attempt to activate
if (verifyData.active === 0) {
    const activateResponse = await fetch(`https://api.servicem8.com/api_1.0/attachment/${recordUuid}.json`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            active: 1,
            attachment_source: 'Job Portal',
            tags: `job_portal,${new Date().toISOString().split('T')[0]}`
        })
    });
}
```

## Files Modified
1. `Job_Portal_Backend/src/routes/JobsRoutes.js` - Fixed job creation attachment upload
2. `Job_Portal_Backend/src/routes/servicem8AttachmentRoute.js` - Already had better implementation

## Testing
Created `test_attachment_fix.js` to verify the fix works correctly.

To test:
```bash
cd Job_Portal_Backend
node test_attachment_fix.js
```

## Expected Results After Fix
- Attachments should be created with `active: 1`
- `attachment_source` should be set to "Job Portal"
- `tags` should contain relevant metadata
- `edit_date` should be properly set when file content is processed
- Attachments should be visible in ServiceM8 interface

## Monitoring
Check the server logs for:
- ✅ Attachment uploaded successfully
- 📋 Attachment verification: active: 1
- 🎉 SUCCESS: Attachment is now active!

If you still see `active: 0`, the verification and activation logic will attempt to fix it automatically.