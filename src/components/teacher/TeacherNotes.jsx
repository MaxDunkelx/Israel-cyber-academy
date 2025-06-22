/**
 * TeacherNotes Component - Israel Cyber Academy
 * 
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
 * - Security logging
 * 
 * @component
 */

import React, { useState, useEffect } from 'react';
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
    }
  };

  /**
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
    }
  };

  /**
   * Navigate to previous slide
   * Updates current slide index if possible
   */
  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  /**
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
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherNotes; 