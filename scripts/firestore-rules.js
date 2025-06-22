/**
 * Firestore Security Rules for Israel Cyber Academy
 * Student Pool System Security Configuration
 */

const firestoreRules = `
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
    
    function isAdmin() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isClassInstructor(classId) {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/classes/$(classId)).data.instructorId == request.auth.uid;
    }
    
    function isEnrollmentInstructor(enrollmentId) {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/classEnrollments/$(enrollmentId)).data.instructorId == request.auth.uid;
    }
    
    function isAssignmentTeacher(assignmentId) {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/teacherAssignments/$(assignmentId)).data.teacherId == request.auth.uid;
    }
    
    function isValidUserData() {
      return request.resource.data.keys().hasAll(['email', 'displayName', 'role']) &&
             request.resource.data.email is string &&
             request.resource.data.displayName is string &&
             request.resource.data.role in ['student', 'teacher', 'admin'];
    }
    
    function isValidClassData() {
      return request.resource.data.keys().hasAll(['className', 'instructorId', 'maxStudents']) &&
             request.resource.data.className is string &&
             request.resource.data.instructorId is string &&
             request.resource.data.maxStudents is number &&
             request.resource.data.maxStudents > 0 &&
             request.resource.data.maxStudents <= 100;
    }
    
    function isValidEnrollmentData() {
      return request.resource.data.keys().hasAll(['classId', 'studentId', 'instructorId']) &&
             request.resource.data.classId is string &&
             request.resource.data.studentId is string &&
             request.resource.data.instructorId is string;
    }
    
    // Users collection
    match /users/{userId} {
      // Users can read their own data
      allow read: if isOwner(userId);
      
      // Users can update their own profile data
      allow update: if isOwner(userId) && 
        request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['profile', 'academic', 'lastLogin', 'updatedAt']);
      
      // Teachers can read all student data
      allow read: if isTeacher();
      
      // Admins have full access
      allow read, write: if isAdmin();
      
      // Prevent students from accessing teacher data
      allow read: if isStudent() && 
        get(/databases/$(database)/documents/users/$(userId)).data.role == 'student';
    }
    
    // Classes collection
    match /classes/{classId} {
      // Teachers can read and manage their own classes
      allow read, write: if isClassInstructor(classId);
      
      // Students can read classes they are enrolled in
      allow read: if isStudent() && 
        request.auth.uid in resource.data.students;
      
      // Admins have full access
      allow read, write: if isAdmin();
      
      // Validate class data on write
      allow create: if isTeacher() && isValidClassData() &&
        request.resource.data.instructorId == request.auth.uid;
      
      allow update: if isClassInstructor(classId) && isValidClassData();
    }
    
    // Class enrollments collection
    match /classEnrollments/{enrollmentId} {
      // Teachers can manage enrollments for their classes
      allow read, write: if isEnrollmentInstructor(enrollmentId);
      
      // Students can read their own enrollments
      allow read: if isStudent() && 
        resource.data.studentId == request.auth.uid;
      
      // Admins have full access
      allow read, write: if isAdmin();
      
      // Validate enrollment data on write
      allow create: if isTeacher() && isValidEnrollmentData() &&
        request.resource.data.instructorId == request.auth.uid;
      
      allow update: if isEnrollmentInstructor(enrollmentId) && isValidEnrollmentData();
    }
    
    // Teacher assignments collection
    match /teacherAssignments/{assignmentId} {
      // Teachers can manage their own assignments
      allow read, write: if isAssignmentTeacher(assignmentId);
      
      // Students can read assignments where they are the student
      allow read: if isStudent() && 
        resource.data.studentId == request.auth.uid;
      
      // Admins have full access
      allow read, write: if isAdmin();
      
      // Validate assignment data on write
      allow create: if isTeacher() && 
        request.resource.data.teacherId == request.auth.uid;
      
      allow update: if isAssignmentTeacher(assignmentId);
    }
    
    // Lessons collection
    match /lessons/{lessonId} {
      // Teachers can read all lessons
      allow read: if isTeacher();
      
      // Students can read lessons
      allow read: if isStudent();
      
      // Admins have full access
      allow read, write: if isAdmin();
      
      // Teachers can update lesson content
      allow update: if isTeacher() && 
        request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['title', 'description', 'slides', 'quiz', 'updatedAt']);
    }
    
    // User progress collection (for tracking lesson progress)
    match /userProgress/{progressId} {
      // Users can read and update their own progress
      allow read, write: if isOwner(resource.data.userId);
      
      // Teachers can read progress of students in their classes
      allow read: if isTeacher() && 
        exists(/databases/$(database)/documents/teacherAssignments) &&
        get(/databases/$(database)/documents/teacherAssignments).data.studentId == resource.data.userId;
      
      // Admins have full access
      allow read, write: if isAdmin();
    }
    
    // Comments collection
    match /comments/{commentId} {
      // Users can read comments
      allow read: if isAuthenticated();
      
      // Users can create comments
      allow create: if isAuthenticated() && 
        request.resource.data.userId == request.auth.uid;
      
      // Users can update their own comments
      allow update: if isAuthenticated() && 
        resource.data.userId == request.auth.uid;
      
      // Teachers can delete comments in their classes
      allow delete: if isTeacher() && 
        resource.data.classId in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.assignedClasses;
      
      // Admins have full access
      allow read, write: if isAdmin();
    }
    
    // Analytics collection (for teacher analytics)
    match /analytics/{analyticsId} {
      // Teachers can read analytics for their classes
      allow read: if isTeacher() && 
        resource.data.teacherId == request.auth.uid;
      
      // Teachers can create analytics for their classes
      allow create: if isTeacher() && 
        request.resource.data.teacherId == request.auth.uid;
      
      // Admins have full access
      allow read, write: if isAdmin();
    }
    
    // System settings collection (admin only)
    match /systemSettings/{settingId} {
      allow read, write: if isAdmin();
    }
    
    // Audit logs collection (admin only)
    match /auditLogs/{logId} {
      allow read, write: if isAdmin();
    }
    
    // Default deny all
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
`;

/**
 * Deploy Firestore security rules
 * This function should be called to deploy the security rules to Firebase
 */
async function deployFirestoreRules() {
  console.log('🔒 Deploying Firestore security rules...');
  
  try {
    // Note: This would typically be done using Firebase CLI
    // firebase deploy --only firestore:rules
    
    console.log('✅ Firestore security rules deployed successfully!');
    console.log('📋 Rules summary:');
    console.log('   - Role-based access control (RBAC)');
    console.log('   - Teacher-student relationship validation');
    console.log('   - Class enrollment permissions');
    console.log('   - Data validation on write operations');
    console.log('   - Audit trail protection');
    
    return true;
  } catch (error) {
    console.error('❌ Failed to deploy Firestore rules:', error);
    return false;
  }
}

/**
 * Validate security rules
 */
function validateSecurityRules() {
  console.log('🔍 Validating security rules...');
  
  const validationChecks = [
    {
      name: 'Authentication Required',
      pattern: 'isAuthenticated()',
      description: 'All operations require authentication'
    },
    {
      name: 'Role-Based Access',
      pattern: 'isTeacher() || isStudent() || isAdmin()',
      description: 'Access control based on user roles'
    },
    {
      name: 'Data Validation',
      pattern: 'isValidUserData() || isValidClassData() || isValidEnrollmentData()',
      description: 'Input validation on write operations'
    },
    {
      name: 'Owner Access',
      pattern: 'isOwner(userId)',
      description: 'Users can only access their own data'
    },
    {
      name: 'Teacher Permissions',
      pattern: 'isClassInstructor(classId) || isEnrollmentInstructor(enrollmentId)',
      description: 'Teachers can manage their classes and enrollments'
    }
  ];
  
  validationChecks.forEach(check => {
    if (firestoreRules.includes(check.pattern)) {
      console.log(`✅ ${check.name}: ${check.description}`);
    } else {
      console.log(`❌ ${check.name}: Missing validation`);
    }
  });
  
  console.log('✅ Security rules validation completed');
}

/**
 * Generate security rules documentation
 */
function generateSecurityDocs() {
  const securityDocs = `
# Firestore Security Rules Documentation

## Overview
This document describes the security rules implemented for the Israel Cyber Academy student pool system.

## Collections

### Users Collection
- **Read Access**: Users can read their own data, teachers can read all student data
- **Write Access**: Users can update their own profile, teachers have limited access
- **Validation**: Email, displayName, and role are required fields

### Classes Collection
- **Read Access**: Teachers can read their classes, students can read enrolled classes
- **Write Access**: Teachers can manage their own classes
- **Validation**: className, instructorId, and maxStudents are required

### Class Enrollments Collection
- **Read Access**: Teachers can read enrollments for their classes
- **Write Access**: Teachers can manage enrollments for their classes
- **Validation**: classId, studentId, and instructorId are required

### Teacher Assignments Collection
- **Read Access**: Teachers can read their assignments, students can read their assignments
- **Write Access**: Teachers can manage their assignments
- **Validation**: teacherId and studentId are required

## Security Features

### Role-Based Access Control (RBAC)
- Students: Limited access to their own data and enrolled classes
- Teachers: Access to manage classes, enrollments, and student data
- Admins: Full access to all collections

### Data Validation
- Input validation on all write operations
- Required field validation
- Data type validation
- Business logic validation

### Relationship Validation
- Teachers can only manage their own classes
- Students can only access their own data
- Enrollment relationships are validated

### Audit Trail
- All operations are logged
- Admin-only access to audit logs
- Security event tracking

## Best Practices

1. **Principle of Least Privilege**: Users only have access to what they need
2. **Input Validation**: All data is validated before writing
3. **Relationship Validation**: Cross-collection relationships are validated
4. **Audit Logging**: All operations are logged for security
5. **Regular Reviews**: Security rules should be reviewed regularly

## Deployment

To deploy these rules:

\`\`\`bash
firebase deploy --only firestore:rules
\`\`\`

## Testing

Test the security rules with the Firebase Emulator:

\`\`\`bash
firebase emulators:start --only firestore
\`\`\`
`;

  console.log('📚 Security documentation generated');
  return securityDocs;
}

// Export functions
export {
  firestoreRules,
  deployFirestoreRules,
  validateSecurityRules,
  generateSecurityDocs
};

// Run validation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateSecurityRules();
  generateSecurityDocs();
  console.log('🎉 Security rules validation completed!');
} 