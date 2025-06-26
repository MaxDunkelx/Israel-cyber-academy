import { useState } from 'react';
import DragDropExercise from '../exercises/DragDropExercise';
import MatchingExercise from '../exercises/MatchingExercise';
import MultipleChoiceExercise from '../exercises/MultipleChoiceExercise';
import WindowsSimulator from '../exercises/WindowsSimulator';
import LinuxSimulator from '../exercises/LinuxSimulator';
import NetworkSimulator from '../exercises/NetworkSimulator';
import ProtocolSimulator from '../exercises/ProtocolSimulator';
import CodeEditor from '../exercises/CodeEditor';
import WebsiteBuilder from '../exercises/WebsiteBuilder';
import DatabaseSimulator from '../exercises/DatabaseSimulator';
import BrowserSimulator from '../exercises/BrowserSimulator';

/**
 * Interactive Slide Component
 * Renders interactive exercises (drag-drop, matching, multiple-choice, windows-simulator, linux-simulator, network-simulator, protocol-simulator)
 * 
 * @param {Object} props - Component props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onAnswer - Answer submission handler
 * @param {Object} props.answers - Current answers state
 */
const InteractiveSlide = ({ slide, onAnswer, answers }) => {
  // Add null checks and default values
  const content = slide?.content || {};
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  const handleExerciseComplete = (isCorrect) => {
    setExerciseCompleted(true);
    onAnswer(slide.id, { completed: true, isCorrect });
  };

  // Show loading state if content is not ready
  if (!content || !content.type) {
    return (
      <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center p-8" style={{ minHeight: '500px' }}>
        <div className="max-w-5xl w-full h-full flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
              {slide?.title || 'Loading...'}
            </h2>
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center p-8" style={{ minHeight: '500px' }}>
      <div className="max-w-5xl w-full h-full flex flex-col">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            {slide?.title || 'Interactive Exercise'}
          </h2>
          <p className="text-xl text-gray-200" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            {content.instructions || 'Complete the interactive exercise below'}
          </p>
        </div>

        {/* Exercise Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl flex-1 flex flex-col justify-center">
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
          {content.type === 'quiz' && (
            <MultipleChoiceExercise
              exercise={content}
              onComplete={handleExerciseComplete}
            />
          )}
          {content.type === 'windows-simulator' && (
            <WindowsSimulator
              exercise={content}
              onComplete={handleExerciseComplete}
            />
          )}
          {content.type === 'linux-simulator' && (
            <LinuxSimulator
              commands={content.commands || []}
              instructions={content.instructions || 'Try Linux commands in this safe simulator'}
              onComplete={handleExerciseComplete}
            />
          )}
          {content.type === 'network-simulator' && (
            <NetworkSimulator
              exercise={content}
              onComplete={handleExerciseComplete}
            />
          )}
          {content.type === 'protocol-simulator' && (
            <ProtocolSimulator
              content={content}
              onComplete={handleExerciseComplete}
            />
          )}
          {content.type === 'code-editor' && (
            <CodeEditor
              content={content}
              onComplete={handleExerciseComplete}
            />
          )}
          {content.type === 'website-builder' && (
            <WebsiteBuilder
              content={content}
              onComplete={handleExerciseComplete}
            />
          )}
          {content.type === 'database-simulator' && (
            <DatabaseSimulator
              content={content}
              onComplete={handleExerciseComplete}
            />
          )}
          {content.type === 'browser-simulator' && (
            <BrowserSimulator
              content={content}
              onComplete={handleExerciseComplete}
            />
          )}
        </div>

        {/* Completion Status */}
        {exerciseCompleted && (
          <div className="mt-8 text-center">
            <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-green-400 mb-2">תרגיל הושלם!</h3>
              <p className="text-gray-300">כל הכבוד! התשובה שלך נשמרה בהצלחה</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveSlide; 