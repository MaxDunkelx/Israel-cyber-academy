/**
 * Interactive Lesson Component - Israel Cyber Campus
 * 
 * This is the core learning interface where users engage with lesson content.
 * It handles slide navigation, progress tracking, exercise completion, and user engagement.
 * 
 * Key Features:
 * - Slide-based lesson presentation
 * - Multiple slide types (presentation, poll, video, interactive, break, reflection)
 * - Progress tracking and auto-save
 * - Exercise completion and scoring
 * - Slide engagement tracking
 * - Resume functionality
 * - Celebration animations on completion
 * - Time tracking for each slide
 * 
 * Component Flow:
 * 1. Load lesson data and user progress
 * 2. Initialize slide navigation and timer
 * 3. Track slide engagement and progress
 * 4. Handle exercise completion and scoring
 * 5. Save progress and unlock next lessons
 * 6. Show completion celebration and redirect
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getLessonWithSlides, getNextLesson } from '../firebase/content-service';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock,
  CheckCircle,
  Home,
  BookOpen,
  Eye,
  Timer,
  Target,
  Award,
  BarChart3,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Navigation
} from 'lucide-react';
import { PresentationSlide, PollSlide, VideoSlide, InteractiveSlide, BreakSlide, ReflectionSlide, QuizSlide } from './slides';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';
import { 
  initLessonSession, 
  logSlideNavigation, 
  logSlideEngagement, 
  logExerciseCompletion, 
  logLessonCompletion,
  exportSessionData 
} from '../utils/helpers';
import LiveSessionNotification from './student/LiveSessionNotification';

/**
 * Interactive Lesson Component - Main learning interface
 */
const InteractiveLesson = () => {
  const { currentUser, userProfile, updateUserProgress, trackSlideEngagement, setLastLessonSlide, getLastLessonSlide } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract lesson ID from URL parameters
  const { lessonId } = useParams();
  
  // Component state management
  const [lesson, setLesson] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState({});
  const [completedSlides, setCompletedSlides] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Statistics tracking - synchronized with userProfile
  const [totalTimeStudied, setTotalTimeStudied] = useState(0);
  const [pagesWatched, setPagesWatched] = useState(new Set());
  const [minutesLearned, setMinutesLearned] = useState(0);
  const [slideStartTime, setSlideStartTime] = useState(Date.now());
  const [lessonStartTime, setLessonStartTime] = useState(Date.now());
  const [slideTimeSpent, setSlideTimeSpent] = useState(0);
  
  // UI state
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Timer references for cleanup - MEMORY LEAK FIX
  const timerRef = useRef(null);
  const statsTimerRef = useRef(null);
  const slideTimerRef = useRef(null);
  const resizeListenerRef = useRef(null);
  const firebaseListenersRef = useRef([]);
  
  // Prevent infinite loops with refs
  const isInitialized = useRef(false);
  const lastSavedSlide = useRef(0);
  const isCompletedLesson = useRef(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Comprehensive cleanup function to prevent memory leaks
   */
  const cleanupAllTimersAndListeners = useCallback(() => {
    console.log('🧹 Cleaning up InteractiveLesson timers and listeners');
    
    // Clear all timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (statsTimerRef.current) {
      clearInterval(statsTimerRef.current);
      statsTimerRef.current = null;
    }
    if (slideTimerRef.current) {
      clearInterval(slideTimerRef.current);
      slideTimerRef.current = null;
    }

    // Remove resize listener
    if (resizeListenerRef.current) {
      window.removeEventListener('resize', resizeListenerRef.current);
      resizeListenerRef.current = null;
    }

    // Cleanup Firebase listeners
    firebaseListenersRef.current.forEach(unsubscribe => {
      if (typeof unsubscribe === 'function') {
        try {
          unsubscribe();
        } catch (error) {
          console.warn('Error cleaning up Firebase listener:', error);
        }
      }
    });
    firebaseListenersRef.current = [];
  }, []);

  // Debug: Log current slide position
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log(`🎯 Current slide: ${currentSlide} (Lesson ${lessonId})`);
      console.log(`🔐 Auth state: currentUser=${currentUser?.uid}, userProfile=${!!userProfile}`);
      if (userProfile && lesson) {
        const savedSlide = getLastLessonSlide(lesson.originalId);
        console.log(`💾 Saved slide position: ${savedSlide}`);
        console.log(`✅ Lesson completed: ${isCompletedLesson.current}`);
      }
    }
  }, [currentSlide, lessonId, userProfile, lesson, getLastLessonSlide, currentUser]);

  /**
   * Initialize session logging when user and lesson are available
   */
  useEffect(() => {
    if (currentUser && lessonId && !isInitialized.current) {
      // Initialize session logging with proper user and lesson IDs
      initLessonSession(currentUser.uid, lessonId);
      console.log('🎯 Session initialized with:', { userId: currentUser.uid, lessonId });
    }
  }, [currentUser, lessonId]);

  /**
   * Check teacher access control before loading lesson
   */
  useEffect(() => {
    if (!userProfile) return;
    
    const checkTeacherAccess = async () => {
      try {
        const { doc, getDoc } = await import('firebase/firestore');
        const { db } = await import('../firebase/firebase-config');
        
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const freshUserData = userDoc.data();
          const teacherAssignedLesson = freshUserData.currentLesson || 0;
          const lessonIdNum = parseInt(lessonId);
          
          // Check if teacher has unlocked this lesson
          if (lessonIdNum > teacherAssignedLesson) {
            setError('השיעור עדיין לא נפתח על ידי המורה');
            toast.error('השיעור עדיין לא נפתח על ידי המורה');
            navigate('/student/dashboard');
            return;
          }
        }
      } catch (error) {
        console.error('Error checking teacher access:', error);
        // Fall back to cached profile
        const teacherAssignedLesson = userProfile.currentLesson || 0;
        const lessonIdNum = parseInt(lessonId);
        
        if (lessonIdNum > teacherAssignedLesson) {
          setError('השיעור עדיין לא נפתח על ידי המורה');
          toast.error('השיעור עדיין לא נפתח על ידי המורה');
          navigate('/student/dashboard');
          return;
        }
      }
    };
    
    checkTeacherAccess();
  }, [userProfile, lessonId, navigate, currentUser]);

  /**
   * Initialize lesson data and timer - FIXED for completed lessons
   */
  useEffect(() => {
    let isMounted = true;
    async function loadLesson() {
      setLoading(true);
      setError(null);
      try {
        let lessonData = await getLessonWithSlides(lessonId);
        if (lessonData && lessonData.slides && lessonData.slides.length > 0) {
          // Keep the slides in the root level for consistency
          if (isMounted) setLesson(lessonData);
          
          // Check if lesson is already completed using Firestore lesson ID
          const lessonNumber = lessonData.originalId || parseInt(lessonId);
          const lessonFirestoreId = `lesson-${lessonNumber}`;
          let lessonCompleted = false;
          
          if (userProfile && userProfile.progress && lessonFirestoreId && userProfile.progress[lessonFirestoreId]) {
            const lessonProgress = userProfile.progress[lessonFirestoreId];
            if (lessonProgress.completed) {
              isCompletedLesson.current = true;
              lessonCompleted = true;
              console.log('✅ Lesson already completed, showing completion state');
            }
          }
          
          // Load saved slide position using lesson number (getLastLessonSlide handles the conversion)
          if (userProfile && lessonNumber && !isNaN(lessonNumber)) {
            let savedSlide = getLastLessonSlide(lessonNumber);
            // If lesson is completed or savedSlide is out of bounds, reset to 0
            if (lessonCompleted || savedSlide < 0 || savedSlide >= lessonData.slides.length) {
              savedSlide = 0;
              setLastLessonSlide(lessonNumber, 0); // Reset in user progress
              console.log('🔄 Resetting saved slide position to 0');
            }
            setCurrentSlide(savedSlide);
            console.log(`📖 Loaded saved slide position: ${savedSlide}`);
          }
          
          // Mark as initialized
          isInitialized.current = true;
        } else {
          throw new Error('No slides found in Firebase');
        }
      } catch (error) {
        console.error('Error loading lesson:', error);
        if (isMounted) {
          setError('שגיאה בטעינת השיעור');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    if (lessonId) {
      loadLesson();
    }
    
    return () => {
      isMounted = false;
    };
  }, [lessonId, userProfile, getLastLessonSlide]);

  /**
   * Track slide engagement when slide changes - FIXED to prevent conflicts
   */
  useEffect(() => {
    if (!lesson || !userProfile || !isInitialized.current) return;
    
    const currentSlideData = lesson.slides ? lesson.slides[currentSlide] : null;
    if (!currentSlideData) return;
    
    // Reset slide timer
    setSlideStartTime(Date.now());
    setSlideTimeSpent(0);
    
    // Track slide engagement
    const lessonNumber = lesson.originalId || parseInt(lessonId);
    if (lessonNumber && currentSlideData.id) {
      trackSlideEngagement(lessonNumber, currentSlideData.id);
      
      // Add to pages watched set
      setPagesWatched(prev => new Set([...prev, currentSlideData.id]));
    }
    
    // Save current slide position
    if (lessonNumber && !isNaN(lessonNumber)) {
      setLastLessonSlide(lessonNumber, currentSlide);
      lastSavedSlide.current = currentSlide;
    }
    
    // Log slide navigation
    logSlideNavigation(lastSavedSlide.current, currentSlide, currentSlide > lastSavedSlide.current ? 'forward' : 'backward');
    
  }, [currentSlide, lesson, userProfile, lessonId, trackSlideEngagement, setLastLessonSlide]);

  /**
   * Synchronize statistics with userProfile - FIXED to prevent loops
   */
  useEffect(() => {
    if (!userProfile) return;
    
    // Update total time studied from user profile
    setTotalTimeStudied(userProfile.totalTimeSpent || 0);
    
    // Update pages watched from user profile and current session
    const allPagesEngaged = new Set();
    if (userProfile.progress) {
      Object.values(userProfile.progress).forEach(lessonProgress => {
        if (lessonProgress.pagesEngaged && Array.isArray(lessonProgress.pagesEngaged)) {
          lessonProgress.pagesEngaged.forEach(pageId => allPagesEngaged.add(pageId));
        }
      });
    }
    
    // Add current session pages
    pagesWatched.forEach(pageId => allPagesEngaged.add(pageId));
    setPagesWatched(allPagesEngaged);
    
    // Update minutes learned (convert from total time spent)
    setMinutesLearned(Math.floor((userProfile.totalTimeSpent || 0) / 60));
    
    // Log statistics update (development only)
    if (import.meta.env.DEV) {
      console.log('📊 Statistics updated:', {
        totalTimeSpent: userProfile.totalTimeSpent || 0,
        totalPagesEngaged: allPagesEngaged.size
      });
    }
  }, [userProfile]);

  /**
   * Slide timer - tracks time spent on current slide - FIXED with proper cleanup
   */
  useEffect(() => {
    if (!lesson) return;
    
    // Clear previous timer to prevent memory leaks
    if (slideTimerRef.current) {
      clearInterval(slideTimerRef.current);
    }
    
    slideTimerRef.current = setInterval(() => {
      const now = Date.now();
      const timeSpent = Math.floor((now - slideStartTime) / 1000);
      setSlideTimeSpent(timeSpent);
      
      // Update time left if slide has duration
      if (lesson.slides && lesson.slides[currentSlide]?.content?.duration) {
        const duration = lesson.slides[currentSlide].content.duration;
        const remaining = Math.max(0, duration - timeSpent);
        setTimeLeft(remaining);
      }
    }, 1000);

    // Cleanup function - CRITICAL for preventing memory leaks
    return () => {
      if (slideTimerRef.current) {
        clearInterval(slideTimerRef.current);
        slideTimerRef.current = null;
      }
    };
  }, [slideStartTime, currentSlide, lesson]);

  /**
   * Window resize handler for responsive design - FIXED with proper cleanup
   */
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Store reference for cleanup
    resizeListenerRef.current = handleResize;
    window.addEventListener('resize', handleResize);

    return () => {
      if (resizeListenerRef.current) {
        window.removeEventListener('resize', resizeListenerRef.current);
        resizeListenerRef.current = null;
      }
    };
  }, []);

  /**
   * Real-time user profile listener for live progress updates - FIXED with proper cleanup
   */
  useEffect(() => {
    if (!currentUser) return;
    
    const setupListener = async () => {
      try {
        const { doc, onSnapshot } = await import('firebase/firestore');
        const { db } = await import('../firebase/firebase-config');
        
        const userRef = doc(db, 'users', currentUser.uid);
        const unsubscribe = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            const freshUserData = doc.data();
            console.log('🔄 Real-time user profile update received:', {
              totalTimeSpent: freshUserData.totalTimeSpent,
              totalPagesEngaged: freshUserData.totalPagesEngaged,
              completedLessons: freshUserData.completedLessons?.length || 0
            });
            
            // The AuthContext listener should handle this automatically
            // This is just for logging and debugging
          }
        }, (error) => {
          console.error('❌ Error listening to user profile updates:', error);
        });

        // Store listener for cleanup
        firebaseListenersRef.current.push(unsubscribe);
        
        return unsubscribe;
      } catch (error) {
        console.error('❌ Error setting up Firebase listener:', error);
      }
    };

    let unsubscribe;
    setupListener().then(unsub => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
        // Remove from listeners array
        firebaseListenersRef.current = firebaseListenersRef.current.filter(
          listener => listener !== unsubscribe
        );
      }
    };
  }, [currentUser]);

  /**
   * Component unmount cleanup - CRITICAL for preventing memory leaks
   */
  useEffect(() => {
    return () => {
      console.log('🧹 Cleaning up InteractiveLesson component');
      cleanupAllTimersAndListeners();
      isInitialized.current = false;
    };
  }, [cleanupAllTimersAndListeners]);

  /**
   * Navigate to next slide - FIXED to prevent auto-advancement
   */
  const handleNextSlide = useCallback(() => {
    if (!lesson) return;
    
    // Log slide navigation
    logSlideNavigation(currentSlide, currentSlide + 1, 'forward');
    
    // Add slide time to total time studied
    const slideTime = Math.floor((Date.now() - slideStartTime) / 1000);
    setTotalTimeStudied(prev => prev + slideTime);
    
    if (currentSlide < (lesson.slides ? lesson.slides.length - 1 : 0)) {
      setCurrentSlide(currentSlide + 1);
    }
    // Don't automatically complete lesson - let user click finish button
  }, [lesson, currentSlide, slideStartTime]);

  /**
   * Navigate to previous slide - FIXED
   */
  const handlePrevSlide = useCallback(() => {
    if (!lesson || currentSlide <= 0) return;
    
    // Log slide navigation
    logSlideNavigation(currentSlide, currentSlide - 1, 'backward');
    
    // Add slide time to total time studied
    const slideTime = Math.floor((Date.now() - slideStartTime) / 1000);
    setTotalTimeStudied(prev => prev + slideTime);
    
    setCurrentSlide(Math.max(0, currentSlide - 1));
  }, [lesson, currentSlide, slideStartTime]);

  /**
   * Handle answer submission from exercises
   */
  const handleAnswer = useCallback((slideId, answer) => {
    setAnswers(prev => ({ ...prev, [slideId]: answer }));
    
    // Log exercise completion
    logExerciseCompletion(slideId, answer.isCorrect || false, answer.score || 0);
    
    // Add slide time to total time studied
    const slideTime = Math.floor((Date.now() - slideStartTime) / 1000);
    setTotalTimeStudied(prev => prev + slideTime);
  }, [slideStartTime]);

  /**
   * Complete lesson function - FIXED to use correct lesson ID
   */
  const completeLesson = useCallback(async () => {
    console.log('🔐 Auth state check:', {
      currentUser: currentUser?.uid,
      userProfile: !!userProfile,
      lesson: !!lesson
    });
    
    if (!lesson || !userProfile) {
      console.log('❌ Missing lesson or userProfile, cannot complete lesson');
      return;
    }
    
    if (!currentUser) {
      console.log('❌ No current user, cannot complete lesson');
      toast.error('שגיאה בהרשאת המשתמש');
      return;
    }
    
    // Double-check authentication state before proceeding
    console.log('🔐 Double-checking auth state before lesson completion...');
    const authCheck = {
      currentUser: currentUser?.uid,
      userProfile: userProfile?.uid,
      lessonId: lesson?.id,
      lessonOriginalId: lesson?.originalId
    };
    console.log('🔐 Auth check details:', authCheck);
    
    if (!authCheck.currentUser || !authCheck.userProfile) {
      console.log('❌ Authentication check failed, aborting lesson completion');
      return;
    }
    
    // Get the actual lesson number from the lesson object
    // lessonId from URL might be Firestore ID, but we need the lesson number for progress
    const lessonNumber = lesson.originalId || parseInt(lessonId);
    if (!lessonNumber || isNaN(lessonNumber)) {
      console.error('❌ Invalid lesson ID:', lessonId, 'lesson.originalId:', lesson.originalId);
      return;
    }

    // Check if lesson is already completed to prevent duplicate completion
    const lessonFirestoreId = `lesson-${lessonNumber}`;
    if (userProfile?.progress?.[lessonFirestoreId]?.completed) {
      console.log('✅ Lesson already completed, showing completion state without re-saving');
      toast.success('השיעור כבר הושלם! 🎉');
      
      // Still navigate to roadmap but don't save again
      setTimeout(async () => {
        try {
          const nextLesson = await getNextLesson(lessonNumber);
          const navigateUrl = nextLesson ? `/student/roadmap?unlocked=${nextLesson.originalId}` : '/student/roadmap';
          navigate(navigateUrl, { replace: true });
        } catch (error) {
          console.error('❌ Error navigating after completion:', error);
          navigate('/student/roadmap', { replace: true });
        }
      }, 2000);
      return;
    }

    console.log('🎯 Starting lesson completion for lesson:', lessonNumber);
    console.log('📋 Lesson object details:', {
      lessonId: lessonId,
      lessonOriginalId: lesson.originalId,
      lessonNumber: lessonNumber,
      lessonTitle: lesson.title,
      lessonType: typeof lessonNumber
    });

    // Add final slide time
    const slideTime = Math.floor((Date.now() - slideStartTime) / 1000);
    const finalTimeStudied = totalTimeStudied + slideTime;
    
    // Get all slide IDs to ensure complete tracking
    const allSlideIds = lesson.slides ? lesson.slides.map(slide => slide.id) : [];
    
    // Ensure all slides are marked as engaged
    allSlideIds.forEach(slideId => {
      trackSlideEngagement(lessonNumber, slideId);
    });
    
    // Log lesson completion
    logLessonCompletion(lessonNumber, finalTimeStudied, finalTimeStudied);
    
    // Export session data for analytics
    const sessionData = exportSessionData();
    console.log('📊 FINAL SESSION DATA:', sessionData);
    
    // Log comprehensive completion summary
    console.log('🎉 LESSON COMPLETION SUMMARY:', {
      lessonId: lessonNumber,
      lessonTitle: lesson.title,
      totalSlides: lesson.slides ? lesson.slides.length : 0,
      slidesEngaged: allSlideIds.length,
      timeSpent: finalTimeStudied,
      timeFormatted: formatTimeStudied(finalTimeStudied),
      progressPercentage: 100,
      sessionEvents: sessionData.session?.totalEvents || 0,
      completionRate: sessionData.session?.completionRate || 0,
      averageEngagement: sessionData.session?.averageEngagementLevel || 'unknown',
      userBehavior: sessionData.analytics?.userBehavior,
      performance: sessionData.analytics?.performance,
      recommendations: sessionData.analytics?.recommendations
    });
    
    try {
      console.log('💾 Saving lesson progress...');
      console.log('🔍 Debug: Calling updateUserProgress with:', {
        lessonNumber,
        completed: true,
        score: finalTimeStudied,
        temporary: false,
        lastSlide: currentSlide,
        slideId: null,
        allSlideIds
      });
      
      // Save progress with completion status and all slides engaged
      // When completing a lesson, always reset lastSlide to 0
      const result = await updateUserProgress(lessonNumber, true, finalTimeStudied, false, 0, null, allSlideIds, currentUser);
      
      console.log('✅ Progress saved successfully');
      console.log('🔍 Debug: updateUserProgress result:', result);
      
      // Find next lesson before showing animation
      const nextLesson = await getNextLesson(lesson.id);
      console.log('📚 Next lesson found:', nextLesson);
      
      // Show celebration animation
      setShowConfetti(true);
      toast.success('כל הכבוד! השיעור הושלם בהצלחה! 🎉');
      
      // Wait for animation to complete before navigating
      setTimeout(() => {
        try {
          console.log('🧭 Starting navigation to roadmap...');
          
          // Navigate to student roadmap with unlock animation param
          const navigateUrl = nextLesson ? `/student/roadmap?unlocked=${nextLesson.originalId}` : '/student/roadmap';
          console.log('🧭 Navigating to:', navigateUrl);
          
          // Force navigation with replace to ensure it works
          navigate(navigateUrl, { replace: true });
          
          console.log('✅ Navigation completed');
        } catch (error) {
          console.error('❌ Error navigating after completion:', error);
          // Fallback navigation
          navigate('/student/roadmap', { replace: true });
        }
      }, 3500); // Increased to 3.5 seconds to ensure state updates
      
    } catch (error) {
      console.error('❌ Error completing lesson:', error);
      toast.error('שגיאה בשמירת ההתקדמות');
      
      // Still try to navigate even if save failed
      setTimeout(async () => {
        const nextLesson = await getNextLesson(lessonNumber);
        const navigateUrl = nextLesson ? `/student/roadmap?unlocked=${nextLesson.originalId}` : '/student/roadmap';
        navigate(navigateUrl, { replace: true });
      }, 1000);
    }
  }, [lesson, userProfile, slideStartTime, totalTimeStudied, currentSlide, trackSlideEngagement, updateUserProgress, navigate, lessonId]);

  /**
   * Format time display for timer
   */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Format time studied for display
   */
  const formatTimeStudied = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours} שעות ${minutes} דקות`;
    }
    return `${minutes} דקות`;
  };

  /**
   * Render slide based on type
   */
  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'presentation':
        return <PresentationSlide slide={slide} />;
      case 'poll':
        return <PollSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
      case 'video':
        return <VideoSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
      case 'interactive':
        return <InteractiveSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
      case 'break':
        return <BreakSlide slide={slide} />;
      case 'reflection':
        return <ReflectionSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
      case 'quiz':
        return <QuizSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
      default:
        return <div className="text-white">סוג שקופית לא מוכר: {slide.type}</div>;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-2xl">טוען שיעור...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-2xl">{error}</div>
      </div>
    );
  }

  const currentSlideData = lesson.slides ? lesson.slides[currentSlide] : null;
  const progressPercentage = lesson.slides ? ((currentSlide + 1) / lesson.slides.length) * 100 : 0;

  // Defensive check: if slide is missing, show a message instead of crashing
  if (!currentSlideData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-2xl">שקופית זו אינה זמינה או לא הוגדרה. אנא פנה למנהל המערכת.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Live Session Notification */}
      <LiveSessionNotification />
      
      {/* Confetti for lesson completion */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#00ff00', '#00ffff', '#ff00ff', '#ffff00', '#ff0000']}
        />
      )}

      {/* Enhanced Confetti for completion */}
      {showConfetti && (
        <>
          <Confetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={300}
            colors={['#4ade80', '#fbbf24', '#3b82f6', '#8b5cf6', '#ec4899', '#ef4444']}
          />
          {/* Completion Overlay */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-center text-white shadow-2xl border-4 border-green-400 animate-pulse">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-2">כל הכבוד!</h2>
              <p className="text-xl mb-4">השיעור הושלם בהצלחה!</p>
              <div className="text-lg opacity-90">
                <p>זמן למידה: {formatTimeStudied(totalTimeStudied)}</p>
                <p>עמודים נצפו: {pagesWatched.size}</p>
                <p>התקדמות: {Math.round(progressPercentage)}%</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex h-screen">
        {/* Lesson Content - Main Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-7">
            {renderSlide(currentSlideData)}
          </div>
        </div>

        {/* Statistics Sidebar - Fixed Position */}
        <div className="w-92 bg-gray-800/50 backdrop-blur-sm border-l border-gray-700/50 p-7">
          <div className="space-y-6">
            {/* Time Studied */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Timer className="h-5 w-5 text-blue-400" />
                <span className="text-white font-semibold">זמן למידה</span>
              </div>
              <p className="text-2xl font-bold text-blue-400">{formatTimeStudied(totalTimeStudied)}</p>
            </div>

            {/* Pages Watched */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="h-5 w-5 text-green-400" />
                <span className="text-white font-semibold">דפים צפו</span>
              </div>
              <p className="text-2xl font-bold text-green-400">{pagesWatched.size}</p>
            </div>

            {/* Progress */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-semibold">התקדמות</span>
              </div>
              <p className="text-2xl font-bold text-yellow-400">{Math.round(progressPercentage)}%</p>
            </div>

            {/* Current Slide Time */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="h-5 w-5 text-cyan-400" />
                <span className="text-white font-semibold">זמן בשקופית</span>
              </div>
              <p className="text-2xl font-bold text-cyan-400">{formatTime(slideTimeSpent)}</p>
            </div>

            {/* Navigation Controls - Bigger and Better */}
            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl p-7 border border-blue-500/30">
              <div className="flex items-center gap-4 mb-7">
                <Navigation className="h-8 w-8 text-blue-400" />
                <span className="text-white font-bold text-2xl">ניווט שקופיות</span>
              </div>
              
              {/* Current Slide Display */}
              <div className="text-center mb-7">
                <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-600/50">
                  <div className="text-3xl font-bold text-white">
                    שקופית {currentSlide + 1} מתוך {lesson.slides ? lesson.slides.length : 0}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between space-x-5 space-x-reverse">
                {/* Previous Button */}
                <button
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  className="group relative p-5 rounded-xl bg-gradient-to-r from-gray-700/80 to-gray-600/80 hover:from-gray-600/90 hover:to-gray-500/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-500/30 hover:border-gray-400/50"
                  title="שקופית קודמת"
                >
                  <ChevronLeft className="h-7 w-7 text-white group-hover:text-blue-300 transition-all duration-300" />
                </button>
                
                {/* Next/Finish Button */}
                {currentSlide === (lesson.slides ? lesson.slides.length - 1 : 0) ? (
                  <button
                    onClick={completeLesson}
                    className="group relative px-7 py-5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-white font-bold border-2 border-green-400/50 hover:border-green-300/70"
                    title="סיים שיעור"
                  >
                    <span className="group-hover:scale-105 transition-transform duration-300 text-xl">
                      סיים שיעור
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleNextSlide}
                    className="group relative p-5 rounded-xl bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-500/90 hover:to-purple-500/90 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-blue-500/30 hover:border-blue-400/50"
                    title="שקופית הבאה"
                  >
                    <ChevronRight className="h-7 w-7 text-white group-hover:text-purple-300 transition-all duration-300" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLesson; 