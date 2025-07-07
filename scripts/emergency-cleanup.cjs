const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

const OFFENSIVE_TEXT = 'זיבי תומר קפלון אוכל זרע של חמור מת גוסס';

async function emergencyCleanup() {
  console.log('🚨 EMERGENCY CLEANUP STARTING...');
  console.log(`🔍 Searching for: "${OFFENSIVE_TEXT}"`);
  
  const collectionsToCheck = [
    'teacherActivities',
    'classes', 
    'sessions',
    'students',
    'users'
  ];
  
  let totalDeleted = 0;
  
  for (const collectionName of collectionsToCheck) {
    console.log(`\n📁 Checking collection: ${collectionName}`);
    
    try {
      const snapshot = await db.collection(collectionName).get();
      let collectionDeleted = 0;
      
      for (const doc of snapshot.docs) {
        const data = doc.data();
        let shouldDelete = false;
        let foundFields = [];
        
        // Check all string fields
        for (const [key, value] of Object.entries(data)) {
          if (typeof value === 'string' && value.includes(OFFENSIVE_TEXT)) {
            shouldDelete = true;
            foundFields.push(key);
          }
        }
        
        if (shouldDelete) {
          try {
            await doc.ref.delete();
            console.log(`  ❌ DELETED: ${doc.id} (found in: ${foundFields.join(', ')})`);
            collectionDeleted++;
            totalDeleted++;
          } catch (error) {
            console.log(`  ⚠️  Failed to delete ${doc.id}: ${error.message}`);
          }
        }
      }
      
      if (collectionDeleted > 0) {
        console.log(`  📊 Deleted ${collectionDeleted} documents from ${collectionName}`);
      } else {
        console.log(`  ✅ No offensive content found in ${collectionName}`);
      }
      
    } catch (error) {
      console.log(`  ⚠️  Error checking ${collectionName}: ${error.message}`);
    }
  }
  
  console.log(`\n🎉 EMERGENCY CLEANUP COMPLETE!`);
  console.log(`📊 Total documents deleted: ${totalDeleted}`);
  
  if (totalDeleted === 0) {
    console.log('✅ No offensive content found in database');
  } else {
    console.log('✅ Offensive content has been removed!');
  }
  
  return totalDeleted;
}

// Run immediately
emergencyCleanup()
  .then((deleted) => {
    console.log('\n🏁 Cleanup finished. Exiting...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ CRITICAL ERROR:', error);
    process.exit(1);
  }); 