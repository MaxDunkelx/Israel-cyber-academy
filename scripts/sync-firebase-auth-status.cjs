/**
 * Sync Firebase Auth Status - Israel Cyber Academy
 * 
 * This script fixes the hasFirebaseAuth field in the database
 * by checking the actual Firebase Auth status for each user
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  const serviceAccount = require('../service-account-key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'israel-cyber-academy'
  });
}

const auth = admin.auth();
const cybercampusDb = admin.firestore();
cybercampusDb.settings({ databaseId: 'cyber-campus' });

async function syncFirebaseAuthStatus() {
  console.log('🔄 Syncing Firebase Auth status with database...');
  console.log('=' .repeat(80));
  
  const results = {
    totalUsers: 0,
    correctlyMarked: 0,
    needingUpdate: 0,
    updated: 0,
    failed: []
  };

  try {
    // Get all users from database
    console.log('📋 Step 1: Getting all users from database...');
    const usersSnapshot = await cybercampusDb.collection('users').get();
    results.totalUsers = usersSnapshot.docs.length;
    
    console.log(`   Found ${results.totalUsers} users in database`);

    // Check each user's actual Firebase Auth status
    console.log('📋 Step 2: Checking Firebase Auth status for each user...');
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const userId = userDoc.id;
      const currentAuthStatus = userData.hasFirebaseAuth;
      const userEmail = userData.email;
      
      if (!userEmail) {
        console.log(`   ⏭️ Skipping ${userId} - no email`);
        continue;
      }
      
      try {
        // Check if user exists in Firebase Auth
        const userRecord = await auth.getUserByEmail(userEmail);
        const actualAuthStatus = !!userRecord;
        
        if (currentAuthStatus === actualAuthStatus) {
          // Status is correct
          results.correctlyMarked++;
          console.log(`   ✅ ${userId}: hasFirebaseAuth correctly set to ${actualAuthStatus}`);
        } else {
          // Status needs updating
          results.needingUpdate++;
          console.log(`   🔄 ${userId}: Updating hasFirebaseAuth from ${currentAuthStatus} to ${actualAuthStatus}`);
          
          try {
            await cybercampusDb.collection('users').doc(userId).update({
              hasFirebaseAuth: true,
              authUid: userRecord.uid,
              authEmail: userRecord.email,
              authStatusUpdated: admin.firestore.FieldValue.serverTimestamp(),
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            
            results.updated++;
            console.log(`   ✅ ${userId}: Successfully updated hasFirebaseAuth to true`);
            
          } catch (updateError) {
            console.error(`   ❌ ${userId}: Failed to update - ${updateError.message}`);
            results.failed.push({
              userId: userId,
              error: updateError.message
            });
          }
        }
        
      } catch (authError) {
        if (authError.code === 'auth/user-not-found') {
          // User doesn't have Firebase Auth account
          if (currentAuthStatus === false) {
            results.correctlyMarked++;
            console.log(`   ✅ ${userId}: hasFirebaseAuth correctly set to false (no auth account)`);
          } else {
            results.needingUpdate++;
            console.log(`   🔄 ${userId}: Updating hasFirebaseAuth from true to false (no auth account)`);
            
            try {
              await cybercampusDb.collection('users').doc(userId).update({
                hasFirebaseAuth: false,
                authUid: null,
                authEmail: null,
                authStatusUpdated: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
              });
              
              results.updated++;
              console.log(`   ✅ ${userId}: Successfully updated hasFirebaseAuth to false`);
              
            } catch (updateError) {
              console.error(`   ❌ ${userId}: Failed to update - ${updateError.message}`);
              results.failed.push({
                userId: userId,
                error: updateError.message
              });
            }
          }
        } else {
          console.error(`   ❌ ${userId}: Auth check failed - ${authError.message}`);
          results.failed.push({
            userId: userId,
            error: authError.message
          });
        }
      }
      
      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Print results
    console.log('\n📊 SYNC RESULTS');
    console.log('=' .repeat(80));
    console.log(`📋 Total Users: ${results.totalUsers}`);
    console.log(`✅ Correctly Marked: ${results.correctlyMarked}`);
    console.log(`🔄 Needed Update: ${results.needingUpdate}`);
    console.log(`✅ Successfully Updated: ${results.updated}`);
    console.log(`❌ Failed Updates: ${results.failed.length}`);
    
    if (results.failed.length > 0) {
      console.log('\n❌ FAILED UPDATES:');
      results.failed.forEach(failure => {
        console.log(`  - ${failure.userId}: ${failure.error}`);
      });
    }
    
    if (results.updated > 0) {
      console.log('\n🎯 SUCCESS! Firebase Auth status has been synced.');
      console.log('Run the database analysis again to verify the changes.');
    } else {
      console.log('\n✅ All users already had correct Firebase Auth status.');
    }
    
    return results;
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('🎯 Starting Firebase Auth Status Sync...\n');
    
    const results = await syncFirebaseAuthStatus();
    
    console.log('\n🏁 Firebase Auth Status Sync Completed!');
    console.log('Your authentication should now work correctly for all users.');
    
  } catch (error) {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main()
    .then(() => {
      console.log('\n🎯 Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { syncFirebaseAuthStatus }; 