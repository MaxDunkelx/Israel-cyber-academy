/**
 * TeacherNotes Component - Israel Cyber Academy
 * 
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
 * - Security logging
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
    }
  };

  /**
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
    }
  };

  /**
   * Navigate to previous slide
   */
  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  /**
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
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
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
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default TeacherNotes; 