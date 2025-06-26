# Backend Development Manual - Israel Cyber Academy

## 🎯 Overview

This manual provides a complete guide for building the backend system for the Israel Cyber Academy. The frontend is a React application that currently uses Firebase for authentication and data storage, but you need to build a proper backend API to replace Firebase and provide better control, security, and scalability.

## 📋 Current System Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with Vite
- **UI Library**: Tailwind CSS + Framer Motion
- **State Management**: React Context + Local State
- **Routing**: React Router DOM
- **Current Backend**: Firebase (Auth + Firestore)

### Current Data Flow
```
Frontend (React) → Firebase Auth → Firebase Firestore → Frontend
```

### Target Data Flow
```
Frontend (React) → Your Backend API → Your Database → Frontend
```

## 🏗️ System Components Analysis

### 1. Authentication System
**Current Implementation**: Firebase Authentication
**Location**: `src/contexts/AuthContext.jsx`

**Key Features**:
- User registration/login
- Role-based access (student, teacher, system_manager)
- Session management
- Demo mode support

**Required Backend Endpoints**:
```javascript
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
PUT /api/auth/profile
```

### 2. Content Management System
**Current Implementation**: Firebase Firestore
**Location**: `src/firebase/content-service.js`

**Key Features**:
- CRUD operations for lessons and slides
- Real-time updates
- Search and filtering
- Version control
- Import/export functionality

**Required Backend Endpoints**:
```javascript
// Lessons
GET /api/lessons
GET /api/lessons/:id
POST /api/lessons
PUT /api/lessons/:id
DELETE /api/lessons/:id

// Slides
GET /api/lessons/:lessonId/slides
GET /api/slides/:id
POST /api/slides
PUT /api/slides/:id
DELETE /api/slides/:id

// Search & Filter
GET /api/lessons/search?q=term
GET /api/lessons/filter?difficulty=beginner&age=12
```

### 3. User Management System
**Current Implementation**: Firebase Firestore
**Location**: `src/firebase/teacher-service.jsx`

**Key Features**:
- User profile management
- Role assignment
- Student-teacher relationships
- Progress tracking
- Analytics

**Required Backend Endpoints**:
```javascript
// User Management
GET /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id

// Role Management
PUT /api/users/:id/role
POST /api/users/:id/assign-teacher

// Progress Tracking
GET /api/users/:id/progress
PUT /api/users/:id/progress/:lessonId
GET /api/users/:id/analytics
```

### 4. Session Management System
**Current Implementation**: Firebase Firestore
**Location**: `src/firebase/session-service.js`

**Key Features**:
- Live session creation
- Student pool management
- Real-time session updates
- Session analytics

**Required Backend Endpoints**:
```javascript
// Sessions
GET /api/sessions
GET /api/sessions/:id
POST /api/sessions
PUT /api/sessions/:id
DELETE /api/sessions/:id

// Student Pool
GET /api/sessions/:id/students
POST /api/sessions/:id/students
DELETE /api/sessions/:id/students/:studentId

// Real-time Updates (WebSocket)
WS /ws/sessions/:id
```

### 5. Student Pool System
**Current Implementation**: Firebase Firestore
**Location**: `src/firebase/student-pool-service.js`

**Key Features**:
- Student availability tracking
- Teacher-student matching
- Session invitations
- Real-time notifications

**Required Backend Endpoints**:
```javascript
// Student Pool
GET /api/student-pool
POST /api/student-pool/join
DELETE /api/student-pool/leave
PUT /api/student-pool/status

// Notifications
GET /api/notifications
POST /api/notifications
PUT /api/notifications/:id/read
```

## 🗄️ Database Schema Design

### Users Collection
```javascript
{
  id: "string",
  email: "string",
  displayName: "string",
  role: "student" | "teacher" | "system_manager",
  firstName: "string",
  lastName: "string",
  age: "number",
  sex: "male" | "female" | "other",
  createdAt: "timestamp",
  updatedAt: "timestamp",
  lastLogin: "timestamp",
  isActive: "boolean"
}
```

### Lessons Collection
```javascript
{
  id: "string",
  title: "string",
  description: "string",
  difficulty: "beginner" | "intermediate" | "advanced",
  duration: "number", // minutes
  order: "number",
  targetAge: "number",
  tags: ["string"],
  createdAt: "timestamp",
  updatedAt: "timestamp",
  version: "number",
  totalSlides: "number",
  isPublished: "boolean"
}
```

### Slides Collection
```javascript
{
  id: "string",
  lessonId: "string",
  title: "string",
  type: "presentation" | "poll" | "quiz" | "video" | "interactive" | "break" | "reflection" | "summary",
  order: "number",
  content: "object", // Varies by slide type
  createdAt: "timestamp",
  updatedAt: "timestamp",
  version: "number"
}
```

### User Progress Collection
```javascript
{
  id: "string",
  userId: "string",
  lessonId: "string",
  completed: "boolean",
  score: "number",
  completedAt: "timestamp",
  lastSlide: "number",
  pagesEngaged: ["string"],
  lastActivity: "timestamp",
  timeSpent: "number"
}
```

### Sessions Collection
```javascript
{
  id: "string",
  teacherId: "string",
  lessonId: "string",
  title: "string",
  status: "pending" | "active" | "completed" | "cancelled",
  startTime: "timestamp",
  endTime: "timestamp",
  students: ["string"], // student IDs
  currentSlide: "number",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### Student Pool Collection
```javascript
{
  id: "string",
  userId: "string",
  status: "available" | "busy" | "offline",
  lastActivity: "timestamp",
  currentLesson: "string",
  preferences: "object"
}
```

## 🔧 Backend Technology Stack Recommendations

### Option 1: Node.js + Express + MongoDB
```javascript
// Recommended for rapid development
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Socket.io for real-time features
- Multer for file uploads
- Joi for validation
```

### Option 2: Python + FastAPI + PostgreSQL
```javascript
// Recommended for data analysis and ML features
- Python + FastAPI
- PostgreSQL + SQLAlchemy
- JWT for authentication
- WebSockets for real-time features
- Pydantic for validation
```

### Option 3: Java + Spring Boot + MySQL
```javascript
// Recommended for enterprise-grade applications
- Java + Spring Boot
- MySQL + JPA
- JWT for authentication
- WebSocket for real-time features
- Validation annotations
```

## 🚀 Implementation Plan

### Phase 1: Core API Development (2-3 weeks)
1. **Setup Backend Project**
   - Choose technology stack
   - Setup development environment
   - Configure database
   - Setup authentication system

2. **User Management API**
   - User registration/login
   - Role-based access control
   - Profile management
   - JWT token management

3. **Content Management API**
   - Lessons CRUD operations
   - Slides CRUD operations
   - Search and filtering
   - File upload for images/videos

### Phase 2: Advanced Features (2-3 weeks)
1. **Session Management**
   - Live session creation
   - Real-time updates (WebSocket)
   - Student pool management
   - Session analytics

2. **Progress Tracking**
   - User progress storage
   - Analytics and reporting
   - Achievement system
   - Performance metrics

3. **Real-time Features**
   - WebSocket implementation
   - Live notifications
   - Real-time session updates
   - Student-teacher communication

### Phase 3: Integration & Testing (1-2 weeks)
1. **Frontend Integration**
   - Replace Firebase calls with API calls
   - Update authentication flow
   - Implement real-time features
   - Error handling and fallbacks

2. **Testing & Optimization**
   - Unit and integration tests
   - Performance optimization
   - Security testing
   - Load testing

## 🔐 Security Requirements

### Authentication & Authorization
- JWT token-based authentication
- Role-based access control (RBAC)
- Token refresh mechanism
- Password hashing (bcrypt)
- Rate limiting
- CORS configuration

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Data encryption at rest
- Secure file uploads

### API Security
- HTTPS enforcement
- API key management
- Request/response validation
- Error handling (no sensitive data exposure)
- Audit logging

## 📊 Performance Requirements

### Response Times
- API endpoints: < 200ms
- Database queries: < 100ms
- File uploads: < 5 seconds
- Real-time updates: < 50ms

### Scalability
- Support 1000+ concurrent users
- Handle 100+ simultaneous sessions
- Database optimization
- Caching strategy (Redis)
- CDN for static assets

### Monitoring
- Application performance monitoring
- Database performance monitoring
- Error tracking and alerting
- User analytics
- System health checks

## 🔄 Migration Strategy

### Step 1: Parallel Development
- Keep Firebase running
- Develop new backend alongside
- Implement feature parity
- Test thoroughly

### Step 2: Gradual Migration
- Migrate one feature at a time
- Start with non-critical features
- Implement fallback mechanisms
- Monitor for issues

### Step 3: Full Migration
- Migrate authentication
- Migrate all data
- Update frontend
- Decommission Firebase

## 📁 File Structure for Backend

```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── lessonController.js
│   │   ├── slideController.js
│   │   ├── userController.js
│   │   ├── sessionController.js
│   │   └── progressController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Lesson.js
│   │   ├── Slide.js
│   │   ├── Session.js
│   │   └── Progress.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── lessons.js
│   │   ├── slides.js
│   │   ├── users.js
│   │   ├── sessions.js
│   │   └── progress.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── emailService.js
│   │   ├── fileService.js
│   │   └── notificationService.js
│   ├── utils/
│   │   ├── database.js
│   │   ├── logger.js
│   │   └── helpers.js
│   └── config/
│       ├── database.js
│       ├── auth.js
│       └── app.js
├── tests/
├── docs/
├── package.json
└── README.md
```

## 🧪 Testing Strategy

### Unit Tests
- Controller functions
- Service functions
- Utility functions
- Model validations

### Integration Tests
- API endpoints
- Database operations
- Authentication flow
- File uploads

### End-to-End Tests
- Complete user workflows
- Cross-browser testing
- Performance testing
- Security testing

## 📈 Monitoring & Analytics

### Application Monitoring
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Uptime monitoring
- Database monitoring

### User Analytics
- User behavior tracking
- Feature usage analytics
- Performance metrics
- Conversion tracking

### Business Metrics
- User engagement
- Lesson completion rates
- Teacher-student interactions
- System usage patterns

## 🔧 Development Environment Setup

### Prerequisites
- Node.js 18+ or Python 3.9+
- Database (MongoDB/PostgreSQL/MySQL)
- Redis (for caching)
- Git

### Local Development
```bash
# Clone repository
git clone <repository-url>
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Setup database
npm run db:setup

# Start development server
npm run dev
```

### Environment Variables
```bash
# Database
DATABASE_URL=mongodb://localhost:27017/cyber-academy
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password

# File Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=your-bucket-name

# Application
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## 🚀 Deployment

### Production Environment
- **Hosting**: AWS, Google Cloud, or Azure
- **Database**: Managed database service
- **Caching**: Redis Cloud or AWS ElastiCache
- **File Storage**: AWS S3 or Google Cloud Storage
- **CDN**: CloudFront or Cloud CDN
- **SSL**: Let's Encrypt or managed SSL

### CI/CD Pipeline
- **Version Control**: Git with feature branches
- **Testing**: Automated tests on pull requests
- **Deployment**: Automated deployment to staging/production
- **Monitoring**: Automated health checks and alerts

## 📚 Additional Resources

### Documentation
- API documentation (Swagger/OpenAPI)
- Database schema documentation
- Deployment guides
- Troubleshooting guides

### Code Quality
- ESLint/Prettier for code formatting
- Husky for pre-commit hooks
- Conventional commits
- Code review process

### Security
- Regular security audits
- Dependency vulnerability scanning
- Penetration testing
- Security training for team

---

## 🎯 Success Criteria

The backend implementation is successful when:

✅ **All Firebase functionality is replicated**
✅ **Performance meets requirements**
✅ **Security standards are met**
✅ **Real-time features work seamlessly**
✅ **Frontend integration is complete**
✅ **Testing coverage is adequate**
✅ **Documentation is comprehensive**
✅ **Deployment is automated**
✅ **Monitoring is in place**
✅ **Team can maintain and extend the system**

---

**Note**: This manual provides a comprehensive guide for building a production-ready backend system. The implementation should be iterative, with regular feedback and testing throughout the development process. 