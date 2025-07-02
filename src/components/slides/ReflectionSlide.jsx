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
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full h-full flex flex-col">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            {slide.title}
          </h2>
          <p className="text-xl text-gray-200" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            {content.prompt}
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl flex-1 flex flex-col justify-center">
          {/* Reflection Input */}
          {!submitted ? (
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="כתוב את המחשבות שלך כאן..."
                  className="w-full h-32 bg-transparent border-none outline-none text-white placeholder-gray-400 resize-none"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  disabled={!reflection.trim()}
                  className={`px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    !reflection.trim()
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-2xl'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Send className="w-6 h-6 mr-2" />
                    שלח מחשבות
                  </div>
                </button>
              </div>
            </div>
          ) : (
            /* Submitted State */
            <div className="text-center">
              <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-green-400 mb-4">תודה על השיתוף!</h3>
                <p className="text-gray-300 mb-6">המחשבות שלך נשמרו בהצלחה</p>
                
                {/* Show submitted reflection */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-white italic">"{reflection}"</p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Questions */}
          {content.additionalQuestions && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">שאלות נוספות למחשבה:</h3>
              <div className="space-y-3">
                {content.additionalQuestions.map((question, index) => (
                  <div 
                    key={`question-${index}-${question.substring(0, 20)}`}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  >
                    <p className="text-gray-200">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReflectionSlide; 