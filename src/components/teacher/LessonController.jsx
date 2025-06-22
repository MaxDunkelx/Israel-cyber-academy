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

const LessonController = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { role } = useUserProfile();
  const [session, setSession] = useState(null);
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

    // Load session data
    loadSessionData();
  }, [currentUser, role, sessionId, navigate]);

  // Security check - if not a teacher, show access denied
  if (!isTeacher({ role })) {
    logSecurityEvent('STUDENT_ACCESS_ATTEMPT', { role, uid: currentUser?.uid }, { component: 'LessonController' });
    return (
      <div className="text-center py-8">
        <p className="text-red-400">אין לך הרשאות לשליטה בשיעורים</p>
      </div>
    );
  }

  const loadSessionData = () => {
    // Mock session data - in real app, this would come from Firebase
    const mockSession = {
      id: sessionId,
      lessonId: 1,
      lessonName: 'מבוא לאבטחת סייבר',
      teacher: 'שרה כהן',
      startTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: 'active',
      students: 15,
      activeStudents: 12,
      slides: [
        { id: 1, type: 'intro', title: 'מבוא', duration: 3, content: 'ברוכים הבאים לשיעור מבוא לאבטחת סייבר' },
        { id: 2, type: 'poll', title: 'סקר התחלתי', duration: 2, content: 'מה אתם יודעים על אבטחת סייבר?' },
        { id: 3, type: 'content', title: 'מה זה סייבר?', duration: 5, content: 'סייבר הוא עולם המחשוב והאינטרנט' },
        { id: 4, type: 'video', title: 'סרטון הדגמה', duration: 4, content: 'צפייה בסרטון על אבטחת מידע' },
        { id: 5, type: 'interactive', title: 'משחק האקר', duration: 6, content: 'משחק אינטראקטיבי על אבטחה' },
        { id: 6, type: 'content', title: 'כלי אבטחה', duration: 4, content: 'הכרת כלי אבטחה בסיסיים' },
        { id: 7, type: 'interactive', title: 'משולש האבטחה', duration: 5, content: 'למידה על משולש האבטחה' },
        { id: 8, type: 'quiz', title: 'חידון משולש האבטחה', duration: 3, content: 'בדיקת הבנה על משולש האבטחה' },
        { id: 9, type: 'break', title: 'הפסקה', duration: 2, content: 'הפסקה קצרה' },
        { id: 10, type: 'content', title: 'איומים דיגיטליים', duration: 4, content: 'הכרת איומים דיגיטליים' },
        { id: 11, type: 'interactive', title: 'זיהוי איומים', duration: 5, content: 'תרגול זיהוי איומים' },
        { id: 12, type: 'content', title: 'להישאר בטוחים', duration: 3, content: 'טיפים להישארות בטוחים' },
        { id: 13, type: 'interactive', title: 'חוזק סיסמה', duration: 4, content: 'בדיקת חוזק סיסמאות' },
        { id: 14, type: 'video', title: 'סרטון סיסמאות', duration: 3, content: 'סרטון על סיסמאות חזקות' },
        { id: 15, type: 'quiz', title: 'חידון סופי', duration: 5, content: 'חידון מסכם על השיעור' },
        { id: 16, type: 'reflection', title: 'הרהור', duration: 2, content: 'הרהור על מה שלמדנו' },
        { id: 17, type: 'summary', title: 'סיכום', duration: 2, content: 'סיכום השיעור' }
      ]
    };

    const mockStudents = [
      { id: 1, name: 'יוסי כהן', status: 'active', currentSlide: 5, progress: 75, hasRaisedHand: true },
      { id: 2, name: 'שרה לוי', status: 'active', currentSlide: 5, progress: 80, hasRaisedHand: false },
      { id: 3, name: 'דוד אברהם', status: 'active', currentSlide: 4, progress: 60, hasRaisedHand: true },
      { id: 4, name: 'מיכל רוזן', status: 'inactive', currentSlide: 3, progress: 45, hasRaisedHand: false },
      { id: 5, name: 'עמית שפירא', status: 'active', currentSlide: 5, progress: 85, hasRaisedHand: false },
      { id: 6, name: 'נועה כהן', status: 'active', currentSlide: 5, progress: 70, hasRaisedHand: false },
      { id: 7, name: 'אלון לוי', status: 'active', currentSlide: 4, progress: 65, hasRaisedHand: false },
      { id: 8, name: 'יעל אברהם', status: 'inactive', currentSlide: 2, progress: 30, hasRaisedHand: false },
      { id: 9, name: 'דן רוזן', status: 'active', currentSlide: 5, progress: 90, hasRaisedHand: false },
      { id: 10, name: 'מיכל שפירא', status: 'active', currentSlide: 5, progress: 75, hasRaisedHand: false },
      { id: 11, name: 'יוסי כהן', status: 'active', currentSlide: 4, progress: 60, hasRaisedHand: false },
      { id: 12, name: 'שרה לוי', status: 'active', currentSlide: 5, progress: 80, hasRaisedHand: false }
    ];

    const mockRaisedHands = [
      { id: 1, name: 'יוסי כהן', time: new Date(Date.now() - 2 * 60 * 1000), question: 'האם אפשר להסביר שוב על האבטחה?' },
      { id: 3, name: 'דוד אברהם', time: new Date(Date.now() - 1 * 60 * 1000), question: 'איך זה עובד בפועל?' }
    ];

    const mockActiveQuestions = [
      { id: 1, question: 'מה זה סייבר?', answers: ['עולם המחשוב', 'אינטרנט', 'אבטחה'], correctAnswer: 0, responses: 12 },
      { id: 2, question: 'איך להגן על עצמנו?', answers: ['סיסמה חזקה', 'לא לפתוח קישורים חשודים', 'שניהם'], correctAnswer: 2, responses: 10 }
    ];

    setSession(mockSession);
    setStudents(mockStudents);
    setRaisedHands(mockRaisedHands);
    setActiveQuestions(mockActiveQuestions);
    setLoading(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast.success(isPlaying ? 'השיעור הושהה' : 'השיעור התחדש');
  };

  const handleNextSlide = () => {
    if (currentSlide < session.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      toast.success(`עבר לשקופית ${currentSlide + 2}`);
    }
  };

  const handlePreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      toast.success(`חזר לשקופית ${currentSlide}`);
    }
  };

  const handleSlideSelect = (slideIndex) => {
    setCurrentSlide(slideIndex);
    toast.success(`עבר לשקופית ${slideIndex + 1}`);
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

  const handleEndSession = () => {
    if (window.confirm('האם אתה בטוח שברצונך לסיים את השיעור?')) {
      toast.success('השיעור הסתיים');
      navigate('/teacher/dashboard');
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">השיעור לא נמצא</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate(`/teacher/session/${sessionId}`)}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>חזור לשיעור</span>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">שליטה בשיעור</h1>
              <p className="text-gray-300 text-sm">
                {session.lessonName} • {session.activeStudents}/{session.students} תלמידים
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleToggleLessonLock}
              variant={lessonLocked ? "danger" : "secondary"}
              size="sm"
              className="flex items-center space-x-2"
            >
              {lessonLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              <span>{lessonLocked ? 'נעול' : 'פתוח'}</span>
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
              <Card className="p-8 text-center">
                <div className="text-8xl mb-6">
                  {getSlideTypeIcon(session.slides[currentSlide].type)}
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  {session.slides[currentSlide].title}
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  {session.slides[currentSlide].content}
                </p>
                <div className="text-sm text-gray-400">
                  שקופית {currentSlide + 1} מתוך {session.slides.length} • {session.slides[currentSlide].duration} דקות
                </div>
              </Card>
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
                  disabled={currentSlide === session.slides.length - 1}
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
                  {currentSlide + 1} / {session.slides.length}
                </span>
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSlide + 1) / session.slides.length) * 100}%` }}
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
              <span>תלמידים ({session.activeStudents})</span>
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {students.map((student) => (
                <div
                  key={student.id}
                  className={`p-3 rounded-lg border ${
                    student.status === 'active' 
                      ? 'bg-green-500/10 border-green-500/20' 
                      : 'bg-gray-700/50 border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div>
                        <p className="text-white font-medium">{student.name}</p>
                        <p className="text-sm text-gray-400">
                          שקופית {student.currentSlide} • {student.progress}%
                        </p>
                      </div>
                      {student.hasRaisedHand && (
                        <Hand className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      student.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Thumbnails */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
        <div className="flex space-x-2 max-w-4xl overflow-x-auto">
          {session.slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => handleSlideSelect(index)}
              className={`flex-shrink-0 w-16 h-12 rounded-lg border-2 transition-all duration-200 ${
                currentSlide === index
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-gray-600 bg-gray-700 hover:border-gray-500'
              }`}
              title={`${slide.title} (${slide.duration} דקות)`}
            >
              <div className="text-center text-xs">
                <div className="text-lg">{getSlideTypeIcon(slide.type)}</div>
                <div className="text-gray-300">{index + 1}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonController; 