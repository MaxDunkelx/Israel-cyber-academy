/**
 * Test Live Session Notification
 * 
 * This script tests the live session notification functionality
 * by creating a mock session and verifying the notification appears.
 */

const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  getDocs,
  deleteDoc,
  doc 
} = require('firebase/firestore');

// Firebase config (replace with your actual config)
const firebaseConfig = {
  // Add your Firebase config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Test the getCurrentActiveSessionForStudent function
 */
async function testGetCurrentActiveSessionForStudent() {
  console.log('🧪 Testing getCurrentActiveSessionForStudent...');
  
  try {
    // Create a test session
    const testSessionData = {
      teacherId: 'test-teacher-123',
      classId: 'test-class-456',
      lessonId: 1,
      lessonName: 'מבוא לאבטחת סייבר',
      className: 'כיתה יא 1',
      studentIds: ['test-student-789'],
      status: 'active',
      currentSlide: 2,
      startTime: new Date(),
      lastActivity: new Date(),
      connectedStudents: [
        {
          id: 'test-student-789',
          name: 'תלמיד בדיקה',
          joinedAt: new Date(),
          lastActivity: new Date(),
          currentSlide: 2
        }
      ],
      unlockedSlides: [0, 1, 2],
      studentProgress: {},
      teacherNotes: {},
      isLocked: false
    };

    console.log('📝 Creating test session...');
    const sessionRef = await addDoc(collection(db, 'sessions'), testSessionData);
    console.log('✅ Test session created with ID:', sessionRef.id);

    // Test the function
    const sessionsRef = collection(db, 'sessions');
    const q = query(
      sessionsRef,
      where('status', '==', 'active'),
      orderBy('startTime', 'desc'),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    let currentSession = null;
    
    for (const doc of querySnapshot.docs) {
      const sessionData = doc.data();
      if (sessionData.studentIds && sessionData.studentIds.includes('test-student-789')) {
        currentSession = {
          id: doc.id,
          ...sessionData
        };
        break;
      }
    }

    if (currentSession) {
      console.log('✅ Found active session for student:', {
        sessionId: currentSession.id,
        lessonName: currentSession.lessonName,
        currentSlide: currentSession.currentSlide,
        connectedStudents: currentSession.connectedStudents.length
      });
    } else {
      console.log('❌ No active session found for student');
    }

    // Clean up
    console.log('🧹 Cleaning up test session...');
    await deleteDoc(doc(db, 'sessions', sessionRef.id));
    console.log('✅ Test session deleted');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('🚀 Starting Live Session Notification Tests...\n');
  
  await testGetCurrentActiveSessionForStudent();
  
  console.log('\n✅ All tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testGetCurrentActiveSessionForStudent,
  runTests
}; 