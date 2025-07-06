/**
 * Upload Lesson 3 Demo to Firebase Database
 * 
 * This script uploads the lesson3 demo lesson and all its slides to the Firebase database.
 * It follows the same structure as lesson1 and lesson2 demos.
 */

import { 
  collection, 
  doc, 
  serverTimestamp,
  writeBatch,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from './firebase-config.js';
import { lesson3Demo } from '../data/lessons/lesson3/slides_demo3/index.js';

/**
 * Upload lesson3 demo to Firebase
 */
export const uploadLesson3Demo = async () => {
  try {
    console.log('🚀 Starting lesson3 demo upload...');
    
    // Create lesson document
    const lessonRef = doc(collection(db, 'lessons'));
    const lessonData = {
      ...lesson3Demo,
      id: lessonRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: 'system',
      updatedBy: 'system',
      version: 1,
      isActive: true,
      totalSlides: lesson3Demo.content.slides.length,
      source: 'demo_upload'
    };
    
    // Create batch for atomic operations
    const batch = writeBatch(db);
    
    // Add lesson to batch
    batch.set(lessonRef, lessonData);
    
    // Add all slides to batch
    lesson3Demo.content.slides.forEach((slide, index) => {
      const slideRef = doc(collection(db, 'lessons', lessonRef.id, 'slides'));
      const slideData = {
        ...slide,
        id: slideRef.id,
        lessonId: lessonRef.id,
        order: index + 1,
        sortOrder: index + 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: 'system',
        updatedBy: 'system',
        version: 1,
        isActive: true
      };
      
      batch.set(slideRef, slideData);
    });
    
    // Commit all changes
    await batch.commit();
    
    console.log('✅ Lesson3 demo uploaded successfully!');
    console.log(`📊 Lesson ID: ${lessonRef.id}`);
    console.log(`📊 Total slides: ${lesson3Demo.content.slides.length}`);
    
    return {
      lessonId: lessonRef.id,
      totalSlides: lesson3Demo.content.slides.length,
      success: true
    };
    
  } catch (error) {
    console.error('❌ Error uploading lesson3 demo:', error);
    throw new Error(`Failed to upload lesson3 demo: ${error.message}`);
  }
};

/**
 * Check if lesson3 demo already exists
 */
export const checkLesson3DemoExists = async () => {
  try {
    const lessonsRef = collection(db, 'lessons');
    const lessonQuery = query(lessonsRef, where('id', '==', 'lesson3-demo'));
    const lessonSnapshot = await getDocs(lessonQuery);
    
    return !lessonSnapshot.empty;
  } catch (error) {
    console.error('❌ Error checking lesson3 demo existence:', error);
    return false;
  }
};

/**
 * Main upload function with existence check
 */
export const uploadLesson3DemoIfNotExists = async () => {
  try {
    const exists = await checkLesson3DemoExists();
    
    if (exists) {
      console.log('ℹ️ Lesson3 demo already exists in database');
      return { success: true, message: 'Lesson3 demo already exists' };
    }
    
    return await uploadLesson3Demo();
    
  } catch (error) {
    console.error('❌ Error in lesson3 demo upload:', error);
    throw error;
  }
};

// Export for use in other modules
export default uploadLesson3DemoIfNotExists; 