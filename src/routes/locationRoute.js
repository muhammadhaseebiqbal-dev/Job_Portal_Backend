const express = require('express');
const router = express.Router();
const servicem8 = require('@api/servicem8');
const { getValidAccessToken } = require('../utils/tokenManager');

// Middleware to ensure a valid token for all location routes
const ensureValidToken = async (req, res, next) => {
    try {
        const accessToken = await getValidAccessToken();
        req.accessToken = accessToken;
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

// GET all locations
router.get('/locations', async (req, res) => {
    try {
        const { data } = await servicem8.getLocationAll();
        res.json(data);
    } catch (err) {
        console.error('Error fetching locations from ServiceM8:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch locations from ServiceM8' });
    }
});

// GET locations for a specific client
router.get('/locations/client/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params;
        const { data: allLocations } = await servicem8.getLocationAll();
        
        // ServiceM8 locations are global entities without direct client associations
        // Return all active locations since jobs are associated with locations via location_uuid
        const activeLocations = allLocations.filter(location => 
            location.active === 1 || location.active === '1'
        );
        
        console.log(`Returning ${activeLocations.length} active locations for client ${clientId}`);
        res.json(activeLocations);
    } catch (err) {
        console.error('Error fetching client locations:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch client locations' });
    }
});

// POST create new location
router.post('/locations', async (req, res) => {    try {        
        // Validate required fields
        if (!req.body.location_name && !req.body.name) {
            return res.status(400).json({
                success: false,
                message: 'Location name is required'
            });
        }
        
        if (!req.body.line1 && !req.body.address) {
            return res.status(400).json({
                success: false,
                message: 'Address line 1 is required'
            });
        }
        
        if (!req.body.city) {
            return res.status(400).json({
                success: false,
                message: 'City is required'
            });
        }
          if (!req.body.state) {
            return res.status(400).json({
                success: false,
                message: 'State is required'
            });
        }
        
        // Validate Australian state codes
        const validStates = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];
        const stateCode = req.body.state.toUpperCase().trim();
        if (!validStates.includes(stateCode)) {
            return res.status(400).json({
                success: false,
                message: `Invalid state code "${req.body.state}". Valid Australian states are: ${validStates.join(', ')}`
            });
        }
        
        // Validate post_code format for Australia (4 digits)
        const postCode = req.body.post_code || req.body.postcode || '';
        if (!postCode) {
            return res.status(400).json({
                success: false,
                message: 'Post code is required'
            });
        }
        
        if (!/^\d{4}$/.test(postCode)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid post_code format. Australian postcodes must be 4 digits.'
            });
        }
          // Log the incoming request body for debugging
        console.log('Received location creation request:', JSON.stringify(req.body, null, 2));
          // Map frontend fields to ServiceM8 API fields (matching the correct API structure)
        const locationData = {        // Required fields for ServiceM8 createLocations API
            active: 1, // Always active by default
            name: req.body.location_name || req.body.name || `Site - ${req.body.line1 || 'New'}`,
            line1: req.body.line1 || req.body.address || '', // Main address line
            city: req.body.city || '',
            country: req.body.country || 'Australia',
            post_code: postCode, // Already validated
            state: stateCode // Use validated state code
        };

        console.log('Frontend data received:', req.body);
        console.log('Mapped data for ServiceM8:', locationData);

        const { data } = await servicem8.postLocationCreate(locationData);
        console.log('ServiceM8 response data:', data);
        
        // Add the newly created location's UUID to the response for auto-selection
        const response = { 
            success: true,
            message: 'Location created successfully', 
            data: { uuid: data.uuid || locationData.uuid }
        };
        console.log('Sending response to frontend:', response);
        
        res.status(201).json(response);} catch (err) {
        console.error('Error creating location in ServiceM8:', err.response?.data || err.message);
        
        // Handle specific ServiceM8 error responses
        let errorMessage = 'Failed to create location in ServiceM8';
        let statusCode = 400;
        let validationHelp = 'Please check all required fields and try again';
        
        if (err.response?.data?.error === 'invalid_property_value' && err.response?.data?.property) {
            errorMessage = `Invalid value for ${err.response.data.property}: ${err.response.data.message}`;
        } else if (err.response?.status === 404) {
            errorMessage = 'ServiceM8 endpoint not found';
            statusCode = 404;
        } else if (err.response?.status === 401) {
            errorMessage = 'Authentication failed with ServiceM8';
            statusCode = 401;
        } else if (err.response?.status === 429) {
            errorMessage = 'Too many requests to ServiceM8 API - please try again later';
            statusCode = 429;
        } else if (err.message === 'Bad Request') {
            // Likely a validation issue with city/postcode combination
            errorMessage = 'Location validation failed';
            validationHelp = 'Please ensure the city name matches the postcode area. For example: Sydney with 2000, Melbourne with 3000, Brisbane with 4000, etc.';
        }
        
        // Provide more detailed error information
        res.status(statusCode).json({
            success: false,
            message: errorMessage,
            error: err.response?.data?.message || err.message || 'Unknown error',
            details: err.response?.data || null,
            validationHelp: validationHelp
        });
    }
});

// GET single location
router.get('/locations/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
        const { data } = await servicem8.getLocationSingle({ uuid });
        res.json(data);
    } catch (err) {
        console.error('Error fetching location:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch location', details: err.response?.data });
    }
});

// PUT update location
router.put('/locations/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
          // Map frontend fields to ServiceM8 API fields for updates
        const locationUpdate = {
            uuid,
            // Required fields for ServiceM8
            name: req.body.location_name || req.body.name,
            state: req.body.state || 'VIC', // state is required
            
            // ServiceM8 address structure
            line1: req.body.address || req.body.line1 || '',
            line2: req.body.address_2 || req.body.line2 || '',
            line3: req.body.line3 || '',
            city: req.body.city,
            post_code: req.body.postcode || req.body.post_code || '',
            country: req.body.country,
            
            // Optional fields
            lng: req.body.lng,
            lat: req.body.lat,
            active: req.body.active
            
            // Note: ServiceM8 locations don't support client_uuid
        };

        console.log('Frontend update data received:', req.body);
        console.log('Mapped update data for ServiceM8:', locationUpdate);

        const result = await servicem8.postLocationSingle(locationUpdate, { uuid });
        
        res.status(200).json({ 
            success: true,
            message: 'Location updated successfully', 
            location: locationUpdate
        });
    } catch (err) {
        console.error('Error updating location in ServiceM8:', err.response?.data || err.message);
        res.status(400).json({ 
            success: false,
            error: 'Failed to update location in ServiceM8', 
            details: err.response?.data 
        });
    }
});

// DELETE location (archives it in ServiceM8)
router.delete('/locations/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
        await servicem8.deleteLocationSingle({ uuid });
        
        res.status(200).json({ 
            success: true,
            message: 'Location archived successfully' 
        });
    } catch (err) {
        console.error('Error archiving location in ServiceM8:', err.response?.data || err.message);
        res.status(400).json({ 
            success: false,
            error: 'Failed to archive location in ServiceM8', 
            details: err.response?.data 
        });
    }
});

// Helper route to create a location from job address
router.post('/locations/from-job-address', async (req, res) => {
    try {
        const { client_uuid, job_address, location_name } = req.body;
        
        if (!client_uuid || !job_address) {
            return res.status(400).json({ 
                error: 'client_uuid and job_address are required' 
            });
        }

        // Parse address components if possible
        const addressParts = job_address.split(',').map(part => part.trim());
          // Map fields properly for ServiceM8 API
        const locationData = {
            uuid: uuidv4(),
            name: location_name || `Site - ${addressParts[0]}`,
            
            // ServiceM8 requires state and uses different address structure
            state: addressParts[2] || 'VIC', // Required field, default to VIC
            line1: job_address,              // ServiceM8 uses line1 for main address
            line2: '',
            line3: '',
            city: addressParts[1] || '',
            post_code: addressParts[3] || '', // ServiceM8 uses post_code
            country: addressParts[4] || 'Australia',
            active: 1
            
            // Note: ServiceM8 locations don't support client_uuid direct association
        };

        console.log('Creating location from job address with mapped data:', locationData);

        const { data } = await servicem8.postLocationCreate(locationData);
        
        res.status(201).json({ 
            success: true,
            message: 'Location created from job address', 
            location: { ...locationData, ...data }
        });
    } catch (err) {
        console.error('Error creating location from job address:', err.response?.data || err.message);
        res.status(400).json({ 
            success: false,
            error: 'Failed to create location', 
            details: err.response?.data 
        });
    }
});

// Enhanced GET locations with search and filtering
router.get('/locations/search', async (req, res) => {
    try {
        const { 
            name, 
            city, 
            state, 
            postcode, 
            active, 
            limit = 50, 
            offset = 0,
            sortBy = 'name',
            sortOrder = 'asc'
        } = req.query;

        const { data: allLocations } = await servicem8.getLocationAll();
        
        let filteredLocations = allLocations;

        // Apply filters
        if (name) {
            filteredLocations = filteredLocations.filter(location => 
                location.name?.toLowerCase().includes(name.toLowerCase())
            );
        }
        
        if (city) {
            filteredLocations = filteredLocations.filter(location => 
                location.city?.toLowerCase().includes(city.toLowerCase())
            );
        }
        
        if (state) {
            filteredLocations = filteredLocations.filter(location => 
                location.state?.toLowerCase() === state.toLowerCase()
            );
        }
        
        if (postcode) {
            filteredLocations = filteredLocations.filter(location => 
                location.post_code?.includes(postcode)
            );
        }
        
        if (active !== undefined) {
            filteredLocations = filteredLocations.filter(location => 
                location.active == active
            );
        }

        // Sort results
        filteredLocations.sort((a, b) => {
            const aVal = a[sortBy] || '';
            const bVal = b[sortBy] || '';
            
            if (sortOrder === 'desc') {
                return bVal.localeCompare(aVal);
            }
            return aVal.localeCompare(bVal);
        });

        // Apply pagination
        const startIndex = parseInt(offset);
        const endIndex = startIndex + parseInt(limit);
        const paginatedLocations = filteredLocations.slice(startIndex, endIndex);

        res.json({
            success: true,
            data: paginatedLocations,
            pagination: {
                total: filteredLocations.length,
                limit: parseInt(limit),
                offset: parseInt(offset),
                hasMore: endIndex < filteredLocations.length
            }
        });
    } catch (err) {
        console.error('Error searching locations:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to search locations' });
    }
});

// GET location analytics and statistics
router.get('/locations/analytics', async (req, res) => {
    try {
        const { data: allLocations } = await servicem8.getLocationAll();
        
        const analytics = {
            total: allLocations.length,
            active: allLocations.filter(loc => loc.active == 1).length,
            inactive: allLocations.filter(loc => loc.active == 0).length,
            byState: {},
            byCityCount: {},
            recentlyCreated: 0,
            withCoordinates: allLocations.filter(loc => loc.lat && loc.lng).length
        };

        // Group by state
        allLocations.forEach(location => {
            const state = location.state || 'Unknown';
            analytics.byState[state] = (analytics.byState[state] || 0) + 1;
        });

        // Group by city (top 10)
        const cityCount = {};
        allLocations.forEach(location => {
            const city = location.city || 'Unknown';
            cityCount[city] = (cityCount[city] || 0) + 1;
        });
        
        // Sort cities by count and take top 10
        const sortedCities = Object.entries(cityCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);
        analytics.byCityCount = Object.fromEntries(sortedCities);

        // Count recently created (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        analytics.recentlyCreated = allLocations.filter(location => {
            if (!location.edit_date) return false;
            const editDate = new Date(location.edit_date);
            return editDate > thirtyDaysAgo;
        }).length;

        res.json({
            success: true,
            analytics
        });
    } catch (err) {
        console.error('Error generating location analytics:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to generate location analytics' });
    }
});

// POST validate and geocode location address
router.post('/locations/validate', async (req, res) => {
    try {
        const { address, city, state, postcode, country = 'Australia' } = req.body;
        
        if (!address) {
            return res.status(400).json({ 
                success: false,
                error: 'Address is required for validation' 
            });
        }

        // Construct full address for geocoding
        const fullAddress = [address, city, state, postcode, country]
            .filter(Boolean)
            .join(', ');

        // Basic validation response structure
        const validationResult = {
            isValid: true,
            address: {
                line1: address,
                city: city || '',
                state: state || 'VIC',
                post_code: postcode || '',
                country: country
            },
            coordinates: null,
            suggestions: [],
            warnings: []
        };

        // Basic validation checks
        if (!state) {
            validationResult.warnings.push('State is required for ServiceM8 locations');
            validationResult.address.state = 'VIC'; // Default
        }

        if (postcode && !/^\d{4}$/.test(postcode)) {
            validationResult.warnings.push('Australian postcodes should be 4 digits');
        }

        // Note: For production, you would integrate with a geocoding service like:
        // - Google Maps Geocoding API
        // - Mapbox Geocoding API
        // - Australian Address API
        
        // Placeholder for geocoding result
        validationResult.suggestions.push({
            formatted_address: fullAddress,
            confidence: 'medium',
            note: 'Geocoding service integration required for coordinate lookup'
        });

        res.json({
            success: true,
            validation: validationResult
        });
    } catch (err) {
        console.error('Error validating location:', err.message);
        res.status(500).json({ 
            success: false,
            error: 'Failed to validate location address' 
        });
    }
});

// Bulk location import endpoint
router.post('/locations/bulk-import', async (req, res) => {
    try {
        const { locations, validate = true, skipDuplicates = true } = req.body;

        if (!Array.isArray(locations) || locations.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Invalid input: locations array is required and cannot be empty'
            });
        }

        const results = {
            success: [],
            errors: [],
            skipped: [],
            summary: {
                total: locations.length,
                processed: 0,
                successful: 0,
                failed: 0,
                skipped: 0
            }
        };

        // Get existing locations for duplicate checking
        let existingLocations = [];
        if (skipDuplicates) {
            try {
                const { data } = await servicem8.getLocationAll();
                existingLocations = data;
            } catch (err) {
                console.warn('Could not fetch existing locations for duplicate check:', err.message);
            }
        }

        // Process each location
        for (let i = 0; i < locations.length; i++) {
            const location = locations[i];
            results.summary.processed++;

            try {
                // Basic validation
                if (validate) {
                    if (!location.name || location.name.trim() === '') {
                        throw new Error('Location name is required');
                    }
                    if (!location.state) {
                        location.state = 'VIC'; // Default state
                    }
                }

                // Check for duplicates
                if (skipDuplicates && existingLocations.length > 0) {
                    const duplicate = existingLocations.find(existing => 
                        existing.name.toLowerCase() === location.name.toLowerCase() &&
                        existing.line1 === location.line1 &&
                        existing.city === location.city
                    );

                    if (duplicate) {
                        results.skipped.push({
                            index: i,
                            location: location.name,
                            reason: 'Duplicate location already exists',
                            existing_id: duplicate.uuid
                        });
                        results.summary.skipped++;
                        continue;
                    }
                }

                // Prepare location data for ServiceM8
                const locationData = {
                    name: location.name.trim(),
                    line1: location.line1 || location.address || '',
                    line2: location.line2 || '',
                    line3: location.line3 || '',
                    city: location.city || '',
                    state: location.state || 'VIC',
                    post_code: location.post_code || location.postcode || '',
                    country: location.country || 'Australia',
                    active: location.active !== undefined ? location.active : 1
                };

                // Create location in ServiceM8
                const { data: createdLocation } = await servicem8.postLocationCreate(locationData);
                
                results.success.push({
                    index: i,
                    location: location.name,
                    id: createdLocation.uuid,
                    data: { ...locationData, ...createdLocation }
                });
                results.summary.successful++;

            } catch (err) {
                results.errors.push({
                    index: i,
                    location: location.name || `Location ${i + 1}`,
                    error: err.message,
                    details: err.response?.data
                });
                results.summary.failed++;
            }
        }

        res.status(200).json({
            success: true,
            message: `Bulk import completed. ${results.summary.successful}/${results.summary.total} locations imported successfully.`,
            results
        });

    } catch (err) {
        console.error('Error in bulk location import:', err.message);
        res.status(500).json({
            success: false,
            error: 'Failed to process bulk location import',
            details: err.message
        });
    }
});

// Bulk location export endpoint
router.get('/locations/bulk-export', async (req, res) => {
    try {
        const { 
            format = 'json', 
            includeInactive = false,
            fields = 'all'
        } = req.query;

        // Get all locations from ServiceM8
        const { data: locations } = await servicem8.getLocationAll();

        // Filter active/inactive locations
        let filteredLocations = includeInactive === 'true' 
            ? locations 
            : locations.filter(loc => loc.active === 1);

        // Select specific fields if requested
        if (fields !== 'all' && typeof fields === 'string') {
            const selectedFields = fields.split(',').map(f => f.trim());
            filteredLocations = filteredLocations.map(location => {
                const filtered = {};
                selectedFields.forEach(field => {
                    if (location.hasOwnProperty(field)) {
                        filtered[field] = location[field];
                    }
                });
                return filtered;
            });
        }

        // Prepare export data
        const exportData = {
            export_info: {
                timestamp: new Date().toISOString(),
                total_locations: filteredLocations.length,
                include_inactive: includeInactive === 'true',
                format: format,
                fields: fields
            },
            locations: filteredLocations
        };

        if (format === 'csv') {
            // Convert to CSV format
            if (filteredLocations.length === 0) {
                return res.status(200).send('No locations found for export');
            }

            const headers = Object.keys(filteredLocations[0]);
            const csvHeader = headers.join(',');
            const csvRows = filteredLocations.map(location => 
                headers.map(header => {
                    const value = location[header];
                    // Escape commas and quotes in CSV
                    if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    return value || '';
                }).join(',')
            );

            const csvContent = [csvHeader, ...csvRows].join('\n');

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="locations_export_${new Date().toISOString().split('T')[0]}.csv"`);
            res.send(csvContent);

        } else {
            // JSON format (default)
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', `attachment; filename="locations_export_${new Date().toISOString().split('T')[0]}.json"`);
            res.json(exportData);
        }

    } catch (err) {
        console.error('Error in bulk location export:', err.message);
        res.status(500).json({
            success: false,
            error: 'Failed to export locations',
            details: err.message
        });
    }
});

// Location history/audit trail endpoint
router.get('/locations/:id/history', async (req, res) => {
    try {
        const { id } = req.params;
        const { limit = 50, offset = 0 } = req.query;        // Note: ServiceM8 doesn't provide built-in audit trails for locations
        // This is a placeholder implementation that would work with a custom audit system
        
        // For now, we'll provide the current location state and simulate history
        const { data: location } = await servicem8.getLocationSingle({ uuid: id });
        
        if (!location) {
            return res.status(404).json({
                success: false,
                error: 'Location not found'
            });
        }

        // Simulated history - in production, this would come from your audit log system
        const mockHistory = [
            {
                id: 1,
                action: 'created',
                timestamp: location.date_created || new Date().toISOString(),
                user: 'system',
                changes: {
                    created: location
                },
                previous_values: null
            },
            {
                id: 2,
                action: 'updated',
                timestamp: location.date_updated || new Date().toISOString(),
                user: 'admin',
                changes: {
                    modified: ['last_updated']
                },
                previous_values: {
                    date_updated: location.date_created
                }
            }
        ];

        const paginatedHistory = mockHistory.slice(
            parseInt(offset), 
            parseInt(offset) + parseInt(limit)
        );

        res.json({
            success: true,
            location: {
                id: location.uuid,
                name: location.name,
                current_state: location
            },
            history: {
                total: mockHistory.length,
                limit: parseInt(limit),
                offset: parseInt(offset),
                records: paginatedHistory
            },
            note: 'This is a placeholder implementation. For full audit trail functionality, implement a custom logging system that tracks all location changes.'
        });

    } catch (err) {
        console.error('Error fetching location history:', err.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch location history',
            details: err.message
        });
    }
});

// Location activity summary endpoint
router.get('/locations/activity-summary', async (req, res) => {
    try {
        const { days = 30 } = req.query;
        
        // Get all locations
        const { data: locations } = await servicem8.getLocationAll();
        
        const now = new Date();
        const cutoffDate = new Date(now.getTime() - (parseInt(days) * 24 * 60 * 60 * 1000));

        // Analyze recent activity
        const recentlyCreated = locations.filter(loc => {
            if (!loc.date_created) return false;
            const createdDate = new Date(loc.date_created);
            return createdDate >= cutoffDate;
        });

        const recentlyUpdated = locations.filter(loc => {
            if (!loc.date_updated) return false;
            const updatedDate = new Date(loc.date_updated);
            return updatedDate >= cutoffDate && updatedDate > new Date(loc.date_created || 0);
        });

        // State distribution
        const stateDistribution = locations.reduce((acc, loc) => {
            const state = loc.state || 'Unknown';
            acc[state] = (acc[state] || 0) + 1;
            return acc;
        }, {});

        // City distribution (top 10)
        const cityDistribution = locations.reduce((acc, loc) => {
            const city = loc.city || 'Unknown';
            acc[city] = (acc[city] || 0) + 1;
            return acc;
        }, {});

        const topCities = Object.entries(cityDistribution)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .reduce((acc, [city, count]) => {
                acc[city] = count;
                return acc;
            }, {});

        res.json({
            success: true,
            summary: {
                period_days: parseInt(days),
                total_locations: locations.length,
                active_locations: locations.filter(loc => loc.active === 1).length,
                inactive_locations: locations.filter(loc => loc.active === 0).length,
                recently_created: recentlyCreated.length,
                recently_updated: recentlyUpdated.length,
                state_distribution: stateDistribution,
                top_cities: topCities
            },
            recent_activity: {
                created: recentlyCreated.map(loc => ({
                    id: loc.uuid,
                    name: loc.name,
                    city: loc.city,
                    state: loc.state,
                    date_created: loc.date_created
                })),
                updated: recentlyUpdated.map(loc => ({
                    id: loc.uuid,
                    name: loc.name,
                    city: loc.city,
                    state: loc.state,
                    date_updated: loc.date_updated
                }))
            }
        });

    } catch (err) {
        console.error('Error fetching location activity summary:', err.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch location activity summary',
            details: err.message
        });
    }
});

module.exports = router;
