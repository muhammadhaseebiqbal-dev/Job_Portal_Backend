#!/usr/bin/env node

/**
 * Bulk Client Deactivation Script
 * 
 * This script deactivates all clients in ServiceM8 one by one.
 * It handles errors gracefully and provides detailed logging.
 */

const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('./src/utils/tokenManager');
require('dotenv').config();

async function bulkDeactivateClients() {
    console.log('🚀 Starting Bulk Client Deactivation Script');
    console.log('='.repeat(60));
    
    const results = {
        total: 0,
        successful: 0,
        failed: 0,
        skipped: 0,
        errors: []
    };

    try {
        // Step 1: Get access token and authenticate
        console.log('\n🔑 Authenticating with ServiceM8...');
        const accessToken = await getValidAccessToken();
        servicem8.auth(accessToken);
        console.log('✅ Authentication successful');

        // Step 2: Fetch all clients
        console.log('\n📥 Fetching all clients from ServiceM8...');
        const { data: allClients } = await servicem8.getCompanyAll();
        
        if (!allClients || !Array.isArray(allClients)) {
            throw new Error('Failed to fetch clients from ServiceM8 or invalid response');
        }

        console.log(`📊 Found ${allClients.length} total clients`);
        results.total = allClients.length;

        // Filter clients that are currently active
        const activeClients = allClients.filter(client => client.active === 1);
        const inactiveClients = allClients.filter(client => client.active === 0);
        
        console.log(`✅ Active clients: ${activeClients.length}`);
        console.log(`❌ Already inactive clients: ${inactiveClients.length}`);

        if (activeClients.length === 0) {
            console.log('\n🎉 All clients are already inactive! No action needed.');
            return results;
        }

        console.log(`\n🔄 Processing ${activeClients.length} active clients...`);
        console.log('-'.repeat(60));

        // Step 2: Process each active client
        for (let i = 0; i < activeClients.length; i++) {
            const client = activeClients[i];
            const clientName = client.name || 'Unnamed Client';
            const progress = `[${i + 1}/${activeClients.length}]`;
            
            console.log(`\n${progress} Processing: ${clientName} (${client.uuid})`);
            
            try {
                // Build minimal update payload - only include required fields
                const updatePayload = {
                    uuid: client.uuid,
                    name: client.name || '',
                    active: 0  // Set to inactive
                };

                // Add other required fields if they exist
                if (client.email) updatePayload.email = client.email;
                if (client.phone) updatePayload.phone = client.phone;
                if (client.address) updatePayload.address = client.address;
                if (client.address_city) updatePayload.address_city = client.address_city;
                if (client.address_state) updatePayload.address_state = client.address_state;
                if (client.address_postcode) updatePayload.address_postcode = client.address_postcode;
                if (client.address_country) updatePayload.address_country = client.address_country;

                console.log(`   🔄 Deactivating client...`);
                
                // Update the client in ServiceM8
                await servicem8.postCompanySingle(updatePayload, { uuid: client.uuid });
                
                console.log(`   ✅ Successfully deactivated: ${clientName}`);
                results.successful++;
                
                // Small delay to avoid rate limiting
                await sleep(500);
                
            } catch (error) {
                console.log(`   ❌ Failed to deactivate: ${clientName}`);
                console.log(`   📝 Error: ${error.message}`);
                
                if (error.response?.data) {
                    console.log(`   📄 ServiceM8 Error Details:`, JSON.stringify(error.response.data, null, 2));
                }
                
                results.failed++;
                results.errors.push({
                    client: clientName,
                    uuid: client.uuid,
                    error: error.message,
                    details: error.response?.data
                });
            }
        }

        // Count skipped (already inactive) clients
        results.skipped = inactiveClients.length;

    } catch (error) {
        console.error('\n💥 Script failed with error:');
        console.error('Error:', error.message);
        if (error.response?.data) {
            console.error('ServiceM8 Error Details:', JSON.stringify(error.response.data, null, 2));
        }
        process.exit(1);
    }

    // Final results
    console.log('\n' + '='.repeat(60));
    console.log('📊 BULK DEACTIVATION RESULTS');
    console.log('='.repeat(60));
    console.log(`📈 Total clients processed: ${results.total}`);
    console.log(`✅ Successfully deactivated: ${results.successful}`);
    console.log(`⏭️  Already inactive (skipped): ${results.skipped}`);
    console.log(`❌ Failed to deactivate: ${results.failed}`);

    if (results.failed > 0) {
        console.log('\n💥 FAILED CLIENTS:');
        console.log('-'.repeat(40));
        results.errors.forEach((error, index) => {
            console.log(`${index + 1}. ${error.client} (${error.uuid})`);
            console.log(`   Error: ${error.error}`);
            if (error.details) {
                console.log(`   Details: ${JSON.stringify(error.details)}`);
            }
        });
    }

    if (results.successful > 0) {
        console.log(`\n🎉 Successfully deactivated ${results.successful} clients!`);
    }

    if (results.failed === 0) {
        console.log('\n✨ All operations completed successfully!');
    } else {
        console.log('\n⚠️  Some operations failed. Check the errors above.');
    }

    return results;
}

// Helper function for delays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the script
if (require.main === module) {
    bulkDeactivateClients()
        .then((results) => {
            console.log('\n🏁 Script completed.');
            process.exit(results.failed > 0 ? 1 : 0);
        })
        .catch((error) => {
            console.error('\n💥 Unexpected error:', error);
            process.exit(1);
        });
}

module.exports = { bulkDeactivateClients };
