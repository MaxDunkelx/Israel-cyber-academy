import { useState, useEffect, useCallback } from 'react';
import { Play, AlertCircle, RefreshCw, ExternalLink, SkipForward } from 'lucide-react';

/**
 * Video Slide Component with Session Sync Protection
 * Renders video content slides with enhanced error handling that prevents
 * YouTube errors from breaking live session synchronization
 * 
 * @param {Object} props - Component props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onAnswer - Answer submission handler
 * @param {Object} props.answers - Current answers state
 */
const isValidYouTubeUrl = (url) => {
  // Must be a non-empty string and match YouTube URL patterns
  if (typeof url !== 'string' || !url.trim()) return false;
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
};

const VideoSlide = ({ slide, onAnswer, answers }) => {
  const { content } = slide;
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const [sessionSyncProtected, setSessionSyncProtected] = useState(true);

  // Maximum retry attempts before showing fallback
  const MAX_RETRIES = 2;

  // Enhanced YouTube URL processing with better error handling
  const getYouTubeEmbedUrl = useCallback((url) => {
    if (!url || typeof url !== 'string') {
      console.warn('[VideoSlide] Invalid video URL:', url);
      return null;
    }
    
    try {
      // Handle different YouTube URL formats
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = url.match(youtubeRegex);
      
      if (match && match[1]) {
        const videoId = match[1];
        // Add parameters to prevent blob errors and improve compatibility
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
          controls: '1',
          // Add parameters to prevent blob errors
          allowfullscreen: '1',
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        });
        
        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
      }
      
      // If it's already an embed URL, extract video ID and rebuild with our parameters
      if (url.includes('youtube.com/embed/')) {
        const embedMatch = url.match(/youtube\.com\/embed\/([^"&?\/\s]{11})/);
        if (embedMatch && embedMatch[1]) {
          const videoId = embedMatch[1];
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
            controls: '1',
            allowfullscreen: '1',
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          });
          
          return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
        }
      }
      
      console.warn('[VideoSlide] Could not parse YouTube URL:', url);
      return null;
    } catch (error) {
      console.error('[VideoSlide] Error processing YouTube URL:', error);
      return null;
    }
  }, []);

  const embedUrl = getYouTubeEmbedUrl(content?.videoUrl);
  
  // Debug logging with session sync protection
  useEffect(() => {
    if (content?.videoUrl) {
      console.log('🎥 Video URL Debug:', {
        originalUrl: content.videoUrl,
        processedUrl: embedUrl,
        slideId: slide.id,
        slideTitle: slide.title,
        sessionSyncProtected
      });
    }
  }, [content?.videoUrl, embedUrl, slide.id, slide.title, sessionSyncProtected]);

  // Reset states when slide changes - CRITICAL for session sync
  useEffect(() => {
    console.log(`🔄 VideoSlide: Slide changed to ${slide.id}, resetting states`);
    setVideoStarted(false);
    setVideoEnded(false);
    setVideoError(false);
    setIsLoading(true);
    setRetryCount(0);
    setUseFallback(false);
    setIframeKey(prev => prev + 1); // Force iframe reload
    
    // Ensure session sync is protected
    setSessionSyncProtected(true);
  }, [slide.id]);

  // Session sync protection - ensure slide changes are always processed
  useEffect(() => {
    // Mark that we're ready to receive session updates
    setSessionSyncProtected(true);
    
    // Cleanup function to ensure we don't block session sync
    return () => {
      console.log(`🔄 VideoSlide: Cleaning up slide ${slide.id}`);
      setSessionSyncProtected(false);
    };
  }, [slide.id]);

  const handleVideoStart = useCallback(() => {
    console.log(`🎥 Video started for slide ${slide.id}`);
    setIsLoading(false);
    setVideoStarted(true);
    setVideoError(false);
    
    // Notify session system that video started (for engagement tracking)
    if (onAnswer) {
      try {
        onAnswer(slide.id, { started: true, isCorrect: true });
      } catch (error) {
        console.error('[VideoSlide] Error notifying video start:', error);
        // Don't let video errors break session sync
      }
    }
  }, [slide.id, onAnswer]);

  const handleVideoEnd = useCallback(() => {
    console.log(`🎥 Video ended for slide ${slide.id}`);
    setVideoEnded(true);
    
    // Notify session system that video completed
    if (onAnswer) {
      try {
        onAnswer(slide.id, { completed: true, isCorrect: true });
      } catch (error) {
        console.error('[VideoSlide] Error notifying video completion:', error);
        // Don't let video errors break session sync
      }
    }
  }, [slide.id, onAnswer]);

  const handleVideoError = useCallback((error) => {
    console.error(`[VideoSlide] Video error for slide ${slide.id}:`, error);
    setIsLoading(false);
    setVideoError(true);
    
    // Increment retry count
    const newRetryCount = retryCount + 1;
    setRetryCount(newRetryCount);
    
    if (newRetryCount >= MAX_RETRIES) {
      console.warn(`[VideoSlide] Max retries reached for slide ${slide.id}, showing fallback`);
      setUseFallback(true);
    }
    
    // Log the error but don't let it break session sync
    console.warn(`[VideoSlide] Video failed to load for slide ${slide.id}:`, content?.videoUrl);
  }, [slide.id, retryCount, content?.videoUrl]);

  const handleRetry = useCallback(() => {
    console.log(`🔄 Retrying video for slide ${slide.id}`);
    setVideoError(false);
    setIsLoading(true);
    setUseFallback(false);
    // Force iframe reload by changing key
    setIframeKey(prev => prev + 1);
    setVideoStarted(false);
  }, [slide.id]);

  const handleSkipVideo = useCallback(() => {
    console.log(`⏭️ Skipping video for slide ${slide.id}`);
    setVideoEnded(true);
    setUseFallback(true);
    
    // Mark video as completed when skipped
    if (onAnswer) {
      try {
        onAnswer(slide.id, { completed: true, isCorrect: true, skipped: true });
      } catch (error) {
        console.error('[VideoSlide] Error notifying video skip:', error);
      }
    }
  }, [slide.id, onAnswer]);

  const handleIframeLoad = useCallback(() => {
    console.log(`✅ Iframe loaded successfully for slide ${slide.id}`);
    setIsLoading(false);
    setVideoError(false);
  }, [slide.id]);

  // Strict validation with session sync protection
  if (!isValidYouTubeUrl(content?.videoUrl)) {
    console.warn(
      '[VideoSlide] Invalid or missing videoUrl for slide:',
      slide.id,
      'Value:',
      content?.videoUrl
    );
    
    // Show fallback content instead of error screen to maintain session flow
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-5xl w-full h-full flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              {slide.title}
            </h2>
            <p className="text-xl text-gray-200">
              {content?.description || 'תיאור הווידאו'}
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl flex-1 flex flex-col justify-center">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                וידאו לא זמין
              </h3>
              <p className="text-gray-300 mb-6">
                הווידאו לא זמין כרגע. אתה יכול להמשיך לשיעור הבא או לנסות שוב מאוחר יותר.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleSkipVideo}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>המשך לשיעור הבא</span>
                </button>
                {content?.videoUrl && (
                  <a
                    href={content.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>פתח ב-YouTube</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show fallback content if video failed after max retries
  if (useFallback) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-5xl w-full h-full flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              {slide.title}
            </h2>
            <p className="text-xl text-gray-200">
              {content?.description || 'תיאור הווידאו'}
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl flex-1 flex flex-col justify-center">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-orange-400" />
              <h3 className="text-2xl font-bold text-orange-400 mb-4">
                לא ניתן לטעון את הווידאו
              </h3>
              <p className="text-gray-300 mb-6">
                הווידאו לא נטען לאחר מספר ניסיונות. אתה יכול לנסות שוב או להמשיך לשיעור הבא.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleRetry}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>נסה שוב</span>
                </button>
                <button
                  onClick={handleSkipVideo}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>המשך לשיעור הבא</span>
                </button>
                <a
                  href={content.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>פתח ב-YouTube</span>
                </a>
              </div>
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
              {!videoError && embedUrl && embedUrl.startsWith('http') ? (
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
                  // Add error boundary to prevent iframe errors from breaking session sync
                  onAbort={() => handleVideoError(new Error('Iframe aborted'))}
                  onSuspend={() => handleVideoError(new Error('Iframe suspended'))}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-center">
                    <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
                    <h3 className="text-xl font-bold text-white mb-2">שגיאה בטעינת הווידאו</h3>
                    <p className="text-gray-400 mb-4">
                      {!embedUrl ? 'URL וידאו לא תקין' : 'לא ניתן לטעון את הווידאו כרגע'}
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={handleRetry}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>נסה שוב</span>
                      </button>
                      <button
                        onClick={handleSkipVideo}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <SkipForward className="w-4 h-4" />
                        <span>דלג</span>
                      </button>
                    </div>
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
                <ExternalLink className="w-4 h-4" />
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