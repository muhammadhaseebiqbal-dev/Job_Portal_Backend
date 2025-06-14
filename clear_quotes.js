const { Redis } = require('@upstash/redis');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});

const QUOTES_KEY = 'quotes_data'; // Redis key for storing quotes

async function clearQuotes() {
    try {
        console.log('🔍 Checking current quotes data...');
        
        // First, let's see what's currently stored
        const currentQuotes = await redis.get(QUOTES_KEY);
        
        if (!currentQuotes || currentQuotes.length === 0) {
            console.log('✅ No quotes found in Upstash Redis. Database is already clean.');
            return;
        }
        
        console.log(`📊 Found ${currentQuotes.length} quotes in the database:`);
        currentQuotes.forEach((quote, index) => {
            console.log(`   ${index + 1}. ${quote.id} - "${quote.title}" (${quote.status})`);
        });
        
        console.log('\n🗑️  Clearing all quotes from Upstash Redis...');
        
        // Delete the quotes data by setting an empty array
        await redis.set(QUOTES_KEY, []);
        
        console.log('✅ Successfully cleared all quotes from Upstash Redis!');
        
        // Verify the deletion
        const verifyQuotes = await redis.get(QUOTES_KEY);
        console.log(`🔍 Verification: Database now contains ${verifyQuotes.length} quotes.`);
        
    } catch (error) {
        console.error('❌ Error clearing quotes:', error);
        
        if (error.message.includes('UPSTASH_REDIS_REST_URL')) {
            console.log('\n💡 Make sure you have set the following environment variables:');
            console.log('   - UPSTASH_REDIS_REST_URL');
            console.log('   - UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_TOKEN)');
        }
    }
}

async function showCurrentQuotes() {
    try {
        console.log('🔍 Current quotes in Upstash Redis:');
        
        const quotes = await redis.get(QUOTES_KEY);
        
        if (!quotes || quotes.length === 0) {
            console.log('   No quotes found.');
            return;
        }
        
        console.log(`   Found ${quotes.length} quotes:`);
        quotes.forEach((quote, index) => {
            console.log(`   ${index + 1}. ID: ${quote.id}`);
            console.log(`      Title: ${quote.title}`);
            console.log(`      Client: ${quote.clientName || 'Unknown'}`);
            console.log(`      Status: ${quote.status}`);
            console.log(`      Price: $${quote.price}`);
            console.log(`      Created: ${new Date(quote.createdAt).toLocaleDateString()}`);
            console.log('');
        });
        
    } catch (error) {
        console.error('❌ Error fetching quotes:', error);
    }
}

// Check command line arguments
const command = process.argv[2];

if (command === 'show' || command === 'list') {
    showCurrentQuotes();
} else if (command === 'clear' || command === 'delete') {
    clearQuotes();
} else {
    console.log('🧹 Quote Database Management Tool');
    console.log('');
    console.log('Usage:');
    console.log('  node clear_quotes.js show    - Show current quotes in database');
    console.log('  node clear_quotes.js clear   - Clear all quotes from database');
    console.log('');
    console.log('Examples:');
    console.log('  node clear_quotes.js show');
    console.log('  node clear_quotes.js clear');
}
