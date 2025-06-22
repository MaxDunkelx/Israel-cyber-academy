const admin = require('firebase-admin');

const TEACHER_EMAIL = 'maxbunnyshow@gmail.com';
const TEACHER_PASSWORD = 'teacher123'; // You can change this password

async function updateUserToTeacher() {
  try {
    console.log('🔄 Starting teacher role update process...');
    
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
    
    // Find user by email
    console.log(`🔍 Looking for user with email: ${TEACHER_EMAIL}`);
    const userRecord = await auth.getUserByEmail(TEACHER_EMAIL);
    
    if (!userRecord) {
      console.log('❌ User not found. Creating new teacher user...');
      
      // Create new user
      const newUser = await auth.createUser({
        email: TEACHER_EMAIL,
        password: TEACHER_PASSWORD,
        displayName: 'Teacher Max',
        emailVerified: true
      });
      
      console.log(`✅ Created new user with UID: ${newUser.uid}`);
      
      // Set custom claims for teacher role
      await auth.setCustomUserClaims(newUser.uid, { role: 'teacher' });
      console.log('✅ Set custom claims for teacher role');
      
      // Create user document in Firestore
      await db.collection('users').doc(newUser.uid).set({
        email: TEACHER_EMAIL,
        displayName: 'Teacher Max',
        role: 'teacher',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isTeacher: true,
        permissions: ['manage_students', 'manage_classes', 'view_analytics', 'edit_lessons']
      });
      
      console.log('✅ Created user document in Firestore');
      
    } else {
      console.log(`✅ Found existing user with UID: ${userRecord.uid}`);
      
      // Update custom claims
      await auth.setCustomUserClaims(userRecord.uid, { role: 'teacher' });
      console.log('✅ Updated custom claims for teacher role');
      
      // Update user document in Firestore
      await db.collection('users').doc(userRecord.uid).set({
        email: TEACHER_EMAIL,
        displayName: userRecord.displayName || 'Teacher Max',
        role: 'teacher',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        isTeacher: true,
        permissions: ['manage_students', 'manage_classes', 'view_analytics', 'edit_lessons']
      }, { merge: true });
      
      console.log('✅ Updated user document in Firestore');
    }
    
    console.log('\n🎉 SUCCESS: Teacher role has been assigned!');
    console.log(`📧 Email: ${TEACHER_EMAIL}`);
    console.log(`🔑 Password: ${TEACHER_PASSWORD}`);
    console.log('\n📝 Next steps:');
    console.log('1. Login to the application with the credentials above');
    console.log('2. You will be redirected to /instructor/dashboard');
    console.log('3. Access all teacher features from the dashboard');
    
  } catch (error) {
    console.error('❌ Error updating user to teacher:', error);
    process.exit(1);
  }
}

updateUserToTeacher(); 