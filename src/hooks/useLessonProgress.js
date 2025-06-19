import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for managing lesson progress and page engagement
 * Provides utilities for tracking slide visits and calculating engagement metrics
 * 
 * @returns {Object} Progress management functions and data
 * 
 * @example
 * const { trackSlideVisit, getPagesEngaged, getLessonProgress } = useLessonProgress();
 */
export const useLessonProgress = () => {
  const { userProfile, trackSlideEngagement, updateUserProgress, setLastLessonSlide } = useAuth();
  const [localProgress, setLocalProgress] = useLocalStorage(`lesson_${userProfile?.currentLesson}_progress`, {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize progress from local storage or Firebase
  const [progress, setProgress] = useState({
    completed: false,
    score: 0,
    currentSlide: 0,
    timeSpent: 0,
    lastActivity: null,
    ...localProgress
  });

  // Load guest progress from localStorage on mount
  useEffect(() => {
    if (userProfile?.isGuest) {
      const guestProgress = localStorage.getItem('guestProgress');
      if (guestProgress) {
        try {
          const parsed = JSON.parse(guestProgress);
          if (parsed && typeof parsed === 'object') {
            setLocalProgress(parsed);
          }
        } catch (error) {
          console.error('Error parsing guest progress:', error);
        }
      }
    }
  }, [userProfile?.isGuest]);

  // Update local progress
  const updateLocalProgress = useCallback((updates) => {
    const newProgress = { ...progress, ...updates, lastActivity: new Date().toISOString() };
    setProgress(newProgress);
    setLocalProgress(newProgress);
  }, [progress, setLocalProgress]);

  // Update progress and sync with Firebase
  const updateProgress = useCallback(async (updates, syncToFirebase = true) => {
    try {
      setIsLoading(true);
      setError(null);

      // Update local progress immediately
      updateLocalProgress(updates);

      // Sync to Firebase if user is authenticated and not guest
      if (syncToFirebase && userProfile && !userProfile.isGuest) {
        const newProgress = { ...progress, ...updates };
        
        await updateUserProgress(
          userProfile.currentLesson,
          newProgress.completed,
          newProgress.score,
          !newProgress.completed, // temporary if not completed
          newProgress.currentSlide
        );
      }
    } catch (err) {
      setError(err.message);
      console.error('Error updating progress:', err);
    } finally {
      setIsLoading(false);
    }
  }, [progress, userProfile, updateUserProgress, updateLocalProgress]);

  // Update current slide
  const updateCurrentSlide = useCallback(async (slideIndex) => {
    await updateProgress({ currentSlide: slideIndex });
    
    // Update last slide in Firebase
    if (userProfile && !userProfile.isGuest) {
      await setLastLessonSlide(userProfile.currentLesson, slideIndex);
    }
  }, [updateProgress, userProfile, setLastLessonSlide]);

  // Mark lesson as completed
  const markCompleted = useCallback(async (score = 100) => {
    await updateProgress({
      completed: true,
      score,
      completedAt: new Date().toISOString()
    });
  }, [updateProgress]);

  // Reset progress
  const resetProgress = useCallback(async () => {
    const resetData = {
      completed: false,
      score: 0,
      currentSlide: 0,
      timeSpent: 0,
      completedAt: null
    };
    
    await updateProgress(resetData);
  }, [updateProgress]);

  // Track time spent
  const updateTimeSpent = useCallback((additionalTime) => {
    updateLocalProgress({
      timeSpent: (progress.timeSpent || 0) + additionalTime
    });
  }, [progress.timeSpent, updateLocalProgress]);

  // Calculate completion percentage
  const completionPercentage = useCallback((totalSlides) => {
    if (!totalSlides) return 0;
    return Math.round((progress.currentSlide / totalSlides) * 100);
  }, [progress.currentSlide]);

  // Check if lesson is completed
  const isCompleted = progress.completed;

  // Check if user can access this lesson (based on previous completion)
  const canAccess = useCallback((requiredPreviousLesson) => {
    if (!requiredPreviousLesson) return true;
    
    // For guest users, allow access to first few lessons
    if (userProfile?.isGuest) {
      return userProfile.currentLesson <= 3; // Allow first 3 lessons for guests
    }
    
    // For authenticated users, check previous lesson completion
    return true; // This would be enhanced with actual lesson dependency logic
  }, [userProfile, userProfile.currentLesson]);

  // Get progress statistics
  const getProgressStats = useCallback(() => {
    return {
      isCompleted: progress.completed,
      score: progress.score,
      currentSlide: progress.currentSlide,
      timeSpent: progress.timeSpent,
      lastActivity: progress.lastActivity,
      completionDate: progress.completedAt
    };
  }, [progress]);

  // Track when a slide is visited
  const trackSlideVisit = async (lessonId, slideId) => {
    if (!lessonId || !slideId) return;
    
    try {
      await trackSlideEngagement(lessonId, slideId);
      
      // Update local state for immediate UI updates
      setLocalProgress(prev => {
        const newProgress = { ...prev };
        if (!newProgress[lessonId]) {
          newProgress[lessonId] = {
            completed: false,
            score: 0,
            completedAt: null,
            temporary: false,
            lastSlide: 0,
            pagesEngaged: [],
            lastActivity: new Date()
          };
        }
        
        if (!newProgress[lessonId].pagesEngaged) {
          newProgress[lessonId].pagesEngaged = [];
        }
        
        if (!newProgress[lessonId].pagesEngaged.includes(slideId)) {
          newProgress[lessonId].pagesEngaged = [...newProgress[lessonId].pagesEngaged, slideId];
          newProgress[lessonId].lastActivity = new Date();
        }
        
        return newProgress;
      });
    } catch (error) {
      console.error('Error tracking slide visit:', error);
    }
  };

  // Get total pages engaged across all lessons
  const getPagesEngaged = () => {
    const progress = userProfile?.progress || localProgress;
    if (!progress) return 0;
    
    let uniquePages = new Set();
    Object.values(progress).forEach(lessonProgress => {
      if (lessonProgress.pagesEngaged && Array.isArray(lessonProgress.pagesEngaged)) {
        lessonProgress.pagesEngaged.forEach(page => uniquePages.add(page));
      }
    });
    return uniquePages.size;
  };

  // Get progress for a specific lesson
  const getLessonProgress = (lessonId) => {
    const progress = userProfile?.progress || localProgress;
    return progress?.[lessonId] || {
      completed: false,
      score: 0,
      completedAt: null,
      temporary: false,
      lastSlide: 0,
      pagesEngaged: [],
      lastActivity: null
    };
  };

  // Get pages engaged for a specific lesson
  const getLessonPagesEngaged = (lessonId) => {
    const lessonProgress = getLessonProgress(lessonId);
    return lessonProgress.pagesEngaged?.length || 0;
  };

  // Check if a specific slide has been visited
  const hasVisitedSlide = (lessonId, slideId) => {
    const lessonProgress = getLessonProgress(lessonId);
    return lessonProgress.pagesEngaged?.includes(slideId) || false;
  };

  return {
    // State
    progress,
    isLoading,
    error,
    isCompleted,
    
    // Methods
    updateProgress,
    updateCurrentSlide,
    markCompleted,
    resetProgress,
    updateTimeSpent,
    completionPercentage,
    canAccess,
    getProgressStats,
    trackSlideVisit,
    getPagesEngaged,
    getLessonProgress,
    getLessonPagesEngaged,
    hasVisitedSlide
  };
}; 