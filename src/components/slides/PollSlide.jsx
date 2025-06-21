import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

/**
 * Poll Slide Component
 * Renders interactive polling slides
 * 
 * @param {Object} props - Component props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onAnswer - Answer submission handler
 * @param {Object} props.answers - Current answers state
 */
const PollSlide = ({ slide, onAnswer, answers }) => {
  const { content } = slide;
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleVote = (optionId) => {
    setSelectedOption(optionId);
    setShowResults(true);
    onAnswer(slide.id, { selectedOption: optionId, isCorrect: true });
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center p-4" style={{ minHeight: '500px' }}>
      <div className="max-w-4xl w-full h-full flex flex-col">
        {/* Question */}
        <div className="text-center mb-6 flex-shrink-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            {slide.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-200" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            {content.question}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 flex flex-col justify-center">
          {content.options?.map((option) => (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={showResults}
              className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedOption === option.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-400 text-white shadow-2xl'
                  : 'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl mr-2">{option.emoji}</span>
                  <span className="text-sm font-medium">{option.text}</span>
                </div>
                {selectedOption === option.id && (
                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <CheckCircle className="w-2 h-2 text-blue-600" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Results */}
        {showResults && (
          <div className="mt-3 text-center flex-shrink-0">
            <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-3">
              <h3 className="text-lg font-bold text-green-400 mb-1">תודה על התשובה!</h3>
              <p className="text-gray-300 text-xs">התשובה שלך נשמרה בהצלחה</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollSlide; 