import { useState } from 'react';
import DragDropExercise from '../exercises/DragDropExercise';
import MatchingExercise from '../exercises/MatchingExercise';
import MultipleChoiceExercise from '../exercises/MultipleChoiceExercise';

/**
 * Interactive Slide Component
 * Renders interactive exercises (drag-drop, matching, multiple-choice)
 * 
 * @param {Object} props - Component props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onAnswer - Answer submission handler
 * @param {Object} props.answers - Current answers state
 */
const InteractiveSlide = ({ slide, onAnswer, answers }) => {
  const { content } = slide;
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  const handleExerciseComplete = (isCorrect) => {
    setExerciseCompleted(true);
    onAnswer(slide.id, { completed: true, isCorrect });
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center p-4" style={{ minHeight: '500px' }}>
      <div className="max-w-4xl w-full h-full flex flex-col">
        {/* Title */}
        <div className="text-center mb-4 flex-shrink-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            {slide.title}
          </h2>
          <p className="text-base md:text-lg text-gray-200" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            {content.instructions}
          </p>
        </div>

        {/* Exercise Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-2xl flex-1 flex flex-col justify-center">
          {content.type === 'drag-drop' && (
            <DragDropExercise
              exercise={content}
              onComplete={handleExerciseComplete}
            />
          )}
          {content.type === 'matching' && (
            <MatchingExercise
              exercise={content}
              onComplete={handleExerciseComplete}
            />
          )}
          {content.type === 'multiple-choice' && (
            <MultipleChoiceExercise
              exercise={content}
              onComplete={handleExerciseComplete}
            />
          )}
        </div>

        {/* Completion Status */}
        {exerciseCompleted && (
          <div className="mt-3 text-center flex-shrink-0">
            <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-3">
              <h3 className="text-lg font-bold text-green-400 mb-1">תרגיל הושלם!</h3>
              <p className="text-gray-300 text-xs">כל הכבוד! התשובה שלך נשמרה בהצלחה</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveSlide; 