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
  ChevronRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { getSession, joinSession, leaveSession, listenToSession } from '../../firebase/session-service';
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
  const { currentUser, trackSlideEngagement } = useAuth();
  
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

  useEffect(() => {
    if (sessionId && currentUser) {
      loadSession();
    }
  }, [sessionId, currentUser]);

  useEffect(() => {
    if (session) {
      // Listen to session changes in real-time
      const unsubscribe = listenToSession(sessionId, (updatedSession) => {
        if (updatedSession) {
          setSession(updatedSession);
          const newSlideIndex = updatedSession.currentSlide || 0;
          
          // Determine session mode and control state
          const isLive = updatedSession.status === 'active' && updatedSession.teacherId;
          setIsLiveSession(isLive);
          setSessionMode(isLive ? 'live' : 'individual');
          setTeacherControlsSession(isLive);
          
          // In live mode, force slide to match teacher's current slide
          if (isLive) {
            setCurrentSlide(newSlideIndex);
          }
          
          // Track slide engagement when slide changes
          if (lesson && lesson.slides?.[newSlideIndex]) {
            const slideData = lesson.slides[newSlideIndex];
            if (slideData.id && !slidesEngaged.has(slideData.id)) {
              trackSlideEngagement(lesson.originalId, slideData.id);
              setSlidesEngaged(prev => new Set([...prev, slideData.id]));
              
              console.log('📊 Live Session Slide Engagement:', {
                sessionId,
                lessonId: lesson.originalId,
                slideId: slideData.id,
                slideTitle: slideData.title,
                totalSlidesEngaged: slidesEngaged.size + 1
              });
            }
          }
          
          // Only update current slide if not in live mode
          if (!isLive) {
            setCurrentSlide(newSlideIndex);
          }
        } else {
          toast.error('השיעור הסתיים');
          navigate('/student/dashboard');
        }
      });

      return () => unsubscribe();
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
    if (!session || !currentUser) return;

    try {
      setJoining(true);
      await joinSession(sessionId, currentUser.uid, currentUser.displayName || currentUser.email);
      setIsConnected(true);
      toast.success('הצטרפת לשיעור בהצלחה!');
    } catch (error) {
      console.error('Error joining session:', error);
      toast.error('אירעה שגיאה בהצטרפות לשיעור');
      setJoining(false);
    }
  };

  const handleLeaveSession = async () => {
    if (!session || !currentUser) return;

    try {
      await leaveSession(sessionId, currentUser.uid);
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
    
    setCurrentSlide(slideIndex);
    
    // Update session slide if in live mode
    if (isLiveSession) {
      updateSessionSlide(sessionId, slideIndex);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session || !lesson) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-xl font-bold text-white mb-2">השיעור לא נמצא</h2>
          <p className="text-gray-400 mb-4">ייתכן שהשיעור הסתיים או שאין לך הרשאה לגשת אליו</p>
          <Button
            onClick={() => navigate('/student/dashboard')}
            variant="primary"
          >
            חזור לדשבורד
          </Button>
        </div>
      </div>
    );
  }

  const sessionStatus = getSessionStatus();
  const currentSlideData = lesson.slides?.[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Live Session Notification */}
      <LiveSessionNotification />
      
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleLeaveSession}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>עזוב שיעור</span>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">{session.lessonName}</h1>
              <p className="text-gray-300 text-sm">
                {session.className} • {session.connectedStudents?.length || 0} תלמידים מחוברים
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock className="w-4 h-4" />
              <span>{formatSessionDuration(session.startTime)}</span>
            </div>
            
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
      {isLiveSession && (
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