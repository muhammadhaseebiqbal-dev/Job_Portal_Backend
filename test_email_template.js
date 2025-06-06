const { getEmailTemplate } = require('./src/utils/emailTemplates');

console.log('Testing clientWelcome email template...');

// Test 1: Complete data (what should work)
const testDataComplete = {
    clientName: 'John Doe',
    email: 'john.doe@example.com',
    setupUrl: 'http://localhost:3000/password-setup?token=test123',
    address: '123 Test St, Test City, Test State, 12345, Test Country',
    phone: '+1234567890'
};

// Test 2: Missing email (what might be happening)
const testDataMissingEmail = {
    clientName: 'John Doe',
    setupUrl: 'http://localhost:3000/password-setup?token=test123',
    address: '123 Test St, Test City, Test State, 12345, Test Country',
    phone: '+1234567890'
};

// Test 3: Undefined email (another possibility)
const testDataUndefinedEmail = {
    clientName: 'John Doe',
    email: undefined,
    setupUrl: 'http://localhost:3000/password-setup?token=test123',
    address: '123 Test St, Test City, Test State, 12345, Test Country',
    phone: '+1234567890'
};

function testTemplate(testData, testName) {
    console.log(`\n=== ${testName} ===`);
    console.log('Test data:', JSON.stringify(testData, null, 2));

    try {
        const template = getEmailTemplate('clientWelcome', testData);
        
        // Check if email appears as undefined in the HTML
        if (template.html.includes('undefined')) {
            console.log('\n❌ ISSUE FOUND: Email appears as "undefined" in template');
            console.log('Searching for undefined instances...');
            const lines = template.html.split('\n');
            lines.forEach((line, index) => {
                if (line.includes('undefined')) {
                    console.log(`Line ${index + 1}: ${line.trim()}`);
                }
            });
        } else {
            console.log('\n✅ Email template looks good - no "undefined" found');
        }
        
    } catch (error) {
        console.error('Error testing email template:', error);
    }
}

testTemplate(testDataComplete, 'TEST 1: Complete Data');
testTemplate(testDataMissingEmail, 'TEST 2: Missing Email Field');
testTemplate(testDataUndefinedEmail, 'TEST 3: Undefined Email Field');
