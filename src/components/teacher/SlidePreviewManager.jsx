import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Eye, 
  Edit3, 
  Save, 
  BookOpen,
  MessageSquare,
  Calendar,
  Clock,
  Star,
  Layers,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Settings,
  Info,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Minus,
  RotateCcw,
  Download,
  Share2,
  Bookmark,
  Search,
  Filter,
  Grid,
  List,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { saveTeacherNotes, getTeacherNotesForLesson } from '../../firebase/teacher-service';
import { getAllLessons, getSlidesByLessonId } from '../../firebase/content-service';
import { PresentationSlide, PollSlide, VideoSlide, InteractiveSlide, BreakSlide, ReflectionSlide, QuizSlide } from '../slides';
import LoadingSpinner from '../common/LoadingSpinner';
import Card from '../ui/Card';
import { toast } from 'react-hot-toast';

const SlidePreviewManager = () => {
  const { currentUser } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(true);
  const [fullscreenMode, setFullscreenMode] = useState(false);
  const [showSlideThumbnails, setShowSlideThumbnails] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [answers, setAnswers] = useState({});
  const [completedSlides, setCompletedSlides] = useState({});
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(5000);
  const [autoPlayTimer, setAutoPlayTimer] = useState(null);

  // Load all lessons from unified data source - using system manager logic
  const loadLessons = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading lessons from database...');
      
      const lessonsData = await getAllLessons();
      console.log(`✅ Loaded ${lessonsData.length} lessons`);
      setLessons(lessonsData);
      
      if (lessonsData.length === 0) {
        toast.error('No lessons found. Please check your database connection.');
      } else {
      // Auto-select first lesson if available
        if (!selectedLesson) {
          setSelectedLesson(lessonsData[0]);
        }
      }
      
    } catch (error) {
      console.error('❌ Error loading lessons:', error);
      toast.error(`Failed to load lessons: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load slides for a lesson - using system manager logic
  const loadSlides = async (lessonId) => {
    try {
      console.log(`🔄 Loading slides for lesson ${lessonId}...`);
      
      const slidesData = await getSlidesByLessonId(lessonId);
      console.log(`✅ Loaded ${slidesData.length} slides`);
      
      if (slidesData.length === 0) {
        console.log('⚠️ No slides found for this lesson');
        toast.warning('No slides found for this lesson');
      }
      
      // Update the selected lesson with slides
      setSelectedLesson(prev => prev ? {
        ...prev,
        content: { slides: slidesData }
      } : null);
      
    } catch (error) {
      console.error('❌ Error loading slides:', error);
      toast.error(`Failed to load slides: ${error.message}`);
    }
  };

  // Handle lesson selection - using system manager logic
  const handleLessonChange = async (lessonId) => {
    console.log('🔄 Lesson changed to:', lessonId);
    
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
      setCurrentSlide(0);
      await loadSlides(lesson.id);
      
      // Load teacher notes for this lesson
      if (currentUser?.uid) {
        await loadTeacherNotes(lesson.id);
      }
    } else {
      setSelectedLesson(null);
      setNotes({});
      setCurrentNote('');
    }
  };

  // Load teacher notes
  const loadTeacherNotes = async (lessonId) => {
    try {
      if (!currentUser?.uid) return;
      
      const notesData = await getTeacherNotesForLesson(currentUser.uid, lessonId);
      const notesMap = {};
      
      notesData.forEach(note => {
        notesMap[note.slideId] = note.content;
      });
      
      setNotes(notesMap);
      console.log(`📝 Loaded ${notesData.length} teacher notes for lesson ${lessonId}`);
      
    } catch (error) {
      console.error('❌ Error loading teacher notes:', error);
    }
  };

  // Save teacher note
  const saveNote = async (slideId) => {
    try {
      if (!currentUser?.uid || !selectedLesson?.id || !currentNote.trim()) return;
      
      setSaving(true);
      
      await saveTeacherNotes(currentUser.uid, selectedLesson.id, slideId, {
        content: currentNote.trim(),
        slideIndex: currentSlide
      });
      
      setNotes(prev => ({
        ...prev,
        [slideId]: currentNote.trim()
      }));
      
      setCurrentNote('');
      toast.success('Note saved successfully');
      
    } catch (error) {
      console.error('❌ Error saving note:', error);
      toast.error('Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  // Load lessons on component mount
  useEffect(() => {
    loadLessons();
  }, []);

  // Load notes when component mounts or user changes
  useEffect(() => {
    if (currentUser?.uid && selectedLesson?.id) {
      console.log('🔄 Effect triggered - loading notes for selected lesson:', selectedLesson.id);
      loadTeacherNotes(selectedLesson.id.toString());
    }
  }, [currentUser?.uid, selectedLesson?.id]);

  const handleSaveNote = async () => {
    if (!currentUser?.uid || !selectedLesson || currentNote.trim() === '') return;
    
    console.log('💾 Saving note for lesson:', selectedLesson.id, 'slide:', currentSlide, 'content:', currentNote);
    
    setSaving(true);
    try {
      // Use slideIndex instead of slideId for better consistency
      const slideIndex = currentSlide;
      const slideId = selectedLesson.content?.slides?.[currentSlide]?.id || `slide-${currentSlide + 1}`;
      
      const result = await saveTeacherNotes(currentUser.uid, selectedLesson.id.toString(), slideId, {
        content: currentNote.trim(),
        slideIndex: slideIndex,
        timestamp: new Date().toISOString()
      });
      
      console.log('✅ Note saved successfully:', result);
      
      // Update local state using slideIndex as key
      const key = `${selectedLesson.id}-${slideIndex}`;
      setNotes(prev => ({ ...prev, [key]: currentNote.trim() }));
      
      setSaving(false);
    } catch (error) {
      console.error('❌ Error saving note:', error);
      setSaving(false);
    }
  };

  const handleSlideChange = (newSlideIndex) => {
    console.log('🔄 Changing slide from', currentSlide, 'to', newSlideIndex);
    setCurrentSlide(newSlideIndex);
    const key = `${selectedLesson.id}-${newSlideIndex}`;
    const noteForSlide = notes[key] || '';
    console.log('📝 Loading note for slide', newSlideIndex, 'key:', key, 'note:', noteForSlide);
    setCurrentNote(noteForSlide);
  };

  const getNoteForSlide = (lessonId, slideIndex) => {
    const key = `${lessonId}-${slideIndex}`;
    const note = notes[key] || '';
    console.log('📝 Getting note for slide', slideIndex, 'key:', key, 'note:', note);
    return note;
  };

  // Enhanced slide navigation
  const handleNextSlide = () => {
    if (selectedLesson?.content?.slides && currentSlide < selectedLesson.content.slides.length - 1) {
      const newSlideIndex = currentSlide + 1;
      setCurrentSlide(newSlideIndex);
      loadNoteForCurrentSlide(newSlideIndex);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      const newSlideIndex = currentSlide - 1;
      setCurrentSlide(newSlideIndex);
      loadNoteForCurrentSlide(newSlideIndex);
    }
  };

  const loadNoteForCurrentSlide = (slideIndex) => {
    if (!selectedLesson) return;
    const key = `${selectedLesson.id}-${slideIndex}`;
    const noteForSlide = notes[key] || '';
    setCurrentNote(noteForSlide);
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && selectedLesson?.content?.slides) {
      const timer = setInterval(() => {
        if (currentSlide < selectedLesson.content.slides.length - 1) {
          handleNextSlide();
        } else {
          setAutoPlay(false);
        }
      }, autoPlayInterval);
      setAutoPlayTimer(timer);
      return () => clearInterval(timer);
    } else if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      setAutoPlayTimer(null);
    }
  }, [autoPlay, currentSlide, selectedLesson, autoPlayInterval]);

  // Enhanced slide rendering with error handling
  const renderSlide = (slide) => {
    if (!slide || !slide.type) {
      return (
        <div className="text-center text-white p-8">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-semibold mb-2">שקופית לא תקינה</h2>
          <p className="text-gray-400">לא ניתן לטעון את השקופית הזו</p>
        </div>
      );
    }

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
      console.error('Error rendering slide:', error, slide);
      return (
        <div className="text-center text-white p-8">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-semibold mb-2">שגיאה בטעינת שקופית</h2>
          <p className="text-gray-400">אירעה שגיאה בעת הצגת השקופית</p>
        </div>
      );
    }
  };

  const handleAnswer = (slideId, answer) => {
    setAnswers(prev => ({ ...prev, [slideId]: answer }));
    setCompletedSlides(prev => ({ ...prev, [slideId]: true }));
  };

  // Filter and search slides
  const filteredSlides = selectedLesson?.content?.slides?.filter(slide => {
    const matchesSearch = slide.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         slide.content?.elements?.some(el => el.text?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || slide.type === filterType;
    return matchesSearch && matchesFilter;
  }) || [];

  // Get slide type icon
  const getSlideTypeIcon = (type) => {
    switch (type) {
      case 'presentation': return <FileText className="w-4 h-4 text-blue-400" />;
      case 'poll': return <MessageSquare className="w-4 h-4 text-green-400" />;
      case 'quiz': return <Star className="w-4 h-4 text-yellow-400" />;
      case 'video': return <Play className="w-4 h-4 text-purple-400" />;
      case 'interactive': return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'break': return <Pause className="w-4 h-4 text-orange-400" />;
      case 'reflection': return <BookOpen className="w-4 h-4 text-cyan-400" />;
      default: return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${fullscreenMode ? 'fixed inset-0 z-50' : ''}`}>
      {/* Enhanced Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">מנהל שקופיות למורה</h1>
              <p className="text-sm text-gray-400">צפייה וניהול הערות אישיות</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Lesson Selector */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-300">בחר שיעור:</label>
            <select
              value={selectedLesson?.id || ''}
              onChange={(e) => handleLessonChange(e.target.value)}
                className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">בחר שיעור...</option>
                {lessons
                  .slice()
                  .sort((a, b) => (a.title || '').localeCompare(b.title || ''))
                  .map(lesson => (
                <option key={lesson.id} value={lesson.id}>
                      {lesson.title || `שיעור ${lesson.id}`}
                </option>
              ))}
            </select>
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSlideThumbnails(!showSlideThumbnails)}
                className={`p-2 rounded-lg transition-colors ${
                  showSlideThumbnails ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:text-white'
                }`}
                title="Toggle Slide Thumbnails"
              >
                <Grid className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setFullscreenMode(!fullscreenMode)}
                className="p-2 bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors"
                title="Toggle Fullscreen"
              >
                {fullscreenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Enhanced Sidebar */}
        {showSlideThumbnails && (
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 320 }}
            exit={{ width: 0 }}
            className="bg-gray-800 border-r border-gray-700 overflow-hidden"
          >
          {selectedLesson && (
              <div className="h-full flex flex-col">
              {/* Lesson Info */}
                <div className="p-4 border-b border-gray-700 bg-gray-750">
                  <div className="flex items-center space-x-3 mb-3">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-white">{selectedLesson.title || `שיעור ${selectedLesson.id}`}</h2>
                <div className="text-sm text-gray-400">
                        {selectedLesson.content?.slides?.length || 0} שקופיות
                </div>
                </div>
              </div>

                  {/* Search and Filter */}
                <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="חיפוש בשקופיות..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">כל הסוגים</option>
                      <option value="presentation">הצגה</option>
                      <option value="poll">סקר</option>
                      <option value="quiz">חידון</option>
                      <option value="video">וידאו</option>
                      <option value="interactive">אינטראקטיבי</option>
                      <option value="break">הפסקה</option>
                      <option value="reflection">הרהור</option>
                    </select>
                  </div>
                </div>

                {/* Slide Navigation */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-2">
                    {filteredSlides.map((slide, index) => {
                      const originalIndex = selectedLesson.content.slides.findIndex(s => s.id === slide.id);
                      const hasNote = getNoteForSlide(selectedLesson.id, originalIndex);
                      
                      return (
                        <motion.button
                          key={slide.id || index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSlideChange(originalIndex)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                            currentSlide === originalIndex
                              ? 'bg-blue-600 text-white shadow-lg'
                              : 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {getSlideTypeIcon(slide.type)}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate text-sm">
                                {slide.title || `שקופית ${originalIndex + 1}`}
                              </div>
                              <div className="text-xs opacity-75 mt-1">
                                {slide.type || 'presentation'}
                              </div>
                            </div>
                            {hasNote && (
                              <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                      </div>
                </div>
              </div>
            )}
          </motion.div>
          )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {selectedLesson ? (
            <>
              {/* Slide Navigation Controls */}
              <div className="bg-gray-800 border-b border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePrevSlide}
                      disabled={currentSlide === 0}
                      className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
                      title="Previous Slide"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <span className="text-white font-medium">
                      שקופית {currentSlide + 1} מתוך {selectedLesson.content?.slides?.length || 0}
                    </span>
                    
                    <button
                      onClick={handleNextSlide}
                      disabled={currentSlide >= (selectedLesson.content?.slides?.length || 0) - 1}
                      className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
                      title="Next Slide"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
              </div>

                  <div className="flex items-center space-x-2">
                    {/* Auto-play Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setAutoPlay(!autoPlay)}
                        className={`p-2 rounded-lg transition-colors ${
                          autoPlay ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:text-white'
                        }`}
                        title="Auto-play"
                      >
                        {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      
                      {autoPlay && (
                        <select
                          value={autoPlayInterval}
                          onChange={(e) => setAutoPlayInterval(parseInt(e.target.value))}
                          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                        >
                          <option value={3000}>3s</option>
                          <option value={5000}>5s</option>
                          <option value={10000}>10s</option>
                        </select>
                      )}
                    </div>
                    
                    <div className="text-white text-sm">
                      {selectedLesson.content?.slides?.[currentSlide]?.title || `שקופית ${currentSlide + 1}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide Content */}
              <div className="flex-1 overflow-auto bg-gray-900">
                <div className="max-w-4xl mx-auto p-6">
                  {selectedLesson.content?.slides?.[currentSlide] && 
                    renderSlide(selectedLesson.content.slides[currentSlide])}
                </div>
              </div>

              {/* Enhanced Notes Panel */}
              <div className="h-64 bg-gray-800 border-t border-gray-700">
                <div className="h-full flex flex-col">
                  {/* Notes Header */}
                  <div className="p-4 border-b border-gray-700 bg-gray-750">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Edit3 className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-semibold text-white">
                          הערות מורה - שקופית {currentSlide + 1}
                        </h3>
                        {getNoteForSlide(selectedLesson.id, currentSlide) && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-400">
                          {Object.keys(notes).filter(key => notes[key] && notes[key].trim()).length} הערות שמורות
                    </div>
                    <button
                      onClick={handleSaveNote}
                      disabled={saving || currentNote.trim() === ''}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                          <Save className="w-4 h-4" />
                          <span>{saving ? 'שומר...' : 'שמור הערה'}</span>
                    </button>
                      </div>
                  </div>
                </div>
                
                  {/* Notes Content */}
                  <div className="flex-1 p-4">
                    {/* Existing Note Display */}
                {getNoteForSlide(selectedLesson.id, currentSlide) && (
                      <div className="mb-3 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                        <div className="text-sm text-yellow-300 font-medium mb-1 flex items-center space-x-2">
                          <Info className="w-4 h-4" />
                          <span>הערה קיימת:</span>
                        </div>
                    <div className="text-sm text-yellow-200">
                      {getNoteForSlide(selectedLesson.id, currentSlide)}
                    </div>
                  </div>
                )}
                
                    {/* Note Editor */}
                <textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder={getNoteForSlide(selectedLesson.id, currentSlide) 
                        ? "ערוך את ההערה הקיימת שלך עבור שקופית זו..." 
                        : "הוסף הערות אישיות עבור שקופית זו..."}
                  className="w-full h-32 bg-gray-700 text-white border border-gray-600 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
                    
                    <div className="text-sm text-gray-400 mt-2 flex items-center space-x-2">
                      <Info className="w-4 h-4" />
                      <span>הערות נשמרות אוטומטית במסד הנתונים האישי שלך</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h2 className="text-2xl font-semibold text-white mb-2">בחר שיעור</h2>
                <p className="text-gray-400">בחר שיעור מהרשימה כדי להתחיל לצפות בשקופיות</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlidePreviewManager; 