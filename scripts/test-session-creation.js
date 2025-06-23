const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  getDoc,
  serverTimestamp 
} = require('firebase/firestore');

// Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testSessionCreation() {
  try {
    console.log('🧪 Testing session creation...');
    
    // Test session data
    const sessionData = {
      teacherId: 'test-teacher-id',
      teacherName: 'Test Teacher',
      classId: 'test-class-id',
      className: 'Test Class',
      lessonId: 1,
      lessonName: 'Test Lesson',
      studentIds: ['student1', 'student2'],
      totalSlides: 10,
      status: 'active',
      currentSlide: 0,
      unlockedSlides: [0],
      startTime: serverTimestamp(),
      lastActivity: serverTimestamp(),
      connectedStudents: [],
      studentProgress: {},
      teacherNotes: {},
      isLocked: false
    };

    // Create session
    const sessionRef = collection(db, 'sessions');
    const sessionDoc = await addDoc(sessionRef, sessionData);
    
    console.log('✅ Session created successfully!');
    console.log('Session ID:', sessionDoc.id);
    
    // Verify session exists
    const createdSession = await getDoc(doc(db, 'sessions', sessionDoc.id));
    if (createdSession.exists()) {
      console.log('✅ Session verified in database');
      console.log('Session data:', createdSession.data());
    } else {
      console.log('❌ Session not found in database');
    }
    
    return sessionDoc.id;
  } catch (error) {
    console.error('❌ Error testing session creation:', error);
    throw error;
  }
}

// Run the test
testSessionCreation()
  .then(sessionId => {
    console.log('🎉 Test completed successfully!');
    console.log('Created session ID:', sessionId);
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Test failed:', error);
    process.exit(1);
  }); 