/**
 * Debug script to check quotes in Redis and clientId matching
 */
const { Redis } = require('@upstash/redis');
require('dotenv').config();

// Initialize Redis client
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

const QUOTES_KEY = 'quotes_data';

async function debugQuotesClientId() {
    console.log('🔍 Debugging Quotes ClientId Matching');
    console.log('=====================================\n');

    try {
        // 1. Read all quotes from Redis
        console.log('1️⃣ Reading quotes from Redis...');
        const quotesData = await redis.get(QUOTES_KEY);
        
        if (!quotesData || quotesData.length === 0) {
            console.log('   ❌ No quotes found in Redis');
            console.log('   💡 This explains why dashboard shows 0 quotes');
            return;
        }

        console.log(`   ✅ Found ${quotesData.length} quotes in Redis`);

        // 2. Show all quotes and their clientIds
        console.log('\n2️⃣ Quotes in Redis:');
        quotesData.forEach((quote, index) => {
            console.log(`   Quote ${index + 1}:`);
            console.log(`     - ID: ${quote.id}`);
            console.log(`     - Title: ${quote.title}`);
            console.log(`     - ClientId: "${quote.clientId}"`);
            console.log(`     - Status: ${quote.status}`);
            console.log('');
        });

        // 3. Get unique clientIds
        console.log('3️⃣ Unique Client IDs in quotes:');
        const uniqueClientIds = [...new Set(quotesData.map(q => q.clientId))];
        uniqueClientIds.forEach(clientId => {
            const count = quotesData.filter(q => q.clientId === clientId).length;
            console.log(`   - "${clientId}" (${count} quotes)`);
        });

        // 4. Instructions for testing
        console.log('\n4️⃣ Testing Instructions:');
        console.log('To test the dashboard, use one of these client IDs:');
        uniqueClientIds.forEach(clientId => {
            console.log(`   - http://localhost:3000/client?clientId=${clientId}`);
        });

        console.log('\n📝 NOTES:');
        console.log('- If dashboard shows 0, the clientId in the URL doesn\'t match any quotes');
        console.log('- Check browser network tab to see what clientId is being sent to dashboard-stats');
        console.log('- Make sure the clientId in the URL matches one of the clientIds above');

    } catch (error) {
        console.error('❌ Error debugging quotes:', error);
    }
}

debugQuotesClientId();
