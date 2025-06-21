import { useState } from 'react';
import { Brain, Send } from 'lucide-react';

/**
 * Reflection Slide Component
 * Renders reflection and feedback slides
 * 
 * @param {Object} props - Component props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onAnswer - Answer submission handler
 * @param {Object} props.answers - Current answers state
 */
const ReflectionSlide = ({ slide, onAnswer, answers }) => {
  const { content } = slide;
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (reflection.trim()) {
      setSubmitted(true);
      onAnswer(slide.id, { reflection: reflection.trim(), isCorrect: true });
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center p-4" style={{ minHeight: '500px' }}>
      <div className="max-w-4xl w-full h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-4 flex-shrink-0">
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl mb-3">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            {slide.title}
          </h2>
          <p className="text-base md:text-lg text-gray-200" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            {content.prompt}
          </p>
        </div>

        {/* Reflection Input */}
        {!submitted ? (
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="כתוב את המחשבות שלך כאן..."
                className="w-full h-20 bg-transparent border-none outline-none text-white placeholder-gray-400 resize-none text-sm"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center flex-shrink-0">
              <button
                onClick={handleSubmit}
                disabled={!reflection.trim()}
                className={`px-4 py-2 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-105 ${
                  !reflection.trim()
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-2xl'
                }`}
              >
                <div className="flex items-center justify-center">
                  <Send className="w-4 h-4 mr-2" />
                  שלח מחשבות
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* Submitted State */
          <div className="text-center flex-1 flex flex-col justify-center">
            <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-4">
              <h3 className="text-lg font-bold text-green-400 mb-2">תודה על השיתוף!</h3>
              <p className="text-gray-300 mb-3 text-xs">המחשבות שלך נשמרו בהצלחה</p>
              
              {/* Show submitted reflection */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                <p className="text-white italic text-xs">"{reflection}"</p>
              </div>
            </div>
          </div>
        )}

        {/* Additional Questions */}
        {content.additionalQuestions && (
          <div className="mt-3 flex-shrink-0">
            <h3 className="text-lg font-bold text-white mb-2 text-center">שאלות נוספות למחשבה:</h3>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {content.additionalQuestions.map((question, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20"
                >
                  <p className="text-gray-200 text-xs">{question}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReflectionSlide; 