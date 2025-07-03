import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvOkJgJgJgJgJgJgJgJgJgJgJgJgJgJgJgJg",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testProgressUpdate() {
  try {
    // Replace with your actual user UID
    const testUserId = 'test-user-id'; // You'll need to replace this
    
    console.log('🔍 Testing progress update...');
    
    // Get current user data
    const userRef = doc(db, 'users', testUserId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('📊 Current user data:');
      console.log('- completedLessons:', userData.completedLessons);
      console.log('- totalPagesEngaged:', userData.totalPagesEngaged);
      console.log('- totalTimeSpent:', userData.totalTimeSpent);
      console.log('- progress:', userData.progress);
      
      // Simulate lesson 2 completion
      const progress = userData.progress || {};
      progress[2] = {
        completed: true,
        score: 100,
        completedAt: new Date(),
        temporary: false,
        lastSlide: 19,
        pagesEngaged: ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'],
        lastActivity: new Date()
      };
      
      // Update statistics
      const completedLessons = [...(userData.completedLessons || []), 2];
      const totalPagesEngaged = (userData.totalPagesEngaged || 0) + 5;
      const totalTimeSpent = (userData.totalTimeSpent || 0) + 15; // 15 minutes
      
      // Update Firestore
      await updateDoc(userRef, {
        progress,
        completedLessons,
        totalPagesEngaged,
        totalTimeSpent,
        lastActivityDate: new Date()
      });
      
      console.log('✅ Progress updated successfully!');
      console.log('📊 New data:');
      console.log('- completedLessons:', completedLessons);
      console.log('- totalPagesEngaged:', totalPagesEngaged);
      console.log('- totalTimeSpent:', totalTimeSpent);
      
    } else {
      console.log('❌ User not found');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testProgressUpdate(); 