<<<<<<< HEAD
/**
 * LessonPreview Component - Israel Cyber Academy
 * 
 * Allows teachers to preview lessons and slides before teaching.
 * Provides a comprehensive view of lesson content, slides, and interactive elements.
 * 
 * Features:
 * - Lesson selection and preview
 * - Slide-by-slide navigation
 * - Content preview with all interactive elements
 * - Notes and annotations
 * - Lesson statistics and metadata
 * 
 * @component
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Eye,
  FileText,
  Clock,
  Users,
  Target,
  Search,
  Filter,
  Download,
  Share2,
  Bookmark,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { logSecurityEvent } from '../../utils/security';
import LoadingSpinner from '../common/LoadingSpinner';

// Import lesson data
import { lessons as lessonsData } from '../../data/lessons';

const LessonPreview = () => {
  const { user } = useAuth();
  
  // State Management
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [lessonNotes, setLessonNotes] = useState({});

  /**
   * Available lesson types for filtering
   */
  const lessonTypes = [
    { id: 'all', label: 'כל השיעורים', icon: BookOpen },
    { id: 'cyber', label: 'אבטחת סייבר', icon: Target },
    { id: 'hardware', label: 'חומרה', icon: Users },
    { id: 'software', label: 'תוכנה', icon: FileText },
    { id: 'network', label: 'רשתות', icon: Share2 }
  ];

  /**
   * Load lesson data and initialize
   */
  useEffect(() => {
    const loadLessonData = async () => {
      try {
        setLoading(true);
        
        // Simulate loading lesson data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        logSecurityEvent('LESSON_PREVIEW_LOADED', {
          uid: user?.uid,
          lessonsCount: lessonsData.length
        });
        
      } catch (error) {
        console.error('Error loading lesson data:', error);
        toast.error('אירעה שגיאה בטעינת נתוני השיעורים');
      } finally {
        setLoading(false);
      }
    };

    loadLessonData();
  }, [user?.uid]);

  /**
   * Filter lessons based on search and type
   */
  const filteredLessons = lessonsData.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || lesson.type === filterType;
    return matchesSearch && matchesType;
  });

  /**
   * Handle lesson selection
   */
  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setCurrentSlideIndex(0);
    setIsPlaying(false);
    
    logSecurityEvent('LESSON_SELECTED', {
      uid: user?.uid,
      lessonId: lesson.id,
      lessonTitle: lesson.title
    });
  };

  /**
   * Navigate between slides
   */
  const navigateSlide = (direction) => {
    if (!selectedLesson) return;
    
    const newIndex = direction === 'next' 
      ? Math.min(currentSlideIndex + 1, selectedLesson.slides.length - 1)
      : Math.max(currentSlideIndex - 1, 0);
    
    setCurrentSlideIndex(newIndex);
  };

  /**
   * Toggle play/pause mode
   */
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  /**
   * Add note to current slide
   */
  const addNote = (note) => {
    if (!selectedLesson) return;
    
    const slideId = `${selectedLesson.id}-${currentSlideIndex}`;
    setLessonNotes(prev => ({
      ...prev,
      [slideId]: note
    }));
    
    toast.success('הערה נוספה בהצלחה');
  };

  /**
   * Get current slide
   */
  const getCurrentSlide = () => {
    if (!selectedLesson || !selectedLesson.slides) return null;
    return selectedLesson.slides[currentSlideIndex];
  };

  /**
   * Render slide content based on type
   */
  const renderSlideContent = (slide) => {
    if (!slide) return null;

    switch (slide.type) {
      case 'presentation':
        return (
          <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{slide.title}</h2>
            <div className="prose max-w-none">
              {slide.content}
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="bg-gray-800 p-8 rounded-lg">
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
              <Play className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mt-4">{slide.title}</h3>
            <p className="text-gray-400 mt-2">{slide.description}</p>
          </div>
        );
      
      case 'interactive':
        return (
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-4">{slide.title}</h3>
            <p className="mb-4">{slide.description}</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              התחל פעילות
            </button>
          </div>
        );
      
      case 'quiz':
        return (
          <div className="bg-gradient-to-br from-green-500 to-teal-600 p-8 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-4">{slide.title}</h3>
            <p className="mb-4">{slide.description}</p>
            <div className="space-y-2">
              {slide.questions?.map((q, i) => (
                <div key={i} className="bg-white/20 p-3 rounded">
                  <p className="font-medium">{q.question}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{slide.title}</h3>
            <p>{slide.content}</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
=======
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Play, 
  Eye, 
  Lock, 
  Unlock, 
  Users, 
  Clock, 
  Target,
  MessageSquare,
  Plus,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Calendar,
  Pause
} from 'lucide-react';
import { lessons } from '../../data/lessons';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { isTeacher, validateTeacherAccess, logSecurityEvent } from '../../utils/security';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

export default function LessonPreview({
  lesson,
  selectedClass,
  onUnlockLesson,
  onAddComment,
  getLessonProgress
}) {
  const { currentUser } = useAuth();
  const { role } = useUserProfile();
  const [selectedLessonId, setSelectedLessonId] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [previewMode, setPreviewMode] = useState('overview'); // overview, slides, analytics
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  const selectedLesson = lessons.find(l => l.id === selectedLessonId);
  const totalSlides = selectedLesson?.content?.slides?.length || 0;

  const slideTypes = {
    presentation: 'הצגה',
    poll: 'סקר',
    video: 'וידאו',
    interactive: 'אינטראקטיבי',
    break: 'הפסקה',
    reflection: 'הרהור',
    quiz: 'חידון'
  };

  const getSlideTypeIcon = (type) => {
    const icons = {
      presentation: BookOpen,
      poll: BarChart3,
      video: Play,
      interactive: Target,
      break: Clock,
      reflection: MessageSquare,
      quiz: Target
    };
    return icons[type] || BookOpen;
  };

  const getSlideTypeColor = (type) => {
    const colors = {
      presentation: 'bg-blue-100 text-blue-800',
      poll: 'bg-green-100 text-green-800',
      video: 'bg-purple-100 text-purple-800',
      interactive: 'bg-yellow-100 text-yellow-800',
      break: 'bg-gray-100 text-gray-800',
      reflection: 'bg-indigo-100 text-indigo-800',
      quiz: 'bg-red-100 text-red-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const handleSlideChange = (direction) => {
    if (direction === 'next' && currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (direction === 'prev' && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSlide = () => {
    if (selectedLesson && currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const renderSlidePreview = (slide) => {
    if (!slide) return null;

    const SlideTypeIcon = getSlideTypeIcon(slide.type);

    return (
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <SlideTypeIcon className="h-5 w-5 text-gray-600" />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSlideTypeColor(slide.type)}`}>
              {slideTypes[slide.type] || slide.type}
            </span>
            <span className="text-sm text-gray-500">שקופית {currentSlide + 1} מתוך {totalSlides}</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setShowComments(!showComments)}
              className="p-2 text-gray-600 hover:text-cyber-blue hover:bg-blue-50 rounded-lg transition-colors"
              title="הערות"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{slide.title}</h3>
          {slide.content?.elements && (
            <div className="space-y-2">
              {slide.content.elements.slice(0, 3).map((element, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {element.type === 'title' && <span className="font-medium">כותרת: {element.text}</span>}
                  {element.type === 'subtitle' && <span>כותרת משנה: {element.text}</span>}
                  {element.type === 'list' && <span>רשימה עם {element.items?.length || 0} פריטים</span>}
                  {element.type === 'image' && <span>תמונה: {element.alt}</span>}
                  {element.type === 'timer' && <span>טיימר: {element.duration} שניות</span>}
                </div>
              ))}
              {slide.content.elements.length > 3 && (
                <span className="text-sm text-gray-500">+{slide.content.elements.length - 3} אלמנטים נוספים</span>
              )}
            </div>
          )}
        </div>

        {/* Slide Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleSlideChange('prev')}
            disabled={currentSlide === 0}
            className="flex items-center space-x-1 space-x-reverse px-3 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
          >
            <ChevronRight className="h-4 w-4" />
            <span>קודם</span>
          </button>
          <span className="text-sm text-gray-600">
            {currentSlide + 1} / {totalSlides}
          </span>
          <button
            onClick={() => handleSlideChange('next')}
            disabled={currentSlide === totalSlides - 1}
            className="flex items-center space-x-1 space-x-reverse px-3 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
          >
            <span>הבא</span>
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  const renderLessonOverview = () => (
    <div className="space-y-6">
      {/* Lesson Selection */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">בחר שיעור לתצוגה מקדימה</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.slice(0, 9).map(lesson => (
            <div
              key={lesson.id}
              onClick={() => setSelectedLessonId(lesson.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedLessonId === lesson.id
                  ? 'border-cyber-blue bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{lesson.icon}</span>
                <span className="text-xs text-gray-500">שיעור {lesson.id}</span>
              </div>
              <h4 className="font-medium text-gray-800 mb-1">{lesson.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{lesson.duration}</span>
                <span>{lesson.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Lesson Details */}
      {selectedLesson && (
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="text-2xl mr-3">{selectedLesson.icon}</span>
                {selectedLesson.title}
              </h3>
              <p className="text-gray-600 mt-2">{selectedLesson.description}</p>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <button
                onClick={() => setPreviewMode('slides')}
                className="btn-primary flex items-center"
              >
                <Eye className="h-4 w-4 ml-2" />
                תצוגה מקדימה
              </button>
              {selectedClass && (
                <button
                  onClick={() => onUnlockLesson(selectedLesson.id, selectedClass.id)}
                  className="btn-secondary flex items-center"
                >
                  <Unlock className="h-4 w-4 ml-2" />
                  פתח לכיתה
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-cyber-blue mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-800">{selectedLesson.duration}</div>
              <div className="text-sm text-gray-600">משך השיעור</div>
            </div>
            <div className="text-center">
              <Target className="h-8 w-8 text-cyber-green mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-800">{selectedLesson.difficulty}</div>
              <div className="text-sm text-gray-600">רמת קושי</div>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 text-cyber-purple mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-800">{selectedLesson.targetAge}</div>
              <div className="text-sm text-gray-600">גיל יעד</div>
            </div>
          </div>

          {/* Slide Overview */}
          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-800 mb-4">מבט כללי על השקופיות</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedLesson.content?.slides?.map((slide, index) => {
                const SlideTypeIcon = getSlideTypeIcon(slide.type);
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setPreviewMode('slides');
                      setCurrentSlide(index);
                    }}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-cyber-blue hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <SlideTypeIcon className="h-4 w-4 text-gray-600" />
                      <span className="text-xs text-gray-500">{index + 1}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-800 mb-1">{slide.title}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSlideTypeColor(slide.type)}`}>
                      {slideTypes[slide.type] || slide.type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">אנליטיקת שיעור</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyber-blue mb-2">
              {selectedLesson?.content?.slides?.length || 0}
            </div>
            <div className="text-sm text-gray-600">שקופיות</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyber-green mb-2">
              {selectedLesson?.content?.slides?.filter(s => s.type === 'quiz').length || 0}
            </div>
            <div className="text-sm text-gray-600">חידונים</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyber-purple mb-2">
              {selectedLesson?.content?.slides?.filter(s => s.type === 'interactive').length || 0}
            </div>
            <div className="text-sm text-gray-600">אינטראקטיבי</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyber-yellow mb-2">
              {selectedLesson?.breakDuration || 0}
            </div>
            <div className="text-sm text-gray-600">דקות הפסקה</div>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    // Security check - ensure only teachers can access this component
    if (!currentUser) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', { role: 'none' }, { component: 'LessonPreview' });
      return;
    }

    const validation = validateTeacherAccess({ role }, 'preview_lessons');
    if (!validation.success) {
      logSecurityEvent('INSUFFICIENT_PERMISSIONS', { role, uid: currentUser.uid }, { 
        component: 'LessonPreview',
        reason: validation.message 
      });
      toast.error('אין לך הרשאות לתצוגה מקדימה של שיעורים');
      return;
    }

    // Load lessons data
    setLoading(false);
  }, [currentUser, role]);

  // Security check - if not a teacher, show access denied
  if (!isTeacher({ role })) {
    logSecurityEvent('STUDENT_ACCESS_ATTEMPT', { role, uid: currentUser?.uid }, { component: 'LessonPreview' });
    return (
      <div className="text-center py-8">
        <p className="text-red-400">אין לך הרשאות לגשת לתצוגה מקדימה של שיעורים</p>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
  }

  return (
    <div className="space-y-6">
      {/* Header */}
<<<<<<< HEAD
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">תצוגה מקדימה של שיעורים</h2>
          <p className="text-gray-400 mt-1">בדוק ותצוגה מקדימה של תוכן השיעורים לפני ההוראה</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>ייצא PDF</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>שתף</span>
=======
      <div>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <BookOpen className="h-6 w-6 text-cyber-blue mr-3" />
          תצוגה מקדימה של שיעורים
        </h2>
        <p className="text-gray-600">צפה בתוכן השיעורים ופתח אותם לכיתות</p>
      </div>

      {/* Mode Navigation */}
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <div className="flex space-x-4 space-x-reverse">
          <button
            onClick={() => setPreviewMode('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              previewMode === 'overview'
                ? 'bg-cyber-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            מבט כללי
          </button>
          <button
            onClick={() => setPreviewMode('slides')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              previewMode === 'slides'
                ? 'bg-cyber-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            תצוגה מקדימה
          </button>
          <button
            onClick={() => setPreviewMode('analytics')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              previewMode === 'analytics'
                ? 'bg-cyber-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            אנליטיקה
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
          </button>
        </div>
      </div>

<<<<<<< HEAD
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson List */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">רשימת שיעורים</h3>
            
            {/* Search and Filter */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="חיפוש שיעורים..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {lessonTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFilterType(type.id)}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                      filterType === type.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <type.icon className="w-3 h-3" />
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lesson List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredLessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => handleLessonSelect(lesson)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedLesson?.id === lesson.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5" />
                    <div>
                      <h4 className="font-medium">{lesson.title}</h4>
                      <p className="text-sm opacity-75">{lesson.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration} דקות</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <FileText className="w-3 h-3" />
                          <span>{lesson.slides?.length || 0} שקופיות</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lesson Preview */}
        <div className="lg:col-span-2">
          {selectedLesson ? (
            <div className="bg-gray-800/50 rounded-lg border border-gray-700">
              {/* Lesson Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-100">{selectedLesson.title}</h3>
                    <p className="text-gray-400 mt-1">{selectedLesson.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={togglePlay}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isPlaying ? 'השהה' : 'נגן'}</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                      <Bookmark className="w-4 h-4" />
                      <span>שמור</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Slide Navigation */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigateSlide('prev')}
                    disabled={currentSlideIndex === 0}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>הקודם</span>
                  </button>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-300">
                      שקופית {currentSlideIndex + 1} מתוך {selectedLesson.slides?.length || 0}
                    </span>
                    <div className="flex space-x-1">
                      {selectedLesson.slides?.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlideIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentSlideIndex ? 'bg-blue-500' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigateSlide('next')}
                    disabled={currentSlideIndex === (selectedLesson.slides?.length - 1)}
                    className="flex items-center space-x-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>הבא</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slide Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlideIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderSlideContent(getCurrentSlide())}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Notes Section */}
              <div className="p-6 border-t border-gray-700">
                <h4 className="text-lg font-semibold text-gray-100 mb-4">הערות למורה</h4>
                <div className="space-y-4">
                  <textarea
                    placeholder="הוסף הערות לשיעור זה..."
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    value={lessonNotes[`${selectedLesson.id}-${currentSlideIndex}`] || ''}
                    onChange={(e) => addNote(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      שמור הערה
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">בחר שיעור לתצוגה מקדימה</h3>
              <p className="text-gray-500">בחר שיעור מהרשימה כדי לראות את התוכן והשקופיות</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPreview; 
=======
      {/* Content based on mode */}
      {previewMode === 'overview' && renderLessonOverview()}
      {previewMode === 'slides' && selectedLesson && renderSlidePreview(selectedLesson.content.slides[currentSlide])}
      {previewMode === 'analytics' && renderAnalytics()}

      {/* Back to overview button for slides mode */}
      {previewMode === 'slides' && (
        <div className="flex justify-center">
          <button
            onClick={() => setPreviewMode('overview')}
            className="btn-secondary flex items-center"
          >
            <ChevronRight className="h-4 w-4 ml-2" />
            חזור למבט כללי
          </button>
        </div>
      )}
    </div>
  );
}
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
