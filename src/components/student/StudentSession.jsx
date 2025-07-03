import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  Play,
  Pause
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
          
          setCurrentSlide(newSlideIndex);
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
  const currentSlideData = lesson.content?.slides?.[currentSlide];

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
                <span>שקופית {currentSlide + 1} מתוך {lesson.content?.slides?.length || 0}</span>
                <span>דפים נצפו: {slidesEngaged.size}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
                <div 
                  className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSlide + 1) / (lesson.content?.slides?.length || 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Slide Content */}
            {currentSlideData && (
              <div className="min-h-[calc(100vh-200px)]">
                {renderSlide(currentSlideData)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSession; 