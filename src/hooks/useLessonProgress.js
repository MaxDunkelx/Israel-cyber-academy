import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for managing lesson progress
 * Handles both local storage and Firebase synchronization
 * 
 * @param {string|number} lessonId - The lesson ID to track progress for
 * @returns {Object} Lesson progress state and methods
 * 
 * @example
 * const { progress, updateProgress, isCompleted, currentSlide } = useLessonProgress(1);
 */
export const useLessonProgress = (lessonId) => {
  const { currentUser, updateUserProgress, setLastLessonSlide } = useAuth();
  const [localProgress, setLocalProgress] = useLocalStorage(`lesson_${lessonId}_progress`, {});
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
      if (syncToFirebase && currentUser && !currentUser.isGuest) {
        const newProgress = { ...progress, ...updates };
        
        await updateUserProgress(
          lessonId,
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
  }, [progress, currentUser, lessonId, updateUserProgress, updateLocalProgress]);

  // Update current slide
  const updateCurrentSlide = useCallback(async (slideIndex) => {
    await updateProgress({ currentSlide: slideIndex });
    
    // Update last slide in Firebase
    if (currentUser && !currentUser.isGuest) {
      await setLastLessonSlide(lessonId, slideIndex);
    }
  }, [updateProgress, currentUser, lessonId, setLastLessonSlide]);

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
    if (currentUser?.isGuest) {
      return lessonId <= 3; // Allow first 3 lessons for guests
    }
    
    // For authenticated users, check previous lesson completion
    return true; // This would be enhanced with actual lesson dependency logic
  }, [currentUser, lessonId]);

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
    getProgressStats
  };
}; 