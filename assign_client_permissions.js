#!/usr/bin/env node

/**
 * Script to assign permissions to assist@gcce.com.au client
 * Run from the Job_Portal_Backend directory
 */

const { Redis } = require('@upstash/redis');
require('dotenv').config();

// Initialize Redis client
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

const CLIENT_UUID = '362560dc-7db5-4249-98a0-4bb9fb502f6b';
const CLIENT_EMAIL = 'assist@gcce.com.au';

// Define comprehensive permissions for this client
const ENTERPRISE_PERMISSIONS = [
    // Dashboard
    'dashboard_view',
    
    // Job Management
    'jobs_view',
    'jobs_create',
    'jobs_edit',
    'jobs_status_update',
    
    // Attachments
    'attachments_view',
    'attachments_upload',
    'attachments_download',
    
    // Quote Management
    'quotes_view',
    'quotes_accept',
    'quotes_reject',
    'quotes_request',
    
    // Invoice Management
    'invoices_view',
    'invoices_pay',
    'invoices_download',
    
    // Schedule/Calendar
    'schedule_view',
    'schedule_book',
    
    // Communication
    'chat_access',
    'notifications',
    
    // Reports
    'reports_view',
    'reports_download',
    
    // Profile Management
    'profile_edit',
    'company_details_edit',
    
    // Support
    'support_access',
    'support_create_ticket'
];

async function assignPermissions() {
    console.log('🔧 Assigning permissions to assist@gcce.com.au client');
    console.log('='.repeat(60));
    
    try {
        // Step 1: Check current permissions
        console.log('1. Checking current permissions...');
        const permissionKey = `client:permissions:${CLIENT_UUID}`;
        const currentData = await redis.get(permissionKey);
        
        console.log(`   UUID: ${CLIENT_UUID}`);
        console.log(`   Email: ${CLIENT_EMAIL}`);
        console.log(`   Current permissions: ${currentData?.permissions?.length || 0}`);
        
        if (currentData?.permissions?.length > 0) {
            console.log(`   Current permissions: ${currentData.permissions.slice(0, 5).join(', ')}...`);
        }
        
        // Step 2: Assign new permissions
        console.log('\n2. Assigning new permissions...');
        const permissionData = {
            clientUuid: CLIENT_UUID,
            permissions: ENTERPRISE_PERMISSIONS,
            updatedAt: new Date().toISOString(),
            assignedBy: 'system',
            template: 'Enterprise Client'
        };
        
        await redis.set(permissionKey, permissionData);
        console.log(`   ✅ Assigned ${ENTERPRISE_PERMISSIONS.length} permissions`);
        console.log(`   📝 Permissions: ${ENTERPRISE_PERMISSIONS.slice(0, 10).join(', ')}...`);
        
        // Step 3: Verify assignment
        console.log('\n3. Verifying permission assignment...');
        const verifyData = await redis.get(permissionKey);
        
        if (verifyData && verifyData.permissions) {
            console.log(`   ✅ Verification successful`);
            console.log(`   📊 Stored ${verifyData.permissions.length} permissions`);
            console.log(`   📋 Includes core permissions:`);
            console.log(`      - dashboard_view: ${verifyData.permissions.includes('dashboard_view') ? '✅' : '❌'}`);
            console.log(`      - jobs_view: ${verifyData.permissions.includes('jobs_view') ? '✅' : '❌'}`);
            console.log(`      - jobs_create: ${verifyData.permissions.includes('jobs_create') ? '✅' : '❌'}`);
            console.log(`      - quotes_view: ${verifyData.permissions.includes('quotes_view') ? '✅' : '❌'}`);
            console.log(`      - attachments_upload: ${verifyData.permissions.includes('attachments_upload') ? '✅' : '❌'}`);
        } else {
            console.log(`   ❌ Verification failed - no data found`);
        }
        
        // Step 4: Test API endpoint format
        console.log('\n4. Testing API response format...');
        const apiResponse = {
            success: true,
            clientId: CLIENT_UUID,
            permissions: verifyData?.permissions || []
        };
        
        console.log(`   API would return: ${JSON.stringify(apiResponse, null, 2)}`);
        
        console.log('\n✅ Permission assignment completed successfully!');
        console.log('\n📋 Summary:');
        console.log(`   Client: ${CLIENT_EMAIL}`);
        console.log(`   UUID: ${CLIENT_UUID}`);
        console.log(`   Permissions: ${ENTERPRISE_PERMISSIONS.length}`);
        console.log(`   Template: Enterprise Client`);
        
    } catch (error) {
        console.error('💥 Error assigning permissions:', error);
    }
}

// Run the assignment if script is executed directly
if (require.main === module) {
    assignPermissions()
        .then(() => {
            console.log('\n🏁 Assignment completed.');
        })
        .catch((error) => {
            console.error('\n💥 Assignment failed:', error);
            process.exit(1);
        });
}

module.exports = { assignPermissions };
