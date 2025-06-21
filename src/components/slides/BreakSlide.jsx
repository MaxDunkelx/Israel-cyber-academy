import { useState } from 'react';
import { Coffee, Play } from 'lucide-react';

/**
 * Break Slide Component
 * Renders break and pause slides
 * 
 * @param {Object} props - Component props
 * @param {Object} props.slide - Slide data
 */
const BreakSlide = ({ slide }) => {
  const { content } = slide;
  const [breakCompleted, setBreakCompleted] = useState(false);

  const handleContinue = () => {
    setBreakCompleted(true);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center p-4" style={{ minHeight: '500px' }}>
      <div className="max-w-4xl w-full h-full flex flex-col justify-center text-center">
        {/* Break Icon */}
        <div className="mb-4 flex-shrink-0">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
            <Coffee className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 flex-shrink-0" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
          {slide.title}
        </h2>

        {/* Message */}
        <p className="text-lg md:text-xl text-gray-200 mb-4 flex-shrink-0" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          {content.message}
        </p>

        {/* Timer or Activity */}
        {content.timer && (
          <div className="mb-4 flex-shrink-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-base text-white mb-1">זמן הפסקה</p>
              <div className="text-2xl font-bold text-orange-400">{content.timer}</div>
            </div>
          </div>
        )}

        {/* Activities */}
        {content.activities && (
          <div className="mb-4 flex-shrink-0">
            <h3 className="text-lg font-bold text-white mb-2">פעילויות מומלצות:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {content.activities.map((activity, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <span className="text-sm text-white">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={breakCompleted}
          className={`px-4 py-2 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-105 flex-shrink-0 ${
            breakCompleted
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 shadow-2xl'
          }`}
        >
          <div className="flex items-center justify-center">
            <Play className="w-4 h-4 mr-2" />
            המשך שיעור
          </div>
        </button>

        {/* Completion Status */}
        {breakCompleted && (
          <div className="mt-3 flex-shrink-0">
            <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-2">
              <p className="text-green-400 font-medium text-xs">מוכן להמשיך!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreakSlide; 