import React, { useState, useEffect } from 'react';
import { 
  getTeacherNotesForLesson, 
  saveTeacherNotes, 
  deleteTeacherNotes,
  logTeacherActivity 
} from '../../firebase/teacher-service';
import { getLessonWithSlides, getAllLessons } from '../../firebase/content-service';
import { useAuth } from '../../hooks/useAuth';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

const Notes = () => {
  const { currentUser } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState('');
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [slides, setSlides] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);

  // Load all lessons from database
  const loadAllLessons = async () => {
    try {
      setIsLoading(true);
      console.log('🔍 Loading all lessons from database...');
      
      const lessonsData = await getAllLessons();
      console.log('✅ Loaded lessons from database:', lessonsData);
      
      setLessons(lessonsData);
      
      // Auto-select first lesson if available
      if (lessonsData.length > 0 && !selectedLesson) {
        const firstLesson = lessonsData[0];
        await loadLessonData(firstLesson.id);
      }
      
    } catch (error) {
      console.error('❌ Error loading lessons:', error);
      setError(`שגיאה בטעינת השיעורים: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Load lesson data from Firebase
  const loadLessonData = async (lessonId) => {
    try {
      setError(null);
      setIsLoading(true);
      
      console.log('🔍 Loading lesson data for:', lessonId);
      
      const lessonData = await getLessonWithSlides(lessonId);
      if (lessonData && lessonData.slides && lessonData.slides.length > 0) {
        console.log('✅ Lesson data loaded from Firebase:', lessonData);
        setSlides(lessonData.slides);
        setSelectedLesson(lessonId);
        setSelectedSlideIndex(0);
        await loadNotes(lessonId);
      } else {
        throw new Error(`No slides found for lesson ${lessonId}`);
      }
      
    } catch (err) {
      console.error('❌ Error loading lesson:', err);
      setError(`שגיאה בטעינת השיעור: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Load notes for a specific lesson
  const loadNotes = async (lessonId) => {
    if (!currentUser?.uid) return;
    try {
      console.log('🔍 Loading notes for lesson:', lessonId);
      
      const lessonNotes = await getTeacherNotesForLesson(currentUser.uid, lessonId);
      console.log('✅ Loaded notes from database:', lessonNotes);
      
      const notesObject = {};
      lessonNotes.forEach(note => {
        // Use slideIndex as key for better consistency
        notesObject[note.slideIndex] = note.content;
      });
      
      setNotes(notesObject);
      setCurrentNote(notesObject[selectedSlideIndex] || '');
      
    } catch (err) {
      console.error('❌ Error loading notes:', err);
      setError(`שגיאה בטעינת הערות: ${err.message}`);
    }
  };

  // Handle lesson selection
  const handleLessonChange = async (lessonId) => {
    console.log('🔄 Lesson changed to:', lessonId);
    await loadLessonData(lessonId);
  };

  // Handle slide selection
  const handleSlideChange = (index) => {
    if (index >= 0 && index < slides.length) {
      console.log('🔄 Slide changed to:', index);
      setSelectedSlideIndex(index);
      setCurrentNote(notes[index] || '');
    }
  };

  // Save note
  const handleSaveNote = async () => {
    if (!currentUser?.uid || !selectedLesson) return;
    try {
      console.log('💾 Saving note for lesson:', selectedLesson, 'slide:', selectedSlideIndex);
      
      const slideId = slides[selectedSlideIndex]?.id || `slide-${selectedSlideIndex + 1}`;
      const slideTitle = slides[selectedSlideIndex]?.title || `שקופית ${selectedSlideIndex + 1}`;
      
      await saveTeacherNotes(currentUser.uid, selectedLesson, slideId, {
        content: currentNote,
        slideIndex: selectedSlideIndex
      });
      
      setNotes(prev => ({ ...prev, [selectedSlideIndex]: currentNote }));
      
      if (currentNote.trim()) {
        await logTeacherActivity(currentUser.uid, {
          type: 'note_added',
          title: 'הערה נוספה',
          description: `הערה נוספה לשיעור ${selectedLesson}, שקופית ${slideTitle}`,
          metadata: {
            lessonId: selectedLesson,
            slideId,
            slideTitle,
            noteLength: currentNote.length
          }
        });
      }
      
      console.log('✅ Note saved successfully');
      
    } catch (err) {
      console.error('❌ Error saving note:', err);
      setError(`שגיאה בשמירת ההערה: ${err.message}`);
    }
  };

  // Delete note
  const handleDeleteNote = async () => {
    if (!currentUser?.uid || !selectedLesson) return;
    try {
      console.log('🗑️ Deleting note for lesson:', selectedLesson, 'slide:', selectedSlideIndex);
      
      const slideId = slides[selectedSlideIndex]?.id || `slide-${selectedSlideIndex + 1}`;
      const slideTitle = slides[selectedSlideIndex]?.title || `שקופית ${selectedSlideIndex + 1}`;
      
      await deleteTeacherNotes(currentUser.uid, selectedLesson, slideId);
      
      setNotes(prev => {
        const newNotes = { ...prev };
        delete newNotes[selectedSlideIndex];
        return newNotes;
      });
      
      setCurrentNote('');
      
      await logTeacherActivity(currentUser.uid, {
        type: 'note_deleted',
        title: 'הערה נמחקה',
        description: `הערה נמחקה משיעור ${selectedLesson}, שקופית ${slideTitle}`,
        metadata: {
          lessonId: selectedLesson,
          slideId,
          slideTitle
        }
      });
      
      console.log('✅ Note deleted successfully');
      
    } catch (err) {
      console.error('❌ Error deleting note:', err);
      setError(`שגיאה במחיקת ההערה: ${err.message}`);
    }
  };

  // Auto-save note after typing
  useEffect(() => {
    if (!currentUser) return;
    const timeoutId = setTimeout(() => {
      if (currentNote !== (notes[selectedSlideIndex] || '')) {
        handleSaveNote();
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [currentNote]);

  // Load lessons on component mount
  useEffect(() => {
    loadAllLessons();
  }, []);

  if (!currentUser) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">יש להתחבר כדי לצפות בהערות</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">הערות מורה</h1>
              <p className="text-gray-600 mt-1">ניהול הערות אישיות לשיעורים</p>
            </div>
            
            {/* Lesson Selector */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">בחר שיעור:</label>
              <select
                value={selectedLesson}
                onChange={(e) => handleLessonChange(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">בחר שיעור</option>
                {lessons.map(lesson => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title || `שיעור ${lesson.id}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto mt-4 px-6">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {selectedLesson && slides.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Slide Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">שקופיות</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {slides.map((slide, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlideChange(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedSlideIndex === index
                          ? 'bg-blue-100 border border-blue-300 text-blue-900'
                          : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {slide.title || `שקופית ${index + 1}`}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{slide.type || 'presentation'}</div>
                        </div>
                        {notes[index] && (
                          <div className="w-2 h-2 bg-yellow-400 rounded-full ml-2"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes Editor */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    הערות - {slides[selectedSlideIndex]?.title || `שקופית ${selectedSlideIndex + 1}`}
                  </h2>
                  <div className="flex items-center space-x-2">
                    {notes[selectedSlideIndex] && (
                      <button
                        onClick={handleDeleteNote}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="מחק הערה"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Existing Note Display */}
                {notes[selectedSlideIndex] && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-sm text-yellow-800 font-medium mb-1">הערה קיימת:</div>
                    <div className="text-sm text-yellow-700">{notes[selectedSlideIndex]}</div>
                  </div>
                )}

                <textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder={notes[selectedSlideIndex] 
                    ? "ערוך את ההערה הקיימת..." 
                    : "הוסף הערות לשקופית זו..."}
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    ההערות נשמרות אוטומטית למסד הנתונים האישי שלך
                  </p>
                  <div className="text-sm text-gray-500">
                    {Object.keys(notes).filter(key => notes[key] && notes[key].trim()).length} הערות שמורות
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl text-gray-300 mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">בחר שיעור</h2>
            <p className="text-gray-600">בחר שיעור מהרשימה כדי להתחיל להוסיף הערות</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes; 