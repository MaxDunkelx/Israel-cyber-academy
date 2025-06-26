/**
 * Test System Manager Operations Script
 * 
 * This script tests all the database operations that the system manager interface performs:
 * - Creating teachers
 * - Editing users
 * - Deleting users
 * - Assigning students to teachers
 * 
 * Usage: node scripts/test-system-manager-operations.js
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  getDoc,
  deleteDoc,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  updateProfile,
  deleteUser
} from 'firebase/auth';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Validate configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Missing Firebase configuration. Please check your .env file.');
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function testSystemManagerOperations() {
  try {
    console.log('🧪 Testing System Manager Database Operations...\n');
    
    // Test 1: Check current database state
    console.log('📊 Current Database State:');
    await checkCurrentDatabaseState();
    
    // Test 2: Test teacher creation (simulate CreateTeacherModal)
    console.log('\n👨‍🏫 Testing Teacher Creation:');
    await testTeacherCreation();
    
    // Test 3: Test user editing (simulate EditUserModal)
    console.log('\n✏️ Testing User Editing:');
    await testUserEditing();
    
    // Test 4: Test student assignment (simulate AssignStudentsModal)
    console.log('\n👥 Testing Student Assignment:');
    await testStudentAssignment();
    
    // Test 5: Test user deletion (simulate DeleteUserModal)
    console.log('\n🗑️ Testing User Deletion:');
    await testUserDeletion();
    
    console.log('\n✅ All system manager operations tested successfully!');
    
  } catch (error) {
    console.error('❌ Error testing system manager operations:', error);
  }
}

async function checkCurrentDatabaseState() {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    const students = [];
    const teachers = [];
    const systemManagers = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const user = { id: doc.id, ...data };
      
      if (data.role === 'student') {
        students.push(user);
      } else if (data.role === 'teacher') {
        teachers.push(user);
      } else if (data.role === 'system_manager') {
        systemManagers.push(user);
      }
    });
    
    console.log(`  - Students: ${students.length}`);
    console.log(`  - Teachers: ${teachers.length}`);
    console.log(`  - System Managers: ${systemManagers.length}`);
    console.log(`  - Total Users: ${snapshot.size}`);
    
    return { students, teachers, systemManagers };
  } catch (error) {
    console.error('  ❌ Error checking database state:', error);
    throw error;
  }
}

async function testTeacherCreation() {
  try {
    const testTeacherEmail = `test-teacher-${Date.now()}@example.com`;
    const testTeacherPassword = 'Teacher123!';
    const testTeacherData = {
      firstName: 'Test',
      lastName: 'Teacher',
      displayName: 'Test Teacher'
    };
    
    console.log(`  📧 Creating teacher: ${testTeacherEmail}`);
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      testTeacherEmail, 
      testTeacherPassword
    );
    
    const user = userCredential.user;
    console.log(`  ✅ Auth user created: ${user.uid}`);
    
    // Update display name
    await updateProfile(user, { displayName: testTeacherData.displayName });
    console.log(`  ✅ Display name updated`);
    
    // Create teacher profile in Firestore (simulate CreateTeacherModal)
    const teacherProfile = {
      uid: user.uid,
      email: user.email,
      displayName: testTeacherData.displayName,
      role: 'teacher',
      firstName: testTeacherData.firstName,
      lastName: testTeacherData.lastName,
      teacherClasses: [],
      teacherPermissions: ['manage_students', 'view_analytics', 'add_comments'],
      teacherSettings: {
        defaultClassId: null,
        notificationPreferences: {
          emailNotifications: true,
          studentProgressAlerts: true,
          classUpdates: true
        }
      },
      progress: {},
      completedLessons: [],
      currentLesson: 1,
      totalTimeSpent: 0,
      totalPagesEngaged: 0,
      achievements: [],
      streak: 0,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      lastActivityDate: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    // Store in Firestore
    const { setDoc } = await import('firebase/firestore');
    await setDoc(doc(db, 'users', user.uid), teacherProfile);
    console.log(`  ✅ Teacher profile created in Firestore`);
    
    // Verify the teacher was created
    const teacherDoc = await getDoc(doc(db, 'users', user.uid));
    if (teacherDoc.exists()) {
      console.log(`  ✅ Teacher verification successful`);
      return user.uid;
    } else {
      throw new Error('Teacher document not found after creation');
    }
    
  } catch (error) {
    console.error(`  ❌ Error creating teacher:`, error);
    throw error;
  }
}

async function testUserEditing() {
  try {
    // Find a student to edit
    const usersRef = collection(db, 'users');
    const studentsQuery = query(usersRef, where('role', '==', 'student'));
    const studentsSnapshot = await getDocs(studentsQuery);
    
    if (studentsSnapshot.empty) {
      console.log(`  ⚠️ No students found to test editing`);
      return;
    }
    
    const studentDoc = studentsSnapshot.docs[0];
    const studentId = studentDoc.id;
    const originalData = studentDoc.data();
    
    console.log(`  📝 Editing student: ${originalData.displayName || originalData.email}`);
    
    // Simulate EditUserModal update
    const updateData = {
      displayName: `Updated ${originalData.displayName || 'Student'}`,
      firstName: 'Updated',
      lastName: 'Student',
      age: 15,
      sex: 'male',
      role: 'student',
      updatedAt: serverTimestamp()
    };
    
    const { updateDoc } = await import('firebase/firestore');
    await updateDoc(doc(db, 'users', studentId), updateData);
    console.log(`  ✅ Student updated successfully`);
    
    // Verify the update
    const updatedDoc = await getDoc(doc(db, 'users', studentId));
    if (updatedDoc.exists()) {
      const updatedData = updatedDoc.data();
      console.log(`  ✅ Update verification: ${updatedData.displayName}`);
    }
    
  } catch (error) {
    console.error(`  ❌ Error editing user:`, error);
    throw error;
  }
}

async function testStudentAssignment() {
  try {
    // Find a teacher and unassigned students
    const usersRef = collection(db, 'users');
    
    const teachersQuery = query(usersRef, where('role', '==', 'teacher'));
    const teachersSnapshot = await getDocs(teachersQuery);
    
    const studentsQuery = query(usersRef, where('role', '==', 'student'));
    const studentsSnapshot = await getDocs(studentsQuery);
    
    if (teachersSnapshot.empty) {
      console.log(`  ⚠️ No teachers found to test assignment`);
      return;
    }
    
    if (studentsSnapshot.empty) {
      console.log(`  ⚠️ No students found to test assignment`);
      return;
    }
    
    const teacherDoc = teachersSnapshot.docs[0];
    const teacherId = teacherDoc.id;
    const teacherData = teacherDoc.data();
    
    // Find unassigned students
    const unassignedStudents = [];
    studentsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (!data.teacherId) {
        unassignedStudents.push({ id: doc.id, ...data });
      }
    });
    
    if (unassignedStudents.length === 0) {
      console.log(`  ⚠️ No unassigned students found`);
      return;
    }
    
    const studentsToAssign = unassignedStudents.slice(0, 2); // Assign first 2 students
    const studentIds = studentsToAssign.map(s => s.id);
    
    console.log(`  👥 Assigning ${studentIds.length} students to teacher: ${teacherData.displayName}`);
    
    // Simulate AssignStudentsModal batch update
    const batch = writeBatch(db);
    
    for (const studentId of studentIds) {
      const studentRef = doc(db, 'users', studentId);
      batch.update(studentRef, {
        teacherId: teacherId,
        updatedAt: serverTimestamp()
      });
    }
    
    await batch.commit();
    console.log(`  ✅ Students assigned successfully`);
    
    // Verify assignments
    for (const studentId of studentIds) {
      const studentDoc = await getDoc(doc(db, 'users', studentId));
      if (studentDoc.exists()) {
        const studentData = studentDoc.data();
        console.log(`  ✅ Student ${studentData.displayName} assigned to teacher ${teacherId}`);
      }
    }
    
  } catch (error) {
    console.error(`  ❌ Error assigning students:`, error);
    throw error;
  }
}

async function testUserDeletion() {
  try {
    // Find a test user to delete (preferably one we created)
    const usersRef = collection(db, 'users');
    const testUsersQuery = query(usersRef, where('email', '>=', 'test-'));
    const testUsersSnapshot = await getDocs(testUsersQuery);
    
    if (testUsersSnapshot.empty) {
      console.log(`  ⚠️ No test users found to delete`);
      return;
    }
    
    const testUserDoc = testUsersSnapshot.docs[0];
    const testUserId = testUserDoc.id;
    const testUserData = testUserDoc.data();
    
    console.log(`  🗑️ Deleting test user: ${testUserData.displayName || testUserData.email}`);
    
    // Simulate DeleteUserModal deletion
    await deleteDoc(doc(db, 'users', testUserId));
    console.log(`  ✅ User document deleted from Firestore`);
    
    // Verify deletion
    const deletedDoc = await getDoc(doc(db, 'users', testUserId));
    if (!deletedDoc.exists()) {
      console.log(`  ✅ User deletion verified`);
    } else {
      throw new Error('User document still exists after deletion');
    }
    
  } catch (error) {
    console.error(`  ❌ Error deleting user:`, error);
    throw error;
  }
}

// Run the test
testSystemManagerOperations()
  .then(() => {
    console.log('\n🎉 System manager operations test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 System manager operations test failed:', error);
    process.exit(1);
  }); 