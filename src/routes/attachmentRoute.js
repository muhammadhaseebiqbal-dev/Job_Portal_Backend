const express = require('express');
const multer = require('multer');
const { Redis } = require('@upstash/redis');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
require('dotenv').config();

// Initialize Redis client using environment variables from Upstash integration
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

// Configure multer for memory storage (files will be stored in memory as Buffer objects)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 9.5 * 1024 * 1024, // 9.5MB limit to ensure we stay under Upstash's 10MB limit
  }
});

// Helper function to format timestamp
const formatTimestamp = () => {
  const now = new Date();
  return now.toISOString();
};

// Helper to get MIME types from file extension
const getMimeType = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  const mimeTypes = {
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'zip': 'application/zip',
    'txt': 'text/plain',
  };
  
  return mimeTypes[extension] || 'application/octet-stream';
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
    const attachmentId = uuidv4();
    
    // Create attachment object
    const attachment = {
      id: attachmentId,
      jobId,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype || getMimeType(req.file.originalname),
      uploadedBy: userName || 'Unknown User',
      userType: userType || 'client', // Default to 'client' if not specified
      uploadTimestamp: formatTimestamp(),
      contentType: req.file.mimetype
    };
    
    // Convert file buffer to Base64 for storage in Redis
    const fileContent = req.file.buffer.toString('base64');
    
    // Store file in Redis
    const fileKey = `attachment:file:${attachmentId}`;
    await redis.set(fileKey, fileContent);
    
    // Set expiration for file (1 year)
    await redis.expire(fileKey, 60 * 60 * 24 * 365);
    
    // Store attachment metadata in Redis
    const metadataKey = `attachment:metadata:${attachmentId}`;
    await redis.set(metadataKey, JSON.stringify(attachment));
    
    // Set expiration for metadata (1 year)
    await redis.expire(metadataKey, 60 * 60 * 24 * 365);
    
    // Add attachment ID to job's attachments list
    const jobAttachmentsKey = `job:attachments:${jobId}`;
    await redis.lpush(jobAttachmentsKey, attachmentId);
    
    // Set expiration for job attachments list (1 year)
    await redis.expire(jobAttachmentsKey, 60 * 60 * 24 * 365);
    
    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        ...attachment,
        fileContent: undefined // Don't send the file content back
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload file',
      error: error.message
    });
  }
});

// Get all attachments for a specific job
router.get('/job/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    
    // Get attachment IDs for the job
    const jobAttachmentsKey = `job:attachments:${jobId}`;
    const attachmentIds = await redis.lrange(jobAttachmentsKey, 0, -1);
    
    if (!attachmentIds || attachmentIds.length === 0) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }
    
    // Get metadata for each attachment
    const attachments = [];
    for (const attachmentId of attachmentIds) {      const metadataKey = `attachment:metadata:${attachmentId}`;
      const attachmentJson = await redis.get(metadataKey);
      
      if (attachmentJson) {
        // Check if attachmentJson is already an object or a string that needs parsing
        let attachment;
        if (typeof attachmentJson === 'object' && attachmentJson !== null) {
          attachment = attachmentJson;
        } else {
          try {
            attachment = JSON.parse(attachmentJson);
          } catch (parseError) {
            console.error('Error parsing attachment JSON:', parseError);
            // Skip this attachment if it can't be parsed
            continue;
          }
        }
        attachments.push(attachment);
      }
    }
    
    res.status(200).json({
      success: true,
      data: attachments
    });
  } catch (error) {
    console.error('Error fetching attachments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attachments',
      error: error.message
    });
  }
});

// Download a specific attachment
router.get('/download/:attachmentId', async (req, res) => {
  try {
    const { attachmentId } = req.params;
    
    // Get attachment metadata
    const metadataKey = `attachment:metadata:${attachmentId}`;
    const attachmentJson = await redis.get(metadataKey);
    
    if (!attachmentJson) {
      return res.status(404).json({
        success: false,
        message: 'Attachment not found'
      });
    }
    
    // Check if attachmentJson is already an object or a string that needs parsing
    let attachment;
    if (typeof attachmentJson === 'object' && attachmentJson !== null) {
      attachment = attachmentJson;
    } else {
      try {
        attachment = JSON.parse(attachmentJson);
      } catch (parseError) {
        console.error('Error parsing attachment JSON:', parseError);
        return res.status(500).json({
          success: false,
          message: 'Failed to parse attachment metadata'
        });
      }
    }
    
    // Get file content
    const fileKey = `attachment:file:${attachmentId}`;
    const fileContent = await redis.get(fileKey);
    
    if (!fileContent) {
      return res.status(404).json({
        success: false,
        message: 'Attachment file content not found'
      });
    }
    
    // Convert Base64 back to Buffer
    const fileBuffer = Buffer.from(fileContent, 'base64');
    
    // Set appropriate headers
    res.setHeader('Content-Type', attachment.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(attachment.fileName)}`);
    res.setHeader('Content-Length', fileBuffer.length);
    
    // Send the file
    res.send(fileBuffer);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download file',
      error: error.message
    });
  }
});

// Delete an attachment
router.delete('/:attachmentId', async (req, res) => {
  try {
    const { attachmentId } = req.params;
      // Get attachment metadata
    const metadataKey = `attachment:metadata:${attachmentId}`;
    const attachmentJson = await redis.get(metadataKey);
    
    if (!attachmentJson) {
      return res.status(404).json({
        success: false,
        message: 'Attachment not found'
      });
    }
    
    // Check if attachmentJson is already an object or a string that needs parsing
    let attachment;
    if (typeof attachmentJson === 'object' && attachmentJson !== null) {
      attachment = attachmentJson;
    } else {
      try {
        attachment = JSON.parse(attachmentJson);
      } catch (parseError) {
        console.error('Error parsing attachment JSON:', parseError);
        return res.status(500).json({
          success: false,
          message: 'Failed to parse attachment metadata'
        });
      }
    }
    const { jobId } = attachment;
    
    // Delete file content
    const fileKey = `attachment:file:${attachmentId}`;
    await redis.del(fileKey);
    
    // Delete metadata
    await redis.del(metadataKey);
    
    // Remove from job's attachments list
    const jobAttachmentsKey = `job:attachments:${jobId}`;
    await redis.lrem(jobAttachmentsKey, 0, attachmentId);
    
    res.status(200).json({
      success: true,
      message: 'Attachment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting attachment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete attachment',
      error: error.message
    });
  }
});

module.exports = router;
