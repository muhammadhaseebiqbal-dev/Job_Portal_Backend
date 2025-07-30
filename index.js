// filepath: c:\Users\Beast\OneDrive\Desktop\Job_Portal\Job_Portal_Backend\src\app.js
// Load environment variables first
require('dotenv').config();

// Verify critical environment variables are loaded
console.log('🔧 Environment Variables Check:');
console.log('✓ SERVICEM8_CLIENT_ID:', process.env.SERVICEM8_CLIENT_ID ? 'SET' : 'MISSING');
console.log('✓ SERVICEM8_CLIENT_SECRET:', process.env.SERVICEM8_CLIENT_SECRET ? 'SET' : 'MISSING');
console.log('✓ PORT:', process.env.PORT || 'DEFAULT (5000)');

const express = require('express');
const authRouter = require('./src/routes/authRoute');
const defaultRoutes = require('./src/routes/defaultRoute');
const JobRoutes = require('./src/routes/JobsRoutes');
const clientRoutes = require('./src/routes/clientRoute');
const userRoutes = require('./src/routes/userRoute');
const notificationRoutes = require('./src/routes/notificationRoute');
const { router: businessNotificationRoutes } = require('./src/utils/businessNotifications');
const quoteRoutes = require('./src/routes/QuoteRoutes');
const chatRoutes = require('./src/routes/chatRoute');
const servicem8AttachmentRoutes = require('./src/routes/servicem8AttachmentRoute');
const notesRoutes = require('./src/routes/notesRoute');
const categoriesRoutes = require('./src/routes/categoriesRoute');
const CategoryRoutes = require('./src/routes/CategoryRoutes');
const locationRoutes = require('./src/routes/locationRoute');
const sitesRoutes = require('./src/routes/sitesRoute');
const contactRoutes = require('./src/routes/contactRoute');
const jobContactRoutes = require('./src/routes/jobContactRoute');
const clientValidationRoutes = require('./src/routes/clientValidationRoute');
const adminRoutes = require('./src/routes/adminRoute');
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
app.use('/api/users', userRoutes);
app.use('/api', notificationRoutes);
app.use('/api/notifications', businessNotificationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', quoteRoutes);
app.use('/api/servicem8-attachments', servicem8AttachmentRoutes);
app.use('/api', notesRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', sitesRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/servicem8', jobContactRoutes);
app.use('/fetch', locationRoutes);
app.use('/api/client', clientValidationRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Export for Vercel serverless deployment
module.exports = app;