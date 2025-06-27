import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Users, 
  Clock, 
  Monitor, 
  Settings,
  Share2,
  Eye,
  MessageSquare,
  BarChart3,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { isTeacher, validateTeacherAccess, logSecurityEvent } from '../../utils/security';
import { getSession, updateSessionSlide, unlockSlide, endSession, listenToSession } from '../../firebase/session-service';
import { getLessonWithSlides } from '../../firebase/content-service';
import { getLessonById as getLocalLessonById } from '../../data/lessons';
import TeacherLessonPreview from './TeacherLessonPreview';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { getTeacherNotesForLesson } from '../../firebase/teacher-service';

const SessionHosting = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [session, setSession] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showStudentList, setShowStudentList] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [teacherNotes, setTeacherNotes] = useState({});
  const [sessionDuration, setSessionDuration] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Security check - ensure only teachers can access this component
    if (!currentUser) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', { role: 'none' }, { component: 'SessionHosting' });
      return;
    }

    const validation = validateTeacherAccess({ role: 'teacher' }, 'host_sessions');
    if (!validation.success) {
      logSecurityEvent('INSUFFICIENT_PERMISSIONS', { role: 'teacher', uid: currentUser.uid }, { 
        component: 'SessionHosting',
        reason: validation.message 
      });
      toast.error('אין לך הרשאות לאירוח שיעורים');
      navigate('/teacher/dashboard');
      return;
    }

    // Load session data
    loadSessionData();
  }, [currentUser, sessionId, navigate]);

  useEffect(() => {
    if (session) {
      // Listen to session changes in real-time
      const unsubscribe = listenToSession(sessionId, (updatedSession) => {
        if (updatedSession) {
          setSession(updatedSession);
          setCurrentSlide(updatedSession.currentSlide || 0);
        } else {
          toast.error('השיעור הסתיים');
          navigate('/teacher/dashboard');
        }
      });

      return () => unsubscribe();
    }
  }, [sessionId, navigate]);

  // Security check - if not a teacher, show access denied
  if (!isTeacher({ role: 'teacher' })) {
    logSecurityEvent('STUDENT_ACCESS_ATTEMPT', { role: 'student', uid: currentUser?.uid }, { component: 'SessionHosting' });
    return (
      <div className="text-center py-8">
        <p className="text-red-400">אין לך הרשאות לאירוח שיעורים</p>
      </div>
    );
  }

  const loadSessionData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Loading session data for session ID:', sessionId);
      
      // Get session data
      const sessionData = await getSession(sessionId);
      console.log('✅ Session data loaded:', sessionData);
      
      // Get lesson data from Firebase first
      let lessonData = null;
      try {
        lessonData = await getLessonWithSlides(sessionData.lessonId);
        if (lessonData && lessonData.slides && lessonData.slides.length > 0) {
          lessonData = {
            ...lessonData,
            content: { slides: lessonData.slides }
          };
        } else {
          throw new Error('No slides found in Firebase');
        }
      } catch (e) {
        // Fallback to local data
        lessonData = getLocalLessonById(sessionData.lessonId);
      }
      if (!lessonData) {
        throw new Error(`Lesson ${sessionData.lessonId} not found`);
      }
      console.log('✅ Lesson data loaded:', lessonData);
      
      // Load teacher notes for this lesson
      const notesData = await getTeacherNotesForLesson(currentUser.uid, sessionData.lessonId);
      const notesMap = {};
      notesData.forEach(note => {
        notesMap[note.slideIndex] = note.content;
      });
      
      setSession(sessionData);
      setLesson(lessonData);
      setTeacherNotes(notesMap);
      setCurrentSlide(sessionData.currentSlide || 0);
      setLoading(false);
      
      console.log('✅ Session data loaded successfully');
    } catch (error) {
      console.error('❌ Error loading session:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Calculate session duration
  useEffect(() => {
    if (session?.startTime) {
      const interval = setInterval(() => {
        const startTime = session.startTime?.toDate?.() || new Date(session.startTime);
        const duration = Math.floor((Date.now() - startTime.getTime()) / 1000);
        setSessionDuration(duration);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [session?.startTime]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? 'השיעור הושהה' : 'השיעור התחדש');
  };

  const handleNextSlide = async () => {
    if (currentSlide < lesson.content.slides.length - 1) {
      const newSlideIndex = currentSlide + 1;
      try {
        await updateSessionSlide(sessionId, newSlideIndex);
        setCurrentSlide(newSlideIndex);
        toast.success(`עבר לשקופית ${newSlideIndex + 1}`);
      } catch (error) {
        console.error('Error updating slide:', error);
        toast.error('אירעה שגיאה בעדכון השקופית');
      }
    }
  };

  const handlePreviousSlide = async () => {
    if (currentSlide > 0) {
      const newSlideIndex = currentSlide - 1;
      try {
        await updateSessionSlide(sessionId, newSlideIndex);
        setCurrentSlide(newSlideIndex);
        toast.success(`חזר לשקופית ${newSlideIndex + 1}`);
      } catch (error) {
        console.error('Error updating slide:', error);
        toast.error('אירעה שגיאה בעדכון השקופית');
      }
    }
  };

  const handleSlideSelect = async (slideIndex) => {
    try {
      await updateSessionSlide(sessionId, slideIndex);
      setCurrentSlide(slideIndex);
      toast.success(`עבר לשקופית ${slideIndex + 1}`);
    } catch (error) {
      console.error('Error updating slide:', error);
      toast.error('אירעה שגיאה בעדכון השקופית');
    }
  };

  const handleUnlockNextSlide = async () => {
    const nextSlideIndex = currentSlide + 1;
    if (nextSlideIndex < lesson.content.slides.length) {
      try {
        await unlockSlide(sessionId, nextSlideIndex);
        toast.success(`שקופית ${nextSlideIndex + 1} נפתחה לתלמידים`);
      } catch (error) {
        console.error('Error unlocking slide:', error);
        toast.error('אירעה שגיאה בפתיחת השקופית');
      }
    }
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    toast.success(isMuted ? 'הקול הופעל' : 'הקול הושתק');
  };

  const handleEndSession = async () => {
    if (window.confirm('האם אתה בטוח שברצונך לסיים את השיעור?')) {
      try {
        await endSession(sessionId);
        toast.success('השיעור הסתיים');
        navigate('/teacher/dashboard');
      } catch (error) {
        console.error('Error ending session:', error);
        toast.error('אירעה שגיאה בסיום השיעור');
      }
    }
  };

  const formatSessionDuration = (startTime) => {
    if (!startTime) return '0 דקות';
    const duration = Date.now() - startTime.toDate().getTime();
    const minutes = Math.floor(duration / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}ש ${remainingMinutes}ד`;
    }
    return `${minutes} דקות`;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-2xl font-bold text-white mb-4">השיעור לא נמצא</h1>
          <p className="text-gray-400 mb-6">
            {error.includes('Session not found') 
              ? 'השיעור לא קיים או נמחק. ייתכן שהקישור לא תקין.'
              : error
            }
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => navigate('/teacher/session/create')}
              variant="primary"
              size="lg"
              className="w-full"
            >
              <Play className="w-5 h-5 mr-2" />
              צור שיעור חדש
            </Button>
            <Button
              onClick={() => navigate('/teacher/dashboard')}
              variant="secondary"
              size="lg"
              className="w-full"
            >
              חזור ללוח הבקרה
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-4">טוען נתונים...</h1>
          <p className="text-gray-400 mb-6">
            אנא המתן בזמן טעינת נתוני השיעור
          </p>
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  const currentSlideNote = teacherNotes[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/teacher/dashboard')}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>חזור</span>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">{session.lessonName}</h1>
              <p className="text-gray-300 text-sm">
                {session.className} • {session.connectedStudents?.length || 0}/{session.studentIds?.length || 0} תלמידים מחוברים
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowStudentList(!showStudentList)}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>תלמידים ({session.connectedStudents?.length || 0})</span>
            </Button>
            
            <Button
              onClick={() => navigate(`/teacher/monitor/${sessionId}`)}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Monitor className="w-4 h-4" />
              <span>מעקב</span>
            </Button>
            
            <Button
              onClick={handleEndSession}
              variant="danger"
              size="sm"
            >
              סיים שיעור
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Slide Display */}
          <div className="flex-1 bg-gray-900 p-8 flex items-center justify-center relative">
            <div className="w-full max-w-4xl">
              <TeacherLessonPreview
                lesson={lesson}
                currentSlideIndex={currentSlide}
                onSlideChange={handleSlideSelect}
                isPreviewMode={false}
              />
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={handleFullscreen}
              className="absolute top-4 right-4 p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Control Bar */}
          <div className="bg-gray-800/50 border-t border-gray-700 p-4">
            <div className="flex items-center justify-between">
              {/* Playback Controls */}
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handlePreviousSlide}
                  disabled={currentSlide === 0}
                  variant="secondary"
                  size="sm"
                >
                  <SkipBack className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={handlePlayPause}
                  variant="primary"
                  size="lg"
                  className="flex items-center space-x-2"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isPlaying ? 'השהה' : 'נגן'}</span>
                </Button>
                
                <Button
                  onClick={handleNextSlide}
                  disabled={currentSlide === lesson.content.slides.length - 1}
                  variant="secondary"
                  size="sm"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>

                <Button
                  onClick={handleUnlockNextSlide}
                  disabled={currentSlide === lesson.content.slides.length - 1}
                  variant="secondary"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>פתח שקופית הבאה</span>
                </Button>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleMute}
                  variant="secondary"
                  size="sm"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>

              {/* Progress */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">
                  {currentSlide + 1} / {lesson.content.slides.length}
                </span>
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSlide + 1) / lesson.content.slides.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`w-80 bg-gray-800/50 border-l border-gray-700 transition-all duration-300 ${
          showStudentList ? 'block' : 'hidden'
        }`}>
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-4">תלמידים מחוברים</h3>
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

      {/* Teacher Notes Display */}
      {currentSlideNote && (
        <div className="fixed bottom-4 right-4 max-w-md bg-yellow-900/90 backdrop-blur-sm rounded-lg p-4 border border-yellow-700">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-medium text-sm">Teacher Notes</span>
          </div>
          <p className="text-yellow-200 text-sm">{currentSlideNote}</p>
        </div>
      )}
    </div>
  );
};

export default SessionHosting; 