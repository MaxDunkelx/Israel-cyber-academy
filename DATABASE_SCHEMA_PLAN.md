# Database Schema Plan - Student Pool System (Multi-Class Model)

## 🎯 **Overview**
This document outlines the database schema for the Israel Cyber Academy student pool system, implementing a **multi-class model** where each instructor can have multiple classes (Class 1, Class 2, etc.) with different progression through the same course material.

## 📊 **Collections Structure**

### **1. users Collection**
**Purpose**: Store all user accounts (students and teachers)
**Document ID**: `uid` (from Firebase Auth)

```javascript
{
  "uid": "user123",
  "email": "student@example.com",
  "displayName": "אבי כהן",
  "role": "student" | "teacher",
  "profile": {
    "firstName": "אבי",
    "lastName": "כהן",
    "phone": "+972-50-123-4567",
    "avatar": "https://...",
    "bio": "תלמיד מתחיל באבטחת סייבר"
  },
  "academic": {
    "grade": "י"א",
    "school": "תיכון הרצליה",
    "graduationYear": 2025
  },
  "progress": {
    "1": {
      "completed": true,
      "score": 85,
      "completedAt": "2024-12-20T10:00:00.000Z",
      "lastSlide": 12,
      "pagesEngaged": ["slide1", "slide2"],
      "lastActivity": "2024-12-20T10:30:00.000Z"
    }
  },
  "completedLessons": [1, 2],
  "currentLesson": 3,
  "assignedClass": "class_001_2024", // SINGLE class assignment
  "createdAt": "2024-01-15T10:00:00.000Z",
  "lastLogin": "2024-12-20T14:30:00.000Z",
  "updatedAt": "2024-12-20T14:30:00.000Z"
}
```

### **2. classes Collection**
**Purpose**: Store class information and student assignments
**Document ID**: `classId` (auto-generated)

```javascript
{
  "classId": "class_001_2024",
  "className": "Class 1",
  "classNumber": 1,
  "description": "כיתה ראשונה באבטחת סייבר",
  "instructorId": "teacher123", // Reference to users collection
  "instructorName": "ד"ר משה כהן",
  "students": ["student1", "student2", "student3"], // Array of student UIDs
  "studentCount": 15,
  "maxStudents": 25,
  "schedule": {
    "days": ["ראשון", "שלישי"],
    "time": "16:00-18:00",
    "timezone": "Asia/Jerusalem"
  },
  "status": "active" | "inactive" | "completed",
  "semester": "2024-א",
  "year": 2024,
  "startDate": "2024-02-01T00:00:00.000Z",
  "endDate": "2024-06-30T23:59:59.000Z",
  "currentLesson": 3, // Current lesson for this class
  "lessonProgress": {
    "1": {
      "startedAt": "2024-02-01T16:00:00.000Z",
      "completedAt": "2024-02-15T16:00:00.000Z",
      "averageScore": 85,
      "studentCompletion": 15
    },
    "2": {
      "startedAt": "2024-02-15T16:00:00.000Z",
      "completedAt": "2024-03-01T16:00:00.000Z",
      "averageScore": 88,
      "studentCompletion": 14
    },
    "3": {
      "startedAt": "2024-03-01T16:00:00.000Z",
      "completedAt": null,
      "averageScore": null,
      "studentCompletion": 8
    }
  },
  "createdAt": "2024-01-10T09:00:00.000Z",
  "updatedAt": "2024-12-20T14:30:00.000Z"
}
```

### **3. classEnrollments Collection**
**Purpose**: Track detailed enrollment relationships (one-to-one)
**Document ID**: `enrollmentId` (auto-generated)

```javascript
{
  "enrollmentId": "enroll_123",
  "classId": "class_001_2024",
  "studentId": "student123",
  "instructorId": "teacher123",
  "status": "active" | "dropped" | "completed" | "suspended",
  "enrolledAt": "2024-01-15T10:00:00.000Z",
  "droppedAt": null,
  "completedAt": null,
  "grade": 85,
  "attendance": {
    "totalSessions": 20,
    "attendedSessions": 18,
    "attendanceRate": 0.9
  },
  "progress": {
    "lessonsCompleted": 8,
    "totalLessons": 10,
    "completionRate": 0.8,
    "lastActivity": "2024-12-20T14:30:00.000Z"
  },
  "notes": "תלמיד מצטיין, השתתפות פעילה",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-12-20T14:30:00.000Z"
}
```

### **4. lessons Collection**
**Purpose**: Store lesson content and metadata (same for all classes)
**Document ID**: `lessonId`

```javascript
{
  "lessonId": 1,
  "title": "מבוא לאבטחת סייבר",
  "description": "שיעור ראשון בנושא אבטחת סייבר",
  "slides": [
    {
      "id": "slide1",
      "title": "מה זה אבטחת סייבר?",
      "content": "...",
      "type": "presentation" | "interactive" | "quiz"
    }
  ],
  "quiz": {
    "questions": [
      {
        "id": "q1",
        "question": "מה זה פישינג?",
        "options": ["...", "...", "...", "..."],
        "correct": 1,
        "points": 10
      }
    ]
  },
  "prerequisites": [],
  "estimatedDuration": 45, // minutes
  "difficulty": "beginner" | "intermediate" | "advanced",
  "tags": ["cybersecurity", "basics", "phishing"],
  "createdAt": "2024-01-10T08:00:00.000Z",
  "updatedAt": "2024-12-20T14:30:00.000Z"
}
```

## 🔗 **Relationships & Indexes**

### **Primary Relationships (Multi-Class Model)**
1. **Teacher → Classes**: One-to-Many (teacher can have multiple classes)
2. **Class → Students**: One-to-Many (class can have multiple students)
3. **Student → Class**: One-to-One (student can only be in ONE class)
4. **Class → Lessons**: Many-to-Many (class progresses through lessons)
5. **Student → Lessons**: One-to-Many (student progresses through lessons)

### **Database Indexes**
```javascript
// users collection
- email (unique)
- role
- assignedClass (single class assignment)
- createdAt

// classes collection
- instructorId
- status
- semester
- year
- students (array)
- classNumber (for ordering)

// classEnrollments collection
- classId
- studentId (unique - ensures one-to-one)
- instructorId
- status
- enrolledAt
```

## 🔄 **Data Flow (Multi-Class Model)**

### **Class Creation Process**
1. Teacher creates new class
2. System generates class number (next available)
3. System creates class document with:
   - `classNumber`: Sequential number
   - `className`: "Class {number}"
   - `currentLesson`: 1 (starts at first lesson)
   - `lessonProgress`: Empty object

### **Student Assignment Process**
1. Teacher searches for students in the pool
2. Teacher drags student to class
3. System validates:
   - Student not already assigned to any class
   - Class has capacity
   - Teacher owns the class
4. System creates/updates:
   - `users.students.assignedClass` (single class ID)
   - `classes.students` array
   - `classEnrollments` document

### **Class Progression Process**
1. Teacher advances class to next lesson
2. System updates:
   - `classes.currentLesson` (increments)
   - `classes.lessonProgress` (marks previous lesson complete)
   - All students in class get access to new lesson

### **Student Transfer Process**
1. Teacher transfers student from one class to another
2. System updates:
   - Updates `users.students.assignedClass` to new class
   - Removes from old class, adds to new class
   - Updates enrollment records

## 🛡️ **Security Rules (Multi-Class Model)**

### **Firestore Security Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isTeacher() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
    
    function isStudent() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'student';
    }
    
    function isClassInstructor(classId) {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/classes/$(classId)).data.instructorId == request.auth.uid;
    }
    
    // Users collection
    match /users/{userId} {
      // Users can read their own data
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Teachers can read all student data
      allow read: if isTeacher();
      
      // Students can only read their own data
      allow read: if isStudent() && request.auth.uid == userId;
    }
    
    // Classes collection
    match /classes/{classId} {
      // Teachers can manage their own classes
      allow read, write: if isClassInstructor(classId);
      
      // Students can read classes they are enrolled in
      allow read: if isStudent() && 
        request.auth.uid in resource.data.students;
    }
    
    // Class enrollments collection
    match /classEnrollments/{enrollmentId} {
      // Teachers can manage enrollments for their classes
      allow read, write: if isClassInstructor(resource.data.classId);
      
      // Students can read their own enrollments
      allow read: if isStudent() && 
        resource.data.studentId == request.auth.uid;
    }
    
    // Prevent students from accessing teacher functionality
    match /{document=**} {
      allow read, write: if isTeacher();
    }
  }
}
```

## 📈 **Performance Considerations**

### **Optimization Strategies**
1. **Single Class Assignment**: Simplified queries (no complex relationships)
2. **Array Fields**: Use arrays for simple relationships (students in class)
3. **Unique Indexes**: Ensure one-to-one relationships
4. **Pagination**: Implement cursor-based pagination for large datasets
5. **Caching**: Cache frequently accessed data (teacher's classes, student list)

### **Query Patterns (Multi-Class Model)**
```javascript
// Get all students for a teacher (unassigned)
db.collection('users')
  .where('role', '==', 'student')
  .where('assignedClass', '==', null)

// Get all students in a specific class
db.collection('users')
  .where('assignedClass', '==', classId)

// Get class for a specific student
db.collection('users')
  .doc(studentId)
  .get()
  .then(doc => doc.data().assignedClass)

// Get all classes for a teacher
db.collection('classes')
  .where('instructorId', '==', teacherId)
  .where('status', '==', 'active')
  .orderBy('classNumber')

// Get class progression
db.collection('classes')
  .doc(classId)
  .get()
  .then(doc => doc.data().currentLesson)
```

## 🚀 **Implementation Phases**

### **Phase 1: Database Setup**
- [ ] Create Firestore collections (multi-class structure)
- [ ] Set up security rules (multi-class model)
- [ ] Create indexes (single class assignment)
- [ ] Migrate existing data

### **Phase 2: Service Layer**
- [ ] Create Firebase service functions (multi-class)
- [ ] Implement CRUD operations (one-to-one)
- [ ] Add validation and error handling
- [ ] Create data transformation utilities

### **Phase 3: UI Components**
- [ ] Student Pool component (multi-class assignment)
- [ ] Class Management component
- [ ] Drag & Drop functionality (single assignment)
- [ ] Search and filtering

### **Phase 4: Integration**
- [ ] Connect UI to Firebase services
- [ ] Add real-time updates
- [ ] Implement error handling
- [ ] Add loading states

### **Phase 5: Testing & Optimization**
- [ ] Unit tests for services
- [ ] Integration tests
- [ ] Performance testing
- [ ] User acceptance testing

## 🎯 **Key Benefits of Multi-Class Model**

### **Simplicity**
- Each student can only be in one class at a time
- Clear class progression tracking
- Simplified database queries
- Easier to manage and understand

### **Performance**
- Faster queries (no complex relationships)
- Reduced database complexity
- Better scalability
- Simpler caching strategies

### **User Experience**
- Clear class assignment status
- Simple transfer process
- Intuitive interface
- Reduced confusion

### **Administrative**
- Easy class management
- Clear student tracking
- Simplified reporting
- Better resource allocation

---

*This multi-class schema provides a clean, efficient foundation for the student pool system with one-to-one class assignments and individual class progression.* 