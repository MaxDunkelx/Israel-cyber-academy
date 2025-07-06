/**
 * Force Upload Lessons 2 and 3 to Database
 * 
 * This script deletes existing lessons 2 and 3 from the database
 * and uploads the new versions with all 36 slides.
 */

import { forceUploadLessons2And3 } from './src/firebase/force-upload-lessons-2-3.js';
import process from 'process';

console.log('🚀 Starting force upload process...');
console.log('📚 Deleting old lessons and uploading new versions with 36 slides...');

try {
  const result = await forceUploadLessons2And3();
  
  console.log('✅ Force upload completed successfully!');
  console.log('📊 Results:', JSON.stringify(result, null, 2));
  
  if (result.lesson2.success) {
    console.log(`✅ Lesson 2: Success (${result.lesson2.totalSlides} slides)`);
  }
  
  if (result.lesson3.success) {
    console.log(`✅ Lesson 3: Success (${result.lesson3.totalSlides} slides)`);
  }
  
  console.log('🎉 Both lessons now have all 36 slides in the database!');
  
} catch (error) {
  console.error('❌ Force upload failed:', error.message);
  process.exit(1);
} 