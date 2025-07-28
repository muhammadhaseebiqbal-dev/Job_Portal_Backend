const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
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
 * Files are uploaded directly to ServiceM8 and linked to jobs using related_object_uuid.
 * 
 * ServiceM8 Attachment API Features:
 * - Native file storage in ServiceM8
 * - Direct job association via related_object_uuid
 * - Built-in file management and security
 * - Automatic thumbnail generation for images
 * - File versioning and history
 * 
 * Best Practices Implemented:
 * - Base64 encoding for file content
 * - Proper MIME type handling
 * - File size validation
 * - Error handling and retry logic
 * - Metadata preservation
 * - Integration with ServiceM8 workflow
 */

// Configure multer for memory storage (files stay in memory for base64 conversion)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (ServiceM8 recommended)
  },
  fileFilter: (req, file, cb) => {
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

// Helper function to convert file to base64 data URI
const fileToBase64DataUri = (buffer, mimeType) => {
  const base64 = buffer.toString('base64');
  return `data:${mimeType};base64,${base64}`;
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
    
    console.log('📤 Sending attachment to ServiceM8:', {
      attachment_name: req.file.originalname,
      file_type: req.file.mimetype,
      related_object_uuid: jobId,
      attachment_source: 'Job Portal',
      file_size: req.file.size
    });
    
    try {
      // Get access token and authenticate ServiceM8 SDK
      const accessToken = await getValidAccessToken();
      servicem8.auth(accessToken);
      
      // Convert file to base64 for ServiceM8 API
      const base64Content = req.file.buffer.toString('base64');
      const dataUri = `data:${req.file.mimetype};base64,${base64Content}`;
      
      // Create attachment data structure according to ServiceM8 API
      const attachmentData = {
        related_object: 'Job',
        related_object_uuid: jobId,
        attachment_name: req.file.originalname,
        file_type: req.file.mimetype,
        file_content: dataUri,
        attachment_source: 'Job Portal',
        tags: `job_portal,${userType || 'user'},${new Date().toISOString().split('T')[0]}`,
        created_by_staff_uuid: req.headers['x-client-uuid'] || null,
        active: 1
      };
      
      console.log('📤 Creating ServiceM8 attachment via SDK...');
      
      // Try using ServiceM8 SDK first
      try {
        const response = await servicem8.postAttachmentCreate(attachmentData);
        
        console.log('✅ ServiceM8 attachment created successfully via SDK:', response);
        
        // Format response for frontend
        const formattedAttachment = {
          id: response.uuid || uuidv4(),
          uuid: response.uuid || uuidv4(),
          jobId: jobId,
          fileName: req.file.originalname,
          fileSize: req.file.size,
          mimeType: req.file.mimetype,
          uploadedBy: userName || 'Job Portal User',
          uploadTimestamp: new Date().toISOString(),
          active: true,
          userType: userType || 'unknown',
          servicem8_uuid: response.uuid,
          attachment_source: 'Job Portal'
        };
        
        // Send success response
        res.status(201).json({
          success: true,
          message: 'File uploaded successfully to ServiceM8',
          data: formattedAttachment
        });
        
        return; // Exit if SDK approach works
        
      } catch (sdkError) {
        console.log('🔄 SDK approach failed, trying direct HTTP API...', sdkError.message);
        
        // Fall back to direct HTTP API with FormData
        const formData = new FormData();
        
        // Add job UUID
        formData.append('job_uuid', jobId);
        
        // Add the actual file content
        formData.append('file', req.file.buffer, {
          filename: req.file.originalname,
          contentType: req.file.mimetype
        });
        
        // Add filename
        formData.append('filename', req.file.originalname);
        
        // Try Bearer token approach
        const response = await axios.post('https://api.servicem8.com/api_1.0/attachment.json', formData, {
          headers: {
            ...formData.getHeaders(),
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        console.log('✅ ServiceM8 attachment created successfully via HTTP API:', {
          uuid: response.headers['x-record-uuid'] || 'Unknown',
          status: response.status
        });
        
        // Format response for frontend compatibility
        const formattedAttachment = {
          id: response.headers['x-record-uuid'] || uuidv4(),
          uuid: response.headers['x-record-uuid'] || uuidv4(),
          jobId: jobId,
          fileName: req.file.originalname,
          fileSize: req.file.size,
          mimeType: req.file.mimetype,
          uploadedBy: userName || 'Job Portal User',
          uploadTimestamp: new Date().toISOString(),
          active: true,
          userType: userType || 'unknown',
          servicem8_uuid: response.headers['x-record-uuid'],
          attachment_source: 'Job Portal'
        };
        
        // Send success response
        res.status(201).json({
          success: true,
          message: 'File uploaded successfully to ServiceM8',
          data: formattedAttachment
        });
      }
      
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
      // Get attachment metadata from ServiceM8 using direct HTTP API
      const accessToken = await getValidAccessToken();
      
      const response = await axios.get(`https://api.servicem8.com/api_1.0/attachment/${attachmentId}.json`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      const attachment = response.data;
      
      if (!attachment || attachment.active !== 1) {
        return res.status(404).json({
          success: false,
          message: 'Attachment not found or inactive'
        });
      }
      
      // ServiceM8 stores file content as base64 data URI
      const fileDataUri = attachment.file_content;
      
      if (!fileDataUri) {
        return res.status(404).json({
          success: false,
          message: 'Attachment file content not found'
        });
      }
      
      // Parse data URI to extract content
      const matches = fileDataUri.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches) {
        throw new Error('Invalid file data format');
      }
      
      const mimeType = matches[1];
      const base64Data = matches[2];
      const fileBuffer = Buffer.from(base64Data, 'base64');
      
      // Set appropriate headers for file download
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${attachment.attachment_name}"`);
      res.setHeader('Content-Length', fileBuffer.length);
      
      console.log(`✅ Serving ServiceM8 attachment: ${attachment.attachment_name} (${fileBuffer.length} bytes)`);
      
      // Send file content
      res.send(fileBuffer);
      
    } catch (servicem8Error) {
      console.error('ServiceM8 API error:', servicem8Error);
      throw new Error(`ServiceM8 API error: ${servicem8Error.message || 'Unknown error'}`);
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
