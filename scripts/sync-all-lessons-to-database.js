/**
 * Sync All Lessons to Database
 * 
 * This script ensures all lessons from local data are properly synced to the database
 * so they appear in the content manager. It will:
 * 1. Check what lessons exist in the database
 * 2. Import all lessons from local data
 * 3. Create any missing lessons in the database
 * 4. Update existing lessons with latest data
 * 5. Ensure all slides are properly linked
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Import all lessons from local data
const importLocalLessons = async () => {
  try {
    console.log('📚 Importing lessons from local data...');
    
    // Import lessons dynamically
    const lessonModules = [];
    for (let i = 1; i <= 19; i++) {
      try {
        const module = await import(`../src/data/lessons/lesson${i}/index.js`);
        lessonModules.push({
          id: i,
          lesson: module.default || module[`lesson${i}`] || module
        });
      } catch (error) {
        console.log(`⚠️ Lesson ${i} not found in local data, skipping...`);
      }
    }
    
    console.log(`✅ Imported ${lessonModules.length} lessons from local data`);
    return lessonModules;
  } catch (error) {
    console.error('❌ Error importing local lessons:', error);
    throw error;
  }
};

// Get existing lessons from database
const getExistingLessons = async () => {
  try {
    console.log('🔍 Fetching existing lessons from database...');
    
    const lessonsRef = collection(db, 'lessons');
    const querySnapshot = await getDocs(lessonsRef);
    const existingLessons = [];
    
    querySnapshot.forEach((doc) => {
      existingLessons.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`✅ Found ${existingLessons.length} existing lessons in database`);
    return existingLessons;
  } catch (error) {
    console.error('❌ Error fetching existing lessons:', error);
    throw error;
  }
};

// Create or update lesson in database
const syncLessonToDatabase = async (lessonData) => {
  try {
    const lessonsRef = collection(db, 'lessons');
    
    // Check if lesson already exists by title
    const existingQuery = query(lessonsRef, where('title', '==', lessonData.title));
    const existingSnapshot = await getDocs(existingQuery);
    
    if (!existingSnapshot.empty) {
      // Update existing lesson
      const existingDoc = existingSnapshot.docs[0];
      console.log(`🔄 Updating existing lesson: ${lessonData.title}`);
      
      await updateDoc(doc(db, 'lessons', existingDoc.id), {
        ...lessonData,
        updatedAt: new Date(),
        source: 'local-sync'
      });
      
      return existingDoc.id;
    } else {
      // Create new lesson
      console.log(`➕ Creating new lesson: ${lessonData.title}`);
      
      const lessonDoc = {
        ...lessonData,
        createdAt: new Date(),
        updatedAt: new Date(),
        source: 'local-sync'
      };
      
      const docRef = await addDoc(lessonsRef, lessonDoc);
      console.log(`✅ Created lesson with ID: ${docRef.id}`);
      
      return docRef.id;
    }
  } catch (error) {
    console.error(`❌ Error syncing lesson ${lessonData.title}:`, error);
    throw error;
  }
};

// Sync slides for a lesson
const syncSlidesForLesson = async (lessonId, slides) => {
  try {
    console.log(`📝 Syncing ${slides.length} slides for lesson ${lessonId}...`);
    
    const slidesRef = collection(db, 'slides');
    
    // Delete existing slides for this lesson
    const existingSlidesQuery = query(slidesRef, where('lessonId', '==', lessonId));
    const existingSlidesSnapshot = await getDocs(existingSlidesQuery);
    
    for (const slideDoc of existingSlidesSnapshot.docs) {
      await deleteDoc(doc(db, 'slides', slideDoc.id));
    }
    
    console.log(`🗑️ Deleted ${existingSlidesSnapshot.size} existing slides`);
    
    // Create new slides
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const slideDoc = {
        ...slide,
        lessonId: lessonId,
        order: i + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        source: 'local-sync'
      };
      
      await addDoc(slidesRef, slideDoc);
    }
    
    console.log(`✅ Created ${slides.length} slides for lesson ${lessonId}`);
  } catch (error) {
    console.error(`❌ Error syncing slides for lesson ${lessonId}:`, error);
    throw error;
  }
};

// Main sync function
const syncAllLessons = async () => {
  try {
    console.log('🚀 Starting comprehensive lesson sync...\n');
    
    // Import local lessons
    const localLessons = await importLocalLessons();
    
    // Get existing lessons from database
    const existingLessons = await getExistingLessons();
    
    console.log('\n📊 Sync Summary:');
    console.log(`   Local lessons: ${localLessons.length}`);
    console.log(`   Database lessons: ${existingLessons.length}`);
    
    // Sync each lesson
    let createdCount = 0;
    let updatedCount = 0;
    let slidesCount = 0;
    
    for (const { id, lesson } of localLessons) {
      try {
        console.log(`\n🔄 Processing lesson ${id}: ${lesson.title}`);
        
        // Prepare lesson data
        const lessonData = {
          title: lesson.title,
          description: lesson.description || `שיעור ${id}`,
          icon: lesson.icon || '📚',
          duration: lesson.duration || '60 דקות',
          difficulty: lesson.difficulty || 'בינוני',
          targetAge: lesson.targetAge || '10-13',
          breakDuration: lesson.breakDuration || 10,
          originalId: id
        };
        
        // Sync lesson to database
        const databaseLessonId = await syncLessonToDatabase(lessonData);
        
        // Sync slides if they exist
        if (lesson.content && lesson.content.slides && lesson.content.slides.length > 0) {
          await syncSlidesForLesson(databaseLessonId, lesson.content.slides);
          slidesCount += lesson.content.slides.length;
        }
        
        // Track statistics
        const existingLesson = existingLessons.find(l => l.title === lesson.title);
        if (existingLesson) {
          updatedCount++;
        } else {
          createdCount++;
        }
        
      } catch (error) {
        console.error(`❌ Failed to sync lesson ${id}:`, error);
      }
    }
    
    console.log('\n🎉 Sync completed successfully!');
    console.log(`📈 Statistics:`);
    console.log(`   Lessons created: ${createdCount}`);
    console.log(`   Lessons updated: ${updatedCount}`);
    console.log(`   Total slides synced: ${slidesCount}`);
    
    // Verify final state
    const finalLessons = await getExistingLessons();
    console.log(`\n✅ Final database state: ${finalLessons.length} lessons`);
    
    // List all lessons
    console.log('\n📋 All lessons in database:');
    finalLessons.forEach((lesson, index) => {
      console.log(`   ${index + 1}. ${lesson.title} (ID: ${lesson.id})`);
    });
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    throw error;
  }
};

// Run the sync
syncAllLessons().then(() => {
  console.log('\n🏁 Sync script completed successfully!');
  process.exit(0);
}).catch((error) => {
  console.error('\n💥 Sync script failed:', error);
  process.exit(1);
}); 