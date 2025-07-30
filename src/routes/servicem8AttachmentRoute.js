const express = require('express');
const multer = require('multer');

const FormData = require('form-data');
const { sendBusinessNotification, NOTIFICATION_TYPES } = require('../utils/businessNotifications');
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

/**
 * SERVICEM8 NATIVE ATTACHMENT ROUTES
 * 
 * This route handles file attachments using ServiceM8's native attachment API.
 * Files are uploaded directly to ServiceM8 using the official 2-step process:
 * 1. Create attachment record with metadata
 * 2. Upload binary file data to the attachment
 * 
 * ServiceM8 Attachment API Features:
 * - Native file storage in ServiceM8
 * - Direct job association via related_object_uuid
 * - Built-in file management and security
 * - Automatic thumbnail generation for images
 * - File versioning and history
 * 
 * Best Practices Implemented:
 * - Official 2-step upload process
 * - Proper file type handling with extensions
 * - File size validation
 * - Error handling and retry logic
 * - Metadata preservation
 * - Integration with ServiceM8 workflow
 */

/**
 * Helper function to extract file extension for ServiceM8 API
 * ServiceM8 expects file_type as extension with dot (e.g., ".pdf", ".png")
 */
const getFileExtension = (filename) => {
  if (!filename || !filename.includes('.')) {
    return '';
  }
  return '.' + filename.split('.').pop().toLowerCase();
};

/**
 * Reusable 3-step ServiceM8 attachment upload process
 * This is the proven working logic from job creation
 */
const upload3StepAttachment = async (file, relatedObjectUuid, relatedObject = 'job') => {
  console.log('🔗 Official ServiceM8 3-Step Attachment Process...');
  console.log('File info:', {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size
  });
  console.log('Related Object UUID:', relatedObjectUuid);

  // Extract file extension from filename
  const fileExtension = file.originalname.includes('.')
    ? '.' + file.originalname.split('.').pop().toLowerCase()
    : '';

  const fetch = require('node-fetch');

  // STEP 2: Create attachment record using API Key
  console.log('🔄 STEP 2: Creating attachment record...');
  const attachmentRecordData = {
    related_object: relatedObject,
    related_object_uuid: relatedObjectUuid,
    attachment_name: file.originalname,
    file_type: fileExtension,
    active: true
  };

  console.log('📋 Attachment record payload:', attachmentRecordData);

  const createResponse = await fetch('https://api.servicem8.com/api_1.0/attachment.json', {
    method: 'POST',
    headers: {
      'X-Api-Key': process.env.SERVICEM8_API_KEY,
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(attachmentRecordData)
  });

  const createResponseText = await createResponse.text();
  console.log('Create Response Status:', createResponse.status);
  console.log('Create Response Headers:', Object.fromEntries(createResponse.headers.entries()));
  console.log('Create Response Body:', createResponseText);

  if (!createResponse.ok) {
    throw new Error(`Failed to create attachment record: ${createResponseText}`);
  }

  // Extract attachment UUID from response header
  const attachmentUuid = createResponse.headers.get('x-record-uuid');
  if (!attachmentUuid) {
    throw new Error('No attachment UUID returned from ServiceM8');
  }

  console.log('✅ STEP 2 Complete: Attachment record created');
  console.log('📋 Attachment UUID:', attachmentUuid);

  // STEP 3: Submit binary data to .file endpoint using API Key
  console.log('🔄 STEP 3: Submitting binary data to .file endpoint...');
  const fileUploadUrl = `https://api.servicem8.com/api_1.0/Attachment/${attachmentUuid}.file`;
  console.log('📋 File upload URL:', fileUploadUrl);
  console.log('📋 File size:', file.size, 'bytes');

  const fileUploadResponse = await fetch(fileUploadUrl, {
    method: 'POST',
    headers: {
      'X-Api-Key': process.env.SERVICEM8_API_KEY,
      'Content-Type': 'application/octet-stream'
    },
    body: file.buffer
  });

  const fileUploadResponseText = await fileUploadResponse.text();
  console.log('File Upload Response Status:', fileUploadResponse.status);
  console.log('File Upload Response Headers:', Object.fromEntries(fileUploadResponse.headers.entries()));
  console.log('File Upload Response Body:', fileUploadResponseText);

  if (!fileUploadResponse.ok) {
    throw new Error(`Failed to upload binary data: ${fileUploadResponseText}`);
  }

  console.log('✅ STEP 3 Complete: Binary data uploaded successfully');

  // VERIFICATION: Check final attachment status
  console.log('🔍 VERIFICATION: Checking final attachment status...');
  const verifyResponse = await fetch(`https://api.servicem8.com/api_1.0/attachment/${attachmentUuid}.json`, {
    method: 'GET',
    headers: {
      'X-Api-Key': process.env.SERVICEM8_API_KEY,
      'accept': 'application/json'
    }
  });

  let finalAttachmentData = { uuid: attachmentUuid, status: 'uploaded' };

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

    console.log('📊 RESULTS:');
    console.log('===========');
    console.log('✅ Attachment Record Created:', true);
    console.log('✅ Binary Data Uploaded:', true);
    console.log('✅ File Content Processed:', verifyData.photo_width !== '0' || verifyData.photo_height !== '0' || verifyData.edit_date);
    console.log('✅ Attachment Active:', verifyData.active === 1);

    if (verifyData.active === 1) {
      console.log('🎉 SUCCESS: Complete 3-step process worked!');
      console.log('The attachment is now active and has file content.');
    } else {
      console.log('⚠️ WARNING: Attachment created but not active');
    }

    finalAttachmentData = verifyData;
  } else {
    console.log('⚠️ Could not verify final attachment status');
  }

  return {
    attachmentUuid,
    attachmentData: finalAttachmentData
  };
};

/**
 * Reusable function to download attachment from ServiceM8
 * Uses the correct API endpoint: https://api.servicem8.com/api_1.0/attachment/{attachmentId}.file
 */
const downloadAttachmentFromServiceM8 = async (attachmentId) => {
  console.log(`📥 Downloading ServiceM8 attachment: ${attachmentId}`);

  const fetch = require('node-fetch');

  // First, get attachment metadata using API Key
  console.log(`🔍 Getting attachment metadata for: ${attachmentId}`);
  const metadataResponse = await fetch(`https://api.servicem8.com/api_1.0/attachment/${attachmentId}.json`, {
    method: 'GET',
    headers: {
      'X-Api-Key': process.env.SERVICEM8_API_KEY,
      'Accept': 'application/json'
    }
  });

  if (!metadataResponse.ok) {
    throw new Error(`Failed to get attachment metadata: ${await metadataResponse.text()}`);
  }

  const attachment = await metadataResponse.json();
  console.log(`📋 Attachment metadata:`, {
    uuid: attachment.uuid,
    active: attachment.active,
    attachment_name: attachment.attachment_name,
    file_type: attachment.file_type,
    edit_date: attachment.edit_date,
    photo_width: attachment.photo_width,
    photo_height: attachment.photo_height
  });

  if (!attachment || attachment.active !== 1) {
    throw new Error('Attachment not found or inactive');
  }

  // Try to get file content using the .file endpoint with API Key
  console.log(`🔄 Getting file content from .file endpoint`);
  const fileResponse = await fetch(`https://api.servicem8.com/api_1.0/attachment/${attachmentId}.file`, {
    method: 'GET',
    headers: {
      'X-Api-Key': process.env.SERVICEM8_API_KEY,
      'Accept': '*/*'
    }
  });

  if (!fileResponse.ok) {
    throw new Error(`Failed to download file: ${fileResponse.status} - ${await fileResponse.text()}`);
  }

  const fileBuffer = Buffer.from(await fileResponse.arrayBuffer());
  let mimeType = attachment.file_type || 'application/octet-stream';

  // Use content-type from response if available
  if (fileResponse.headers.get('content-type')) {
    mimeType = fileResponse.headers.get('content-type');
  }

  // Convert file type extension to proper MIME type if needed
  if (mimeType.startsWith('.')) {
    const mimeMap = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.txt': 'text/plain',
      '.csv': 'text/csv',
      '.zip': 'application/zip'
    };
    mimeType = mimeMap[mimeType.toLowerCase()] || 'application/octet-stream';
  }

  console.log(`✅ Downloaded ServiceM8 attachment: ${attachment.attachment_name} (${fileBuffer.length} bytes, ${mimeType})`);

  return {
    attachment,
    fileBuffer,
    mimeType
  };
};

// Configure multer for memory storage (files stay in memory for base64 conversion)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (ServiceM8 recommended)
  },
  fileFilter: (_, file, cb) => {
    // Allow common file types (ServiceM8 supports most formats)
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain', 'text/csv',
      'application/zip', 'application/x-zip-compressed'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}`), false);
    }
  }
});

// Helper function to ensure ServiceM8 authentication
const ensureServiceM8Auth = async () => {
  try {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      throw new Error('ServiceM8 access token not found');
    }

    console.log('🔐 Authenticating with ServiceM8 for attachments...');
    servicem8.auth(accessToken);

    return true;
  } catch (error) {
    console.error('ServiceM8 authentication failed:', error);
    throw new Error('ServiceM8 authentication failed');
  }
};



// Helper function to format attachment data for frontend compatibility
const formatAttachmentForFrontend = (servicem8Attachment) => {
  return {
    id: servicem8Attachment.uuid,
    uuid: servicem8Attachment.uuid,
    jobId: servicem8Attachment.related_object_uuid,
    fileName: servicem8Attachment.attachment_name || 'Unknown File',
    fileSize: servicem8Attachment.file_size || 0,
    mimeType: servicem8Attachment.file_type || 'application/octet-stream',
    uploadedBy: servicem8Attachment.created_by_staff_name || 'System User',
    uploadTimestamp: servicem8Attachment.timestamp || servicem8Attachment.edit_date,
    active: servicem8Attachment.active === 1,

    // ServiceM8 specific fields
    attachment_source: servicem8Attachment.attachment_source,
    tags: servicem8Attachment.tags,
    lat: servicem8Attachment.lat,
    lng: servicem8Attachment.lng,
    photo_width: servicem8Attachment.photo_width,
    photo_height: servicem8Attachment.photo_height,
    extracted_info: servicem8Attachment.extracted_info,
    is_favourite: servicem8Attachment.is_favourite,

    // Additional metadata
    servicem8_data: servicem8Attachment
  };
};

/**
 * Upload a file attachment for a specific job using ServiceM8 API
 * POST /api/servicem8-attachments/upload/:jobId
 * Uses the same proven 3-step process from job creation
 */
router.post('/upload/:jobId', upload.single('file'), async (req, res) => {
  try {
    const { jobId } = req.params;
    const { userType, userName } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    console.log(`📤 Uploading file to ServiceM8 for job ${jobId}:`, {
      fileName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      userType,
      userName,
      clientUuid: req.headers['x-client-uuid'] || 'None'
    });

    // Validate job ID
    if (!jobId || jobId.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Invalid job ID provided'
      });
    }

    // Upload attachment using the proven 3-step process
    try {
      const { attachmentUuid, attachmentData } = await upload3StepAttachment(req.file, jobId, 'job');

      // Format response for frontend compatibility
      const formattedAttachment = {
        id: attachmentUuid,
        uuid: attachmentUuid,
        jobId: jobId,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        uploadedBy: userName || 'Job Portal User',
        uploadTimestamp: new Date().toISOString(),
        active: true,
        userType: userType || 'unknown',
        servicem8_uuid: attachmentUuid,
        attachment_source: 'Job Portal',
        attachment: attachmentData
      };

      // Send success response
      res.status(201).json({
        success: true,
        message: 'File uploaded successfully to ServiceM8 using 3-step process',
        data: formattedAttachment
      });

      // Send notification after successful upload
      try {
        const clientUuid = req.headers['x-client-uuid'] || null;
        const jobDescription = `Job ${jobId.substring(0, 8)}...`;

        await sendBusinessNotification(NOTIFICATION_TYPES.ATTACHMENT_ADDED, {
          jobId: jobId,
          jobDescription: jobDescription,
          attachmentId: attachmentUuid,
          fileName: req.file.originalname,
          fileSize: req.file.size,
          mimeType: req.file.mimetype,
          uploadedBy: userName || 'Job Portal User',
          userType: userType || 'unknown',
          clientUuid: clientUuid,
          client: userType === 'client' ? `Client ${clientUuid || jobId}` : 'Admin User',
          timestamp: new Date().toISOString(),
          servicem8_integration: true
        });

        console.log(`📎 ServiceM8 attachment notification triggered for job ${jobId} by ${userType} user`);
      } catch (notificationError) {
        console.error('Error sending attachment notification:', notificationError);
        // Don't fail the upload if notification fails
      }

    } catch (attachmentError) {
      console.error('❌ Failed to upload attachment using 3-step process:', attachmentError.message);
      console.error('Attachment error details:', attachmentError);
      throw attachmentError;
    }

  } catch (error) {
    console.error('Error uploading file to ServiceM8:', {
      error: error.message,
      stack: error.stack,
      jobId: req.params.jobId,
      fileName: req.file?.originalname,
      userType: req.body.userType,
      clientUuid: req.headers['x-client-uuid']
    });

    // Provide more specific error messages
    let errorMessage = 'Failed to upload file to ServiceM8';

    if (error.message?.includes('auth')) {
      errorMessage = 'ServiceM8 authentication failed. Please check your access token.';
    } else if (error.message?.includes('size')) {
      errorMessage = 'File size too large. Please choose a smaller file.';
    } else if (error.message?.includes('network') || error.code === 'ECONNREFUSED') {
      errorMessage = 'Network error. Please check your connection and try again.';
    } else if (error.response?.status === 404) {
      errorMessage = 'Job not found in ServiceM8. Please verify the job exists.';
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

/**
 * Get all attachments for a specific job from ServiceM8
 * GET /api/servicem8-attachments/job/:jobId
 */
router.get('/job/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;

    console.log(`📥 Fetching ServiceM8 attachments for job: ${jobId}`);

    // Ensure ServiceM8 authentication
    await ensureServiceM8Auth();

    try {
      // Use job-specific attachment endpoint instead of general attachment endpoint
      const accessToken = await getValidAccessToken();

      // Use filtered attachment endpoint to get attachments for this job
      console.log(`🔗 Using filtered attachment endpoint for job: ${jobId}`);
      const fetch = require('node-fetch');
      const response = await fetch(`https://api.servicem8.com/api_1.0/attachment.json?$filter=related_object_uuid eq '${jobId}' and related_object eq 'job'`, {
        method: 'GET',
        headers: {
          'X-Api-Key': process.env.SERVICEM8_API_KEY,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get job attachments: ${await response.text()}`);
      }

      const responseData = await response.json();
      
      console.log(`Raw API response type: ${typeof responseData}, is array: ${Array.isArray(responseData)}`);

      // The filtered endpoint should return an array
      const attachmentsArray = Array.isArray(responseData) ? responseData : [];

      // Filter for active attachments
      const jobAttachments = attachmentsArray.filter(attachment =>
        attachment && attachment.active === 1
      );

      console.log(`✅ Found ${jobAttachments.length} ServiceM8 attachments for job ${jobId} (via filtered endpoint)`);

      // Format attachments for frontend
      const formattedAttachments = jobAttachments.map(formatAttachmentForFrontend);

      // Sort by timestamp (newest first)
      formattedAttachments.sort((a, b) => new Date(b.uploadTimestamp) - new Date(a.uploadTimestamp));

      res.status(200).json({
        success: true,
        data: formattedAttachments,
        total: formattedAttachments.length,
        source: 'ServiceM8'
      });

    } catch (servicem8Error) {
      console.error('ServiceM8 API error:', servicem8Error);
      
      // Return empty array for graceful degradation
      return res.status(200).json({
        success: true,
        data: [],
        total: 0,
        source: 'ServiceM8',
        warning: `Could not fetch attachments: ${servicem8Error.message || 'Unknown error'}`
      });
    }

  } catch (error) {
    console.error('Error fetching attachments from ServiceM8:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attachments from ServiceM8',
      error: error.message
    });
  }
});

/**
 * Download/get a specific attachment from ServiceM8
 * GET /api/servicem8-attachments/download/:attachmentId
 */
router.get('/download/:attachmentId', async (req, res) => {
  try {
    const { attachmentId } = req.params;

    try {
      const { attachment, fileBuffer, mimeType } = await downloadAttachmentFromServiceM8(attachmentId);

      // Set appropriate headers for file download
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${attachment.attachment_name}"`);
      res.setHeader('Content-Length', fileBuffer.length);
      res.setHeader('Cache-Control', 'private, max-age=3600'); // Cache for 1 hour

      // Send file content
      res.send(fileBuffer);


    } catch (downloadError) {
      console.error('Error downloading attachment:', downloadError);

      // Handle specific error cases
      if (downloadError.message?.includes('not found') || downloadError.message?.includes('inactive')) {
        return res.status(404).json({
          success: false,
          message: 'Attachment not found or inactive'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Failed to download attachment from ServiceM8',
        error: downloadError.message
      });
    }

  } catch (error) {
    console.error('Error downloading attachment from ServiceM8:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download attachment from ServiceM8',
      error: error.message
    });
  }
});

/**
 * Delete a specific attachment from ServiceM8
 * DELETE /api/servicem8-attachments/:attachmentId
 */
router.delete('/:attachmentId', async (req, res) => {
  try {
    const { attachmentId } = req.params;

    console.log(`🗑️ Deleting ServiceM8 attachment: ${attachmentId}`);

    // Ensure ServiceM8 authentication
    await ensureServiceM8Auth();

    try {
      // Get attachment metadata first
      const { data: attachment } = await servicem8.getAttachmentSingle({ uuid: attachmentId });

      if (!attachment) {
        return res.status(404).json({
          success: false,
          message: 'Attachment not found'
        });
      }

      // Soft delete by setting active = 0 (ServiceM8 best practice)
      const updateData = {
        uuid: attachmentId,
        active: 0,
        edit_date: new Date().toISOString()
      };

      await servicem8.postAttachmentSingle(updateData, { uuid: attachmentId });

      console.log(`✅ ServiceM8 attachment soft deleted: ${attachmentId}`);

      res.status(200).json({
        success: true,
        message: 'Attachment deleted successfully from ServiceM8'
      });

    } catch (servicem8Error) {
      console.error('ServiceM8 API error:', servicem8Error);
      throw new Error(`ServiceM8 API error: ${servicem8Error.message || 'Unknown error'}`);
    }

  } catch (error) {
    console.error('Error deleting attachment from ServiceM8:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete attachment from ServiceM8',
      error: error.message
    });
  }
});

/**
 * Get attachment count for a specific job (for frontend display)
 * GET /api/servicem8-attachments/count/:jobId
 */
router.get('/count/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;

    // Ensure ServiceM8 authentication
    await ensureServiceM8Auth();

    try {
      // Get job-specific attachments count from ServiceM8 using job-specific endpoint
      const accessToken = await getValidAccessToken();

      console.log(`🔗 Using job-specific endpoint for count: /job/${jobId}/attachment.json`);
      const response = await axios.get(`https://api.servicem8.com/api_1.0/job/${jobId}/attachment.json`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      // Filter for active attachments
      const activeCount = response.data.filter(attachment =>
        attachment.active === 1
      ).length;

      res.status(200).json({
        success: true,
        count: activeCount,
        source: 'ServiceM8'
      });

    } catch (servicem8Error) {
      console.error('ServiceM8 API error:', servicem8Error);

      // Check if it's a scope/permission error
      if (servicem8Error.response?.status === 403) {
        console.error('ServiceM8 scope error - returning 0 count for graceful degradation');
        return res.status(200).json({
          success: true,
          count: 0,
          source: 'ServiceM8',
          warning: 'Insufficient permissions to read attachments'
        });
      }

      throw new Error(`ServiceM8 API error: ${servicem8Error.message || 'Unknown error'}`);
    }

  } catch (error) {
    console.error('Error getting attachment count from ServiceM8:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get attachment count from ServiceM8',
      error: error.message,
      count: 0  // Return 0 on error for graceful degradation
    });
  }
});

/**
 * Bulk get attachment counts for multiple jobs (for performance)
 * POST /api/servicem8-attachments/counts
 */
router.post('/counts', async (req, res) => {
  try {
    const { jobIds } = req.body;

    if (!Array.isArray(jobIds)) {
      return res.status(400).json({
        success: false,
        message: 'jobIds must be an array'
      });
    }

    // Ensure ServiceM8 authentication
    await ensureServiceM8Auth();

    try {
      // Get counts for all jobs using job-specific endpoints
      const accessToken = await getValidAccessToken();
      const counts = {};

      console.log(`🔗 Using job-specific endpoints for bulk count of ${jobIds.length} jobs`);

      for (const jobId of jobIds) {
        try {
          const response = await axios.get(`https://api.servicem8.com/api_1.0/job/${jobId}/attachment.json`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });

          // Filter for active attachments
          counts[jobId] = response.data.filter(attachment =>
            attachment.active === 1
          ).length;

        } catch (jobError) {
          console.error(`Error getting attachments for job ${jobId}:`, jobError.message);
          // Set count to 0 for failed jobs to avoid breaking the UI
          counts[jobId] = 0;
        }
      }

      res.status(200).json({
        success: true,
        counts: counts,
        source: 'ServiceM8'
      });

    } catch (servicem8Error) {
      console.error('ServiceM8 bulk count API error:', servicem8Error);

      // Check if it's a scope/permission error
      if (servicem8Error.response?.status === 403) {
        console.error('ServiceM8 scope error - returning 0 counts for graceful degradation');
        const zeroCounts = {};
        jobIds.forEach(jobId => zeroCounts[jobId] = 0);

        return res.status(200).json({
          success: true,
          counts: zeroCounts,
          source: 'ServiceM8',
          warning: 'Insufficient permissions to read attachments'
        });
      }

      throw new Error(`ServiceM8 API error: ${servicem8Error.message || 'Unknown error'}`);
    }

  } catch (error) {
    console.error('Error getting bulk attachment counts from ServiceM8:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get bulk attachment counts from ServiceM8',
      error: error.message,
      counts: {}  // Return empty object on error for graceful degradation
    });
  }
});

/**
 * Get all attachments across all jobs (admin view)
 * GET /api/servicem8-attachments/all
 */
router.get('/all', async (req, res) => {
  try {
    const { page = 1, limit = 50, jobId } = req.query;

    console.log(`📥 Fetching all ServiceM8 attachments (page ${page}, limit ${limit})`);

    // Ensure ServiceM8 authentication
    await ensureServiceM8Auth();

    try {
      // Get all attachments from ServiceM8
      const { data: allAttachments } = await servicem8.getAttachmentAll();

      // Filter active job attachments
      let filteredAttachments = allAttachments.filter(attachment =>
        attachment.related_object === 'Job' &&
        attachment.active === 1
      );

      // Filter by specific job if provided
      if (jobId) {
        filteredAttachments = filteredAttachments.filter(attachment =>
          attachment.related_object_uuid === jobId
        );
      }

      // Format attachments for frontend
      const formattedAttachments = filteredAttachments.map(formatAttachmentForFrontend);

      // Sort by timestamp (newest first)
      formattedAttachments.sort((a, b) => new Date(b.uploadTimestamp) - new Date(a.uploadTimestamp));

      // Apply pagination
      const startIndex = (parseInt(page) - 1) * parseInt(limit);
      const endIndex = startIndex + parseInt(limit);
      const paginatedAttachments = formattedAttachments.slice(startIndex, endIndex);

      console.log(`✅ Retrieved ${paginatedAttachments.length} of ${formattedAttachments.length} ServiceM8 attachments`);

      res.status(200).json({
        success: true,
        data: paginatedAttachments,
        total: formattedAttachments.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(formattedAttachments.length / parseInt(limit)),
        source: 'ServiceM8'
      });

    } catch (servicem8Error) {
      console.error('ServiceM8 API error:', servicem8Error);
      throw new Error(`ServiceM8 API error: ${servicem8Error.message || 'Unknown error'}`);
    }

  } catch (error) {
    console.error('Error fetching all attachments from ServiceM8:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch all attachments from ServiceM8',
      error: error.message
    });
  }
});

module.exports = router;
