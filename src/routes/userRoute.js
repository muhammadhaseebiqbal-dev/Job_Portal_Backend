const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');
const { v4: uuidv4 } = require('uuid');
const { getUserEmails } = require('../utils/userEmailManager');
const { generatePasswordSetupToken, authenticateUser, validateUserActiveStatus } = require('../utils/userCredentialsManager');
const axios = require('axios');
const { Redis } = require('@upstash/redis');
require('dotenv').config();

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:5000';

// Initialize Redis client for user storage
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});

// Cache for user status validation (5 minute TTL)
const USER_STATUS_CACHE_TTL = 5 * 60; // 5 minutes in seconds

// Constants for users system
const USERS_KEY = 'users_data'; // Redis key for storing users

// Helper function to read users data directly from Redis
const readUsersData = async () => {
    try {
        // Try to get users from Redis
        const usersData = await redis.get(USERS_KEY);
        
        // If no data exists yet, return empty array
        if (!usersData) {
            return [];
        }
        
        return usersData;
    } catch (error) {
        console.error('Error reading users data from Redis:', error);
        return [];
    }
};

// Helper function to save users data to Redis
const saveUsersData = async (usersData) => {
    try {
        await redis.set(USERS_KEY, usersData);
        return true;
    } catch (error) {
        console.error('Error saving users data to Redis:', error);
        return false;
    }
};

// Helper function to cache user status
const cacheUserStatus = async (userUuid, isActive) => {
    try {
        const cacheKey = `user:status:${userUuid}`;
        const statusData = {
            userUuid,
            isActive,
            cachedAt: new Date().toISOString()
        };
        
        await redis.set(cacheKey, statusData, { ex: USER_STATUS_CACHE_TTL });
    } catch (error) {
        console.error('Error caching user status:', error);
    }
};

// Helper function to get cached user status
const getCachedUserStatus = async (userUuid) => {
    try {
        const cacheKey = `user:status:${userUuid}`;
        const cachedData = await redis.get(cacheKey);
        
        if (cachedData && cachedData.userUuid === userUuid) {
            return cachedData.isActive;
        }
        
        return null;
    } catch (error) {
        console.error('Error getting cached user status:', error);
        return null;
    }
};

// GET /api/users - Fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await readUsersData();
        
        // Remove password information from response for security
        const sanitizedUsers = users.map(user => {
            const { password, passwordSetupToken, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        
        res.json({
            success: true,
            data: sanitizedUsers
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
});

// POST /api/users - Create new user
router.post('/', async (req, res) => {
    try {
        const { name, username, email } = req.body;
        
        // Validate required fields
        if (!name || !username || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name, username, and email are required'
            });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        
        const users = await readUsersData();
        
        // Check if username already exists
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Username already exists'
            });
        }
        
        // Check if email already exists
        const existingEmail = users.find(user => user.email === email);
        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
        }
        
        const userUuid = uuidv4();
        const passwordSetupToken = generatePasswordSetupToken();
        
        const newUser = {
            uuid: userUuid,
            name: name.trim(),
            username: username.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            isActive: true,
            passwordSetupToken,
            password: null,
            passwordSetupRequired: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        users.push(newUser);
        const saved = await saveUsersData(users);
          if (!saved) {
            return res.status(500).json({
                success: false,
                message: 'Failed to save user data'
            });
        }

        // Store the setup token in Redis
        const { storePasswordSetupToken } = require('../utils/userCredentialsManager');
        const tokenStored = await storePasswordSetupToken(email, passwordSetupToken, userUuid);

        if (!tokenStored) {
            return res.status(500).json({
                success: false,
                message: 'Failed to store setup token'
            });
        }

        // Send user welcome email with password setup link
        try {
            const passwordSetupUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/password-setup/${passwordSetupToken}?type=user`;
            
            const welcomeData = {
                name: name,
                email: email,
                username: username,
                setupUrl: passwordSetupUrl
            };
            
            await axios.post(`${apiBaseUrl}/api/notifications/send-templated`, {
                type: 'userWelcome',
                data: welcomeData,
                recipientEmail: email
            });
        } catch (emailError) {
            console.error('Error sending user welcome email:', emailError);
            // Don't fail the user creation if email fails
        }
        
        // Remove sensitive data from response
        const { password, passwordSetupToken: token, ...userResponse } = newUser;
        
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: userResponse
        });
        
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message
        });
    }
});

// PUT /api/users/:id - Edit user details
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username, email, isActive } = req.body;
        
        if (!name || !username || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name, username, and email are required'
            });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        
        const users = await readUsersData();
        const userIndex = users.findIndex(user => user.uuid === id);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Check if username is taken by another user
        const existingUser = users.find(user => user.username === username.trim().toLowerCase() && user.uuid !== id);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Username already exists'
            });
        }
        
        // Check if email is taken by another user
        const existingEmail = users.find(user => user.email === email.trim().toLowerCase() && user.uuid !== id);
        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
        }
        
        // Update user data
        users[userIndex] = {
            ...users[userIndex],
            name: name.trim(),
            username: username.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            isActive: isActive !== undefined ? isActive : users[userIndex].isActive,
            updatedAt: new Date().toISOString()
        };
        
        const saved = await saveUsersData(users);
        
        if (!saved) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update user data'
            });
        }
        
        // Update cached status if status changed
        if (isActive !== undefined) {
            await cacheUserStatus(id, isActive);
        }
        
        // Remove sensitive data from response
        const { password, passwordSetupToken, ...userResponse } = users[userIndex];
        
        res.json({
            success: true,
            message: 'User updated successfully',
            data: userResponse
        });
        
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
            error: error.message
        });
    }
});

// DELETE /api/users/:id - Actually delete user from database
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const users = await readUsersData();
        const userIndex = users.findIndex(user => user.uuid === id);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Actually remove user from array
        const deletedUser = users.splice(userIndex, 1)[0];
        
        const saved = await saveUsersData(users);
        
        if (!saved) {
            return res.status(500).json({
                success: false,
                message: 'Failed to delete user'
            });
        }
        
        // Remove from cache
        await redis.del(`user_status:${id}`);
        
        res.json({
            success: true,
            message: 'User deleted successfully',
            data: { deletedUser: { uuid: deletedUser.uuid, name: deletedUser.name } }
        });
        
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message
        });
    }
});

// PUT /api/users/:id/status - Toggle user active status
router.put('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        
        const users = await readUsersData();
        const userIndex = users.findIndex(user => user.uuid === id);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Toggle user status
        users[userIndex] = {
            ...users[userIndex],
            isActive: typeof isActive === 'boolean' ? isActive : !users[userIndex].isActive,
            updatedAt: new Date().toISOString()
        };
        
        const saved = await saveUsersData(users);
        
        if (!saved) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update user status'
            });
        }
        
        // Update cached status
        await cacheUserStatus(id, users[userIndex].isActive);
        
        res.json({
            success: true,
            message: `User ${users[userIndex].isActive ? 'activated' : 'deactivated'} successfully`,
            data: users[userIndex]
        });
        
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user status',
            error: error.message
        });
    }
});

// GET /api/users/:id/password - View user password (for admin purposes)
router.get('/:id/password', async (req, res) => {
    try {
        const { id } = req.params;
        
        const users = await readUsersData();
        const user = users.find(user => user.uuid === id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.json({
            success: true,
            data: {
                hasPassword: !!user.password,
                passwordSetupRequired: user.passwordSetupRequired || false,
                password: user.password || null
            }
        });
        
    } catch (error) {
        console.error('Error fetching user password:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user password',
            error: error.message
        });
    }
});

// PUT /api/users/:id/password - Change user password (for admin purposes)
router.put('/:id/password', async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        
        if (!newPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password is required'
            });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }
        
        const users = await readUsersData();
        const userIndex = users.findIndex(user => user.uuid === id);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Update user password
        users[userIndex] = {
            ...users[userIndex],
            password: newPassword,
            passwordSetupRequired: false,
            passwordSetupToken: null,
            updatedAt: new Date().toISOString()
        };
        
        const saved = await saveUsersData(users);
        
        if (!saved) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update password'
            });
        }
        
        res.json({
            success: true,
            message: 'Password updated successfully'
        });
        
    } catch (error) {
        console.error('Error updating user password:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update password',
            error: error.message
        });
    }
});

// POST /api/users/:id/resend-setup - Resend password setup email
router.post('/:id/resend-setup', async (req, res) => {
    try {
        const { id } = req.params;
        
        const users = await readUsersData();
        const userIndex = users.findIndex(user => user.uuid === id);
        
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        const user = users[userIndex];
          // Generate new setup token
        const passwordSetupToken = generatePasswordSetupToken();
        users[userIndex] = {
            ...user,
            passwordSetupToken,
            passwordSetupRequired: true,
            updatedAt: new Date().toISOString()
        };
        
        const saved = await saveUsersData(users);
        
        if (!saved) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update user data'
            });
        }

        // Store the new setup token in Redis
        const { storePasswordSetupToken } = require('../utils/userCredentialsManager');
        const tokenStored = await storePasswordSetupToken(user.email, passwordSetupToken, user.uuid);

        if (!tokenStored) {
            return res.status(500).json({
                success: false,
                message: 'Failed to store setup token'
            });
        }
          // Send password setup email
        try {
            const passwordSetupUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/password-setup/${passwordSetupToken}?type=user`;
            
            const welcomeData = {
                name: user.name,
                email: user.email,
                username: user.username,
                setupUrl: passwordSetupUrl
            };
            
            await axios.post(`${apiBaseUrl}/api/notifications/send-templated`, {
                type: 'userWelcome',
                data: welcomeData,
                recipientEmail: user.email
            });
            
            res.json({
                success: true,
                message: 'Password setup email sent successfully'
            });
        } catch (emailError) {
            console.error('Error sending password setup email:', emailError);
            res.status(500).json({
                success: false,
                message: 'Failed to send password setup email',
                error: emailError.message
            });
        }
        
    } catch (error) {
        console.error('Error resending password setup:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to resend password setup',
            error: error.message
        });
    }
});

// Route for user password setup
router.post('/users/password-setup', async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                success: false,
                message: 'Token and password are required'
            });
        }

        const { completePasswordSetup } = require('../utils/userCredentialsManager');
        const result = await completePasswordSetup(token, password);

        if (result.success) {
            res.status(200).json({
                success: true,
                message: 'Password setup completed successfully'
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Error in user password setup:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during password setup',
            error: error.message
        });
    }
});

// Route to validate user setup token
router.get('/validate-setup-token/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { validatePasswordSetupToken } = require('../utils/userCredentialsManager');
        
        console.log('🔍 Validating setup token:', token);
        const result = await validatePasswordSetupToken(token);
        console.log('Token validation result:', result);

        if (result.valid) {
            res.json({
                success: true,
                data: {
                    email: result.email,
                    userUuid: result.userUuid
                }
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid or expired setup token'
            });
        }
    } catch (error) {
        console.error('Error validating setup token:', error);
        res.status(500).json({
            success: false,
            message: 'Error validating setup token'
        });
    }
});

module.exports = router;