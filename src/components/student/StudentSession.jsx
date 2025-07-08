import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  BarChart3,
  Target,
  Eye,
  MessageSquare,
  Hand,
  BookOpen,
  Timer,
  Award,
  TrendingUp,
  X,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { getSession, joinSession, leaveSession, listenToSession, updateStudentProgress } from '../../firebase/session-service';
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
  
  // Core session state
  const [session, setSession] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  // Enhanced UI state
  const [showStatistics, setShowStatistics] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionMode, setSessionMode] = useState('individual');
  const [teacherControlsSession, setTeacherControlsSession] = useState(false);
  
  // Progress tracking
  const [answers, setAnswers] = useState({});
  const [slidesEngaged, setSlidesEngaged] = useState(new Set());
  const [sessionStartTime] = useState(Date.now());
  const [slideStartTime, setSlideStartTime] = useState(Date.now());
  
  // Statistics tracking
  const [sessionStatistics, setSessionStatistics] = useState({
    slidesViewed: 0,
    interactions: 0,
    timeSpent: 0,
    engagementRate: 0,
    averageTimePerSlide: 0
  });
  
  // Communication features
  const [liveChat, setLiveChat] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const [handRaised, setHandRaised] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');
  
  // Error handling
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Refs for cleanup
  const sessionListenerRef = useRef(null);
  const statisticsTimerRef = useRef(null);
  const slideTimerRef = useRef(null);
  const lastSlideRef = useRef(0);

  // Initialize session
  useEffect(() => {
    if (sessionId && currentUser) {
      loadSession();
    }
    
    return () => {
      cleanupSession();
    };
  }, [sessionId, currentUser]);

  // Session listener with error handling
  useEffect(() => {
    if (session && sessionId) {
      try {
        sessionListenerRef.current = listenToSession(sessionId, (updatedSession) => {
          if (updatedSession) {
            handleSessionUpdate(updatedSession);
          } else {
            handleSessionEnd();
          }
        });
      } catch (error) {
        console.error('❌ Error setting up session listener:', error);
        setError('שגיאה בחיבור לשיעור');
      }
    }
    
    return () => {
      if (sessionListenerRef.current) {
        sessionListenerRef.current();
      }
    };
  }, [session, sessionId]);

  // Statistics timer
  useEffect(() => {
    if (isConnected && lesson) {
      statisticsTimerRef.current = setInterval(() => {
        updateSessionStatistics();
      }, 5000); // Update every 5 seconds
    }
    
    return () => {
      if (statisticsTimerRef.current) {
        clearInterval(statisticsTimerRef.current);
      }
    };
  }, [isConnected, lesson, slidesEngaged]);

  // Slide timer
  useEffect(() => {
    if (isConnected && currentSlide !== lastSlideRef.current) {
      // Track time spent on previous slide
      const timeSpent = Math.floor((Date.now() - slideStartTime) / 1000);
      if (timeSpent > 0 && lesson?.slides?.[lastSlideRef.current]) {
        trackSlideTime(lastSlideRef.current, timeSpent);
      }
      
      // Update slide start time
      setSlideStartTime(Date.now());
      lastSlideRef.current = currentSlide;
      
      // Track slide engagement
      if (lesson?.slides?.[currentSlide]?.id) {
        trackSlideEngagement(lesson.originalId, lesson.slides[currentSlide].id);
        setSlidesEngaged(prev => new Set([...prev, lesson.slides[currentSlide].id]));
      }
    }
  }, [currentSlide, lesson, isConnected]);

  const loadSession = async () => {
    try {
      setLoading(true);
      setError(null);
      
      logger.info('Loading session', { sessionId, userId: currentUser?.uid });
      
      const sessionData = await getSession(sessionId);
      if (!sessionData) {
        throw new Error('Session not found');
      }
      
      setSession(sessionData);
      
      // Load lesson data with error handling
      const lessonData = await getLessonWithSlides(sessionData.lessonId);
      if (!lessonData || !lessonData.slides) {
        throw new Error('Lesson data not found');
      }
      
      // Sort slides by order
      lessonData.slides.sort((a, b) => {
        const orderA = a.order ?? a.sortOrder ?? 0;
        const orderB = b.order ?? b.sortOrder ?? 0;
        return orderA - orderB;
      });
      
      setLesson(lessonData);
      setCurrentSlide(sessionData.currentSlide || 0);
      setLoading(false);
      
      logger.info('Session loaded successfully', {
        sessionId,
        lessonId: sessionData.lessonId,
        totalSlides: lessonData.slides.length,
        currentSlide: sessionData.currentSlide || 0
      });
      
    } catch (error) {
      console.error('❌ Error loading session:', error);
      setError(error.message);
      setLoading(false);
      
      // Retry logic
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          loadSession();
        }, 2000);
      } else {
        toast.error('אירעה שגיאה בטעינת השיעור');
        navigate('/student/dashboard');
      }
    }
  };

  const handleSessionUpdate = (updatedSession) => {
    try {
      setSession(updatedSession);
      
      // Determine session mode
      const isLive = updatedSession.status === 'active' && updatedSession.teacherId;
      setIsLiveSession(isLive);
      setSessionMode(isLive ? 'live' : 'individual');
      setTeacherControlsSession(isLive);
      
      // Handle slide changes
      const newSlideIndex = updatedSession.currentSlide || 0;
      if (isLive && newSlideIndex !== currentSlide) {
        setCurrentSlide(newSlideIndex);
        logger.info('Slide changed by teacher', { 
          from: currentSlide, 
          to: newSlideIndex,
          sessionId 
        });
      }
      
      // Update student progress in session
      if (isConnected && currentUser) {
        updateStudentProgress(sessionId, currentUser.uid, currentSlide, {
          slidesEngaged: Array.from(slidesEngaged),
          timeSpent: sessionStatistics.timeSpent,
          lastActivity: new Date()
        }).catch(error => {
          console.error('❌ Error updating student progress:', error);
        });
      }
      
    } catch (error) {
      console.error('❌ Error handling session update:', error);
    }
  };

  const handleSessionEnd = () => {
    logger.info('Session ended', { sessionId });
    toast.success('השיעור הסתיים');
    navigate('/student/dashboard');
  };

  const handleJoinSession = async () => {
    if (!session || !currentUser) {
      logger.warn('Missing session or currentUser for join', { session, currentUser });
      return;
    }

    try {
      setJoining(true);
      setError(null);
      
      logger.info('Joining session', {
        sessionId,
        studentId: currentUser.uid,
        studentName: currentUser.displayName || currentUser.email
      });
      
      await joinSession(sessionId, currentUser.uid, currentUser.displayName || currentUser.email);
      setIsConnected(true);
      setSlideStartTime(Date.now());
      
      toast.success('הצטרפת לשיעור בהצלחה!');
      
      logger.info('Successfully joined session', { sessionId, studentId: currentUser.uid });
      
    } catch (error) {
      console.error('❌ Error joining session:', error);
      setError('אירעה שגיאה בהצטרפות לשיעור');
      toast.error('אירעה שגיאה בהצטרפות לשיעור');
    } finally {
      setJoining(false);
    }
  };

  const handleLeaveSession = async () => {
    if (!session || !currentUser) return;

    try {
      logger.info('Leaving session', { sessionId, studentId: currentUser.uid });
      
      await leaveSession(sessionId, currentUser.uid);
      setIsConnected(false);
      
      // Save final progress
      if (lesson) {
        await saveFinalProgress();
      }
      
      toast.success('עזבת את השיעור');
      navigate('/student/dashboard');
      
    } catch (error) {
      console.error('❌ Error leaving session:', error);
      toast.error('אירעה שגיאה ביציאה מהשיעור');
    }
  };

  const saveFinalProgress = async () => {
    try {
      if (!lesson || !currentUser) return;
      
      const finalTimeSpent = Math.floor((Date.now() - sessionStartTime) / 1000);
      const allSlideIds = lesson.slides ? lesson.slides.map(slide => slide.id) : [];
      
      // Mark all slides as engaged
      allSlideIds.forEach(slideId => {
        trackSlideEngagement(lesson.originalId, slideId);
      });
      
      // Update user progress
      await updateUserProgress(
        lesson.originalId,
        true, // completed
        finalTimeSpent,
        false, // not temporary
        0, // reset last slide
        null,
        allSlideIds,
        currentUser
      );
      
      logger.info('Final progress saved', {
        lessonId: lesson.originalId,
        timeSpent: finalTimeSpent,
        slidesEngaged: allSlideIds.length
      });
      
    } catch (error) {
      console.error('❌ Error saving final progress:', error);
    }
  };

  const handleAnswer = (slideId, answer) => {
    try {
      setAnswers(prev => ({ ...prev, [slideId]: answer }));
      
      // Track interaction
      setSessionStatistics(prev => ({
        ...prev,
        interactions: prev.interactions + 1
      }));
      
      // Track slide engagement
      if (lesson && slideId && !slidesEngaged.has(slideId)) {
        trackSlideEngagement(lesson.originalId, slideId);
        setSlidesEngaged(prev => new Set([...prev, slideId]));
      }
      
      logger.info('Answer submitted', {
        slideId,
        answer,
        sessionId,
        lessonId: lesson?.originalId
      });
      
    } catch (error) {
      console.error('❌ Error handling answer:', error);
    }
  };

  const updateSessionStatistics = () => {
    try {
      const timeSpent = Math.floor((Date.now() - sessionStartTime) / 1000);
      const engagementRate = lesson?.slides ? (slidesEngaged.size / lesson.slides.length) * 100 : 0;
      const averageTimePerSlide = slidesEngaged.size > 0 ? timeSpent / slidesEngaged.size : 0;
      
      setSessionStatistics({
        slidesViewed: slidesEngaged.size,
        interactions: Object.keys(answers).length,
        timeSpent,
        engagementRate: Math.round(engagementRate),
        averageTimePerSlide: Math.round(averageTimePerSlide)
      });
      
    } catch (error) {
      console.error('❌ Error updating statistics:', error);
    }
  };

  const trackSlideTime = (slideIndex, timeSpent) => {
    try {
      if (lesson?.slides?.[slideIndex]?.id) {
        const slideId = lesson.slides[slideIndex].id;
        logger.info('Slide time tracked', {
          slideId,
          slideIndex,
          timeSpent,
          lessonId: lesson.originalId
        });
      }
    } catch (error) {
      console.error('❌ Error tracking slide time:', error);
    }
  };

  const handleNextSlide = () => {
    if (teacherControlsSession) {
      toast.info('המורה שולט בניווט');
      return;
    }
    
    if (lesson && currentSlide < lesson.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePreviousSlide = () => {
    if (teacherControlsSession) {
      toast.info('המורה שולט בניווט');
      return;
    }
    
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSlideSelect = (slideIndex) => {
    if (teacherControlsSession) {
      toast.info('המורה שולט בניווט');
      return;
    }
    
    if (slideIndex >= 0 && slideIndex < (lesson?.slides?.length || 0)) {
      setCurrentSlide(slideIndex);
    }
  };

  const toggleStatistics = () => {
    setShowStatistics(!showStatistics);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const sendChatMessage = async () => {
    if (!chatMessage.trim() || !currentUser) return;
    
    try {
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
      const sessionRef = doc(db, 'sessions', sessionId);
      await updateDoc(sessionRef, {
        chatMessages: arrayUnion(message),
        lastActivity: serverTimestamp()
      });
      
    } catch (error) {
      console.error('❌ Error sending chat message:', error);
      toast.error('אירעה שגיאה בשליחת ההודעה');
    }
  };

  const toggleHandRaise = async () => {
    try {
      setHandRaised(!handRaised);
      
      const sessionRef = doc(db, 'sessions', sessionId);
      if (!handRaised) {
        await updateDoc(sessionRef, {
          raisedHands: arrayUnion(currentUser.uid),
          lastActivity: serverTimestamp()
        });
        toast.success('הרמת יד');
      } else {
        await updateDoc(sessionRef, {
          raisedHands: arrayRemove(currentUser.uid),
          lastActivity: serverTimestamp()
        });
        toast.success('הורדת יד');
      }
      
    } catch (error) {
      console.error('❌ Error toggling hand raise:', error);
      toast.error('אירעה שגיאה בהרמת יד');
    }
  };

  const saveSessionNotes = async () => {
    try {
      const sessionRef = doc(db, 'sessions', sessionId);
      await updateDoc(sessionRef, {
        [`studentNotes.${currentUser.uid}`]: sessionNotes,
        lastActivity: serverTimestamp()
      });
      
      toast.success('הערות נשמרו');
      
    } catch (error) {
      console.error('❌ Error saving notes:', error);
      toast.error('אירעה שגיאה בשמירת הערות');
    }
  };

  const cleanupSession = () => {
    if (sessionListenerRef.current) {
      sessionListenerRef.current();
    }
    if (statisticsTimerRef.current) {
      clearInterval(statisticsTimerRef.current);
    }
    if (slideTimerRef.current) {
      clearInterval(slideTimerRef.current);
    }
  };

  const getSessionStatus = () => {
    if (!session) return 'loading';
    if (session.status === 'ended') return 'ended';
    if (session.isLocked) return 'locked';
    if (session.status === 'paused') return 'paused';
    return 'active';
  };

  const formatSessionDuration = (startTime) => {
    if (!startTime) return '00:00';
    const duration = Math.floor((Date.now() - startTime.toDate()) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderSlide = (slide) => {
    if (!slide) return null;
    
    try {
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
      console.error('❌ Error rendering slide:', error);
      return (
        <div className="text-center text-red-400 p-8">
          <AlertCircle className="w-16 h-16 mx-auto mb-4" />
          <p>שגיאה בטעינת השקופית</p>
        </div>
      );
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <Card className="max-w-md w-full">
          <div className="text-center p-6">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
            <h2 className="text-xl font-bold text-white mb-2">שגיאה</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <div className="space-y-2">
              <Button
                onClick={() => window.location.reload()}
                variant="primary"
                className="w-full"
              >
                נסה שוב
              </Button>
              <Button
                onClick={() => navigate('/student/dashboard')}
                variant="secondary"
                className="w-full"
              >
                חזור לדשבורד
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const sessionStatus = getSessionStatus();
  const currentSlideData = lesson?.slides?.[currentSlide];

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gradient-to-br from-gray-900 via-gray-800 to-black`}>
      {/* Live Session Notification */}
      <LiveSessionNotification />
      
      {/* Enhanced Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button
              onClick={handleLeaveSession}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2 space-x-reverse"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>עזוב שיעור</span>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">{session?.lessonName}</h1>
              <p className="text-gray-300 text-sm">
                {session?.className} • {session?.connectedStudents?.length || 0} תלמידים מחוברים
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Statistics Toggle */}
            <Button
              onClick={toggleStatistics}
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 space-x-reverse text-gray-300 hover:text-white"
            >
              <BarChart3 className="w-4 h-4" />
              <span>סטטיסטיקות</span>
            </Button>
            
            {/* Fullscreen Toggle */}
            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 space-x-reverse text-gray-300 hover:text-white"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>{isFullscreen ? 'צמצם' : 'מסך מלא'}</span>
            </Button>
            
            {/* Session Duration */}
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock className="w-4 h-4" />
              <span>{formatSessionDuration(session?.startTime)}</span>
            </div>
            
            {/* Session Status */}
            <div className="flex items-center space-x-2">
              {sessionStatus === 'active' && (
                <div className="flex items-center space-x-1 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">פעיל</span>
                </div>
              )}
              {sessionStatus === 'paused' && (
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Pause className="w-4 h-4" />
                  <span className="text-sm">מושהה</span>
                </div>
              )}
              {sessionStatus === 'ended' && (
                <div className="flex items-center space-x-1 text-red-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">הסתיים</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Session Mode Indicator */}
      {sessionMode === 'live' && (
        <div className="bg-blue-600/20 border-b border-blue-500/30 p-3">
          <div className="flex items-center justify-center space-x-2 text-blue-300">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="font-medium">שיעור חי - המורה שולט בניווט</span>
            {teacherControlsSession && (
              <span className="text-xs bg-blue-500/30 px-2 py-1 rounded">
                ניווט מושבת
              </span>
            )}
          </div>
        </div>
      )}

      {sessionMode === 'individual' && (
        <div className="bg-green-600/20 border-b border-green-500/30 p-3">
          <div className="flex items-center justify-center space-x-2 text-green-300">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="font-medium">למידה עצמאית - אתה שולט בניווט</span>
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

      {sessionStatus === 'ended' && (
        <div className="bg-red-600/20 border-b border-red-500/30 p-3">
          <div className="flex items-center justify-center space-x-2 text-red-300">
            <CheckCircle className="w-4 h-4" />
            <span>השיעור הסתיים</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 relative flex">
        {/* Statistics Sidebar */}
        {showStatistics && (
          <div className="w-80 bg-gray-800/50 border-l border-gray-700 p-4 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">סטטיסטיקות שיעור</h3>
                <Button
                  onClick={toggleStatistics}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Progress Overview */}
              <Card className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">שקופיות נצפו</span>
                    <span className="text-white font-bold">{sessionStatistics.slidesViewed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">סך השקופיות</span>
                    <span className="text-white font-bold">{lesson?.slides?.length || 0}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${lesson?.slides ? (sessionStatistics.slidesViewed / lesson.slides.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </Card>
              
              {/* Engagement Metrics */}
              <Card className="p-4">
                <h4 className="text-white font-semibold mb-3">מדדי מעורבות</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">אחוז מעורבות</span>
                    </div>
                    <span className="text-white font-bold">{sessionStatistics.engagementRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <MessageSquare className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">אינטראקציות</span>
                    </div>
                    <span className="text-white font-bold">{sessionStatistics.interactions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Timer className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300">זמן ממוצע לשקופית</span>
                    </div>
                    <span className="text-white font-bold">{sessionStatistics.averageTimePerSlide} שניות</span>
                  </div>
                </div>
              </Card>
              
              {/* Time Tracking */}
              <Card className="p-4">
                <h4 className="text-white font-semibold mb-3">מעקב זמן</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">זמן כולל</span>
                    <span className="text-white font-bold">
                      {Math.floor(sessionStatistics.timeSpent / 60)}:{(sessionStatistics.timeSpent % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">זמן בשקופית נוכחית</span>
                    <span className="text-white font-bold">
                      {Math.floor((Date.now() - slideStartTime) / 1000)} שניות
                    </span>
                  </div>
                </div>
              </Card>
              
              {/* Quick Actions */}
              <Card className="p-4">
                <h4 className="text-white font-semibold mb-3">פעולות מהירות</h4>
                <div className="space-y-2">
                  <Button
                    onClick={toggleHandRaise}
                    variant={handRaised ? "primary" : "secondary"}
                    size="sm"
                    className="w-full flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <Hand className="w-4 h-4" />
                    <span>{handRaised ? 'הורד יד' : 'הרמת יד'}</span>
                  </Button>
                  <Button
                    onClick={() => setShowStatistics(false)}
                    variant="ghost"
                    size="sm"
                    className="w-full"
                  >
                    הסתר סטטיסטיקות
                  </Button>
                </div>
              </Card>
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
            <div className="relative h-full">
              {/* Enhanced Progress Indicator */}
              <div className="bg-gray-800/50 border-b border-gray-700 p-3">
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span>שקופית {currentSlide + 1} מתוך {lesson?.slides?.length || 0}</span>
                    <span>דפים נצפו: {slidesEngaged.size}</span>
                    <span>אינטראקציות: {sessionStatistics.interactions}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span>זמן: {Math.floor(sessionStatistics.timeSpent / 60)}:{(sessionStatistics.timeSpent % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${lesson?.slides ? ((currentSlide + 1) / lesson.slides.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Slide Content - Enhanced Layout */}
              <div className="p-6 h-full overflow-y-auto">
                {currentSlideData ? (
                  <div className={`${isFullscreen ? 'max-w-none' : 'max-w-6xl'} mx-auto`}>
                    {renderSlide(currentSlideData)}
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <AlertCircle className="w-16 h-16 mx-auto mb-4" />
                    <p>אין תוכן להצגה</p>
                  </div>
                )}
              </div>

              {/* Enhanced Navigation Controls */}
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
                      {currentSlide + 1} / {lesson?.slides?.length || 0}
                    </span>
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNextSlide}
                    disabled={currentSlide === (lesson?.slides?.length || 0) - 1 || teacherControlsSession}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      currentSlide === (lesson?.slides?.length || 0) - 1 || teacherControlsSession
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
                  <div className="flex items-center space-x-2 space-x-reverse text-yellow-200 text-sm">
                    <Lock className="w-4 h-4" />
                    <span>המורה שולט בניווט - המתן להנחיות</span>
                  </div>
                </div>
              )}

              {/* Quick Access Buttons */}
              <div className="fixed top-20 right-4 space-y-2">
                <Button
                  onClick={toggleStatistics}
                  variant="secondary"
                  size="sm"
                  className="flex items-center space-x-2 space-x-reverse bg-gray-800/80 backdrop-blur-sm"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>סטטיסטיקות</span>
                </Button>
                <Button
                  onClick={toggleHandRaise}
                  variant={handRaised ? "primary" : "secondary"}
                  size="sm"
                  className="flex items-center space-x-2 space-x-reverse bg-gray-800/80 backdrop-blur-sm"
                >
                  <Hand className="w-4 h-4" />
                  <span>{handRaised ? 'הורד יד' : 'הרמת יד'}</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentSession; 