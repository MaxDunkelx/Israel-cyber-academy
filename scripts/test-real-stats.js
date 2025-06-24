/**
 * Test Real Statistics Script
 * 
 * This script tests the real statistics loading from Firebase
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxJjowL60YhAxPHWzOOSESOjMIfXj5pXk",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "1098765432109",
  appId: "1:1098765432109:web:abcdef1234567890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testRealStats() {
  try {
    console.log('🧪 Testing real statistics loading...\n');

    // Get all users from Firebase
    console.log('1️⃣ Fetching users from Firebase...');
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    
    let totalUsers = 0;
    let totalStudents = 0;
    let totalTeachers = 0;
    let totalSystemManagers = 0;
    
    console.log('2️⃣ Analyzing user roles...');
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      totalUsers++;
      
      switch (userData.role) {
        case 'student':
          totalStudents++;
          break;
        case 'teacher':
          totalTeachers++;
          break;
        case 'system_manager':
          totalSystemManagers++;
          break;
        default:
          totalStudents++;
          break;
      }
    });
    
    // Get total lessons
    const totalLessons = 9; // Current number of lessons in the system
    
    console.log('3️⃣ Statistics Summary:');
    console.log(`   Total Users: ${totalUsers}`);
    console.log(`   Students: ${totalStudents}`);
    console.log(`   Teachers: ${totalTeachers}`);
    console.log(`   System Managers: ${totalSystemManagers}`);
    console.log(`   Total Lessons: ${totalLessons}`);
    
    console.log('\n4️⃣ Recent Users:');
    const recentUsers = usersSnapshot.docs
      .sort((a, b) => b.data().createdAt?.toDate?.() - a.data().createdAt?.toDate?.())
      .slice(0, 3);
    
    recentUsers.forEach((userDoc, index) => {
      const userData = userDoc.data();
      console.log(`   ${index + 1}. ${userData.displayName || userData.email} (${userData.role})`);
    });
    
    console.log('\n✅ Real statistics test completed successfully!');
    console.log('💡 The system manager dashboard should now show real data');

  } catch (error) {
    console.error('❌ Error testing real stats:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message
    });
  }
}

// Run the test
testRealStats().then(() => {
  console.log('\n🏁 Test completed');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Test failed:', error);
  process.exit(1);
}); 