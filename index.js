// filepath: c:\Users\Beast\OneDrive\Desktop\Job_Portal\Job_Portal_Backend\src\app.js
const express = require('express');
const authRouter = require('./src/routes/authRoute');
const defaultRoutes = require('./src/routes/defaultRoute');
const JobRoutes = require('./src/routes/JobsRoutes');
const clientRoutes = require('./src/routes/clientRoute');
const notificationRoutes = require('./src/routes/notificationRoute');
const quoteRoutes = require('./src/routes/QuoteRoutes');
const chatRoutes = require('./src/routes/chatRoute');
const cors = require('cors');
const { startTokenMonitor } = require('./src/utils/tokenManager');
const app = express();

// Start token monitoring
console.log('Starting token monitoring...');
startTokenMonitor();

// Add middleware for error handling of async routes
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Add middleware to parse JSON and query strings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// Add global error handler for async errors
app.use((err, req, res, next) => {
    console.error('Global error handler caught:', err);
    res.status(500).json({
        error: true,
        message: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.use('/', defaultRoutes);
app.use('/api', authRouter);
app.use('/fetch', JobRoutes);
app.use('/fetch', clientRoutes);
app.use('/api', notificationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', quoteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Export for Vercel serverless deployment
module.exports = app;