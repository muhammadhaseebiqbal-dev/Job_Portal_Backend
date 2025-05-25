const { readTokenData, needsProactiveRefresh } = require('./src/utils/tokenManager');
require('dotenv').config();

async function checkTokenStatus() {
    try {
        console.log('🔍 Checking ServiceM8 token status...\n');
        
        const tokenData = await readTokenData();
        
        if (!tokenData.access_token) {
            console.log('❌ No access token found');
            console.log('🔧 Run: node reset_tokens.js');
            console.log('🔗 Then visit: http://localhost:5000/auth/servicem8');
            return;
        }
        
        console.log(`📊 Token Details:`);
        console.log(`   Access Token: ${tokenData.access_token.substring(0, 20)}...`);
        console.log(`   Refresh Token: ${tokenData.refresh_token ? tokenData.refresh_token.substring(0, 20) + '...' : 'Not available'}`);
        
        if (tokenData.expires_at) {
            const now = Date.now();
            const expiryTime = tokenData.expires_at;
            const timeLeft = Math.floor((expiryTime - now) / 60000); // minutes
            
            console.log(`   Expires At: ${new Date(expiryTime).toLocaleString()}`);
            console.log(`   Time Left: ${timeLeft} minutes`);
            
            if (timeLeft <= 0) {
                console.log('❌ Token has expired');
            } else if (timeLeft <= 5) {
                console.log(`⚠️  Token expires very soon: ${timeLeft} minutes`);
            } else {
                console.log(`✅ Token expiry is healthy: ${timeLeft} minutes remaining`);
            }
        }
        
        if (tokenData.last_refreshed) {
            const timeSinceRefresh = Date.now() - tokenData.last_refreshed;
            const minutesSinceRefresh = Math.floor(timeSinceRefresh / 60000);
            const secondsSinceRefresh = Math.floor(timeSinceRefresh / 1000);
            
            console.log(`   Last Refreshed: ${new Date(tokenData.last_refreshed).toLocaleString()}`);
            console.log(`   Time Since Refresh: ${minutesSinceRefresh} minutes (${secondsSinceRefresh} seconds)`);
            
            // Check proactive refresh need
            const needsRefresh = await needsProactiveRefresh();
            const refreshIntervalSeconds = 3000;
            const nextRefreshIn = Math.max(0, refreshIntervalSeconds - secondsSinceRefresh);
            
            if (needsRefresh) {
                console.log('🔄 Token needs proactive refresh (3000 seconds elapsed)');
            } else {
                console.log(`⏰ Next proactive refresh in: ${nextRefreshIn} seconds (${Math.floor(nextRefreshIn/60)} minutes)`);
            }
        } else {
            console.log('⚠️  No refresh timestamp found - token may need refresh');
        }
        
        console.log('\n📋 Enhanced Token Monitoring Settings:');
        console.log('   - Proactive refresh interval: 3000 seconds (50 minutes)');
        console.log('   - Monitor check interval: 60 seconds');
        console.log('   - Emergency refresh threshold: 5 minutes before expiry');
        
    } catch (error) {
        console.error('❌ Error checking token status:', error);
    }
}

checkTokenStatus();