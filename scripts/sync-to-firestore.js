import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, writeBatch, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { readdir } from 'fs/promises';
import { join } from 'path';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvOkT3v1EQqMVIupBA-BmOoOqXjKJQJQw",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function syncToFirestore() {
  try {
    console.log('🔄 Starting sync to Firestore...');
    
    // Step 1: Clean existing data
    console.log('🧹 Cleaning existing data...');
    const batch = writeBatch(db);
    
    // Delete all slides
    const slidesSnapshot = await getDocs(collection(db, 'slides'));
    slidesSnapshot.docs.forEach(slideDoc => {
      batch.delete(slideDoc.ref);
    });
    
    // Delete all lessons
    const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
    lessonsSnapshot.docs.forEach(lessonDoc => {
      batch.delete(lessonDoc.ref);
    });
    
    await batch.commit();
    console.log(`✅ Cleaned ${slidesSnapshot.size} slides and ${lessonsSnapshot.size} lessons`);
    
    // Step 2: Read and populate from local files
    console.log('📁 Reading local lesson files...');
    const lessonsDir = join(process.cwd(), 'src', 'data', 'lessons');
    const lessonFolders = await readdir(lessonsDir);
    
    let totalLessons = 0;
    let totalSlides = 0;
    
    for (const lessonFolder of lessonFolders) {
      if (!lessonFolder.startsWith('lesson')) continue;
      
      try {
        // Read lesson data
        const lessonPath = join(lessonsDir, lessonFolder, 'index.js');
        const lessonModule = await import(lessonPath);
        const lessonData = lessonModule.default;
        
        // Create lesson in Firestore
        const lessonDoc = await addDoc(collection(db, 'lessons'), {
          ...lessonData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          version: 1,
          totalSlides: lessonData.slides?.length || 0
        });
        
        console.log(`✅ Created lesson: ${lessonData.title}`);
        totalLessons++;
        
        // Process slides
        if (lessonData.slides && lessonData.slides.length > 0) {
          const slideBatch = writeBatch(db);
          
          for (let i = 0; i < lessonData.slides.length; i++) {
            const slide = lessonData.slides[i];
            
            const slideRef = doc(collection(db, 'slides'));
            slideBatch.set(slideRef, {
              ...slide,
              lessonId: lessonDoc.id,
              order: i + 1,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              version: 1
            });
            
            totalSlides++;
          }
          
          await slideBatch.commit();
          console.log(`   📄 Created ${lessonData.slides.length} slides`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${lessonFolder}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Sync completed successfully!`);
    console.log(`📊 Summary: ${totalLessons} lessons, ${totalSlides} slides`);
    console.log('💡 Your local files are now synced to Firestore!');
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    throw error;
  }
}

syncToFirestore()
  .then(() => {
    console.log('✅ Sync completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Sync failed:', error);
    process.exit(1);
  }); 