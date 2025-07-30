const { Redis } = require('@upstash/redis');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
require('dotenv').config();

// Initialize Redis client using environment variables from Upstash integration
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

/**
 * Store user credentials (email-password mapping linked to UUID)
 * @param {string} email - User email address
 * @param {string} password - Plain text password (will be hashed)
 * @param {string} userUuid - User UUID
 * @returns {Promise<boolean>} Success status
 */
const storeUserCredentials = async (email, password, userUuid) => {
    try {
        // Hash the password before storing
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Store email-to-UUID mapping
        await redis.set(`user:email:${email.toLowerCase()}`, userUuid);
        
        // Store email-password mapping
        await redis.set(`user:auth:${email.toLowerCase()}`, {
            hashedPassword,
            userUuid,
            createdAt: new Date().toISOString()
        });
        
        console.log(`User credentials stored for email: ${email}`);
        return true;
    } catch (error) {
        console.error('Error storing user credentials:', error);
        return false;
    }
};

/**
 * Authenticate user with email and password
 * @param {string} email - User email address
 * @param {string} password - Plain text password
 * @returns {Promise<{success: boolean, userUuid?: string, message: string}>}
 */
const authenticateUser = async (email, password) => {
    try {
        // Get authentication data
        const authData = await redis.get(`user:auth:${email.toLowerCase()}`);
        
        if (!authData) {
            return {
                success: false,
                message: 'User not found'
            };
        }
        
        // Verify password
        const isValidPassword = await bcrypt.compare(password, authData.hashedPassword);
        
        if (!isValidPassword) {
            return {
                success: false,
                message: 'Invalid password'
            };
        }
        
        // Check if user is active
        const isActive = await validateUserActiveStatus(authData.userUuid);
        if (!isActive) {
            return {
                success: false,
                message: 'User account is inactive'
            };
        }
        
        return {
            success: true,
            userUuid: authData.userUuid,
            message: 'Authentication successful'
        };
    } catch (error) {
        console.error('Error authenticating user:', error);
        return {
            success: false,
            message: 'Authentication failed'
        };
    }
};

/**
 * Validate if a user is active by checking the users data
 * @param {string} userUuid - User UUID
 * @returns {Promise<boolean>} True if user is active, false otherwise
 */
const validateUserActiveStatus = async (userUuid) => {
    try {
        // First check cache
        const cacheKey = `user:status:${userUuid}`;
        const cachedStatus = await redis.get(cacheKey);
        
        if (cachedStatus && cachedStatus.userUuid === userUuid) {
            return cachedStatus.isActive;
        }
        
        // Get users data from Redis
        const usersData = await redis.get('users_data');
        
        if (!usersData || !Array.isArray(usersData)) {
            return false;
        }
        
        const user = usersData.find(u => u.uuid === userUuid);
        
        if (!user) {
            return false;
        }
        
        // Cache the result for 5 minutes
        await redis.set(cacheKey, {
            userUuid,
            isActive: user.isActive,
            cachedAt: new Date().toISOString()
        }, { ex: 300 }); // 5 minutes TTL
        
        return user.isActive;
    } catch (error) {
        console.error('Error validating user active status:', error);
        return false;
    }
};

/**
 * Generate a secure password setup token
 * @returns {string} Random token for password setup
 */
const generatePasswordSetupToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

/**
 * Store password setup token for a user
 * @param {string} email - User email address
 * @param {string} token - Password setup token
 * @param {string} userUuid - User UUID
 * @returns {Promise<boolean>} Success status
 */
const storePasswordSetupToken = async (email, token, userUuid) => {
    try {
        // Create token data as a plain object
        const tokenData = {
            email: email.toLowerCase(),
            userUuid,
            createdAt: new Date().toISOString()
        };
        
        // Convert to JSON string before storing
        const tokenJson = JSON.stringify(tokenData);
        // console.log('Storing token data:', tokenJson);
        
        // Store token with 24-hour expiration
        await redis.set(`user:setup:${token}`, tokenJson, { ex: 86400 }); // 24 hours
        
        console.log(`Password setup token stored for user: ${email}`);
        return true;
    } catch (error) {
        console.error('Error storing password setup token:', error);
        return false;
    }
};

/**
 * Validate password setup token and get user info
 * @param {string} token - Password setup token
 * @returns {Promise<{valid: boolean, email?: string, userUuid?: string}>}
 */
const validatePasswordSetupToken = async (token) => {
    try {
        console.log('🔍 Looking up token in Redis:', token);
        const rawTokenData = await redis.get(`user:setup:${token}`);
        console.log('🔍 Raw Redis data:', rawTokenData);
        
        if (!rawTokenData) {
            console.log('❌ Token not found in Redis');
            return { valid: false };
        }
        
        // If the data is already a string, use it directly, otherwise stringify it
        const tokenString = typeof rawTokenData === 'object' ? JSON.stringify(rawTokenData) : rawTokenData;
        console.log('🔍 Token string to parse:', tokenString);
        
        let tokenData;
        try {
            tokenData = JSON.parse(tokenString);
        } catch (e) {
            console.log('❌ Failed to parse token data:', e);
            console.log('Raw data type:', typeof rawTokenData);
            return { valid: false };
        }
        
        if (!tokenData || !tokenData.email || !tokenData.userUuid) {
            console.log('❌ Invalid token data structure:', tokenData);
            return { valid: false };
        }
        
        return {
            valid: true,
            email: tokenData.email,
            userUuid: tokenData.userUuid
        };
    } catch (error) {
        console.error('Error validating password setup token:', error);
        return { valid: false };
    }
};

/**
 * Complete password setup for a user
 * @param {string} token - Password setup token
 * @param {string} password - New password
 * @returns {Promise<{success: boolean, message: string}>}
 */
const completePasswordSetup = async (token, password) => {
    try {
        // Validate token
        const tokenData = await validatePasswordSetupToken(token);
        
        if (!tokenData.valid) {
            return {
                success: false,
                message: 'Invalid or expired token'
            };
        }
        
        // Store user credentials
        const credentialsStored = await storeUserCredentials(
            tokenData.email,
            password,
            tokenData.userUuid
        );
        
        if (!credentialsStored) {
            return {
                success: false,
                message: 'Failed to store user credentials'
            };
        }
        
        // Update user data to mark password setup as complete
        const usersData = await redis.get('users_data');
        if (usersData && Array.isArray(usersData)) {
            const userIndex = usersData.findIndex(u => u.uuid === tokenData.userUuid);
            if (userIndex !== -1) {
                usersData[userIndex] = {
                    ...usersData[userIndex],
                    password: await bcrypt.hash(password, 12),
                    passwordSetupRequired: false,
                    passwordSetupToken: null,
                    updatedAt: new Date().toISOString()
                };
                
                await redis.set('users_data', usersData);
            }
        }
        
        // Delete the setup token
        await redis.del(`user:setup:${token}`);
        
        return {
            success: true,
            message: 'Password setup completed successfully'
        };
    } catch (error) {
        console.error('Error completing password setup:', error);
        return {
            success: false,
            message: 'Failed to complete password setup'
        };
    }
};

/**
 * Update user password
 * @param {string} userUuid - User UUID
 * @param {string} newPassword - New password
 * @returns {Promise<boolean>} Success status
 */
const updateUserPassword = async (userUuid, newPassword) => {
    try {
        // Get user data
        const usersData = await redis.get('users_data');
        if (!usersData || !Array.isArray(usersData)) {
            return false;
        }
        
        const userIndex = usersData.findIndex(u => u.uuid === userUuid);
        if (userIndex === -1) {
            return false;
        }
        
        const user = usersData[userIndex];
        
        // Hash new password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        
        // Update user data
        usersData[userIndex] = {
            ...user,
            password: hashedPassword,
            updatedAt: new Date().toISOString()
        };
        
        // Save to Redis
        await redis.set('users_data', usersData);
        
        // Update auth credentials
        await redis.set(`user:auth:${user.email.toLowerCase()}`, {
            hashedPassword,
            userUuid,
            createdAt: new Date().toISOString()
        });
        
        console.log(`Password updated for user: ${user.email}`);
        return true;
        
    } catch (error) {
        console.error('Error updating user password:', error);
        return false;
    }
};

/**
 * Get user UUID by email
 * @param {string} email - User email address
 * @returns {Promise<string|null>} User UUID or null if not found
 */
const getUserUuidByEmail = async (email) => {
    try {
        const userUuid = await redis.get(`user:email:${email.toLowerCase()}`);
        return userUuid;
    } catch (error) {
        console.error('Error getting user UUID by email:', error);
        return null;
    }
};

/**
 * Remove user credentials
 * @param {string} email - User email address
 * @returns {Promise<boolean>} Success status
 */
const removeUserCredentials = async (email) => {
    try {
        // Remove all user-related data
        await redis.del(`user:email:${email.toLowerCase()}`);
        await redis.del(`user:auth:${email.toLowerCase()}`);
        
        console.log(`User credentials removed for email: ${email}`);
        return true;
    } catch (error) {
        console.error('Error removing user credentials:', error);
        return false;
    }
};

module.exports = {
    storeUserCredentials,
    authenticateUser,
    validateUserActiveStatus,
    generatePasswordSetupToken,
    storePasswordSetupToken,
    validatePasswordSetupToken,
    completePasswordSetup,
    updateUserPassword,
    getUserUuidByEmail,
    removeUserCredentials
};
