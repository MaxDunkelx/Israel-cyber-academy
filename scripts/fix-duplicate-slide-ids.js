/**
 * Fix Duplicate Slide IDs Script
 * 
 * This script identifies and fixes duplicate slide IDs in the database
 * by ensuring each slide has a unique identifier.
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';

// Firebase project configuration
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

/**
 * Fix duplicate slide IDs by ensuring unique identifiers
 */
async function fixDuplicateSlideIds() {
  try {
    console.log('🔍 Starting duplicate slide ID fix...');
    
    // Get all slides from the database
    const slidesRef = collection(db, 'slides');
    const slidesSnapshot = await getDocs(slidesRef);
    
    const slides = [];
    slidesSnapshot.forEach(doc => {
      slides.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`📊 Found ${slides.length} total slides`);
    
    // Group slides by lessonId
    const slidesByLesson = {};
    slides.forEach(slide => {
      const lessonId = slide.lessonId;
      if (!slidesByLesson[lessonId]) {
        slidesByLesson[lessonId] = [];
      }
      slidesByLesson[lessonId].push(slide);
    });
    
    let fixedCount = 0;
    let duplicateCount = 0;
    
    // Check each lesson for duplicate IDs
    for (const [lessonId, lessonSlides] of Object.entries(slidesByLesson)) {
      console.log(`\n🔍 Checking lesson ${lessonId} with ${lessonSlides.length} slides`);
      
      // Create a map to track used IDs
      const usedIds = new Map();
      const duplicates = [];
      
      lessonSlides.forEach(slide => {
        const slideId = slide.id;
        if (usedIds.has(slideId)) {
          duplicates.push({
            slide,
            existingSlide: usedIds.get(slideId)
          });
          duplicateCount++;
        } else {
          usedIds.set(slideId, slide);
        }
      });
      
      // Fix duplicates by updating their IDs
      for (const { slide } of duplicates) {
        const newId = `${slide.lessonId}_${slide.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        try {
          const slideRef = doc(db, 'slides', slide.id);
          await updateDoc(slideRef, {
            id: newId,
            originalId: slide.id, // Keep the original ID for reference
            updatedAt: new Date()
          });
          
          console.log(`✅ Fixed duplicate slide ID: ${slide.id} -> ${newId}`);
          fixedCount++;
        } catch (error) {
          console.error(`❌ Failed to fix slide ${slide.id}:`, error);
        }
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`- Total slides processed: ${slides.length}`);
    console.log(`- Duplicate IDs found: ${duplicateCount}`);
    console.log(`- Slides fixed: ${fixedCount}`);
    
    if (fixedCount > 0) {
      console.log('\n✅ Duplicate slide ID fix completed successfully!');
    } else {
      console.log('\n✅ No duplicate slide IDs found!');
    }
    
  } catch (error) {
    console.error('❌ Error fixing duplicate slide IDs:', error);
  }
}

/**
 * Verify slide ordering and fix if needed
 */
async function verifySlideOrdering() {
  try {
    console.log('\n🔍 Verifying slide ordering...');
    
    // Get all lessons
    const lessonsRef = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsRef);
    
    let lessonsProcessed = 0;
    let slidesReordered = 0;
    
    for (const lessonDoc of lessonsSnapshot.docs) {
      const lessonId = lessonDoc.id;
      const lessonData = lessonDoc.data();
      
      // Get slides for this lesson
      const slidesQuery = query(
        collection(db, 'slides'),
        where('lessonId', '==', lessonId),
        orderBy('order', 'asc')
      );
      
      try {
        const slidesSnapshot = await getDocs(slidesQuery);
        const slides = [];
        
        slidesSnapshot.forEach(doc => {
          slides.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        if (slides.length > 0) {
          console.log(`📚 Lesson ${lessonId}: ${slides.length} slides`);
          
          // Check if slides need reordering
          let needsReordering = false;
          for (let i = 0; i < slides.length; i++) {
            const expectedOrder = i + 1;
            if (slides[i].order !== expectedOrder) {
              needsReordering = true;
              break;
            }
          }
          
          if (needsReordering) {
            console.log(`🔄 Reordering slides for lesson ${lessonId}...`);
            
            // Update slide orders
            for (let i = 0; i < slides.length; i++) {
              const slide = slides[i];
              const newOrder = i + 1;
              
              if (slide.order !== newOrder) {
                const slideRef = doc(db, 'slides', slide.id);
                await updateDoc(slideRef, {
                  order: newOrder,
                  updatedAt: new Date()
                });
                
                console.log(`  ✅ Slide ${slide.id}: order ${slide.order} -> ${newOrder}`);
                slidesReordered++;
              }
            }
          }
          
          lessonsProcessed++;
        }
      } catch (error) {
        console.warn(`⚠️ Could not process lesson ${lessonId}:`, error.message);
      }
    }
    
    console.log(`\n📊 Slide ordering summary:`);
    console.log(`- Lessons processed: ${lessonsProcessed}`);
    console.log(`- Slides reordered: ${slidesReordered}`);
    
    if (slidesReordered > 0) {
      console.log('\n✅ Slide ordering verification completed!');
    } else {
      console.log('\n✅ All slides are properly ordered!');
    }
    
  } catch (error) {
    console.error('❌ Error verifying slide ordering:', error);
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('🚀 Starting slide ID and ordering fix...\n');
    
    // Fix duplicate slide IDs
    await fixDuplicateSlideIds();
    
    // Verify and fix slide ordering
    await verifySlideOrdering();
    
    console.log('\n🎉 All fixes completed successfully!');
    
  } catch (error) {
    console.error('❌ Error in main execution:', error);
  }
}

// Run the script
main().then(() => {
  console.log('\n✅ Script execution completed');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Script execution failed:', error);
  process.exit(1);
}); 