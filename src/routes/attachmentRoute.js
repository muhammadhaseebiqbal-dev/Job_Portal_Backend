const express = require('express');
const multer = require('multer');
const servicem8 = require('@api/servicem8');
const { getTokens } = require('../utils/tokenManager');
const router = express.Router();
require('dotenv').config();

/**
 * ATTACHMENT ROUTES - ServiceM8 Integration
 * 
 * This route handles file attachments using ServiceM8's attachment system directly.
 * Files are uploaded to and retrieved from ServiceM8 instead of Redis.
 * 
 * ServiceM8 Attachment API Methods:
 * - listAttachments() - Get all attachments
 * - getAttachments({uuid}) - Get single attachment
 * - createAttachments({data}) - Create new attachment
 * - deleteAttachments({uuid}) - Delete attachment
 */

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for ServiceM8 compatibility
  }
});

// Token middleware for ServiceM8 authentication
const tokenMiddleware = async (req, res, next) => {
  try {
    const tokens = await getTokens();
    
    if (!tokens || !tokens.access_token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No access token available. Please authenticate first.' 
      });
    }

    // Set the auth for the ServiceM8 API
    servicem8.auth(tokens.access_token);
    req.servicem8 = servicem8;
    next();
  } catch (error) {
    console.error('Token middleware error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to authenticate with ServiceM8. Please try again.'
    });
  }
};

// Apply token middleware to all routes
router.use(tokenMiddleware);

// Helper function to format attachment data for frontend
const formatAttachmentForFrontend = (attachment) => {
  return {
    id: attachment.uuid,
    jobId: attachment.related_object_uuid,
    fileName: attachment.file_name,
    fileSize: attachment.file_size,
    mimeType: attachment.mime_type,
    uploadedBy: attachment.created_by || 'Unknown',
    uploadTimestamp: attachment.date_created,
    active: attachment.active
  };
};

// Upload a file attachment for a specific job
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
    
    // Convert file buffer to Base64 for ServiceM8
    const fileContent = req.file.buffer.toString('base64');
    
    // Create attachment data for ServiceM8
    const attachmentData = {
      active: 1,
      related_object: 'Job',
      related_object_uuid: jobId,
      file_name: req.file.originalname,
      file_size: req.file.size,
      mime_type: req.file.mimetype,
      attachment_data: fileContent,
      created_by: userName || 'Job Portal User'
    };
    
    // Create attachment in ServiceM8
    const response = await servicem8.createAttachments(attachmentData);
    
    if (response.data) {
      const formattedAttachment = formatAttachmentForFrontend(response.data);
      
      res.status(201).json({
        success: true,
        message: 'File uploaded successfully to ServiceM8',
        data: formattedAttachment
      });
    } else {
      throw new Error('No data returned from ServiceM8');
    }
    
  } catch (error) {
    console.error('Error uploading file to ServiceM8:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload file to ServiceM8',
      error: error.message
    });
  }
});

// Get all attachments for a specific job
router.get('/job/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Get all attachments from ServiceM8
    const response = await servicem8.listAttachments();
    
    if (response.data) {
      // Filter attachments by job ID
      const jobAttachments = response.data
        .filter(attachment => 
          attachment.related_object === 'Job' && 
          attachment.related_object_uuid === jobId &&
          attachment.active === 1
        )
        .map(formatAttachmentForFrontend);
      
      res.status(200).json({
        success: true,
        data: jobAttachments
      });
    } else {
      res.status(200).json({
        success: true,
        data: []
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

// Download/get a specific attachment
router.get('/download/:attachmentId', async (req, res) => {
  try {
    const { attachmentId } = req.params;
    
    // Get specific attachment from ServiceM8
    const response = await servicem8.getAttachments({ uuid: attachmentId });
    
    if (response.data) {
      const attachment = response.data;
      
      // Set appropriate headers for file download
      res.setHeader('Content-Type', attachment.mime_type);
      res.setHeader('Content-Disposition', `attachment; filename="${attachment.file_name}"`);
      
      // Convert base64 back to buffer and send
      if (attachment.attachment_data) {
        const fileBuffer = Buffer.from(attachment.attachment_data, 'base64');
        res.send(fileBuffer);
      } else {
        res.status(404).json({
          success: false,
          message: 'Attachment data not found'
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: 'Attachment not found in ServiceM8'
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

// Delete a specific attachment
router.delete('/:attachmentId', async (req, res) => {
  try {
    const { attachmentId } = req.params;
    
    // Delete attachment from ServiceM8
    const response = await servicem8.deleteAttachments({ uuid: attachmentId });
    
    res.status(200).json({
      success: true,
      message: 'Attachment deleted successfully from ServiceM8',
      data: response.data
    });
    
  } catch (error) {
    console.error('Error deleting attachment from ServiceM8:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete attachment from ServiceM8',
      error: error.message
    });
  }
});

// Get all attachments (admin view)
router.get('/all', async (req, res) => {
  try {
    // Get all attachments from ServiceM8
    const response = await servicem8.listAttachments();
    
    if (response.data) {
      const allAttachments = response.data
        .filter(attachment => attachment.active === 1)
        .map(formatAttachmentForFrontend);
      
      res.status(200).json({
        success: true,
        data: allAttachments,
        total: allAttachments.length
      });
    } else {
      res.status(200).json({
        success: true,
        data: [],
        total: 0
      });
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
