const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const tokensDataPath = path.join(__dirname, '../../data/TokensData.json');

// Helper function to read token data
const readTokenData = () => {
    if (fs.existsSync(tokensDataPath)) {
        const data = fs.readFileSync(tokensDataPath);
        return JSON.parse(data);
    }
    return {};
};

// Helper function to write token data
const writeTokenData = (data) => {
    fs.writeFileSync(tokensDataPath, JSON.stringify(data, null, 2));
};

// Calculate token expiry
const calculateTokenExpiry = (expiresIn) => {
    // Convert expires_in to milliseconds and add to current time
    return Date.now() + (expiresIn * 1000);
};

// Check if token is expired or about to expire (within 5 minutes)
const isTokenExpired = () => {
    try {
        const tokenData = readTokenData();
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
const refreshAccessToken = async () => {
    try {
        const tokenData = readTokenData();
        const client_id = process.env.SERVICEM8_CLIENT_ID;
        const client_secret = process.env.SERVICEM8_CLIENT_SECRET;
        const { refresh_token } = tokenData;

        if (!client_id || !client_secret || !refresh_token) {
            throw new Error('Missing client_id, client_secret, or refresh_token. Please check your .env file and TokensData.json.');
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

        // Update the tokens file with the new tokens and expiry
        const newTokenData = {
            ...tokenData,
            access_token,
            refresh_token: newRefreshToken,
            expires_in,
            expires_at
        };
        
        writeTokenData(newTokenData);
        console.log('Token refreshed successfully. Expires in:', expires_in, 'seconds');
        
        return access_token;
    } catch (error) {
        console.error('Error refreshing access token:', error.response?.data || error.message);

        if (error.response?.data?.error === 'invalid_grant') {
            console.error('The refresh token is invalid or has already been used. Please generate a new refresh token.');
        }

        if (error.response?.data?.error === 'invalid_client') {
            console.error('The client credentials are invalid. Please verify the client_id and client_secret in the .env file.');
        }

        throw error;
    }
};

// Get a valid access token (refreshes if needed)
const getValidAccessToken = async () => {
    try {
        const tokenData = readTokenData();
        
        // If no token exists or token is expired, refresh it
        if (!tokenData.access_token || isTokenExpired()) {
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
    // Initially check token and refresh if needed
    getValidAccessToken().catch(err => console.error('Initial token check failed:', err));
    
    // Check token every minute
    const intervalId = setInterval(async () => {
        try {
            if (isTokenExpired()) {
                await refreshAccessToken();
            }
        } catch (error) {
            console.error('Error in token monitor:', error);
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
    startTokenMonitor 
};