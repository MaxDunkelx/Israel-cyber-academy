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
  const { currentUser } = useAuth();
  
  const [session, setSession] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [answers, setAnswers] = useState({});

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
          setCurrentSlide(updatedSession.currentSlide || 0);
        } else {
          toast.error('השיעור הסתיים');
          navigate('/student/dashboard');
        }
      });

      return () => unsubscribe();
    }
  }, [sessionId, navigate]);

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
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Clock className="w-4 h-4" />
              <span>{formatSessionDuration(session.startTime)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {sessionStatus === 'locked' ? (
                <Lock className="w-4 h-4 text-yellow-400" />
              ) : (
                <Unlock className="w-4 h-4 text-green-400" />
              )}
              <span className="text-sm text-gray-300">
                {sessionStatus === 'locked' ? 'נעול' : 'פעיל'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Session Status Banner */}
          {!isConnected && sessionStatus === 'active' && (
            <div className="bg-blue-500/20 border-b border-blue-500/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-300">יש להתחבר לשיעור כדי להשתתף</span>
                </div>
                <Button
                  onClick={handleJoinSession}
                  disabled={joining}
                  variant="primary"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  {joining ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span>{joining ? 'מתחבר...' : 'הצטרף לשיעור'}</span>
                </Button>
              </div>
            </div>
          )}

          {sessionStatus === 'ended' && (
            <div className="bg-red-500/20 border-b border-red-500/30 p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-300">השיעור הסתיים</span>
              </div>
            </div>
          )}

          {/* Lesson Content */}
          <div className="flex-1 bg-gray-900 p-8 flex items-center justify-center relative">
            {lesson && currentSlideData && (
              <div className="w-full max-w-4xl">
                {renderSlide(currentSlideData)}
              </div>
            )}
          </div>

          {/* Teacher-Controlled Navigation Status */}
          {isConnected && sessionStatus === 'active' && (
            <div className="bg-gray-800/50 border-t border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-300">
                      המורה שולט בניווט - שקופית {currentSlide + 1} מתוך {lesson?.content?.slides?.length || 0}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentSlide + 1) / (lesson?.content?.slides?.length || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Connected Students */}
        <div className="w-80 bg-gray-800/50 border-l border-gray-700">
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>תלמידים מחוברים ({session.connectedStudents?.length || 0})</span>
            </h3>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {session.connectedStudents && session.connectedStudents.length > 0 ? (
                session.connectedStudents.map((student) => (
                  <div
                    key={student.id}
                    className="p-3 rounded-lg border border-gray-600 bg-gray-700/50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{student.name}</p>
                        <p className="text-sm text-gray-400">
                          שקופית {student.currentSlide + 1}
                        </p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400">אין תלמידים מחוברים</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSession; 