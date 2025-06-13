/**
 * Business Notifications Module
 * Handles sending notifications for various business workflow events
 */

const axios = require('axios');
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Notification types enum
const NOTIFICATION_TYPES = {
    JOB_CREATED: 'job_created',
    JOB_STATUS_UPDATE: 'job_status_update', 
    QUOTE_ACCEPTED: 'quote_accepted',
    QUOTE_DECLINED: 'quote_declined',
    NOTIFICATION_CREATED: 'notification_created',
    NOTIFICATION_UPDATED: 'notification_updated',
    NOTIFICATION_DELETED: 'notification_deleted'
};

/**
 * Send a business notification
 * @param {string} type - The type of notification (from NOTIFICATION_TYPES)
 * @param {object} data - The notification data
 */
const sendBusinessNotification = async (type, data) => {
    try {
        console.log(`📧 Sending business notification: ${type}`, {
            jobId: data.jobId,
            client: data.client,
            timestamp: new Date().toISOString()
        });

        // Log the notification for audit purposes
        const notificationLog = {
            type,
            timestamp: new Date().toISOString(),
            data,
            status: 'sent'
        };

        // Here you can implement various notification channels:
        // 1. Email notifications
        // 2. SMS notifications
        // 3. In-app notifications
        // 4. Webhook notifications
        // 5. Database logging

        switch (type) {
            case NOTIFICATION_TYPES.JOB_CREATED:
                await handleJobCreatedNotification(data);
                break;
            case NOTIFICATION_TYPES.JOB_STATUS_UPDATE:
                await handleJobStatusUpdateNotification(data);
                break;
            case NOTIFICATION_TYPES.QUOTE_ACCEPTED:
                await handleQuoteAcceptedNotification(data);
                break;
            case NOTIFICATION_TYPES.QUOTE_DECLINED:
                await handleQuoteDeclinedNotification(data);
                break;
            default:
                console.warn(`Unknown notification type: ${type}`);
        }

        console.log(`✅ Business notification sent successfully: ${type}`);
        
    } catch (error) {
        console.error(`❌ Error sending business notification: ${type}`, error);
        // Don't throw the error to prevent breaking the main workflow
        // Just log it for monitoring purposes
    }
};

/**
 * Handle job created notification
 */
const handleJobCreatedNotification = async (data) => {
    const message = `New job created: ${data.jobDescription} for ${data.client}`;
    
    console.log('🆕 Job Created Notification:', {
        jobId: data.jobId,
        description: data.jobDescription,
        client: data.client,
        status: data.status,
        date: data.date,
        createdBy: data.createdBy
    });

    // Implement specific notification logic here
    // Example: Send email to admin, update dashboard, etc.
};

/**
 * Handle job status update notification
 */
const handleJobStatusUpdateNotification = async (data) => {
    const message = `Job status updated: ${data.jobDescription} changed from ${data.oldStatus} to ${data.newStatus}`;
    
    console.log('🔄 Job Status Update Notification:', {
        jobId: data.jobId,
        description: data.jobDescription,
        client: data.client,
        oldStatus: data.oldStatus,
        newStatus: data.newStatus,
        changes: data.changes,
        updatedBy: data.updatedBy
    });

    // Implement specific notification logic here
    // Example: Notify client of status change, update tracking systems, etc.
};

/**
 * Handle quote accepted notification
 */
const handleQuoteAcceptedNotification = async (data) => {
    const message = `Quote accepted: ${data.jobDescription} - Amount: $${data.amount}`;
    
    console.log('✅ Quote Accepted Notification:', {
        jobId: data.jobId,
        quoteId: data.quoteId,
        description: data.jobDescription,
        client: data.client,
        amount: data.amount,
        respondedBy: data.respondedBy
    });

    // Implement specific notification logic here
    // Example: Notify sales team, update CRM, trigger workflow, etc.
};

/**
 * Handle quote declined notification
 */
const handleQuoteDeclinedNotification = async (data) => {
    const message = `Quote declined: ${data.jobDescription} - Amount: $${data.amount}`;
    
    console.log('❌ Quote Declined Notification:', {
        jobId: data.jobId,
        quoteId: data.quoteId,
        description: data.jobDescription,
        client: data.client,
        amount: data.amount,
        respondedBy: data.respondedBy
    });

    // Implement specific notification logic here
    // Example: Notify sales team, follow up reminders, etc.
};

/**
 * Send email notification (placeholder implementation)
 */
const sendEmailNotification = async (to, subject, body) => {
    try {
        // Implement email sending logic here
        // You can use services like SendGrid, AWS SES, Nodemailer, etc.
        console.log(`📧 Email notification would be sent to: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${body}`);
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
};

/**
 * Send SMS notification (placeholder implementation)
 */
const sendSMSNotification = async (phoneNumber, message) => {
    try {
        // Implement SMS sending logic here
        // You can use services like Twilio, AWS SNS, etc.
        console.log(`📱 SMS notification would be sent to: ${phoneNumber}`);
        console.log(`Message: ${message}`);
    } catch (error) {
        console.error('Error sending SMS notification:', error);
    }
};

/**
 * Send webhook notification (placeholder implementation)
 */
const sendWebhookNotification = async (webhookUrl, payload) => {
    try {
        // Implement webhook sending logic here
        console.log(`🔗 Webhook notification would be sent to: ${webhookUrl}`);
        console.log(`Payload:`, payload);
        
        // Example webhook implementation:
        // const response = await axios.post(webhookUrl, payload, {
        //     headers: { 'Content-Type': 'application/json' },
        //     timeout: 5000
        // });
    } catch (error) {
        console.error('Error sending webhook notification:', error);
    }
};

module.exports = {
    sendBusinessNotification,
    NOTIFICATION_TYPES,
    sendEmailNotification,
    sendSMSNotification,
    sendWebhookNotification
=======
// Backend notification service for handling business workflow notifications
const express = require('express');
const router = express.Router();
const { sendEmailNotification } = require('../routes/notificationRoute');
const { getUserEmails } = require('../utils/userEmailManager');

// Store active notification connections (in production, use Redis or database)
const activeConnections = new Map();

// Notification types for business workflow
const NOTIFICATION_TYPES = {
  JOB_CREATED: 'job_created',
  JOB_STATUS_UPDATE: 'job_status_update', 
  QUOTE_ACCEPTED: 'quote_accepted',
  QUOTE_DECLINED: 'quote_declined',
  NOTE_ADDED: 'note_added',
  ATTACHMENT_ADDED: 'attachment_added'
};

// Store pending notifications (in production, use database)
const pendingNotifications = new Map();

// Helper function to determine recipients based on notification type and context
const getNotificationRecipients = async (type, data) => {
  const recipients = [];
  
  try {
    switch (type) {
      case NOTIFICATION_TYPES.JOB_CREATED:
        // Notify admin and assigned client
        recipients.push('admin'); // Always notify admin
        if (data.clientUuid) {
          recipients.push(`client:${data.clientUuid}`);
        }
        break;
        
      case NOTIFICATION_TYPES.JOB_STATUS_UPDATE:
        // Notify both admin and client involved in the job
        recipients.push('admin');
        if (data.clientUuid) {
          recipients.push(`client:${data.clientUuid}`);
        }
        break;
        
      case NOTIFICATION_TYPES.QUOTE_ACCEPTED:
      case NOTIFICATION_TYPES.QUOTE_DECLINED:
        // Notify admin when client accepts/declines quote
        recipients.push('admin');
        if (data.clientUuid) {
          recipients.push(`client:${data.clientUuid}`);
        }
        break;
        
      case NOTIFICATION_TYPES.NOTE_ADDED:
      case NOTIFICATION_TYPES.ATTACHMENT_ADDED:
        // Notify both parties when notes/attachments are added
        recipients.push('admin');
        if (data.clientUuid) {
          recipients.push(`client:${data.clientUuid}`);
        }
        break;
        
      default:
        recipients.push('admin'); // Default to admin
    }
  } catch (error) {
    console.error('Error determining notification recipients:', error);
    recipients.push('admin'); // Fallback to admin
  }
  
  return recipients;
};

// Helper function to create notification payload
const createNotificationPayload = (type, data) => {
  const timestamp = new Date().toISOString();
  
  const basePayload = {
    id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    timestamp,
    data: {
      ...data,
      jobId: data.jobId || data.uuid,
      jobDescription: data.jobDescription || data.job_description || data.description
    }
  };

  switch (type) {
    case NOTIFICATION_TYPES.JOB_CREATED:
      return {
        ...basePayload,
        title: 'New Job Created',
        message: `Job "${data.jobDescription}" has been created`,
        priority: 'high'
      };
      
    case NOTIFICATION_TYPES.JOB_STATUS_UPDATE:
      return {
        ...basePayload,
        title: 'Job Status Updated',
        message: `Job status changed from "${data.oldStatus}" to "${data.newStatus}"`,
        priority: 'medium'
      };
      
    case NOTIFICATION_TYPES.QUOTE_ACCEPTED:
      return {
        ...basePayload,
        title: 'Quote Accepted',
        message: `Quote accepted for job "${data.jobDescription}"`,
        priority: 'high'
      };
      
    case NOTIFICATION_TYPES.QUOTE_DECLINED:
      return {
        ...basePayload,
        title: 'Quote Declined',
        message: `Quote declined for job "${data.jobDescription}"`,
        priority: 'medium'
      };
      
    case NOTIFICATION_TYPES.NOTE_ADDED:
      return {
        ...basePayload,
        title: 'Note Added',
        message: `New note added to job "${data.jobDescription}"`,
        priority: 'low'
      };
      
    case NOTIFICATION_TYPES.ATTACHMENT_ADDED:
      return {
        ...basePayload,
        title: 'Attachment Added',
        message: `New attachment added to job "${data.jobDescription}"`,
        priority: 'low'
      };
      
    default:
      return {
        ...basePayload,
        title: 'Notification',
        message: 'You have a new notification',
        priority: 'low'
      };
  }
};

// Main function to send business workflow notifications
const sendBusinessNotification = async (type, data) => {
  try {
    console.log(`Sending business notification: ${type}`, data);
    
    // Create notification payload
    const notification = createNotificationPayload(type, data);
    
    // Get recipients
    const recipients = await getNotificationRecipients(type, data);
    
    // Send to each recipient
    for (const recipient of recipients) {
      // Store notification for polling
      if (!pendingNotifications.has(recipient)) {
        pendingNotifications.set(recipient, []);
      }
      
      const recipientNotifications = pendingNotifications.get(recipient);
      recipientNotifications.push(notification);
      
      // Keep only last 50 notifications per recipient
      if (recipientNotifications.length > 50) {
        recipientNotifications.splice(0, recipientNotifications.length - 50);
      }
      
      pendingNotifications.set(recipient, recipientNotifications);
      
      console.log(`Notification stored for recipient: ${recipient}`);
    }
    
    // Also send email notifications if configured
    await sendEmailNotificationsForWorkflow(type, data, recipients);
    
    return true;
  } catch (error) {
    console.error('Error sending business notification:', error);
    return false;
  }
};

// Send email notifications for business workflow
const sendEmailNotificationsForWorkflow = async (type, data, recipients) => {
  try {
    for (const recipient of recipients) {
      let emailAddress = null;
      
      if (recipient === 'admin') {
        // Get admin email (you may need to implement this)
        const adminEmails = await getUserEmails('admin-user');
        emailAddress = adminEmails?.primaryEmail;
      } else if (recipient.startsWith('client:')) {
        // Get client email
        const clientUuid = recipient.replace('client:', '');
        const clientEmails = await getUserEmails(clientUuid);
        emailAddress = clientEmails?.primaryEmail;
      }
      
      if (emailAddress) {
        const notification = createNotificationPayload(type, data);
        
        // Send email using existing notification route
        await sendEmailNotification(
          emailAddress,
          notification.title,
          notification.message,
          `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              ${notification.title}
            </h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; font-size: 16px; color: #333;">
                ${notification.message}
              </p>
              ${data.jobId ? `<p style="margin: 10px 0 0 0; font-size: 14px; color: #666;"><strong>Job ID:</strong> ${data.jobId}</p>` : ''}
              ${data.client ? `<p style="margin: 5px 0 0 0; font-size: 14px; color: #666;"><strong>Client:</strong> ${data.client}</p>` : ''}
            </div>
            <p style="font-size: 14px; color: #666; border-top: 1px solid #ddd; padding-top: 15px;">
              This is an automated notification from the Job Portal system.
            </p>
          </div>`
        );
      }
    }
  } catch (error) {
    console.error('Error sending email notifications for workflow:', error);
  }
};

// Polling endpoint for real-time notifications
router.get('/poll', async (req, res) => {
  try {
    const { userId, userType } = req.query;
    
    if (!userId || !userType) {
      return res.status(400).json({ error: 'userId and userType are required' });
    }
    
    // Determine recipient key
    let recipientKey;
    if (userType === 'admin') {
      recipientKey = 'admin';
    } else {
      recipientKey = `client:${userId}`;
    }
    
    // Get pending notifications for this recipient
    const notifications = pendingNotifications.get(recipientKey) || [];
    
    // Clear the notifications after sending (mark as delivered)
    pendingNotifications.set(recipientKey, []);
    
    res.json(notifications);
  } catch (error) {
    console.error('Error polling notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Test endpoint to trigger notifications
router.post('/test', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    if (!type || !NOTIFICATION_TYPES[type.toUpperCase()]) {
      return res.status(400).json({ 
        error: 'Invalid notification type',
        validTypes: Object.values(NOTIFICATION_TYPES)
      });
    }
    
    const success = await sendBusinessNotification(NOTIFICATION_TYPES[type.toUpperCase()], data);
    
    res.json({ 
      success,
      message: success ? 'Notification sent successfully' : 'Failed to send notification'
    });
  } catch (error) {
    console.error('Error testing notification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the main notification function and types
module.exports = {
  router,
  sendBusinessNotification,
  NOTIFICATION_TYPES
>>>>>>> 384dbcf0fa1cd48b7f6290c4b04d25200b5535eb
};
