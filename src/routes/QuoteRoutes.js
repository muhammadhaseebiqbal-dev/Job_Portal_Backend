const express = require('express');
const router = express.Router();
const { getValidAccessToken } = require('../utils/tokenManager');
const { getUserEmails } = require('../utils/userEmailManager');
const axios = require('axios');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { Redis } = require('@upstash/redis');

// Initialize Redis client - use environment variables set in .env
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || 'https://your-upstash-redis-url.com',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';
const QUOTES_KEY = 'quotes_data'; // Redis key for storing quotes

// Helper function to get portal URL
const getPortalUrl = () => {
    return process.env.PORTAL_URL || 'http://localhost:3000';
};

// Helper function to read quotes data
const readQuotesData = async () => {
    try {
        // Try to get quotes from Redis
        const quotesData = await redis.get(QUOTES_KEY);
        
        // If no data exists yet, return empty array
        if (!quotesData) {
            return [];
        }
        
        return quotesData;
    } catch (error) {
        console.error('Error reading quotes data from Redis:', error);
        return [];
    }
};

// Helper function to write quotes data
const writeQuotesData = async (data) => {
    try {
        // Store quotes in Redis
        await redis.set(QUOTES_KEY, data);
        return true;
    } catch (error) {
        console.error('Error writing quotes data to Redis:', error);
        return false;
    }
};

// Helper function to send notification for quote events
const sendQuoteNotification = async (type, quoteData, userId) => {
    try {        // Check if notifications for this type are enabled
        let notificationSettings;
        try {
            const settingsResponse = await axios.get(`${API_BASE_URL}/api/notifications/settings`);
            notificationSettings = settingsResponse.data;
            
            console.log('Fetched notification settings:', JSON.stringify(notificationSettings, null, 2));
            console.log(`Checking notification type '${type}':`, notificationSettings.types[type]);
            console.log('Email channel enabled:', notificationSettings.channels.email);
            
            // Early return if email notifications are disabled globally or for this type
            if (!notificationSettings.channels.email || !notificationSettings.types[type]) {
                console.log(`Email notifications are disabled for type '${type}' or globally. Skipping notification.`);
                console.log(`- Email channel enabled: ${notificationSettings.channels.email}`);
                console.log(`- Type '${type}' enabled: ${notificationSettings.types[type]}`);
                return false;
            }
        } catch (error) {
            console.error('Error fetching notification settings:', error.message);
            // Default to not sending if we can't verify settings
            return false;
        }
        
        // Get user's primary email
        const userEmailData = await getUserEmails(userId || 'admin-user');
        if (!userEmailData || !userEmailData.primaryEmail) {
            console.log(`No primary email found for user ${userId || 'admin-user'}, skipping notification`);
            return false;
        }

        // Format date
        let formattedDate = '';
        if (quoteData.createdAt) {
            const date = new Date(quoteData.createdAt);
            formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        // Prepare data for email template
        const notificationData = {
            quoteId: quoteData.id,
            jobId: quoteData.jobId,
            jobDescription: quoteData.description || quoteData.title,
            description: quoteData.description,
            client: quoteData.clientName,
            status: quoteData.status,
            oldStatus: quoteData.oldStatus || '',
            newStatus: quoteData.newStatus || '',
            date: formattedDate,
            amount: quoteData.price,
            expiryDate: quoteData.expiryDate,
            portalUrl: `${getPortalUrl()}/${userId.startsWith('client') ? 'client/quotes' : 'admin/quotes'}`,
            changes: quoteData.changes || []
        };

        // Send notification
        const response = await axios.post(`${API_BASE_URL}/api/notifications/send-templated`, {
            type,
            data: notificationData,
            recipientEmail: userEmailData.primaryEmail
        });

        return response.status === 200;
    } catch (error) {
        console.error(`Error sending ${type} notification:`, error.message);
        return false;
    }
};

// Middleware to ensure a valid token for all quote routes
const ensureValidToken = async (req, res, next) => {
    try {
        const accessToken = await getValidAccessToken();
        req.accessToken = accessToken;
        next();
    } catch (error) {
        console.error('Token validation error:', error);
        return res.status(401).json({
            error: true,
            message: 'Failed to authenticate. Please try again.'
        });
    }
};

// Apply the token middleware to all routes
router.use(ensureValidToken);

// Get all quotes
router.get('/quotes', async (req, res) => {
    try {
        const quotes = await readQuotesData();
        
        // Filter by client ID if provided
        if (req.query.clientId) {
            const clientQuotes = quotes.filter(quote => quote.clientId === req.query.clientId);
            return res.status(200).json(clientQuotes);
        }
        
        // Filter by job ID if provided
        if (req.query.jobId) {
            const jobQuotes = quotes.filter(quote => quote.jobId === req.query.jobId);
            return res.status(200).json(jobQuotes);
        }
        
        res.status(200).json(quotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch quotes.'
        });
    }
});

// Get a single quote by ID
router.get('/quotes/:id', async (req, res) => {
    try {
        const quotes = await readQuotesData();
        const quote = quotes.find(q => q.id === req.params.id);
        
        if (!quote) {
            return res.status(404).json({
                error: true,
                message: 'Quote not found.'
            });
        }
        
        res.status(200).json(quote);
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to fetch quote.'
        });
    }
});

// Create a new quote
router.post('/quotes', async (req, res) => {
    try {
        const {
            jobId,
            clientId,
            clientName,
            title,
            description,
            price,
            items = [],
            location,
            attachments = []
        } = req.body;
        
        if (!jobId || !clientId || !title || !description || price === undefined) {
            return res.status(400).json({
                error: true,
                message: 'Missing required fields: jobId, clientId, title, description, and price are required.'
            });
        }
        
        const quotes = await readQuotesData();
        
        // Generate a quote ID with the format QUO-YYYY-XXXX
        const year = new Date().getFullYear();
        const lastQuoteNum = quotes.length > 0 
            ? parseInt(quotes[quotes.length - 1].id.split('-')[2]) 
            : 0;
        const quoteNum = String(lastQuoteNum + 1).padStart(4, '0');
        const quoteId = `QUO-${year}-${quoteNum}`;
        
        // Set expiry date to 14 days from now
        const today = new Date();
        const expiryDate = new Date(today);
        expiryDate.setDate(today.getDate() + 14);
        
        const newQuote = {
            id: quoteId,
            jobId,
            clientId,
            clientName,
            title,
            description,
            price,
            location,
            items,
            attachments,
            status: 'Pending',
            createdAt: today.toISOString(),
            expiryDate: expiryDate.toISOString(),
            acceptedAt: null,
            rejectedAt: null,
            rejectionReason: null
        };
        
        quotes.push(newQuote);
        await writeQuotesData(quotes);
        
        // Send notification about the new quote to the client
        await sendQuoteNotification('quoteCreation', newQuote, `client-${clientId}`);
        
        // Also send notification to admin about the new quote creation
        await sendQuoteNotification('quoteCreation', newQuote, 'admin-user');
        
        res.status(201).json({
            success: true,
            message: 'Quote created successfully',
            data: newQuote
        });
    } catch (error) {
        console.error('Error creating quote:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to create quote.',
            details: error.message
        });
    }
});

// Update a quote
router.put('/quotes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const quotes = await readQuotesData();
        const quoteIndex = quotes.findIndex(q => q.id === id);
        
        if (quoteIndex === -1) {
            return res.status(404).json({
                error: true,
                message: 'Quote not found.'
            });
        }
        
        const originalQuote = quotes[quoteIndex];
        
        // Track changes for notification
        const changes = [];
        
        // Check for status change
        if (updateData.status && originalQuote.status !== updateData.status) {
            changes.push(`Status changed from "${originalQuote.status}" to "${updateData.status}"`);
            
            // Set timestamp for accepted/rejected status
            if (updateData.status === 'Accepted') {
                updateData.acceptedAt = new Date().toISOString();
            } else if (updateData.status === 'Rejected') {
                updateData.rejectedAt = new Date().toISOString();
            }
        }
        
        // Check for price change
        if (updateData.price && originalQuote.price !== updateData.price) {
            changes.push(`Price changed from "${originalQuote.price}" to "${updateData.price}"`);
        }
        
        // Check for description change
        if (updateData.description && originalQuote.description !== updateData.description) {
            changes.push(`Description updated`);
        }
        
        // Update the quote
        const updatedQuote = { ...originalQuote, ...updateData };
        quotes[quoteIndex] = updatedQuote;
        await writeQuotesData(quotes);
        
        // Send notification about the quote update if there were changes
        if (changes.length > 0) {
            await sendQuoteNotification('quoteUpdate', {
                ...updatedQuote,
                changes,
                oldStatus: originalQuote.status,
                newStatus: updateData.status
            }, `client-${originalQuote.clientId}`);
        }
        
        res.status(200).json({
            success: true,
            message: 'Quote updated successfully',
            data: updatedQuote,
            changes
        });
    } catch (error) {
        console.error('Error updating quote:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to update quote.',
            details: error.message
        });
    }
});

// Accept a quote
router.post('/quotes/:id/accept', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        
        const quotes = await readQuotesData();
        const quoteIndex = quotes.findIndex(q => q.id === id);
        
        if (quoteIndex === -1) {
            return res.status(404).json({
                error: true,
                message: 'Quote not found.'
            });
        }
        
        const originalQuote = quotes[quoteIndex];
        
        // Don't allow accepting if quote is not in Pending status
        if (originalQuote.status !== 'Pending') {
            return res.status(400).json({
                error: true,
                message: `Quote cannot be accepted because it is in ${originalQuote.status} status.`
            });
        }
        
        // Update quote status
        quotes[quoteIndex] = {
            ...originalQuote,
            status: 'Accepted',
            acceptedAt: new Date().toISOString()
        };
          await writeQuotesData(quotes);
        
        // Send notification about the quote acceptance to admin
        await sendQuoteNotification('quoteAccepted', {
            ...quotes[quoteIndex],
            oldStatus: 'Pending',
            newStatus: 'Accepted'
        }, 'admin-user');
        
        // Send notification about the quote acceptance to client
        await sendQuoteNotification('quoteAccepted', {
            ...quotes[quoteIndex],
            oldStatus: 'Pending',
            newStatus: 'Accepted'
        }, `client-${originalQuote.clientId}`);
        
        res.status(200).json({
            success: true,
            message: 'Quote accepted successfully',
            data: quotes[quoteIndex]
        });
    } catch (error) {
        console.error('Error accepting quote:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to accept quote.',
            details: error.message
        });
    }
});

// Reject a quote
router.post('/quotes/:id/reject', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, rejectionReason } = req.body;
        
        const quotes = await readQuotesData();
        const quoteIndex = quotes.findIndex(q => q.id === id);
        
        if (quoteIndex === -1) {
            return res.status(404).json({
                error: true,
                message: 'Quote not found.'
            });
        }
        
        const originalQuote = quotes[quoteIndex];
        
        // Don't allow rejecting if quote is not in Pending status
        if (originalQuote.status !== 'Pending') {
            return res.status(400).json({
                error: true,
                message: `Quote cannot be rejected because it is in ${originalQuote.status} status.`
            });
        }
        
        // Update quote status
        quotes[quoteIndex] = {
            ...originalQuote,
            status: 'Rejected',
            rejectedAt: new Date().toISOString(),
            rejectionReason: rejectionReason || 'No reason provided'
        };
          await writeQuotesData(quotes);
        
        // Send notification about the quote rejection to admin
        await sendQuoteNotification('quoteRejected', {
            ...quotes[quoteIndex],
            oldStatus: 'Pending',
            newStatus: 'Rejected'
        }, 'admin-user');
        
        // Send notification about the quote rejection to client
        await sendQuoteNotification('quoteRejected', {
            ...quotes[quoteIndex],
            oldStatus: 'Pending',
            newStatus: 'Rejected'
        }, `client-${originalQuote.clientId}`);
        
        res.status(200).json({
            success: true,
            message: 'Quote rejected successfully',
            data: quotes[quoteIndex]
        });
    } catch (error) {
        console.error('Error rejecting quote:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to reject quote.',
            details: error.message
        });
    }
});

// Delete a quote
router.delete('/quotes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const quotes = await readQuotesData();
        const filteredQuotes = quotes.filter(q => q.id !== id);
        
        if (filteredQuotes.length === quotes.length) {
            return res.status(404).json({
                error: true,
                message: 'Quote not found.'
            });
        }
        
        await writeQuotesData(filteredQuotes);
        
        res.status(200).json({
            success: true,
            message: 'Quote deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting quote:', error);
        res.status(500).json({
            error: true,
            message: 'Failed to delete quote.',
            details: error.message
        });
    }
});

module.exports = router;