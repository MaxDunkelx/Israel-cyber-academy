const admin = require('firebase-admin');

async function debugUsers() {
  try {
    console.log('🔄 Starting user database debug...');
    
    // Initialize Firebase Admin
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: 'israel-cyber-academy'
      });
    }
    
    const auth = admin.auth();
    const db = admin.firestore();
    
    console.log('✅ Firebase Admin initialized');
    
    // Get all users from Firebase Auth
    console.log('📋 Fetching all users from Firebase Auth...');
    const authUsers = await auth.listUsers();
    console.log(`✅ Found ${authUsers.users.length} users in Firebase Auth`);
    
    // Get all users from Firestore
    console.log('📋 Fetching all users from Firestore...');
    const firestoreUsers = await db.collection('users').get();
    console.log(`✅ Found ${firestoreUsers.size} users in Firestore`);
    
    // Compare and analyze
    console.log('\n📊 ANALYSIS:');
    console.log('='.repeat(50));
    
    // Auth users analysis
    console.log('\n🔐 FIREBASE AUTH USERS:');
    authUsers.users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} (${user.uid})`);
      console.log(`   Display Name: ${user.displayName || 'N/A'}`);
      console.log(`   Email Verified: ${user.emailVerified}`);
      console.log(`   Created: ${user.metadata.creationTime}`);
      console.log('');
    });
    
    // Firestore users analysis
    console.log('\n📄 FIRESTORE USERS:');
    firestoreUsers.forEach((doc, index) => {
      const data = doc.data();
      console.log(`${index + 1}. ${data.email || 'N/A'} (${doc.id})`);
      console.log(`   Display Name: ${data.displayName || 'N/A'}`);
      console.log(`   Role: ${data.role || 'N/A'}`);
      console.log(`   Created: ${data.createdAt || 'N/A'}`);
      console.log('');
    });
    
    // Find mismatches
    console.log('\n🔍 MISMATCHES:');
    console.log('='.repeat(50));
    
    const authEmails = authUsers.users.map(u => u.email);
    const firestoreEmails = firestoreUsers.docs.map(d => d.data().email).filter(Boolean);
    
    const authOnly = authEmails.filter(email => !firestoreEmails.includes(email));
    const firestoreOnly = firestoreEmails.filter(email => !authEmails.includes(email));
    
    if (authOnly.length > 0) {
      console.log('\n❌ Users in Auth but NOT in Firestore:');
      authOnly.forEach(email => console.log(`   - ${email}`));
    }
    
    if (firestoreOnly.length > 0) {
      console.log('\n❌ Users in Firestore but NOT in Auth:');
      firestoreOnly.forEach(email => console.log(`   - ${email}`));
    }
    
    if (authOnly.length === 0 && firestoreOnly.length === 0) {
      console.log('✅ All users are properly synchronized between Auth and Firestore');
    }
    
    // Role analysis
    console.log('\n👥 ROLE ANALYSIS:');
    console.log('='.repeat(50));
    
    const roleCounts = {};
    firestoreUsers.forEach(doc => {
      const role = doc.data().role || 'no-role';
      roleCounts[role] = (roleCounts[role] || 0) + 1;
    });
    
    Object.entries(roleCounts).forEach(([role, count]) => {
      console.log(`${role}: ${count} users`);
    });
    
    // Available students (non-teachers)
    const availableStudents = firestoreUsers.docs.filter(doc => {
      const role = doc.data().role;
      return role !== 'teacher';
    });
    
    console.log(`\n📚 Available students (non-teachers): ${availableStudents.length}`);
    availableStudents.forEach((doc, index) => {
      const data = doc.data();
      console.log(`${index + 1}. ${data.email} (${data.role || 'no-role'})`);
    });
    
    console.log('\n✅ Debug completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during debug:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
  }
}

// Run the debug function
debugUsers(); 