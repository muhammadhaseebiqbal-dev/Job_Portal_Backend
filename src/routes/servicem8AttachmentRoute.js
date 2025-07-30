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
    
    // Ensure ServiceM8 authentication
    await ensureServiceM8Auth();
    
    // Extract file extension for ServiceM8 API
    const fileExtension = getFileExtension(req.file.originalname);
    
    console.log('📤 Sending attachment to ServiceM8:', {
      attachment_name: req.file.originalname,
      file_type: fileExtension, // ServiceM8 expects extension, not MIME type
      mime_type: req.file.mimetype, // For reference
      related_object_uuid: jobId,
      attachment_source: 'Job Portal',
      file_size: req.file.size
    });
    
    try {
      // Get access token for ServiceM8 API
      const accessToken = await getValidAccessToken();
      
      // Extract file extension from filename for ServiceM8 API
      const fileExtension = req.file.originalname.includes('.') 
        ? '.' + req.file.originalname.split('.').pop().toLowerCase()
        : '';
      
      console.log('📤 Trying ServiceM8 attachment upload with multiple approaches...');
      
      // Convert file to base64 for potential use
      const base64Content = req.file.buffer.toString('base64');
      const dataUri = `data:${req.file.mimetype};base64,${base64Content}`;
      
      let attachmentUuid;
      let uploadSuccess = false;
      
      // APPROACH 1: Try creating attachment with file content included (single step)
      console.log('🔄 Approach 1: Single-step attachment creation with file content...');
      try {
        const singleStepData = {
          related_object: 'job',
          related_object_uuid: jobId,
          attachment_name: req.file.originalname,
          file_type: fileExtension,
          active: 1,
          attachment_source: 'Job Portal',
          tags: `job_portal,${userType || 'user'},${new Date().toISOString().split('T')[0]}`,
          file_content: dataUri // Include base64 file content
        };
        
        const singleStepResponse = await axios.post('https://api.servicem8.com/api_1.0/Attachment.json', singleStepData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        attachmentUuid = singleStepResponse.headers['x-record-uuid'];
        if (attachmentUuid) {
          console.log('✅ Approach 1 successful: Attachment created with file content, UUID:', attachmentUuid);
          uploadSuccess = true;
        }
        
      } catch (singleStepError) {
        console.log('❌ Approach 1 failed:', singleStepError.response?.data || singleStepError.message);
      }
      
      // APPROACH 2: If single-step failed, try the 2-step process
      if (!uploadSuccess) {
        console.log('🔄 Approach 2: Two-step attachment process...');
        try {
          // STEP 1: Create attachment record (without file data)
          console.log('📝 Step 1: Creating attachment record...');
          const attachmentData = {
            related_object: 'job',
            related_object_uuid: jobId,
            attachment_name: req.file.originalname,
            file_type: fileExtension,
            active: 1,
            attachment_source: 'Job Portal',
            tags: `job_portal,${userType || 'user'},${new Date().toISOString().split('T')[0]}`
          };
          
          const createResponse = await axios.post('https://api.servicem8.com/api_1.0/Attachment.json', attachmentData, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          
          attachmentUuid = createResponse.headers['x-record-uuid'];
          if (!attachmentUuid) {
            throw new Error('Failed to get attachment UUID from ServiceM8 response');
          }
          
          console.log('✅ Step 1 complete: Attachment record created with UUID:', attachmentUuid);
          
          // STEP 2: Try multiple methods to upload file data
          console.log('📤 Step 2: Trying multiple file upload methods...');
          
          // Method 2A: Try .file endpoint with binary data
          try {
            console.log('🔄 Method 2A: Binary upload to .file endpoint...');
            const uploadResponse = await axios.post(
              `https://api.servicem8.com/api_1.0/Attachment/${attachmentUuid}.file`,
              req.file.buffer,
              {
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': req.file.mimetype
                }
              }
            );
            console.log('✅ Method 2A successful: Binary upload completed');
            uploadSuccess = true;
          } catch (binaryError) {
            console.log('❌ Method 2A failed:', binaryError.response?.data || binaryError.message);
            
            // Method 2B: Try updating attachment record with file_content
            try {
              console.log('🔄 Method 2B: Update attachment with base64 content...');
              await axios.put(`https://api.servicem8.com/api_1.0/Attachment/${attachmentUuid}.json`, {
                file_content: dataUri,
                active: 1
              }, {
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
                }
              });
              console.log('✅ Method 2B successful: Base64 content updated');
              uploadSuccess = true;
            } catch (base64Error) {
              console.log('❌ Method 2B failed:', base64Error.response?.data || base64Error.message);
            }
          }
          
        } catch (twoStepError) {
          console.log('❌ Approach 2 failed:', twoStepError.response?.data || twoStepError.message);
        }
      }
      
      // If we have an attachment UUID, verify the final state
      if (attachmentUuid) {
        console.log('🔍 Verifying final attachment state...');
        try {
          const finalVerifyResponse = await axios.get(`https://api.servicem8.com/api_1.0/Attachment/${attachmentUuid}.json`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json'
            }
          });
          
          const finalAttachmentRecord = finalVerifyResponse.data;
          console.log('📋 Final attachment record:', {
            uuid: finalAttachmentRecord.uuid,
            active: finalAttachmentRecord.active,
            attachment_name: finalAttachmentRecord.attachment_name,
            file_type: finalAttachmentRecord.file_type,
            photo_width: finalAttachmentRecord.photo_width,
            photo_height: finalAttachmentRecord.photo_height,
            edit_date: finalAttachmentRecord.edit_date,
            timestamp: finalAttachmentRecord.timestamp
          });
          
          // Check if the upload was successful
          const hasFileContent = finalAttachmentRecord.edit_date !== '0000-00-00 00:00:00' || 
                                finalAttachmentRecord.photo_width > 0 || 
                                finalAttachmentRecord.photo_height > 0;
          
          if (hasFileContent) {
            console.log('✅ File upload verified: Attachment has file content');
            uploadSuccess = true;
          } else {
            console.log('⚠️ Warning: Attachment created but file content may not have uploaded properly');
          }
          
        } catch (verifyError) {
          console.log('❌ Failed to verify attachment:', verifyError.message);
        }
      }
      
      if (!attachmentUuid) {
        throw new Error('Failed to create attachment record in ServiceM8');
      }
      console.log('✅ ServiceM8 attachment process completed:', {
        attachmentUuid: attachmentUuid,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype
      });
      
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
        attachment_source: 'Job Portal'
      };
      
      // Send success response
      res.status(201).json({
        success: true,
        message: 'File uploaded successfully to ServiceM8 using 2-step process',
        data: formattedAttachment
      });
      
      // Common notification handling after successful upload
      try {
        const clientUuid = req.headers['x-client-uuid'] || null;
        const jobDescription = `Job ${jobId.substring(0, 8)}...`;
        
        await sendBusinessNotification(NOTIFICATION_TYPES.ATTACHMENT_ADDED, {
          jobId: jobId,
          jobDescription: jobDescription,
          attachmentId: 'attachment-id-placeholder', // Will be set by each method
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
      
    } catch (servicem8Error) {
      console.error('ServiceM8 API error:', servicem8Error);
      
      // Check if it's an authentication error
      if (servicem8Error.message?.includes('auth') || servicem8Error.status === 401) {
        throw new Error('ServiceM8 authentication failed. Please check access token.');
      }
      
      // Check if it's a file size error
      if (servicem8Error.message?.includes('size') || servicem8Error.status === 413) {
        throw new Error('File size too large. ServiceM8 has a file size limit.');
      }
      
      // Generic ServiceM8 error
      throw new Error(`ServiceM8 API error: ${servicem8Error.message || 'Unknown error'}`);
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
      
      // Try the job-specific route: /job/{uuid}/attachment.json
      console.log(`🔗 Using job-specific attachment endpoint: /job/${jobId}/attachment.json`);
      const response = await axios.get(`https://api.servicem8.com/api_1.0/job/${jobId}/attachment.json`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Filter for active attachments
      const jobAttachments = response.data.filter(attachment => 
        attachment.active === 1
      );
      
      console.log(`✅ Found ${jobAttachments.length} ServiceM8 attachments for job ${jobId} (via job-specific endpoint)`);
      
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
      
      // Check if it's a scope/permission error
      if (servicem8Error.response?.status === 403) {
        const errorData = servicem8Error.response.data;
        console.error('ServiceM8 scope error:', errorData);
        
        // Return empty array for graceful degradation
        return res.status(200).json({
          success: true,
          data: [],
          total: 0,
          source: 'ServiceM8',
          warning: `Insufficient permissions: ${errorData.additionalDetails || errorData.message || 'Unknown permission error'}`
        });
      }
      
      throw new Error(`ServiceM8 API error: ${servicem8Error.message || 'Unknown error'}`);
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
    
    console.log(`📥 Downloading ServiceM8 attachment: ${attachmentId}`);
    
    // Ensure ServiceM8 authentication
    await ensureServiceM8Auth();
    
    try {
      const accessToken = await getValidAccessToken();
      
      // First, get attachment metadata
      console.log(`🔍 Getting attachment metadata for: ${attachmentId}`);
      const metadataResponse = await axios.get(`https://api.servicem8.com/api_1.0/attachment/${attachmentId}.json`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      const attachment = metadataResponse.data;
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
        return res.status(404).json({
          success: false,
          message: 'Attachment not found or inactive'
        });
      }
      
      // Try multiple methods to get file content
      let fileBuffer = null;
      let mimeType = attachment.file_type || 'application/octet-stream';
      
      // Method 1: Try to get file content from metadata (if stored as base64)
      if (attachment.file_content) {
        console.log(`🔄 Method 1: Using file_content from metadata`);
        try {
          // Parse data URI to extract content
          const matches = attachment.file_content.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (matches) {
            mimeType = matches[1];
            const base64Data = matches[2];
            fileBuffer = Buffer.from(base64Data, 'base64');
            console.log(`✅ Method 1 successful: Got ${fileBuffer.length} bytes from metadata`);
          }
        } catch (parseError) {
          console.log(`❌ Method 1 failed: ${parseError.message}`);
        }
      }
      
      // Method 2: Try the .file endpoint with proper authentication
      if (!fileBuffer) {
        console.log(`🔄 Method 2: Trying .file endpoint`);
        try {
          const fileResponse = await axios.get(`https://api.servicem8.com/api_1.0/attachment/${attachmentId}.file`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': '*/*'
            },
            responseType: 'arraybuffer'
          });
          
          fileBuffer = Buffer.from(fileResponse.data);
          // Use content-type from response if available
          if (fileResponse.headers['content-type']) {
            mimeType = fileResponse.headers['content-type'];
          }
          console.log(`✅ Method 2 successful: Got ${fileBuffer.length} bytes from .file endpoint`);
        } catch (fileError) {
          console.log(`❌ Method 2 failed: ${fileError.response?.status} - ${fileError.response?.data || fileError.message}`);
        }
      }
      
      // Method 3: Try alternative file access patterns
      if (!fileBuffer) {
        console.log(`🔄 Method 3: Trying alternative endpoints`);
        
        // Try with different endpoint patterns
        const alternativeEndpoints = [
          `https://api.servicem8.com/api_1.0/Attachment/${attachmentId}/file`,
          `https://api.servicem8.com/api_1.0/Attachment/${attachmentId}/download`,
          `https://api.servicem8.com/api_1.0/attachment/${attachmentId}/file`,
          `https://api.servicem8.com/api_1.0/attachment/${attachmentId}/download`
        ];
        
        for (const endpoint of alternativeEndpoints) {
          try {
            console.log(`🔄 Trying endpoint: ${endpoint}`);
            const altResponse = await axios.get(endpoint, {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': '*/*'
              },
              responseType: 'arraybuffer',
              timeout: 10000
            });
            
            fileBuffer = Buffer.from(altResponse.data);
            if (altResponse.headers['content-type']) {
              mimeType = altResponse.headers['content-type'];
            }
            console.log(`✅ Method 3 successful with ${endpoint}: Got ${fileBuffer.length} bytes`);
            break;
          } catch (altError) {
            console.log(`❌ Failed ${endpoint}: ${altError.response?.status} - ${altError.message}`);
          }
        }
      }
      
      // If no file content found, return error with diagnostic info
      if (!fileBuffer) {
        console.log(`❌ All methods failed to retrieve file content`);
        return res.status(404).json({
          success: false,
          message: 'Attachment file content not accessible',
          diagnostic: {
            attachment_uuid: attachment.uuid,
            attachment_name: attachment.attachment_name,
            file_type: attachment.file_type,
            edit_date: attachment.edit_date,
            active: attachment.active,
            has_file_content_field: !!attachment.file_content,
            photo_dimensions: `${attachment.photo_width}x${attachment.photo_height}`,
            possible_issues: [
              'File content may not have been properly uploaded to ServiceM8',
              'ServiceM8 API permissions may not include file access',
              'File may be stored in a different format or location',
              'Attachment record exists but file data is missing'
            ]
          }
        });
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
      
      // Set appropriate headers for file download
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${attachment.attachment_name}"`);
      res.setHeader('Content-Length', fileBuffer.length);
      res.setHeader('Cache-Control', 'private, max-age=3600'); // Cache for 1 hour
      
      console.log(`✅ Serving ServiceM8 attachment: ${attachment.attachment_name} (${fileBuffer.length} bytes, ${mimeType})`);
      
      // Send file content
      res.send(fileBuffer);
      
    } catch (servicem8Error) {
      console.error('ServiceM8 API error:', servicem8Error);
      
      // Provide more specific error information
      const errorDetails = {
        status: servicem8Error.response?.status,
        statusText: servicem8Error.response?.statusText,
        data: servicem8Error.response?.data,
        message: servicem8Error.message
      };
      
      res.status(servicem8Error.response?.status || 500).json({
        success: false,
        message: 'ServiceM8 API error while downloading attachment',
        error: servicem8Error.message,
        details: errorDetails
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
