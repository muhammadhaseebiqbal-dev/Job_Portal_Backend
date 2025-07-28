const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');
const { v4: uuidv4 } = require('uuid');
const { getUserEmails } = require('../utils/userEmailManager');
const { generatePasswordSetupToken, authenticateUser, validateUserActiveStatus, removeUserCredentials } = require('../utils/userCredentialsManager');
const axios = require('axios');
const { Redis } = require('@upstash/redis');
const bcrypt = require('bcryptjs');
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
        const { name, username, email, assignedClientUuid, permissions = [] } = req.body;
        
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
        const passwordSetupToken = generatePasswordSetupToken();          const newUser = {
            uuid: userUuid,
            name: name.trim(),
            username: username.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            assignedClientUuid: assignedClientUuid || null, // Add client assignment
            permissions: Array.isArray(permissions) ? permissions : [], // Add permissions
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
        const { name, username, email, isActive, assignedClientUuid } = req.body;
        
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
            assignedClientUuid: assignedClientUuid || users[userIndex].assignedClientUuid || null, // Update client assignment
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
        
        console.log(`🗑️ Attempting to delete user with UUID: ${id}`);
        
        let deletedUser = null;
        let userFound = false;
        
        // First, try to find and delete from regular users database
        const users = await readUsersData();
        console.log(`📊 Total users in regular database: ${users.length}`);
        
        const userIndex = users.findIndex(user => user.uuid === id);
        
        if (userIndex !== -1) {
            console.log(`✅ Found user in regular database: ${users[userIndex].name} (${users[userIndex].email})`);
            
            // Remove user from regular database
            deletedUser = users.splice(userIndex, 1)[0];
            
            const saved = await saveUsersData(users);
            if (!saved) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to delete user from regular database'
                });
            }
            
            userFound = true;
            console.log(`✅ User deleted from regular database successfully`);
        }
        
        // If not found in regular database, check client-created users
        if (!userFound) {
            try {
                const userData = await redis.get('userEmail:data') || { users: {} };
                const clientUsers = userData.users || {};
                
                console.log(`📊 Total client-created users: ${Object.keys(clientUsers).length}`);
                
                if (clientUsers[id]) {
                    console.log(`✅ Found user in client-created database: ${clientUsers[id].name} (${clientUsers[id].email})`);
                    
                    // Store user info before deletion
                    deletedUser = {
                        uuid: clientUsers[id].uuid,
                        name: clientUsers[id].name,
                        email: clientUsers[id].email,
                        assignedClientUuid: clientUsers[id].assignedClientUuid
                    };
                    
                    // Remove user from client-created users
                    delete clientUsers[id];
                    
                    // Save updated data back to Redis
                    await redis.set('userEmail:data', userData);
                    
                    userFound = true;
                    console.log(`✅ User deleted from client-created database successfully`);
                }
            } catch (error) {
                console.error('Error checking client-created users:', error);
            }
        }
        
        if (!userFound) {
            console.log(`❌ User not found with UUID: ${id}`);
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Clean up user-related cache and credentials
        try {
            // Remove user status cache
            await redis.del(`user_status:${id}`);
            
            // Remove user credentials if they exist
            if (deletedUser && deletedUser.email) {
                const credentialsRemoved = await removeUserCredentials(deletedUser.email);
                if (credentialsRemoved) {
                    console.log(`🧹 Cleaned up credentials for user: ${deletedUser.email}`);
                } else {
                    console.log(`⚠️ No credentials found to clean up for user: ${deletedUser.email}`);
                }
            }
        } catch (cacheError) {
            console.error('Error cleaning up user cache:', cacheError);
            // Don't fail the deletion if cache cleanup fails
        }
        
        console.log(`✅ User deletion completed successfully. Client ${deletedUser.assignedClientUuid || 'N/A'} remains intact.`);
        
        res.json({
            success: true,
            message: 'User deleted successfully. Client relationship detached but client remains intact.',
            data: { 
                deletedUser: { 
                    uuid: deletedUser.uuid, 
                    name: deletedUser.name,
                    email: deletedUser.email,
                    previousClientUuid: deletedUser.assignedClientUuid || null
                } 
            }
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

// GET /api/users/:id/password - View user password info (for admin purposes)
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
        
        // If user hasn't set password yet, show setup link
        if (user.passwordSetupRequired && user.passwordSetupToken) {
            const setupUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/password-setup/${user.passwordSetupToken}?type=user`;
            
            res.json({
                success: true,
                data: {
                    hasPassword: false,
                    passwordSetupRequired: true,
                    setupToken: user.passwordSetupToken,
                    setupUrl: setupUrl,
                    message: 'User needs to set up password using the link below'
                }
            });
        } else if (user.password) {
            // User has set password
            res.json({
                success: true,
                data: {
                    hasPassword: true,
                    passwordSetupRequired: false,
                    message: 'User has set up their password successfully',
                    lastUpdated: user.updatedAt
                }
            });
        } else {
            // Edge case - no password and no setup token
            res.json({
                success: true,
                data: {
                    hasPassword: false,
                    passwordSetupRequired: true,
                    message: 'User account needs password setup. Please regenerate setup link.'
                }
            });
        }
        
    } catch (error) {
        console.error('Error fetching user password info:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user password info',
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
          // Hash the new password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        
        // Update user password
        users[userIndex] = {
            ...users[userIndex],
            password: hashedPassword,
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
router.post('/password-setup', async (req, res) => {
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

// POST /login - User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                error: 'Email and password are required' 
            });
        }

        let user = null;

        // First, try to get user from the new client-created users in userEmail:data
        try {
            const userData = await redis.get('userEmail:data') || { users: {} };
            const clientUsers = Object.values(userData.users || {});
            user = clientUsers.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
            
            if (user) {
                console.log(`🔍 LOGIN: Found client-created user ${email} in userEmail:data`);
            }
        } catch (error) {
            console.error('Error checking client-created users:', error);
        }

        // If not found in client users, check legacy users_data
        if (!user) {
            try {
                const users = await readUsersData();
                user = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
                
                if (user) {
                    console.log(`🔍 LOGIN: Found legacy user ${email} in users_data`);
                }
            } catch (error) {
                console.error('Error checking legacy users:', error);
            }
        }

        if (!user) {
            console.log(`❌ LOGIN: User ${email} not found in either storage location`);
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log(`❌ LOGIN: Invalid password for user ${email}`);
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }

        // Check if user is active
        if (!user.isActive) {
            console.log(`❌ LOGIN: User ${email} account is deactivated`);
            return res.status(403).json({
                success: false,
                error: 'Your account has been deactivated. Please contact support.',
                code: 'ACCOUNT_DEACTIVATED'
            });
        }

        console.log(`✅ LOGIN: User ${email} logged in successfully`);

        // Remove sensitive data before sending response
        const { password: _, passwordSetupToken: __, ...userResponse } = user;

        res.status(200).json({
            success: true,
            user: userResponse,
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error during login'
        });
    }
});

// POST /forgot-password - Send password reset email
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Get stored user data from Redis
        const users = await readUsersData();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No account found with this email address'
            });
        }

        // Generate password reset token
        const resetToken = generatePasswordSetupToken();
        const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours        // Store reset token in Redis with expiry
        const resetTokenData = {
            email: user.email,
            userUuid: user.uuid,
            createdAt: new Date().toISOString(),
            expiresAt: resetTokenExpiry.toISOString()
        };

        // Store token with 24 hour expiry - store as object directly
        await redis.set(`password_reset:${resetToken}`, resetTokenData, { ex: 24 * 60 * 60 });

        console.log(`Password reset token generated for user: ${user.email}`);

        // Send password reset email
        try {
            const sgMail = require('@sendgrid/mail');
            const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;
            
            const msg = {
                to: user.email,
                from: process.env.SENDGRID_FROM_EMAIL || 'wamev32521@firain.com',
                subject: 'Reset Your Password - Job Portal',
                html: `
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                        <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
                        <p>Hello ${user.name || 'there'},</p>
                        <p>You requested to reset your password for your Job Portal account. Click the button below to reset your password:</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
                        </div>
                        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #007bff;">${resetUrl}</p>
                        <p style="color: #666; font-size: 14px;">This link will expire in 24 hours. If you didn't request this password reset, please ignore this email.</p>
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                        <p style="color: #999; font-size: 12px; text-align: center;">Job Portal Team</p>
                    </div>
                `
            };

            await sgMail.send(msg);
            console.log(`Password reset email sent to: ${user.email}`);

            res.status(200).json({
                success: true,
                message: 'Password reset instructions have been sent to your email'
            });

        } catch (emailError) {
            console.error('Error sending password reset email:', emailError);
            res.status(500).json({
                success: false,
                message: 'Failed to send password reset email. Please try again later.'
            });
        }

    } catch (error) {
        console.error('Error in forgot password:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// POST /reset-password - Reset password with token
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Token and new password are required'
            });
        }

        // Validate password requirements (similar to password setup)
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }        // Get token data from Redis
        const tokenData = await redis.get(`password_reset:${token}`);
        
        if (!tokenData) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Parse token data - handle both string and object cases
        let parsedTokenData;
        try {
            if (typeof tokenData === 'string') {
                parsedTokenData = JSON.parse(tokenData);
            } else {
                parsedTokenData = tokenData;
            }
        } catch (parseError) {
            console.error('Error parsing token data:', parseError);
            return res.status(400).json({
                success: false,
                message: 'Invalid reset token format'
            });
        }
        
        // Check if token has expired
        if (new Date() > new Date(parsedTokenData.expiresAt)) {
            // Remove expired token
            await redis.del(`password_reset:${token}`);
            return res.status(400).json({
                success: false,
                message: 'Reset token has expired. Please request a new password reset.'
            });
        }

        // Get user data and update password
        const users = await readUsersData();
        const userIndex = users.findIndex(u => u.uuid === parsedTokenData.userUuid);

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Hash new password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update user password
        users[userIndex].password = hashedPassword;
        users[userIndex].updatedAt = new Date().toISOString();

        // Save updated user data
        const saved = await saveUsersData(users);
        
        if (!saved) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update password'
            });
        }

        // Remove used token
        await redis.del(`password_reset:${token}`);

        console.log(`Password reset successfully for user: ${parsedTokenData.email}`);

        res.status(200).json({
            success: true,
            message: 'Password has been reset successfully. You can now login with your new password.'
        });

    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// GET /api/users/client-name/:uuid - Get client name by UUID (for user management display)
router.get('/client-name/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
        
        if (!uuid) {
            return res.status(400).json({
                success: false,
                message: 'Client UUID is required'
            });
        }
        
        // Get a valid access token for ServiceM8 API calls
        const accessToken = await getValidAccessToken();
        servicem8.auth(accessToken);
        
        // Fetch client data from ServiceM8
        const { data: clientData } = await servicem8.getCompanySingle({ uuid });
        
        if (!clientData) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }
        
        res.json({
            success: true,
            data: {
                uuid: clientData.uuid,
                name: clientData.name,
                email: clientData.email
            }
        });
        
    } catch (error) {
        console.error('Error fetching client name:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch client name',
            error: error.message
        });
    }
});

// GET /api/users/:id/client-sites - Get sites for user's assigned client
router.get('/:id/client-sites', async (req, res) => {
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
          // Check if user has a valid client assignment (not null, not "none", not empty)
        const isValidClientUuid = user.assignedClientUuid && 
                                  user.assignedClientUuid !== "none" && 
                                  user.assignedClientUuid.trim() !== "";
        
        if (!isValidClientUuid) {
            return res.json({
                success: true,
                data: [],
                message: 'User is not assigned to any client'
            });
        }
        
        // Get sites for the assigned client
        try {
            const sitesResponse = await axios.get(`${apiBaseUrl}/api/clients/${user.assignedClientUuid}/sites`);
            
            res.json({
                success: true,
                data: sitesResponse.data.data || [],
                clientUuid: user.assignedClientUuid,
                message: `Sites for assigned client`
            });
        } catch (sitesError) {
            console.error('Error fetching client sites:', sitesError);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch sites for assigned client',
                error: sitesError.message
            });
        }
        
    } catch (error) {
        console.error('Error fetching user client sites:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user client sites',
            error: error.message
        });
    }
});

// PUT /api/users/:userId/permissions - Update user permissions
router.put('/:userId/permissions', async (req, res) => {
    try {
        const { userId } = req.params;
        const { permissions } = req.body;

        if (!Array.isArray(permissions)) {
            return res.status(400).json({
                success: false,
                message: 'Permissions must be an array'
            });
        }

        const users = await readUsersData();
        const userIndex = users.findIndex(user => user.uuid === userId);

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        users[userIndex].permissions = permissions;
        users[userIndex].updatedAt = new Date().toISOString();

        const saved = await saveUsersData(users);

        if (!saved) {
            return res.status(500).json({
                success: false,
                message: 'Failed to save user permissions'
            });
        }

        res.json({
            success: true,
            message: 'User permissions updated successfully',
            data: {
                uuid: users[userIndex].uuid,
                name: users[userIndex].name,
                permissions: users[userIndex].permissions
            }
        });
    } catch (error) {
        console.error('Error updating user permissions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user permissions',
            error: error.message
        });
    }
});

// GET /api/users/:userId/permissions - Get user permissions
router.get('/:userId/permissions', async (req, res) => {
    try {
        const { userId } = req.params;
        const users = await readUsersData();
        const user = users.find(user => user.uuid === userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: {
                userId: user.uuid,
                permissions: user.permissions || []
            }
        });
    } catch (error) {
        console.error('Error fetching user permissions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user permissions',
            error: error.message
        });
    }
});

// POST /api/users/client-create - Create user by client (client-managed user creation)
router.post('/client-create', async (req, res) => {
    try {
        const { name, username, email, contactNumber, permissionLevel, assignedClientUuid, password } = req.body;
        
        // Get client UUID from headers for security
        const clientUuid = req.headers['x-client-uuid'];
        
        if (!clientUuid) {
            return res.status(400).json({
                success: false,
                message: 'Client UUID is required'
            });
        }

        // Verify the client UUID matches the assignedClientUuid
        if (clientUuid !== assignedClientUuid) {
            return res.status(403).json({
                success: false,
                message: 'Client can only create users for their own organization'
            });
        }

        // Validation
        if (!name || !username || !email || !contactNumber || !permissionLevel || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required: name, username, email, contactNumber, permissionLevel, password'
            });
        }

        // Password validation
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Get all users from Redis
        const userData = await redis.get('userEmail:data') || { users: {} };
        const users = Object.values(userData.users || {});
        
        // Check if username already exists
        const existingUsername = users.find(user => user.username && user.username.toLowerCase() === username.toLowerCase());
        if (existingUsername) {
            return res.status(409).json({
                success: false,
                message: 'Username already exists'
            });
        }

        // Check if email already exists
        const existingEmail = users.find(user => user.email && user.email.toLowerCase() === email.toLowerCase());
        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
        }
        
        const userUuid = uuidv4();
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            uuid: userUuid,
            name: name.trim(),
            username: username.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            contactNumber: contactNumber.trim(),
            assignedClientUuid: assignedClientUuid,
            permissions: [permissionLevel], // Convert to array format
            isActive: true,
            password: hashedPassword,
            passwordSetupRequired: false, // Password is set during creation
            clientCreated: true, // Flag to indicate client-created user
            createdBy: 'client',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Save user to Redis
        userData.users[userUuid] = newUser;
        await redis.set('userEmail:data', userData);

        console.log(`✅ CLIENT USER CREATION: User ${username} created successfully for client ${clientUuid}`);

        // Return user data without sensitive information
        const userResponse = {
            uuid: newUser.uuid,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
            contactNumber: newUser.contactNumber,
            assignedClientUuid: newUser.assignedClientUuid,
            permissions: newUser.permissions,
            isActive: newUser.isActive,
            passwordSetupRequired: newUser.passwordSetupRequired,
            clientCreated: newUser.clientCreated,
            createdAt: newUser.createdAt
        };

        res.status(201).json({
            success: true,
            message: 'User created successfully by client!',
            data: userResponse
        });

    } catch (error) {
        console.error('Error in client user creation:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message
        });
    }
});

// GET /api/users/client/:clientUuid - Get users by client UUID (for client user management)
router.get('/client/:clientUuid', async (req, res) => {
    try {
        const { clientUuid } = req.params;
        
        // Get client UUID from headers for security
        const requestingClientUuid = req.headers['x-client-uuid'];
        
        if (!requestingClientUuid) {
            return res.status(400).json({
                success: false,
                message: 'Client UUID is required in headers'
            });
        }

        // Verify the client UUID matches the requesting client
        if (requestingClientUuid !== clientUuid) {
            return res.status(403).json({
                success: false,
                message: 'Client can only view users from their own organization'
            });
        }

        // Get all users from Redis
        const userData = await redis.get('userEmail:data') || { users: {} };
        const users = Object.values(userData.users || {});
        
        // Filter users by assigned client UUID
        const clientUsers = users.filter(user => user.assignedClientUuid === clientUuid);
        
        // Remove sensitive information
        const safeUsers = clientUsers.map(user => ({
            uuid: user.uuid,
            name: user.name,
            username: user.username,
            email: user.email,
            contactNumber: user.contactNumber,
            assignedClientUuid: user.assignedClientUuid,
            permissions: user.permissions || [],
            isActive: user.isActive,
            passwordSetupRequired: user.passwordSetupRequired || false,
            clientCreated: user.clientCreated || false,
            createdBy: user.createdBy || 'admin',
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));

        res.json({
            success: true,
            data: safeUsers,
            count: safeUsers.length
        });

    } catch (error) {
        console.error('Error fetching client users:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch client users',
            error: error.message
        });
    }
});

module.exports = router;