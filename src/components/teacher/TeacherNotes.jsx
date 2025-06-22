/**
 * TeacherNotes Component - Israel Cyber Academy
 * 
<<<<<<< HEAD
 * Allows teachers to preview lessons and add teaching notes for each slide.
 * Provides a comprehensive lesson preview with slide-by-slide navigation
 * and note-taking capabilities saved to the database.
 * 
 * Features:
 * - Real lesson content preview
 * - Slide-by-slide navigation
 * - Note-taking per slide
 * - Lesson selection
 * - Note management (add, edit, delete)
 * - Firebase integration
=======
 * Allows teachers to preview lesson content and add teaching notes
 * for each slide. Provides a comprehensive lesson preview system
 * with note-taking capabilities.
 * 
 * Features:
 * - Lesson content preview with slide navigation
 * - Slide-specific note taking
 * - Real lesson data integration
 * - Search and filtering
 * - Note management (add, edit, delete)
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
 * - Security logging
 * 
 * @component
 */

import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  FileText,
  Search,
  Filter,
  Calendar,
  Clock,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { logSecurityEvent } from '../../utils/security';
import { lessons } from '../../data/lessons';
import LoadingSpinner from '../common/LoadingSpinner';

// Import slide components
import PresentationSlide from '../slides/PresentationSlide';
import InteractiveSlide from '../slides/InteractiveSlide';
import QuizSlide from '../slides/QuizSlide';
import VideoSlide from '../slides/VideoSlide';
import PollSlide from '../slides/PollSlide';
import BreakSlide from '../slides/BreakSlide';
import ReflectionSlide from '../slides/ReflectionSlide';

const TeacherNotes = () => {
  const { user } = useAuth();
  const { displayName } = useUserProfile();
  
  // Data State Management
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [notes, setNotes] = useState({});
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editingNoteText, setEditingNoteText] = useState('');
  
  // UI State Management
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLesson, setFilterLesson] = useState('all');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedNoteSlide, setSelectedNoteSlide] = useState(null);

  /**
   * Slide component mapping
   */
  const slideComponents = {
    'presentation': PresentationSlide,
    'interactive': InteractiveSlide,
    'quiz': QuizSlide,
    'video': VideoSlide,
    'poll': PollSlide,
    'break': BreakSlide,
    'reflection': ReflectionSlide
  };

  /**
   * Load notes from localStorage (in production, this would be from Firebase)
   */
  useEffect(() => {
    const savedNotes = localStorage.getItem(`teacher_notes_${user?.uid}`);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    }
  }, [user?.uid]);

  /**
   * Save notes to localStorage (in production, this would be to Firebase)
   */
  const saveNotes = (newNotes) => {
    try {
      localStorage.setItem(`teacher_notes_${user?.uid}`, JSON.stringify(newNotes));
      setNotes(newNotes);
      
      logSecurityEvent('TEACHER_NOTES_SAVED', {
        uid: user.uid,
        lessonId: selectedLesson?.id,
        slideIndex: currentSlideIndex,
        notesCount: Object.keys(newNotes).length
      });
      
      toast.success('ההערות נשמרו בהצלחה');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('אירעה שגיאה בשמירת ההערות');
=======
import { 
  FileText, 
  Search, 
  BookOpen,
  Save,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  Clock,
  Calendar,
  Eye,
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { isTeacher, validateTeacherAccess, logSecurityEvent } from '../../utils/security';
import { lessons } from '../../data/lessons';
import { PresentationSlide, PollSlide, VideoSlide, InteractiveSlide, BreakSlide, ReflectionSlide, QuizSlide } from '../slides';
import LoadingSpinner from '../common/LoadingSpinner';
import Card from '../ui/Card';
import Button from '../ui/Button';

const TeacherNotes = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const { role, uid: profileUid } = useUserProfile();
  const uid = profileUid || currentUser?.uid;
  
  // Lesson and Slide State Management
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Notes State Management
  const [notes, setNotes] = useState({});
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', slideNumber: 1 });
  
  // UI State Management
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Security check and data loading
   * Validates teacher access and loads initial data
   */
  useEffect(() => {
    if (authLoading) return;

    if (!currentUser) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', { role: 'none' }, { component: 'TeacherNotes' });
      return;
    }

    const validation = validateTeacherAccess({ role }, 'teacher_notes_access');
    if (!validation.success) {
      logSecurityEvent('INSUFFICIENT_PERMISSIONS', { role, uid: currentUser.uid }, { 
        component: 'TeacherNotes',
        reason: validation.message 
      });
      toast.error('אין לך הרשאות לגשת להערות');
      return;
    }

    if (uid) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [currentUser, role, uid, authLoading]);

  /**
   * Load teacher's notes from database
   * In production, this would fetch from Firebase
   */
  const loadData = async () => {
    if (!uid) {
      console.error('Teacher ID is undefined, cannot load data');
      toast.error('מזהה המורה לא תקין');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Load teacher's notes from database (mock for now)
      const teacherNotes = {
        1: [
          { id: 1, title: 'הערה חשובה', content: 'להדגיש את חשיבות הסיסמאות החזקות', slideNumber: 5, createdAt: new Date() },
          { id: 2, title: 'דוגמה נוספת', content: 'להראות דוגמאות נוספות של איומים', slideNumber: 8, createdAt: new Date() }
        ],
        2: [
          { id: 3, title: 'הסבר נוסף', content: 'להסביר יותר על ה-CPU', slideNumber: 10, createdAt: new Date() }
        ]
      };

      setNotes(teacherNotes);
      
      logSecurityEvent('TEACHER_NOTES_LOADED', {
        uid,
        notesCount: Object.values(teacherNotes).flat().length
      });
      
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('שגיאה בטעינת הנתונים');
      logSecurityEvent('TEACHER_NOTES_LOAD_ERROR', {
        uid,
        error: error.message
      });
    } finally {
      setLoading(false);
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
    }
  };

  /**
<<<<<<< HEAD
   * Handle lesson selection
   */
  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setCurrentSlideIndex(0);
    
    logSecurityEvent('LESSON_SELECTED_FOR_NOTES', {
      uid: user.uid,
      lessonId: lesson.id,
      lessonName: lesson.title
    });
  };

  /**
   * Navigate to next slide
   */
  const nextSlide = () => {
    if (selectedLesson && currentSlideIndex < selectedLesson.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
=======
   * Filter lessons based on search term
   * Searches in lesson title and description
   */
  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Get notes for current lesson and slide
   * @returns {Array} Array of notes for current slide
   */
  const getCurrentNotes = () => {
    if (!selectedLesson) return [];
    const lessonNotes = notes[selectedLesson.id] || [];
    return lessonNotes.filter(note => note.slideNumber === currentSlide + 1);
  };

  /**
   * Render slide based on its type
   * Uses appropriate slide component for each type
   * @param {Object} slide - Slide data object
   * @returns {JSX.Element} Rendered slide component
   */
  const renderSlide = (slide) => {
    if (!slide) return null;
    
    switch (slide.type) {
      case 'presentation':
        return <PresentationSlide slide={slide} />;
      case 'poll':
        return <PollSlide slide={slide} onAnswer={() => {}} answers={{}} />;
      case 'video':
        return <VideoSlide slide={slide} onAnswer={() => {}} answers={{}} />;
      case 'interactive':
        return <InteractiveSlide slide={slide} onAnswer={() => {}} answers={{}} />;
      case 'break':
        return <BreakSlide slide={slide} />;
      case 'reflection':
        return <ReflectionSlide slide={slide} onAnswer={() => {}} answers={{}} />;
      case 'quiz':
        return <QuizSlide slide={slide} onAnswer={() => {}} answers={{}} />;
      default:
        return (
          <div className="bg-gray-900/50 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-white mb-2">{slide.title || 'שקופית'}</h3>
            <p className="text-gray-400">סוג שקופית: {slide.type}</p>
          </div>
        );
    }
  };

  /**
   * Add new note for current slide
   * Validates input and saves to database
   */
  const handleAddNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast.error('נא למלא את כל השדות');
      return;
    }

    try {
      const noteData = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        slideNumber: newNote.slideNumber,
        createdAt: new Date()
      };

      // Save to database (mock for now)
      const updatedNotes = {
        ...notes,
        [selectedLesson.id]: [...(notes[selectedLesson.id] || []), noteData]
      };

      setNotes(updatedNotes);
      setNewNote({ title: '', content: '', slideNumber: 1 });
      setShowAddNote(false);
      
      toast.success('הערה נוספה בהצלחה');
      
      logSecurityEvent('TEACHER_NOTE_ADDED', {
        uid,
        lessonId: selectedLesson.id,
        slideNumber: newNote.slideNumber,
        noteTitle: newNote.title
      });
      
    } catch (error) {
      console.error('Error adding note:', error);
      toast.error('שגיאה בהוספת הערה');
      logSecurityEvent('TEACHER_NOTE_ADD_ERROR', {
        uid,
        error: error.message
      });
    }
  };

  /**
   * Delete note by ID
   * Removes note from database and updates state
   * @param {number} noteId - ID of note to delete
   */
  const handleDeleteNote = async (noteId) => {
    try {
      const updatedNotes = {
        ...notes,
        [selectedLesson.id]: notes[selectedLesson.id].filter(note => note.id !== noteId)
      };

      setNotes(updatedNotes);
      toast.success('הערה נמחקה בהצלחה');
      
      logSecurityEvent('TEACHER_NOTE_DELETED', {
        uid,
        lessonId: selectedLesson.id,
        noteId
      });
      
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('שגיאה במחיקת הערה');
      logSecurityEvent('TEACHER_NOTE_DELETE_ERROR', {
        uid,
        error: error.message
      });
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
    }
  };

  /**
   * Navigate to previous slide
<<<<<<< HEAD
   */
  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
=======
   * Updates current slide index if possible
   */
  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
    }
  };

  /**
<<<<<<< HEAD
   * Navigate to specific slide
   */
  const goToSlide = (index) => {
    if (selectedLesson && index >= 0 && index < selectedLesson.slides.length) {
      setCurrentSlideIndex(index);
    }
  };

  /**
   * Add or update note for current slide
   */
  const handleAddNote = () => {
    if (!selectedLesson) return;
    
    const noteKey = `${selectedLesson.id}_${currentSlideIndex}`;
    const currentNote = notes[noteKey] || '';
    
    setEditingNoteText(currentNote);
    setSelectedNoteSlide({ lessonId: selectedLesson.id, slideIndex: currentSlideIndex });
    setShowNoteModal(true);
    setIsEditingNote(true);
  };

  /**
   * Save note
   */
  const handleSaveNote = () => {
    if (!selectedNoteSlide || !editingNoteText.trim()) return;
    
    const noteKey = `${selectedNoteSlide.lessonId}_${selectedNoteSlide.slideIndex}`;
    const newNotes = {
      ...notes,
      [noteKey]: editingNoteText.trim()
    };
    
    saveNotes(newNotes);
    setShowNoteModal(false);
    setIsEditingNote(false);
    setEditingNoteText('');
    setSelectedNoteSlide(null);
  };

  /**
   * Delete note
   */
  const handleDeleteNote = (lessonId, slideIndex) => {
    const noteKey = `${lessonId}_${slideIndex}`;
    const newNotes = { ...notes };
    delete newNotes[noteKey];
    
    saveNotes(newNotes);
    
    logSecurityEvent('TEACHER_NOTE_DELETED', {
      uid: user.uid,
      lessonId,
      slideIndex
    });
  };

  /**
   * Get current slide data
   */
  const getCurrentSlide = () => {
    if (!selectedLesson || !selectedLesson.slides) return null;
    return selectedLesson.slides[currentSlideIndex];
  };

  /**
   * Get note for current slide
   */
  const getCurrentNote = () => {
    if (!selectedLesson) return '';
    const noteKey = `${selectedLesson.id}_${currentSlideIndex}`;
    return notes[noteKey] || '';
  };

  /**
   * Render current slide
   */
  const renderCurrentSlide = () => {
    const slide = getCurrentSlide();
    if (!slide) return null;

    const SlideComponent = slideComponents[slide.type] || PresentationSlide;
    
    return (
      <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
        <SlideComponent 
          slide={slide}
          onNext={nextSlide}
          onPrevious={prevSlide}
          isTeacherMode={true}
        />
      </div>
    );
  };

  /**
   * Filter lessons based on search term
   */
  const filteredLessons = lessons.filter(lesson => {
    if (searchTerm) {
      return lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  // Show loading spinner while data is loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
=======
   * Navigate to next slide
   * Updates current slide index if possible
   */
  const handleNextSlide = () => {
    if (selectedLesson && currentSlide < selectedLesson.content.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  // Security check - if not a teacher, show access denied
  if (!isTeacher({ role })) {
    logSecurityEvent('STUDENT_ACCESS_ATTEMPT', { role, uid: currentUser?.uid }, { component: 'TeacherNotes' });
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-200 mb-2">גישה נדחתה</h3>
        <p className="text-gray-400">אין לך הרשאות לגשת להערות</p>
      </div>
    );
  }

  // Show loading while authentication is in progress
  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-12">
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
<<<<<<< HEAD
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">הערות הוראה</h2>
          <p className="text-gray-400">
            תצוגה מקדימה של שיעורים והוספת הערות אישיות לכל שקופית
          </p>
        </div>
      </div>

      {/* Lesson Selection */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-100">בחר שיעור</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="חיפוש שיעורים..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleLessonSelect(lesson)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedLesson?.id === lesson.id
                    ? 'bg-blue-600/20 border-blue-500/50 text-blue-100'
                    : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{lesson.title}</h4>
                    <p className="text-sm text-gray-400 mb-2">{lesson.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span className="flex items-center space-x-1">
                        <FileText className="w-3 h-3" />
                        <span>{lesson.slides?.length || 0} שקופיות</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>~{Math.floor((lesson.slides?.length || 0) * 3)} דקות</span>
                      </span>
                    </div>
                  </div>
                  <BookOpen className="w-5 h-5 text-gray-400" />
                </div>
                
                {/* Note indicator */}
                {Object.keys(notes).some(key => key.startsWith(`${lesson.id}_`)) && (
                  <div className="flex items-center space-x-2 text-xs text-blue-400">
                    <MessageSquare className="w-3 h-3" />
                    <span>יש הערות</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredLessons.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>לא נמצאו שיעורים</p>
          </div>
        )}
      </div>

      {/* Lesson Preview and Notes */}
      {selectedLesson && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Slide Preview */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">{selectedLesson.title}</h3>
                  <p className="text-sm text-gray-400">
                    שקופית {currentSlideIndex + 1} מתוך {selectedLesson.slides?.length || 0}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleAddNote}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-gray-100 text-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>הוסף הערה</span>
                  </button>
                </div>
              </div>
              
              {/* Slide Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevSlide}
                  disabled={currentSlideIndex === 0}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg text-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>הקודמת</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  {selectedLesson.slides?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlideIndex
                          ? 'bg-blue-500'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextSlide}
                  disabled={currentSlideIndex === (selectedLesson.slides?.length || 0) - 1}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg text-gray-200 transition-colors"
                >
                  <span>הבאה</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              {/* Current Slide */}
              <div className="min-h-[400px]">
                {renderCurrentSlide()}
              </div>
            </div>
          </div>

          {/* Notes Panel */}
          <div className="space-y-4">
            {/* Current Slide Note */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <h4 className="font-medium text-gray-200 mb-3">הערה לשקופית נוכחית</h4>
              
              {getCurrentNote() ? (
                <div className="space-y-3">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <p className="text-gray-200 text-sm whitespace-pre-wrap">{getCurrentNote()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleAddNote}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-gray-100 text-sm transition-colors"
                    >
                      ערוך
                    </button>
                    <button
                      onClick={() => handleDeleteNote(selectedLesson.id, currentSlideIndex)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-gray-100 text-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">אין הערות לשקופית זו</p>
                  <button
                    onClick={handleAddNote}
                    className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-gray-100 text-sm transition-colors"
                  >
                    הוסף הערה
                  </button>
                </div>
              )}
            </div>

            {/* All Notes Summary */}
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <h4 className="font-medium text-gray-200 mb-3">סיכום הערות</h4>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Object.keys(notes)
                  .filter(key => key.startsWith(`${selectedLesson.id}_`))
                  .map(key => {
                    const slideIndex = parseInt(key.split('_')[1]);
                    const note = notes[key];
                    const slide = selectedLesson.slides?.[slideIndex];
                    
                    return (
                      <div
                        key={key}
                        className="bg-gray-700/30 rounded-lg p-3 border border-gray-600"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-200">
                            שקופית {slideIndex + 1}
                          </span>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => {
                                goToSlide(slideIndex);
                                setEditingNoteText(note);
                                setSelectedNoteSlide({ lessonId: selectedLesson.id, slideIndex });
                                setShowNoteModal(true);
                                setIsEditingNote(true);
                              }}
                              className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteNote(selectedLesson.id, slideIndex)}
                              className="p-1 text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-2">{note}</p>
                      </div>
                    );
                  })}
              </div>
              
              {Object.keys(notes).filter(key => key.startsWith(`${selectedLesson.id}_`)).length === 0 && (
                <div className="text-center py-4 text-gray-400">
                  <p className="text-sm">אין הערות לשיעור זה</p>
                </div>
              )}
=======
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-100" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-200">הערות אישיות</h2>
            <p className="text-gray-400">הוסף הערות לשיעורים שלך</p>
          </div>
        </div>
        <Button 
          onClick={loadData}
          variant="secondary"
          className="bg-gray-700/50 hover:bg-gray-600/50"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          רענן נתונים
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lessons List */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900/90 border border-gray-700/50 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-gray-100" />
                </div>
                <h3 className="text-lg font-bold text-white">שיעורים</h3>
              </div>
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="חפש שיעורים..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Lessons List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => {
                    setSelectedLesson(lesson);
                    setCurrentSlide(0);
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedLesson?.id === lesson.id
                      ? 'bg-indigo-600/20 border border-indigo-500/50'
                      : 'bg-gray-700/60 border border-gray-600/50 hover:bg-gray-700/80'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl">{lesson.icon}</span>
                    <h4 className="text-white font-semibold text-sm">{lesson.title}</h4>
                  </div>
                  <p className="text-gray-400 text-xs mb-2">{lesson.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{lesson.content.slides.length} שקופיות</span>
                    <span className="text-gray-500">
                      {notes[lesson.id]?.length || 0} הערות
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Lesson Content and Notes */}
        <div className="lg:col-span-3">
          {selectedLesson ? (
            <div className="space-y-6">
              {/* Lesson Header */}
              <Card className="bg-gray-800/70 border border-gray-600/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{selectedLesson.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-200 mb-1">{selectedLesson.title}</h3>
                      <p className="text-gray-400 text-sm">{selectedLesson.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">שקופית</p>
                    <p className="text-gray-200 font-bold text-lg">{currentSlide + 1} / {selectedLesson.content.slides.length}</p>
                  </div>
                </div>
              </Card>

              {/* Slide Navigation */}
              <Card className="bg-gray-800/70 border border-gray-600/50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-200">ניווט שקופיות</h4>
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={handlePrevSlide}
                      disabled={currentSlide === 0}
                      variant="secondary"
                      size="sm"
                      className="bg-gray-700/50 hover:bg-gray-600/50 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      קודם
                    </Button>
                    <Button
                      onClick={() => setShowAddNote(true)}
                      variant="primary"
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      הוסף הערה
                    </Button>
                    <Button
                      onClick={handleNextSlide}
                      disabled={currentSlide >= selectedLesson.content.slides.length - 1}
                      variant="secondary"
                      size="sm"
                      className="bg-gray-700/50 hover:bg-gray-600/50 disabled:opacity-50"
                    >
                      הבא
                      <ChevronRight className="w-4 h-4 mr-1" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-8 gap-2">
                  {selectedLesson.content.slides.map((slide, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentSlide === index
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                      }`}
                      title={`שקופית ${index + 1}: ${slide.title || slide.type}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Current Slide Content */}
              <Card className="bg-gray-800/70 border border-gray-600/50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-200">
                    שקופית {currentSlide + 1}: {selectedLesson.content.slides[currentSlide]?.title || selectedLesson.content.slides[currentSlide]?.type}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span>תצוגה מקדימה</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-600/30 min-h-[400px]">
                  {renderSlide(selectedLesson.content.slides[currentSlide])}
                </div>
              </Card>

              {/* Notes for Current Slide */}
              <Card className="bg-gray-800/70 border border-gray-600/50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-200">הערות לשקופית {currentSlide + 1}</h4>
                  <span className="text-sm text-gray-400">{getCurrentNotes().length} הערות</span>
                </div>
                
                <div className="space-y-3">
                  {getCurrentNotes().length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400">אין הערות לשקופית זו</p>
                      <p className="text-gray-500 text-sm mt-1">הוסף הערה חדשה</p>
                    </div>
                  ) : (
                    getCurrentNotes().map((note) => (
                      <div key={note.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-white font-semibold">{note.title}</h5>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{note.content}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{note.createdAt.toLocaleDateString('he-IL')}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          ) : (
            <Card className="bg-gray-800/70 border border-gray-600/50">
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-200 mb-2">בחר שיעור</h3>
                <p className="text-gray-400">בחר שיעור מהרשימה כדי להתחיל להוסיף הערות</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Add Note Modal */}
      {showAddNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-200">הוסף הערה</h3>
              <button
                onClick={() => setShowAddNote(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">כותרת</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                  placeholder="כותרת ההערה"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">תוכן</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                  placeholder="תוכן ההערה"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">מספר שקופית</label>
                <input
                  type="number"
                  min="1"
                  max={selectedLesson?.content.slides.length || 1}
                  value={newNote.slideNumber}
                  onChange={(e) => setNewNote({ ...newNote, slideNumber: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleAddNote}
                  variant="primary"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  שמור הערה
                </Button>
                <Button
                  onClick={() => setShowAddNote(false)}
                  variant="secondary"
                  className="flex-1 bg-gray-600 hover:bg-gray-500"
                >
                  ביטול
                </Button>
              </div>
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
            </div>
          </div>
        </div>
      )}
<<<<<<< HEAD

      {/* Note Edit Modal */}
      <AnimatePresence>
        {showNoteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-100">
                  {isEditingNote ? 'ערוך הערה' : 'הוסף הערה'}
                </h3>
                <button
                  onClick={() => setShowNoteModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    הערה לשקופית {selectedNoteSlide?.slideIndex + 1}
                  </label>
                  <textarea
                    value={editingNoteText}
                    onChange={(e) => setEditingNoteText(e.target.value)}
                    placeholder="כתוב את ההערה שלך כאן..."
                    className="w-full h-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowNoteModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-gray-200 transition-colors"
                  >
                    ביטול
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-gray-100 transition-colors"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    שמור
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
=======
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
    </div>
  );
};

export default TeacherNotes; 