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
    // Return cached lessons if available and not expired
    if (!forceRefresh && lessonsCache && cacheTimestamp && 
        (Date.now() - cacheTimestamp) < CACHE_DURATION) {
      return lessonsCache;
    }

    // Get lessons from Firestore
    const lessonsRef = collection(db, 'lessons');
    const lessonsQuery = query(lessonsRef, orderBy('originalId', 'asc'));
    const snapshot = await getDocs(lessonsQuery);
    
    const dbLessons = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
    }));

    // Update cache
    lessonsCache = dbLessons;
    cacheTimestamp = Date.now();
    
    return dbLessons;
    
  } catch (error) {
    console.warn('Database unavailable, falling back to local lessons:', error.message);
    
          // Fallback to local lessons when database is unavailable
      try {
        const { lessons } = await import('../data/lessons.js');
      const localLessons = lessons.map((lesson, index) => ({
        id: `local-${lesson.id || index + 1}`,
        originalId: lesson.id || index + 1,
        title: lesson.title,
        description: lesson.description,
        difficulty: lesson.difficulty || 'beginner',
        targetAge: lesson.targetAge || 'all',
        estimatedDuration: lesson.estimatedDuration || 30,
        slides: lesson.content?.slides || [],
        totalSlides: lesson.content?.slides?.length || 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        source: 'local_fallback'
      }));
      
      // Update cache with local data
      lessonsCache = localLessons;
      cacheTimestamp = Date.now();
      
      return localLessons;
    } catch (fallbackError) {
      console.error('Both database and local fallback failed:', fallbackError);
      throw new Error('Failed to load lessons. Please check your connection and try again.');
    }
  }
};

/**
 * Get all lessons with their slide counts from the database
 */
export const getAllLessonsWithSlideCounts = async (forceRefresh = false) => {
  try {
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
          return {
            ...lesson,
            slides: [],
            totalSlides: 0
          };
        }
      })
    );
    
    return lessonsWithCounts;
    
  } catch (error) {
    throw new Error('Failed to load lessons with slide counts from database. Please check your connection and try again.');
  }
};

/**
 * Get a specific lesson by ID
 */
export const getLessonById = async (lessonId) => {
  try {
    const lessonRef = doc(db, 'lessons', lessonId);
    const lessonDoc = await getDoc(lessonRef);
    
    if (lessonDoc.exists()) {
      return {
        id: lessonDoc.id,
        ...lessonDoc.data(),
        createdAt: lessonDoc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: lessonDoc.data().updatedAt?.toDate?.() || new Date()
      };
    } else {
      throw new Error('Lesson not found');
    }
  } catch (error) {
    throw new Error(`Failed to get lesson: ${error.message}`);
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
      createdBy: 'system',
      updatedBy: 'system',
      version: 1,
      isActive: true
    };
    
    await setDoc(lessonRef, newLesson);
    
    // Clear cache to force refresh
    lessonsCache = null;
    cacheTimestamp = null;
    
    return lessonRef.id;
  } catch (error) {
    throw new Error(`Failed to create lesson: ${error.message}`);
  }
};

/**
 * Update an existing lesson
 */
export const updateLesson = async (lessonId, lessonData) => {
  try {
    const lessonRef = doc(db, 'lessons', lessonId);
    const updateData = {
      ...lessonData,
      updatedAt: serverTimestamp(),
      updatedBy: 'system'
    };
    
    await updateDoc(lessonRef, updateData);
    
    // Clear cache to force refresh
    lessonsCache = null;
    cacheTimestamp = null;
    
    return lessonId;
  } catch (error) {
    throw new Error(`Failed to update lesson: ${error.message}`);
  }
};

/**
 * Delete a lesson and all its slides
 */
export const deleteLesson = async (lessonId) => {
  try {
    // Delete all slides for this lesson first
    const slidesSnapshot = await getDocs(collection(db, 'lessons', lessonId, 'slides'));
    const batch = writeBatch(db);
    
    slidesSnapshot.docs.forEach(slideDoc => {
      batch.delete(slideDoc.ref);
    });
    
    // Delete the lesson
    const lessonRef = doc(db, 'lessons', lessonId);
    batch.delete(lessonRef);
    
    await batch.commit();
    
    // Clear cache to force refresh
    lessonsCache = null;
    cacheTimestamp = null;
    
    return true;
  } catch (error) {
    throw new Error(`Failed to delete lesson: ${error.message}`);
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
      
      // Group slides by originalId and keep the most recent version
      const slidesByOriginalId = new Map();
      
      snapshot.docs.forEach((doc, index) => {
        const data = doc.data();
        const slideId = doc.id;
        const originalId = data.originalId || slideId;
        const timestamp = data.updatedAt?.toDate?.() || data.createdAt?.toDate?.() || new Date(0);
        
        // Keep the most recent version of each slide
        if (!slidesByOriginalId.has(originalId) || 
            timestamp > slidesByOriginalId.get(originalId).timestamp) {
          slidesByOriginalId.set(originalId, {
            docId: slideId,
            data: data,
            timestamp: timestamp
          });
        }
      });
      
      // Convert to array and generate unique keys
      const slides = Array.from(slidesByOriginalId.values()).map(({ data, docId }, index) => {
        const originalId = data.originalId || docId;
        
        // Ensure unique ID by combining lessonId and originalId to prevent React key conflicts
        const uniqueId = `${normalizedLessonId}_${originalId}`;
        
        return {
          id: uniqueId, // Use unique ID to prevent React key conflicts
          originalId: originalId, // Keep original ID for database operations
          lessonId: normalizedLessonId,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        };
      });
      
      // Sort by order field, then by ID as fallback
      slides.sort((a, b) => {
        const aOrder = a.order || 0;
        const bOrder = b.order || 0;
        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }
        // If order is the same, sort by ID
        return a.originalId.localeCompare(b.originalId);
      });
      
      if (slides.length > 0) {
        return slides;
      }
    } catch (orderError) {
      // Continue to next fallback
    }
    
    // Try with order field
    try {
      const slidesQuery = query(
        collection(db, 'lessons', normalizedLessonId, 'slides'),
        orderBy('order', 'asc')
      );
      
      const snapshot = await getDocs(slidesQuery);
      const slidesMap = new Map(); // Use Map to deduplicate by ID
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const slideId = doc.id;
        const originalId = data.originalId || slideId;
        
        // Ensure unique ID by combining lessonId and originalId to prevent React key conflicts
        const uniqueId = `${normalizedLessonId}_${originalId}`;
        
        slidesMap.set(uniqueId, {
          id: uniqueId, // Use unique ID to prevent React key conflicts
          originalId: originalId, // Keep original ID for database operations
          lessonId: normalizedLessonId,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        });
      });
      
      const slides = Array.from(slidesMap.values());
      
      // Sort by order field, then by ID as fallback
      slides.sort((a, b) => {
        const aOrder = a.order || 0;
        const bOrder = b.order || 0;
        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }
        // If order is the same, sort by ID
        return a.originalId.localeCompare(b.originalId);
      });
      
      if (slides.length > 0) {
        return slides;
      }
    } catch (orderError) {
      // Continue to next fallback
    }
    
    // Try without ordering (fallback)
    try {
      const slidesQuery = query(
        collection(db, 'lessons', normalizedLessonId, 'slides')
      );
      
      const snapshot = await getDocs(slidesQuery);
      const slidesMap = new Map(); // Use Map to deduplicate by ID
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const slideId = doc.id;
        const originalId = data.originalId || slideId;
        
        // Ensure unique ID by combining lessonId and originalId to prevent React key conflicts
        const uniqueId = `${normalizedLessonId}_${originalId}`;
        
        slidesMap.set(uniqueId, {
          id: uniqueId, // Use unique ID to prevent React key conflicts
          originalId: originalId, // Keep original ID for database operations
          lessonId: normalizedLessonId,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        });
      });
      
      const slides = Array.from(slidesMap.values());
      
      // Sort in memory by order, then by slide ID
      slides.sort((a, b) => {
        const aOrder = a.order || 0;
        const bOrder = b.order || 0;
        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }
        // If order is the same, sort by ID
        const aNum = parseInt(a.originalId.replace(/\D/g, '')) || 0;
        const bNum = parseInt(b.originalId.replace(/\D/g, '')) || 0;
        return aNum - bNum;
      });
      
      if (slides.length > 0) {
        return slides;
      }
    } catch (queryError) {
      // Continue to fallback
    }
    
    // Final fallback: try without any ordering
    try {
      const slidesQuery = query(
        collection(db, 'lessons', normalizedLessonId, 'slides')
      );
      
      const snapshot = await getDocs(slidesQuery);
      const slidesMap = new Map(); // Use Map to deduplicate by ID
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const slideId = doc.id;
        const originalId = data.originalId || slideId;
        
        // Ensure unique ID by combining lessonId and originalId to prevent React key conflicts
        const uniqueId = `${normalizedLessonId}_${originalId}`;
        
        slidesMap.set(uniqueId, {
          id: uniqueId, // Use unique ID to prevent React key conflicts
          originalId: originalId, // Keep original ID for database operations
          lessonId: normalizedLessonId,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        });
      });
      
      const slides = Array.from(slidesMap.values());
      
      // Sort in memory by order, then by slide ID
      slides.sort((a, b) => {
        const aOrder = a.order || 0;
        const bOrder = b.order || 0;
        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }
        // If order is the same, sort by ID
        const aNum = parseInt(a.originalId.replace(/\D/g, '')) || 0;
        const bNum = parseInt(b.originalId.replace(/\D/g, '')) || 0;
        return aNum - bNum;
      });
      
      if (slides.length > 0) {
        return slides;
      }
    } catch (fallbackError) {
      // Continue to local fallback
    }
    
    // If no database slides found, try local fallback
    try {
      console.warn('No database slides found, falling back to local slides for lesson:', lessonId);
      const { lessons } = await import('../data/lessons.js');
      const lessonNumber = parseInt(lessonId);
      const localLesson = lessons.find(l => l.id === lessonNumber);
      
      if (localLesson && localLesson.content && localLesson.content.slides) {
        const localSlides = localLesson.content.slides.map((slide, index) => ({
          id: `local-${lessonNumber}-${slide.id || index + 1}`,
          originalId: slide.id || index + 1,
          lessonId: lessonId,
          title: slide.title || `Slide ${index + 1}`,
          type: slide.type || 'presentation',
          content: slide.content || slide,
          order: slide.order || index + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          source: 'local_fallback'
        }));
        
        return localSlides;
      }
    } catch (localError) {
      console.warn('Local fallback also failed:', localError.message);
    }
    
    // If no slides found anywhere, return empty array
    return [];
    
  } catch (error) {
    console.warn('Database error, trying local fallback for slides:', error.message);
    
    // Try local fallback when database fails completely
    try {
      const { lessons } = await import('../data/lessons.js');
      const lessonNumber = parseInt(lessonId);
      const localLesson = lessons.find(l => l.id === lessonNumber);
      
      if (localLesson && localLesson.content && localLesson.content.slides) {
        const localSlides = localLesson.content.slides.map((slide, index) => ({
          id: `local-${lessonNumber}-${slide.id || index + 1}`,
          originalId: slide.id || index + 1,
          lessonId: lessonId,
          title: slide.title || `Slide ${index + 1}`,
          type: slide.type || 'presentation',
          content: slide.content || slide,
          order: slide.order || index + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          source: 'local_fallback'
        }));
        
        return localSlides;
      }
    } catch (fallbackError) {
      console.error('Both database and local fallback failed for slides:', fallbackError);
    }
    
    throw new Error(`Failed to load slides for lesson ${lessonId}: ${error.message}`);
  }
};

/**
 * Get a specific slide by ID
 */
export const getSlideById = async (slideId, lessonId) => {
  try {
    const slideRef = doc(db, 'lessons', lessonId, 'slides', slideId);
    const slideDoc = await getDoc(slideRef);
    
    if (slideDoc.exists()) {
      return {
        id: slideDoc.id,
        ...slideDoc.data(),
        createdAt: slideDoc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: slideDoc.data().updatedAt?.toDate?.() || new Date()
      };
    } else {
      throw new Error('Slide not found');
    }
  } catch (error) {
    throw new Error(`Failed to get slide: ${error.message}`);
  }
};

/**
 * Enhanced create slide function with verification
 */
export const createSlide = async (slideData, overrideId = null) => {
  try {
    // Use provided originalId or overrideId as the Firestore document ID
    const slideId = overrideId || slideData.originalId || `slide-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Ensure lessonId is always a string
    const normalizedSlideData = {
      ...slideData,
      lessonId: String(slideData?.lessonId || '')
    };
    
    // Use subcollection structure: lessons/{lessonId}/slides/{slideId}
    const slideRef = doc(db, 'lessons', normalizedSlideData.lessonId, 'slides', slideId);
    
    const newSlide = {
      ...normalizedSlideData,
      id: slideId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastEdited: serverTimestamp(),
      version: 1
    };
    
    await setDoc(slideRef, newSlide);
    
    // Verify the creation
    const verifyDoc = await getDoc(slideRef);
    if (verifyDoc.exists()) {
      return slideId;
    } else {
      throw new Error('Slide was not created properly');
    }
    
  } catch (error) {
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
    // Validate and sanitize slide data
    const sanitizedData = {
      ...slideData,
      title: String(slideData?.title || ''),
      type: String(slideData?.type || 'presentation'),
      order: Number(slideData?.order) || 1,
      lessonId: String(slideData?.lessonId || ''), // Ensure lessonId is always a string
      content: slideData?.content || {}
    };

    // Use subcollection structure: lessons/{lessonId}/slides/{slideId}
    const slideRef = doc(db, 'lessons', sanitizedData.lessonId, 'slides', slideId);
    
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
      
      await updateDoc(slideRef, updateData);
      
      // Verify the update was saved
      const verifyDoc = await getDoc(slideRef);
      if (verifyDoc.exists()) {
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
      
      await setDoc(slideRef, newSlide);
      
      // Verify the creation
      const verifyDoc = await getDoc(slideRef);
      if (verifyDoc.exists()) {
        return slideId;
      } else {
        throw new Error('Slide was not created properly');
      }
    }
    
  } catch (error) {
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
export const deleteSlide = async (slideId, lessonId) => {
  try {
    // Use subcollection structure: lessons/{lessonId}/slides/{slideId}
    const slideRef = doc(db, 'lessons', lessonId, 'slides', slideId);
    
    // Get the slide data first to know which lesson it belongs to
    const slideDoc = await getDoc(slideRef);
    
    if (!slideDoc.exists()) {
      throw new Error('Slide not found');
    }
    
    const slideData = slideDoc.data();
    
    // Delete the slide
    await deleteDoc(slideRef);
    
    // Clean up teacher notes for this slide
    try {
      const { cleanupTeacherNotesForLesson } = await import('./teacher-service.jsx');
      const currentSlides = await getSlidesByLessonId(lessonId);
      const currentSlideIds = currentSlides.map(slide => slide.originalId);
      
      // Remove the deleted slide ID from the list since it's already deleted
      const remainingSlideIds = currentSlideIds.filter(id => id !== slideId);
      
      await cleanupTeacherNotesForLesson(lessonId, remainingSlideIds);
    } catch (cleanupError) {
      // Don't throw error for cleanup failure, as the main operation succeeded
    }
    
    return true;
  } catch (error) {
    throw new Error(`Failed to delete slide: ${error.message}`);
  }
};

/**
 * Reorder slides for a lesson
 */
export const reorderSlides = async (lessonId, slideOrders, userId = 'system') => {
  try {
    const batch = writeBatch(db);
    
    for (const [slideId, newOrder] of Object.entries(slideOrders)) {
      const slideRef = doc(db, 'lessons', lessonId, 'slides', slideId);
      batch.update(slideRef, {
        order: newOrder,
        updatedAt: serverTimestamp(),
        updatedBy: userId
      });
    }
    
    await batch.commit();
    return true;
  } catch (error) {
    throw new Error(`Failed to reorder slides: ${error.message}`);
  }
};

/**
 * Update lesson slide count
 */
const updateLessonSlideCount = async (lessonId) => {
  try {
    const slides = await getSlidesByLessonId(lessonId);
    const lessonRef = doc(db, 'lessons', lessonId);
    await updateDoc(lessonRef, {
      totalSlides: slides.length,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    throw new Error(`Failed to update lesson slide count: ${error.message}`);
  }
};

/**
 * Get lesson with all its slides
 */
export const getLessonWithSlides = async (lessonId) => {
  try {
    // Try to get lesson by ID first
    let lesson = await getLessonById(lessonId);
    
    if (!lesson) {
      // If not found by ID, try to find by originalId
      const lessonsRef = collection(db, 'lessons');
      const lessonQuery = query(lessonsRef, where('originalId', '==', parseInt(lessonId)));
      const lessonSnapshot = await getDocs(lessonQuery);
      
      if (!lessonSnapshot.empty) {
        const lessonDoc = lessonSnapshot.docs[0];
        lesson = {
          id: lessonDoc.id,
          ...lessonDoc.data(),
          createdAt: lessonDoc.data().createdAt?.toDate?.() || new Date(),
          updatedAt: lessonDoc.data().updatedAt?.toDate?.() || new Date()
        };
      }
    }
    
    if (lesson) {
      // Get slides for this lesson
      const slides = await getSlidesByLessonId(lesson.id);
      
      return {
        ...lesson,
        slides: slides
      };
    } else {
      throw new Error(`No lesson found for ID: ${lessonId}`);
    }
  } catch (error) {
    console.warn('Database unavailable, falling back to local lesson:', error.message);
    
    // Fallback to local lesson when database is unavailable
    try {
      const { lessons } = await import('../data/lessons.js');
      const lessonNumber = parseInt(lessonId);
      const localLesson = lessons.find(l => l.id === lessonNumber);
      
      if (localLesson) {
        return {
          id: `local-${localLesson.id}`,
          originalId: localLesson.id,
          title: localLesson.title,
          description: localLesson.description,
          difficulty: localLesson.difficulty || 'beginner',
          targetAge: localLesson.targetAge || 'all',
          estimatedDuration: localLesson.estimatedDuration || 30,
          slides: localLesson.content?.slides || [],
          totalSlides: localLesson.content?.slides?.length || 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isActive: true,
          source: 'local_fallback'
        };
      } else {
        throw new Error(`No lesson found for ID: ${lessonId}`);
      }
    } catch (fallbackError) {
      console.error('Both database and local fallback failed:', fallbackError);
      throw new Error(`Failed to fetch lesson with slides: ${error.message}`);
    }
  }
};

/**
 * Search lessons by title or description
 */
export const searchLessons = async (searchTerm, limitCount = 10) => {
  try {
    const lessons = await getAllLessons();
    const searchLower = searchTerm.toLowerCase();
    
    return lessons
      .filter(lesson => 
        lesson.title?.toLowerCase().includes(searchLower) ||
        lesson.description?.toLowerCase().includes(searchLower)
      )
      .slice(0, limitCount);
  } catch (error) {
    throw new Error(`Failed to search lessons: ${error.message}`);
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
    throw new Error(`Failed to fetch lessons by difficulty: ${error.message}`);
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
    throw new Error(`Failed to fetch lessons by target age: ${error.message}`);
  }
};

/**
 * Get next lesson in sequence
 */
export const getNextLesson = async (currentLessonId) => {
  try {
    const lessons = await getAllLessons();
    
    // Handle both Firestore ID and lesson number (originalId)
    let currentIndex = -1;
    
    // First try to find by Firestore ID
    currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId);
    
    // If not found by ID, try to find by originalId (lesson number)
    if (currentIndex === -1) {
      currentIndex = lessons.findIndex(lesson => lesson.originalId === parseInt(currentLessonId));
    }
    
    // If still not found, try to find by lesson number as string
    if (currentIndex === -1) {
      currentIndex = lessons.findIndex(lesson => lesson.originalId === currentLessonId);
    }
    
    if (currentIndex === -1) {
      console.error('Current lesson not found:', {
        currentLessonId,
        type: typeof currentLessonId,
        availableLessons: lessons.map(l => ({ id: l.id, originalId: l.originalId, title: l.title }))
      });
      throw new Error('Current lesson not found');
    }
    
    const nextLesson = lessons[currentIndex + 1];
    return nextLesson || null;
  } catch (error) {
    throw new Error(`Failed to get next lesson: ${error.message}`);
  }
};

/**
 * Import lessons from external data
 */
export const importLessons = async (lessonsData) => {
  try {
    const batch = writeBatch(db);
    const importedLessons = [];
    
    for (const lessonData of lessonsData) {
      const lessonRef = doc(collection(db, 'lessons'));
      const newLesson = {
        ...lessonData,
        id: lessonRef.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: 'import',
        updatedBy: 'import',
        version: 1,
        isActive: true
      };
      
      batch.set(lessonRef, newLesson);
      importedLessons.push(newLesson);
    }
    
    await batch.commit();
    
    // Clear cache to force refresh
    lessonsCache = null;
    cacheTimestamp = null;
    
    return importedLessons;
  } catch (error) {
    throw new Error(`Failed to import lessons: ${error.message}`);
  }
};

/**
 * Export all lessons
 */
export const exportLessons = async () => {
  try {
    const lessons = await getAllLessons();
    
    return lessons.map(lesson => {
      const { slides, ...lessonData } = lesson;
      return lessonData;
    });
  } catch (error) {
    throw new Error(`Failed to export lessons: ${error.message}`);
  }
};

/**
 * Get slide version history
 */
export const getSlideHistory = async (slideId) => {
  try {
    // This would require implementing versioning in the slide documents
    // For now, return basic slide data
    const slideRef = doc(db, 'slides', slideId);
    const slideDoc = await getDoc(slideRef);
    
    if (slideDoc.exists()) {
      return [{
        version: slideDoc.data().version || 1,
        data: slideDoc.data(),
        timestamp: slideDoc.data().updatedAt?.toDate?.() || new Date()
      }];
    } else {
      throw new Error('Slide not found');
    }
  } catch (error) {
    throw new Error(`Failed to get slide history: ${error.message}`);
  }
};

/**
 * Revert slide to a specific version
 */
export const revertSlideToVersion = async (slideId, version) => {
  try {
    // This would require implementing versioning in the slide documents
    // For now, just update the slide
    const slideRef = doc(db, 'slides', slideId);
    await updateDoc(slideRef, {
      version: version,
      updatedAt: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    throw new Error(`Failed to revert slide: ${error.message}`);
  }
};

/**
 * Migrate local lessons to Firebase
 */
export const migrateLocalLessonsToFirebase = async () => {
  try {
    const lessons = await getAllLessons();
    let migratedCount = 0;
    
    for (const lesson of lessons) {
      try {
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
          
          await setDoc(lessonRef, lessonData);
          migratedCount++;
        }
      } catch (error) {
        // Continue with next lesson
      }
    }
    
    return migratedCount;
  } catch (error) {
    throw new Error(`Migration failed: ${error.message}`);
  }
};

/**
 * Helper function to get lesson by title
 */
const getLessonByTitle = async (title) => {
  try {
    const lessonsRef = collection(db, 'lessons');
    const lessonQuery = query(lessonsRef, where('title', '==', title));
    const lessonSnapshot = await getDocs(lessonQuery);
    
    if (!lessonSnapshot.empty) {
      return lessonSnapshot.docs[0].data();
    }
    return null;
  } catch (error) {
    throw new Error(`Failed to get lesson by title: ${error.message}`);
  }
};

// Export all functions
// Only include functions NOT already exported above
export {
  // If you have any utility functions that are NOT exported above, add them here
};

