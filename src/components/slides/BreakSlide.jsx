import { useState } from 'react';
import { Coffee, Play } from 'lucide-react';

/**
 * Break Slide Component
 * Renders break/intermission slides
 * 
 * @param {Object} props - Component props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onAnswer - Answer submission handler
 * @param {Object} props.answers - Current answers state
 */
const BreakSlide = ({ slide, onAnswer, answers }) => {
  const { content } = slide;
  const [breakCompleted, setBreakCompleted] = useState(false);

  const handleContinue = () => {
    setBreakCompleted(true);
    onAnswer(slide.id, { completed: true, isCorrect: true });
  };

  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        {/* Break Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
            <Coffee className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-5xl font-bold text-white mb-6" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
          {slide.title}
        </h2>

        {/* Message */}
        <p className="text-2xl text-gray-200 mb-8" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          {content.message}
        </p>

        {/* Timer or Activity */}
        {content.timer && (
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <p className="text-xl text-white mb-2">זמן הפסקה</p>
              <div className="text-4xl font-bold text-orange-400">{content.timer}</div>
            </div>
          </div>
        )}

        {/* Activities */}
        {content.activities && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">פעילויות מומלצות:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.activities.map((activity, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <span className="text-lg text-white">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={breakCompleted}
          className={`px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 ${
            breakCompleted
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-2xl'
          }`}
        >
          <div className="flex items-center justify-center">
            <Play className="w-6 h-6 mr-2" />
            המשך שיעור
          </div>
        </button>

        {/* Completion Status */}
        {breakCompleted && (
          <div className="mt-6">
            <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-4">
              <p className="text-green-400 font-medium">מוכן להמשיך!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreakSlide; 