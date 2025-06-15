const express = require('express');
const { Redis } = require('@upstash/redis');
const { v4: uuidv4 } = require('uuid');
const { sendBusinessNotification, NOTIFICATION_TYPES } = require('../utils/businessNotifications');
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');
const router = express.Router();
require('dotenv').config();

// Initialize Redis client using environment variables from Upstash integration
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

// Middleware to ensure a valid token for ServiceM8 API
const ensureValidToken = async (req, res, next) => {
    try {
        const accessToken = await getValidAccessToken();
        req.accessToken = accessToken;
        servicem8.auth(accessToken);
        next();
    } catch (error) {
        console.error('Token validation error:', error);
        return res.status(401).json({
            error: true,
            message: 'Failed to authenticate with ServiceM8. Please try again.'
        });
    }
};

// Apply the token middleware to routes that need job data
const jobRoutes = ['/messages'];

// Helper function to format timestamp
const formatTimestamp = () => {
    const now = new Date();
    return now.toISOString();
};

// Get chat messages for a specific job
router.get('/messages/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params;
        const { limit = 100, offset = 0 } = req.query;
        
        console.log(`Fetching chat messages for job: ${jobId}`);
        
        // Get messages from Redis
        const chatKey = `chat:messages:${jobId}`;
        const messages = await redis.lrange(chatKey, offset, parseInt(offset) + parseInt(limit) - 1);
        
        // Parse messages to handle JSON strings
        const parsedMessages = messages.map(msg => typeof msg === 'string' ? JSON.parse(msg) : msg);
        
        res.status(200).json({
            success: true,
            data: parsedMessages,
            total: await redis.llen(chatKey)
        });
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch chat messages',
            error: error.message
        });
    }
});

// Send a new chat message
router.post('/messages', ensureValidToken, async (req, res) => {
    try {
        const { jobId, sender, senderType, message } = req.body;
        
        // Validate required fields
        if (!jobId || !sender || !senderType || !message) {
            return res.status(400).json({
                success: false,
                message: 'Job ID, sender, sender type, and message are required fields'
            });
        }
        
        // Create message object
        const chatMessage = {
            id: uuidv4(),
            jobId,
            sender,
            senderType, // 'client' or 'admin'
            message,
            timestamp: formatTimestamp(),
            isRead: false
        };
        
        // Store message in Redis list
        const chatKey = `chat:messages:${jobId}`;
        await redis.lpush(chatKey, JSON.stringify(chatMessage));
        
        // Set expiration for messages (optional, keeping messages for 180 days)
        await redis.expire(chatKey, 60 * 60 * 24 * 180);
        
        // Update unread counts for the other party
        const recipientType = senderType === 'client' ? 'admin' : 'client';
        const unreadKey = `chat:unread:${jobId}:${recipientType}`;
        await redis.incr(unreadKey);

        // Send notification about the new chat message
        try {
            // Get job details for the notification
            const jobResult = await servicem8.getJobSingle({ uuid: jobId });
            const jobData = jobResult.data;
            
            // Prepare notification data
            const notificationData = {
                jobId: jobId,
                jobDescription: jobData.job_description || jobData.description || 'Job',
                clientUuid: jobData.company_uuid,
                sender: sender,
                senderType: senderType,
                messagePreview: message.substring(0, 50) + (message.length > 50 ? '...' : '')
            };

            // Send in-app notification to the recipient (opposite party)
            await sendBusinessNotification(NOTIFICATION_TYPES.CHAT_MESSAGE, notificationData);
            console.log('✅ Chat message notification sent successfully');
        } catch (notificationError) {
            console.error('⚠️ Failed to send chat message notification:', notificationError);
            // Don't fail the message sending if notification fails
        }
        
        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: chatMessage
        });
    } catch (error) {
        console.error('Error sending chat message:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send chat message',
            error: error.message
        });
    }
});

// Mark messages as read for a job
router.post('/messages/read', async (req, res) => {
    try {
        const { jobId, userType } = req.body;
        
        if (!jobId || !userType) {
            return res.status(400).json({
                success: false,
                message: 'Job ID and user type are required'
            });
        }
        
        // Reset unread counter
        const unreadKey = `chat:unread:${jobId}:${userType}`;
        await redis.set(unreadKey, 0);
        
        res.status(200).json({
            success: true,
            message: 'Messages marked as read'
        });
    } catch (error) {
        console.error('Error marking messages as read:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark messages as read',
            error: error.message
        });
    }
});

// Get unread message count for a job
router.get('/unread/:jobId/:userType', async (req, res) => {
    try {
        const { jobId, userType } = req.params;
        
        // Get unread count
        const unreadKey = `chat:unread:${jobId}:${userType}`;
        const unreadCount = await redis.get(unreadKey) || 0;
        
        res.status(200).json({
            success: true,
            data: { 
                jobId,
                userType,
                unreadCount: parseInt(unreadCount)
            }
        });
    } catch (error) {
        console.error('Error fetching unread count:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch unread message count',
            error: error.message
        });
    }
});

// Get all job IDs with unread messages for a specific user type
router.get('/unread-jobs/:userType', async (req, res) => {
    try {
        const { userType } = req.params;
        
        // Get all keys matching pattern
        const keys = await redis.keys(`chat:unread:*:${userType}`);
        
        // Get unread counts for all jobs
        const unreadJobs = [];
        
        for (const key of keys) {
            const count = await redis.get(key) || 0;
            
            if (parseInt(count) > 0) {
                // Extract jobId from key
                const jobId = key.split(':')[2];
                
                unreadJobs.push({
                    jobId,
                    unreadCount: parseInt(count)
                });
            }
        }
        
        res.status(200).json({
            success: true,
            data: unreadJobs
        });
    } catch (error) {
        console.error('Error fetching unread jobs:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch jobs with unread messages',
            error: error.message
        });
    }
});

module.exports = router;
