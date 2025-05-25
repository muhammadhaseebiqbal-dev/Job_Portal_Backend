const { Redis } = require('@upstash/redis');
require('dotenv').config();

// Initialize Redis client using environment variables from Upstash integration
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

// Default admin user data
const defaultUserData = {
    users: {
        'admin-user': {
            verifiedEmails: [process.env.ADMIN_EMAIL || 'vym5j6nzt2@mrotzis.com'],
            primaryEmail: process.env.ADMIN_EMAIL || 'vym5j6nzt2@mrotzis.com'
        }
    }
};

// Get user's verified emails from Redis
const getUserEmails = async (userId) => {
    try {
        // Try to get user data from Redis
        const userData = await redis.get('userEmail:data');
        
        if (userData && userData.users && userData.users[userId]) {
            return userData.users[userId];
        }
        
        // Check if we need to initialize with default data
        if (!userData) {
            await redis.set('userEmail:data', defaultUserData);
            
            // If the requested userId is admin-user, return the default
            if (userId === 'admin-user') {
                return defaultUserData.users['admin-user'];
            }
        }
        
        // User not found
        return { verifiedEmails: [], primaryEmail: null };
    } catch (error) {
        console.error('Error getting user emails from Redis:', error);
        
        // Fallback for admin user
        if (userId === 'admin-user') {
            return defaultUserData.users['admin-user'];
        }
        
        return { verifiedEmails: [], primaryEmail: null };
    }
};

// Store verified email for a user
const storeUserEmail = async (userId, email) => {
    try {
        // Get current data
        let userData = await redis.get('userEmail:data');
        
        // Initialize if empty
        if (!userData) {
            userData = JSON.parse(JSON.stringify(defaultUserData)); // Deep clone
        }
        
        // Create user entry if it doesn't exist
        if (!userData.users[userId]) {
            userData.users[userId] = {
                verifiedEmails: [],
                primaryEmail: null
            };
        }
        
        // Add email if not already verified
        if (!userData.users[userId].verifiedEmails.includes(email)) {
            userData.users[userId].verifiedEmails.push(email);
            userData.users[userId].primaryEmail = userData.users[userId].primaryEmail || email; // Set as primary if none exists
        }
        
        // Store updated data
        await redis.set('userEmail:data', userData);
        return true;
    } catch (error) {
        console.error('Error storing user email in Redis:', error);
        return false;
    }
};

// Set primary email for user
const setPrimaryEmail = async (userId, email) => {
    try {
        // Get current data
        let userData = await redis.get('userEmail:data');
        
        // Handle case where no data exists
        if (!userData) {
            return false;
        }
        
        // Ensure user exists
        if (!userData.users[userId]) {
            return false;
        }
        
        // Ensure email is verified
        if (!userData.users[userId].verifiedEmails.includes(email)) {
            return false;
        }
        
        // Set as primary
        userData.users[userId].primaryEmail = email;
        
        // Store updated data
        await redis.set('userEmail:data', userData);
        return true;
    } catch (error) {
        console.error('Error setting primary email in Redis:', error);
        return false;
    }
};

// Check if email is verified for user
const isEmailVerified = async (userId, email) => {
    try {
        const userData = await getUserEmails(userId);
        return userData.verifiedEmails.includes(email);
    } catch (error) {
        console.error('Error checking email verification:', error);
        return false;
    }
};

// Remove verified email for user
const removeUserEmail = async (userId, email) => {
    try {
        // Get current data
        let userData = await redis.get('userEmail:data');
        
        // Handle case where no data exists
        if (!userData) {
            return false;
        }
        
        // Ensure user exists
        if (!userData.users[userId]) {
            return false;
        }
        
        // Check if email exists in verified emails
        const emailIndex = userData.users[userId].verifiedEmails.indexOf(email);
        if (emailIndex === -1) {
            return false; // Email not found
        }
        
        // Remove email from verified emails array
        userData.users[userId].verifiedEmails.splice(emailIndex, 1);
        
        // If removed email was primary, set a new primary email
        if (userData.users[userId].primaryEmail === email) {
            // Set the first remaining email as primary, or null if no emails left
            userData.users[userId].primaryEmail = userData.users[userId].verifiedEmails.length > 0 
                ? userData.users[userId].verifiedEmails[0] 
                : null;
        }
        
        // Store updated data
        await redis.set('userEmail:data', userData);
        return true;
    } catch (error) {
        console.error('Error removing user email from Redis:', error);
        return false;
    }
};

module.exports = {
    storeUserEmail,
    getUserEmails,
    setPrimaryEmail,
    isEmailVerified,
    removeUserEmail
};