import { useState, useEffect } from 'react';
import { Play, AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Video Slide Component
 * Renders video content slides with enhanced error handling
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
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  // Enhanced YouTube URL processing with better error handling
  const getYouTubeEmbedUrl = (url) => {
    if (!url || typeof url !== 'string') {
      console.warn('Invalid video URL:', url);
      return null;
    }
    
    try {
      // Handle different YouTube URL formats
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = url.match(youtubeRegex);
      
      if (match) {
        const videoId = match[1];
        // Add more parameters to prevent blob errors and improve compatibility
        const params = new URLSearchParams({
          rel: '0',
          modestbranding: '1',
          showinfo: '0',
          autoplay: '0',
          enablejsapi: '1',
          origin: window.location.origin,
          widget_referrer: window.location.origin,
          hl: 'he',
          cc_load_policy: '1',
          iv_load_policy: '3',
          fs: '1',
          disablekb: '1',
          controls: '1'
        });
        
        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
      }
      
      // If it's already an embed URL, just add our parameters
      if (url.includes('youtube.com/embed/')) {
        const baseUrl = url.split('?')[0];
        const params = new URLSearchParams({
          rel: '0',
          modestbranding: '1',
          showinfo: '0',
          autoplay: '0',
          enablejsapi: '1',
          origin: window.location.origin,
          widget_referrer: window.location.origin,
          hl: 'he',
          cc_load_policy: '1',
          iv_load_policy: '3',
          fs: '1',
          disablekb: '1',
          controls: '1'
        });
        
        return `${baseUrl}?${params.toString()}`;
      }
      
      return url;
    } catch (error) {
      console.error('Error processing YouTube URL:', error);
      return null;
    }
  };

  // Alternative: Use YouTube Player API
  const useYouTubeAPI = () => {
    if (typeof window !== 'undefined' && !window.YT) {
      try {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } catch (error) {
        console.error('Error loading YouTube API:', error);
      }
    }
  };

  const embedUrl = getYouTubeEmbedUrl(content?.videoUrl);

  useEffect(() => {
    // Reset states when slide changes
    setVideoStarted(false);
    setVideoEnded(false);
    setVideoError(false);
    setIsLoading(true);
    setIframeKey(prev => prev + 1); // Force iframe reload
  }, [slide.id]);

  useEffect(() => {
    // Try YouTube API as fallback
    if (videoError && embedUrl && embedUrl.includes('youtube.com')) {
      useYouTubeAPI();
    }
  }, [videoError, embedUrl]);

  const handleVideoStart = () => {
    setIsLoading(false);
    setVideoStarted(true);
    setVideoError(false);
    if (onAnswer) {
      onAnswer(slide.id, { started: true, isCorrect: true });
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    if (onAnswer) {
      onAnswer(slide.id, { completed: true, isCorrect: true });
    }
  };

  const handleVideoError = (error) => {
    console.error('Video error:', error);
    setIsLoading(false);
    setVideoError(true);
    console.warn('Video failed to load:', content?.videoUrl);
  };

  const handleRetry = () => {
    setVideoError(false);
    setIsLoading(true);
    // Force iframe reload by changing key
    setIframeKey(prev => prev + 1);
    setVideoStarted(false);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setVideoError(false);
  };

  // Error boundary for the entire component
  if (!content?.videoUrl) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-5xl w-full h-full flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
              {slide.title}
            </h2>
            <p className="text-xl text-gray-200" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              {content?.description || 'תיאור הווידאו'}
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl flex-1 flex flex-col justify-center">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold text-white mb-2">אין URL וידאו</h3>
              <p className="text-gray-400">לא הוגדר URL וידאו עבור שקופית זו</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full h-full flex flex-col">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            {slide.title}
          </h2>
          <p className="text-xl text-gray-200" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            {content.description}
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl flex-1 flex flex-col justify-center">
          {/* Video Container */}
          <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl flex-1 flex flex-col justify-center">
            <div className="aspect-video">
              {!videoError && embedUrl ? (
                <iframe
                  key={`${slide.id}-${iframeKey}`} // Force reload on retry
                  src={embedUrl}
                  title={slide.title || 'Video Content'}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={handleIframeLoad}
                  onError={handleVideoError}
                  sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  importance="high"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-center">
                    <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
                    <h3 className="text-xl font-bold text-white mb-2">שגיאה בטעינת הווידאו</h3>
                    <p className="text-gray-400 mb-4">לא ניתן לטעון את הווידאו כרגע</p>
                    <button
                      onClick={handleRetry}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>נסה שוב</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Loading Overlay */}
            {isLoading && !videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-white">טוען וידאו...</p>
                </div>
              </div>
            )}
            
            {/* Play Button Overlay */}
            {!videoStarted && !isLoading && !videoError && (
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

          {/* Alternative Link */}
          {videoError && (
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm mb-2">או צפה בווידאו ישירות ב-YouTube:</p>
              <a
                href={content.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <span>פתח ב-YouTube</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoSlide; 