/**
 * Upload Simplified Lesson 3 Demo to Firebase Database
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
import { lesson3DemoSimple } from '../data/lessons/lesson3/slides_demo3/index-simple.js';

/**
 * Upload simplified lesson3 demo to Firebase
 */
export const uploadLesson3DemoSimple = async () => {
  try {
    console.log('🚀 Starting simplified lesson3 demo upload...');
    
    // Create lesson document
    const lessonRef = doc(collection(db, 'lessons'));
    const lessonData = {
      ...lesson3DemoSimple,
      id: lessonRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: 'system',
      updatedBy: 'system',
      version: 1,
      isActive: true,
      totalSlides: lesson3DemoSimple.content.slides.length,
      source: 'demo_upload_simple'
    };
    
    // Create batch for atomic operations
    const batch = writeBatch(db);
    
    // Add lesson to batch
    batch.set(lessonRef, lessonData);
    
    // Add all slides to batch
    lesson3DemoSimple.content.slides.forEach((slide, index) => {
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
    
    console.log('✅ Simplified lesson3 demo uploaded successfully!');
    console.log(`📊 Lesson ID: ${lessonRef.id}`);
    console.log(`📊 Total slides: ${lesson3DemoSimple.content.slides.length}`);
    
    return {
      lessonId: lessonRef.id,
      totalSlides: lesson3DemoSimple.content.slides.length,
      success: true
    };
    
  } catch (error) {
    console.error('❌ Error uploading simplified lesson3 demo:', error);
    throw new Error(`Failed to upload simplified lesson3 demo: ${error.message}`);
  }
};

/**
 * Check if simplified lesson3 demo already exists
 */
export const checkLesson3DemoSimpleExists = async () => {
  try {
    const lessonsRef = collection(db, 'lessons');
    const lessonQuery = query(lessonsRef, where('id', '==', 'lesson3-demo-simple'));
    const lessonSnapshot = await getDocs(lessonQuery);
    
    return !lessonSnapshot.empty;
  } catch (error) {
    console.error('❌ Error checking simplified lesson3 demo existence:', error);
    return false;
  }
};

/**
 * Main upload function with existence check
 */
export const uploadLesson3DemoSimpleIfNotExists = async () => {
  try {
    const exists = await checkLesson3DemoSimpleExists();
    
    if (exists) {
      console.log('ℹ️ Simplified lesson3 demo already exists in database');
      return { success: true, message: 'Simplified lesson3 demo already exists' };
    }
    
    return await uploadLesson3DemoSimple();
    
  } catch (error) {
    console.error('❌ Error in simplified lesson3 demo upload:', error);
    throw error;
  }
};

// Export for use in other modules
export default uploadLesson3DemoSimpleIfNotExists; 