const express = require('express');
const servicem8 = require('@api/servicem8');
const router = express.Router();
require('dotenv').config();
const { readTokenData } = require('../utils/tokenManager');

router.get('/jobs', (req, res) => {
    const tokenData = readTokenData();
    const { access_token } = tokenData;

    if (!access_token) {
        return res.status(401).json({
            error: true,
            message: 'Access token is missing. Please authenticate first.'
        });
    }

    // Log the access token being used
    console.log('Using access token:', access_token);

    servicem8.auth(access_token);
    servicem8.getJobAll()
        .then(({ data }) => {
            console.log(data);
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: true,
                message: 'Failed to fetch jobs.'
            });
        });
});

router.delete('/jobs/deleteAll', async (req, res) => {
    const tokenData = readTokenData();
    const { access_token } = tokenData;

    if (!access_token) {
        return res.status(401).json({
            error: true,
            message: 'Access token is missing. Please authenticate first.'
        });
    }

    try {
        servicem8.auth(access_token);

        // Fetch all jobs
        const { data: jobs } = await servicem8.getJobAll();

        // Delete each job one by one
        for (const job of jobs) {
            await servicem8.deleteJobSingle({ uuid: job.uuid });
            console.log(`Deleted job with UUID: ${job.uuid}`);
        }

        res.status(200).json({ message: 'All jobs deleted successfully.' });
    } catch (error) {
        console.error('Error deleting jobs:', error);
        res.status(500).json({ error: 'Failed to delete all jobs.' });
    }
});

module.exports = router;