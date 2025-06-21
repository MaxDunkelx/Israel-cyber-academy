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
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoStart = () => {
    setVideoStarted(true);
    onAnswer(slide.id, { started: true, isCorrect: true });
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    onAnswer(slide.id, { completed: true, isCorrect: true });
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
            {content.description}
          </p>
        </div>

        {/* Video Container */}
        <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl flex-1 flex flex-col justify-center">
          <div className="aspect-video w-full max-h-64">
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
          
          {/* Play Button Overlay */}
          {!videoStarted && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all duration-300 cursor-pointer" onClick={handleVideoStart}>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Play className="w-8 h-8 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Completion Status */}
        {videoEnded && (
          <div className="mt-3 text-center flex-shrink-0">
            <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-3">
              <h3 className="text-lg font-bold text-green-400 mb-1">וידאו הושלם!</h3>
              <p className="text-gray-300 text-xs">הצפייה שלך נשמרה בהצלחה</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSlide; 