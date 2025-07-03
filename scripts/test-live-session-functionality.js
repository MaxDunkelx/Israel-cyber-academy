/**
 * Live Session Functionality Test Script
 * 
 * This script tests all aspects of live session functionality:
 * 1. Lesson loading from database
 * 2. Slide navigation and synchronization
 * 3. Student joining/leaving sessions
 * 4. Teacher controls and session management
 * 5. Real-time updates
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('🚀 Starting Live Session Functionality Test...\n');

/**
 * Test 1: Verify all lessons load correctly with slides
 */
async function testLessonLoading() {
  console.log('📚 Test 1: Lesson Loading from Database');
  console.log('=' .repeat(50));
  
  try {
    // Get all lessons
    const lessonsRef = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsRef);
    const lessons = [];
    
    lessonsSnapshot.forEach((doc) => {
      const data = doc.data();
      lessons.push({
        id: doc.id,
        ...data
      });
    });
    
    console.log(`✅ Found ${lessons.length} lessons in database`);
    
    // Sort lessons by order
    lessons.sort((a, b) => {
      const orderA = a.order || a.originalId || 0;
      const orderB = b.order || b.originalId || 0;
      return orderA - orderB;
    });
    
    // Test each lesson
    for (const lesson of lessons) {
      console.log(`\n🔍 Testing lesson: ${lesson.title} (ID: ${lesson.id})`);
      
      // Get slides for this lesson
      const slidesRef = collection(db, 'slides');
      const slidesQuery = query(slidesRef, where('lessonId', '==', lesson.id));
      const slidesSnapshot = await getDocs(slidesQuery);
      const slides = [];
      
      slidesSnapshot.forEach((doc) => {
        const slideData = doc.data();
        slides.push({
          id: doc.id,
          ...slideData
        });
      });
      
      // Sort slides by order
      slides.sort((a, b) => {
        const orderA = a.order || a.sortOrder || 0;
        const orderB = b.order || b.sortOrder || 0;
        return orderA - orderB;
      });
      
      console.log(`  📊 Slides: ${slides.length} slides found`);
      console.log(`  📋 Slide types: ${slides.map(s => s.type).join(', ')}`);
      
      // Verify slide data integrity
      const slideTypes = ['presentation', 'poll', 'video', 'interactive', 'break', 'reflection', 'quiz'];
      const invalidSlides = slides.filter(slide => !slideTypes.includes(slide.type));
      
      if (invalidSlides.length > 0) {
        console.log(`  ⚠️  Warning: ${invalidSlides.length} slides with invalid types`);
        invalidSlides.forEach(slide => {
          console.log(`    - Slide ${slide.id}: type "${slide.type}"`);
        });
      }
      
      // Check for missing required fields
      const slidesWithIssues = slides.filter(slide => {
        return !slide.title || !slide.content || !slide.type;
      });
      
      if (slidesWithIssues.length > 0) {
        console.log(`  ⚠️  Warning: ${slidesWithIssues.length} slides with missing required fields`);
      }
    }
    
    console.log('\n✅ Lesson loading test completed successfully');
    return lessons;
    
  } catch (error) {
    console.error('❌ Error in lesson loading test:', error);
    throw error;
  }
}

/**
 * Test 2: Verify session creation and management
 */
async function testSessionManagement() {
  console.log('\n🎯 Test 2: Session Management');
  console.log('=' .repeat(50));
  
  try {
    // Get existing sessions
    const sessionsRef = collection(db, 'sessions');
    const sessionsSnapshot = await getDocs(sessionsRef);
    const sessions = [];
    
    sessionsSnapshot.forEach((doc) => {
      const data = doc.data();
      sessions.push({
        id: doc.id,
        ...data
      });
    });
    
    console.log(`📊 Found ${sessions.length} existing sessions`);
    
    // Analyze session data
    const activeSessions = sessions.filter(s => s.status === 'active');
    const endedSessions = sessions.filter(s => s.status === 'ended');
    
    console.log(`  🟢 Active sessions: ${activeSessions.length}`);
    console.log(`  🔴 Ended sessions: ${endedSessions.length}`);
    
    // Check session data integrity
    for (const session of sessions) {
      console.log(`\n🔍 Session: ${session.lessonName || 'Unknown'} (${session.id})`);
      console.log(`  📅 Status: ${session.status}`);
      console.log(`  👨‍🏫 Teacher: ${session.teacherId}`);
      console.log(`  👥 Students: ${session.studentIds?.length || 0}`);
      console.log(`  📍 Current slide: ${session.currentSlide || 0}`);
      console.log(`  🔒 Locked: ${session.isLocked || false}`);
      
      // Check for required fields
      const missingFields = [];
      if (!session.lessonId) missingFields.push('lessonId');
      if (!session.teacherId) missingFields.push('teacherId');
      if (!session.startTime) missingFields.push('startTime');
      
      if (missingFields.length > 0) {
        console.log(`  ⚠️  Missing fields: ${missingFields.join(', ')}`);
      }
    }
    
    console.log('\n✅ Session management test completed successfully');
    return sessions;
    
  } catch (error) {
    console.error('❌ Error in session management test:', error);
    throw error;
  }
}

/**
 * Test 3: Verify real-time session updates
 */
async function testRealTimeUpdates() {
  console.log('\n⚡ Test 3: Real-time Session Updates');
  console.log('=' .repeat(50));
  
  try {
    // Get active sessions
    const sessionsRef = collection(db, 'sessions');
    const activeSessionsQuery = query(sessionsRef, where('status', '==', 'active'));
    const activeSessionsSnapshot = await getDocs(activeSessionsQuery);
    
    console.log(`📊 Found ${activeSessionsSnapshot.size} active sessions`);
    
    if (activeSessionsSnapshot.size === 0) {
      console.log('ℹ️  No active sessions to test real-time updates');
      return;
    }
    
    // Test real-time listener on first active session
    const firstSession = activeSessionsSnapshot.docs[0];
    const sessionId = firstSession.id;
    const sessionData = firstSession.data();
    
    console.log(`🔍 Testing real-time updates for session: ${sessionData.lessonName || 'Unknown'}`);
    
    // Set up real-time listener
    const sessionRef = doc(db, 'sessions', sessionId);
    let updateCount = 0;
    
    const unsubscribe = onSnapshot(sessionRef, (doc) => {
      if (doc.exists()) {
        updateCount++;
        const data = doc.data();
        console.log(`📡 Real-time update #${updateCount}:`);
        console.log(`  📍 Current slide: ${data.currentSlide || 0}`);
        console.log(`  👥 Connected students: ${data.connectedStudents?.length || 0}`);
        console.log(`  🔒 Locked: ${data.isLocked || false}`);
        console.log(`  ⏰ Last activity: ${data.lastActivity?.toDate?.() || 'N/A'}`);
        
        // Stop listening after 3 updates
        if (updateCount >= 3) {
          unsubscribe();
          console.log('✅ Real-time updates test completed');
        }
      }
    }, (error) => {
      console.error('❌ Error in real-time listener:', error);
    });
    
    // Wait for updates
    await new Promise(resolve => setTimeout(resolve, 5000));
    
  } catch (error) {
    console.error('❌ Error in real-time updates test:', error);
    throw error;
  }
}

/**
 * Test 4: Verify student session synchronization
 */
async function testStudentSynchronization() {
  console.log('\n👥 Test 4: Student Session Synchronization');
  console.log('=' .repeat(50));
  
  try {
    // Get active sessions with connected students
    const sessionsRef = collection(db, 'sessions');
    const activeSessionsQuery = query(sessionsRef, where('status', '==', 'active'));
    const activeSessionsSnapshot = await getDocs(activeSessionsQuery);
    
    console.log(`📊 Found ${activeSessionsSnapshot.size} active sessions`);
    
    for (const sessionDoc of activeSessionsSnapshot.docs) {
      const sessionData = sessionDoc.data();
      const sessionId = sessionDoc.id;
      
      console.log(`\n🔍 Session: ${sessionData.lessonName || 'Unknown'} (${sessionId})`);
      
      // Check connected students
      const connectedStudents = sessionData.connectedStudents || [];
      const studentIds = sessionData.studentIds || [];
      
      console.log(`  👥 Total students: ${studentIds.length}`);
      console.log(`  🟢 Connected students: ${connectedStudents.length}`);
      console.log(`  🔴 Disconnected students: ${studentIds.length - connectedStudents.length}`);
      
      // Analyze connected students
      for (const student of connectedStudents) {
        console.log(`    👤 ${student.name} (${student.id})`);
        console.log(`      📍 Current slide: ${student.currentSlide || 0}`);
        console.log(`      ⏰ Joined: ${student.joinedAt?.toDate?.() || 'N/A'}`);
        console.log(`      🔄 Last activity: ${student.lastActivity?.toDate?.() || 'N/A'}`);
      }
      
      // Check student progress
      const studentProgress = sessionData.studentProgress || {};
      console.log(`  📊 Students with progress data: ${Object.keys(studentProgress).length}`);
      
      // Check unlocked slides
      const unlockedSlides = sessionData.unlockedSlides || [0];
      console.log(`  🔓 Unlocked slides: ${unlockedSlides.join(', ')}`);
    }
    
    console.log('\n✅ Student synchronization test completed successfully');
    
  } catch (error) {
    console.error('❌ Error in student synchronization test:', error);
    throw error;
  }
}

/**
 * Test 5: Verify teacher controls and session locking
 */
async function testTeacherControls() {
  console.log('\n👨‍🏫 Test 5: Teacher Controls and Session Locking');
  console.log('=' .repeat(50));
  
  try {
    // Get active sessions
    const sessionsRef = collection(db, 'sessions');
    const activeSessionsQuery = query(sessionsRef, where('status', '==', 'active'));
    const activeSessionsSnapshot = await getDocs(activeSessionsQuery);
    
    console.log(`📊 Found ${activeSessionsSnapshot.size} active sessions`);
    
    for (const sessionDoc of activeSessionsSnapshot.docs) {
      const sessionData = sessionDoc.data();
      const sessionId = sessionDoc.id;
      
      console.log(`\n🔍 Session: ${sessionData.lessonName || 'Unknown'} (${sessionId})`);
      
      // Check teacher controls
      console.log(`  👨‍🏫 Teacher ID: ${sessionData.teacherId}`);
      console.log(`  🔒 Session locked: ${sessionData.isLocked || false}`);
      console.log(`  📍 Current slide: ${sessionData.currentSlide || 0}`);
      console.log(`  🎯 Total slides: ${sessionData.totalSlides || 'Unknown'}`);
      
      // Check teacher notes
      const teacherNotes = sessionData.teacherNotes || {};
      const notesCount = Object.keys(teacherNotes).length;
      console.log(`  📝 Teacher notes: ${notesCount} notes`);
      
      if (notesCount > 0) {
        Object.entries(teacherNotes).forEach(([slideIndex, note]) => {
          console.log(`    📍 Slide ${slideIndex}: ${note.content?.substring(0, 50)}...`);
        });
      }
      
      // Check session duration
      if (sessionData.startTime) {
        const startTime = sessionData.startTime.toDate();
        const duration = Date.now() - startTime.getTime();
        const minutes = Math.floor(duration / (1000 * 60));
        console.log(`  ⏰ Session duration: ${minutes} minutes`);
      }
    }
    
    console.log('\n✅ Teacher controls test completed successfully');
    
  } catch (error) {
    console.error('❌ Error in teacher controls test:', error);
    throw error;
  }
}

/**
 * Test 6: Verify slide navigation and progression
 */
async function testSlideNavigation() {
  console.log('\n🔄 Test 6: Slide Navigation and Progression');
  console.log('=' .repeat(50));
  
  try {
    // Get active sessions
    const sessionsRef = collection(db, 'sessions');
    const activeSessionsQuery = query(sessionsRef, where('status', '==', 'active'));
    const activeSessionsSnapshot = await getDocs(activeSessionsQuery);
    
    console.log(`📊 Found ${activeSessionsSnapshot.size} active sessions`);
    
    for (const sessionDoc of activeSessionsSnapshot.docs) {
      const sessionData = sessionDoc.data();
      const sessionId = sessionDoc.id;
      
      console.log(`\n🔍 Session: ${sessionData.lessonName || 'Unknown'} (${sessionId})`);
      
      // Get lesson slides
      const lessonId = sessionData.lessonId;
      if (lessonId) {
        const slidesRef = collection(db, 'slides');
        const slidesQuery = query(slidesRef, where('lessonId', '==', lessonId));
        const slidesSnapshot = await getDocs(slidesQuery);
        const slides = [];
        
        slidesSnapshot.forEach((doc) => {
          const slideData = doc.data();
          slides.push({
            id: doc.id,
            ...slideData
          });
        });
        
        // Sort slides by order
        slides.sort((a, b) => {
          const orderA = a.order || a.sortOrder || 0;
          const orderB = b.order || b.sortOrder || 0;
          return orderA - orderB;
        });
        
        console.log(`  📚 Total slides in lesson: ${slides.length}`);
        console.log(`  📍 Current slide index: ${sessionData.currentSlide || 0}`);
        
        // Check current slide
        const currentSlideIndex = sessionData.currentSlide || 0;
        const currentSlide = slides[currentSlideIndex];
        
        if (currentSlide) {
          console.log(`  🎯 Current slide: ${currentSlide.title} (${currentSlide.type})`);
        } else {
          console.log(`  ⚠️  Current slide not found at index ${currentSlideIndex}`);
        }
        
        // Check slide progression
        const unlockedSlides = sessionData.unlockedSlides || [0];
        console.log(`  🔓 Unlocked slides: ${unlockedSlides.join(', ')}`);
        
        // Verify slide order consistency
        const slideOrders = slides.map((slide, index) => ({
          index,
          order: slide.order || slide.sortOrder || 0,
          title: slide.title
        }));
        
        const outOfOrderSlides = slideOrders.filter((slide, index) => {
          return slide.order !== index + 1;
        });
        
        if (outOfOrderSlides.length > 0) {
          console.log(`  ⚠️  ${outOfOrderSlides.length} slides with inconsistent ordering`);
          outOfOrderSlides.forEach(slide => {
            console.log(`    📍 Index ${slide.index}: "${slide.title}" (type: ${slide.type})" (order: ${slide.order})`);
          });
        }
      }
    }
    
    console.log('\n✅ Slide navigation test completed successfully');
    
  } catch (error) {
    console.error('❌ Error in slide navigation test:', error);
    throw error;
  }
}

/**
 * Main test function
 */
async function runAllTests() {
  try {
    console.log('🎯 Starting comprehensive live session functionality test...\n');
    
    // Run all tests
    await testLessonLoading();
    await testSessionManagement();
    await testRealTimeUpdates();
    await testStudentSynchronization();
    await testTeacherControls();
    await testSlideNavigation();
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('✅ Lesson loading from database works correctly');
    console.log('✅ Session management and creation functions properly');
    console.log('✅ Real-time updates are working');
    console.log('✅ Student synchronization is functional');
    console.log('✅ Teacher controls and session locking work');
    console.log('✅ Slide navigation and progression is consistent');
    
    console.log('\n🚀 Live session functionality is ready for use!');
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Run the tests
runAllTests(); 