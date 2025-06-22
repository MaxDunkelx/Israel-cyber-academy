const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, getDoc, setDoc, updateDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxJjow9Tz8Jj8Jj8Jj8Jj8Jj8Jj8Jj8Jj8",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const EMAIL = 'maxbunntshow@gmail.com';
const PASSWORD = 'your_password_here'; // You'll need to provide the actual password

async function checkAndFixTeacherRole() {
  try {
    console.log('🔍 Checking teacher role for:', EMAIL);
    
    // Sign in with the user
    const userCredential = await signInWithEmailAndPassword(auth, EMAIL, PASSWORD);
    const user = userCredential.user;
    
    console.log('✅ Successfully signed in as:', user.email);
    
    // Check current role in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('📋 Current user data:', userData);
      
      if (userData.role === 'teacher') {
        console.log('✅ User already has teacher role!');
        return;
      } else {
        console.log('⚠️ User has role:', userData.role, '- updating to teacher...');
      }
    } else {
      console.log('📝 User document doesn\'t exist - creating with teacher role...');
    }
    
    // Update or create user document with teacher role
    const userData = {
      email: user.email,
      role: 'teacher',
      displayName: user.displayName || 'Teacher',
      createdAt: new Date(),
      updatedAt: new Date(),
      permissions: ['view_dashboard', 'manage_students', 'view_analytics', 'manage_classes'],
      isActive: true
    };
    
    await setDoc(userDocRef, userData, { merge: true });
    
    console.log('✅ Successfully updated user to teacher role!');
    console.log('📋 Updated user data:', userData);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 'auth/user-not-found') {
      console.log('💡 User not found. Please create the user first.');
    } else if (error.code === 'auth/wrong-password') {
      console.log('💡 Wrong password. Please provide the correct password.');
    }
  }
}

// Run the function
checkAndFixTeacherRole(); 