/**
 * Backup Script - Copy cyber-campus to cyber-campus-recover
 * 
 * This creates a complete backup of the cyber-campus database
 * to a new database called cyber-campus-recover
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('../service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'israel-cyber-academy'
});

async function backupDatabase() {
  console.log('🔄 Starting backup of cyber-campus database...');
  
  try {
    // Get source database (cyber-campus)
    const sourceDb = admin.firestore();
    sourceDb.settings({ databaseId: 'cyber-campus' });
    
    // Get target database (cyber-campus-recover) 
    const targetDb = admin.firestore();
    targetDb.settings({ databaseId: 'cyber-campus-recover' });
    
    console.log('📋 Getting all collections from cyber-campus...');
    
    // Get all collections
    const collections = await sourceDb.listCollections();
    
    console.log(`🔍 Found ${collections.length} collections to backup:`);
    collections.forEach(col => console.log(`  - ${col.id}`));
    
    // Backup each collection
    for (const collection of collections) {
      console.log(`\n📦 Backing up collection: ${collection.id}`);
      
      const docs = await collection.get();
      console.log(`  📄 Found ${docs.docs.length} documents`);
      
      // Copy each document
      for (const doc of docs.docs) {
        const data = doc.data();
        const targetRef = targetDb.collection(collection.id).doc(doc.id);
        
        await targetRef.set(data);
        console.log(`    ✅ Copied: ${doc.id}`);
      }
      
      console.log(`✅ Collection ${collection.id} backup complete`);
    }
    
    console.log('\n🎉 BACKUP COMPLETED SUCCESSFULLY!');
    console.log('📊 Backup Summary:');
    console.log(`  Source: cyber-campus`);
    console.log(`  Target: cyber-campus-recover`);
    console.log(`  Collections: ${collections.length}`);
    
  } catch (error) {
    console.error('❌ Backup failed:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

// Run backup
backupDatabase(); 