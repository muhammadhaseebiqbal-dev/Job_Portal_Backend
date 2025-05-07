const fs = require('fs');
const path = require('path');

// Path to user email data file
const userEmailDataPath = path.join(__dirname, '../../data/UserEmailData.json');

// Read user email data
const readUserEmailData = () => {
    try {
        if (!fs.existsSync(userEmailDataPath)) {
            // Create the file if it doesn't exist
            fs.writeFileSync(userEmailDataPath, JSON.stringify({ users: {} }), 'utf8');
            return { users: {} };
        }
        
        const data = fs.readFileSync(userEmailDataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading user email data:', error);
        return { users: {} };
    }
};

// Write user email data
const writeUserEmailData = (data) => {
    try {
        fs.writeFileSync(userEmailDataPath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing user email data:', error);
        return false;
    }
};

// Store verified email for a user
const storeUserEmail = (userId, email) => {
    try {
        const data = readUserEmailData();
        
        // Create user entry if it doesn't exist
        if (!data.users[userId]) {
            data.users[userId] = {
                verifiedEmails: []
            };
        }
        
        // Add email if not already verified
        if (!data.users[userId].verifiedEmails.includes(email)) {
            data.users[userId].verifiedEmails.push(email);
            data.users[userId].primaryEmail = data.users[userId].primaryEmail || email; // Set as primary if none exists
        }
        
        return writeUserEmailData(data);
    } catch (error) {
        console.error('Error storing user email:', error);
        return false;
    }
};

// Get user's verified emails
const getUserEmails = (userId) => {
    try {
        const data = readUserEmailData();
        return data.users[userId] || { verifiedEmails: [], primaryEmail: null };
    } catch (error) {
        console.error('Error getting user emails:', error);
        return { verifiedEmails: [], primaryEmail: null };
    }
};

// Set primary email for user
const setPrimaryEmail = (userId, email) => {
    try {
        const data = readUserEmailData();
        
        // Ensure user exists
        if (!data.users[userId]) {
            return false;
        }
        
        // Ensure email is verified
        if (!data.users[userId].verifiedEmails.includes(email)) {
            return false;
        }
        
        // Set as primary
        data.users[userId].primaryEmail = email;
        
        return writeUserEmailData(data);
    } catch (error) {
        console.error('Error setting primary email:', error);
        return false;
    }
};

// Check if email is verified for user
const isEmailVerified = (userId, email) => {
    try {
        const userData = getUserEmails(userId);
        return userData.verifiedEmails.includes(email);
    } catch (error) {
        console.error('Error checking email verification:', error);
        return false;
    }
};

module.exports = {
    storeUserEmail,
    getUserEmails,
    setPrimaryEmail,
    isEmailVerified
};