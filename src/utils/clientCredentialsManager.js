const { Redis } = require('@upstash/redis');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Initialize Redis client using environment variables from Upstash integration
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

/**
 * Store client credentials (email-password mapping linked to UUID)
 * @param {string} email - Client email address
 * @param {string} password - Plain text password (will be hashed)
 * @param {string} clientUuid - ServiceM8 client UUID
 * @returns {Promise<boolean>} Success status
 */
const storeClientCredentials = async (email, password, clientUuid) => {
    try {
        // Hash the password before storing
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Store email-to-UUID mapping
        await redis.set(`client:email:${email.toLowerCase()}`, clientUuid);
        
        // Store email-password mapping
        await redis.set(`client:auth:${email.toLowerCase()}`, {
            hashedPassword,
            clientUuid,
            createdAt: new Date().toISOString()
        });
        
        console.log(`Client credentials stored for email: ${email}`);
        return true;
    } catch (error) {
        console.error('Error storing client credentials:', error);
        return false;
    }
};

/**
 * Authenticate client with email and password
 * @param {string} email - Client email address
 * @param {string} password - Plain text password
 * @returns {Promise<{success: boolean, clientUuid?: string, message: string}>}
 */
const authenticateClient = async (email, password) => {
    try {
        // Get authentication data
        const authData = await redis.get(`client:auth:${email.toLowerCase()}`);
        
        if (!authData) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, authData.hashedPassword);
        
        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }
        
        return {
            success: true,
            clientUuid: authData.clientUuid,
            message: 'Authentication successful'
        };
    } catch (error) {
        console.error('Error authenticating client:', error);
        return {
            success: false,
            message: 'Authentication failed due to server error'
        };
    }
};

/**
 * Check if client credentials exist for an email
 * @param {string} email - Client email address
 * @returns {Promise<boolean>}
 */
const credentialsExist = async (email) => {
    try {
        const authData = await redis.get(`client:auth:${email.toLowerCase()}`);
        return !!authData;
    } catch (error) {
        console.error('Error checking credentials existence:', error);
        return false;
    }
};

/**
 * Get client UUID by email
 * @param {string} email - Client email address
 * @returns {Promise<string|null>}
 */
const getClientUuidByEmail = async (email) => {
    try {
        const clientUuid = await redis.get(`client:email:${email.toLowerCase()}`);
        return clientUuid;
    } catch (error) {
        console.error('Error getting client UUID by email:', error);
        return null;
    }
};

/**
 * Update client password
 * @param {string} email - Client email address
 * @param {string} newPassword - New plain text password
 * @returns {Promise<boolean>}
 */
const updateClientPassword = async (email, newPassword) => {
    try {
        // Get existing auth data
        const authData = await redis.get(`client:auth:${email.toLowerCase()}`);
        
        if (!authData) {
            return false;
        }
        
        // Hash the new password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        
        // Update the password while preserving other data
        await redis.set(`client:auth:${email.toLowerCase()}`, {
            ...authData,
            hashedPassword,
            updatedAt: new Date().toISOString()
        });
        
        return true;
    } catch (error) {
        console.error('Error updating client password:', error);
        return false;
    }
};

/**
 * Remove client credentials
 * @param {string} email - Client email address
 * @returns {Promise<boolean>}
 */
const removeClientCredentials = async (email) => {
    try {
        await redis.del(`client:email:${email.toLowerCase()}`);
        await redis.del(`client:auth:${email.toLowerCase()}`);
        return true;
    } catch (error) {
        console.error('Error removing client credentials:', error);
        return false;
    }
};

/**
 * Generate a password setup token for new clients
 * @param {string} email - Client email address
 * @param {string} clientUuid - Client UUID
 * @returns {Promise<string>} Setup token
 */
const generatePasswordSetupToken = async (email, clientUuid) => {
    try {
        // Generate a random token
        const token = require('crypto').randomBytes(32).toString('hex');
        
        // Store token with expiration (24 hours)
        await redis.setex(`client:setup:${token}`, 24 * 60 * 60, {
            email: email.toLowerCase(),
            clientUuid,
            createdAt: new Date().toISOString()
        });
        
        return token;
    } catch (error) {
        console.error('Error generating setup token:', error);
        return null;
    }
};

/**
 * Validate and consume password setup token
 * @param {string} token - Setup token
 * @returns {Promise<{valid: boolean, email?: string, clientUuid?: string}>}
 */
const validatePasswordSetupToken = async (token) => {
    try {
        const tokenData = await redis.get(`client:setup:${token}`);
        
        if (!tokenData) {
            return { valid: false };
        }
        
        // Delete the token after validation (single use)
        await redis.del(`client:setup:${token}`);
        
        return {
            valid: true,
            email: tokenData.email,
            clientUuid: tokenData.clientUuid
        };
    } catch (error) {
        console.error('Error validating setup token:', error);
        return { valid: false };
    }
};

module.exports = {
    storeClientCredentials,
    authenticateClient,
    credentialsExist,
    getClientUuidByEmail,
    updateClientPassword,
    removeClientCredentials,
    generatePasswordSetupToken,
    validatePasswordSetupToken
};
