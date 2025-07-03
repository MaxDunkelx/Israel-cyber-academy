/**
 * Rename Slides to Clear Format
 * 
 * This script renames all slide IDs to a clear format like:
 * - slide1-1, slide1-2, slide1-3... (for lesson 1)
 * - slide2-1, slide2-2, slide2-3... (for lesson 2)
 * 
 * This makes it crystal clear in Firebase which slide belongs to which lesson.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';

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

async function renameSlidesToClearFormat() {
  console.log('🔧 Renaming slides to clear format...\n');

  try {
    // Get all lessons
    const lessonsCollection = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsCollection);
    
    console.log(`📚 Found ${lessonsSnapshot.size} lessons in database\n`);
    
    let totalSlidesRenamed = 0;
    let totalLessonsProcessed = 0;
    
    // Sort lessons by originalId to process them in order
    const lessons = [];
    for (const lessonDoc of lessonsSnapshot.docs) {
      const lesson = lessonDoc.data();
      lessons.push({
        id: lessonDoc.id,
        ...lesson
      });
    }
    
    // Sort by originalId
    lessons.sort((a, b) => (a.originalId || 0) - (b.originalId || 0));
    
    for (const lesson of lessons) {
      const lessonId = lesson.id;
      const lessonNumber = lesson.originalId || 'unknown';
      
      console.log(`📖 Processing Lesson ${lessonNumber} (${lessonId}): ${lesson.title}`);
      
      // Get slides for this lesson
      const slidesCollection = collection(db, 'lessons', lessonId, 'slides');
      const slidesSnapshot = await getDocs(slidesCollection);
      
      if (slidesSnapshot.size === 0) {
        console.log(`   ⚠️ No slides found for this lesson`);
        continue;
      }
      
      console.log(`   📄 Found ${slidesSnapshot.size} slides`);
      
      // Get all slides and sort them by current ID
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
      
      // Create a batch for efficient operations
      const batch = writeBatch(db);
      let slidesInBatch = 0;
      
      // Process each slide
      slides.forEach((slide, index) => {
        const slideNumber = index + 1;
        const newSlideId = `slide${lessonNumber}-${slideNumber}`;
        const oldSlideId = slide.id;
        
        console.log(`   🔄 Renaming ${oldSlideId} → ${newSlideId}`);
        
        // Add the slide with new ID
        const newSlideRef = doc(db, 'lessons', lessonId, 'slides', newSlideId);
        const slideData = {
          ...slide.data,
          order: slideNumber,
          sortOrder: slideNumber.toString().padStart(3, '0'), // "001", "002", etc.
          slideNumber: slideNumber,
          lessonNumber: lessonNumber,
          clearId: newSlideId,
          updatedAt: new Date()
        };
        
        batch.set(newSlideRef, slideData);
        
        // Delete the old slide
        const oldSlideRef = doc(db, 'lessons', lessonId, 'slides', oldSlideId);
        batch.delete(oldSlideRef);
        
        slidesInBatch++;
      });
      
      // Commit the batch
      if (slidesInBatch > 0) {
        await batch.commit();
        console.log(`   ✅ Renamed ${slidesInBatch} slides for lesson ${lessonNumber}`);
        totalSlidesRenamed += slidesInBatch;
      }
      
      totalLessonsProcessed++;
      console.log('');
    }
    
    console.log('🎉 SUMMARY:');
    console.log('===========');
    console.log(`📚 Lessons processed: ${totalLessonsProcessed}`);
    console.log(`📄 Total slides renamed: ${totalSlidesRenamed}`);
    console.log('');
    console.log('✅ All slides now have clear IDs:');
    console.log('   - slide1-1, slide1-2, slide1-3... (Lesson 1)');
    console.log('   - slide2-1, slide2-2, slide2-3... (Lesson 2)');
    console.log('   - slide3-1, slide3-2, slide3-3... (Lesson 3)');
    console.log('');
    console.log('🔍 You can now easily see in Firebase:');
    console.log('   - Which slide belongs to which lesson');
    console.log('   - The order of slides within each lesson');
    console.log('   - Query with: .collection("slides").orderBy("sortOrder", "asc")');
    
  } catch (error) {
    console.error('❌ Error renaming slides:', error);
  }
}

// Run the script
renameSlidesToClearFormat(); 