const axios = require('axios');
require('dotenv').config();
const { Redis } = require('@upstash/redis');

// Initialize Redis client using environment variables from Upstash integration
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

// Calculate token expiry
const calculateTokenExpiry = (expiresIn) => {
    // Convert expires_in to milliseconds and add to current time
    return Date.now() + (expiresIn * 1000);
};

// Helper function to read token data from Redis
const readTokenData = async () => {
    try {
        // Try to get from Redis
        const tokens = await redis.get('servicem8:tokens');
        if (tokens) {
            // console.log("token:",tokens);
            
            return tokens;
        }
        
        // Fallback to environment variables if Redis returns nothing
        return {
            access_token: process.env.SERVICEM8_ACCESS_TOKEN || '',
            refresh_token: process.env.SERVICEM8_REFRESH_TOKEN || '',
            expires_in: 0,
            expires_at: 0
        };
    } catch (error) {
        console.error('Error reading from Redis, using env variables:', error);
        // If Redis fails, fall back to environment variables
        return {
            access_token: process.env.SERVICEM8_ACCESS_TOKEN || '',
            refresh_token: process.env.SERVICEM8_REFRESH_TOKEN || '',
            expires_in: 0,
            expires_at: 0
        };
    }
};

// Helper function to write token data to Redis
const writeTokenData = async (data) => {
    try {
        // Store in Redis
        await redis.set('servicem8:tokens', data);
        console.log('Tokens stored in Redis');
        return true;
    } catch (error) {
        console.error('Error writing to Redis:', error);
        return false;
    }
};

// Check if token is expired or about to expire (within 5 minutes)
const isTokenExpired = async () => {
    try {
        const tokenData = await readTokenData();
        if (!tokenData.expires_at) return true;
        
        // Check if token expires in less than 5 minutes
        const fiveMinutesInMs = 5 * 60 * 1000;
        return Date.now() + fiveMinutesInMs > tokenData.expires_at;
    } catch (error) {
        console.error('Error checking token expiry:', error);
        return true; // Assume expired if there's an error
    }
};

// Function to refresh access token
let refreshInProgress = false; // Prevent concurrent refresh attempts

const refreshAccessToken = async () => {
    // Prevent concurrent refresh attempts
    if (refreshInProgress) {
        console.log('Token refresh already in progress, waiting...');
        // Wait for ongoing refresh to complete
        while (refreshInProgress) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        // Return the potentially new token
        const tokenData = await readTokenData();
        return tokenData.access_token;
    }
    
    refreshInProgress = true;
    
    try {
        const tokenData = await readTokenData();
        const client_id = process.env.SERVICEM8_CLIENT_ID;
        const client_secret = process.env.SERVICEM8_CLIENT_SECRET;
        const { refresh_token } = tokenData;

        if (!client_id || !client_secret || !refresh_token) {
            throw new Error('Missing client_id, client_secret, or refresh_token. Please check your environment variables.');
        }

        console.log('Refreshing access token...');
        
        const formData = new URLSearchParams({
            grant_type: 'refresh_token',
            client_id,
            client_secret,
            refresh_token
        });

        const response = await axios.post(
            'https://go.servicem8.com/oauth/access_token',
            formData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }
        );

        const { access_token, refresh_token: newRefreshToken, expires_in } = response.data;

        // Calculate when the token will expire
        const expires_at = calculateTokenExpiry(expires_in);

        // Update the tokens in Redis
        const newTokenData = {
            ...tokenData,
            access_token,
            refresh_token: newRefreshToken || refresh_token, // Use new refresh token if provided
            expires_in,
            expires_at
        };
        
        await writeTokenData(newTokenData);
        // console.log('Token refreshed successfully. Expires in:', expires_in, 'seconds');        
        return access_token;
    } catch (error) {
        console.error('Error refreshing access token:', error.response?.data || error.message);

        if (error.response?.data?.error === 'invalid_grant') {
            console.error('⚠️  The refresh token is invalid or has already been used.');
            console.error('🔧 To fix this, run: node reset_tokens.js');
            console.error('🔗 Then visit: http://localhost:5000/auth/servicem8 to get new tokens');
            
            // Clear invalid tokens to prevent retry loops
            const invalidTokenData = {
                access_token: '',
                refresh_token: '',
                expires_in: 0,
                expires_at: 0
            };
            await writeTokenData(invalidTokenData);
        }

        if (error.response?.data?.error === 'invalid_client') {
            console.error('The client credentials are invalid. Please verify the client_id and client_secret in the environment variables.');
        }

        throw error;
    } finally {
        refreshInProgress = false; // Reset the flag regardless of success or failure
    }
};

// Get a valid access token (refreshes if needed)
const getValidAccessToken = async () => {
    try {
        const tokenData = await readTokenData();
        
        // If no token exists or token is expired, refresh it
        if (!tokenData.access_token || await isTokenExpired()) {
            return await refreshAccessToken();
        }
        
        return tokenData.access_token;
    } catch (error) {
        console.error('Error getting valid access token:', error);
        throw error;
    }
};

// Function to start token monitoring
const startTokenMonitor = () => {
    let consecutiveFailures = 0;
    const maxConsecutiveFailures = 3;
    
    // Initially check token and refresh if needed
    getValidAccessToken()
        .then(() => {
            consecutiveFailures = 0;
            console.log('✅ Initial token validation successful');
        })
        .catch(err => {
            console.error('❌ Initial token check failed:', err.message);
            consecutiveFailures++;
        });
    
    // Check token every minute
    const intervalId = setInterval(async () => {
        try {
            // Skip monitoring if we've had too many consecutive failures
            if (consecutiveFailures >= maxConsecutiveFailures) {
                console.log('⏸️  Token monitoring paused due to consecutive failures. Please reset tokens.');
                return;
            }
            
            if (await isTokenExpired()) {
                await refreshAccessToken();
                consecutiveFailures = 0; // Reset failure count on success
            }
        } catch (error) {
            consecutiveFailures++;
            console.error(`❌ Error in token monitor (${consecutiveFailures}/${maxConsecutiveFailures}):`, error.message);
            
            if (consecutiveFailures >= maxConsecutiveFailures) {
                console.error('🛑 Too many consecutive token failures. Pausing automatic refresh.');
                console.error('🔧 Please run: node reset_tokens.js to reset and get new tokens');
            }
        }
    }, 60000); // Check every minute
    
    return intervalId;
};

module.exports = { 
    readTokenData, 
    writeTokenData, 
    refreshAccessToken, 
    isTokenExpired,
    getValidAccessToken,
    startTokenMonitor,
    calculateTokenExpiry
};