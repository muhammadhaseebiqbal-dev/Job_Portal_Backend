const fetch = require('node-fetch');

const CONFIG = {
    API_KEY: 'smk-c72bdb-6c4c732b43636206-01358eed87df8ad4',
    BASE_URL: 'https://api.servicem8.com/api_1.0'
};

const headers = {
    'X-Api-Key': CONFIG.API_KEY,
    'accept': 'application/json'
};

async function checkExistingAttachments() {
    console.log('🔍 Checking existing attachments to understand object_name format...');
    
    try {
        const response = await fetch(`${CONFIG.BASE_URL}/attachment.json?$limit=5`, {
            method: 'GET',
            headers: headers
        });
        
        const responseText = await response.text();
        console.log('Response Status:', response.status);
        
        if (response.ok) {
            const data = JSON.parse(responseText);
            console.log('✅ Found existing attachments:');
            console.log(JSON.stringify(data, null, 2));
            
            if (data.results && data.results.length > 0) {
                console.log('\n📋 Object names found in existing attachments:');
                data.results.forEach((attachment, index) => {
                    console.log(`${index + 1}. Object Name: "${attachment.object_name}", Object UUID: ${attachment.object_uuid}`);
                });
            } else {
                console.log('No attachments found');
            }
        } else {
            console.log('❌ Failed to fetch attachments');
            console.log('Error Response:', responseText);
        }
    } catch (error) {
        console.error('❌ Error fetching attachments:', error.message);
    }
}

checkExistingAttachments();
