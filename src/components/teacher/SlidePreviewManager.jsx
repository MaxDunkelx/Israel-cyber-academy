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
import { getAllLessons, getAllLessonsWithSlideCounts, getSlidesByLessonId, getLessonWithSlides } from '../../firebase/content-service';
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
  const [error, setError] = useState(null);
  const [loadingSlides, setLoadingSlides] = useState(false);

  // Load all lessons from database - using content service
  const loadLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Loading lessons with slide counts from database...');
      
      const lessonsData = await getAllLessonsWithSlideCounts();
      console.log(`✅ Loaded ${lessonsData.length} lessons with slide counts from database`);
      setLessons(lessonsData);
      
      if (lessonsData.length === 0) {
        setError('No lessons found. Please check your database connection.');
        toast.error('No lessons found. Please check your database connection.');
      } else {
      // Auto-select first lesson if available
        if (!selectedLesson) {
          setSelectedLesson(lessonsData[0]);
          // No need to load slides again since they're already loaded
          console.log(`✅ Auto-selected lesson: ${lessonsData[0].title} with ${lessonsData[0].slides?.length || 0} slides`);
        }
      }
      
    } catch (error) {
      console.error('❌ Error loading lessons:', error);
      setError(`Failed to load lessons: ${error.message}`);
      toast.error(`Failed to load lessons: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load slides for a specific lesson from database
  const loadSlidesForLesson = async (lessonId) => {
    // Prevent multiple simultaneous loads
    if (loadingSlides) {
      console.log('⚠️ Slides already loading, skipping...');
      return;
    }
    
    try {
      setLoadingSlides(true);
      console.log(`🔄 Loading slides for lesson ${lessonId} from database...`);
      
      const slidesData = await getSlidesByLessonId(lessonId);
      console.log(`✅ Loaded ${slidesData.length} slides from database for lesson ${lessonId}`);
      console.log(`📋 Slide IDs:`, slidesData.map(s => s.id));
      
      if (slidesData.length === 0) {
        console.log('⚠️ No slides found for this lesson');
        toast.warning('No slides found for this lesson');
      }
      
      // Remove any duplicate slides based on ID
      const uniqueSlides = slidesData.filter((slide, index, self) => 
        index === self.findIndex(s => s.id === slide.id)
      );
      
      if (uniqueSlides.length !== slidesData.length) {
        console.log(`⚠️ Removed ${slidesData.length - uniqueSlides.length} duplicate slides`);
      }
      
      // Update the selected lesson with slides from database
      setSelectedLesson(prev => prev ? {
        ...prev,
        slides: uniqueSlides,
        content: { slides: uniqueSlides } // Maintain compatibility with existing code
      } : null);
      
      // Reset current slide to 0 when loading new lesson
      setCurrentSlide(0);
      
      // Load teacher notes for this lesson
      if (currentUser?.uid) {
        await loadTeacherNotes(lessonId);
      }
      
    } catch (error) {
      console.error('❌ Error loading slides:', error);
      toast.error(`Failed to load slides: ${error.message}`);
    } finally {
      setLoadingSlides(false);
    }
  };

  // Handle lesson selection - using database-driven approach
  const handleLessonChange = async (lessonId) => {
    console.log('🔄 Lesson changed to:', lessonId);
    
    try {
      // Find the lesson in our loaded lessons
      const lessonData = lessons.find(lesson => lesson.id === lessonId);
      
      if (lessonData) {
        console.log('✅ Found lesson data:', lessonData.title);
        console.log(`📊 Lesson has ${lessonData.slides?.length || 0} slides loaded`);
        setSelectedLesson(lessonData);
        setCurrentSlide(0);
        
        // Slides are already loaded, no need to load them again
        // Load teacher notes for this lesson
        if (currentUser?.uid) {
          await loadTeacherNotes(lessonData.id);
        }
      } else {
        console.error('❌ Lesson not found in loaded lessons');
        toast.error('Lesson not found');
      }
    } catch (error) {
      console.error('❌ Error loading lesson:', error);
      toast.error('Failed to load lesson');
    }
  };

  // Load teacher notes for a lesson
  const loadTeacherNotes = async (lessonId) => {
    try {
      if (!currentUser?.uid) return;
      
      const notesData = await getTeacherNotesForLesson(currentUser.uid, lessonId);
      const notesMap = {};
      
      notesData.forEach(note => {
        // Use slideId as key for consistency
        notesMap[note.slideId] = note.content;
      });
      
      setNotes(notesMap);
      console.log(`📝 Loaded ${notesData.length} teacher notes for lesson ${lessonId}`);
      
    } catch (error) {
      console.error('❌ Error loading teacher notes:', error);
    }
  };

  // Save teacher note for current slide
  const saveNote = async () => {
    try {
      if (!currentUser?.uid || !selectedLesson?.id || !currentNote.trim()) return;
      
      setSaving(true);
      
      // Get current slide ID
      const currentSlideData = selectedLesson.slides?.[currentSlide];
      if (!currentSlideData) {
        toast.error('No slide data available');
        return;
      }
      
      const slideId = currentSlideData.id;
      
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
      loadTeacherNotes(selectedLesson.id);
    }
  }, [currentUser?.uid, selectedLesson?.id]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && selectedLesson?.slides) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => {
          if (prev < selectedLesson.slides.length - 1) {
            return prev + 1;
          } else {
            setAutoPlay(false);
            return prev;
          }
        });
      }, autoPlayInterval);
      
      setAutoPlayTimer(timer);
      
      return () => clearInterval(timer);
    }
  }, [autoPlay, autoPlayInterval, selectedLesson?.slides]);

  // Handle slide change
  const handleSlideChange = (newSlideIndex) => {
    if (selectedLesson?.slides && newSlideIndex >= 0 && newSlideIndex < selectedLesson.slides.length) {
    setCurrentSlide(newSlideIndex);
      loadNoteForCurrentSlide(newSlideIndex);
    }
  };

  // Get note for specific slide
  const getNoteForSlide = (lessonId, slideIndex) => {
    if (!selectedLesson?.slides || slideIndex >= selectedLesson.slides.length) return '';
    
    const slideId = selectedLesson.slides[slideIndex]?.id;
    return notes[slideId] || '';
  };

  // Navigation functions
  const handleNextSlide = () => {
    if (selectedLesson?.slides && currentSlide < selectedLesson.slides.length - 1) {
      handleSlideChange(currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      handleSlideChange(currentSlide - 1);
    }
  };

  // Load note for current slide
  const loadNoteForCurrentSlide = (slideIndex) => {
    if (!selectedLesson?.slides || slideIndex >= selectedLesson.slides.length) {
      setCurrentNote('');
      return;
    }
    
    const slideId = selectedLesson.slides[slideIndex]?.id;
    const note = notes[slideId] || '';
    setCurrentNote(note);
  };

  // Update current note when slide changes
  useEffect(() => {
    loadNoteForCurrentSlide(currentSlide);
  }, [currentSlide, selectedLesson, notes]);

  // Render slide content
  const renderSlide = (slide) => {
    if (!slide) return null;

    try {
      switch (slide.type) {
        case 'presentation':
          return <PresentationSlide slide={slide} />;
        case 'poll':
          return <PollSlide slide={slide} onSubmit={(answer) => handleAnswer(slide.id, answer)} />;
        case 'video':
          return <VideoSlide slide={slide} />;
        case 'interactive':
          return <InteractiveSlide slide={slide} onComplete={(result) => handleAnswer(slide.id, result)} />;
        case 'break':
          return <BreakSlide slide={slide} />;
        case 'reflection':
          return <ReflectionSlide slide={slide} onSubmit={(reflection) => handleAnswer(slide.id, reflection)} />;
        case 'quiz':
          return <QuizSlide slide={slide} onSubmit={(answer) => handleAnswer(slide.id, answer)} />;
        default:
          return (
            <div className="text-center py-8">
              <p className="text-gray-400">Unsupported slide type: {slide.type}</p>
            </div>
          );
      }
    } catch (error) {
      console.error('Error rendering slide:', error);
      return (
        <div className="text-center py-8">
          <p className="text-red-400">Error rendering slide</p>
        </div>
      );
    }
  };

  // Handle slide answers
  const handleAnswer = (slideId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [slideId]: answer
    }));
    
    setCompletedSlides(prev => ({
      ...prev,
      [slideId]: true
    }));
  };

  // Get slide type icon
  const getSlideTypeIcon = (type) => {
    switch (type) {
      case 'presentation': return <FileText className="w-4 h-4" />;
      case 'poll': return <MessageSquare className="w-4 h-4" />;
      case 'video': return <Play className="w-4 h-4" />;
      case 'interactive': return <Settings className="w-4 h-4" />;
      case 'break': return <Pause className="w-4 h-4" />;
      case 'reflection': return <BookOpen className="w-4 h-4" />;
      case 'quiz': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // Filter and sort lessons based on search term and order
  const filteredLessons = lessons
    .filter(lesson =>
      lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Prefer explicit order, fallback to originalId, then title
      const orderA = a.order ?? a.originalId ?? 0;
      const orderB = b.order ?? b.originalId ?? 0;
      if (orderA !== orderB) return orderA - orderB;
      return (a.title || '').localeCompare(b.title || '');
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-red-400">{error}</p>
        <button 
          onClick={loadLessons}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold">Slide Preview Manager</h1>
              <p className="text-gray-400">Preview and manage lesson slides</p>
            </div>
          </div>
          
            <div className="flex items-center space-x-2">
              <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                previewMode ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
              </button>
              
              <button
                onClick={() => setFullscreenMode(!fullscreenMode)}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                {fullscreenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lesson Selection Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Lessons</h2>
                
                {/* Search */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search lessons..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                    />
        </div>
      </div>

                {/* Lesson List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredLessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonChange(lesson.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedLesson?.id === lesson.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm opacity-75">
                            {lesson.totalSlides || lesson.slides?.length || 0} slides
                          </p>
                        </div>
                </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
              </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {selectedLesson ? (
              <div className="space-y-6">
                {/* Lesson Info */}
                <Card>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">{selectedLesson.title}</h2>
                        <p className="text-gray-400">{selectedLesson.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">
                          Slide {currentSlide + 1} of {selectedLesson.totalSlides || selectedLesson.slides?.length || 0}
                        </p>
                        <p className="text-sm text-gray-400">
                          {selectedLesson.totalSlides || selectedLesson.slides?.length || 0} total slides
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Slide Navigation */}
                {selectedLesson.slides && selectedLesson.slides.length > 0 && (
                  <Card>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Slide Navigation</h3>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setAutoPlay(!autoPlay)}
                            className={`px-3 py-1 rounded ${
                              autoPlay ? 'bg-red-600' : 'bg-green-600'
                            }`}
                          >
                            {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => setShowSlideThumbnails(!showSlideThumbnails)}
                            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                          >
                            <Grid className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Slide Thumbnails */}
                      {showSlideThumbnails && (
                        <div className="grid grid-cols-6 gap-2 mb-4">
                          {selectedLesson.slides.map((slide, index) => (
                            <button
                              key={`slide-${slide.id}-order-${slide.order || index}`}
                              onClick={() => handleSlideChange(index)}
                              className={`p-2 rounded text-xs ${
                                index === currentSlide
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-800 hover:bg-gray-700'
                          }`}
                        >
                              <div className="flex flex-col items-center space-y-1">
                            {getSlideTypeIcon(slide.type)}
                                <span>{index + 1}</span>
                              </div>
                            </button>
                          ))}
              </div>
            )}

                      {/* Navigation Controls */}
                <div className="flex items-center justify-between">
                    <button
                      onClick={handlePrevSlide}
                      disabled={currentSlide === 0}
                          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleSlideChange(0)}
                            disabled={currentSlide === 0}
                            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                          >
                            <SkipBack className="w-4 h-4" />
                    </button>
                    
                          <span className="text-sm">
                            {currentSlide + 1} / {selectedLesson.slides.length}
                    </span>
                    
                    <button
                            onClick={() => handleSlideChange(selectedLesson.slides.length - 1)}
                            disabled={currentSlide === selectedLesson.slides.length - 1}
                            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
                          >
                            <SkipForward className="w-4 h-4" />
                    </button>
              </div>

                      <button
                          onClick={handleNextSlide}
                          disabled={currentSlide === selectedLesson.slides.length - 1}
                          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    </div>
                  </Card>
                )}

              {/* Slide Content */}
                {selectedLesson.slides && selectedLesson.slides[currentSlide] && (
                  <Card>
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                          {selectedLesson.slides[currentSlide].title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          {getSlideTypeIcon(selectedLesson.slides[currentSlide].type)}
                          <span>{selectedLesson.slides[currentSlide].type}</span>
                        </div>
                      </div>
                      
                      <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                        {renderSlide(selectedLesson.slides[currentSlide])}
                      </div>
                    </div>
                  </Card>
                )}
                
                {/* Teacher Notes */}
                <Card>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Teacher Notes</h3>
                    <div className="space-y-4">
                <textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                        placeholder="Add your notes for this slide..."
                        className="w-full h-32 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setCurrentNote('')}
                          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                        >
                          Clear
                        </button>
                        <button
                          onClick={saveNote}
                          disabled={saving || !currentNote.trim()}
                          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                          {saving ? <LoadingSpinner /> : <Save className="w-4 h-4" />}
                          <span>Save Note</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
          ) : (
              <Card>
                <div className="p-8 text-center">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Lesson Selected</h3>
                  <p className="text-gray-400">
                    Select a lesson from the sidebar to preview its slides
                  </p>
              </div>
              </Card>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SlidePreviewManager; 