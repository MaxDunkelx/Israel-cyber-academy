/**
 * Test script to verify lesson slide counts
 */

import { getAllLessonsWithSlideCounts } from '../src/firebase/content-service.js';

async function testLessonSlideCounts() {
  try {
    console.log('🧪 Testing lesson slide counts...');
    
    const lessons = await getAllLessonsWithSlideCounts(true); // Force refresh
    
    console.log(`\n📊 Found ${lessons.length} lessons:`);
    
    lessons.forEach((lesson, index) => {
      console.log(`\n${index + 1}. ${lesson.title}`);
      console.log(`   ID: ${lesson.id}`);
      console.log(`   Original ID: ${lesson.originalId}`);
      console.log(`   Total Slides: ${lesson.totalSlides}`);
      console.log(`   Slides Array Length: ${lesson.slides?.length || 0}`);
      console.log(`   Source: ${lesson.source}`);
      
      if (lesson.slides && lesson.slides.length > 0) {
        console.log(`   First 3 slide IDs: ${lesson.slides.slice(0, 3).map(s => s.id).join(', ')}`);
      }
    });
    
    // Check for any discrepancies
    const discrepancies = lessons.filter(lesson => 
      lesson.totalSlides !== (lesson.slides?.length || 0)
    );
    
    if (discrepancies.length > 0) {
      console.log('\n⚠️ Found discrepancies:');
      discrepancies.forEach(lesson => {
        console.log(`   ${lesson.title}: totalSlides=${lesson.totalSlides}, slides.length=${lesson.slides?.length || 0}`);
      });
    } else {
      console.log('\n✅ All lesson slide counts match!');
    }
    
  } catch (error) {
    console.error('❌ Error testing lesson slide counts:', error);
  }
}

// Run the test
testLessonSlideCounts(); 