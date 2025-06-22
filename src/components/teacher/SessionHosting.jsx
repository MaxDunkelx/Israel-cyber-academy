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
  VolumeX
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { isTeacher, validateTeacherAccess, logSecurityEvent } from '../../utils/security';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const SessionHosting = () => {
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

  useEffect(() => {
    // Security check - ensure only teachers can access this component
    if (!currentUser) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', { role: 'none' }, { component: 'SessionHosting' });
      return;
    }

    const validation = validateTeacherAccess({ role }, 'host_sessions');
    if (!validation.success) {
      logSecurityEvent('INSUFFICIENT_PERMISSIONS', { role, uid: currentUser.uid }, { 
        component: 'SessionHosting',
        reason: validation.message 
      });
      toast.error('אין לך הרשאות לאירוח שיעורים');
      navigate('/teacher/dashboard');
      return;
    }

    // Load session data
    loadSessionData();
  }, [currentUser, role, sessionId, navigate]);

  // Security check - if not a teacher, show access denied
  if (!isTeacher({ role })) {
    logSecurityEvent('STUDENT_ACCESS_ATTEMPT', { role, uid: currentUser?.uid }, { component: 'SessionHosting' });
    return (
      <div className="text-center py-8">
        <p className="text-red-400">אין לך הרשאות לאירוח שיעורים</p>
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
      startTime: new Date(),
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
      { id: 1, name: 'יוסי כהן', status: 'active', currentSlide: 5, progress: 75 },
      { id: 2, name: 'שרה לוי', status: 'active', currentSlide: 5, progress: 80 },
      { id: 3, name: 'דוד אברהם', status: 'active', currentSlide: 4, progress: 60 },
      { id: 4, name: 'מיכל רוזן', status: 'inactive', currentSlide: 3, progress: 45 },
      { id: 5, name: 'עמית שפירא', status: 'active', currentSlide: 5, progress: 85 },
      { id: 6, name: 'נועה כהן', status: 'active', currentSlide: 5, progress: 70 },
      { id: 7, name: 'אלון לוי', status: 'active', currentSlide: 4, progress: 65 },
      { id: 8, name: 'יעל אברהם', status: 'inactive', currentSlide: 2, progress: 30 },
      { id: 9, name: 'דן רוזן', status: 'active', currentSlide: 5, progress: 90 },
      { id: 10, name: 'מיכל שפירא', status: 'active', currentSlide: 5, progress: 75 },
      { id: 11, name: 'יוסי כהן', status: 'active', currentSlide: 4, progress: 60 },
      { id: 12, name: 'שרה לוי', status: 'active', currentSlide: 5, progress: 80 }
    ];

    setSession(mockSession);
    setStudents(mockStudents);
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

  const handleEndSession = () => {
    if (window.confirm('האם אתה בטוח שברצונך לסיים את השיעור?')) {
      toast.success('השיעור הסתיים');
      navigate('/teacher/dashboard');
    }
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
              <p className="text-gray-300 text-sm">שיעור פעיל • {session.activeStudents}/{session.students} תלמידים</p>
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
              <span>תלמידים ({session.activeStudents})</span>
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
        <div className={`w-80 bg-gray-800/50 border-l border-gray-700 transition-all duration-300 ${
          showStudentList ? 'block' : 'hidden'
        }`}>
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-4">תלמידים פעילים</h3>
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
                    <div>
                      <p className="text-white font-medium">{student.name}</p>
                      <p className="text-sm text-gray-400">
                        שקופית {student.currentSlide} • {student.progress}%
                      </p>
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

export default SessionHosting; 