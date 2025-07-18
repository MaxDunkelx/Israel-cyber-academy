/**
 * Firebase Admin SDK - Batch Create ALL Authentication Users
 * This script uses admin privileges to create auth accounts for all Firestore users
 * Run with: node scripts/create-all-auth-users.cjs
 */

const admin = require('firebase-admin');
const serviceAccount = require('../service-account-key.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com/`
});

const auth = admin.auth();
const db = admin.firestore();

// Specify the custom database
const cybercampusDb = admin.firestore(admin.app(), 'cyber-campus');

async function batchCreateAllUsers() {
  try {
    console.log('🚀 FIREBASE ADMIN - BATCH CREATING ALL USERS');
    console.log('='.repeat(60));
    console.log(`📡 Using service account: ${serviceAccount.client_email}`);
    console.log(`🏢 Project: ${serviceAccount.project_id}`);
    console.log(`💾 Database: cyber-campus`);
    console.log('='.repeat(60));
    
    // Get all users from the cyber-campus database
    const usersSnapshot = await cybercampusDb.collection('users').get();
    const totalUsers = usersSnapshot.docs.length;
    
    console.log(`📊 Found ${totalUsers} users in cyber-campus database`);
    
    const results = {
      success: [],
      failed: [],
      skipped: [],
      alreadyExists: []
    };
    
    let processed = 0;
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const uid = userDoc.id;
      processed++;
      
      console.log(`\n📝 Processing ${processed}/${totalUsers}: ${uid}`);
      
      // Skip if no password
      if (!userData.password) {
        console.log(`   ⏭️ SKIPPED - No password found`);
        results.skipped.push({ uid, reason: 'No password' });
        continue;
      }
      
      try {
        // Generate consistent email format
        const email = userData.email || `${uid}@cyber-campus.local`;
        const password = userData.password;
        
        console.log(`   👤 Creating admin auth for: ${uid}`);
        console.log(`   📧 Email: ${email}`);
        console.log(`   👥 Role: ${userData.role || 'unknown'}`);
        console.log(`   🏫 School: ${userData.school || 'N/A'}`);
        
        // Create user with Firebase Admin SDK
        const userRecord = await auth.createUser({
          uid: `auth_${uid}`, // Different UID for auth to avoid conflicts
          email: email,
          password: password,
          displayName: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
          disabled: false
        });
        
        console.log(`   ✅ SUCCESS - Auth UID: ${userRecord.uid}`);
        
        // Update Firestore document with email and auth info
        await cybercampusDb.collection('users').doc(uid).update({
          email: email,
          authUid: userRecord.uid,
          authCreated: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        results.success.push({
          uid,
          email,
          authUid: userRecord.uid,
          role: userData.role,
          displayName: userRecord.displayName
        });
        
        // Small delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (authError) {
        console.log(`   ❌ FAILED - ${authError.message}`);
        
        if (authError.code === 'auth/email-already-exists') {
          console.log(`   ℹ️ User email already exists - that's OK!`);
          results.alreadyExists.push({
            uid,
            email: userData.email || `${uid}@cyber-campus.local`
          });
        } else if (authError.code === 'auth/uid-already-exists') {
          console.log(`   ℹ️ Auth UID already exists - trying with different UID...`);
          
          try {
            // Try with a different UID
            const altUserRecord = await auth.createUser({
              email: userData.email || `${uid}@cyber-campus.local`,
              password: userData.password,
              displayName: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
              disabled: false
            });
            
            console.log(`   ✅ SUCCESS (alt UID) - Auth UID: ${altUserRecord.uid}`);
            
            await cybercampusDb.collection('users').doc(uid).update({
              email: userData.email || `${uid}@cyber-campus.local`,
              authUid: altUserRecord.uid,
              authCreated: admin.firestore.FieldValue.serverTimestamp(),
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            
            results.success.push({
              uid,
              email: userData.email || `${uid}@cyber-campus.local`,
              authUid: altUserRecord.uid,
              role: userData.role
            });
            
          } catch (altError) {
            console.log(`   🚨 ALT CREATION FAILED: ${altError.message}`);
            results.failed.push({
              uid,
              error: altError.message,
              code: altError.code
            });
          }
        } else {
          console.log(`   🚨 ERROR: ${authError.code} - ${authError.message}`);
          results.failed.push({
            uid,
            error: authError.message,
            code: authError.code
          });
        }
      }
    }
    
    // Final Results Summary
    console.log('\n' + '='.repeat(60));
    console.log('🎯 BATCH CREATION COMPLETE!');
    console.log('='.repeat(60));
    console.log(`✅ Successfully Created: ${results.success.length}`);
    console.log(`♻️ Already Existed: ${results.alreadyExists.length}`);
    console.log(`❌ Failed: ${results.failed.length}`);
    console.log(`⏭️ Skipped: ${results.skipped.length}`);
    console.log(`📊 Total Processed: ${processed}`);
    
    // Show successful users by role
    if (results.success.length > 0) {
      console.log('\n✅ SUCCESSFULLY CREATED USERS:');
      const byRole = {};
      results.success.forEach(user => {
        const role = user.role || 'unknown';
        if (!byRole[role]) byRole[role] = [];
        byRole[role].push(user);
      });
      
      Object.keys(byRole).forEach(role => {
        console.log(`\n   ${role.toUpperCase()} (${byRole[role].length}):`);
        byRole[role].forEach(user => {
          console.log(`     ${user.uid} → ${user.email}`);
        });
      });
    }
    
    // Show failed users
    if (results.failed.length > 0) {
      console.log('\n❌ FAILED TO CREATE:');
      results.failed.forEach(user => {
        console.log(`   ${user.uid} → ${user.error}`);
      });
    }
    
    console.log('\n🎉 ALL USERS ARE NOW READY FOR LOGIN!');
    console.log('Login format: [uid]@cyber-campus.local + [their-password]');
    console.log('\nExamples:');
    console.log('  student003@cyber-campus.local + password123');
    console.log('  teacher01@cyber-campus.local + [teacher-password]');
    
    return results;
    
  } catch (error) {
    console.error('💥 BATCH CREATION FAILED:', error);
    throw error;
  }
}

// Run the batch creation
console.log('🎬 Starting Firebase Admin batch user creation...\n');
batchCreateAllUsers()
  .then((results) => {
    console.log(`\n🏁 Script completed successfully!`);
    console.log(`Total created: ${results.success.length + results.alreadyExists.length}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }); 