import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

/**
 * Poll Slide Component
 * Renders interactive polling slides
 * 
 * @param {Object} props - Component props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onAnswer - Answer submission handler
 */
const PollSlide = ({ slide, onAnswer }) => {
  const { content } = slide;
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleVote = (optionId) => {
    setSelectedOption(optionId);
    setShowResults(true);
    onAnswer(slide.id, { selectedOption: optionId, isCorrect: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full h-full flex flex-col">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            {slide.title}
          </h2>
        </div>

        {/* Content Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl flex-1 flex flex-col justify-center">
          {/* Question */}
          <div className="text-center mb-8">
            <p className="text-2xl text-gray-200" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              {content.question}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.options?.map((option, idx) => (
              <button
                key={option.id || idx}
                onClick={() => handleVote(option.id)}
                disabled={showResults}
                className={`p-5 rounded-2xl border-4 transition-all duration-300 transform hover:scale-105 text-lg md:text-xl lg:text-2xl font-bold tracking-wide select-none focus:outline-none focus:ring-4 focus:ring-blue-400/50 ${
                  selectedOption === option.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-400 text-white shadow-2xl'
                    : 'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20'
                }`}
                tabIndex={0}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl md:text-3xl">{option.emoji}</span>
                    <span className="text-lg md:text-xl lg:text-2xl font-semibold">{option.text}</span>
                  </div>
                  {selectedOption === option.id && (
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Results */}
          {showResults && (
            <div className="mt-8 text-center">
              <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-green-400 mb-2">תודה על התשובה!</h3>
                <p className="text-gray-300">התשובה שלך נשמרה בהצלחה</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollSlide; 