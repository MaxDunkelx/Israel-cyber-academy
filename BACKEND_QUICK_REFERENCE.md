# Backend Quick Reference - Israel Cyber Academy

## 🚀 Quick Start Checklist

### 1. Current System Status
- ✅ **Frontend**: React 18 + Vite + Tailwind CSS (Ready)
- ✅ **Current Backend**: Firebase (Auth + Firestore) (Working)
- ✅ **Deployment**: GitHub Pages (Live)
- 🔄 **Target**: Custom Backend API (To Build)

### 2. Critical Files to Understand
```
src/firebase/
├── firebase-config.js      # Firebase setup (147 lines)
├── content-service.js      # Lessons & slides CRUD (943 lines)
├── session-service.js      # Live sessions (528 lines)
├── student-pool-service.js # Student availability (821 lines)
└── teacher-service.jsx     # Teacher features (1,342 lines)

src/contexts/
└── AuthContext.jsx         # Authentication (1,117 lines)

src/components/system-manager/
├── ContentManagement.jsx   # Main content UI (1,036 lines)
├── AdvancedSlideEditor.jsx # Advanced editor (807 lines)
└── LessonGenerator.jsx     # Lesson generator (674 lines)
```

## 📊 Data Models (Current Firebase Collections)

### Users
```javascript
{
  uid: "string",
  email: "string",
  displayName: "string",
  role: "student" | "teacher" | "system_manager",
  firstName: "string",
  lastName: "string",
  age: "number",
  sex: "male" | "female" | "other",
  progress: { lessonId: { completed, score, lastSlide } },
  createdAt: "timestamp",
  lastLogin: "timestamp"
}
```

### Lessons
```javascript
{
  id: "string",
  title: "string",
  description: "string",
  difficulty: "beginner" | "intermediate" | "advanced",
  duration: "number",
  order: "number",
  targetAge: "number",
  tags: ["string"],
  totalSlides: "number",
  isPublished: "boolean",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### Slides
```javascript
{
  id: "string",
  lessonId: "string",
  title: "string",
  type: "presentation" | "poll" | "quiz" | "video" | "interactive" | "break" | "reflection" | "summary",
  order: "number",
  content: "object", // Varies by slide type
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### Sessions
```javascript
{
  id: "string",
  teacherId: "string",
  lessonId: "string",
  title: "string",
  status: "pending" | "active" | "completed" | "cancelled",
  students: ["string"], // student IDs
  currentSlide: "number",
  startTime: "timestamp",
  endTime: "timestamp"
}
```

## 🔌 Required API Endpoints

### Authentication
```javascript
POST /api/auth/register     // User registration
POST /api/auth/login        // User login
POST /api/auth/logout       // User logout
GET  /api/auth/me           // Get current user
PUT  /api/auth/profile      // Update profile
```

### Lessons
```javascript
GET    /api/lessons                    // Get all lessons
GET    /api/lessons/:id                // Get lesson by ID
POST   /api/lessons                    // Create lesson
PUT    /api/lessons/:id                // Update lesson
DELETE /api/lessons/:id                // Delete lesson
GET    /api/lessons/search?q=term      // Search lessons
GET    /api/lessons/filter?difficulty=beginner&age=12
```

### Slides
```javascript
GET    /api/lessons/:lessonId/slides  // Get slides for lesson
GET    /api/slides/:id                 // Get slide by ID
POST   /api/slides                     // Create slide
PUT    /api/slides/:id                 // Update slide
DELETE /api/slides/:id                 // Delete slide
```

### Sessions
```javascript
GET    /api/sessions                   // Get sessions
GET    /api/sessions/:id               // Get session by ID
POST   /api/sessions                   // Create session
PUT    /api/sessions/:id               // Update session
DELETE /api/sessions/:id               // Delete session
GET    /api/sessions/:id/students      // Get session students
POST   /api/sessions/:id/students      // Add student to session
DELETE /api/sessions/:id/students/:studentId
```

### Student Pool
```javascript
GET    /api/student-pool               // Get available students
POST   /api/student-pool/join          // Join pool
DELETE /api/student-pool/leave         // Leave pool
PUT    /api/student-pool/status        // Update status
```

### Users
```javascript
GET    /api/users                      // Get users (admin only)
GET    /api/users/:id                  // Get user by ID
PUT    /api/users/:id                  // Update user
DELETE /api/users/:id                  // Delete user
PUT    /api/users/:id/role             // Update user role
GET    /api/users/:id/progress         // Get user progress
PUT    /api/users/:id/progress/:lessonId
```

## 🔄 Real-time Requirements

### WebSocket Events
```javascript
// Session Events
'session:created'     // New session created
'session:updated'     // Session updated
'session:deleted'     // Session deleted
'student:joined'      // Student joined session
'student:left'        // Student left session
'slide:changed'       // Current slide changed

// Student Pool Events
'pool:joined'         // Student joined pool
'pool:left'           // Student left pool
'pool:status'         // Status updated

// Notification Events
'notification:new'    // New notification
'notification:read'   // Notification read
```

## 🗄️ Database Schema (SQL)

### Core Tables
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(255),
  role ENUM('student', 'teacher', 'system_manager') DEFAULT 'student',
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  age INTEGER,
  sex ENUM('male', 'female', 'other'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Lessons table
CREATE TABLE lessons (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
  duration INTEGER,
  order_index INTEGER,
  target_age INTEGER,
  tags JSON,
  total_slides INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Slides table
CREATE TABLE slides (
  id UUID PRIMARY KEY,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  type ENUM('presentation', 'poll', 'quiz', 'video', 'interactive', 'break', 'reflection', 'summary'),
  order_index INTEGER,
  content JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User Progress table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  completed_at TIMESTAMP,
  last_slide INTEGER DEFAULT 0,
  pages_engaged JSON,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  time_spent INTEGER DEFAULT 0,
  UNIQUE(user_id, lesson_id)
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  teacher_id UUID REFERENCES users(id),
  lesson_id UUID REFERENCES lessons(id),
  title VARCHAR(255),
  status ENUM('pending', 'active', 'completed', 'cancelled') DEFAULT 'pending',
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  current_slide INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Session Students table
CREATE TABLE session_students (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  left_at TIMESTAMP,
  UNIQUE(session_id, student_id)
);

-- Student Pool table
CREATE TABLE student_pool (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status ENUM('available', 'busy', 'offline') DEFAULT 'offline',
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  current_lesson UUID REFERENCES lessons(id),
  preferences JSON
);
```

## 🔐 Security Requirements

### Authentication
- JWT tokens with refresh mechanism
- Password hashing (bcrypt)
- Role-based access control
- Rate limiting
- CORS configuration

### API Security
- Input validation
- SQL injection prevention
- XSS protection
- CSRF protection
- HTTPS enforcement

## 📈 Performance Targets

### Response Times
- API endpoints: < 200ms
- Database queries: < 100ms
- Real-time updates: < 50ms
- File uploads: < 5 seconds

### Scalability
- 1,000+ concurrent users
- 100+ simultaneous sessions
- 10,000+ API requests/minute

## 🛠️ Technology Stack Recommendations

### Option 1: Node.js Stack
```javascript
- Node.js + Express
- PostgreSQL + Prisma/TypeORM
- Redis (caching + sessions)
- Socket.io (WebSockets)
- JWT (authentication)
- Multer (file uploads)
```

### Option 2: Python Stack
```javascript
- Python + FastAPI
- PostgreSQL + SQLAlchemy
- Redis (caching + sessions)
- WebSockets (FastAPI)
- JWT (authentication)
- Python-multipart (file uploads)
```

### Option 3: Java Stack
```javascript
- Java + Spring Boot
- PostgreSQL + JPA
- Redis (caching + sessions)
- WebSocket (Spring)
- JWT (authentication)
- MultipartFile (file uploads)
```

## 🚀 Implementation Priority

### Week 1: Foundation
1. Setup project structure
2. Implement authentication (JWT)
3. Create user management API
4. Setup database and migrations

### Week 2: Content Management
1. Create lessons API
2. Create slides API
3. Implement search/filtering
4. Add file upload functionality

### Week 3: Real-time Features
1. Setup WebSocket connections
2. Implement session management
3. Create student pool system
4. Add real-time notifications

### Week 4: Integration
1. Replace Firebase calls in frontend
2. Test all features
3. Performance optimization
4. Security testing

## 📞 Key Contacts & Resources

### Current System Info
- **Firebase Project**: israel-cyber-academy
- **GitHub Repo**: Israel-cyber-academy
- **Live URL**: https://maxibunnyshow.github.io/Israel-cyber-academy/

### Important Files to Study
- `src/firebase/content-service.js` - All CRUD operations
- `src/contexts/AuthContext.jsx` - Authentication flow
- `src/components/system-manager/ContentManagement.jsx` - Main UI
- `scripts/` folder - 50+ utility scripts for reference

### Migration Scripts Available
- `scripts/migrate-all-to-firebase.js` - Shows data structure
- `scripts/export-all-lessons-and-slides.js` - Export current data
- `scripts/test-*.js` - Various test scripts

---

## 🎯 Success Checklist

- [ ] All Firebase functionality replicated
- [ ] Real-time features working
- [ ] Performance targets met
- [ ] Security requirements satisfied
- [ ] Frontend integration complete
- [ ] Testing coverage adequate
- [ ] Documentation comprehensive
- [ ] Deployment automated
- [ ] Monitoring in place

---

**Remember**: Start with authentication, build incrementally, test frequently, and maintain communication with the frontend team. The existing Firebase implementation provides a perfect reference for all required functionality. 