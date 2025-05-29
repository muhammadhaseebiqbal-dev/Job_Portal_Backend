const { Redis } = require('@upstash/redis');

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

/**
 * Store client role in Redis with expiration
 * @param {string} clientId - Client UUID
 * @param {string} role - Client role (admin/user/manager)
 * @returns {Promise<boolean>} - Success status
 */
const storeClientRole = async (clientId, role = 'user') => {
  try {
    const key = `client:role:${clientId}`;
    // Store role with 1 year expiration (365 days * 24 hours * 60 minutes * 60 seconds)
    await redis.setex(key, 365 * 24 * 60 * 60, role);
    console.log(`✅ Role stored for client ${clientId}: ${role}`);
    return true;
  } catch (error) {
    console.error('❌ Error storing client role:', error);
    return false;
  }
};

/**
 * Retrieve client role from Redis
 * @param {string} clientId - Client UUID
 * @returns {Promise<string|null>} - Client role or null if not found
 */
const getClientRole = async (clientId) => {
  try {
    const key = `client:role:${clientId}`;
    const role = await redis.get(key);
    console.log(`🔍 Retrieved role for client ${clientId}: ${role || 'not found'}`);
    return role || 'user'; // Default to 'user' if no role found
  } catch (error) {
    console.error('❌ Error retrieving client role:', error);
    return 'user'; // Default to 'user' on error
  }
};

/**
 * Cache job location data in Redis
 * @param {string} jobId - Job UUID
 * @param {object} locationData - Location information
 * @returns {Promise<boolean>} - Success status
 */
const cacheJobLocation = async (jobId, locationData) => {
  try {
    const key = `job:location:${jobId}`;
    // Store location data with 7 days expiration
    await redis.setex(key, 7 * 24 * 60 * 60, JSON.stringify(locationData));
    console.log(`✅ Location cached for job ${jobId}`);
    return true;
  } catch (error) {
    console.error('❌ Error caching job location:', error);
    return false;
  }
};

/**
 * Retrieve cached job location data from Redis
 * @param {string} jobId - Job UUID
 * @returns {Promise<object|null>} - Location data or null if not found
 */
const getCachedJobLocation = async (jobId) => {
  try {
    const key = `job:location:${jobId}`;
    const cachedData = await redis.get(key);
    if (cachedData) {
      console.log(`✅ Retrieved cached location for job ${jobId}`);
      return JSON.parse(cachedData);
    }
    console.log(`⚠️ No cached location found for job ${jobId}`);
    return null;
  } catch (error) {
    console.error('❌ Error retrieving cached job location:', error);
    return null;
  }
};

/**
 * Get all client roles (admin function)
 * @returns {Promise<object[]>} - Array of client role objects
 */
const getAllClientRoles = async () => {
  try {
    // Get all keys matching the client role pattern
    const keys = await redis.keys('client:role:*');
    const roles = [];
    
    for (const key of keys) {
      const clientId = key.replace('client:role:', '');
      const role = await redis.get(key);
      if (role) {
        roles.push({ clientId, role });
      }
    }
    
    console.log(`📋 Retrieved ${roles.length} client roles`);
    return roles;
  } catch (error) {
    console.error('❌ Error retrieving all client roles:', error);
    return [];
  }
};

/**
 * Update client role
 * @param {string} clientId - Client UUID
 * @param {string} newRole - New role to assign
 * @returns {Promise<boolean>} - Success status
 */
const updateClientRole = async (clientId, newRole) => {
  try {
    const key = `client:role:${clientId}`;
    await redis.setex(key, 365 * 24 * 60 * 60, newRole);
    console.log(`✅ Updated role for client ${clientId} to: ${newRole}`);
    return true;
  } catch (error) {
    console.error('❌ Error updating client role:', error);
    return false;
  }
};

/**
 * Delete client role
 * @param {string} clientId - Client UUID
 * @returns {Promise<boolean>} - Success status
 */
const deleteClientRole = async (clientId) => {
  try {
    const key = `client:role:${clientId}`;
    await redis.del(key);
    console.log(`✅ Deleted role for client ${clientId}`);
    return true;
  } catch (error) {
    console.error('❌ Error deleting client role:', error);
    return false;
  }
};

module.exports = {
  storeClientRole,
  getClientRole,
  cacheJobLocation,
  getCachedJobLocation,
  getAllClientRoles,
  updateClientRole,
  deleteClientRole
};
