import React, { useState, useEffect } from 'react';
import { 
  getTeacherNotesForLesson, 
  saveTeacherNotes, 
  deleteTeacherNotes,
  logTeacherActivity 
} from '../../firebase/teacher-service';
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
  const [error, setError] = useState(null);

  const lessonNames = {
    'lesson1': 'שיעור 1: מבוא לסייבר',
    'lesson2': 'שיעור 2: מבנה המחשב',
    'lesson3': 'שיעור 3: מערכת ההפעלה Windows',
    'lesson4': 'שיעור 4: מערכת ההפעלה Linux',
    'lesson5': 'שיעור 5: רשתות מחשבים',
    'lesson6': 'שיעור 6: פרוטוקולים',
    'lesson7': 'שיעור 7: תכנות ווב',
    'lesson8': 'שיעור 8: מסדי נתונים',
    'lesson9': 'שיעור 9: דפדפנים ואבטחה',
  };

  // Load lesson data
  const loadLessonData = async (lessonId) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const lessonModule = await import(`../../data/lessons/${lessonId}/index.js`);
      const lesson = lessonModule.default || lessonModule[lessonId] || lessonModule;
      
      if (!lesson || !lesson.content || !lesson.content.slides) {
        throw new Error(`Invalid lesson structure for ${lessonId}`);
      }
      
      setSlides(lesson.content.slides);
      setSelectedSlideIndex(0);
      await loadNotes(lessonId);
      
    } catch (err) {
      console.error('Error loading lesson:', err);
      setError(`שגיאה בטעינת השיעור: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Load notes for a specific lesson
  const loadNotes = async (lessonId) => {
    if (!currentUser?.uid) return;
    try {
      const lessonNotes = await getTeacherNotesForLesson(currentUser.uid, lessonId);
      
      const notesObject = {};
      lessonNotes.forEach(note => {
        notesObject[note.slideId] = note.content;
      });
      
      setNotes(notesObject);
      const slideId = slides[selectedSlideIndex]?.id || `slide-${selectedSlideIndex + 1}`;
      setCurrentNote(notesObject[slideId] || '');
    } catch (err) {
      console.error('Error loading notes:', err);
      setError(`שגיאה בטעינת הערות: ${err.message}`);
    }
  };

  // Handle lesson selection
  const handleLessonChange = async (lessonId) => {
    setSelectedLesson(lessonId);
    await loadLessonData(lessonId);
  };

  // Handle slide selection
  const handleSlideChange = (index) => {
    if (index >= 0 && index < slides.length) {
      setSelectedSlideIndex(index);
      const slideId = slides[index]?.id || `slide-${index + 1}`;
      setCurrentNote(notes[slideId] || '');
    }
  };

  // Save note
  const handleSaveNote = async () => {
    if (!currentUser?.uid || !selectedLesson) return;
    try {
      const slideId = slides[selectedSlideIndex]?.id || `slide-${selectedSlideIndex + 1}`;
      const slideTitle = slides[selectedSlideIndex]?.title || `שקופית ${selectedSlideIndex + 1}`;
      
      await saveTeacherNotes(currentUser.uid, selectedLesson, slideId, {
        content: currentNote
      });
      
      setNotes(prev => ({ ...prev, [slideId]: currentNote }));
      
      if (currentNote.trim()) {
        await logTeacherActivity(currentUser.uid, {
          type: 'note_added',
          title: 'הערה נוספה',
          description: `הערה נוספה לשיעור ${lessonNames[selectedLesson]}, שקופית ${slideTitle}`,
          metadata: {
            lessonId: selectedLesson,
            lessonName: lessonNames[selectedLesson],
            slideId,
            slideTitle,
            noteLength: currentNote.length
          }
        });
      }
    } catch (err) {
      console.error('Error saving note:', err);
      setError(`שגיאה בשמירת ההערה: ${err.message}`);
    }
  };

  // Delete note
  const handleDeleteNote = async () => {
    if (!currentUser?.uid || !selectedLesson) return;
    try {
      const slideId = slides[selectedSlideIndex]?.id || `slide-${selectedSlideIndex + 1}`;
      const slideTitle = slides[selectedSlideIndex]?.title || `שקופית ${selectedSlideIndex + 1}`;
      
      await deleteTeacherNotes(currentUser.uid, selectedLesson, slideId);
      
      setNotes(prev => {
        const newNotes = { ...prev };
        delete newNotes[slideId];
        return newNotes;
      });
      
      setCurrentNote('');
      
      await logTeacherActivity(currentUser.uid, {
        type: 'note_deleted',
        title: 'הערה נמחקה',
        description: `הערה נמחקה משיעור ${lessonNames[selectedLesson]}, שקופית ${slideTitle}`,
        metadata: {
          lessonId: selectedLesson,
          lessonName: lessonNames[selectedLesson],
          slideId,
          slideTitle
        }
      });
    } catch (err) {
      console.error('Error deleting note:', err);
      setError(`שגיאה במחיקת ההערה: ${err.message}`);
    }
  };

  // Auto-save note after typing
  useEffect(() => {
    if (!currentUser) return;
    const timeoutId = setTimeout(() => {
      if (currentNote !== (notes[slides[selectedSlideIndex]?.id || `slide-${selectedSlideIndex + 1}`] || '')) {
        handleSaveNote();
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [currentNote]);

  // Load initial lesson if none selected
  useEffect(() => {
    if (!selectedLesson && Object.keys(lessonNames).length > 0) {
      const firstLesson = Object.keys(lessonNames)[0];
      handleLessonChange(firstLesson);
    }
  }, []);

  if (!currentUser) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">יש להתחבר כדי לצפות בהערות</p>
      </div>
    );
  }

  const currentSlide = slides[selectedSlideIndex];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-lg shadow-sm p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">הערות אישיות</h2>
          <p className="text-gray-600 text-sm">הוסף הערות אישיות לכל שקופית בשיעורים</p>
        </div>
        <div className="mt-4 md:mt-0">
          <select
            value={selectedLesson}
            onChange={(e) => handleLessonChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
          >
            <option value="">בחר שיעור...</option>
            {Object.entries(lessonNames).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">טוען שיעור...</p>
        </div>
      ) : selectedLesson && slides.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Slide Preview */}
          <div className="lg:w-1/2 flex flex-col items-center">
            <div className="mb-4 w-full flex items-center justify-between">
              <button
                onClick={() => handleSlideChange(selectedSlideIndex - 1)}
                disabled={selectedSlideIndex === 0}
                className={`rounded-full p-2 border ${selectedSlideIndex === 0 ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'} transition`}
              >
                <ChevronRight size={20} />
              </button>
              <span className="text-sm text-gray-700 font-medium">
                {currentSlide?.title || `שקופית ${selectedSlideIndex + 1}`}
              </span>
              <button
                onClick={() => handleSlideChange(selectedSlideIndex + 1)}
                disabled={selectedSlideIndex === slides.length - 1}
                className={`rounded-full p-2 border ${selectedSlideIndex === slides.length - 1 ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'} transition`}
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            
            {/* Simple slide preview */}
            <div className="w-64 h-40 bg-gray-100 rounded-lg border border-gray-200 p-4 flex flex-col justify-center items-center text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {currentSlide?.title || `שקופית ${selectedSlideIndex + 1}`}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                סוג: {currentSlide?.type || 'presentation'}
              </p>
              {currentSlide?.content?.question && (
                <p className="text-xs text-gray-500 truncate w-full">
                  {currentSlide.content.question}
                </p>
              )}
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              {selectedSlideIndex + 1} מתוך {slides.length} שקופיות
            </div>
          </div>

          {/* Notes Editor */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="bg-white rounded-lg shadow-md p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">הערות אישיות לשקופית</h3>
                {currentNote.trim() && (
                  <button
                    onClick={handleDeleteNote}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 size={16} /> מחק
                  </button>
                )}
              </div>
              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="הוסף הערות אישיות על השקופית הזו..."
                className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 bg-gray-50"
              />
              <div className="mt-2 text-xs text-gray-500">
                {currentNote.length} תווים
              </div>
            </div>
          </div>
        </div>
      ) : selectedLesson ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-600">לא נמצאו שקופיות בשיעור זה</p>
        </div>
      ) : null}
    </div>
  );
};

export default Notes; 