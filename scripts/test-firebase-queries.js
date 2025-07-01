import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs,
  connectFirestoreEmulator 
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Test functions
async function testGetAllAvailableStudents() {
  console.log('🧪 Testing getAllAvailableStudents...');
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('role', 'in', ['student'])
    );
    
    const querySnapshot = await getDocs(q);
    const students = [];
    
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      students.push({
        uid: doc.id,
        displayName: userData.displayName || userData.email,
        email: userData.email,
        role: userData.role
      });
    });
    
    // Sort in JavaScript instead of Firestore
    students.sort((a, b) => {
      const nameA = (a.displayName || '').toLowerCase();
      const nameB = (b.displayName || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
    
    console.log(`✅ getAllAvailableStudents: Found ${students.length} students`);
    return true;
  } catch (error) {
    console.error('❌ getAllAvailableStudents failed:', error.message);
    return false;
  }
}

async function testGetClassStudents() {
  console.log('🧪 Testing getClassStudents...');
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef, 
      where('classId', '==', 'test-class-id')
    );
    
    const querySnapshot = await getDocs(q);
    const students = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      students.push({
        uid: doc.id,
        displayName: data.displayName || data.email,
        email: data.email,
        role: data.role,
        classId: data.classId
      });
    });
    
    // Sort in JavaScript instead of Firestore
    students.sort((a, b) => {
      const nameA = (a.displayName || '').toLowerCase();
      const nameB = (b.displayName || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
    
    console.log(`✅ getClassStudents: Found ${students.length} students in class`);
    return true;
  } catch (error) {
    console.error('❌ getClassStudents failed:', error.message);
    return false;
  }
}

async function testGetLessonComments() {
  console.log('🧪 Testing getLessonComments...');
  try {
    const q = query(
      collection(db, 'teacherComments'),
      where('lessonId', '==', 'test-lesson-id'),
      where('isActive', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    const comments = [];
    
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Sort in JavaScript instead of Firestore
    comments.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || new Date(0);
      const dateB = b.createdAt?.toDate?.() || new Date(0);
      return dateB - dateA; // Descending order (newest first)
    });
    
    console.log(`✅ getLessonComments: Found ${comments.length} comments`);
    return true;
  } catch (error) {
    console.error('❌ getLessonComments failed:', error.message);
    return false;
  }
}

async function testStudentPoolQueries() {
  console.log('🧪 Testing StudentPool queries...');
  try {
    // Test unassigned students query
    const usersRef = collection(db, 'users');
    const unassignedQuery = query(
      usersRef,
      where('role', '==', 'student')
    );
    
    const unassignedSnapshot = await getDocs(unassignedQuery);
    const unassignedStudents = unassignedSnapshot.docs
      .map(doc => ({ uid: doc.id, ...doc.data() }))
      .filter(student => !student.assignedClass);
    
    // Sort in JavaScript
    unassignedStudents.sort((a, b) => {
      const nameA = (a.displayName || '').toLowerCase();
      const nameB = (b.displayName || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
    
    console.log(`✅ StudentPool unassigned students: Found ${unassignedStudents.length} students`);
    
    // Test classes query
    const classesRef = collection(db, 'classes');
    const classesQuery = query(
      classesRef,
      where('instructorId', '==', 'test-teacher-id'),
      where('status', '==', 'active')
    );
    
    const classesSnapshot = await getDocs(classesQuery);
    const classes = classesSnapshot.docs.map(doc => ({
      classId: doc.id,
      ...doc.data()
    }));
    
    // Sort in JavaScript
    classes.sort((a, b) => {
      const numberA = a.classNumber || 0;
      const numberB = b.classNumber || 0;
      return numberA - numberB;
    });
    
    console.log(`✅ StudentPool classes: Found ${classes.length} classes`);
    return true;
  } catch (error) {
    console.error('❌ StudentPool queries failed:', error.message);
    return false;
  }
}

// Main test function
async function runAllTests() {
  console.log('🚀 Starting Firebase query tests...\n');
  
  const tests = [
    testGetAllAvailableStudents,
    testGetClassStudents,
    testGetLessonComments,
    testStudentPoolQueries
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const result = await test();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error(`❌ Test failed with error:`, error.message);
      failed++;
    }
    console.log(''); // Add spacing between tests
  }
  
  console.log('📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! No composite index errors detected.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
  }
}

// Run the tests
runAllTests().catch(console.error); 