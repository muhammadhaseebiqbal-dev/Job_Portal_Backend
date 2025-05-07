// filepath: c:\Users\Beast\OneDrive\Desktop\Job_Portal\Job_Portal_Backend\src\app.js
const express = require('express');
const authRouter = require('./src/routes/authRoute');
const defaultRoutes = require('./src/routes/defaultRoute');
const JobRoutes = require('./src/routes/JobsRoutes');
const clientRoutes = require('./src/routes/clientRoute');
const notificationRoutes = require('./src/routes/notificationRoute');
const cors = require('cors');
const { startTokenMonitor } = require('./src/utils/tokenManager');
const app = express();

// Start token monitoring
console.log('Starting token monitoring...');
startTokenMonitor();

// Add middleware to parse JSON and query strings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use('/', defaultRoutes);
app.use('/api', authRouter);
app.use('/fetch', JobRoutes);
app.use('/fetch', clientRoutes);
app.use('/api', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});