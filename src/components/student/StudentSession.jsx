import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  SkipForward
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { getSession, joinSession, leaveSession, listenToSession, updateSessionSlide } from '../../firebase/session-service';
import { getLessonWithSlides } from '../../firebase/content-service';
import { PresentationSlide, PollSlide, VideoSlide, InteractiveSlide, BreakSlide, ReflectionSlide, QuizSlide } from '../slides';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import LiveSessionNotification from './LiveSessionNotification';
import { logger } from '../../utils/logger';
import { doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp } from 'firebase/firestore';
import { db } from "../../firebase/firebase-config";

const StudentSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { currentUser, trackSlideEngagement, updateUserProgress } = useAuth();
  
  const [session, setSession] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [answers, setAnswers] = useState({});
  const [slidesEngaged, setSlidesEngaged] = useState(new Set());
  const [liveChat, setLiveChat] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const [handRaised, setHandRaised] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');
  const [engagementMetrics, setEngagementMetrics] = useState({
    slidesViewed: 0,
    interactions: 0,
    timeSpent: 0
  });
  const [isLiveSession, setIsLiveSession] = useState(false);
  const [sessionMode, setSessionMode] = useState('individual'); // 'individual' or 'live'
  const [teacherControlsSession, setTeacherControlsSession] = useState(false);
  const [modeTransition, setModeTransition] = useState(false); // For smooth transitions
  const [completingLesson, setCompletingLesson] = useState(false);
  const [sessionSyncProtected, setSessionSyncProtected] = useState(true);

  // Session sync protection - ensure video errors don't break synchronization
  useEffect(() => {
    setSessionSyncProtected(true);
    
    // Cleanup function to ensure we don't block session sync
    return () => {
      setSessionSyncProtected(false);
    };
  }, []);

  useEffect(() => {
    if (sessionId && currentUser) {
      loadSession();
    }
  }, [sessionId, currentUser]);

  // Auto-join session when student enters (for live sessions)
  useEffect(() => {
    if (session && currentUser && !isConnected && session.status === 'active') {
      console.log('🔄 Auto-joining student to live session:', {
        sessionId,
        studentId: currentUser.uid,
        sessionStatus: session.status
      });
      
      // Auto-join after a short delay to ensure session is loaded
      const autoJoinTimer = setTimeout(() => {
        handleJoinSession();
      }, 1000);
      
      return () => clearTimeout(autoJoinTimer);
    }
  }, [session, currentUser, isConnected]);

  useEffect(() => {
    if (session) {
      // Listen to session changes in real-time with error handling
      let unsubscribe = null;
      let retryCount = 0;
      const maxRetries = 3;

      const setupListener = () => {
        try {
          console.log('🔍 Setting up session listener for student session:', sessionId);
          
          unsubscribe = listenToSession(sessionId, (updatedSession) => {
            try {
              if (updatedSession) {
                console.log('📡 Session updated:', updatedSession.lessonName);
                setSession(updatedSession);
                const newSlideIndex = updatedSession.currentSlide || 0;
              
              // Check if session has ended
              if (updatedSession.status === 'ended') {
                console.log('📡 Session ended by teacher, switching to individual mode');
                setIsLiveSession(false);
                setSessionMode('individual');
                setTeacherControlsSession(false);
                
                // Show notification that session ended but student can continue
                toast.success('השיעור החי הסתיים, אך אתה יכול להמשיך ללמוד באופן עצמאי!');
                
                // Preserve student's current slide position when transitioning to individual mode
                console.log('📊 Preserving student slide position:', currentSlide);
                
                // Track engagement for the current slide if not already tracked
                if (lesson && lesson.slides?.[currentSlide]) {
                  const slideData = lesson.slides[currentSlide];
                  if (slideData.id && !slidesEngaged.has(slideData.id)) {
                    trackSlideEngagement(lesson.originalId, slideData.id);
                    setSlidesEngaged(prev => new Set([...prev, slideData.id]));
                  }
                }
                
                return; // Don't navigate away, let student continue
              }
              
              // Determine session mode and control state for active sessions
              const isLive = updatedSession.status === 'active' && updatedSession.teacherId;
              const wasLive = isLiveSession; // Track previous state
              
              // Handle mode transitions smoothly
              if (isLive !== wasLive) {
                setModeTransition(true);
                setTimeout(() => setModeTransition(false), 1000); // Clear transition after 1 second
              }
              
              setIsLiveSession(isLive);
              setSessionMode(isLive ? 'live' : 'individual');
              setTeacherControlsSession(isLive);
              
              // Handle slide navigation based on mode changes
              if (isLive && !wasLive) {
                // Transitioning to live mode - follow teacher
                console.log('📡 Transitioning to live mode, following teacher to slide:', newSlideIndex);
                setCurrentSlide(newSlideIndex);
              } else if (isLive && wasLive) {
                // Already in live mode - follow teacher's slide changes
                if (newSlideIndex !== currentSlide) {
                  console.log('📡 Teacher moved to slide:', newSlideIndex);
                  setCurrentSlide(newSlideIndex);
                }
              } else if (!isLive && wasLive) {
                // Transitioning from live to individual mode - preserve position
                console.log('📡 Transitioning to individual mode, preserving slide position:', currentSlide);
                // Don't change slide position to avoid jumping
              }
              
              // Track slide engagement when slide changes
              const slideToTrack = isLive ? newSlideIndex : currentSlide;
              if (lesson && lesson.slides?.[slideToTrack]) {
                const slideData = lesson.slides[slideToTrack];
                if (slideData.id && !slidesEngaged.has(slideData.id)) {
                  trackSlideEngagement(lesson.originalId, slideData.id);
                  setSlidesEngaged(prev => new Set([...prev, slideData.id]));
                  
                  console.log('📊 Slide Engagement Tracked:', {
                    sessionId,
                    lessonId: lesson.originalId,
                    slideId: slideData.id,
                    slideTitle: slideData.title,
                    mode: isLive ? 'live' : 'individual',
                    totalSlidesEngaged: slidesEngaged.size + 1
                  });
                }
              }
              
              // Reset retry count on successful update
              retryCount = 0;
            } else {
              console.log('📡 Session not found');
              toast.error('השיעור לא נמצא');
              navigate('/student/dashboard');
            }
          } catch (error) {
            console.error('❌ Error in session listener callback:', error);
            // Don't let video or other errors break session sync
            // Continue listening for updates
          }
          });

        } catch (error) {
          console.error('❌ Error setting up session listener:', error);
          retryCount++;
          
          if (retryCount < maxRetries) {
            console.log(`🔄 Retrying session listener (${retryCount}/${maxRetries})...`);
            setTimeout(setupListener, 2000 * retryCount); // Exponential backoff
          } else {
            console.error('❌ Max retries reached for session listener');
            toast.error('אירעה שגיאה בחיבור לשיעור');
          }
        }
      };

      setupListener();

      return () => {
        if (unsubscribe) {
          console.log('🔌 Cleaning up session listener');
          unsubscribe();
        }
      };
    }
  }, [sessionId, navigate, lesson, trackSlideEngagement, slidesEngaged]);

  const loadSession = async () => {
    try {
      setLoading(true);
      const sessionData = await getSession(sessionId);
      setSession(sessionData);
      
      // Load lesson data from Firebase
      const lessonData = await getLessonWithSlides(sessionData.lessonId);
      
      // Ensure slides are sorted by order
      if (lessonData.slides) {
        lessonData.slides.sort((a, b) => {
          const orderA = a.order ?? a.sortOrder ?? 0;
          const orderB = b.order ?? b.sortOrder ?? 0;
          return orderA - orderB;
        });
      }
      
      setLesson(lessonData);
      setCurrentSlide(sessionData.currentSlide || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error loading session:', error);
      toast.error('אירעה שגיאה בטעינת השיעור');
      navigate('/student/dashboard');
    }
  };

  const handleJoinSession = async () => {
    if (!session || !currentUser) {
      console.warn('[handleJoinSession] Missing session or currentUser', { session, currentUser });
      return;
    }

    console.log('[handleJoinSession] Called', {
      sessionId,
      studentId: currentUser.uid,
      studentName: currentUser.displayName || currentUser.email,
      session,
      currentUser
    });

    try {
      setJoining(true);
      const result = await joinSession(sessionId, currentUser.uid, currentUser.displayName || currentUser.email);
      console.log('[handleJoinSession] joinSession success', { result });
      setIsConnected(true);
      toast.success('הצטרפת לשיעור בהצלחה!');
    } catch (error) {
      console.error('[handleJoinSession] Error joining session:', error);
      toast.error('אירעה שגיאה בהצטרפות לשיעור');
      setJoining(false);
    }
  };

  const handleLeaveSession = async () => {
    if (!session || !currentUser) return;

    try {
      await leaveSession(sessionId, currentUser.uid, currentUser.displayName || currentUser.email);
      setIsConnected(false);
      toast.success('עזבת את השיעור');
      navigate('/student/dashboard');
    } catch (error) {
      console.error('Error leaving session:', error);
      toast.error('אירעה שגיאה ביציאה מהשיעור');
    }
  };

  const handleAnswer = (slideId, answer) => {
    setAnswers(prev => ({ ...prev, [slideId]: answer }));
    
    // Track slide engagement when student answers
    if (lesson && slideId && !slidesEngaged.has(slideId)) {
      trackSlideEngagement(lesson.originalId, slideId);
      setSlidesEngaged(prev => new Set([...prev, slideId]));
      
      console.log('📝 Live Session Answer Submitted:', {
        sessionId,
        lessonId: lesson.originalId,
        slideId,
        answer,
        totalSlidesEngaged: slidesEngaged.size + 1
      });
    }
  };

  const handleCompleteLesson = async () => {
    if (!lesson || !currentUser) {
      console.error('❌ Missing lesson or currentUser:', { lesson: !!lesson, currentUser: !!currentUser });
      return;
    }

    if (completingLesson) {
      console.log('⚠️ Lesson completion already in progress');
      return;
    }

    try {
      setCompletingLesson(true);
      
      console.log('🎯 Starting lesson completion for live session:', {
        lessonId: lesson.originalId || lesson.id,
        lessonTitle: lesson.title,
        slidesEngaged: slidesEngaged.size,
        updateUserProgress: typeof updateUserProgress
      });

      // Verify updateUserProgress is available
      if (typeof updateUserProgress !== 'function') {
        console.error('❌ updateUserProgress is not a function:', updateUserProgress);
        toast.error('שגיאה בהרשאת המשתמש - אנא רענן את הדף');
        return;
      }

      // Get all slide IDs for completion tracking
      const allSlideIds = lesson.slides?.map(slide => slide.id).filter(Boolean) || [];
      
      // Calculate time spent (approximate based on slides engaged)
      const timeSpent = slidesEngaged.size * 2; // 2 minutes per slide as estimate
      
      // Save lesson completion using the same system as InteractiveLesson
      const lessonNumber = lesson.originalId || lesson.id;
      
      console.log('💾 Saving lesson progress with:', {
        lessonNumber,
        completed: true,
        score: timeSpent,
        allSlideIds: allSlideIds.length,
        currentUser: currentUser?.uid
      });
      
      // Call updateUserProgress with proper error handling
      let result;
      try {
        result = await updateUserProgress(lessonNumber, true, timeSpent, false, 0, null, allSlideIds, currentUser);
        console.log('✅ Lesson completion result:', result);
      } catch (progressError) {
        console.error('❌ updateUserProgress threw an error:', progressError);
        throw progressError;
      }
      
      if (result && result.success) {
        toast.success('כל הכבוד! השיעור הושלם בהצלחה! 🎉');
        
        // Navigate to roadmap after a short delay
        setTimeout(() => {
          navigate('/student/roadmap');
        }, 2000);
      } else {
        console.error('❌ Lesson completion failed:', result);
        toast.error('שגיאה בשמירת ההתקדמות');
      }
      
    } catch (error) {
      console.error('❌ Error completing lesson:', error);
      console.error('❌ Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      toast.error('אירעה שגיאה בהשלמת השיעור');
    } finally {
      setCompletingLesson(false);
    }
  };

  const getSessionStatus = () => {
    if (!session) return 'loading';
    if (session.status === 'ended') return 'ended';
    if (session.isLocked) return 'locked';
    return 'active';
  };

  const formatSessionDuration = (startTime) => {
    if (!startTime) return '0 דקות';
    const duration = Date.now() - startTime.toDate().getTime();
    const minutes = Math.floor(duration / (1000 * 60));
    return `${minutes} דקות`;
  };

  const renderSlide = (slide) => {
    try {
      // Track slide engagement when slide is rendered
      if (lesson && slide.id && !slidesEngaged.has(slide.id)) {
        trackSlideEngagement(lesson.originalId, slide.id);
        setSlidesEngaged(prev => new Set([...prev, slide.id]));
      }
      
      // Use the exact same slide components as the student interface
      switch (slide.type) {
        case 'presentation':
          return <PresentationSlide slide={slide} />;
        case 'poll':
          return <PollSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
        case 'quiz':
          return <QuizSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
        case 'video':
          return <VideoSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
        case 'interactive':
          return <InteractiveSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
        case 'break':
          return <BreakSlide slide={slide} />;
        case 'reflection':
          return <ReflectionSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
        default:
          return <PresentationSlide slide={slide} />;
      }
    } catch (error) {
      console.error('❌ Error rendering slide:', error, slide);
      // Return a fallback slide to prevent session break
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
          <div className="max-w-5xl w-full h-full flex flex-col">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                {slide.title || 'שקופית'}
              </h2>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl flex-1 flex flex-col justify-center">
              <div className="text-center">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
                <h3 className="text-2xl font-bold text-red-400 mb-4">
                  שגיאה בטעינת השקופית
                </h3>
                <p className="text-gray-300 mb-6">
                  אירעה שגיאה בטעינת השקופית. אתה יכול להמשיך לשיעור הבא.
                </p>
                <button
                  onClick={() => handleNextSlide()}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>המשך לשיעור הבא</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const sendChatMessage = async () => {
    if (!chatMessage.trim()) return;
    
    const message = {
      id: Date.now(),
      sender: currentUser.displayName || currentUser.email,
      senderId: currentUser.uid,
      message: chatMessage.trim(),
      timestamp: Date.now(),
      type: 'student'
    };
    
    setLiveChat(prev => [...prev, message]);
    setChatMessage('');
    
    // Save to Firebase
    try {
      const sessionRef = doc(db, 'sessions', sessionId);
      await updateDoc(sessionRef, {
        chatMessages: arrayUnion(message),
        lastActivity: serverTimestamp()
      });
    } catch (error) {
      console.error('Error sending chat message:', error);
    }
  };

  const toggleHandRaise = async () => {
    const newHandRaised = !handRaised;
    setHandRaised(newHandRaised);
    
    try {
      const sessionRef = doc(db, 'sessions', sessionId);
      if (newHandRaised) {
        await updateDoc(sessionRef, {
          raisedHands: arrayUnion(currentUser.uid),
          lastActivity: serverTimestamp()
        });
        toast.success('יד מורמת! המורה יראה אותך');
      } else {
        await updateDoc(sessionRef, {
          raisedHands: arrayRemove(currentUser.uid),
          lastActivity: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error updating hand raise:', error);
    }
  };

  const saveSessionNotes = async () => {
    try {
      const sessionRef = doc(db, 'sessions', sessionId);
      await updateDoc(sessionRef, {
        studentNotes: {
          [currentUser.uid]: {
            notes: sessionNotes,
            timestamp: serverTimestamp()
          }
        },
        lastActivity: serverTimestamp()
      });
      toast.success('הערות נשמרו בהצלחה');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('שגיאה בשמירת הערות');
    }
  };

  const trackEngagement = useCallback((type, data = {}) => {
    setEngagementMetrics(prev => ({
      ...prev,
      interactions: prev.interactions + 1
    }));
    
    // Send to Firebase for teacher analytics
    try {
      const sessionRef = doc(db, 'sessions', sessionId);
      updateDoc(sessionRef, {
        studentEngagement: {
          [currentUser.uid]: {
            [type]: {
              timestamp: serverTimestamp(),
              data
            }
          }
        }
      });
    } catch (error) {
      console.error('Error tracking engagement:', error);
    }
  }, [sessionId, currentUser.uid]);

  // Add navigation control functions
  const handleNextSlide = () => {
    if (teacherControlsSession) {
      toast.error('המורה שולט בניווט במהלך השיעור החי');
      return;
    }
    
    if (lesson && currentSlide < lesson.slides.length - 1) {
      const newSlideIndex = currentSlide + 1;
      setCurrentSlide(newSlideIndex);
      
      // Update session slide if in live mode
      if (isLiveSession) {
        updateSessionSlide(sessionId, newSlideIndex);
      }
    }
  };

  const handlePreviousSlide = () => {
    if (teacherControlsSession) {
      toast.error('המורה שולט בניווט במהלך השיעור החי');
      return;
    }
    
    if (currentSlide > 0) {
      const newSlideIndex = currentSlide - 1;
      setCurrentSlide(newSlideIndex);
      
      // Update session slide if in live mode
      if (isLiveSession) {
        updateSessionSlide(sessionId, newSlideIndex);
      }
    }
  };

  const handleSlideSelect = (slideIndex) => {
    if (teacherControlsSession) {
      toast.error('המורה שולט בניווט במהלך השיעור החי');
      return;
    }
    
    if (slideIndex >= 0 && slideIndex < (lesson?.slides?.length || 0)) {
      setCurrentSlide(slideIndex);
      
      // Update session slide if in live mode
      if (isLiveSession) {
        updateSessionSlide(sessionId, slideIndex);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-2xl">השיעור לא נמצא</div>
      </div>
    );
  }

  const sessionStatus = getSessionStatus();
  const currentSlideData = lesson?.slides?.[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button
              onClick={() => navigate('/student/dashboard')}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ChevronRight className="w-4 h-4" />
              <span>חזור לדשבורד</span>
            </Button>
            
            <div className="text-white">
              <h1 className="text-lg font-bold">{session.lessonName}</h1>
              <p className="text-sm text-gray-300">
                {session.teacherName} • {formatSessionDuration(session.startTime)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            {isConnected && (
              <Button
                onClick={handleLeaveSession}
                variant="secondary"
                size="sm"
                className="text-red-400 hover:text-red-300"
              >
                עזוב שיעור
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Live Session Indicator */}
      {sessionMode === 'live' && (
        <div className="bg-blue-600/20 border-b border-blue-500/30 p-3">
          <div className="flex items-center justify-center space-x-2 text-blue-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="font-medium">שיעור חי - עוקב אחר המורה</span>
            <span className="text-xs bg-blue-500/30 px-2 py-1 rounded text-blue-200">
              {session.connectedStudents?.length || 0} תלמידים
            </span>
          </div>
        </div>
      )}

      {sessionMode === 'individual' && (
        <div className="bg-green-600/20 border-b border-green-500/30 p-3">
          <div className="flex items-center justify-center space-x-2 text-green-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="font-medium">למידה עצמאית - אתה שולט בניווט</span>
            {session?.status === 'ended' && (
              <span className="text-xs bg-yellow-500/30 px-2 py-1 rounded text-yellow-200">
                השיעור החי הסתיים
              </span>
            )}
          </div>
        </div>
      )}

      {/* Mode Transition Indicator */}
      {modeTransition && (
        <div className="bg-purple-600/20 border-b border-purple-500/30 p-3 animate-pulse">
          <div className="flex items-center justify-center space-x-2 text-purple-300">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
            <span className="font-medium">מעבר למצב {sessionMode === 'live' ? 'חי' : 'עצמאי'}...</span>
          </div>
        </div>
      )}

      {/* Session Status Banner */}
      {sessionStatus === 'locked' && (
        <div className="bg-yellow-600/20 border-b border-yellow-500/30 p-3">
          <div className="flex items-center justify-center space-x-2 text-yellow-300">
            <Lock className="w-4 h-4" />
            <span>השיעור נעול - המתן למורה לפתוח</span>
          </div>
        </div>
      )}

      {sessionStatus === 'ended' && sessionMode === 'individual' && (
        <div className="bg-green-600/20 border-b border-green-500/30 p-3">
          <div className="flex items-center justify-center space-x-2 text-green-300">
            <CheckCircle className="w-4 h-4" />
            <span>השיעור החי הסתיים - המשך ללמוד באופן עצמאי</span>
          </div>
        </div>
      )}

      {sessionStatus === 'ended' && sessionMode === 'live' && (
        <div className="bg-red-600/20 border-b border-red-500/30 p-3">
          <div className="flex items-center justify-center space-x-2 text-red-300">
            <CheckCircle className="w-4 h-4" />
            <span>השיעור הסתיים</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 relative">
        {!isConnected ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="max-w-md w-full">
              <div className="text-center p-6">
                <Users className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                <h2 className="text-xl font-bold text-white mb-2">הצטרף לשיעור</h2>
                <p className="text-gray-400 mb-6">
                  הצטרף לשיעור החי כדי לעקוב אחר המורה ולשתתף בפעילויות
                </p>
                <Button
                  onClick={handleJoinSession}
                  disabled={joining}
                  variant="primary"
                  className="w-full"
                >
                  {joining ? 'מצטרף...' : 'הצטרף לשיעור'}
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="relative">
            {/* Progress Indicator */}
            <div className="bg-gray-800/50 border-b border-gray-700 p-2">
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>שקופית {currentSlide + 1} מתוך {lesson.slides?.length || 0}</span>
                <span>דפים נצפו: {slidesEngaged.size}</span>
              </div>
            </div>

            {/* Slide Content */}
            <div className="p-6">
              {currentSlideData ? (
                <div className="max-w-4xl mx-auto">
                  {renderSlide(currentSlideData)}
                  
                  {/* Navigation Controls for Individual Mode */}
                  {sessionMode === 'individual' && (
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
                      <Button
                        onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                        disabled={currentSlide === 0}
                        variant="secondary"
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                        <span>שקופית קודמת</span>
                      </Button>
                      
                      <div className="text-center">
                        <span className="text-gray-300 text-sm">
                          שקופית {currentSlide + 1} מתוך {lesson.slides?.length || 0}
                        </span>
                      </div>
                      
                      {currentSlide >= (lesson.slides?.length || 1) - 1 ? (
                        <Button
                          onClick={handleCompleteLesson}
                          disabled={completingLesson}
                          variant="primary"
                          size="sm"
                          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                        >
                          {completingLesson ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>משלים...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>השלם שיעור</span>
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setCurrentSlide(Math.min((lesson.slides?.length || 1) - 1, currentSlide + 1))}
                          variant="secondary"
                          size="sm"
                          className="flex items-center space-x-2"
                        >
                          <span>שקופית הבאה</span>
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <p>אין תוכן להצגה</p>
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm rounded-full p-2 border border-gray-600/50">
              <div className="flex items-center space-x-4 space-x-reverse">
                {/* Previous Button */}
                <button
                  onClick={handlePreviousSlide}
                  disabled={currentSlide === 0 || teacherControlsSession}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    currentSlide === 0 || teacherControlsSession
                      ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600/80 hover:bg-blue-500 text-white hover:scale-110'
                  }`}
                  title={teacherControlsSession ? 'המורה שולט בניווט' : 'שקופית קודמת'}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Current Slide Indicator */}
                <div className="px-4 py-2 bg-gray-700/50 rounded-full">
                  <span className="text-white text-sm font-medium">
                    {currentSlide + 1} / {lesson.slides?.length || 0}
                  </span>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextSlide}
                  disabled={currentSlide === (lesson.slides?.length || 0) - 1 || teacherControlsSession}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    currentSlide === (lesson.slides?.length || 0) - 1 || teacherControlsSession
                      ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600/80 hover:bg-blue-500 text-white hover:scale-110'
                  }`}
                  title={teacherControlsSession ? 'המורה שולט בניווט' : 'שקופית הבאה'}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Teacher Control Warning */}
            {teacherControlsSession && (
              <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-yellow-600/90 backdrop-blur-sm rounded-lg p-3 border border-yellow-500/50">
                <div className="flex items-center space-x-2 text-yellow-200 text-sm">
                  <Lock className="w-4 h-4" />
                  <span>המורה שולט בניווט - המתן להנחיות</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSession; 