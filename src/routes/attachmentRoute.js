const express = require('express');
const multer = require('multer');
const { Redis } = require('@upstash/redis');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { sendBusinessNotification, NOTIFICATION_TYPES } = require('../utils/businessNotifications');
const router = express.Router();
require('dotenv').config();

/**
 * ATTACHMENT ROUTES - Upstash Redis Integration
 * 
 * This route handles file attachments using Upstash Redis for storage.
 * Files are uploaded to and retrieved from Upstash Redis instead of ServiceM8.
 * 
 * File Storage Structure in Redis:
 * - attachment:{attachmentId} - Main attachment metadata
 * - attachment:{attachmentId}:file - File binary data (base64)
 * - job:{jobId}:attachments - Set of attachment IDs for a job
 * - attachment:all - Set of all attachment IDs (for admin view)
 */

// Initialize Upstash Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Helper function to generate attachment ID
const generateAttachmentId = () => {
  return uuidv4();
};

// Helper function to format attachment data for frontend
const formatAttachmentForFrontend = (attachment, includeFileData = false) => {
  const formatted = {
    id: attachment.id,
    jobId: attachment.jobId,
    fileName: attachment.fileName,
    fileSize: attachment.fileSize,
    mimeType: attachment.mimeType,
    uploadedBy: attachment.uploadedBy,
    uploadTimestamp: attachment.uploadTimestamp,
    active: attachment.active
  };

  if (includeFileData && attachment.fileData) {
    formatted.fileData = attachment.fileData;
  }

  return formatted;
};

// Helper function to validate attachment exists
const getAttachmentMetadata = async (attachmentId) => {
  try {
    const metadata = await redis.get(`attachment:${attachmentId}`);
    if (!metadata) return null;
    
    // Handle both string and object responses from Redis
    if (typeof metadata === 'string') {
      return JSON.parse(metadata);
    } else if (typeof metadata === 'object') {
      return metadata;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting attachment metadata:', error);
    return null;
  }
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
    
    // Generate unique attachment ID
    const attachmentId = generateAttachmentId();
    
    // Convert file buffer to Base64 for storage
    const fileContent = req.file.buffer.toString('base64');
    
    // Create attachment metadata
    const attachmentData = {
      id: attachmentId,
      jobId: jobId,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      uploadedBy: userName || 'Job Portal User',
      uploadTimestamp: new Date().toISOString(),
      active: true,
      userType: userType || 'unknown'
    };

    try {
      // Store attachment metadata in Redis
      await redis.set(`attachment:${attachmentId}`, JSON.stringify(attachmentData));
      
      // Store file content separately (for large files)
      await redis.set(`attachment:${attachmentId}:file`, fileContent);
      
      // Add attachment ID to job's attachment list
      await redis.sadd(`job:${jobId}:attachments`, attachmentId);
      
      // Add to global attachments list (for admin view)
      await redis.sadd('attachment:all', attachmentId);

      const formattedAttachment = formatAttachmentForFrontend(attachmentData);
        // Send business workflow notification for attachment added
      try {
        await sendBusinessNotification(NOTIFICATION_TYPES.ATTACHMENT_ADDED, {
          jobId: jobId,
          attachmentId: attachmentId,
          fileName: req.file.originalname,
          fileSize: req.file.size,
          client: userType === 'client' ? `Client ${jobId}` : 'Admin User',
          timestamp: new Date().toISOString()
        });
      } catch (notificationError) {
        console.error('Error sending attachment notification:', notificationError);
        // Don't fail the upload if notification fails
      }
      
      res.status(201).json({
        success: true,
        message: 'File uploaded successfully to Upstash',
        data: formattedAttachment
      });
      
    } catch (redisError) {
      console.error('Redis storage error:', redisError);
      throw new Error('Failed to store file in Redis');
    }
    
  } catch (error) {
    console.error('Error uploading file to Upstash:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload file to Upstash',
      error: error.message
    });
  }
});

// Get all attachments for a specific job
router.get('/job/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Get attachment IDs for this job
    const attachmentIds = await redis.smembers(`job:${jobId}:attachments`);
    
    if (!attachmentIds || attachmentIds.length === 0) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }

    // Get metadata for each attachment
    const attachments = [];
    for (const attachmentId of attachmentIds) {
      const metadata = await getAttachmentMetadata(attachmentId);
      if (metadata && metadata.active) {
        attachments.push(formatAttachmentForFrontend(metadata));
      }
    }
    
    // Sort by upload timestamp (newest first)
    attachments.sort((a, b) => new Date(b.uploadTimestamp) - new Date(a.uploadTimestamp));
    
    res.status(200).json({
      success: true,
      data: attachments
    });
    
  } catch (error) {
    console.error('Error fetching attachments from Upstash:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attachments from Upstash',
      error: error.message
    });
  }
});

// Download/get a specific attachment
router.get('/download/:attachmentId', async (req, res) => {
  try {
    const { attachmentId } = req.params;
    
    // Get attachment metadata
    const metadata = await getAttachmentMetadata(attachmentId);
    
    if (!metadata || !metadata.active) {
      return res.status(404).json({
        success: false,
        message: 'Attachment not found'
      });
    }

    // Get file content
    const fileContent = await redis.get(`attachment:${attachmentId}:file`);
    
    if (!fileContent) {
      return res.status(404).json({
        success: false,
        message: 'Attachment file data not found'
      });
    }
    
    // Set appropriate headers for file download
    res.setHeader('Content-Type', metadata.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${metadata.fileName}"`);
    res.setHeader('Content-Length', metadata.fileSize);
    
    // Convert base64 back to buffer and send
    const fileBuffer = Buffer.from(fileContent, 'base64');
    res.send(fileBuffer);
    
  } catch (error) {
    console.error('Error downloading attachment from Upstash:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download attachment from Upstash',
      error: error.message
    });
  }
});

// Delete a specific attachment
router.delete('/:attachmentId', async (req, res) => {
  try {
    const { attachmentId } = req.params;
    
    // Get attachment metadata first
    const metadata = await getAttachmentMetadata(attachmentId);
    
    if (!metadata) {
      return res.status(404).json({
        success: false,
        message: 'Attachment not found'
      });
    }

    try {
      // Mark as inactive instead of deleting (soft delete)
      const updatedMetadata = { ...metadata, active: false };
      await redis.set(`attachment:${attachmentId}`, JSON.stringify(updatedMetadata));
      
      // Optionally, remove from job attachment list (hard delete from lists)
      await redis.srem(`job:${metadata.jobId}:attachments`, attachmentId);
      await redis.srem('attachment:all', attachmentId);
      
      // Optionally, delete file content to save space
      await redis.del(`attachment:${attachmentId}:file`);
      
      res.status(200).json({
        success: true,
        message: 'Attachment deleted successfully from Upstash'
      });
      
    } catch (redisError) {
      console.error('Redis deletion error:', redisError);
      throw new Error('Failed to delete from Redis');
    }
    
  } catch (error) {
    console.error('Error deleting attachment from Upstash:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete attachment from Upstash',
      error: error.message
    });
  }
});

// Get all attachments (admin view)
router.get('/all', async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    
    // Get all attachment IDs
    const attachmentIds = await redis.smembers('attachment:all');
    
    if (!attachmentIds || attachmentIds.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        total: 0,
        page: parseInt(page),
        limit: parseInt(limit)
      });
    }

    // Get metadata for each attachment
    const attachments = [];
    for (const attachmentId of attachmentIds) {
      const metadata = await getAttachmentMetadata(attachmentId);
      if (metadata && metadata.active) {
        attachments.push(formatAttachmentForFrontend(metadata));
      }
    }
    
    // Sort by upload timestamp (newest first)
    attachments.sort((a, b) => new Date(b.uploadTimestamp) - new Date(a.uploadTimestamp));
    
    // Apply pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedAttachments = attachments.slice(startIndex, endIndex);
    
    res.status(200).json({
      success: true,
      data: paginatedAttachments,
      total: attachments.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(attachments.length / parseInt(limit))
    });
    
  } catch (error) {
    console.error('Error fetching all attachments from Upstash:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch all attachments from Upstash',
      error: error.message
    });
  }
});

// Get attachment count for a specific job (for frontend display)
router.get('/count/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Get attachment IDs for this job
    const attachmentIds = await redis.smembers(`job:${jobId}:attachments`);
    
    // Count only active attachments
    let activeCount = 0;
    for (const attachmentId of attachmentIds || []) {
      const metadata = await getAttachmentMetadata(attachmentId);
      if (metadata && metadata.active) {
        activeCount++;
      }
    }
    
    res.status(200).json({
      success: true,
      count: activeCount
    });
    
  } catch (error) {
    console.error('Error getting attachment count from Upstash:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get attachment count from Upstash',
      error: error.message
    });
  }
});

// Bulk get attachment counts for multiple jobs (for performance)
router.post('/counts', async (req, res) => {
  try {
    const { jobIds } = req.body;
    
    if (!Array.isArray(jobIds)) {
      return res.status(400).json({
        success: false,
        message: 'jobIds must be an array'
      });
    }

    const counts = {};
    
    for (const jobId of jobIds) {
      const attachmentIds = await redis.smembers(`job:${jobId}:attachments`);
      
      // Count only active attachments
      let activeCount = 0;
      for (const attachmentId of attachmentIds || []) {
        const metadata = await getAttachmentMetadata(attachmentId);
        if (metadata && metadata.active) {
          activeCount++;
        }
      }
      
      counts[jobId] = activeCount;
    }
    
    res.status(200).json({
      success: true,
      counts: counts
    });
    
  } catch (error) {
    console.error('Error getting bulk attachment counts from Upstash:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get bulk attachment counts from Upstash',
      error: error.message
    });
  }
});

module.exports = router;
