/**
 * Upload Lessons 2 and 3 to Firebase Database
 * 
 * This script uploads lesson2 and lesson3 with all their slides to the Firebase database.
 * It follows the same structure as other lesson uploads.
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
import { lesson2 } from '../data/lessons/lesson2/index.js';
import { lesson3 } from '../data/lessons/lesson3/index.js';

/**
 * Upload lesson2 to Firebase
 */
export const uploadLesson2 = async () => {
  try {
    console.log('🚀 Starting lesson2 upload...');
    
    // Create lesson document
    const lessonRef = doc(collection(db, 'lessons'));
    const lessonData = {
      ...lesson2,
      id: lessonRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: 'system',
      updatedBy: 'system',
      version: 1,
      isActive: true,
      totalSlides: lesson2.content.slides.length,
      source: 'lesson_upload'
    };
    
    // Create batch for atomic operations
    const batch = writeBatch(db);
    
    // Add lesson to batch
    batch.set(lessonRef, lessonData);
    
    // Add all slides to batch
    lesson2.content.slides.forEach((slide, index) => {
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
    
    console.log('✅ Lesson2 uploaded successfully!');
    console.log(`📊 Lesson ID: ${lessonRef.id}`);
    console.log(`📊 Total slides: ${lesson2.content.slides.length}`);
    
    return {
      lessonId: lessonRef.id,
      totalSlides: lesson2.content.slides.length,
      success: true
    };
    
  } catch (error) {
    console.error('❌ Error uploading lesson2:', error);
    throw new Error(`Failed to upload lesson2: ${error.message}`);
  }
};

/**
 * Upload lesson3 to Firebase
 */
export const uploadLesson3 = async () => {
  try {
    console.log('🚀 Starting lesson3 upload...');
    
    // Create lesson document
    const lessonRef = doc(collection(db, 'lessons'));
    const lessonData = {
      ...lesson3,
      id: lessonRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: 'system',
      updatedBy: 'system',
      version: 1,
      isActive: true,
      totalSlides: lesson3.content.slides.length,
      source: 'lesson_upload'
    };
    
    // Create batch for atomic operations
    const batch = writeBatch(db);
    
    // Add lesson to batch
    batch.set(lessonRef, lessonData);
    
    // Add all slides to batch
    lesson3.content.slides.forEach((slide, index) => {
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
    
    console.log('✅ Lesson3 uploaded successfully!');
    console.log(`📊 Lesson ID: ${lessonRef.id}`);
    console.log(`📊 Total slides: ${lesson3.content.slides.length}`);
    
    return {
      lessonId: lessonRef.id,
      totalSlides: lesson3.content.slides.length,
      success: true
    };
    
  } catch (error) {
    console.error('❌ Error uploading lesson3:', error);
    throw new Error(`Failed to upload lesson3: ${error.message}`);
  }
};

/**
 * Check if lesson already exists by title
 */
export const checkLessonExists = async (lessonTitle) => {
  try {
    const lessonsRef = collection(db, 'lessons');
    const lessonQuery = query(lessonsRef, where('title', '==', lessonTitle));
    const lessonSnapshot = await getDocs(lessonQuery);
    
    return !lessonSnapshot.empty;
  } catch (error) {
    console.error('❌ Error checking lesson existence:', error);
    return false;
  }
};

/**
 * Upload lesson2 if not exists
 */
export const uploadLesson2IfNotExists = async () => {
  try {
    const exists = await checkLessonExists(lesson2.title);
    
    if (exists) {
      console.log('ℹ️ Lesson2 already exists in database');
      return { success: true, message: 'Lesson2 already exists' };
    }
    
    return await uploadLesson2();
    
  } catch (error) {
    console.error('❌ Error in lesson2 upload:', error);
    throw error;
  }
};

/**
 * Upload lesson3 if not exists
 */
export const uploadLesson3IfNotExists = async () => {
  try {
    const exists = await checkLessonExists(lesson3.title);
    
    if (exists) {
      console.log('ℹ️ Lesson3 already exists in database');
      return { success: true, message: 'Lesson3 already exists' };
    }
    
    return await uploadLesson3();
    
  } catch (error) {
    console.error('❌ Error in lesson3 upload:', error);
    throw error;
  }
};

/**
 * Upload both lessons 2 and 3
 */
export const uploadLessons2And3 = async () => {
  try {
    console.log('🚀 Starting upload of lessons 2 and 3...');
    
    const lesson2Result = await uploadLesson2IfNotExists();
    const lesson3Result = await uploadLesson3IfNotExists();
    
    console.log('✅ Both lessons uploaded successfully!');
    
    return {
      lesson2: lesson2Result,
      lesson3: lesson3Result,
      success: true
    };
    
  } catch (error) {
    console.error('❌ Error uploading lessons:', error);
    throw error;
  }
};

// Export for use in other modules
export default uploadLessons2And3; 