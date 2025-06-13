const { Redis } = require('@upstash/redis');
require('dotenv').config();

// Initialize Redis client
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

async function resetTokens() {
    try {
        console.log('🔄 Resetting ServiceM8 OAuth tokens...\n');
        
        // Clear tokens from Redis
        await redis.del('servicem8:tokens');
        console.log('✅ Tokens cleared from Redis');
        
        console.log('\n📋 Next steps:');
        console.log('1. Start your server: npm start (or node index.js)');
        console.log('2. Visit: http://localhost:5000/auth/servicem8');
        console.log('3. Complete the OAuth authorization flow');
        console.log('4. Your new tokens will be automatically saved');
        
        console.log('\n💡 Note: Make sure your server is running before visiting the auth URL');
        console.log('   The auth route will handle the OAuth flow and save new tokens.\n');
        
    } catch (error) {
        console.error('❌ Error resetting tokens:', error);
        
        if (error.message.includes('KV_REST_API')) {
            console.error('\n🔧 Redis connection failed. Please check:');
            console.error('   - KV_REST_API_URL is set in your environment variables');
            console.error('   - KV_REST_API_TOKEN is set in your environment variables');
        }
    }
}

// Check if environment variables are properly set
function checkEnvironment() {
    const requiredVars = [
        'SERVICEM8_CLIENT_ID',
        'SERVICEM8_CLIENT_SECRET', 
        'KV_REST_API_URL',
        'KV_REST_API_TOKEN'
    ];
    
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
        console.error('❌ Missing required environment variables:');
        missing.forEach(varName => console.error(`   - ${varName}`));
        console.error('\n🔧 Please create a .env file with these variables or set them in your environment.');
        return false;
    }
    
    console.log('✅ All required environment variables are set');
    return true;
}

// Main execution
async function main() {
    console.log('🚀 ServiceM8 Token Reset Utility\n');
    
    if (checkEnvironment()) {
        await resetTokens();
    }
}

main().catch(console.error);
