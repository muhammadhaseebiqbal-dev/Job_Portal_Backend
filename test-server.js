// Simple test script to check if basic Node.js works
console.log('Starting test script...');
console.log('Node.js version:', process.version);
console.log('Environment:', process.env.NODE_ENV);

// Test environment variables
require('dotenv').config();
console.log('PORT:', process.env.PORT);
console.log('SERVICEM8_CLIENT_ID:', process.env.SERVICEM8_CLIENT_ID ? 'Set' : 'Missing');

// Test basic HTTP server
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Test server is working!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
});

// Handle errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
