import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  Users, 
  X,
  Radio,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { listenToCurrentActiveSession } from '../../firebase/session-service';
import Button from '../ui/Button';

const LiveSessionNotification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  
  const [currentSession, setCurrentSession] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [isSessionValid, setIsSessionValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced session validation to reduce Firebase calls
  const validateSession = useCallback((session) => {
    if (!session || session.status !== 'active') {
      return false;
    }

    // Check if session has been inactive for more than 5 minutes
    const lastActivity = session.lastActivity?.toDate?.() || new Date(session.lastActivity);
    const now = new Date();
    const timeDiff = now.getTime() - lastActivity.getTime();
    const maxInactiveTime = 5 * 60 * 1000; // 5 minutes in milliseconds

    if (timeDiff > maxInactiveTime) {
      console.log('Session is stale, last activity was', timeDiff / 1000, 'seconds ago');
      return false;
    }

    // Check if session has been running for more than 4 hours
    const startTime = session.startTime?.toDate?.() || new Date(session.startTime);
    const sessionDuration = now.getTime() - startTime.getTime();
    const maxSessionDuration = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

    if (sessionDuration > maxSessionDuration) {
      console.log('Session has been running too long, auto-ending');
      return false;
    }

    return true;
  }, []);

  useEffect(() => {
    if (!currentUser?.uid) return;

    let unsubscribe = null;
    let retryCount = 0;
    const maxRetries = 3;

    const setupListener = () => {
      try {
        console.log('🔍 Setting up live session listener for student:', currentUser.uid);
        
        // Listen to current active session with error handling
        unsubscribe = listenToCurrentActiveSession(currentUser.uid, (session) => {
          if (session) {
            console.log('📡 Received session update:', session.lessonName);
            
            // Validate if session is actually active and teacher is online
            const isValid = validateSession(session);
            
            // Check if student is already connected to this session
            const isAlreadyConnected = session.connectedStudents?.some(
              student => student.id === currentUser.uid
            );
            
            setCurrentSession(session);
            setIsSessionValid(isValid);
            
            // Only show popup if session is valid AND student is not already connected
            setIsVisible(isValid && !isAlreadyConnected);
            setIsLoading(false);
          } else {
            console.log('📡 No active session found');
            setCurrentSession(null);
            setIsVisible(false);
            setIsSessionValid(false);
            setIsLoading(false);
          }
        });

        // Reset retry count on successful connection
        retryCount = 0;
        
      } catch (error) {
        console.error('❌ Error setting up session listener:', error);
        retryCount++;
        
        if (retryCount < maxRetries) {
          console.log(`🔄 Retrying session listener (${retryCount}/${maxRetries})...`);
          setTimeout(setupListener, 2000 * retryCount); // Exponential backoff
        } else {
          console.error('❌ Max retries reached for session listener');
          setIsLoading(false);
        }
      }
    };

    setIsLoading(true);
    setupListener();

    return () => {
      if (unsubscribe) {
        console.log('🔌 Cleaning up session listener');
        unsubscribe();
      }
    };
  }, [currentUser?.uid, validateSession]);

  // Calculate session duration
  useEffect(() => {
    if (!currentSession?.startTime) return;

    const interval = setInterval(() => {
      const startTime = currentSession.startTime?.toDate?.() || new Date(currentSession.startTime);
      const duration = Math.floor((Date.now() - startTime.getTime()) / 1000);
      setSessionDuration(duration);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSession?.startTime]);

  const handleJoinSession = () => {
    if (!currentSession || !isSessionValid) {
      toast.error('השיעור כבר לא פעיל או שהמורה לא מחובר');
      setIsVisible(false);
      return;
    }
    
    try {
      console.log('🎯 Student joining session:', currentSession.id);
      navigate(`/student/session/${currentSession.id}`);
      toast.success('מתחבר לשיעור החי...');
    } catch (error) {
      console.error('Error joining session:', error);
      toast.error('אירעה שגיאה בהצטרפות לשיעור');
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Check if student is already in a live session
  const isAlreadyInLiveSession = location.pathname.startsWith('/student/session/');
  
  // Check if student is already connected to this specific session
  const isAlreadyConnectedToSession = currentSession?.connectedStudents?.some(
    student => student.id === currentUser?.uid
  );
  
  // Debug logging for popup visibility
  if (import.meta.env.DEV && currentSession) {
    console.log('🔍 LiveSessionNotification visibility check:', {
      isLoading,
      isVisible,
      hasSession: !!currentSession,
      isAlreadyInLiveSession,
      isAlreadyConnectedToSession,
      currentPath: location.pathname,
      connectedStudents: currentSession.connectedStudents?.map(s => s.id) || [],
      currentUserId: currentUser?.uid
    });
  }
  
  // Don't show anything if:
  // 1. Loading
  // 2. No session
  // 3. Not visible
  // 4. Student is already in a live session (to avoid confusion)
  // 5. Student is already connected to this specific session
  if (isLoading || !isVisible || !currentSession || isAlreadyInLiveSession || isAlreadyConnectedToSession) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-2xl border border-gray-600 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <Radio className="w-4 h-4 text-white" />
            <span className="text-white font-semibold text-sm">שיעור חי פעיל</span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="space-y-3">
            {/* Session Info */}
            <div>
              <h3 className="text-white font-bold text-lg mb-1">
                {currentSession.lessonName}
              </h3>
              <p className="text-gray-300 text-sm">
                {currentSession.className}
              </p>
            </div>

            {/* Session Stats */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(sessionDuration)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Users className="w-4 h-4" />
                <span>{currentSession.connectedStudents?.length || 0} מחוברים</span>
              </div>
            </div>

            {/* Current Slide Info */}
            <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
              <p className="text-white text-sm">
                המורה נמצא בשקופית {currentSession.currentSlide + 1}
              </p>
              <p className="text-gray-300 text-xs mt-1">
                לחץ להצטרף ולעקוב אחרי המורה בזמן אמת
              </p>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleJoinSession}
              variant="primary"
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center justify-center space-x-2 font-semibold"
            >
              <Play className="w-4 h-4" />
              <span>הצטרף לשיעור החי</span>
            </Button>

            {/* Session Status Warning */}
            {!isSessionValid && (
              <div className="bg-yellow-600/20 rounded-lg p-3 border border-yellow-600/30">
                <div className="flex items-center space-x-2 text-yellow-300">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">השיעור עשוי להיות לא פעיל</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSessionNotification; 