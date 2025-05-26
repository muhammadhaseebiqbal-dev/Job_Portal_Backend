# Location Bulk Operations & Audit Trail Guide

## Overview
This guide covers the enhanced location management features including bulk import/export functionality and location history/audit trail capabilities.

## New Endpoints

### 1. Bulk Location Import
**Endpoint:** `POST /locations/bulk-import`

**Description:** Import multiple locations in a single request with validation and duplicate checking.

**Request Body:**
```json
{
  "locations": [
    {
      "name": "Location Name",
      "line1": "123 Main Street",
      "line2": "Suite 100",
      "city": "Melbourne",
      "state": "VIC",
      "post_code": "3000",
      "country": "Australia",
      "active": 1
    }
  ],
  "validate": true,
  "skipDuplicates": true
}
```

**Parameters:**
- `locations` (array, required): Array of location objects to import
- `validate` (boolean, optional): Enable basic validation (default: true)
- `skipDuplicates` (boolean, optional): Skip locations that already exist (default: true)

**Response:**
```json
{
  "success": true,
  "message": "Bulk import completed. 8/10 locations imported successfully.",
  "results": {
    "success": [...],
    "errors": [...],
    "skipped": [...],
    "summary": {
      "total": 10,
      "processed": 10,
      "successful": 8,
      "failed": 1,
      "skipped": 1
    }
  }
}
```

### 2. Bulk Location Export
**Endpoint:** `GET /locations/bulk-export`

**Description:** Export all locations in JSON or CSV format.

**Query Parameters:**
- `format` (string, optional): Export format - 'json' or 'csv' (default: 'json')
- `includeInactive` (boolean, optional): Include inactive locations (default: false)
- `fields` (string, optional): Comma-separated list of fields to include, or 'all' (default: 'all')

**Examples:**
```
GET /locations/bulk-export?format=json&includeInactive=true
GET /locations/bulk-export?format=csv&fields=name,city,state,post_code
```

**Response:**
- JSON format: Returns structured data with export metadata
- CSV format: Returns downloadable CSV file

### 3. Location History/Audit Trail
**Endpoint:** `GET /locations/:id/history`

**Description:** Get the change history for a specific location.

**Query Parameters:**
- `limit` (number, optional): Number of history records to return (default: 50)
- `offset` (number, optional): Number of records to skip for pagination (default: 0)

**Response:**
```json
{
  "success": true,
  "location": {
    "id": "uuid",
    "name": "Location Name",
    "current_state": {...}
  },
  "history": {
    "total": 5,
    "limit": 50,
    "offset": 0,
    "records": [
      {
        "id": 1,
        "action": "created",
        "timestamp": "2023-12-01T10:30:00Z",
        "user": "system",
        "changes": {...},
        "previous_values": null
      }
    ]
  }
}
```

### 4. Location Activity Summary
**Endpoint:** `GET /locations/activity-summary`

**Description:** Get a comprehensive summary of location activity and statistics.

**Query Parameters:**
- `days` (number, optional): Number of days to analyze for recent activity (default: 30)

**Response:**
```json
{
  "success": true,
  "summary": {
    "period_days": 30,
    "total_locations": 150,
    "active_locations": 140,
    "inactive_locations": 10,
    "recently_created": 5,
    "recently_updated": 12,
    "state_distribution": {
      "VIC": 80,
      "NSW": 45,
      "QLD": 25
    },
    "top_cities": {
      "Melbourne": 50,
      "Sydney": 30,
      "Brisbane": 20
    }
  },
  "recent_activity": {
    "created": [...],
    "updated": [...]
  }
}
```

## Usage Examples

### Bulk Import Example
```javascript
const locations = [
  {
    name: "Head Office",
    line1: "123 Collins Street",
    city: "Melbourne",
    state: "VIC",
    post_code: "3000"
  },
  {
    name: "Branch Office",
    line1: "456 George Street",
    city: "Sydney", 
    state: "NSW",
    post_code: "2000"
  }
];

const response = await fetch('/locations/bulk-import', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    locations: locations,
    validate: true,
    skipDuplicates: true
  })
});
```

### Export to CSV Example
```javascript
// Export all active locations to CSV
const exportUrl = '/locations/bulk-export?format=csv&includeInactive=false';
window.open(exportUrl); // This will download the file
```

### Check Location History Example
```javascript
const locationId = 'uuid-here';
const response = await fetch(`/locations/${locationId}/history?limit=10`);
const history = await response.json();
```

## Features

### Bulk Import Features
- ✅ Batch processing of multiple locations
- ✅ Validation and error handling
- ✅ Duplicate detection and skipping
- ✅ Detailed success/error reporting
- ✅ Default value assignment for required fields

### Bulk Export Features
- ✅ JSON and CSV format support
- ✅ Field selection capability
- ✅ Active/inactive filtering
- ✅ Downloadable file generation
- ✅ Export metadata tracking

### Audit Trail Features
- ✅ Location change history tracking
- ✅ Pagination support
- ✅ User action tracking
- ✅ Before/after value comparison
- ⚠️ **Note:** Currently uses placeholder data - requires custom audit system implementation

### Activity Summary Features
- ✅ Comprehensive location statistics
- ✅ Recent activity analysis
- ✅ Geographic distribution insights
- ✅ Configurable time periods

## Implementation Notes

### Audit Trail Limitations
The current audit trail implementation provides a framework but uses placeholder data. To implement full audit functionality:

1. **Database Schema:** Create audit tables to track changes
2. **Middleware:** Add location change tracking middleware
3. **User Context:** Capture user information for all changes
4. **ServiceM8 Webhooks:** Use ServiceM8 webhooks to capture external changes

### Recommended Audit System
```sql
CREATE TABLE location_audit (
  id INT PRIMARY KEY AUTO_INCREMENT,
  location_uuid VARCHAR(255),
  action ENUM('created', 'updated', 'deleted'),
  user_id VARCHAR(255),
  timestamp DATETIME,
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45)
);
```

### Error Handling
All endpoints include comprehensive error handling:
- Input validation errors
- ServiceM8 API errors
- Network connectivity issues
- Data processing errors

### Performance Considerations
- Bulk operations are processed sequentially to avoid API rate limits
- Large exports may take time - consider implementing background processing
- Pagination is available for history and export operations

## Testing

Test the endpoints using the provided examples or tools like Postman. Ensure proper authentication tokens are included in all requests.

## Security

All endpoints require proper authentication and follow the same security patterns as existing location endpoints.
