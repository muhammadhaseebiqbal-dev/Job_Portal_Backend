const express = require('express');
const servicem8 = require('@api/servicem8');
const router = express.Router();
require('dotenv').config();

// Import sharedData from authRoute
const { sharedData } = require('./authRoute');

router.get('/jobs', (req, res) => {
  servicem8.auth(`${sharedData.tokenData.access_token}`);
  servicem8.getJobAll()
    .then(({ data }) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(err => console.error(err));
});

router.delete('/jobs/deleteAll', async (req, res) => {
  try {
    servicem8.auth(`${sharedData.tokenData.access_token}`);

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