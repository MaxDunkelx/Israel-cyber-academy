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
  Mic,
  MicOff,
  Video,
  VideoOff,
  Hand,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { isTeacher, validateTeacherAccess, logSecurityEvent } from '../../utils/security';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { getSession, updateSessionSlide, endSession, listenToSession } from '../../firebase/session-service';
import { getTeacherNotesForLesson } from '../../firebase/teacher-service';
import { getLessonWithSlides } from '../../firebase/content-service';
// Removed local data import - using only Firebase database

const LessonController = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { role } = useUserProfile();
  const [session, setSession] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [showStudentList, setShowStudentList] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [lessonLocked, setLessonLocked] = useState(false);
  const [studentAudioEnabled, setStudentAudioEnabled] = useState(true);
  const [studentVideoEnabled, setStudentVideoEnabled] = useState(false);
  const [raisedHands, setRaisedHands] = useState([]);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [teacherNotes, setTeacherNotes] = useState({});
  const [sessionDuration, setSessionDuration] = useState(0);
  const [error, setError] = useState(null);
  const [studentEngagement, setStudentEngagement] = useState({});
  const [liveChat, setLiveChat] = useState([]);
  const [chatEnabled, setChatEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [studentHands, setStudentHands] = useState([]);
  const [studentNavigationLocked, setStudentNavigationLocked] = useState(true);
  const [sessionMode, setSessionMode] = useState('live'); // 'live' or 'individual'
  const [connectedStudents, setConnectedStudents] = useState([]);
  const [sessionStats, setSessionStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    averageEngagement: 0,
    questionsAnswered: 0
  });

  // Cleanup function to prevent memory leaks
  const cleanup = () => {
    setSession(null);
    setLesson(null);
    setStudents([]);
    setConnectedStudents([]);
    setSessionStats({
      totalStudents: 0,
      activeStudents: 0,
      averageEngagement: 0,
      questionsAnswered: 0
    });
  };

  // Security and session loading effect
  useEffect(() => {
    // Security check - ensure only teachers can access this component
    if (!currentUser) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', { role: 'none' }, { component: 'LessonController' });
      return;
    }

    const validation = validateTeacherAccess({ role }, 'control_lessons');
    if (!validation.success) {
      logSecurityEvent('INSUFFICIENT_PERMISSIONS', { role, uid: currentUser.uid }, { 
        component: 'LessonController',
        reason: validation.message 
      });
      toast.error('אין לך הרשאות לשליטה בשיעורים');
      navigate('/teacher/dashboard');
      return;
    }

    // Load initial session data
    loadSessionData();
  }, [currentUser, role, sessionId, navigate]);

  // Real-time session listener - separate effect for better control
  useEffect(() => {
    if (!sessionId || !currentUser) return;

    console.log('🎧 Setting up real-time session listener for:', sessionId);
    
    const unsubscribe = listenToSession(sessionId, (updatedSession) => {
      if (updatedSession) {
        // Only update if session data actually changed
        setSession(prevSession => {
          if (!prevSession || 
              prevSession.connectedStudents?.length !== updatedSession.connectedStudents?.length ||
              prevSession.currentSlide !== updatedSession.currentSlide ||
              prevSession.status !== updatedSession.status) {
            
            console.log('🔄 Session updated:', {
              connectedStudents: updatedSession.connectedStudents?.length || 0,
              currentSlide: updatedSession.currentSlide,
              status: updatedSession.status
            });
            
            return updatedSession;
          }
          return prevSession;
        });
      } else {
        console.log('⚠️ Session not found or ended');
        toast.error('השיעור הסתיים או לא נמצא');
        navigate('/teacher/dashboard');
      }
    });

    // Cleanup listener on unmount or sessionId change
    return () => {
      console.log('🔇 Cleaning up session listener for:', sessionId);
      unsubscribe();
      cleanup();
    };
  }, [sessionId, currentUser]);

  // Security check - if not a teacher, show access denied
  if (!isTeacher({ role })) {
    logSecurityEvent('STUDENT_ACCESS_ATTEMPT', { role, uid: currentUser?.uid }, { component: 'LessonController' });
    return (
      <div className="text-center py-8">
        <p className="text-red-400">אין לך הרשאות לשליטה בשיעורים</p>
      </div>
    );
  }

  const loadSessionData = async () => {
    try {
      const sessionData = await getSession(sessionId);
      setSession(sessionData);
      setCurrentSlide(sessionData.currentSlide || 0);
      
      // Load lesson data from Firebase database only
      let lessonData = null;
      try {
        lessonData = await getLessonWithSlides(sessionData.lessonId);
        if (lessonData && lessonData.slides && lessonData.slides.length > 0) {
          lessonData = {
            ...lessonData,
            content: { slides: lessonData.slides }
          };
        } else {
          throw new Error('No slides found in database');
        }
      } catch (e) {
        console.error('Failed to load lesson from database:', e);
        toast.error('שגיאה בטעינת השיעור מהמסד נתונים');
        navigate('/teacher/dashboard');
        return;
      }
      setLesson(lessonData);
      
      // Load teacher notes for this lesson
      if (currentUser?.uid) {
        const notes = await getTeacherNotesForLesson(currentUser.uid, sessionData.lessonId.toString());
        const notesMap = {};
        notes.forEach(note => {
          // Use slideId as key for consistency with database structure
          notesMap[note.slideId] = note.content;
        });
        setTeacherNotes(notesMap);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading session:', error);
      setLoading(false);
    }
  };

  // Calculate session duration - optimized with useCallback
  useEffect(() => {
    if (!session?.startTime) {
      setSessionDuration(0);
      return;
    }

    const startTime = session.startTime?.toDate?.() || new Date(session.startTime);
    const initialDuration = Math.floor((Date.now() - startTime.getTime()) / 1000);
    setSessionDuration(initialDuration);

    const interval = setInterval(() => {
      const duration = Math.floor((Date.now() - startTime.getTime()) / 1000);
      setSessionDuration(duration);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [session?.startTime]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? 'השיעור הושהה' : 'השיעור התחדש');
  };

  const handleNextSlide = async () => {
    if (lesson && currentSlide < lesson.slides.length - 1) {
      const newSlideIndex = currentSlide + 1;
      setCurrentSlide(newSlideIndex);
      await updateSessionSlide(sessionId, newSlideIndex);
    }
  };

  const handlePreviousSlide = async () => {
    if (currentSlide > 0) {
      const newSlideIndex = currentSlide - 1;
      setCurrentSlide(newSlideIndex);
      await updateSessionSlide(sessionId, newSlideIndex);
    }
  };

  const handleSlideSelect = async (slideIndex) => {
    setCurrentSlide(slideIndex);
    await updateSessionSlide(sessionId, slideIndex);
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

  const handleToggleLessonLock = () => {
    setLessonLocked(!lessonLocked);
    toast.success(lessonLocked ? 'השיעור נפתח' : 'השיעור ננעל');
  };

  const handleToggleStudentAudio = () => {
    setStudentAudioEnabled(!studentAudioEnabled);
    toast.success(studentAudioEnabled ? 'הקול של התלמידים הושתק' : 'הקול של התלמידים הופעל');
  };

  const handleToggleStudentVideo = () => {
    setStudentVideoEnabled(!studentVideoEnabled);
    toast.success(studentVideoEnabled ? 'המצלמה של התלמידים כובתה' : 'המצלמה של התלמידים הופעלה');
  };

  const handleEndSession = async () => {
    try {
      await endSession(sessionId);
      navigate('/teacher/dashboard');
    } catch (error) {
      console.error('Error ending session:', error);
    }
  };

  const handleAnswerQuestion = (questionId, studentId, answer) => {
    // Handle student answering a question
    toast.success('תשובה התקבלה');
  };

  const handleCallOnStudent = (studentId) => {
    // Call on a specific student
    const student = students.find(s => s.id === studentId);
    toast.success(`קורא ל${student.name}`);
  };

  const getSlideTypeIcon = (type) => {
    switch (type) {
      case 'intro': return '📝';
      case 'poll': return '📊';
      case 'content': return '📖';
      case 'video': return '🎥';
      case 'interactive': return '🎮';
      case 'quiz': return '❓';
      case 'break': return '☕';
      case 'reflection': return '🤔';
      case 'summary': return '📋';
      default: return '📄';
    }
  };

  const formatSessionDuration = (startTime) => {
    if (!startTime) return '00:00';
    const start = startTime?.toDate?.() || new Date(startTime);
    const duration = Math.floor((Date.now() - start.getTime()) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleToggleStudentNavigation = () => {
    setStudentNavigationLocked(!studentNavigationLocked);
    toast.success(studentNavigationLocked ? 'התלמידים יכולים לנווט בחופשיות' : 'ניווט התלמידים ננעל');
  };

  const handleForceSlideSync = async () => {
    try {
      await updateSessionSlide(sessionId, currentSlide);
      toast.success('כל התלמידים הועברו לשקופית הנוכחית');
    } catch (error) {
      console.error('Error forcing slide sync:', error);
      toast.error('שגיאה בסנכרון השקופיות');
    }
  };

  const handleSessionModeToggle = () => {
    const newMode = sessionMode === 'live' ? 'individual' : 'live';
    setSessionMode(newMode);
    toast.success(newMode === 'live' ? 'מצב שיעור חי מופעל' : 'מצב למידה עצמאית מופעל');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!session || !lesson) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Session Not Found</h2>
          <p className="text-gray-400">The requested session could not be loaded.</p>
        </div>
      </div>
    );
  }

  // Get current slide note using slideId
  const currentSlideData = lesson?.slides?.[currentSlide];
  const currentSlideNote = currentSlideData ? teacherNotes[currentSlideData.id] : null;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">LIVE</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{session.lessonName}</h1>
              <p className="text-gray-300 text-sm">
                {session.className} • {session.activeStudents || 0} תלמידים פעילים
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Session Mode Indicator */}
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                sessionMode === 'live' 
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                  : 'bg-green-600/20 text-green-300 border border-green-500/30'
              }`}>
                {sessionMode === 'live' ? 'שיעור חי' : 'למידה עצמאית'}
              </div>
            </div>

            {/* Student Navigation Lock Status */}
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                studentNavigationLocked 
                  ? 'bg-red-600/20 text-red-300 border border-red-500/30' 
                  : 'bg-green-600/20 text-green-300 border border-green-500/30'
              }`}>
                {studentNavigationLocked ? 'ניווט נעול' : 'ניווט חופשי'}
              </div>
            </div>

            <div className="flex items-center space-x-2 text-gray-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{formatSessionDuration(session.startTime)}</span>
            </div>
            
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

      {/* Session Control Banner */}
      <div className="bg-gray-700/50 border-b border-gray-600 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleSessionModeToggle}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              {sessionMode === 'live' ? 'מצב עצמאי' : 'מצב חי'}
            </Button>
            
            <Button
              onClick={handleToggleStudentNavigation}
              variant={studentNavigationLocked ? "danger" : "success"}
              size="sm"
              className="flex items-center space-x-2"
            >
              {studentNavigationLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              <span>{studentNavigationLocked ? 'שחרר ניווט' : 'נעל ניווט'}</span>
            </Button>
            
            <Button
              onClick={handleForceSlideSync}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>סנכרן כולם</span>
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span>תלמידים מחוברים: {connectedStudents.length}</span>
            <span>מעורבות ממוצעת: {sessionStats.averageEngagement}%</span>
            <span>שאלות נענו: {sessionStats.questionsAnswered}</span>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Slide Display */}
          <div className="flex-1 bg-gray-900 p-8 flex items-center justify-center relative">
            <div className="w-full max-w-4xl">
              {lesson && lesson.slides && lesson.slides[currentSlide] ? (
                <div className="bg-white rounded-lg shadow-2xl p-8 min-h-96">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {lesson.slides[currentSlide].title || `שקופית ${currentSlide + 1}`}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {lesson.title} • שקופית {currentSlide + 1} מתוך {lesson.slides.length}
                    </p>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    {lesson.slides[currentSlide].content && (
                      <div 
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ 
                          __html: typeof lesson.slides[currentSlide].content === 'string' 
                            ? lesson.slides[currentSlide].content 
                            : JSON.stringify(lesson.slides[currentSlide].content)
                        }}
                      />
                    )}
                    
                    {lesson.slides[currentSlide].type === 'video' && lesson.slides[currentSlide].videoUrl && (
                      <div className="mt-4">
                        <video 
                          className="w-full rounded-lg"
                          controls
                          src={lesson.slides[currentSlide].videoUrl}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                    
                    {lesson.slides[currentSlide].type === 'quiz' && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">שאלה:</h3>
                        <p className="text-blue-700">{lesson.slides[currentSlide].question}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <p>אין תוכן להצגה</p>
                </div>
              )}
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
                  disabled={currentSlide === lesson.slides.length - 1}
                  variant="secondary"
                  size="sm"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>

              {/* Audio/Video Controls */}
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleMute}
                  variant="secondary"
                  size="sm"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                
                <Button
                  onClick={handleToggleStudentAudio}
                  variant={studentAudioEnabled ? "secondary" : "danger"}
                  size="sm"
                >
                  {studentAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </Button>
                
                <Button
                  onClick={handleToggleStudentVideo}
                  variant={studentVideoEnabled ? "secondary" : "danger"}
                  size="sm"
                >
                  {studentVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </Button>
              </div>

              {/* Progress */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">
                  {currentSlide + 1} / {lesson.slides.length}
                </span>
                <div className="w-32 bg-gray-700 rounded-full h-2">
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
        <div className="w-96 bg-gray-800/50 border-l border-gray-700 overflow-y-auto">
          {/* Raised Hands */}
          {raisedHands.length > 0 && (
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
                <Hand className="w-5 h-5 text-yellow-400" />
                <span>ידיים מורמות ({raisedHands.length})</span>
              </h3>
              <div className="space-y-3">
                {raisedHands.map((hand) => (
                  <Card key={hand.id} className="p-3 bg-yellow-500/10 border-yellow-500/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white font-medium">{hand.name}</p>
                        <p className="text-yellow-300 text-sm">{hand.question}</p>
                        <p className="text-gray-400 text-xs">
                          {Math.floor((Date.now() - hand.time.getTime()) / 1000 / 60)} דקות
                        </p>
                      </div>
                      <Button
                        onClick={() => handleCallOnStudent(hand.id)}
                        variant="secondary"
                        size="sm"
                      >
                        קרא
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Active Questions */}
          {activeQuestions.length > 0 && (
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-blue-400" />
                <span>שאלות פעילות ({activeQuestions.length})</span>
              </h3>
              <div className="space-y-3">
                {activeQuestions.map((question) => (
                  <Card key={question.id} className="p-3 bg-blue-500/10 border-blue-500/20">
                    <p className="text-white font-medium mb-2">{question.question}</p>
                    <div className="space-y-2">
                      {question.answers.map((answer, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                          <span className="text-gray-300 text-sm">{answer}</span>
                          <span className="text-blue-400 text-xs">
                            {Math.round((question.responses / session.activeStudents) * 100)}%
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      {question.responses} תשובות מתוך {session.activeStudents} תלמידים
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Students List */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>תלמידים ({session.connectedStudents?.length || 0})</span>
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {session.connectedStudents && session.connectedStudents.length > 0 ? (
                session.connectedStudents.map((student) => (
                  <div
                    key={student.id}
                    className="p-3 rounded-lg border bg-green-500/10 border-green-500/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div>
                          <p className="text-white font-medium">{student.name}</p>
                          <p className="text-sm text-gray-400">
                            מחובר לשיעור
                          </p>
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center">
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

export default LessonController; 