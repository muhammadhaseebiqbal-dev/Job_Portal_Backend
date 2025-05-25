const { Redis } = require('@upstash/redis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Initialize Redis client
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

async function resetTokens() {
    try {
        console.log('🔄 Resetting ServiceM8 tokens...');
        
        // Clear tokens from Redis
        await redis.del('servicem8:tokens');
        console.log('✅ Cleared tokens from Redis');
        
        // Clear tokens from local JSON file
        const tokenFilePath = path.join(__dirname, 'data', 'TokensData.json');
        const emptyTokenData = {
            "access_token": "",
            "expires_in": 0,
            "token_type": "bearer",
            "scope": "",
            "refresh_token": "",
            "expires_at": 0
        };
        
        fs.writeFileSync(tokenFilePath, JSON.stringify(emptyTokenData, null, 2));
        console.log('✅ Cleared tokens from local file');
        
        console.log('\n🔗 To get new tokens, visit:');
        console.log(`http://localhost:5000/auth/servicem8`);
        console.log('\nThis will redirect you to ServiceM8 for authorization and generate fresh tokens.');
        
    } catch (error) {
        console.error('❌ Error resetting tokens:', error);
    }
}

resetTokens();
