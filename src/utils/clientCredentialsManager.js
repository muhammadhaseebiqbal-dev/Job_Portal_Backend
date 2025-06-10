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
 * @param {Object} servicem8 - ServiceM8 API instance (optional, for active status check)
 * @returns {Promise<{success: boolean, clientUuid?: string, message: string}>}
 */
const authenticateClient = async (email, password, servicem8 = null) => {
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
        
        // Check if client is active in ServiceM8 (if servicem8 instance provided)
        if (servicem8) {
            try {
                const { data: clientData } = await servicem8.getCompanySingle({ 
                    uuid: authData.clientUuid 
                });
                
                // Check if client is deactivated
                if (!clientData || clientData.active === 0) {
                    console.log(`Authentication blocked: Client ${authData.clientUuid} is deactivated`);
                    return {
                        success: false,
                        message: 'Your account has been deactivated. Please contact support.'
                    };
                }
            } catch (fetchError) {
                console.error('Error checking client active status:', fetchError);
                // Continue with authentication if ServiceM8 check fails to avoid blocking valid users
                // But log this for security monitoring
                console.warn('WARNING: Could not verify client active status during authentication');
            }
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
        console.log('🔄 Generating setup token for:', { email, clientUuid });
        
        // Generate a random token
        const token = require('crypto').randomBytes(32).toString('hex');
        console.log('📝 Generated token:', token.substring(0, 10) + '...');
        
        const tokenData = {
            email: email.toLowerCase(),
            clientUuid,
            createdAt: new Date().toISOString()
        };
        
        console.log('💾 Storing token data:', {
            redisKey: `client:setup:${token}`,
            email: tokenData.email,
            clientUuid: tokenData.clientUuid,
            expiry: '24 hours'
        });
        
        // Store token with expiration (24 hours)
        await redis.setex(`client:setup:${token}`, 24 * 60 * 60, tokenData);
        
        // Verify the token was stored correctly
        const verifyData = await redis.get(`client:setup:${token}`);
        console.log('✅ Token storage verification:', {
            stored: !!verifyData,
            data: verifyData ? { email: verifyData.email, clientUuid: verifyData.clientUuid } : null
        });
        
        return token;
    } catch (error) {
        console.error('❌ Error generating setup token:', error);
        return null;
    }
};

/**
 * Validate password setup token (non-consuming)
 * @param {string} token - Setup token
 * @returns {Promise<{valid: boolean, email?: string, clientUuid?: string}>}
 */
const validatePasswordSetupToken = async (token) => {
    try {
        console.log('🔍 Token validation debug:', {
            token: token ? token.substring(0, 10) + '...' : 'null/undefined',
            tokenLength: token?.length,
            tokenType: typeof token,
            redisKey: `client:setup:${token}`
        });
        
        if (!token) {
            console.log('❌ No token provided to validation function');
            return { valid: false, message: 'No token provided' };
        }
        
        const tokenData = await redis.get(`client:setup:${token}`);
        console.log('🔍 Redis lookup result:', {
            found: !!tokenData,
            data: tokenData ? { email: tokenData.email, clientUuid: tokenData.clientUuid } : null
        });
        
        if (!tokenData) {
            console.log('❌ Token not found in Redis');
            return { valid: false, message: 'Token not found or expired' };
        }
        
        console.log('✅ Token validation successful:', { email: tokenData.email });
        return {
            valid: true,
            email: tokenData.email,
            clientUuid: tokenData.clientUuid
        };
    } catch (error) {
        console.error('❌ Error validating setup token:', error);
        return { valid: false, message: 'Validation error' };
    }
};

/**
 * Consume password setup token (validates and deletes)
 * @param {string} token - Setup token
 * @returns {Promise<{valid: boolean, email?: string, clientUuid?: string}>}
 */
const consumePasswordSetupToken = async (token) => {
    try {
        console.log('🔄 Consuming setup token:', {
            token: token ? token.substring(0, 10) + '...' : 'null/undefined',
            tokenLength: token?.length,
            redisKey: `client:setup:${token}`
        });
        
        if (!token) {
            console.log('❌ No token provided to consume function');
            return { valid: false, message: 'No token provided' };
        }
        
        const tokenData = await redis.get(`client:setup:${token}`);
        console.log('🔍 Token data found:', {
            found: !!tokenData,
            data: tokenData ? { email: tokenData.email, clientUuid: tokenData.clientUuid } : null
        });
        
        if (!tokenData) {
            console.log('❌ Token not found in Redis during consumption');
            return { valid: false, message: 'Token not found or expired' };
        }
        
        // Delete the token after validation (single use)
        console.log('🗑️ Deleting token after consumption...');
        await redis.del(`client:setup:${token}`);
        
        console.log('✅ Token consumed successfully:', { email: tokenData.email });
        return {
            valid: true,
            email: tokenData.email,
            clientUuid: tokenData.clientUuid
        };
    } catch (error) {
        console.error('❌ Error consuming setup token:', error);
        return { valid: false, message: 'Consumption error' };
    }
};

/**
 * Validate client active status with ServiceM8
 * @param {string} clientUuid - Client UUID
 * @param {Object} servicem8 - ServiceM8 API instance
 * @returns {Promise<{isActive: boolean, message?: string}>}
 */
const validateClientActiveStatus = async (clientUuid, servicem8) => {
    try {
        const { data: clientData } = await servicem8.getCompanySingle({ 
            uuid: clientUuid 
        });
        
        if (!clientData) {
            return {
                isActive: false,
                message: 'Client not found'
            };
        }
        
        if (clientData.active === 0) {
            return {
                isActive: false,
                message: 'Client account has been deactivated'
            };
        }
        
        return {
            isActive: true
        };
    } catch (error) {
        console.error('Error validating client active status:', error);
        // In case of ServiceM8 API errors, we should fail secure
        return {
            isActive: false,
            message: 'Unable to verify account status'
        };
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
    validatePasswordSetupToken,
    consumePasswordSetupToken,
    validateClientActiveStatus
};
