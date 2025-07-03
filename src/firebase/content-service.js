/**
 * Content Service for Lessons and Slides Management
 * 
 * This service provides all CRUD operations for lessons and slides
 * in the Firestore database, with proper error handling and validation.
 * Includes fallback to local content when database is unavailable.
 */

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  writeBatch,
  limit,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase-config.js';
import { toast } from 'react-hot-toast';

// Global cache for lessons to avoid repeated database calls
let lessonsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Lesson Management Functions
 */

/**
 * Get all lessons from the database
 */
export const getAllLessons = async (forceRefresh = false) => {
  try {
    // Check cache first
    if (!forceRefresh && lessonsCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
      console.log('📋 Returning cached lessons');
      return lessonsCache;
    }

    console.log('🔍 Loading lessons from Firestore...');
    
    const lessonsRef = collection(db, 'lessons');
    const querySnapshot = await getDocs(lessonsRef);
    const dbLessons = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Add originalId based on lesson order or title mapping
      let originalId = data.originalId || data.order;
      
      // If no originalId, try to extract from title or use a fallback
      if (!originalId) {
        // Try to extract lesson number from title (e.g., "שיעור 1" -> 1)
        const titleMatch = data.title?.match(/שיעור\s*(\d+)/) || data.title?.match(/(\d+)/);
        if (titleMatch) {
          originalId = parseInt(titleMatch[1]);
        } else {
          // Fallback: use order field or generate based on position
          originalId = data.order || 1;
        }
      }
      
      dbLessons.push({
        id: doc.id,
        originalId: originalId, // Add the originalId
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
        source: 'database'
      });
    });
    
    console.log(`✅ Loaded ${dbLessons.length} lessons from database`);
    
    // Cache the results
    lessonsCache = dbLessons;
    cacheTimestamp = Date.now();
    
    return dbLessons;
    
  } catch (error) {
    console.error('❌ Error loading lessons:', error);
    throw new Error('Failed to load lessons from database. Please check your connection and try again.');
  }
};

/**
 * Get all lessons with their slide counts from the database
 */
export const getAllLessonsWithSlideCounts = async (forceRefresh = false) => {
  try {
    console.log('🔍 Loading lessons with slide counts from Firestore...');
    
    // Get all lessons first
    const lessons = await getAllLessons(forceRefresh);
    
    // Get slide counts for each lesson
    const lessonsWithCounts = await Promise.all(
      lessons.map(async (lesson) => {
        try {
          const slides = await getSlidesByLessonId(lesson.id);
          return {
            ...lesson,
            slides: slides, // Include actual slides for compatibility
            totalSlides: slides.length
          };
        } catch (error) {
          console.warn(`⚠️ Could not load slides for lesson ${lesson.id}:`, error);
          return {
            ...lesson,
            slides: [],
            totalSlides: 0
          };
        }
      })
    );
    
    console.log(`✅ Loaded ${lessonsWithCounts.length} lessons with slide counts from database`);
    
    return lessonsWithCounts;
    
  } catch (error) {
    console.error('❌ Error loading lessons with slide counts:', error);
    throw new Error('Failed to load lessons with slide counts from database. Please check your connection and try again.');
  }
};

/**
 * Get a specific lesson by ID
 */
export const getLessonById = async (lessonId) => {
  try {
    // Ensure lessonId is a string for Firestore
    const normalizedLessonId = String(lessonId);
    const lessonDoc = await getDoc(doc(db, 'lessons', normalizedLessonId));
    if (lessonDoc.exists()) {
      const data = lessonDoc.data();
      
      // Add originalId based on lesson order or title mapping
      let originalId = data.originalId || data.order;
      
      // If no originalId, try to extract from title or use a fallback
      if (!originalId) {
        // Try to extract lesson number from title (e.g., "שיעור 1" -> 1)
        const titleMatch = data.title?.match(/שיעור\s*(\d+)/) || data.title?.match(/(\d+)/);
        if (titleMatch) {
          originalId = parseInt(titleMatch[1]);
        } else {
          // Fallback: use order field or generate based on position
          originalId = data.order || 1;
        }
      }
      
      return {
        id: lessonDoc.id,
        originalId: originalId, // Add the originalId
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting lesson:', error);
    throw error;
  }
};

/**
 * Create a new lesson
 */
export const createLesson = async (lessonData) => {
  try {
    const lessonRef = doc(collection(db, 'lessons'));
    const newLesson = {
      ...lessonData,
      id: lessonRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      version: 1,
      totalSlides: 0,
      slides: []
    };
    
    await setDoc(lessonRef, newLesson);
    console.log('Lesson created:', lessonRef.id);
    return lessonRef.id;
  } catch (error) {
    console.error('Error creating lesson:', error);
    throw error;
  }
};

/**
 * Update an existing lesson
 */
export const updateLesson = async (lessonId, lessonData) => {
  try {
    // Validate and sanitize lesson data
    const sanitizedData = {
      ...lessonData,
      title: String(lessonData?.title || ''),
      description: String(lessonData?.description || ''),
      difficulty: lessonData?.difficulty || 'beginner',
      targetAge: Number(lessonData?.targetAge) || 12,
      duration: Number(lessonData?.duration) || 30,
      order: Number(lessonData?.order) || 1,
      tags: Array.isArray(lessonData?.tags) ? lessonData.tags : [],
      totalSlides: Number(lessonData?.totalSlides) || 0,
      isPublished: Boolean(lessonData?.isPublished)
    };

    const lessonRef = doc(db, 'lessons', lessonId);
    const updateData = {
      ...sanitizedData,
      updatedAt: serverTimestamp(),
      version: (lessonData.version || 0) + 1
    };
    
    await updateDoc(lessonRef, updateData);
    console.log('Lesson updated:', lessonId);
    return lessonId;
  } catch (error) {
    console.error('Error updating lesson:', error);
    throw error;
  }
};

/**
 * Delete a lesson and all its slides
 */
export const deleteLesson = async (lessonId) => {
  try {
    const batch = writeBatch(db);
    
    // Delete all slides for this lesson
    const slidesQuery = query(
      collection(db, 'slides'),
      where('lessonId', '==', lessonId)
    );
    const slidesSnapshot = await getDocs(slidesQuery);
    
    slidesSnapshot.docs.forEach(slideDoc => {
      batch.delete(slideDoc.ref);
    });
    
    // Delete the lesson
    batch.delete(doc(db, 'lessons', lessonId));
    
    await batch.commit();
    console.log(`Lesson ${lessonId} and ${slidesSnapshot.size} slides deleted`);
  } catch (error) {
    console.error('Error deleting lesson:', error);
    throw error;
  }
};

/**
 * Slide Management Functions
 */

/**
 * Get slides by lesson ID with fallback to local content
 */
export const getSlidesByLessonId = async (lessonId) => {
  try {
    console.log(`🔍 Loading slides for lesson ${lessonId} from database...`);
    
    // Normalize lessonId to string for consistent querying
    const normalizedLessonId = String(lessonId);
    
    // Get slides from the lesson's subcollection with proper ordering
    try {
      // First try with sortOrder (for proper database sorting)
      const slidesQuery = query(
        collection(db, 'lessons', normalizedLessonId, 'slides'),
        orderBy('sortOrder', 'asc')
      );
      
      const snapshot = await getDocs(slidesQuery);
      const slides = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        };
      });
      
      if (slides.length > 0) {
        console.log(`✅ Loaded ${slides.length} slides from database for lesson ${normalizedLessonId} (with sortOrder)`);
        return slides;
      }
    } catch (orderError) {
      console.log('⚠️ sortOrder ordering failed, trying with order field...');
    }
    
    // Try with order field
    try {
      const slidesQuery = query(
        collection(db, 'lessons', normalizedLessonId, 'slides'),
        orderBy('order', 'asc')
      );
      
      const snapshot = await getDocs(slidesQuery);
      const slides = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        };
      });
      
      if (slides.length > 0) {
        console.log(`✅ Loaded ${slides.length} slides from database for lesson ${normalizedLessonId} (with order)`);
        return slides;
      }
    } catch (orderError) {
      console.log('⚠️ order field failed, trying without ordering...');
    }
    
    // Try without ordering (fallback)
    try {
      const slidesQuery = query(
        collection(db, 'lessons', normalizedLessonId, 'slides')
      );
      
      const snapshot = await getDocs(slidesQuery);
      const slides = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        };
      });
      
      // Sort in memory by slide ID (assuming format like "slide1", "slide2", etc.)
      slides.sort((a, b) => {
        const aNum = parseInt(a.id.replace(/\D/g, '')) || 0;
        const bNum = parseInt(b.id.replace(/\D/g, '')) || 0;
        return aNum - bNum;
      });
      
      if (slides.length > 0) {
        console.log(`✅ Loaded ${slides.length} slides for lesson ${normalizedLessonId} (sorted in memory)`);
        return slides;
      }
    } catch (queryError) {
      console.error('Error querying slides:', queryError);
    }
    
    console.log(`📋 No database slides found for lesson ${lessonId}`);
    return [];
    
  } catch (error) {
    console.error('Error getting slides:', error);
    
    // Check if it's an index error
    const isIndexError = error.message.includes('index') || 
                        error.code === 'failed-precondition' ||
                        error.message.includes('requires an index');
    
    if (isIndexError) {
      console.log('⚠️ Index not found, trying without ordering...');
      
      // Show user-friendly notification
      showIndexNotification();
      
      try {
        // Try without ordering
        const slidesQuery = query(
          collection(db, 'lessons', normalizedLessonId, 'slides')
        );
        
        const snapshot = await getDocs(slidesQuery);
        const slides = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.() || new Date()
          };
        });
        
        // Sort in memory
        slides.sort((a, b) => {
          const aNum = parseInt(a.id.replace(/\D/g, '')) || 0;
          const bNum = parseInt(b.id.replace(/\D/g, '')) || 0;
          return aNum - bNum;
        });
        
        if (slides.length > 0) {
          console.log(`✅ Loaded ${slides.length} slides for lesson ${lessonId} (without ordering)`);
          return slides;
        }
      } catch (fallbackError) {
        console.error('Fallback error getting slides:', fallbackError);
      }
    }
    
    console.log(`❌ No slides found for lesson ${lessonId}`);
    return [];
  }
};

/**
 * Get slides from database only
 * No fallback to local content - ensures data consistency
 */
const getSlidesFromDatabase = async (lessonId) => {
  try {
    const slidesQuery = query(
      collection(db, 'lessons', String(lessonId), 'slides'),
      orderBy('order', 'asc')
    );
    const slidesSnapshot = await getDocs(slidesQuery);
    const slides = [];
    
    slidesSnapshot.forEach((doc) => {
      const data = doc.data();
      slides.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date()
      });
    });
    
    console.log(`✅ Loaded ${slides.length} slides from database for lesson ${lessonId}`);
    return slides;
  } catch (error) {
    console.error(`❌ Error loading slides for lesson ${lessonId}:`, error);
    throw new Error(`Failed to load slides for lesson ${lessonId}`);
  }
};

/**
 * Get a specific slide by ID
 */
export const getSlideById = async (slideId) => {
  try {
    const slideDoc = await getDoc(doc(db, 'slides', slideId));
    if (slideDoc.exists()) {
      const data = slideDoc.data();
      return {
        id: slideDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting slide:', error);
    throw error;
  }
};

/**
 * Enhanced create slide function with verification
 */
export const createSlide = async (slideData) => {
  try {
    console.log(`📝 Creating new slide with data:`, slideData);
    
    // Generate a proper ID for the slide
    const slideId = `slide-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const slideRef = doc(db, 'slides', slideId);
    
    // Ensure lessonId is always a string
    const normalizedSlideData = {
      ...slideData,
      lessonId: String(slideData?.lessonId || '')
    };
    
    const newSlide = {
      ...normalizedSlideData,
      id: slideId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastEdited: serverTimestamp(),
      version: 1
    };
    
    console.log(`✅ Creating slide with normalized data:`, newSlide);
    
    await setDoc(slideRef, newSlide);
    console.log('✅ Slide created successfully:', slideId);
    
    // Verify the creation
    const verifyDoc = await getDoc(slideRef);
    if (verifyDoc.exists()) {
      const savedData = verifyDoc.data();
      console.log('✅ Slide creation verified in database');
      console.log('📊 Created lessonId:', savedData.lessonId);
      return slideId;
    } else {
      throw new Error('Slide was not created properly');
    }
    
  } catch (error) {
    console.error('❌ Error creating slide:', error);
    
    // Provide specific error messages
    if (error.code === 'permission-denied') {
      throw new Error('Permission denied. Please check your Firebase security rules.');
    } else if (error.code === 'unavailable') {
      throw new Error('Firebase is temporarily unavailable. Please try again.');
    } else {
      throw new Error(`Failed to create slide: ${error.message}`);
    }
  }
};

/**
 * Enhanced update slide function with verification
 */
export const updateSlide = async (slideId, slideData) => {
  try {
    console.log(`💾 Updating slide ${slideId} with data:`, slideData);
    
    // Validate and sanitize slide data
    const sanitizedData = {
      ...slideData,
      title: String(slideData?.title || ''),
      type: String(slideData?.type || 'presentation'),
      order: Number(slideData?.order) || 1,
      lessonId: String(slideData?.lessonId || ''), // Ensure lessonId is always a string
      content: slideData?.content || {}
    };

    console.log(`✅ Sanitized data:`, sanitizedData);

    const slideRef = doc(db, 'slides', slideId);
    
    // Check if document exists
    const slideDoc = await getDoc(slideRef);
    
    if (slideDoc.exists()) {
      // Update existing slide
      const updateData = {
        ...sanitizedData,
        updatedAt: serverTimestamp(),
        lastEdited: serverTimestamp(),
        version: (slideData.version || 0) + 1
      };
      
      console.log(`📝 Updating existing slide with data:`, updateData);
      
      await updateDoc(slideRef, updateData);
      console.log('✅ Slide updated successfully:', slideId);
      
      // Verify the update was saved
      const verifyDoc = await getDoc(slideRef);
      if (verifyDoc.exists()) {
        const savedData = verifyDoc.data();
        console.log('✅ Slide update verified in database');
        console.log('📊 Updated fields:', Object.keys(updateData));
        console.log('📊 Saved lessonId:', savedData.lessonId);
        return slideId;
      } else {
        throw new Error('Slide was not saved properly');
      }
      
    } else {
      // Create new slide if it doesn't exist
      const newSlide = {
        ...sanitizedData,
        id: slideId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastEdited: serverTimestamp(),
        version: 1
      };
      
      console.log(`📝 Creating new slide with data:`, newSlide);
      
      await setDoc(slideRef, newSlide);
      console.log('✅ Slide created (was missing):', slideId);
      
      // Verify the creation
      const verifyDoc = await getDoc(slideRef);
      if (verifyDoc.exists()) {
        const savedData = verifyDoc.data();
        console.log('✅ Slide creation verified in database');
        console.log('📊 Created lessonId:', savedData.lessonId);
        return slideId;
      } else {
        throw new Error('Slide was not created properly');
      }
    }
    
  } catch (error) {
    console.error('❌ Error updating slide:', error);
    
    // Provide specific error messages
    if (error.code === 'permission-denied') {
      throw new Error('Permission denied. Please check your Firebase security rules.');
    } else if (error.code === 'unavailable') {
      throw new Error('Firebase is temporarily unavailable. Please try again.');
    } else {
      throw new Error(`Failed to save slide: ${error.message}`);
    }
  }
};

/**
 * Delete a slide
 */
export const deleteSlide = async (slideId) => {
  try {
    console.log('🗑️ Deleting slide:', slideId);
    
    // Get the slide data first to know which lesson it belongs to
    const slideRef = doc(db, 'slides', slideId);
    const slideDoc = await getDoc(slideRef);
    
    if (!slideDoc.exists()) {
      throw new Error('Slide not found');
    }
    
    const slideData = slideDoc.data();
    const lessonId = slideData.lessonId;
    
    // Delete the slide
    await deleteDoc(slideRef);
    console.log('✅ Slide deleted successfully');
    
    // Clean up teacher notes for this slide
    try {
      const { cleanupTeacherNotesForLesson } = await import('./teacher-service.jsx');
      const currentSlides = await getSlidesByLessonId(lessonId);
      const currentSlideIds = currentSlides.map(slide => slide.id);
      
      // Remove the deleted slide ID from the list since it's already deleted
      const remainingSlideIds = currentSlideIds.filter(id => id !== slideId);
      
      await cleanupTeacherNotesForLesson(lessonId, remainingSlideIds);
    } catch (cleanupError) {
      console.warn('⚠️ Teacher notes cleanup failed:', cleanupError);
      // Don't throw error for cleanup failure, as the main operation succeeded
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error deleting slide:', error);
    throw error;
  }
};

/**
 * Reorder slides for a lesson
 */
export const reorderSlides = async (lessonId, slideOrders, userId = 'system') => {
  try {
    const batch = writeBatch(db);
    
    for (const { slideId, newOrder } of slideOrders) {
      const slideRef = doc(db, 'slides', slideId);
      batch.update(slideRef, {
        order: newOrder,
        updatedAt: serverTimestamp(),
        updatedBy: userId
      });
    }
    
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error reordering slides:', error);
    throw new Error('Failed to reorder slides');
  }
};

/**
 * Helper Functions
 */

/**
 * Update lesson's total slides count
 */
const updateLessonSlideCount = async (lessonId) => {
  try {
    const slides = await getSlidesByLessonId(lessonId);
    await updateLesson(lessonId, { totalSlides: slides.length });
  } catch (error) {
    console.error('Error updating lesson slide count:', error);
  }
};

/**
 * Get lesson with all its slides
 */
export const getLessonWithSlides = async (lessonId) => {
  try {
    console.log(`🔍 Loading lesson ${lessonId} with slides...`);
    
    // First try to get lesson by Firestore ID
    let lesson = await getLessonById(lessonId);
    
    // If not found by ID, try to find by originalId (lesson number)
    if (!lesson) {
      console.log(`🔄 Lesson not found by ID ${lessonId}, trying by originalId...`);
      const lessonsRef = collection(db, 'lessons');
      const querySnapshot = await getDocs(lessonsRef);
      
      lesson = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          // Add originalId based on lesson order or title mapping
          let originalId = data.originalId || data.order;
          
          // If no originalId, try to extract from title or use a fallback
          if (!originalId) {
            // Try to extract lesson number from title (e.g., "שיעור 1" -> 1)
            const titleMatch = data.title?.match(/שיעור\s*(\d+)/) || data.title?.match(/(\d+)/);
            if (titleMatch) {
              originalId = parseInt(titleMatch[1]);
            } else {
              // Fallback: use order field or generate based on position
              originalId = data.order || 1;
            }
          }
          
          return {
            id: doc.id,
            originalId: originalId, // Add the originalId
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.() || new Date()
          };
        })
        .find(l => {
          // Handle both string and number lesson IDs
          if (typeof lessonId === 'string' && lessonId.startsWith('lesson')) {
            // If lessonId is "lesson1", "lesson2", etc., extract the number
            const lessonNumber = parseInt(lessonId.replace('lesson', ''));
            return l.originalId === lessonNumber || l.id === lessonId;
          } else {
            // If lessonId is already a number or other format
            return l.originalId === parseInt(lessonId) || l.originalId === lessonId;
          }
        });
    }
    
    if (lesson) {
      // Get slides from database using the lesson's Firestore ID
      const slides = await getSlidesByLessonId(lesson.id);
      
      console.log(`✅ Found lesson in database: ${lesson.title} with ${slides.length} slides`);
      return {
        ...lesson,
        slides: slides,
        source: 'database'
      };
    }
    
    console.log(`❌ No lesson found for ID: ${lessonId}`);
    throw new Error(`Lesson with ID ${lessonId} not found in database`);
    
  } catch (error) {
    console.error('❌ Error fetching lesson with slides:', error);
    throw new Error(`Failed to load lesson ${lessonId} from database`);
  }
};

/**
 * Search lessons by title or description
 */
export const searchLessons = async (searchTerm, limitCount = 10) => {
  try {
    const lessons = await getAllLessons();
    
    // Ensure searchTerm is a string
    const safeSearchTerm = String(searchTerm || '').toLowerCase();
    
    const filteredLessons = lessons.filter(lesson => {
      const title = String(lesson?.title || '').toLowerCase();
      const description = String(lesson?.description || '').toLowerCase();
      
      return title.includes(safeSearchTerm) || description.includes(safeSearchTerm);
    });
    
    return filteredLessons.slice(0, limitCount);
  } catch (error) {
    console.error('Error searching lessons:', error);
    throw new Error('Failed to search lessons');
  }
};

/**
 * Get lessons by difficulty level
 */
export const getLessonsByDifficulty = async (difficulty) => {
  try {
    const lessons = await getAllLessons();
    return lessons.filter(lesson => lesson.difficulty === difficulty);
  } catch (error) {
    console.error('Error fetching lessons by difficulty:', error);
    throw new Error('Failed to fetch lessons by difficulty');
  }
};

/**
 * Get lessons by target age
 */
export const getLessonsByTargetAge = async (targetAge) => {
  try {
    const lessons = await getAllLessons();
    return lessons.filter(lesson => lesson.targetAge === targetAge);
  } catch (error) {
    console.error('Error fetching lessons by target age:', error);
    throw new Error('Failed to fetch lessons by target age');
  }
};

/**
 * Get next lesson after the current one
 */
export const getNextLesson = async (currentLessonId) => {
  try {
    const lessons = await getAllLessons();
    
    // Find current lesson index
    const currentIndex = lessons.findIndex(lesson => 
      lesson.id === currentLessonId || 
      lesson.originalId === parseInt(currentLessonId) ||
      lesson.originalId === currentLessonId
    );
    
    if (currentIndex === -1 || currentIndex === lessons.length - 1) {
      return null; // No next lesson
    }
    
    return lessons[currentIndex + 1];
  } catch (error) {
    console.error('Error getting next lesson:', error);
    return null;
  }
};

/**
 * Bulk operations
 */

/**
 * Import multiple lessons and slides
 */
export const importLessons = async (lessonsData) => {
  try {
    const batch = writeBatch(db);
    const importedLessons = [];
    
    for (const lessonData of lessonsData) {
      const lessonRef = doc(db, 'lessons', lessonData.id.toString());
      const lesson = {
        ...lessonData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      batch.set(lessonRef, lesson);
      importedLessons.push(lesson);
      
      // Import slides for this lesson
      if (lessonData.slides && Array.isArray(lessonData.slides)) {
        lessonData.slides.forEach((slide, index) => {
          const slideId = `${lessonData.id}_${slide.id}`;
          const slideRef = doc(db, 'slides', slideId);
          const slideData = {
            ...slide,
            lessonId: lessonData.id.toString(),
            order: index + 1,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };
          
          batch.set(slideRef, slideData);
        });
      }
    }
    
    await batch.commit();
    
    // Log security event
    await logSecurityEvent('lessons_imported', {
      lessonCount: lessonsData.length,
      userId: 'system'
    });
    
    return importedLessons;
  } catch (error) {
    console.error('Error importing lessons:', error);
    throw new Error('Failed to import lessons');
  }
};

/**
 * Export lessons and slides for backup
 */
export const exportLessons = async () => {
  try {
    const lessons = await getAllLessons();
    const exportedData = [];
    
    for (const lesson of lessons) {
      const slides = await getSlidesByLessonId(lesson.id);
      exportedData.push({
        ...lesson,
        slides
      });
    }
    
    return exportedData;
  } catch (error) {
    console.error('Error exporting lessons:', error);
    throw new Error('Failed to export lessons');
  }
};

/**
 * Get slide history
 */
export const getSlideHistory = async (slideId) => {
  try {
    // For now, return basic history info
    // In a full implementation, you'd store version history
    const slide = await getSlideById(slideId);
    if (slide) {
      return [{
        version: slide.version,
        updatedAt: slide.updatedAt,
        updatedBy: slide.updatedBy,
        content: slide
      }];
    }
    return [];
  } catch (error) {
    console.error('Error getting slide history:', error);
    throw error;
  }
};

/**
 * Revert slide to a specific version
 */
export const revertSlideToVersion = async (slideId, version) => {
  try {
    // For now, just update the slide
    // In a full implementation, you'd restore from version history
    const slide = await getSlideById(slideId);
    if (slide) {
      await updateSlide(slideId, {
        ...slide,
        version: version + 1,
        updatedBy: 'system-revert'
      });
    }
  } catch (error) {
    console.error('Error reverting slide:', error);
    throw error;
  }
};

/**
 * MIGRATION FUNCTIONS - Sync local content with database
 */

/**
 * Migrate all local lessons to Firebase
 */
export const migrateLocalLessonsToFirebase = async () => {
  try {
    console.log('🔄 Starting local lessons migration to Firebase...');
    
    const batch = writeBatch(db);
    let migratedCount = 0;
    
    for (const lesson of localLessons) {
      // Check if lesson already exists
      const existingLesson = await getLessonByTitle(lesson.title);
      
      if (!existingLesson) {
        // Create lesson
        const lessonRef = doc(collection(db, 'lessons'));
        const lessonData = {
          ...lesson,
          id: lessonRef.id,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          source: 'local_migration',
          totalSlides: lesson.content?.slides?.length || 0
        };
        
        batch.set(lessonRef, lessonData);
        console.log(`📝 Created lesson: ${lesson.title}`);
        
        // Migrate slides for this lesson
        if (lesson.content?.slides) {
          for (let i = 0; i < lesson.content.slides.length; i++) {
            const slide = lesson.content.slides[i];
            const slideRef = doc(collection(db, 'slides'));
            const slideData = {
              ...slide,
              id: slideRef.id,
              lessonId: lessonRef.id,
              order: i + 1,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              source: 'local_migration',
              version: 1
            };
            
            batch.set(slideRef, slideData);
            console.log(`  📄 Created slide: ${slide.title}`);
          }
        }
        
        migratedCount++;
      } else {
        console.log(`⏭️ Lesson already exists: ${lesson.title}`);
      }
    }
    
    await batch.commit();
    console.log(`✅ Migration completed! ${migratedCount} lessons migrated.`);
    return migratedCount;
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw new Error(`Migration failed: ${error.message}`);
  }
};

/**
 * Get lesson by title (for migration checks)
 */
const getLessonByTitle = async (title) => {
  try {
    const q = query(collection(db, 'lessons'), where('title', '==', title));
    const snapshot = await getDocs(q);
    return snapshot.docs[0]?.data() || null;
  } catch (error) {
    console.error('Error getting lesson by title:', error);
    return null;
  }
};

/**
 * Sync local content with database content
 */
export const syncLocalWithDatabase = async () => {
  try {
    console.log('🔄 Starting content synchronization...');
    
    const dbLessons = await getAllLessons();
    const syncResults = {
      created: 0,
      updated: 0,
      unchanged: 0,
      errors: 0
    };
    
    for (const localLesson of localLessons) {
      try {
        const existingLesson = dbLessons.find(dbLesson => dbLesson.title === localLesson.title);
        
        if (!existingLesson) {
          // Create new lesson
          await createLesson({
            ...localLesson,
            source: 'local_sync',
            totalSlides: localLesson.content?.slides?.length || 0
          });
          
          // Create slides
          if (localLesson.content?.slides) {
            for (let i = 0; i < localLesson.content.slides.length; i++) {
              const slide = localLesson.content.slides[i];
              await createSlide({
                ...slide,
                lessonId: localLesson.id,
                order: i + 1,
                source: 'local_sync'
              });
            }
          }
          
          syncResults.created++;
          console.log(`✅ Created: ${localLesson.title}`);
        } else {
          // Check if content needs updating
          const needsUpdate = JSON.stringify(localLesson) !== JSON.stringify(existingLesson);
          
          if (needsUpdate) {
            await updateLesson(existingLesson.id, {
              ...localLesson,
              source: 'local_sync',
              updatedAt: serverTimestamp()
            });
            syncResults.updated++;
            console.log(`🔄 Updated: ${localLesson.title}`);
          } else {
            syncResults.unchanged++;
            console.log(`⏭️ Unchanged: ${localLesson.title}`);
          }
        }
      } catch (error) {
        console.error(`❌ Error syncing lesson ${localLesson.title}:`, error);
        syncResults.errors++;
      }
    }
    
    console.log('📊 Sync Results:', syncResults);
    return syncResults;
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    throw new Error(`Sync failed: ${error.message}`);
  }
};

/**
 * Get content status (local vs database)
 */
export const getContentStatus = async () => {
  try {
    const dbLessons = await getAllLessons();
    
    const status = {
      local: {
        totalLessons: localLessons.length,
        totalSlides: localLessons.reduce((sum, lesson) => 
          sum + (lesson.content?.slides?.length || 0), 0
        )
      },
      database: {
        totalLessons: dbLessons.length,
        totalSlides: dbLessons.reduce((sum, lesson) => 
          sum + (lesson.totalSlides || 0), 0
        )
      },
      comparison: []
    };
    
    // Compare each lesson
    for (const localLesson of localLessons) {
      const dbLesson = dbLessons.find(db => db.title === localLesson.title);
      
      status.comparison.push({
        title: localLesson.title,
        local: {
          exists: true,
          slides: localLesson.content?.slides?.length || 0
        },
        database: {
          exists: !!dbLesson,
          slides: dbLesson?.totalSlides || 0
        },
        status: !dbLesson ? 'missing_in_db' : 
                (localLesson.content?.slides?.length || 0) !== (dbLesson?.totalSlides || 0) ? 'different_slide_count' : 'synced'
      });
    }
    
    return status;
    
  } catch (error) {
    console.error('Error getting content status:', error);
    throw error;
  }
};

/**
 * Enhanced index notification with direct link
 */
const showIndexNotification = () => {
  const message = 'Firebase index needed for optimal performance. Click to create it now!';
  const directLink = 'https://console.firebase.google.com/v1/r/project/israel-cyber-academy/firestore/indexes?create_composite=ClNwcm9qZWN0cy9pc3JhZWwtY3liZXItYWNhZGVteS9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvc2xpZGVzL2luZGV4ZXMvXxABGgwKCGxlc3NvbklkEAEaCQoFb3JkZXIQARoMCghfX25hbWVfXxAB';
  
  console.log('⚠️ Firebase Index Required');
  console.log('📝 Message:', message);
  console.log('🔗 Direct Link:', directLink);
  
  // Show toast notification if available
  if (typeof toast !== 'undefined') {
    toast.error(message, {
      duration: 10000,
      action: {
        label: 'Create Index',
        onClick: () => window.open(directLink, '_blank')
      }
    });
  }
};

/**
 * Fix lessonId consistency in the database
 * This function ensures all slides have consistent lessonId values
 */
export const fixLessonIdConsistency = async () => {
  try {
    console.log('🔧 Starting lessonId consistency fix...');
    
    // Get all slides
    const slidesQuery = query(collection(db, 'slides'));
    const snapshot = await getDocs(slidesQuery);
    const slides = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📊 Found ${slides.length} slides to check`);
    
    const batch = writeBatch(db);
    let updatedCount = 0;
    
    for (const slide of slides) {
      const currentLessonId = slide.lessonId;
      const normalizedLessonId = String(currentLessonId);
      
      if (currentLessonId !== normalizedLessonId) {
        console.log(`🔄 Fixing slide ${slide.id}: ${currentLessonId} -> ${normalizedLessonId}`);
        
        const slideRef = doc(db, 'slides', slide.id);
        batch.update(slideRef, {
          lessonId: normalizedLessonId,
          updatedAt: serverTimestamp()
        });
        updatedCount++;
      }
    }
    
    if (updatedCount > 0) {
      await batch.commit();
      console.log(`✅ Fixed ${updatedCount} slides with inconsistent lessonId values`);
    } else {
      console.log('✅ All slides already have consistent lessonId values');
    }
    
    return updatedCount;
  } catch (error) {
    console.error('❌ Error fixing lessonId consistency:', error);
    throw error;
  }
};

export default {
  // Lesson operations
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonWithSlides,
  searchLessons,
  getLessonsByDifficulty,
  getLessonsByTargetAge,
  
  // Slide operations
  getSlidesByLessonId,
  getSlideById,
  createSlide,
  updateSlide,
  deleteSlide,
  reorderSlides,
  
  // Bulk operations
  importLessons,
  exportLessons,
  
  // Slide history
  getSlideHistory,
  revertSlideToVersion,
  
  // Migration functions
  migrateLocalLessonsToFirebase,
  getLessonByTitle,
  syncLocalWithDatabase,
  getContentStatus,
  
  // New functions
  fixLessonIdConsistency
};
