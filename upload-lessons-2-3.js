/**
 * Upload Lessons 2 and 3 to Database
 * 
 * Run this script to upload lesson2 and lesson3 to the Firebase database.
 * Make sure you have the correct Firebase configuration.
 */

import { uploadLessons2And3 } from './src/firebase/upload-lessons-2-3.js';
import process from 'process';

console.log('🚀 Starting lesson upload process...');
console.log('📚 Uploading lessons 2 and 3 to Firebase database...');

try {
  const result = await uploadLessons2And3();
  
  console.log('✅ Upload completed successfully!');
  console.log('📊 Results:', JSON.stringify(result, null, 2));
  
  if (result.lesson2.success) {
    console.log('✅ Lesson 2: Success');
  }
  
  if (result.lesson3.success) {
    console.log('✅ Lesson 3: Success');
  }
  
} catch (error) {
  console.error('❌ Upload failed:', error.message);
  process.exit(1);
} 