import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { saveTeacherNotes, getTeacherNotesForLesson } from '../../firebase/teacher-service';
import TeacherLessonPreview from './TeacherLessonPreview';
import LoadingSpinner from '../common/LoadingSpinner';
import { lessons } from '../../data/lessons';

const SlidePreviewManager = () => {
  const { currentUser } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load notes when a lesson is selected
  const loadNotesForLesson = async (lessonId) => {
    if (!currentUser?.uid || !lessonId) return;
    
    try {
      const userNotes = await getTeacherNotesForLesson(currentUser.uid, lessonId);
      const notesMap = {};
      userNotes.forEach(note => {
        const key = `${note.lessonId}-${note.slideIndex}`;
        notesMap[key] = note.content;
      });
      setNotes(notesMap);
      
      // Set current note for the first slide
      const firstSlideKey = `${lessonId}-0`;
      setCurrentNote(notesMap[firstSlideKey] || '');
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleSaveNote = async () => {
    if (!currentUser?.uid || !selectedLesson || currentNote.trim() === '') return;
    
    setSaving(true);
    try {
      const slideId = selectedLesson.content?.slides?.[currentSlide]?.id || `slide-${currentSlide + 1}`;
      
      await saveTeacherNotes(currentUser.uid, selectedLesson.id.toString(), slideId, {
        content: currentNote.trim(),
        slideIndex: currentSlide,
        timestamp: new Date().toISOString()
      });
      
      // Update local state
      const key = `${selectedLesson.id}-${currentSlide}`;
      setNotes(prev => ({ ...prev, [key]: currentNote.trim() }));
      
      setSaving(false);
    } catch (error) {
      console.error('Error saving note:', error);
      setSaving(false);
    }
  };

  const handleSlideChange = (newSlideIndex) => {
    setCurrentSlide(newSlideIndex);
    const key = `${selectedLesson.id}-${newSlideIndex}`;
    setCurrentNote(notes[key] || '');
  };

  const handleLessonChange = (lessonId) => {
    const lesson = lessons.find(l => l.id.toString() === lessonId);
    setSelectedLesson(lesson);
    setCurrentSlide(0);
    
    if (lesson) {
      loadNotesForLesson(lesson.id.toString());
    } else {
      setNotes({});
      setCurrentNote('');
    }
  };

  const getNoteForSlide = (lessonId, slideIndex) => {
    const key = `${lessonId}-${slideIndex}`;
    return notes[key] || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Teacher Lesson Preview</h1>
          <div className="flex items-center space-x-4">
            <select
              value={selectedLesson?.id || ''}
              onChange={(e) => handleLessonChange(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2"
            >
              <option value="">Select a Lesson</option>
              {lessons.map(lesson => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          {selectedLesson && (
            <>
              {/* Lesson Info */}
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-2">{selectedLesson.title}</h2>
                <div className="text-sm text-gray-400">
                  {selectedLesson.content?.slides?.length || 0} slides
                </div>
              </div>

              {/* Slide Navigation */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Slides</h3>
                <div className="space-y-2">
                  {selectedLesson.content?.slides?.map((slide, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlideChange(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentSlide === index
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium truncate">
                            {slide.title || `Slide ${index + 1}`}
                          </div>
                          <div className="text-sm opacity-75">{slide.type || 'presentation'}</div>
                        </div>
                        {getNoteForSlide(selectedLesson.id, index) && (
                          <div className="w-2 h-2 bg-yellow-400 rounded-full ml-2"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {selectedLesson ? (
            <>
              {/* Interactive Lesson Preview */}
              <div className="flex-1 bg-gray-900 overflow-hidden">
                <TeacherLessonPreview
                  lesson={selectedLesson}
                  currentSlideIndex={currentSlide}
                  onSlideChange={handleSlideChange}
                  isPreviewMode={true}
                />
              </div>

              {/* Notes Panel */}
              <div className="h-64 bg-gray-800 border-t border-gray-700 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    Teacher Notes - Slide {currentSlide + 1}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {/* Notes Summary */}
                    <div className="text-sm text-gray-400">
                      {Object.keys(notes).filter(key => notes[key] && notes[key].trim()).length} notes saved
                    </div>
                    <button
                      onClick={handleSaveNote}
                      disabled={saving || currentNote.trim() === ''}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {saving ? 'Saving...' : 'Save Note'}
                    </button>
                  </div>
                </div>
                
                {/* Existing Note Indicator */}
                {getNoteForSlide(selectedLesson.id, currentSlide) && (
                  <div className="mb-3 p-2 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                    <div className="text-sm text-yellow-300 font-medium mb-1">📝 Existing Note:</div>
                    <div className="text-sm text-yellow-200">
                      {getNoteForSlide(selectedLesson.id, currentSlide)}
                    </div>
                  </div>
                )}
                
                <textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder={getNoteForSlide(selectedLesson.id, currentSlide) 
                    ? "Edit your existing note for this slide..." 
                    : "Add your notes for this slide..."}
                  className="w-full h-32 bg-gray-700 text-white border border-gray-600 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
                <div className="text-sm text-gray-400 mt-2">
                  Notes are automatically saved to your personal database.
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <div className="text-4xl text-gray-400 mb-4">📚</div>
                <h2 className="text-2xl font-semibold text-white mb-2">Select a Lesson</h2>
                <p className="text-gray-400">Choose a lesson from the dropdown to start previewing slides</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlidePreviewManager; 