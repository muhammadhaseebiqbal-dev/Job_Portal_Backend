const { getEmailTemplate } = require('./src/utils/emailTemplates.js');

// Test with mock data to see what's being generated
const testData = {
    clientName: 'Test Client',
    email: 'test@example.com',
    setupUrl: 'http://localhost:3000/password-setup?token=abc123'
};

const template = getEmailTemplate('clientWelcome', testData);
console.log('=== EMAIL TEMPLATE TEST ===');
console.log('Subject:', template.subject);
console.log('\n=== CHECKING FOR UUID TRACES ===');
const hasUuid = template.html.toLowerCase().includes('uuid') || 
                template.html.toLowerCase().includes('id:') || 
                template.html.toLowerCase().includes('client id');
console.log('Contains UUID references:', hasUuid);

console.log('\n=== CHECKING SETUP URL ===');
const setupUrlRegex = /href="([^"]*setupUrl[^"]*)"/;
const setupUrlMatch = template.html.match(setupUrlRegex);
if (setupUrlMatch) {
    console.log('Setup URL in template:', setupUrlMatch[1]);
} else {
    console.log('Setup URL pattern not found, checking for actual URL...');
    const urlRegex = /href="([^"]*password-setup[^"]*)"/;
    const urlMatch = template.html.match(urlRegex);
    if (urlMatch) {
        console.log('Password setup URL found:', urlMatch[1]);
    } else {
        console.log('No password setup URL found!');
        // Let's see what href links we do have
        const allHrefs = template.html.match(/href="[^"]*"/g);
        console.log('All href attributes found:', allHrefs);
    }
}

console.log('\n=== CHECKING FOR UNDEFINED VALUES ===');
const hasUndefined = template.html.includes('undefined');
console.log('Contains undefined values:', hasUndefined);
if (hasUndefined) {
    const undefinedRegex = /\bundefined\b/g;
    const undefinedMatches = template.html.match(undefinedRegex);
    console.log('Undefined occurrences:', undefinedMatches?.length || 0);
    
    // Find the context around undefined values
    const lines = template.html.split('\n');
    lines.forEach((line, index) => {
        if (line.includes('undefined')) {
            console.log(`Line ${index + 1}: ${line.trim()}`);
        }
    });
}

console.log('\n=== TESTING WITH UNDEFINED EMAIL ===');
const testDataWithUndefinedEmail = {
    clientName: 'Test Client',
    email: undefined,
    setupUrl: 'http://localhost:3000/password-setup?token=abc123'
};

const templateWithUndefinedEmail = getEmailTemplate('clientWelcome', testDataWithUndefinedEmail);
const hasUndefinedInBadTemplate = templateWithUndefinedEmail.html.includes('undefined');
console.log('Template with undefined email contains undefined:', hasUndefinedInBadTemplate);
