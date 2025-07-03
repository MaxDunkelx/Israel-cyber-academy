/**
 * Add Slide Ordering to Firebase
 * 
 * This script adds proper ordering fields to all slides in Firebase
 * so they can be sorted correctly when retrieved with .orderBy().
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, writeBatch } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC35sH38k9co_R0zBsbDT0S6RE1Cp-ksHE",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "750693821908",
  appId: "1:750693821908:web:6518d1facad1d8095cfa41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addSlideOrdering() {
  console.log('🔧 Adding slide ordering to Firebase...\n');

  try {
    // Get all lessons
    const lessonsCollection = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsCollection);
    
    console.log(`📚 Found ${lessonsSnapshot.size} lessons in database\n`);
    
    let totalSlidesUpdated = 0;
    let totalLessonsProcessed = 0;
    
    for (const lessonDoc of lessonsSnapshot.docs) {
      const lesson = lessonDoc.data();
      const lessonId = lessonDoc.id;
      
      console.log(`📖 Processing Lesson ${lesson.originalId || 'N/A'} (${lessonId}): ${lesson.title}`);
      
      // Get slides for this lesson
      const slidesCollection = collection(db, 'lessons', lessonId, 'slides');
      const slidesSnapshot = await getDocs(slidesCollection);
      
      if (slidesSnapshot.size === 0) {
        console.log(`   ⚠️ No slides found for this lesson`);
        continue;
      }
      
      console.log(`   📄 Found ${slidesSnapshot.size} slides`);
      
      // Create a batch for efficient updates
      const batch = writeBatch(db);
      let slidesInBatch = 0;
      
      // Sort slides by their ID (which should contain the slide number)
      const slides = slidesSnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));
      
      // Sort by slide ID (assuming format like "slide1", "slide2", etc.)
      slides.sort((a, b) => {
        const aNum = parseInt(a.id.replace(/\D/g, '')) || 0;
        const bNum = parseInt(b.id.replace(/\D/g, '')) || 0;
        return aNum - bNum;
      });
      
      // Add ordering fields to each slide
      slides.forEach((slide, index) => {
        const slideRef = doc(db, 'lessons', lessonId, 'slides', slide.id);
        
        // Add order field (1-based index for display)
        const order = index + 1;
        
        // Add sortOrder field (for database sorting)
        const sortOrder = order.toString().padStart(3, '0'); // "001", "002", etc.
        
        batch.update(slideRef, {
          order: order,
          sortOrder: sortOrder,
          slideNumber: order,
          updatedAt: new Date()
        });
        
        slidesInBatch++;
      });
      
      // Commit the batch
      if (slidesInBatch > 0) {
        await batch.commit();
        console.log(`   ✅ Updated ${slidesInBatch} slides with ordering`);
        totalSlidesUpdated += slidesInBatch;
      }
      
      totalLessonsProcessed++;
      console.log('');
    }
    
    console.log('🎉 SUMMARY:');
    console.log('===========');
    console.log(`📚 Lessons processed: ${totalLessonsProcessed}`);
    console.log(`📄 Total slides updated: ${totalSlidesUpdated}`);
    console.log('');
    console.log('✅ All slides now have ordering fields:');
    console.log('   - order: Numeric order (1, 2, 3, ...)');
    console.log('   - sortOrder: String for database sorting ("001", "002", ...)');
    console.log('   - slideNumber: Same as order');
    console.log('');
    console.log('🔍 You can now query slides with:');
    console.log('   .collection("slides").orderBy("sortOrder", "asc")');
    console.log('   or');
    console.log('   .collection("slides").orderBy("order", "asc")');
    
  } catch (error) {
    console.error('❌ Error adding slide ordering:', error);
  }
}

// Run the script
addSlideOrdering(); 