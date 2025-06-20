import { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Video Slide Component
 * Renders video content slides
 * 
 * @param {Object} props - Component props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onAnswer - Answer submission handler
 * @param {Object} props.answers - Current answers state
 */
const VideoSlide = ({ slide, onAnswer, answers }) => {
  const { content } = slide;
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  const handleVideoStart = () => {
    setVideoStarted(true);
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    onAnswer(slide.id, { completed: true, isCorrect: true });
  };

  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            {slide.title}
          </h2>
          <p className="text-xl text-gray-200" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            {content.description}
          </p>
        </div>

        {/* Video Container */}
        <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          <div className="aspect-video">
            <iframe
              src={content.videoUrl}
              title={slide.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleVideoStart}
              onEnded={handleVideoEnd}
            />
          </div>
          
          {/* Video overlay with play button - only show if video hasn't started */}
          {!videoStarted && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all duration-300 cursor-pointer" onClick={handleVideoStart}>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Completion Status */}
        {videoEnded && (
          <div className="mt-8 text-center">
            <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-green-400 mb-2">וידאו הושלם!</h3>
              <p className="text-gray-300">הצפייה שלך נשמרה בהצלחה</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSlide; 