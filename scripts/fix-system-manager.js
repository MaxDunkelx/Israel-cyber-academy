/**
 * Fix System Manager User Script
 * 
 * This script ensures that the system manager user exists with the correct role
 * and updates the database if needed.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';

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

const SYSTEM_MANAGER_EMAIL = 'maxibunnyshow@gmail.com';

async function fixSystemManager() {
  try {
    console.log('🔧 Fixing system manager user...\n');

    // First, check if the system manager user exists
    console.log(`🔍 Looking for system manager with email: ${SYSTEM_MANAGER_EMAIL}`);
    
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', SYSTEM_MANAGER_EMAIL));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('❌ System manager user not found in database');
      console.log('💡 The user needs to be created through the registration process');
      console.log('💡 Make sure to register with the email: maxibunnyshow@gmail.com');
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    console.log('✅ Found system manager user:');
    console.log(`   UID: ${userDoc.id}`);
    console.log(`   Email: ${userData.email}`);
    console.log(`   Current Role: ${userData.role}`);
    console.log(`   Display Name: ${userData.displayName}`);

    // Check if the role is correct
    if (userData.role === 'system_manager') {
      console.log('✅ User already has correct system_manager role');
      
      // Check if system manager permissions exist
      if (!userData.systemManagerPermissions) {
        console.log('⚠️ Missing system manager permissions, updating...');
        await updateDoc(doc(db, 'users', userDoc.id), {
          systemManagerPermissions: [
            'manage_users', 
            'manage_content', 
            'manage_system', 
            'view_logs',
            'import_data',
            'export_data'
          ],
          systemManagerSettings: {
            defaultLanguage: 'he',
            notificationPreferences: {
              emailNotifications: true,
              systemAlerts: true,
              userActivityReports: true
            }
          },
          updatedAt: new Date()
        });
        console.log('✅ System manager permissions updated');
      } else {
        console.log('✅ System manager permissions already exist');
      }
    } else {
      console.log('⚠️ User does not have system_manager role, updating...');
      
      // Update the user to have system_manager role
      await updateDoc(doc(db, 'users', userDoc.id), {
        role: 'system_manager',
        systemManagerPermissions: [
          'manage_users', 
          'manage_content', 
          'manage_system', 
          'view_logs',
          'import_data',
          'export_data'
        ],
        systemManagerSettings: {
          defaultLanguage: 'he',
          notificationPreferences: {
            emailNotifications: true,
            systemAlerts: true,
            userActivityReports: true
          }
        },
        updatedAt: new Date()
      });
      
      console.log('✅ User role updated to system_manager');
    }

    // Verify the update
    const updatedDoc = await getDoc(doc(db, 'users', userDoc.id));
    const updatedData = updatedDoc.data();
    
    console.log('\n✅ Verification:');
    console.log(`   Role: ${updatedData.role}`);
    console.log(`   Permissions: ${updatedData.systemManagerPermissions?.length || 0} permissions`);
    console.log(`   Settings: ${updatedData.systemManagerSettings ? 'Configured' : 'Missing'}`);

    console.log('\n🎉 System manager user is now properly configured!');
    console.log('💡 You can now log in with maxibunnyshow@gmail.com and access the system manager dashboard');

  } catch (error) {
    console.error('❌ Error fixing system manager:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message
    });
  }
}

// Run the script
fixSystemManager().then(() => {
  console.log('\n🏁 Script completed');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
}); 