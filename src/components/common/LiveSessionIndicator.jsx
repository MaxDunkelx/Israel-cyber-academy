import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Radio, 
  Users, 
  Clock,
  Play,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getTeacherActiveSessions, getStudentAvailableSessions } from '../../firebase/session-service';

const LiveSessionIndicator = ({ position = 'top-right' }) => {
  const navigate = useNavigate();
  const { currentUser, role } = useAuth();
  
  const [activeSessions, setActiveSessions] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser?.uid) return;

    const loadActiveSessions = async () => {
      try {
        setLoading(true);
        let sessions = [];
        
        if (role === 'teacher') {
          sessions = await getTeacherActiveSessions(currentUser.uid);
        } else if (role === 'student') {
          sessions = await getStudentAvailableSessions(currentUser.uid);
        }
        
        setActiveSessions(sessions);
        setIsVisible(sessions.length > 0);
        setLoading(false);
      } catch (error) {
        console.error('Error loading active sessions:', error);
        setLoading(false);
      }
    };

    loadActiveSessions();

    // Refresh every 30 seconds
    const interval = setInterval(loadActiveSessions, 30000);
    return () => clearInterval(interval);
  }, [currentUser?.uid, role]);

  const handleSessionClick = (sessionId) => {
    if (role === 'teacher') {
      navigate(`/teacher/session/${sessionId}`);
    } else {
      navigate(`/student/session/${sessionId}`);
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'fixed top-4 right-4 z-50';
      case 'top-left':
        return 'fixed top-4 left-4 z-50';
      case 'bottom-right':
        return 'fixed bottom-4 right-4 z-50';
      case 'bottom-left':
        return 'fixed bottom-4 left-4 z-50';
      case 'inline':
        return 'relative';
      default:
        return 'fixed top-4 right-4 z-50';
    }
  };

  if (!isVisible || loading) {
    return null;
  }

  const totalStudents = activeSessions.reduce((total, session) => 
    total + (session.connectedStudents?.length || 0), 0
  );

  return (
    <div className={getPositionClasses()}>
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-2xl border border-green-500/30 backdrop-blur-sm p-3">
        <div className="flex items-center space-x-3">
          {/* Live Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <Radio className="w-4 h-4 text-white" />
          </div>
          
          {/* Session Info */}
          <div className="text-white">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold">
                {activeSessions.length} שיעור{activeSessions.length > 1 ? 'ים' : ''} פעיל{activeSessions.length > 1 ? 'ים' : ''}
              </span>
              {role === 'teacher' && (
                <div className="flex items-center space-x-1 text-green-200">
                  <Users className="w-3 h-3" />
                  <span className="text-xs">{totalStudents}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Action Button */}
          <button
            onClick={() => handleSessionClick(activeSessions[0]?.id)}
            className="bg-white/20 hover:bg-white/30 rounded px-2 py-1 text-white text-xs font-medium transition-colors flex items-center space-x-1"
          >
            <Play className="w-3 h-3" />
            <span>הצטרף</span>
          </button>
        </div>
        
        {/* Quick Session List (for teachers) */}
        {role === 'teacher' && activeSessions.length > 1 && (
          <div className="mt-2 pt-2 border-t border-green-500/30">
            <div className="space-y-1">
              {activeSessions.slice(0, 3).map((session) => (
                <button
                  key={session.id}
                  onClick={() => handleSessionClick(session.id)}
                  className="w-full text-left text-xs text-green-100 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span className="truncate">{session.lessonName}</span>
                  <span className="text-green-200">
                    {session.connectedStudents?.length || 0}
                  </span>
                </button>
              ))}
              {activeSessions.length > 3 && (
                <div className="text-xs text-green-200 text-center">
                  +{activeSessions.length - 3} עוד
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSessionIndicator; 