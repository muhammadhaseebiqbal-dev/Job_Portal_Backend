const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');

// Middleware to ensure a valid token for all note routes
const ensureValidToken = async (req, res, next) => {
    try {
        // This will refresh the token if it's expired
        const accessToken = await getValidAccessToken();
        
        // Store the token in the request for route handlers to use
        req.accessToken = accessToken;
        
        // Set the auth for the ServiceM8 API
        servicem8.auth(accessToken);
        
        next();
    } catch (error) {
        console.error('Token validation error:', error);
        return res.status(401).json({
            error: true,
            message: 'Failed to authenticate with ServiceM8. Please try again.'
        });
    }
};

// Apply the token middleware to all routes
router.use(ensureValidToken);

// Get all notes for a job
router.get('/notes/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params;        // Get all notes from ServiceM8 and filter by related_object_uuid
        const result = await servicem8.getNoteAll();
        
        // Filter notes for this specific job
        const jobNotes = result.data.filter(note => 
            note.related_object_uuid === jobId && 
            note.related_object === 'Job' && 
            note.active === 1
        );        // Sort by creation date (newest first)
        jobNotes.sort((a, b) => new Date(b.edit_date || b.create_date) - new Date(a.edit_date || a.create_date));

        res.status(200).json({
            success: true,
            data: jobNotes,
            total: jobNotes.length
        });
    } catch (error) {
        console.error('Error fetching job notes:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch job notes',
            error: error.message
        });
    }
});

// Create a new note for a job
router.post('/notes', async (req, res) => {
    try {
        const { jobId, noteText, author, userType } = req.body;

        // Validate required fields
        if (!jobId || !noteText || !author) {
            return res.status(400).json({
                success: false,
                message: 'Job ID, note text, and author are required fields'
            });
        }        // Create note object for ServiceM8
        const noteData = {
            related_object: 'Job',
            related_object_uuid: jobId,
            note: noteText,
            active: 1,
            create_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        console.log('Creating note with data:', noteData);

        // Create note in ServiceM8
        const result = await servicem8.postNoteCreate(noteData);

        res.status(201).json({
            success: true,
            message: 'Note created successfully',
            data: result.data
        });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create note',
            error: error.message,
            serviceM8Error: error.data || 'No additional details provided by ServiceM8'
        });
    }
});

// Update an existing note
router.put('/notes/:noteId', async (req, res) => {
    try {
        const { noteId } = req.params;
        const { noteText, author } = req.body;

        // Validate required fields
        if (!noteText) {
            return res.status(400).json({
                success: false,
                message: 'Note text is required'
            });
        }        // Update note in ServiceM8
        const updateData = {
            note: noteText,
            edit_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        const result = await servicem8.postNoteSingle(updateData, { uuid: noteId });

        res.status(200).json({
            success: true,
            message: 'Note updated successfully',
            data: result.data
        });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update note',
            error: error.message
        });
    }
});

// Delete a note (archive it)
router.delete('/notes/:noteId', async (req, res) => {
    try {
        const { noteId } = req.params;

        // Archive note in ServiceM8 (ServiceM8 doesn't delete, just archives)
        const result = await servicem8.deleteNoteSingle({ uuid: noteId });

        res.status(200).json({
            success: true,
            message: 'Note deleted successfully',
            data: result.data
        });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete note',
            error: error.message
        });
    }
});

// Get a specific note
router.get('/notes/single/:noteId', async (req, res) => {
    try {
        const { noteId } = req.params;

        const result = await servicem8.getNoteSingle({ uuid: noteId });

        res.status(200).json({
            success: true,
            data: result.data
        });
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch note',
            error: error.message
        });
    }
});

module.exports = router;
