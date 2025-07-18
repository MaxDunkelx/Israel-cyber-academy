/**
 * Fix Student Password Script
 * Updates student001 password to match the expected password123
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC35sH38k9co_R0zBsbDT0S6RE1Cp-ksHE",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "750693821908",
  appId: "1:750693821908:web:6518d1facad1d8095cfa41"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fixStudentPassword() {
  console.log('🔧 Fixing student001 password...\n');
  
  try {
    // Find student001
    const usersRef = collection(db, 'users');
    const emailQuery = query(usersRef, where('email', '==', 'student001@cyber.academy'));
    const querySnapshot = await getDocs(emailQuery);
    
    if (querySnapshot.empty) {
      console.log('❌ student001 not found');
      return false;
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    console.log('📋 Current user data:');
    console.log('   ID:', userDoc.id);
    console.log('   Email:', userData.email);
    console.log('   Current password:', userData.password);
    console.log('   Role:', userData.role);
    
    // Update password to password123
    await updateDoc(doc(db, 'users', userDoc.id), {
      password: 'password123',
      updatedAt: new Date().toISOString()
    });
    
    console.log('\n✅ Password updated successfully!');
    console.log('   New password: password123');
    console.log('   User can now login with: student001@cyber.academy / password123');
    
    return true;
    
  } catch (error) {
    console.error('❌ Failed to update password:', error);
    return false;
  }
}

// Run the fix
fixStudentPassword().then((success) => {
  console.log('\n🔧 Password fix completed!');
  process.exit(success ? 0 : 1);
}).catch((error) => {
  console.error('❌ Password fix failed:', error);
  process.exit(1);
}); 