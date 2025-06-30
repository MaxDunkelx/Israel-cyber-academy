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
import { getLessonWithSlides } from '../firebase/content-service';
import { getLessonById as getLocalLessonById, getNextLesson } from '../data/lessons';
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
  SkipBack
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
  
  // Timer reference for cleanup
  const timerRef = useRef(null);
  const statsTimerRef = useRef(null);
  const slideTimerRef = useRef(null);
  
  // Prevent infinite loops with refs
  const isInitialized = useRef(false);
  const lastSavedSlide = useRef(0);
  const isCompletedLesson = useRef(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug: Log current slide position
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log(`🎯 Current slide: ${currentSlide} (Lesson ${lessonId})`);
      if (userProfile && lesson) {
        const savedSlide = getLastLessonSlide(lesson.id);
        console.log(`💾 Saved slide position: ${savedSlide}`);
        console.log(`✅ Lesson completed: ${isCompletedLesson.current}`);
      }
    }
  }, [currentSlide, lessonId, userProfile, lesson, getLastLessonSlide]);

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
          // Transform to match local format if needed
          lessonData = {
            ...lessonData,
            content: { slides: lessonData.slides }
          };
          if (isMounted) setLesson(lessonData);
        } else {
          throw new Error('No slides found in Firebase');
        }
      } catch (e) {
        // Fallback to local data
        const localLesson = getLocalLessonById(parseInt(lessonId));
        if (localLesson) {
          if (isMounted) setLesson(localLesson);
        } else {
          if (isMounted) setError('השיעור לא נמצא');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadLesson();
    return () => { isMounted = false; };
  }, [lessonId]);

  /**
   * Track slide engagement when slide changes - FIXED to prevent conflicts
   */
  useEffect(() => {
    if (!lesson || !userProfile || !isInitialized.current) return;
    
    const currentSlideData = lesson.content.slides[currentSlide];
    if (currentSlideData && currentSlideData.id) {
      // Track this slide as engaged
      trackSlideEngagement(lesson.id, currentSlideData.id);
      
      // Log slide engagement for session monitoring
      const timeSpent = Math.floor((Date.now() - slideStartTime) / 1000);
      logSlideEngagement(currentSlideData.id, currentSlideData.type, timeSpent);
      
      // Add to pages watched set
      setPagesWatched(prev => new Set([...prev, currentSlideData.id]));
      
      // Save slide progress only if it changed and lesson is not completed
      if (currentSlide !== lastSavedSlide.current && !isCompletedLesson.current) {
        setLastLessonSlide(lesson.id, currentSlide);
        lastSavedSlide.current = currentSlide;
      }
      
      // Reset slide timer and set new duration
      setSlideStartTime(Date.now());
      setSlideTimeSpent(0);
      setTimeLeft(currentSlideData.content?.duration || 30);
      
      // Log slide progress
      if (import.meta.env.DEV) {
        console.log(`📖 SLIDE PROGRESS: ${currentSlide + 1}/${lesson.content.slides.length} - ${currentSlideData.title}`);
      }
    }
  }, [currentSlide, lesson, userProfile, trackSlideEngagement, setLastLessonSlide]);

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
    
    // Log statistics update
    if (import.meta.env.DEV) {
      console.log('📊 STATISTICS UPDATED:', {
        totalTimeSpent: userProfile.totalTimeSpent || 0,
        totalPagesEngaged: allPagesEngaged.size,
        minutesLearned: Math.floor((userProfile.totalTimeSpent || 0) / 60)
      });
    }
  }, [userProfile]);

  /**
   * Slide timer - tracks time spent on current slide - FIXED
   */
  useEffect(() => {
    if (!lesson) return;
    
    slideTimerRef.current = setInterval(() => {
      const now = Date.now();
      const timeSpent = Math.floor((now - slideStartTime) / 1000);
      setSlideTimeSpent(timeSpent);
      
      // Update time left if slide has duration
      if (lesson.content.slides[currentSlide]?.content?.duration) {
        const duration = lesson.content.slides[currentSlide].content.duration;
        const remaining = Math.max(0, duration - timeSpent);
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => {
      if (slideTimerRef.current) {
        clearInterval(slideTimerRef.current);
      }
    };
  }, [slideStartTime, currentSlide, lesson]);

  /**
   * Window resize handler for responsive design
   */
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    
    if (currentSlide < lesson.content.slides.length - 1) {
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
   * Handle lesson completion - FIXED to prevent multiple calls
   */
  const handleLessonComplete = useCallback(async () => {
    if (!lesson || !userProfile) {
      console.error('❌ Cannot complete lesson: missing lesson or userProfile');
      return;
    }

    console.log('🎯 Starting lesson completion for lesson:', lesson.id);

    // Add final slide time
    const slideTime = Math.floor((Date.now() - slideStartTime) / 1000);
    const finalTimeStudied = totalTimeStudied + slideTime;
    
    // Get all slide IDs to ensure complete tracking
    const allSlideIds = lesson.content.slides.map(slide => slide.id);
    
    // Ensure all slides are marked as engaged
    allSlideIds.forEach(slideId => {
      trackSlideEngagement(lesson.id, slideId);
    });
    
    // Log lesson completion
    logLessonCompletion(lesson.id, finalTimeStudied, finalTimeStudied);
    
    // Export session data for analytics
    const sessionData = exportSessionData();
    console.log('📊 FINAL SESSION DATA:', sessionData);
    
    // Log comprehensive completion summary
    console.log('🎉 LESSON COMPLETION SUMMARY:', {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      totalSlides: lesson.content.slides.length,
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
      
      // Save progress with completion status and all slides engaged
      await updateUserProgress(lesson.id, true, finalTimeStudied, false, currentSlide, null, allSlideIds);
      
      console.log('✅ Progress saved successfully');
      
      // Find next lesson before showing animation
      const nextLesson = getNextLesson(lesson.id);
      console.log('📚 Next lesson found:', nextLesson);
      
      // Show celebration animation
      setShowConfetti(true);
      toast.success('כל הכבוד! השיעור הושלם בהצלחה! 🎉');
      
      // Wait for animation to complete before navigating
      setTimeout(() => {
        try {
          console.log('🧭 Starting navigation to roadmap...');
          
          // Navigate to roadmap with unlock animation param
          const navigateUrl = nextLesson ? `/roadmap?unlocked=${nextLesson.id}` : '/roadmap';
          console.log('🧭 Navigating to:', navigateUrl);
          
          // Force navigation with replace to ensure it works
          navigate(navigateUrl, { replace: true });
          
          console.log('✅ Navigation completed');
        } catch (error) {
          console.error('❌ Error navigating after completion:', error);
          // Fallback navigation
          navigate('/roadmap', { replace: true });
        }
      }, 3500); // Increased to 3.5 seconds to ensure state updates
      
    } catch (error) {
      console.error('❌ Error completing lesson:', error);
      toast.error('שגיאה בשמירת ההתקדמות');
      
      // Still try to navigate even if save failed
      setTimeout(() => {
        const nextLesson = getNextLesson(lesson.id);
        const navigateUrl = nextLesson ? `/roadmap?unlocked=${nextLesson.id}` : '/roadmap';
        navigate(navigateUrl, { replace: true });
      }, 1000);
    }
  }, [lesson, userProfile, slideStartTime, totalTimeStudied, currentSlide, trackSlideEngagement, updateUserProgress, navigate]);

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

  const currentSlideData = lesson.content.slides[currentSlide];
  const progressPercentage = ((currentSlide + 1) / lesson.content.slides.length) * 100;

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
          <div className="p-6">
            {renderSlide(currentSlideData)}
          </div>
        </div>

        {/* Statistics Sidebar - Fixed Position */}
        <div className="w-80 bg-gray-800/50 backdrop-blur-sm border-l border-gray-700/50 p-6 overflow-y-auto">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">סטטיסטיקות למידה</h3>
            
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

            {/* Navigation Controls */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <ChevronLeft className="h-5 w-5 text-blue-400" />
                <span className="text-white font-semibold">ניווט</span>
              </div>
              
              {/* Progress indicator */}
              <div className="flex flex-col items-center space-y-2 mb-4">
                <div className="text-sm font-bold text-white/80">
                  {currentSlide + 1} / {lesson.content.slides.length}
                </div>
                <div className="w-full h-2 bg-gray-600/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentSlide + 1) / lesson.content.slides.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between space-x-3 space-x-reverse">
                {/* Previous Button */}
                <button
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  className="group relative p-3 rounded-full bg-gradient-to-r from-gray-700/80 to-gray-600/80 hover:from-gray-600/90 hover:to-gray-500/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-500/30 hover:border-gray-400/50"
                  title="שקופית קודמת"
                >
                  <ChevronLeft className="h-5 w-5 text-white group-hover:text-blue-300 transition-all duration-300" />
                </button>
                
                {/* Next/Finish Button */}
                {currentSlide === lesson.content.slides.length - 1 ? (
                  <button
                    onClick={handleLessonComplete}
                    className="group relative px-4 py-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transition-all duration-300 hover:scale-110 hover:shadow-2xl text-white font-bold border-2 border-green-400/50 hover:border-green-300/70 text-sm"
                    title="סיים שיעור"
                  >
                    <span className="group-hover:scale-105 transition-transform duration-300">
                      סיים
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleNextSlide}
                    className="group relative p-3 rounded-full bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-500/90 hover:to-purple-500/90 transition-all duration-300 hover:scale-110 hover:shadow-lg border border-blue-500/30 hover:border-blue-400/50"
                    title="שקופית הבאה"
                  >
                    <ChevronRight className="h-5 w-5 text-white group-hover:text-purple-300 transition-all duration-300" />
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