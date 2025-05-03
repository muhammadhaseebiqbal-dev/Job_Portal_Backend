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

        const { access_token, refresh_token: newRefreshToken } = response.data;

        // Update the tokens file with the new refresh token
        tokenData.refresh_token = newRefreshToken;
        writeTokenData(tokenData);

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

// Function to refresh the token every 2 seconds
const startTokenRefresh = () => {
    setInterval(async () => {
        try {
            console.log('Refreshing access token...');
            await refreshAccessToken();
        } catch (error) {
            console.error('Error refreshing access token:', error);
        }
    }, 2000);
};

module.exports = { readTokenData, writeTokenData, refreshAccessToken, startTokenRefresh };