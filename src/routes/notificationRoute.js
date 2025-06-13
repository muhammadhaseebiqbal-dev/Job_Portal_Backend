const express = require('express');
const router = express.Router();
const { getValidAccessToken } = require('../utils/tokenManager');
const sgMail = require('@sendgrid/mail');
const { storeUserEmail, getUserEmails, setPrimaryEmail, isEmailVerified, removeUserEmail } = require('../utils/userEmailManager');
const { getEmailTemplate } = require('../utils/emailTemplates');
require('dotenv').config();

// Get SendGrid API credentials from environment variables
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
const SENDGRID_VERIFIED_SENDER = process.env.SENDGRID_VERIFIED_SENDER || 'noreply@jobportal.com';

// Notification settings storage (would use a database in production)
let notificationSettings = {
    channels: {
        email: true
    },    types: {
        clientCreation: true,
        clientUpdate: true,
        clientWelcome: true,
        userWelcome: true,
        jobCreation: true,
        jobUpdate: true,
        quoteCreation: true,
        quoteAccepted: true,
        quoteRejected: true,
        invoiceGenerated: true
    },
    sendgrid: {
        enabled: SENDGRID_API_KEY ? true : false,
        fromEmail: SENDGRID_VERIFIED_SENDER,
        fromName: 'Job Portal'
    }
};

// Initialize SendGrid if API key is available
if (SENDGRID_API_KEY) {
    sgMail.setApiKey(SENDGRID_API_KEY);
    console.log('SendGrid initialized with API key from environment variables');
}

// Storage for email verification OTPs (would use a database in production)
const verificationOTPs = {};

// Middleware to ensure a valid token
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

// Get notification settings
router.get('/notifications/settings', (req, res) => {
    res.status(200).json(notificationSettings);
});

// Debug endpoint to test notification settings
router.get('/notifications/debug', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Debug notification settings',
            settings: notificationSettings,
            quoteAcceptedEnabled: notificationSettings.types.quoteAccepted,
            quoteRejectedEnabled: notificationSettings.types.quoteRejected,
            emailChannelEnabled: notificationSettings.channels.email,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Error accessing notification settings',
            details: error.message
        });
    }
});

// Update notification settings
router.post('/notifications/settings', (req, res) => {
    try {
        const { channels, types, sendgrid } = req.body;
        
        // Validate required fields
        if (!channels || !types) {
            return res.status(400).json({ 
                error: true, 
                message: 'Missing required fields' 
            });
        }
        
        // Update notification settings
        notificationSettings = {
            channels,
            types,
            sendgrid
        };
        
        // If SendGrid is enabled, verify API key
        if (sendgrid && sendgrid.enabled && sendgrid.apiKey) {
            sgMail.setApiKey(sendgrid.apiKey);
        }
        
        res.status(200).json({ 
            success: true, 
            message: 'Notification settings updated successfully' 
        });
    } catch (error) {
        console.error('Error updating notification settings:', error);
        res.status(500).json({ 
            error: true, 
            message: 'Failed to update notification settings' 
        });
    }
});

// Create a helper function to validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Send a test email using SendGrid
router.post('/notifications/test-email', async (req, res) => {
    try {
        // Check if email notifications are disabled in settings
        if (!notificationSettings.channels.email) {
            return res.status(400).json({ 
                error: true, 
                message: 'Email notifications are disabled in settings. Enable them before sending test emails.' 
            });
        }
        
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ 
                error: true, 
                message: 'Email address is required' 
            });
        }
        
        if (!isValidEmail(email)) {
            return res.status(400).json({ 
                error: true,
                message: 'Invalid email format' 
            });
        }
        
        // Check environment variables first, then settings
        let apiKey = SENDGRID_API_KEY || (notificationSettings.sendgrid.enabled ? notificationSettings.sendgrid.apiKey : null);
        
        if (!apiKey) {
            return res.status(400).json({ 
                error: true, 
                message: 'No SendGrid API key available from environment or settings' 
            });
        }
        
        // Trim the API key to remove any accidental whitespace
        apiKey = apiKey.trim();
        
        // Set the API key
        sgMail.setApiKey(apiKey);
        
        // Prioritize verified sender from environment variables
        let fromEmail = SENDGRID_VERIFIED_SENDER || notificationSettings.sendgrid.fromEmail || 'noreply@jobportal.com';
        
        // Validate sender email format
        if (!isValidEmail(fromEmail)) {
            return res.status(400).json({ 
                error: true, 
                message: 'Invalid sender email format' 
            });
        }
        
        fromEmail = fromEmail.trim();
        
        console.log('Using API Key:', apiKey.substring(0, 10) + '...');
        console.log('Using Sender Email:', fromEmail);
        
        // Create email message
        const msg = {
            to: email.trim(),
            from: {
                email: fromEmail,
                name: notificationSettings.sendgrid.fromName || 'Job Portal'
            },
            subject: 'Job Portal - Email Notification Test',
            text: 'This is a test email from your Job Portal application.',
            html: '<strong>This is a test email from your Job Portal application.</strong>',
        };
        
        // Send email
        const response = await sgMail.send(msg);
        console.log('SendGrid Response:', response);
        
        res.status(200).json({ 
            success: true, 
            message: 'Test email sent successfully' 
        });
    } catch (error) {
        console.error('Error sending test email:', error);
        
        // Provide more specific error messages based on the error code
        if (error.code === 403) {
            let errorMessage = 'SendGrid authentication failed. This could be due to:';
            errorMessage += '\n- Using an unverified sender email';
            errorMessage += '\n- API key missing required permissions';
            errorMessage += '\n- API key or account restrictions';
            
            if (error.response && error.response.body && error.response.body.errors) {
                errorMessage += '\n\nSendGrid error details: ' + JSON.stringify(error.response.body.errors);
            }
            
            return res.status(403).json({
                error: true,
                message: errorMessage
            });
        }
        
        res.status(500).json({ 
            error: true, 
            message: `Failed to send test email: ${error.message}` 
        });
    }
});

// Send a test email to the sender's address
router.post('/notifications/send-test-email', async (req, res) => {
    try {
        // Check if email notifications are disabled in settings
        if (!notificationSettings.channels.email) {
            return res.status(400).json({ 
                error: true, 
                message: 'Email notifications are disabled in settings. Enable them before sending test emails.' 
            });
        }
        
        // Check environment variables first, then settings
        const apiKey = SENDGRID_API_KEY || (req.body.sendgrid?.enabled ? req.body.sendgrid?.apiKey : null);
        
        if (!apiKey) {
            return res.status(400).json({ 
                error: true, 
                message: 'No SendGrid API key available from environment or settings' 
            });
        }
        
        // Set the API key
        sgMail.setApiKey(apiKey);
        
        // Prioritize verified sender from environment variables
        const fromEmail = SENDGRID_VERIFIED_SENDER || req.body.sendgrid?.fromEmail;
        
        if (!fromEmail) {
            return res.status(400).json({ 
                error: true, 
                message: 'No sender email address available' 
            });
        }
        
        // Create email message - send to the from email address as a test
        const msg = {
            to: fromEmail,
            from: {
                email: fromEmail,
                name: req.body.sendgrid?.fromName || 'Job Portal'
            },
            subject: 'Job Portal - Test Email Notification',
            text: 'This is a test email from your Job Portal application. If you received this, your email notification system is working correctly.',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 5px;">
                    <h2 style="color: #4a5568;">Job Portal - Test Email</h2>
                    <p>This is a test email from your Job Portal application.</p>
                    <p>If you received this message, your email notification system is working correctly.</p>
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 0.9em;">
                        <p>This is an automated message from Job Portal.</p>
                        <p>Time sent: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            `,
        };
        
        // Send email
        await sgMail.send(msg);
        
        res.status(200).json({ 
            success: true, 
            message: `Test email sent successfully to ${fromEmail}` 
        });
    } catch (error) {
        console.error('Error sending test email:', error);
        res.status(500).json({ 
            error: true, 
            message: `Failed to send test email: ${error.message}` 
        });
    }
});

// Function to send notification via email
const sendEmailNotification = async (to, subject, text, html) => {
    // Early return if email notifications are disabled
    if (!notificationSettings.channels.email) {
        console.log('Email notifications are disabled. Email not sent.');
        return false;
    }
    
    try {
        // Prioritize API key from environment, fall back to settings if provided
        const apiKey = SENDGRID_API_KEY || notificationSettings.sendgrid.apiKey;
        if (!apiKey) {
            console.log('No SendGrid API key available');
            return false;
        }
        
        console.log('Using SendGrid API key:', apiKey.substring(0, 10) + '...');
        
        // Set SendGrid API key
        sgMail.setApiKey(apiKey);
        
        // Prioritize verified sender from environment variables
        const fromEmail = SENDGRID_VERIFIED_SENDER || notificationSettings.sendgrid.fromEmail || 'noreply@jobportal.com';
        console.log('Sending email from:', fromEmail);
        console.log('Sending email to:', to);
        
        // Create email message
        const msg = {
            to,
            from: {
                email: fromEmail,
                name: notificationSettings.sendgrid.fromName || 'Job Portal'
            },
            subject,
            text,
            html: html || text,
        };
        
        // Send email
        const response = await sgMail.send(msg);
        console.log('SendGrid API Response:', response);
        return true;
    } catch (error) {
        console.error('Error sending email notification:', error);
        
        // Log more detailed error information
        if (error.response) {
            console.error('SendGrid Error Details:', {
                statusCode: error.code,
                body: error.response.body
            });
        }
        
        return false;
    }
};

// Send a notification (can be called from other routes)
router.post('/notifications/send', async (req, res) => {
    try {
        const { type, recipientEmail, subject, message } = req.body;
        
        if (!type || !recipientEmail || !subject || !message) {
            return res.status(400).json({ 
                error: true, 
                message: 'Missing required fields' 
            });
        }
        
        // Check if notification type is enabled
        if (!notificationSettings.types[type]) {
            return res.status(400).json({ 
                error: true, 
                message: `Notifications of type "${type}" are disabled` 
            });
        }
        
        // Send email notification
        const emailSent = await sendEmailNotification(
            recipientEmail,
            subject,
            message,
            `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4a5568;">${subject}</h2>
                <p>${message}</p>
                <p style="color: #718096; font-size: 0.9em; margin-top: 30px;">
                    This is an automated message from Job Portal.
                </p>
            </div>`
        );
        
        if (emailSent) {
            res.status(200).json({ 
                success: true, 
                message: 'Notification sent successfully' 
            });
        } else {
            res.status(500).json({ 
                error: true, 
                message: 'Failed to send notification' 
            });
        }
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ 
            error: true, 
            message: 'Failed to send notification' 
        });
    }
});

// Send a templated notification email based on notification type
const sendTemplatedEmail = async (type, data, recipientEmail) => {
    if (!notificationSettings.channels.email || !notificationSettings.types[type]) {
        console.log(`Email notifications are disabled for type: ${type}`);
        return false;
    }
    
    try {
        // Get the appropriate email template for this notification type
        const template = getEmailTemplate(type, data);
        
        // Prioritize API key from environment, fall back to settings if provided
        const apiKey = SENDGRID_API_KEY || notificationSettings.sendgrid.apiKey;
        if (!apiKey) {
            console.log('No SendGrid API key available');
            return false;
        }
        
        // Set SendGrid API key
        sgMail.setApiKey(apiKey);
        
        // Prioritize verified sender from environment variables
        const fromEmail = SENDGRID_VERIFIED_SENDER || notificationSettings.sendgrid.fromEmail || 'noreply@jobportal.com';
        
        // Validate the recipient email
        if (!isValidEmail(recipientEmail)) {
            console.error(`Invalid recipient email format: ${recipientEmail}`);
            return false;
        }
        
        // Log details for debugging, especially for client welcome emails
        console.log(`Preparing to send ${type} email:`);
        console.log(`- From: ${fromEmail}`);
        console.log(`- To: ${recipientEmail}`);
        console.log(`- Subject: ${template.subject}`);
        
        // Create email message
        const msg = {
            to: recipientEmail,
            from: {
                email: fromEmail,
                name: notificationSettings.sendgrid.fromName || 'Job Portal'
            },
            subject: template.subject,
            text: template.text,
            html: template.html,
        };
        
        // Send email
        const response = await sgMail.send(msg);
        console.log(`Sent ${type} notification email to ${recipientEmail}`);
        return true;
    } catch (error) {
        console.error(`Error sending ${type} email notification:`, error);
        
        // Enhanced error logging for SendGrid errors
        if (error.response) {
            console.error('SendGrid Error Details:', {
                type: type,
                recipient: recipientEmail,
                statusCode: error.code,
                body: error.response.body
            });
            
            // Special handling for clientWelcome emails
            if (type === 'clientWelcome') {
                console.error('Client welcome email failed. This could be due to:');
                console.error('- The sender email not being verified in SendGrid');
                console.error('- Rate limits on your SendGrid account');
                console.error('- The client email address being invalid or blocked');
            }
        }
        
        return false;
    }
};

// Send a templated notification based on type
router.post('/notifications/send-templated', async (req, res) => {
    try {
        const { type, data, recipientEmail } = req.body;
        
        if (!type || !data || !recipientEmail) {
            return res.status(400).json({ 
                error: true, 
                message: 'Missing required fields: type, data, and recipientEmail are required' 
            });
        }
        
        // Check if notification type is enabled
        if (!notificationSettings.types[type]) {
            return res.status(400).json({ 
                error: true, 
                message: `Notifications of type "${type}" are disabled` 
            });
        }
        
        // Send templated email notification
        const emailSent = await sendTemplatedEmail(type, data, recipientEmail);
        
        if (emailSent) {
            res.status(200).json({ 
                success: true, 
                message: 'Notification sent successfully' 
            });
        } else {
            res.status(500).json({ 
                error: true, 
                message: 'Failed to send notification' 
            });
        }
    } catch (error) {
        console.error('Error sending templated notification:', error);
        res.status(500).json({ 
            error: true, 
            message: 'Failed to send notification' 
        });
    }
});

// Generate and send email verification OTP
router.post('/email-verification/generate-otp', async (req, res) => {
    try {
        // Check if email notifications are disabled in settings
        if (!notificationSettings.channels.email) {
            return res.status(400).json({ 
                error: true, 
                message: 'Email notifications are disabled in settings. Please enable them before verifying emails.' 
            });
        }
        
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ 
                error: true, 
                message: 'Email address is required' 
            });
        }
        
        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store OTP with timestamp (expires in 5 minutes)
        verificationOTPs[email] = {
            code: otp,
            expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
        };
        
        // Send OTP via email
        const emailSent = await sendEmailNotification(
            email,
            'Job Portal - Email Verification',
            `Your verification code is: ${otp}. This code will expire in 5 minutes.`,
            `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 5px;">
                <h2 style="color: #4a5568;">Job Portal - Email Verification</h2>
                <p>Thank you for verifying your email address.</p>
                <div style="background-color: #f7fafc; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
                    <h3 style="margin-top: 0;">Your verification code is:</h3>
                    <p style="font-size: 28px; font-weight: bold; letter-spacing: 3px; margin: 10px 0;">${otp}</p>
                    <p style="margin-bottom: 0;">This code will expire in 5 minutes.</p>
                </div>
                <p>If you didn't request this code, you can safely ignore this email.</p>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 0.9em;">
                    <p>This is an automated message from Job Portal.</p>
                </div>
            </div>`
        );
        
        if (emailSent) {
            res.status(200).json({ 
                success: true, 
                message: `Verification code sent to ${email}` 
            });
        } else {
            res.status(500).json({ 
                error: true, 
                message: 'Failed to send verification code' 
            });
        }
    } catch (error) {
        console.error('Error generating verification code:', error);
        res.status(500).json({ 
            error: true, 
            message: 'Failed to generate verification code' 
        });
    }
});

// Verify email with OTP and link to user account
router.post('/email-verification/verify', (req, res) => {
    try {
        const { email, otp, userId } = req.body;
        
        if (!email || !otp) {
            return res.status(400).json({ 
                error: true, 
                message: 'Email and verification code are required' 
            });
        }
        
        if (!userId) {
            return res.status(400).json({ 
                error: true, 
                message: 'User ID is required to link email to account' 
            });
        }
        
        // Check if OTP exists for this email
        const otpData = verificationOTPs[email];
        if (!otpData) {
            return res.status(400).json({ 
                error: true, 
                message: 'Verification code not found. Please request a new code.' 
            });
        }
        
        // Check if OTP has expired
        if (Date.now() > otpData.expiresAt) {
            // Remove expired OTP
            delete verificationOTPs[email];
            return res.status(400).json({ 
                error: true, 
                message: 'Verification code has expired. Please request a new code.' 
            });
        }
        
        // Verify OTP
        if (otpData.code !== otp) {
            return res.status(400).json({ 
                error: true, 
                message: 'Invalid verification code' 
            });
        }
        
        // OTP verified successfully - store the email for this user
        delete verificationOTPs[email]; // Remove used OTP
        
        // Store the verified email for this user
        const emailStored = storeUserEmail(userId, email);
        
        if (emailStored) {
            res.status(200).json({ 
                success: true, 
                message: 'Email verified successfully and linked to your account' 
            });
        } else {
            res.status(500).json({ 
                error: true, 
                message: 'Email verified but failed to link to your account' 
            });
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ 
            error: true, 
            message: 'Failed to verify email' 
        });
    }
});

// Get user's verified emails
router.get('/user-emails/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({ 
                error: true, 
                message: 'User ID is required' 
            });
        }
        
        const userData = await getUserEmails(userId);
        
        res.status(200).json({ 
            success: true, 
            data: userData
        });
    } catch (error) {
        console.error('Error getting user emails:', error);
        res.status(500).json({ 
            error: true, 
            message: 'Failed to get user emails' 
        });
    }
});

// Set primary email for user
router.post('/user-emails/set-primary', (req, res) => {
    try {
        const { userId, email } = req.body;
        
        if (!userId || !email) {
            return res.status(400).json({ 
                error: true, 
                message: 'User ID and email are required' 
            });
        }
        
        // Check if email is verified for this user
        if (!isEmailVerified(userId, email)) {
            return res.status(400).json({ 
                error: true, 
                message: 'Email must be verified before setting as primary' 
            });
        }
        
        const success = setPrimaryEmail(userId, email);
        
        if (success) {
            res.status(200).json({ 
                success: true, 
                message: 'Primary email updated successfully' 
            });
        } else {
            res.status(500).json({ 
                error: true, 
                message: 'Failed to update primary email' 
            });
        }
    } catch (error) {
        console.error('Error setting primary email:', error);
        res.status(500).json({ 
            error: true, 
            message: 'Failed to set primary email' 
        });
    }
});

// Remove verified email for user
router.delete('/user-emails/remove', async (req, res) => {
    try {
        const { userId, email } = req.body;
        
        if (!userId || !email) {
            return res.status(400).json({ 
                error: true, 
                message: 'User ID and email are required' 
            });
        }
        
        // Get current user emails to check conditions
        const userData = await getUserEmails(userId);
        
        // Don't allow removing the last email
        if (userData.verifiedEmails.length <= 1) {
            return res.status(400).json({ 
                error: true, 
                message: 'Cannot remove the last verified email address. You must have at least one verified email.' 
            });
        }
        
        // Check if email is verified for this user
        if (!userData.verifiedEmails.includes(email)) {
            return res.status(400).json({ 
                error: true, 
                message: 'Email address not found in verified emails' 
            });
        }
        
        const success = await removeUserEmail(userId, email);
        
        if (success) {
            res.status(200).json({ 
                success: true, 
                message: 'Email address removed successfully' 
            });
        } else {
            res.status(500).json({ 
                error: true, 
                message: 'Failed to remove email address' 
            });
        }
    } catch (error) {
        console.error('Error removing user email:', error);
        res.status(500).json({ 
            error: true, 
            message: 'Failed to remove email address' 
        });
    }
});

// GET route to retrieve client notifications
router.get('/notifications', (req, res) => {
    try {
        const { clientId } = req.query;
        
        // Return empty array if no clientId is provided instead of throwing an error
        if (!clientId || clientId === 'null' || clientId === 'undefined') {
            return res.status(200).json([]);
        }
        
        // For now, return mock notifications
        // This would normally fetch from a database based on clientId
        const mockNotifications = [
            { id: 1, type: 'quote', message: 'New quote available for Security System Upgrade', time: '2 hours ago', read: false },
            { id: 2, type: 'schedule', message: 'Technician scheduled for May 20', time: '1 day ago', read: true },
            { id: 3, type: 'job', message: 'Digital Signage Installation completed', time: '2 days ago', read: true },
        ];
        
        res.status(200).json(mockNotifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        // Return empty array instead of error for better user experience
        res.status(200).json([]);
    }
});

// Send support feedback email
router.post('/support/feedback', async (req, res) => {
    try {
        const { name, email, message, recipient } = req.body;
        
        if (!name || !email || !message || !recipient) {
            return res.status(400).json({ 
                error: true, 
                message: 'Name, email, message, and recipient are required' 
            });
        }
        
        // Create a formatted HTML email with the feedback
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 5px;">
                <h2 style="color: #4a5568;">New Support Request</h2>
                <p><strong>From:</strong> ${name} (${email})</p>
                <div style="background-color: #f7fafc; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Message:</h3>
                    <p style="white-space: pre-line;">${message}</p>
                </div>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #718096; font-size: 0.9em;">
                    <p>This message was sent from the Job Portal support form.</p>
                    <p>Time sent: ${new Date().toLocaleString()}</p>
                </div>
            </div>
        `;
        
        // Send the feedback email
        const emailSent = await sendEmailNotification(
            recipient, // ibitbytesoft@gmail.com
            `Job Portal Support Request from ${name}`,
            `New support request from ${name} (${email}):\n\n${message}`,
            htmlContent
        );
        
        if (emailSent) {
            res.status(200).json({ 
                success: true, 
                message: 'Your message has been sent successfully' 
            });
        } else {
            res.status(500).json({ 
                error: true, 
                message: 'Failed to send your message. Please try again later.' 
            });
        }
    } catch (error) {
        console.error('Error sending support feedback:', error);
        res.status(500).json({ 
            error: true, 
            message: 'Failed to process your request. Please try again later.' 
        });
    }
});

module.exports = router;