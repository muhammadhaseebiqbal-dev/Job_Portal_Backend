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

// Simple token-based authentication without JWT
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Access token required' 
        });
    }

    // Simple token validation - check if token exists in user data
    try {
        const users = await readUsersData();
        const user = users.find(u => u.token === token || u.sessionToken === token);
        
        if (!user) {
            return res.status(403).json({ 
                success: false, 
                message: 'Invalid or expired token' 
            });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.error('Error validating token:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Internal server error during authentication' 
        });
    }
};

// Middleware to check if user is assigned to a client
const requireClientAssignment = async (req, res, next) => {
    try {
        const users = await readUsersData();
        const user = users.find(u => u.email === req.user.email);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }        // Check if user has a valid client assignment (not null, not "none", not empty)
        const isValidClientUuid = user.assignedClientUuid && 
                                  user.assignedClientUuid !== "none" && 
                                  user.assignedClientUuid.trim() !== "";

        if (!isValidClientUuid) {
            return res.status(403).json({
                success: false,
                message: 'Access denied: User not assigned to any client',
                code: 'NO_CLIENT_ASSIGNMENT',
                requiresClientAssignment: true
            });
        }

        // Add client UUID to request for use in other middleware/routes  
        req.clientUuid = user.assignedClientUuid;
        req.userData = user;
        next();
    } catch (error) {
        console.error('Error checking client assignment:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while checking client assignment'
        });
    }
};

// Middleware to check admin privileges
const requireAdmin = async (req, res, next) => {
    try {
        const users = await readUsersData();
        const user = users.find(u => u.email === req.user.email);
        
        if (!user || user.role !== 'Administrator') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }
        
        next();
    } catch (error) {
        console.error('Error checking admin privileges:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while checking admin privileges'
        });
    }
};

// Combined middleware for client routes that require both authentication and client assignment
const authenticateClient = [authenticateToken, requireClientAssignment];

module.exports = {
    authenticateToken,
    requireClientAssignment,
    requireAdmin,
    authenticateClient
};
