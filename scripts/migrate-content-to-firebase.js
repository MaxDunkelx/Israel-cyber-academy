/**
 * Content Migration Script - Israel Cyber Academy
 * 
 * This script migrates all local lesson content to Firebase Firestore
 * and sets up the necessary indexes and collections.
 * 
 * Usage:
 * node scripts/migrate-content-to-firebase.js
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs,
  query,
  where,
  orderBy,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Import local lesson data
import { lessons as localLessons } from '../src/data/lessons/index.js';

// Firebase configuration (use environment variables)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.VITE_FIREBASE_APP_ID || 'demo-app-id'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Migrate all local lessons to Firebase
 */
async function migrateLocalLessonsToFirebase() {
  console.log('🔄 Starting local lessons migration to Firebase...');
  console.log(`📊 Found ${localLessons.length} lessons to migrate`);
  
  try {
    const batch = writeBatch(db);
    let migratedCount = 0;
    let totalSlides = 0;
    
    for (const lesson of localLessons) {
      console.log(`\n📝 Processing lesson: ${lesson.title}`);
      
      // Check if lesson already exists
      const existingLesson = await getLessonByTitle(lesson.title);
      
      if (!existingLesson) {
        // Create lesson
        const lessonRef = doc(collection(db, 'lessons'));
        const lessonData = {
          ...lesson,
          id: lessonRef.id,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          source: 'local_migration',
          totalSlides: lesson.content?.slides?.length || 0
        };
        
        batch.set(lessonRef, lessonData);
        console.log(`  ✅ Created lesson: ${lesson.title}`);
        
        // Migrate slides for this lesson
        if (lesson.content?.slides) {
          console.log(`  📄 Migrating ${lesson.content.slides.length} slides...`);
          
          for (let i = 0; i < lesson.content.slides.length; i++) {
            const slide = lesson.content.slides[i];
            const slideRef = doc(collection(db, 'slides'));
            const slideData = {
              ...slide,
              id: slideRef.id,
              lessonId: lessonRef.id,
              order: i + 1,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              source: 'local_migration',
              version: 1
            };
            
            batch.set(slideRef, slideData);
            totalSlides++;
          }
          
          console.log(`  ✅ Migrated ${lesson.content.slides.length} slides`);
        }
        
        migratedCount++;
      } else {
        console.log(`  ⏭️ Lesson already exists: ${lesson.title}`);
      }
    }
    
    console.log(`\n💾 Committing batch write...`);
    await batch.commit();
    
    console.log(`\n🎉 Migration completed successfully!`);
    console.log(`📊 Summary:`);
    console.log(`   - Lessons migrated: ${migratedCount}`);
    console.log(`   - Total slides migrated: ${totalSlides}`);
    console.log(`   - Total lessons processed: ${localLessons.length}`);
    
    return { migratedCount, totalSlides };
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw new Error(`Migration failed: ${error.message}`);
  }
}

/**
 * Get lesson by title (for migration checks)
 */
async function getLessonByTitle(title) {
  try {
    const q = query(collection(db, 'lessons'), where('title', '==', title));
    const snapshot = await getDocs(q);
    return snapshot.docs[0]?.data() || null;
  } catch (error) {
    console.error('Error getting lesson by title:', error);
    return null;
  }
}

/**
 * Verify migration by checking database content
 */
async function verifyMigration() {
  console.log('\n🔍 Verifying migration...');
  
  try {
    // Check lessons
    const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
    const lessons = lessonsSnapshot.docs.map(doc => doc.data());
    
    console.log(`📊 Database contains ${lessons.length} lessons`);
    
    // Check slides
    const slidesSnapshot = await getDocs(collection(db, 'slides'));
    const slides = slidesSnapshot.docs.map(doc => doc.data());
    
    console.log(`📄 Database contains ${slides.length} slides`);
    
    // Verify each lesson has slides
    for (const lesson of lessons) {
      const lessonSlides = slides.filter(slide => slide.lessonId === lesson.id);
      console.log(`  ${lesson.title}: ${lessonSlides.length} slides`);
    }
    
    return { lessons: lessons.length, slides: slides.length };
    
  } catch (error) {
    console.error('❌ Verification failed:', error);
    throw error;
  }
}

/**
 * Create necessary indexes (this is a guide, actual indexes need to be created in Firebase Console)
 */
function printIndexCreationGuide() {
  console.log('\n📋 INDEX CREATION GUIDE:');
  console.log('To fix the "query requires an index" error, create these indexes in Firebase Console:');
  console.log('');
  console.log('1. Go to: https://console.firebase.google.com');
  console.log('2. Select your project');
  console.log('3. Go to Firestore Database > Indexes');
  console.log('4. Create the following composite indexes:');
  console.log('');
  console.log('Collection: slides');
  console.log('Fields:');
  console.log('  - lessonId (Ascending)');
  console.log('  - order (Ascending)');
  console.log('  - __name__ (Ascending)');
  console.log('');
  console.log('Collection: slides');
  console.log('Fields:');
  console.log('  - lessonId (Ascending)');
  console.log('  - createdAt (Descending)');
  console.log('  - __name__ (Ascending)');
  console.log('');
  console.log('Collection: lessons');
  console.log('Fields:');
  console.log('  - createdAt (Descending)');
  console.log('  - __name__ (Ascending)');
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Israel Cyber Academy - Content Migration Script');
  console.log('==================================================');
  
  try {
    // Check if we're in demo mode
    const isDemoMode = !process.env.VITE_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY === 'your_api_key_here';
    
    if (isDemoMode) {
      console.log('⚠️  Running in DEMO MODE');
      console.log('💡 To perform real migration, set up your Firebase environment variables');
      console.log('💡 Create a .env.local file with your Firebase configuration');
      return;
    }
    
    // Perform migration
    const migrationResult = await migrateLocalLessonsToFirebase();
    
    // Verify migration
    const verificationResult = await verifyMigration();
    
    // Print index creation guide
    printIndexCreationGuide();
    
    console.log('\n✅ Migration script completed successfully!');
    console.log('🎯 Next steps:');
    console.log('   1. Create the required indexes in Firebase Console');
    console.log('   2. Test the content loading in your application');
    console.log('   3. Verify that slides are loading correctly');
    
  } catch (error) {
    console.error('\n❌ Migration script failed:', error);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error); 