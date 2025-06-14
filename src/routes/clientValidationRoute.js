const express = require('express');
const router = express.Router();
const { Redis } = require('@upstash/redis');

// Initialize Redis client for user storage
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

const USERS_KEY = 'users_data';

// Helper function to read users data directly from Redis
const readUsersData = async () => {
    try {
        const usersData = await redis.get(USERS_KEY);
        if (!usersData) {
            return [];
        }
        return usersData;
    } catch (error) {
        console.error('Error reading users data from Redis:', error);
        return [];
    }
};

// Debug endpoint to check all users and their client assignments
router.get('/debug-users', async (req, res) => {
    try {
        const users = await readUsersData();        const userSummary = users.map(user => {
            const isValidClientUuid = user.assignedClientUuid && 
                                      user.assignedClientUuid !== "none" && 
                                      user.assignedClientUuid.trim() !== "";
            
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                assignedClientUuid: user.assignedClientUuid || null,
                hasClientAssignment: isValidClientUuid
            };
        });
        
        res.json({
            success: true,
            totalUsers: users.length,
            users: userSummary
        });
    } catch (error) {
        console.error('Error reading users:', error);
        res.status(500).json({
            success: false,
            message: 'Error reading users'
        });
    }
});

// Real-time check endpoint with timestamp for cache busting
router.get('/validate-client-assignment', async (req, res) => {
    try {
        // Get user info from request (email from headers or query)
        const userEmail = req.headers['x-user-email'] || req.query.email;
        
        if (!userEmail) {
            return res.status(400).json({
                success: false,
                message: 'User email required',
                hasClientAssignment: false
            });
        }

        const users = await readUsersData();
        const user = users.find(u => u.email === userEmail);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                hasClientAssignment: false
            });
        }        // Check if user has a valid client assignment (not null, not "none", not empty)
        const isValidClientUuid = user.assignedClientUuid && 
                                  user.assignedClientUuid !== "none" && 
                                  user.assignedClientUuid.trim() !== "";
        
        const hasClientAssignment = isValidClientUuid;

        console.log(`🔍 Client assignment check for ${userEmail}:`, {
            hasAssignment: hasClientAssignment,
            clientUuid: user.assignedClientUuid,
            isValidUuid: isValidClientUuid,
            timestamp: new Date().toISOString()
        });

        res.json({
            success: true,
            hasClientAssignment,
            clientUuid: user.assignedClientUuid || null,
            timestamp: Date.now(),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                assignedClientUuid: user.assignedClientUuid || null
            }
        });
    } catch (error) {
        console.error('Error validating client assignment:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            hasClientAssignment: false
        });
    }
});

module.exports = router;
