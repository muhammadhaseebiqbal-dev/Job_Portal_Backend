/**
 * Notification Storage Module
 * Handles persistent storage of pending notifications
 * Uses file-based storage to persist across server restarts
 */

const fs = require('fs');
const path = require('path');

// File path for persistent storage
const STORAGE_FILE = path.join(__dirname, '../../data/notifications.json');

// Ensure data directory exists
const ensureDataDir = () => {
    const dataDir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
};

// Load notifications from file
const loadNotifications = () => {
    try {
        ensureDataDir();
        if (fs.existsSync(STORAGE_FILE)) {
            const data = fs.readFileSync(STORAGE_FILE, 'utf8');
            const parsed = JSON.parse(data);
            console.log('📁 Loaded notifications from file:', Object.keys(parsed).length, 'recipients');
            return new Map(Object.entries(parsed));
        }
    } catch (error) {
        console.error('Error loading notifications from file:', error);
    }
    return new Map();
};

// Save notifications to file
const saveNotifications = (notificationsMap) => {
    try {
        ensureDataDir();
        const data = Object.fromEntries(notificationsMap);
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving notifications to file:', error);
    }
};

// Initialize with persistent storage
const pendingNotifications = loadNotifications();

/**
 * Get pending notifications for a specific recipient
 */
const getPendingNotifications = (recipientKey) => {
    try {
        const notifications = pendingNotifications.get(recipientKey) || [];
        console.log(`📬 Retrieved ${notifications.length} pending notifications for ${recipientKey}`);
        return notifications;
    } catch (error) {
        console.error('Error retrieving pending notifications:', error);
        return [];
    }
};

/**
 * Clear pending notifications for a specific recipient
 */
const clearPendingNotifications = (recipientKey) => {
    try {
        const notifications = pendingNotifications.get(recipientKey) || [];
        const count = notifications.length;
        pendingNotifications.set(recipientKey, []);
        saveNotifications(pendingNotifications); // Persist to file
        console.log(`🗑️ Cleared ${count} pending notifications for ${recipientKey}`);
        return count;
    } catch (error) {
        console.error('Error clearing pending notifications:', error);
        return 0;
    }
};

/**
 * Add a notification for a specific recipient
 */
const addPendingNotification = (recipientKey, notification) => {
    try {
        if (!pendingNotifications.has(recipientKey)) {
            pendingNotifications.set(recipientKey, []);
        }
        
        const recipientNotifications = pendingNotifications.get(recipientKey);
        recipientNotifications.push(notification);
        
        // Keep only last 50 notifications per recipient
        if (recipientNotifications.length > 50) {
            recipientNotifications.splice(0, recipientNotifications.length - 50);
        }
          pendingNotifications.set(recipientKey, recipientNotifications);
        saveNotifications(pendingNotifications); // Persist to file
        console.log(`📥 Added notification for ${recipientKey} - Total: ${recipientNotifications.length}`);
        
        return true;
    } catch (error) {
        console.error('Error adding pending notification:', error);
        return false;
    }
};

/**
 * Get all pending notifications (for debugging)
 */
const getAllPendingNotifications = () => {
    try {
        const allNotifications = {};
        for (const [recipient, notifications] of pendingNotifications.entries()) {
            allNotifications[recipient] = notifications;
        }
        return allNotifications;
    } catch (error) {
        console.error('Error retrieving all pending notifications:', error);
        return {};
    }
};

/**
 * Get notification count for a recipient
 */
const getNotificationCount = (recipientKey) => {
    try {
        const notifications = pendingNotifications.get(recipientKey) || [];
        return notifications.length;
    } catch (error) {
        console.error('Error getting notification count:', error);
        return 0;
    }
};

module.exports = {
    getPendingNotifications,
    clearPendingNotifications,
    addPendingNotification,
    getAllPendingNotifications,
    getNotificationCount
};
