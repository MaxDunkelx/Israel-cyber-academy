# Backend Integration Guide - Israel Cyber Academy

## Overview
This guide covers the complete backend integration for the Israel Cyber Academy educational platform, including Firebase configuration, data services, authentication, and all recent fixes implemented.

## Current Architecture

### Technology Stack
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Firebase (Auth + Firestore)
- **Real-time:** Firebase Realtime Database
- **Deployment:** GitHub Pages
- **State Management:** React Context + Custom Hooks

### Database Schema

#### Collections Structure
```
firestore/
├── users/                    # User profiles and roles
├── lessons/                  # Lesson metadata
├── slides/                   # Slide content and configuration
├── sessions/                 # Live session data
├── teacherNotes/             # Teacher annotations
├── studentProgress/          # Student learning progress
└── systemLogs/              # System activity logs
```

## Firebase Configuration

### Environment Variables
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Firebase Setup (`src/firebase/firebase-config.js`)
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## Core Services

### 1. Authentication Service (`src/contexts/AuthContext.jsx`)

#### Features
- Multi-role authentication (Student, Teacher, System Manager)
- Role-based access control
- Session persistence
- Automatic role assignment

#### Key Functions
```javascript
// User registration with role assignment
const registerUser = async (email, password, role, userData) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    email,
    role,
    ...userData,
    createdAt: serverTimestamp()
  });
};

// Role-based login
const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
  return { user: userCredential.user, role: userDoc.data().role };
};
```

### 2. Content Service (`src/firebase/content-service.js`)

#### Features
- CRUD operations for lessons and slides
- Data consistency management
- Error handling and validation
- LessonId normalization

#### Key Functions
```javascript
// Get all lessons with proper error handling
export const getAllLessons = async () => {
  try {
    const lessonsRef = collection(db, 'lessons');
    const querySnapshot = await getDocs(lessonsRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw new Error('Failed to load lessons');
  }
};

// Get slides with lessonId consistency
export const getSlidesByLessonId = async (lessonId) => {
  try {
    const normalizedLessonId = String(lessonId);
    const slidesRef = collection(db, 'slides');
    const q = query(slidesRef, where('lessonId', '==', normalizedLessonId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching slides:', error);
    throw new Error('Failed to load slides');
  }
};
```

### 3. Teacher Service (`src/firebase/teacher-service.jsx`)

#### Features
- Teacher notes management
- Session hosting capabilities
- Student monitoring
- Activity logging

#### Key Functions
```javascript
// Save teacher notes with consistency
export const saveTeacherNotes = async (teacherId, lessonId, slideId, notesData) => {
  try {
    const normalizedLessonId = String(lessonId);
    const notesRef = collection(db, 'teacherNotes');
    
    const existingNotes = await getTeacherNotes(teacherId, normalizedLessonId, slideId);
    
    if (existingNotes) {
      await updateDoc(doc(db, 'teacherNotes', existingNotes.id), {
        content: notesData.content,
        slideIndex: notesData.slideIndex,
        updatedAt: serverTimestamp()
      });
    } else {
      await addDoc(notesRef, {
        teacherId,
        lessonId: normalizedLessonId,
        slideId,
        content: notesData.content,
        slideIndex: notesData.slideIndex,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error saving teacher notes:', error);
    throw new Error('Failed to save notes');
  }
};
```

### 4. Session Service (`src/firebase/session-service.js`)

#### Features
- Live session management
- Real-time student interaction
- Session state persistence
- Timeout handling

#### Key Functions
```javascript
// Create live session
export const createSession = async (teacherId, lessonId, sessionData) => {
  try {
    const sessionRef = collection(db, 'sessions');
    const sessionDoc = await addDoc(sessionRef, {
      teacherId,
      lessonId,
      status: 'active',
      startTime: serverTimestamp(),
      students: [],
      currentSlide: 0,
      ...sessionData
    });
    return sessionDoc.id;
  } catch (error) {
    console.error('Error creating session:', error);
    throw new Error('Failed to create session');
  }
};
```

## Data Consistency Fixes

### 1. LessonId Normalization
**Problem:** Inconsistent lessonId formats (string vs number) causing query failures.

**Solution:** All services now normalize lessonId to string format:
```javascript
const normalizedLessonId = String(lessonId);
```

### 2. Error Handling
**Problem:** Unhandled errors causing app crashes.

**Solution:** Comprehensive try-catch blocks with user-friendly error messages:
```javascript
try {
  // Database operation
} catch (error) {
  console.error('Operation failed:', error);
  throw new Error('User-friendly error message');
}
```

### 3. Data Validation
**Problem:** Invalid data causing rendering issues.

**Solution:** Input validation and sanitization:
```javascript
const validateSlideData = (slideData) => {
  if (!slideData.title || slideData.title.trim() === '') {
    throw new Error('Slide title is required');
  }
  if (!slideData.type) {
    throw new Error('Slide type is required');
  }
  return true;
};
```

## Security Implementation

### 1. Authentication Rules
```javascript
// Firestore security rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Teachers can access their notes
    match /teacherNotes/{noteId} {
      allow read, write: if request.auth != null && 
        resource.data.teacherId == request.auth.uid;
    }
    
    // System managers have full access
    match /{document=**} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'system_manager';
    }
  }
}
```

### 2. Input Sanitization
```javascript
const sanitizeInput = (input) => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};
```

## Performance Optimizations

### 1. Query Optimization
```javascript
// Use specific queries instead of fetching all data
const getLessonsByTeacher = async (teacherId) => {
  const q = query(
    collection(db, 'lessons'),
    where('createdBy', '==', teacherId),
    orderBy('createdAt', 'desc')
  );
  return getDocs(q);
};
```

### 2. Caching Strategy
```javascript
// Implement local caching for frequently accessed data
const useCachedData = (key, fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const cached = localStorage.getItem(key);
    if (cached) {
      setData(JSON.parse(cached));
      setLoading(false);
    }
    
    fetchFunction().then(result => {
      setData(result);
      localStorage.setItem(key, JSON.stringify(result));
      setLoading(false);
    });
  }, [key, fetchFunction]);
  
  return { data, loading };
};
```

## Migration Scripts

### 1. Data Sync Script (`scripts/sync-all-lessons-to-database.js`)
```javascript
// Syncs all local lesson data to Firebase
const syncAllLessons = async () => {
  const localLessons = await importLocalLessons();
  const existingLessons = await getExistingLessons();
  
  for (const { id, lesson } of localLessons) {
    await syncLessonToDatabase(lesson);
    await syncSlidesForLesson(lessonId, lesson.content.slides);
  }
};
```

### 2. Consistency Fix Script (`scripts/fix-lesson-id-consistency.js`)
```javascript
// Fixes inconsistent lessonId formats
const fixLessonIdConsistency = async () => {
  const slidesRef = collection(db, 'slides');
  const querySnapshot = await getDocs(slidesRef);
  
  for (const doc of querySnapshot.docs) {
    const slideData = doc.data();
    if (typeof slideData.lessonId === 'number') {
      await updateDoc(doc.ref, {
        lessonId: String(slideData.lessonId)
      });
    }
  }
};
```

## Error Handling Strategy

### 1. Global Error Boundary
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### 2. Service-Level Error Handling
```javascript
const handleServiceError = (error, context) => {
  console.error(`Error in ${context}:`, error);
  
  // Log to monitoring service
  logError({
    context,
    error: error.message,
    stack: error.stack,
    timestamp: new Date()
  });
  
  // Return user-friendly error
  throw new Error(`Failed to ${context}. Please try again.`);
};
```

## Monitoring and Logging

### 1. Activity Logging
```javascript
const logActivity = async (userId, action, details) => {
  try {
    await addDoc(collection(db, 'systemLogs'), {
      userId,
      action,
      details,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      ip: await getClientIP()
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};
```

### 2. Performance Monitoring
```javascript
const measurePerformance = (operation, callback) => {
  const start = performance.now();
  return callback().finally(() => {
    const duration = performance.now() - start;
    console.log(`${operation} took ${duration}ms`);
  });
};
```

## Deployment Configuration

### 1. Environment Setup
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore']
        }
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
});
```

### 2. GitHub Pages Configuration
```html
<!-- public/404.html for SPA routing -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Israel Cyber Academy</title>
  <script>
    const path = window.location.pathname;
    if (path !== '/' && !path.includes('.')) {
      window.location.href = '/#' + path;
    }
  </script>
</head>
<body>
  <script>
    window.location.href = '/';
  </script>
</body>
</html>
```

## Testing Strategy

### 1. Unit Tests
```javascript
// Example test for content service
describe('Content Service', () => {
  test('should fetch lessons successfully', async () => {
    const lessons = await getAllLessons();
    expect(Array.isArray(lessons)).toBe(true);
    expect(lessons.length).toBeGreaterThan(0);
  });
  
  test('should handle errors gracefully', async () => {
    // Mock Firebase error
    jest.spyOn(console, 'error').mockImplementation(() => {});
    await expect(getAllLessons()).rejects.toThrow('Failed to load lessons');
  });
});
```

### 2. Integration Tests
```javascript
// Test complete user flow
describe('User Flow', () => {
  test('teacher can create session and students can join', async () => {
    const teacher = await loginUser('teacher@test.com', 'password');
    const sessionId = await createSession(teacher.uid, 'lesson1', {});
    
    const student = await loginUser('student@test.com', 'password');
    await joinSession(sessionId, student.uid);
    
    const session = await getSession(sessionId);
    expect(session.students).toContain(student.uid);
  });
});
```

## Future Backend Migration

### 1. Custom Backend Requirements
- **Node.js/Express** or **Python/Django** server
- **PostgreSQL** or **MongoDB** database
- **Redis** for caching and sessions
- **WebSocket** for real-time features
- **JWT** for authentication
- **Multer** for file uploads

### 2. API Design
```javascript
// RESTful API endpoints
GET    /api/lessons              // Get all lessons
GET    /api/lessons/:id          // Get specific lesson
POST   /api/lessons              // Create lesson
PUT    /api/lessons/:id          // Update lesson
DELETE /api/lessons/:id          // Delete lesson

GET    /api/sessions             // Get active sessions
POST   /api/sessions             // Create session
PUT    /api/sessions/:id         // Update session
DELETE /api/sessions/:id         // End session

GET    /api/users                // Get users (admin only)
POST   /api/users                // Register user
PUT    /api/users/:id            // Update user
DELETE /api/users/:id            // Delete user
```

### 3. Migration Strategy
1. **Phase 1:** Set up custom backend alongside Firebase
2. **Phase 2:** Migrate authentication to custom JWT system
3. **Phase 3:** Migrate data layer to custom database
4. **Phase 4:** Implement WebSocket for real-time features
5. **Phase 5:** Remove Firebase dependency

## Conclusion

The current Firebase-based backend provides a solid foundation with comprehensive error handling, data consistency, and security measures. The system is production-ready for small to medium-scale deployments. For enterprise-level scaling, the migration to a custom backend with the outlined architecture will provide better performance, control, and cost-effectiveness.

All recent fixes ensure data integrity, proper error handling, and improved user experience across all user roles and system components. 