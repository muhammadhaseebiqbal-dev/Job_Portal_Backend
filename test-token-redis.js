const { generatePasswordSetupToken, validatePasswordSetupToken, consumePasswordSetupToken } = require('./src/utils/clientCredentialsManager');

async function testTokenFlow() {
    console.log('🧪 Testing Password Setup Token Flow...\n');
    
    const testEmail = 'test@example.com';
    const testClientUuid = 'test-client-uuid-123';
    
    try {
        // 1. Generate a token
        console.log('1️⃣ Generating token...');
        const token = await generatePasswordSetupToken(testEmail, testClientUuid);
        
        if (!token) {
            console.error('❌ Failed to generate token');
            return;
        }
        
        console.log(`✅ Token generated: ${token.substring(0, 10)}...\n`);
        
        // 2. Validate the token (non-consuming)
        console.log('2️⃣ Validating token (non-consuming)...');
        const validationResult = await validatePasswordSetupToken(token);
        
        console.log('Validation result:', validationResult);
        
        if (!validationResult.valid) {
            console.error('❌ Token validation failed');
            return;
        }
        
        console.log('✅ Token validation successful\n');
        
        // 3. Validate the token again to ensure it's still there
        console.log('3️⃣ Validating token again (should still exist)...');
        const secondValidation = await validatePasswordSetupToken(token);
        console.log('Second validation result:', secondValidation);
        
        if (!secondValidation.valid) {
            console.error('❌ Second validation failed - token should still exist');
            return;
        }
        
        console.log('✅ Second validation successful\n');
        
        // 4. Consume the token (should delete it)
        console.log('4️⃣ Consuming token (should delete it)...');
        const consumeResult = await consumePasswordSetupToken(token);
        
        console.log('Consume result:', consumeResult);
        
        if (!consumeResult.valid) {
            console.error('❌ Token consumption failed');
            return;
        }
        
        console.log('✅ Token consumption successful\n');
        
        // 5. Try to validate the consumed token (should fail)
        console.log('5️⃣ Validating consumed token (should fail)...');
        const finalValidation = await validatePasswordSetupToken(token);
        console.log('Final validation result:', finalValidation);
        
        if (finalValidation.valid) {
            console.error('❌ Token should have been deleted after consumption');
            return;
        }
        
        console.log('✅ Token correctly deleted after consumption\n');
        
        console.log('🎉 All tests passed! Token flow is working correctly.');
        
    } catch (error) {
        console.error('❌ Test failed with error:', error);
    }
}

// Run the test
testTokenFlow().then(() => {
    console.log('\n✅ Test completed');
    process.exit(0);
}).catch(error => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
});
