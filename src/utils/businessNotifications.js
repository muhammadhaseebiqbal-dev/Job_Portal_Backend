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
};
