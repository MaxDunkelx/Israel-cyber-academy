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
export const useLessonProgress = (lessonId) => {
  const { userProfile, updateUserProgress, trackSlideEngagement } = useAuth();
  const [localProgress, setLocalProgress] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Get current progress for the lesson
  const currentProgress = userProfile?.progress?.[lessonId] || null;

  // Initialize local progress when component mounts or lesson changes
  useEffect(() => {
    if (currentProgress) {
      setLocalProgress(currentProgress);
    } else {
      // Initialize empty progress for new lessons
      setLocalProgress({
        completed: false,
        score: 0,
        completedAt: null,
        temporary: false,
        lastSlide: 0,
        pagesEngaged: [],
        lastActivity: new Date()
      });
    }
  }, [lessonId, currentProgress]);

  // Sync local progress to Firebase when it changes
  useEffect(() => {
    if (localProgress && userProfile && !isUpdating) {
      const syncToFirebase = async () => {
        setIsUpdating(true);
        try {
          await updateUserProgress(
            lessonId,
            localProgress.completed,
            localProgress.score,
            localProgress.temporary,
            localProgress.lastSlide
          );
        } catch (error) {
          console.error('Error syncing progress to Firebase:', error);
        } finally {
          setIsUpdating(false);
        }
      };

      // Debounce the sync to avoid too many Firebase calls
      const timeoutId = setTimeout(syncToFirebase, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [localProgress, lessonId, userProfile, updateUserProgress, isUpdating]);

  /**
   * Update lesson progress
   * 
   * @param {Object} updates - Progress updates to apply
   */
  const updateProgress = (updates) => {
    setLocalProgress(prev => ({
      ...prev,
      ...updates,
      lastActivity: new Date()
    }));
  };

  /**
   * Mark lesson as completed
   * 
   * @param {number} score - Final score (0-100)
   */
  const completeLesson = async (score = 100) => {
    const newProgress = {
      ...localProgress,
      completed: true,
      score,
      completedAt: new Date(),
      temporary: false,
      lastActivity: new Date()
    };

    setLocalProgress(newProgress);

    try {
      await updateUserProgress(lessonId, true, score, false, localProgress?.lastSlide || 0);
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  /**
   * Track slide engagement
   * 
   * @param {string} slideId - ID of the slide being engaged
   */
  const trackSlide = async (slideId) => {
    if (!slideId) return;

    try {
      await trackSlideEngagement(lessonId, slideId);
      
      // Update local progress
      setLocalProgress(prev => ({
        ...prev,
        pagesEngaged: prev.pagesEngaged?.includes(slideId) 
          ? prev.pagesEngaged 
          : [...(prev.pagesEngaged || []), slideId],
        lastActivity: new Date()
      }));
    } catch (error) {
      console.error('Error tracking slide engagement:', error);
    }
  };

  /**
   * Update last slide viewed
   * 
   * @param {number} slideIndex - Index of the last viewed slide
   */
  const updateLastSlide = (slideIndex) => {
    updateProgress({ lastSlide: slideIndex });
  };

  /**
   * Save temporary progress
   * 
   * @param {Object} progress - Temporary progress data
   */
  const saveTemporaryProgress = (progress) => {
    updateProgress({ ...progress, temporary: true });
  };

  /**
   * Remove temporary progress
   */
  const removeTemporaryProgress = () => {
    updateProgress({ temporary: false });
  };

  return {
    progress: localProgress,
    isCompleted: localProgress?.completed || false,
    score: localProgress?.score || 0,
    lastSlide: localProgress?.lastSlide || 0,
    pagesEngaged: localProgress?.pagesEngaged || [],
    isUpdating,
    updateProgress,
    completeLesson,
    trackSlide,
    updateLastSlide,
    saveTemporaryProgress,
    removeTemporaryProgress
  };
}; 