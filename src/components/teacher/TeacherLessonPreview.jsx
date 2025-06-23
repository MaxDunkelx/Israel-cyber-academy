import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PresentationSlide, PollSlide, VideoSlide, InteractiveSlide, BreakSlide, ReflectionSlide, QuizSlide } from '../slides';
import DragDropExercise from '../exercises/DragDropExercise';
import MatchingExercise from '../exercises/MatchingExercise';
import MultipleChoiceExercise from '../exercises/MultipleChoiceExercise';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TeacherLessonPreview = ({ lesson, currentSlideIndex, onSlideChange, isPreviewMode = true }) => {
  const { currentUser } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(currentSlideIndex || 0);
  const [answers, setAnswers] = useState({});
  const [completedSlides, setCompletedSlides] = useState({});

  useEffect(() => {
    if (typeof currentSlideIndex === 'number' && currentSlideIndex >= 0) {
      setCurrentSlide(currentSlideIndex);
    } else {
      setCurrentSlide(0);
    }
  }, [currentSlideIndex]);

  const handleNextSlide = () => {
    if (lesson?.content?.slides && currentSlide < lesson.content.slides.length - 1) {
      const newSlideIndex = currentSlide + 1;
      setCurrentSlide(newSlideIndex);
      onSlideChange?.(newSlideIndex);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      const newSlideIndex = currentSlide - 1;
      setCurrentSlide(newSlideIndex);
      onSlideChange?.(newSlideIndex);
    }
  };

  const handleSlideClick = (slideIndex) => {
    setCurrentSlide(slideIndex);
    onSlideChange?.(slideIndex);
  };

  const handleAnswer = (slideId, answer) => {
    setAnswers(prev => ({ ...prev, [slideId]: answer }));
    setCompletedSlides(prev => ({ ...prev, [slideId]: true }));
  };

  const renderSlide = (slide) => {
    if (!slide || !slide.type) {
      console.warn('Invalid slide data:', slide);
      return (
        <div className="text-center text-white p-8">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold mb-2">Invalid Slide</h2>
          <p className="text-gray-400">This slide could not be loaded</p>
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
          console.warn('Unknown slide type:', slide.type);
          return <PresentationSlide slide={slide} />;
      }
    } catch (error) {
      console.error('Error rendering slide:', error, slide);
      return (
        <div className="text-center text-white p-8">
          <div className="text-4xl mb-4">❌</div>
          <h2 className="text-2xl font-semibold mb-2">Error Loading Slide</h2>
          <p className="text-gray-400">There was an error rendering this slide</p>
        </div>
      );
    }
  };

  if (!lesson || !lesson.content?.slides) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold mb-2">No Lesson Selected</h2>
          <p className="text-gray-400">Please select a lesson to preview</p>
        </div>
      </div>
    );
  }

  const slides = lesson.content.slides;
  
  // Safety check for slides array
  if (!Array.isArray(slides) || slides.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold mb-2">No Slides Available</h2>
          <p className="text-gray-400">This lesson has no slides to display</p>
        </div>
      </div>
    );
  }

  // Safety check for current slide index
  const safeCurrentSlide = Math.max(0, Math.min(currentSlide, slides.length - 1));
  const currentSlideData = slides[safeCurrentSlide];

  // If current slide is out of bounds, reset to 0
  if (safeCurrentSlide !== currentSlide) {
    setCurrentSlide(safeCurrentSlide);
  }

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* Navigation Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <span className="text-white font-medium">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            
            <button
              onClick={handleNextSlide}
              disabled={currentSlide === slides.length - 1}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-white text-sm">
            {currentSlideData?.title || `Slide ${currentSlide + 1}`}
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 overflow-auto bg-gray-900">
        <div className="max-w-4xl mx-auto p-6">
          {currentSlideData && renderSlide(currentSlideData)}
        </div>
      </div>
    </div>
  );
};

export default TeacherLessonPreview; 