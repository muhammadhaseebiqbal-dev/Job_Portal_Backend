# Job Portal Backend - System Documentation

<div align="center">

![Job Portal](https://img.shields.io/badge/Job%20Portal-Backend-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![ServiceM8](https://img.shields.io/badge/ServiceM8-Integration-orange?style=for-the-badge)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

**A comprehensive backend system for managing jobs, clients, and service operations**

</div>

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture & Design](#architecture--design)
3. [Core Components](#core-components)
4. [API Documentation](#api-documentation)
5. [Security & Authentication](#security--authentication)
6. [Database & Storage](#database--storage)
7. [Installation & Setup](#installation--setup)
8. [Configuration](#configuration)
9. [Deployment](#deployment)
10. [Monitoring & Maintenance](#monitoring--maintenance)
11. [Troubleshooting](#troubleshooting)
12. [Contributing](#contributing)

---

## System Overview

### Purpose
The Job Portal Backend serves as the central API service for a comprehensive job management system, facilitating seamless communication between clients, service providers, and administrative staff through the ServiceM8 platform integration.

### Key Features
- **ServiceM8 Integration**: Direct API integration with ServiceM8 for job and client management
- **OAuth 2.0 Authentication**: Secure token-based authentication system
- **Real-time Communication**: Chat and notification systems
- **File Management**: Comprehensive attachment handling with size validation
- **Role-based Access Control**: Multi-tier permission system
- **Session Management**: Advanced session handling with Redis caching
- **Email Integration**: Automated email notifications using SendGrid

### Technology Stack
- **Runtime**: Node.js (Latest LTS)
- **Framework**: Express.js 5.1.0
- **Cache/Session Store**: Redis (Upstash Cloud)
- **Email Service**: SendGrid API
- **File Upload**: Multer
- **External API**: ServiceM8 REST API
- **Authentication**: OAuth 2.0 with JWT tokens

---

## Architecture & Design

### System Architecture

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   Frontend Client   │────│   Job Portal API    │────│   ServiceM8 API     │
│   (React.js)        │    │   (Express.js)      │    │   (External)        │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
                                       │
                           ┌─────────────────────┐
                           │   Redis Cache       │
                           │   (Upstash)         │
                           └─────────────────────┘
                                       │
                           ┌─────────────────────┐
                           │   SendGrid Email    │
                           │   Service           │
                           └─────────────────────┘
```

### Design Principles
1. **Microservice Architecture**: Modular route-based design
2. **Separation of Concerns**: Clear separation between authentication, business logic, and data access
3. **Scalability**: Horizontal scaling support with stateless design
4. **Security First**: OAuth 2.0, CORS, and input validation
5. **Error Handling**: Comprehensive error handling and logging

---

## Core Components

### 1. Application Entry Point (`index.js`)
The main application file that orchestrates all system components:

```javascript
// Core middleware and routing setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// Route mounting
app.use('/', defaultRoutes);
app.use('/api', authRouter);
app.use('/fetch', JobRoutes);
// ... additional routes
```

**Key Responsibilities:**
- Server initialization and configuration
- Middleware registration
- Route mounting and organization
- Global error handling
- Token monitoring startup

### 2. Route Modules

#### Authentication Routes (`authRoute.js`)
- **OAuth 2.0 Flow**: ServiceM8 authorization and token exchange
- **Token Management**: Access token refresh and validation
- **Session Handling**: User session creation and management

#### Job Management Routes (`JobsRoutes.js`)
- **CRUD Operations**: Create, read, update, delete jobs
- **Status Management**: Job status tracking and updates
- **Client Integration**: Client-specific job filtering and access

#### Client Management Routes (`clientRoute.js`)
- **Client CRUD**: Complete client management operations
- **Permission Management**: Role-based access control
- **Profile Management**: Client profile and settings

#### Attachment Routes (`attachmentRoute.js`)
- **File Upload**: Secure file upload with validation
- **File Download**: Authenticated file access
- **Storage Management**: File organization and cleanup

#### Additional Routes
- **Categories**: Job categorization system
- **Locations**: Geographic location management
- **Notifications**: Real-time notification system
- **Chat**: Messaging system for client-staff communication
- **Quotes**: Quote generation and management

### 3. Utility Modules

#### Token Manager (`tokenManager.js`)
Advanced OAuth token management system:

```javascript
const TokenManager = {
    readTokenData,      // Redis-based token retrieval
    writeTokenData,     // Secure token storage
    refreshAccessToken, // Automatic token refresh
    startTokenMonitor   // Background token validation
};
```

**Features:**
- Automatic token refresh before expiration
- Redis-based caching for performance
- Fallback to environment variables
- Background monitoring service

#### Enhanced Token Manager (`enhancedTokenManager.js`)
Extended token management with additional security features:
- Token validation and verification
- Enhanced error handling
- Multiple token type support

#### Session Manager (`sessionManager.js`)
Comprehensive session management:
- Redis-based session storage
- Session timeout handling
- Multi-device session support

### 4. Middleware Components

#### Authentication Middleware (`auth.js`)
Token validation and user authentication:
- JWT token verification
- Role-based access control
- Request authorization

#### Error Handling Middleware
Global error handling for all routes:
```javascript
app.use((err, req, res, next) => {
    console.error('Global error handler caught:', err);
    res.status(500).json({
        error: true,
        message: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});
```

---

## API Documentation

### Base URL Structure
```
Production:  https://your-domain.com/api
Development: http://localhost:5000/api
```

### Authentication Endpoints

#### OAuth Flow
```http
GET /auth/servicem8
```
Initiates ServiceM8 OAuth authorization flow.

```http
GET /auth/generateAccessToken?code={auth_code}
```
Exchanges authorization code for access token.

### Job Management Endpoints

#### Get Jobs
```http
GET /fetch/jobs
GET /fetch/jobs/{client_id}
GET /fetch/jobs/{job_id}
```

#### Create Job
```http
POST /fetch/jobs
Content-Type: application/json

{
    "job_description": "string",
    "company_uuid": "string",
    "location_uuid": "string",
    "status": "string",
    "category_uuid": "string"
}
```

#### Update Job
```http
PUT /fetch/jobs/{job_id}
PUT /fetch/jobs/{job_id}/status
```

### Client Management Endpoints

#### Client Operations
```http
GET    /fetch/clients
POST   /fetch/clients
PUT    /fetch/clients/{client_id}
DELETE /fetch/clients/{client_id}
```

### File Management Endpoints

#### Upload Attachment
```http
POST /api/attachments/{job_id}/upload
Content-Type: multipart/form-data

file: [binary data]
userType: "client" | "staff"
userName: "string"
```

#### Download Attachment
```http
GET /api/attachments/{attachment_id}/download
```

### Response Format
All API endpoints follow a consistent response format:

```json
{
    "success": true,
    "data": {},
    "message": "Operation completed successfully",
    "timestamp": "2025-06-03T10:00:00.000Z"
}
```

Error responses:
```json
{
    "error": true,
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {}
}
```

---

## Security & Authentication

### OAuth 2.0 Implementation
The system implements a complete OAuth 2.0 flow with ServiceM8:

1. **Authorization Request**: Client redirected to ServiceM8 authorization server
2. **Authorization Grant**: User grants permission, receives authorization code
3. **Access Token Request**: Backend exchanges code for access token
4. **API Access**: Access token used for ServiceM8 API calls

### Token Security
```javascript
// Token storage with encryption
const storeToken = async (tokenData) => {
    const encryptedData = encrypt(tokenData);
    await redis.set('servicem8:tokens', encryptedData, 'EX', tokenData.expires_in);
};
```

### CORS Configuration
```javascript
app.use(cors({ 
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true 
}));
```

### Input Validation
All user inputs are validated and sanitized:
- SQL injection prevention
- XSS protection
- File upload validation
- Request size limiting

---

## Database & Storage

### Redis Cache Strategy
**Primary Uses:**
- Session storage
- Token caching
- Rate limiting data
- Temporary file metadata

**Configuration:**
```javascript
const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
});
```

### File Storage
**Local Storage Structure:**
```
uploads/
├── attachments/
│   ├── {job_id}/
│   │   ├── {filename}
│   │   └── metadata.json
├── temp/
└── archived/
```

**Cloud Storage Integration:**
- Support for AWS S3, Google Cloud Storage
- Configurable through environment variables

---

## Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- Redis instance (local or cloud)
- ServiceM8 Developer Account
- SendGrid Account (for emails)

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-org/job-portal-backend.git
   cd job-portal-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env` file:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # ServiceM8 OAuth Configuration
   SERVICEM8_CLIENT_ID=your_client_id
   SERVICEM8_CLIENT_SECRET=your_client_secret
   SERVICEM8_REDIRECT_URI=http://localhost:5000/auth/callback

   # Redis Configuration (Upstash)
   KV_REST_API_URL=your_redis_url
   KV_REST_API_TOKEN=your_redis_token

   # SendGrid Configuration
   SENDGRID_API_KEY=your_sendgrid_key
   FROM_EMAIL=noreply@yourdomain.com

   # File Upload Configuration
   MAX_FILE_SIZE=9437184  # 9MB in bytes
   UPLOAD_PATH=./uploads
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

5. **Verify Installation**
   ```bash
   curl http://localhost:5000/
   # Expected: Server status response
   ```

---

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 5000 | No |
| `NODE_ENV` | Environment mode | development | No |
| `SERVICEM8_CLIENT_ID` | ServiceM8 OAuth client ID | - | Yes |
| `SERVICEM8_CLIENT_SECRET` | ServiceM8 OAuth secret | - | Yes |
| `SERVICEM8_REDIRECT_URI` | OAuth redirect URL | - | Yes |
| `KV_REST_API_URL` | Redis connection URL | - | Yes |
| `KV_REST_API_TOKEN` | Redis authentication token | - | Yes |
| `SENDGRID_API_KEY` | SendGrid API key | - | Yes |
| `MAX_FILE_SIZE` | Maximum upload size (bytes) | 9437184 | No |

### ServiceM8 OAuth Scopes
The application requests comprehensive permissions:
```
staff_locations staff_activity publish_sms publish_email vendor 
vendor_logo vendor_email read_locations manage_locations read_staff 
manage_staff read_customers manage_customers manage_customer_contacts 
read_jobs manage_jobs create_jobs read_job_contacts manage_job_contacts 
read_job_materials manage_job_materials read_job_categories 
manage_job_categories read_job_queues manage_job_queues read_tasks 
manage_tasks read_schedule manage_schedule read_inventory 
manage_inventory read_job_notes publish_job_notes read_job_photos 
publish_job_photos read_job_attachments publish_job_attachments 
read_inbox read_messages manage_notifications manage_templates 
manage_badges read_assets manage_assets
```

---

## Deployment

### Production Deployment (Vercel)

1. **Vercel Configuration** (`vercel.json`)
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/index.js"
       }
     ],
     "env": {
       "NODE_ENV": "production"
     }
   }
   ```

2. **Deploy Command**
   ```bash
   vercel --prod
   ```

### Alternative Deployment Options

#### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 5000

CMD ["npm", "start"]
```

#### Traditional Server Deployment
```bash
# Install PM2 for process management
npm install -g pm2

# Start application with PM2
pm2 start index.js --name "job-portal-backend"

# Enable startup script
pm2 startup
pm2 save
```

---

## Monitoring & Maintenance

### Health Checks
```http
GET /health
```
Returns system status and dependencies health.

### Logging Strategy
```javascript
// Structured logging
const log = {
    info: (message, data) => console.log(JSON.stringify({
        level: 'info',
        message,
        data,
        timestamp: new Date().toISOString()
    })),
    error: (message, error) => console.error(JSON.stringify({
        level: 'error',
        message,
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
    }))
};
```

### Token Monitoring
Automatic background process monitors token expiration:
```javascript
const startTokenMonitor = () => {
    setInterval(async () => {
        const tokenData = await readTokenData();
        if (tokenData.expires_at < Date.now() + 300000) { // 5 minutes
            await refreshAccessToken();
        }
    }, 60000); // Check every minute
};
```

### Performance Metrics
- Response time monitoring
- Error rate tracking
- API usage statistics
- Redis cache hit rates

---

## Troubleshooting

### Common Issues

#### 1. Token Expiration
**Problem**: ServiceM8 API calls failing with 401 Unauthorized
**Solution**: 
```bash
# Check token status
node check_token_status.js

# Reset tokens if needed
node reset_tokens.js
```

#### 2. Redis Connection Issues
**Problem**: Session/cache failures
**Solution**: Verify Upstash Redis credentials and network connectivity

#### 3. File Upload Failures
**Problem**: Large file uploads failing
**Solution**: 
- Check `MAX_FILE_SIZE` configuration
- Verify disk space availability
- Review multer configuration

#### 4. CORS Errors
**Problem**: Frontend requests blocked
**Solution**: Update CORS configuration in `index.js`

### Debug Mode
Enable detailed logging:
```bash
NODE_ENV=development DEBUG=* npm start
```

### Health Check Script
```javascript
const axios = require('axios');

const healthCheck = async () => {
    try {
        const response = await axios.get('http://localhost:5000/health');
        console.log('Health Status:', response.data);
    } catch (error) {
        console.error('Health check failed:', error.message);
    }
};
```

---

## Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Implement changes following coding standards
4. Add comprehensive tests
5. Update documentation
6. Submit pull request

### Code Standards
- ESLint configuration for consistent code style
- Comprehensive error handling
- Input validation for all endpoints
- Unit tests for critical functions
- API documentation updates

### Testing Guidelines
```bash
# Run test suite
npm test

# Run specific test category
npm run test:auth
npm run test:jobs
npm run test:integration
```

---

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---

## Support & Contact

**Development Team:**
- Sajid Mehmood - Lead Developer
- Haseeb Iqbal - Backend Specialist

**Repository:** [GitHub Repository](https://github.com/sajidmehmoodtariq30/Job_Portal_Backend)

**Issues:** [Report Issues](https://github.com/sajidmehmoodtariq30/Job_Portal_Backend/issues)

---

<div align="center">

**Job Portal Backend** - Empowering efficient job management through seamless ServiceM8 integration

*Built with ❤️ using Node.js and Express.js*

</div>