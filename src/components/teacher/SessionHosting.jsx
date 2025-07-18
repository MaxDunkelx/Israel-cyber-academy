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
  AlertTriangle,
  Circle,
  Wifi,
  WifiOff
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { isTeacher, validateTeacherAccess, logSecurityEvent } from '../../utils/security';
import { getSession, updateSessionSlide, endSession, listenToSession } from '../../firebase/session-service';
import { getLessonWithSlides } from '../../firebase/content-service';
import { getClassStudents } from '../../firebase/teacher-service';
import { listenToMultipleUsersPresence } from '../../firebase/presence-service';
// Removed local data import - using only Firebase database
import { 
  ContentSlide, 
  AssessmentSlide, 
  VideoSlide, 
  InteractiveSlide, 
  BreakSlide,
  // Legacy imports for backward compatibility
  PresentationSlide, 
  PollSlide, 
  ReflectionSlide, 
  QuizSlide 
} from '../slides';
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
  const [showNotes, setShowNotes] = useState(false);
  const [teacherNotes, setTeacherNotes] = useState({});
  const [error, setError] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [userPresence, setUserPresence] = useState({});

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

  // Listen to user presence for all students
  useEffect(() => {
    if (allStudents.length > 0) {
      const studentIds = allStudents.map(student => student.uid || student.id);
      console.log('📡 Setting up presence tracking for', studentIds.length, 'students');
      
      const unsubscribe = listenToMultipleUsersPresence(studentIds, (presenceData) => {
        console.log('📡 User presence updated:', presenceData);
        setUserPresence(presenceData);
      });
      
      return () => {
        console.log('🔇 Cleaning up presence listeners');
        unsubscribe();
      };
    }
  }, [allStudents]);

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
        console.error('Failed to load lesson from database:', e);
        toast.error('שגיאה בטעינת השיעור מהמסד נתונים');
        navigate('/teacher/dashboard');
        return;
      }
      if (!lessonData) {
        throw new Error(`Lesson ${sessionData.lessonId} not found`);
      }
      console.log('✅ Lesson data loaded:', lessonData);
      
      // Load teacher notes for this lesson
      const notesData = await getTeacherNotesForLesson(currentUser.uid, sessionData.lessonId);
      const notesMap = {};
      notesData.forEach(note => {
        // Use slideId as key for consistency with other components
        notesMap[note.slideId] = note.content;
      });
      
      // Load all students in the class
      let studentsData = [];
      try {
        studentsData = await getClassStudents(sessionData.classId);
        console.log('✅ Students data loaded:', studentsData.length, 'students');
      } catch (error) {
        console.error('Error loading students:', error);
        studentsData = [];
      }
      
      setSession(sessionData);
      setLesson(lessonData);
      setTeacherNotes(notesMap);
      setCurrentSlide(sessionData.currentSlide || 0);
      setAllStudents(studentsData);
      setLoading(false);
      
      console.log('✅ Session data loaded successfully');
    } catch (error) {
      console.error('❌ Error loading session:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? 'השיעור הושהה' : 'השיעור התחדש');
  };

  const handleNextSlide = async () => {
    if (currentSlide < lesson.slides.length - 1) {
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

  const handleToggleNotes = () => {
    setShowNotes(!showNotes);
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

  // Helper function to get student status
  const getStudentStatus = (student) => {
    const studentId = student.uid || student.id;
    
    // Ensure connectedStudents is an array
    const connectedStudents = session?.connectedStudents || [];
    
    // Check if student is connected to this session
    const isConnected = connectedStudents.some(connectedStudent => {
      if (typeof connectedStudent === 'string') {
        return connectedStudent === studentId;
      }
      return connectedStudent.id === studentId;
    });
    
    if (isConnected) {
      return 'connected';
    }
    
    // Check presence status
    const presence = userPresence[studentId];
    if (presence) {
      if (presence.status === 'in_live_session') {
        return 'in_other_session';
      }
      return presence.status; // 'online' or 'offline'
    }
    
    // Check last activity for more accurate status
    const lastActivity = student.lastActivityAt || student.lastActivityDate;
    if (lastActivity) {
      let lastActivityDate;
      if (typeof lastActivity === 'object' && lastActivity.toDate) {
        lastActivityDate = lastActivity.toDate();
      } else if (typeof lastActivity === 'string') {
        lastActivityDate = new Date(lastActivity);
      } else if (lastActivity instanceof Date) {
        lastActivityDate = lastActivity;
      } else {
        return 'offline';
      }
      
      const minutesSinceActivity = (new Date() - lastActivityDate) / (1000 * 60);
      if (minutesSinceActivity <= 5) {
        return 'online';
      } else if (minutesSinceActivity <= 30) {
        return 'recently_active';
      }
    }
    
    return 'offline';
  };

  // Helper function to get status icon and color
  const getStatusIndicator = (status) => {
    switch (status) {
      case 'connected':
        return { icon: <Circle className="w-3 h-3" />, color: 'text-green-500', bgColor: 'bg-green-500' };
      case 'online':
        return { icon: <Wifi className="w-3 h-3" />, color: 'text-green-400', bgColor: 'bg-green-400' };
      case 'in_other_session':
        return { icon: <Wifi className="w-3 h-3" />, color: 'text-yellow-400', bgColor: 'bg-yellow-400' };
      case 'recently_active':
        return { icon: <Wifi className="w-3 h-3" />, color: 'text-gray-400', bgColor: 'bg-gray-400' };
      case 'offline':
      default:
        return { icon: <WifiOff className="w-3 h-3" />, color: 'text-gray-500', bgColor: 'bg-gray-500' };
    }
  };

  /**
   * Render slide based on type using proper slide components - supports both new unified and legacy types
   */
  const renderSlide = (slide) => {
    switch (slide.type) {
      // New unified slide types
      case 'content':
        return <ContentSlide slide={slide} />;
      case 'assessment':
        return <AssessmentSlide slide={slide} onAnswer={() => {}} />;
      case 'video':
        return <VideoSlide slide={slide} />;
      case 'interactive':
        return <InteractiveSlide slide={slide} onAnswer={() => {}} />;
      case 'break':
        return <BreakSlide slide={slide} />;
      
      // Legacy slide types (for backward compatibility)
      case 'presentation':
        return <PresentationSlide slide={slide} />;
      case 'poll':
        return <PollSlide slide={slide} />;
      case 'reflection':
        return <ReflectionSlide slide={slide} />;
      case 'quiz':
        return <QuizSlide slide={slide} />;
      
      default:
        return <div className="text-white">סוג שקופית לא מוכר: {slide.type}</div>;
    }
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

  // Get current slide note using slideId
  const currentSlideData = lesson?.slides?.[currentSlide];
  const currentSlideNote = currentSlideData ? teacherNotes[currentSlideData.id] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
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
              {/* Debug info */}
              <p className="text-xs text-gray-500 mt-1">
                Session ID: {sessionId} • Status: {session.status} • Last Activity: {session.lastActivity?.toDate?.()?.toLocaleTimeString() || 'N/A'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
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
                              onClick={() => navigate(`/teacher/dashboard`)}
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

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Slide Display */}
          <div className="flex-1 bg-gray-900 p-8 relative overflow-auto">
            {lesson && lesson.slides && lesson.slides[currentSlide] ? (
              <div className="w-full max-w-4xl mx-auto">
                {renderSlide(lesson.slides[currentSlide])}
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <p>אין תוכן להצגה</p>
              </div>
            )}

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
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
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
                  disabled={currentSlide === lesson.slides.length - 1}
                  variant="secondary"
                  size="sm"
                >
                  <SkipForward className="w-4 h-4" />
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
                
                <Button
                  onClick={handleToggleNotes}
                  variant={showNotes ? "primary" : "secondary"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>הערות</span>
                </Button>
              </div>

              {/* Progress */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">
                  {currentSlide + 1} / {lesson.slides.length}
                </span>
                <div className="w-24 lg:w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSlide + 1) / lesson.slides.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`w-full lg:w-80 bg-gray-800/50 border-t lg:border-l border-gray-700 transition-all duration-300 ${
          showStudentList ? 'block' : 'hidden'
        }`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">תלמידי הכיתה</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>מחובר</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  <span>לא מחובר</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {allStudents && allStudents.length > 0 ? (
                allStudents.map((student) => {
                  const status = getStudentStatus(student);
                  const statusIndicator = getStatusIndicator(status);
                  const studentName = student.displayName || student.name || student.email || 'תלמיד ללא שם';
                  
                  return (
                    <div
                      key={student.uid || student.id}
                      className={`p-3 rounded-lg border transition-colors ${
                        status === 'connected' 
                          ? 'border-green-500 bg-green-900/20' 
                          : 'border-gray-600 bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{studentName}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className={`flex items-center space-x-1 ${statusIndicator.color}`}>
                              {statusIndicator.icon}
                              <span className="text-xs">
                                {status === 'connected' && 'מחובר לשיעור'}
                                {status === 'online' && 'מחובר'}
                                {status === 'in_other_session' && 'בשיעור אחר'}
                                {status === 'recently_active' && 'פעיל לאחרונה'}
                                {status === 'offline' && 'לא מחובר'}
                              </span>
                            </div>
                            {status === 'connected' && (
                              <span className="text-xs text-green-400">
                                שקופית {session?.currentSlide + 1 || 1}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${statusIndicator.bgColor} ml-2 flex-shrink-0`}></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400">אין תלמידים בכיתה</p>
                </div>
              )}
            </div>
            
            {/* Summary */}
            {allStudents && allStudents.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>סה"כ תלמידים:</span>
                  <span>{allStudents.length}</span>
                </div>
                <div className="flex justify-between text-sm text-green-400">
                  <span>מחוברים לשיעור:</span>
                  <span>{allStudents.filter(s => getStudentStatus(s) === 'connected').length}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>מחוברים למערכת:</span>
                  <span>{allStudents.filter(s => ['connected', 'online', 'in_other_session'].includes(getStudentStatus(s))).length}</span>
                </div>
                {/* Debug info */}
                <div className="mt-2 pt-2 border-t border-gray-700">
                  <div className="text-xs text-gray-500">
                    <div>Connected Students: {JSON.stringify(session?.connectedStudents?.map(s => s.id || s) || [])}</div>
                    <div>Session Status: {session?.status}</div>
                    <div>Presence Data: {Object.keys(userPresence).length} users</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Teacher Notes Display */}
      {showNotes && currentSlideNote && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 max-w-md bg-yellow-900/90 backdrop-blur-sm rounded-lg p-4 border border-yellow-700 z-50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-medium text-sm">הערות מורה</span>
            </div>
            <button
              onClick={handleToggleNotes}
              className="text-yellow-400 hover:text-yellow-200 transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-yellow-200 text-sm">{currentSlideNote}</p>
        </div>
      )}
    </div>
  );
};

export default SessionHosting; 