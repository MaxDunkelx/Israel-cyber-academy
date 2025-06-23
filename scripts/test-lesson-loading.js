/**
 * Test script to verify lesson data loading
 * This script tests loading actual lesson data from the data folder
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const testLessonLoading = async () => {
  try {
    console.log('🧪 Testing lesson data loading...');
    
    const lessons = [
      'lesson1', 'lesson2', 'lesson3', 'lesson4', 'lesson5',
      'lesson6', 'lesson7', 'lesson8', 'lesson9'
    ];
    
    for (const lessonId of lessons) {
      console.log(`\n📖 Testing lesson: ${lessonId}`);
      
      const lessonPath = join(process.cwd(), 'src', 'data', 'lessons', lessonId, 'index.js');
      
      if (existsSync(lessonPath)) {
        console.log(`✅ Lesson file exists: ${lessonPath}`);
        
        try {
          // Try to import the lesson data
          const lessonModule = await import(`../src/data/lessons/${lessonId}/index.js`);
          const lessonData = lessonModule.default;
          
          console.log(`📊 Lesson title: ${lessonData.title || 'No title'}`);
          console.log(`📊 Slides count: ${lessonData.slides?.length || 0}`);
          
          if (lessonData.slides && lessonData.slides.length > 0) {
            console.log(`📊 First slide: ${lessonData.slides[0].title || 'No title'}`);
            console.log(`📊 First slide type: ${lessonData.slides[0].type || 'No type'}`);
          }
          
        } catch (importError) {
          console.log(`❌ Error importing lesson: ${importError.message}`);
        }
      } else {
        console.log(`❌ Lesson file not found: ${lessonPath}`);
      }
    }
    
    console.log('\n🎉 Lesson loading test completed!');
    
  } catch (error) {
    console.error('❌ Error testing lesson loading:', error);
  }
};

// Run the test
testLessonLoading()
  .then(() => {
    console.log('✅ Test completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }); 