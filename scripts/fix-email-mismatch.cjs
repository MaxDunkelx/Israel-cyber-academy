/**
 * Fix Email Format Mismatch - Israel Cyber Academy
 * 
 * This script identifies and fixes email format mismatches between
 * Firestore database (@cyber.academy) and Firebase Auth (@cyber-campus.local)
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

async function analyzeEmailMismatch() {
  console.log('🔍 Analyzing email format mismatch...');
  console.log('=' .repeat(80));
  
  const results = {
    databaseUsers: [],
    firebaseAuthUsers: [],
    matches: [],
    mismatches: [],
    databaseOnly: [],
    firebaseOnly: []
  };

  try {
    // 1. Get all users from database
    console.log('📋 Step 1: Getting all users from database...');
    const usersSnapshot = await cybercampusDb.collection('users').get();
    
    usersSnapshot.docs.forEach(doc => {
      const userData = doc.data();
      results.databaseUsers.push({
        uid: doc.id,
        email: userData.email,
        role: userData.role,
        hasFirebaseAuth: userData.hasFirebaseAuth
      });
    });
    
    console.log(`   Found ${results.databaseUsers.length} users in database`);

    // 2. Get all users from Firebase Auth
    console.log('📋 Step 2: Getting all users from Firebase Auth...');
    let nextPageToken;
    do {
      const listUsersResult = await auth.listUsers(1000, nextPageToken);
      
      listUsersResult.users.forEach(userRecord => {
        results.firebaseAuthUsers.push({
          uid: userRecord.uid,
          email: userRecord.email,
          emailVerified: userRecord.emailVerified,
          disabled: userRecord.disabled
        });
      });
      
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);
    
    console.log(`   Found ${results.firebaseAuthUsers.length} users in Firebase Auth`);

    // 3. Analyze matches and mismatches
    console.log('📋 Step 3: Analyzing matches and mismatches...');
    
    for (const dbUser of results.databaseUsers) {
      const dbEmail = dbUser.email;
      
      // Look for exact email match in Firebase Auth
      const exactMatch = results.firebaseAuthUsers.find(authUser => 
        authUser.email === dbEmail
      );
      
      // Look for alternative format match
      let altEmail = null;
      if (dbEmail?.includes('@cyber.academy')) {
        altEmail = dbEmail.replace('@cyber.academy', '@cyber-campus.local');
      } else if (dbEmail?.includes('@cyber-campus.local')) {
        altEmail = dbEmail.replace('@cyber-campus.local', '@cyber.academy');
      }
      
      const altMatch = altEmail ? results.firebaseAuthUsers.find(authUser => 
        authUser.email === altEmail
      ) : null;

      if (exactMatch) {
        results.matches.push({
          uid: dbUser.uid,
          email: dbEmail,
          authUid: exactMatch.uid,
          type: 'exact_match'
        });
      } else if (altMatch) {
        results.mismatches.push({
          uid: dbUser.uid,
          databaseEmail: dbEmail,
          firebaseEmail: altMatch.email,
          authUid: altMatch.uid,
          type: 'format_mismatch'
        });
      } else {
        results.databaseOnly.push({
          uid: dbUser.uid,
          email: dbEmail,
          role: dbUser.role,
          type: 'no_firebase_auth'
        });
      }
    }

    // 4. Find Firebase Auth users not in database
    for (const authUser of results.firebaseAuthUsers) {
      const dbMatch = results.databaseUsers.find(dbUser => 
        dbUser.email === authUser.email ||
        (dbUser.email?.replace('@cyber.academy', '@cyber-campus.local') === authUser.email) ||
        (dbUser.email?.replace('@cyber-campus.local', '@cyber.academy') === authUser.email)
      );
      
      if (!dbMatch) {
        results.firebaseOnly.push({
          uid: authUser.uid,
          email: authUser.email,
          type: 'no_database_entry'
        });
      }
    }

    // 5. Print detailed analysis
    console.log('\n📊 EMAIL MISMATCH ANALYSIS RESULTS');
    console.log('=' .repeat(80));
    console.log(`✅ Exact Matches: ${results.matches.length}`);
    console.log(`⚠️  Format Mismatches: ${results.mismatches.length}`);
    console.log(`❌ Database Only (No Firebase Auth): ${results.databaseOnly.length}`);
    console.log(`❌ Firebase Auth Only (No Database): ${results.firebaseOnly.length}`);

    if (results.mismatches.length > 0) {
      console.log('\n⚠️  FORMAT MISMATCHES (Database vs Firebase Auth):');
      console.log('-'.repeat(50));
      results.mismatches.forEach(mismatch => {
        console.log(`  ${mismatch.uid}:`);
        console.log(`    Database: ${mismatch.databaseEmail}`);
        console.log(`    Firebase:  ${mismatch.firebaseEmail}`);
        console.log('');
      });
    }

    if (results.databaseOnly.length > 0) {
      console.log('\n❌ USERS IN DATABASE BUT NOT IN FIREBASE AUTH:');
      console.log('-'.repeat(50));
      results.databaseOnly.forEach(user => {
        console.log(`  ${user.uid} (${user.role}): ${user.email}`);
      });
    }

    if (results.firebaseOnly.length > 0) {
      console.log('\n❌ USERS IN FIREBASE AUTH BUT NOT IN DATABASE:');
      console.log('-'.repeat(50));
      results.firebaseOnly.forEach(user => {
        console.log(`  ${user.uid}: ${user.email}`);
      });
    }

    return results;
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
    throw error;
  }
}

async function fixEmailMismatch(analysisResults) {
  console.log('\n🔧 FIXING EMAIL MISMATCH...');
  console.log('=' .repeat(80));
  
  const fixResults = {
    databaseUpdated: [],
    firebaseUpdated: [],
    failed: []
  };

  // Option 1: Update database emails to match Firebase Auth
  console.log('🔄 Updating database emails to match Firebase Auth...');
  
  for (const mismatch of analysisResults.mismatches) {
    try {
      console.log(`  Updating ${mismatch.uid}: ${mismatch.databaseEmail} → ${mismatch.firebaseEmail}`);
      
      await cybercampusDb.collection('users').doc(mismatch.uid).update({
        email: mismatch.firebaseEmail,
        hasFirebaseAuth: true,
        authUid: mismatch.authUid,
        emailUpdated: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      fixResults.databaseUpdated.push(mismatch);
      
    } catch (error) {
      console.error(`  ❌ Failed to update ${mismatch.uid}:`, error.message);
      fixResults.failed.push({
        uid: mismatch.uid,
        error: error.message
      });
    }
  }

  console.log('\n📊 FIX RESULTS:');
  console.log(`✅ Database Updated: ${fixResults.databaseUpdated.length}`);
  console.log(`❌ Failed: ${fixResults.failed.length}`);
  
  return fixResults;
}

async function main() {
  try {
    console.log('🎯 Starting Email Mismatch Analysis and Fix...\n');
    
    // Step 1: Analyze the mismatch
    const analysisResults = await analyzeEmailMismatch();
    
    // Step 2: Ask user if they want to fix it
    if (analysisResults.mismatches.length > 0) {
      console.log('\n💡 RECOMMENDATION:');
      console.log('Update database emails to match Firebase Auth emails');
      console.log('This will allow users to login with their existing Firebase Auth accounts.');
      
      // For now, automatically proceed with the fix
      console.log('\n🚀 Proceeding with automatic fix...');
      const fixResults = await fixEmailMismatch(analysisResults);
      
      console.log('\n🎯 EMAIL MISMATCH FIX COMPLETED!');
      console.log('Users should now be able to login with their correct email format.');
      
    } else {
      console.log('\n✅ No email format mismatches found!');
      
      if (analysisResults.databaseOnly.length > 0) {
        console.log('However, there are users in database without Firebase Auth accounts.');
        console.log('Run the create-all-auth-users.cjs script to create missing accounts.');
      }
    }
    
  } catch (error) {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main()
    .then(() => {
      console.log('\n🏁 Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { analyzeEmailMismatch, fixEmailMismatch }; 