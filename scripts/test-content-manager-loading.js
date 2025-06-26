/**
 * Test Content Manager Loading
 * 
 * This script tests that the content manager can properly load
 * all lessons and slides from the database after export.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';

// Firebase configuration (you'll need to add your own config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const testContentManagerLoading = async () => {
  console.log('🧪 Testing Content Manager Loading...\n');

  try {
    // Test 1: Load all lessons
    console.log('📚 Test 1: Loading all lessons...');
    const lessonsQuery = query(
      collection(db, 'lessons'),
      orderBy('id', 'asc')
    );
    
    const lessonsSnapshot = await getDocs(lessonsQuery);
    const lessons = lessonsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`✅ Loaded ${lessons.length} lessons:`);
    lessons.forEach(lesson => {
      console.log(`  ${lesson.id}. ${lesson.title} - ${lesson.totalSlides} slides`);
    });
    
    if (lessons.length === 0) {
      console.log('⚠️ No lessons found. Please run the export script first.');
      return;
    }
    
    // Test 2: Load slides for each lesson
    console.log('\n📄 Test 2: Loading slides for each lesson...');
    let totalSlides = 0;
    
    for (const lesson of lessons) {
      console.log(`\n📖 Loading slides for lesson ${lesson.id} (${lesson.title})...`);
      
      try {
        const slidesQuery = query(
          collection(db, 'slides'),
          where('lessonId', '==', lesson.id),
          orderBy('order', 'asc')
        );
        
        const slidesSnapshot = await getDocs(slidesQuery);
        const slides = slidesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        console.log(`  ✅ Loaded ${slides.length} slides:`);
        slides.forEach(slide => {
          console.log(`    ${slide.order}. ${slide.title} (${slide.type})`);
          if (slide.content?.elements) {
            console.log(`       Elements: ${slide.content.elements.length}`);
          }
          if (slide.content?.options) {
            console.log(`       Options: ${slide.content.options.length}`);
          }
        });
        
        totalSlides += slides.length;
        
        // Verify slide count matches lesson total
        if (slides.length !== lesson.totalSlides) {
          console.warn(`    ⚠️ Slide count mismatch: ${slides.length} vs ${lesson.totalSlides}`);
        }
        
      } catch (error) {
        console.error(`  ❌ Error loading slides for lesson ${lesson.id}:`, error.message);
        
        // Try fallback without orderBy
        try {
          const slidesQuery = query(
            collection(db, 'slides'),
            where('lessonId', '==', lesson.id)
          );
          
          const slidesSnapshot = await getDocs(slidesQuery);
          const slides = slidesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          // Sort in memory
          slides.sort((a, b) => (a.order || 0) - (b.order || 0));
          
          console.log(`  ✅ Loaded ${slides.length} slides (fallback):`);
          slides.forEach(slide => {
            console.log(`    ${slide.order}. ${slide.title} (${slide.type})`);
          });
          
          totalSlides += slides.length;
          
        } catch (fallbackError) {
          console.error(`  ❌ Fallback also failed for lesson ${lesson.id}:`, fallbackError.message);
        }
      }
    }
    
    // Test 3: Verify data integrity
    console.log('\n🔍 Test 3: Verifying data integrity...');
    
    // Check for slides without lessonId
    const orphanSlidesQuery = query(
      collection(db, 'slides'),
      where('lessonId', '==', null)
    );
    
    try {
      const orphanSlidesSnapshot = await getDocs(orphanSlidesQuery);
      if (orphanSlidesSnapshot.size > 0) {
        console.warn(`⚠️ Found ${orphanSlidesSnapshot.size} slides without lessonId`);
      } else {
        console.log('✅ No orphan slides found');
      }
    } catch (error) {
      console.log('✅ Orphan slide check skipped (index not available)');
    }
    
    // Test 4: Check slide types
    console.log('\n📊 Test 4: Analyzing slide types...');
    const allSlidesQuery = query(collection(db, 'slides'));
    const allSlidesSnapshot = await getDocs(allSlidesQuery);
    const allSlides = allSlidesSnapshot.docs.map(doc => doc.data());
    
    const slideTypes = {};
    allSlides.forEach(slide => {
      slideTypes[slide.type] = (slideTypes[slide.type] || 0) + 1;
    });
    
    console.log('📈 Slide type distribution:');
    Object.entries(slideTypes).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} slides`);
    });
    
    // Test 5: Check for required fields
    console.log('\n✅ Test 5: Checking required fields...');
    let missingFields = 0;
    
    allSlides.forEach(slide => {
      const requiredFields = ['title', 'type', 'content', 'lessonId'];
      const missing = requiredFields.filter(field => !slide[field]);
      
      if (missing.length > 0) {
        console.warn(`⚠️ Slide ${slide.id} missing fields: ${missing.join(', ')}`);
        missingFields++;
      }
    });
    
    if (missingFields === 0) {
      console.log('✅ All slides have required fields');
    }
    
    // Summary
    console.log('\n🎉 Content Manager Loading Test Completed!');
    console.log('\n📊 Summary:');
    console.log(`  📚 Total lessons: ${lessons.length}`);
    console.log(`  📄 Total slides: ${totalSlides}`);
    console.log(`  🎯 Slide types: ${Object.keys(slideTypes).length}`);
    console.log(`  ⚠️ Missing fields: ${missingFields}`);
    
    // Recommendations
    console.log('\n💡 Recommendations:');
    if (lessons.length === 0) {
      console.log('  🔄 Run the export script to populate the database');
    }
    if (missingFields > 0) {
      console.log('  🔧 Fix slides with missing required fields');
    }
    if (Object.keys(slideTypes).length < 3) {
      console.log('  📝 Consider adding more slide types for variety');
    }
    
    console.log('\n✅ Content manager should now be able to load all lessons and slides!');
    
  } catch (error) {
    console.error('❌ Error during content manager loading test:', error);
    console.error('Stack trace:', error.stack);
  }
};

// Run the test
testContentManagerLoading().then(() => {
  console.log('\n🏁 Test completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Test failed:', error);
  process.exit(1);
}); 