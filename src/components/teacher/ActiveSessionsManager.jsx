import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Square, 
  Users, 
  Clock, 
  Monitor, 
  AlertCircle,
  CheckCircle,
  X,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  BarChart3
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { 
  getTeacherActiveSessions, 
  endSession, 
  setSessionLock,
  updateSessionSlide 
} from '../../firebase/session-service';
import { listenToSession } from '../../firebase/session-service';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const ActiveSessionsManager = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [activeSessions, setActiveSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionListeners, setSessionListeners] = useState({});

  useEffect(() => {
    loadActiveSessions();
    
    // Cleanup listeners on unmount
    return () => {
      Object.values(sessionListeners).forEach(unsubscribe => {
        if (unsubscribe) unsubscribe();
      });
    };
  }, [currentUser]);

  const loadActiveSessions = async () => {
    try {
      setLoading(true);
      const sessions = await getTeacherActiveSessions(currentUser.uid);
      
      // Set up real-time listeners for each session
      const listeners = {};
      sessions.forEach(session => {
        const unsubscribe = listenToSession(session.id, (updatedSession) => {
          if (updatedSession) {
            setActiveSessions(prev => 
              prev.map(s => s.id === updatedSession.id ? updatedSession : s)
            );
          } else {
            // Session ended, remove from list
            setActiveSessions(prev => prev.filter(s => s.id !== session.id));
          }
        });
        listeners[session.id] = unsubscribe;
      });
      
      setSessionListeners(listeners);
      setActiveSessions(sessions);
      setLoading(false);
    } catch (error) {
      console.error('Error loading active sessions:', error);
      toast.error('אירעה שגיאה בטעינת השיעורים הפעילים');
      setLoading(false);
    }
  };

  const handleEndSession = async (sessionId) => {
    if (window.confirm('האם אתה בטוח שברצונך לסיים את השיעור?')) {
      try {
        await endSession(sessionId);
        toast.success('השיעור הסתיים בהצלחה');
      } catch (error) {
        console.error('Error ending session:', error);
        toast.error('אירעה שגיאה בסיום השיעור');
      }
    }
  };

  const handleToggleLock = async (sessionId, isLocked) => {
    try {
      await setSessionLock(sessionId, !isLocked);
      toast.success(isLocked ? 'השיעור נפתח' : 'השיעור ננעל');
    } catch (error) {
      console.error('Error toggling session lock:', error);
      toast.error('אירעה שגיאה בשינוי מצב השיעור');
    }
  };

  const handleNavigateToSession = (sessionId) => {
    navigate(`/teacher/session/${sessionId}`);
  };

  const formatSessionDuration = (startTime) => {
    if (!startTime) return '0 דקות';
    const duration = Date.now() - startTime.toDate().getTime();
    const minutes = Math.floor(duration / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}ש ${remainingMinutes}ד`;
    }
    return `${minutes} דקות`;
  };

  const getSessionStatusColor = (session) => {
    if (session.status === 'ended') return 'text-red-400';
    if (session.isLocked) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getSessionStatusIcon = (session) => {
    if (session.status === 'ended') return <CheckCircle className="w-4 h-4" />;
    if (session.isLocked) return <Lock className="w-4 h-4" />;
    return <Play className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">שיעורים פעילים</h2>
          <p className="text-gray-400">ניהול שיעורים חיים וניטור תלמידים</p>
        </div>
        <Button
          onClick={() => navigate('/teacher/session/create')}
          variant="primary"
          className="flex items-center space-x-2"
        >
          <Play className="w-4 h-4" />
          <span>התחל שיעור חדש</span>
        </Button>
      </div>

      {/* Active Sessions */}
      {activeSessions.length === 0 ? (
        <Card variant="dark">
          <div className="text-center py-12">
            <Monitor className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">אין שיעורים פעילים</h3>
            <p className="text-gray-400 mb-6">התחל שיעור חדש כדי לנהל תלמידים בזמן אמת</p>
            <Button
              onClick={() => navigate('/teacher/session/create')}
              variant="primary"
              className="flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>התחל שיעור חדש</span>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeSessions.map((session) => (
            <Card key={session.id} variant="dark">
              <div className="p-6">
                {/* Session Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getSessionStatusColor(session)}`}></div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{session.lessonName}</h3>
                      <p className="text-sm text-gray-400">{session.className}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getSessionStatusIcon(session)}
                    <span className={`text-sm ${getSessionStatusColor(session)}`}>
                      {session.status === 'ended' ? 'הסתיים' : 
                       session.isLocked ? 'נעול' : 'פעיל'}
                    </span>
                  </div>
                </div>

                {/* Session Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {session.connectedStudents?.length || 0}
                    </div>
                    <div className="text-xs text-gray-400">מחוברים</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {session.currentSlide + 1}
                    </div>
                    <div className="text-xs text-gray-400">שקופית נוכחית</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {formatSessionDuration(session.startTime)}
                    </div>
                    <div className="text-xs text-gray-400">משך זמן</div>
                  </div>
                </div>

                {/* Connected Students */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>תלמידים מחוברים</span>
                  </h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {session.connectedStudents && session.connectedStudents.length > 0 ? (
                      session.connectedStudents.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-white">{student.name}</span>
                          </div>
                          <span className="text-xs text-gray-400">
                            שקופית {student.currentSlide + 1}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-400">אין תלמידים מחוברים</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Session Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleNavigateToSession(session.id)}
                      variant="primary"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Monitor className="w-4 h-4" />
                      <span>ניהול שיעור</span>
                    </Button>
                    
                    <Button
                      onClick={() => handleToggleLock(session.id, session.isLocked)}
                      variant="secondary"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      {session.isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      <span>{session.isLocked ? 'פתח' : 'נעל'}</span>
                    </Button>
                  </div>
                  
                  <Button
                    onClick={() => handleEndSession(session.id)}
                    variant="danger"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Square className="w-4 h-4" />
                    <span>סיים</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Session Analytics Summary */}
      {activeSessions.length > 0 && (
        <Card variant="dark">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>סיכום פעילות</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {activeSessions.length}
                </div>
                <div className="text-sm text-gray-400">שיעורים פעילים</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {activeSessions.reduce((total, session) => 
                    total + (session.connectedStudents?.length || 0), 0
                  )}
                </div>
                <div className="text-sm text-gray-400">תלמידים מחוברים</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {activeSessions.reduce((total, session) => 
                    total + (session.studentIds?.length || 0), 0
                  )}
                </div>
                <div className="text-sm text-gray-400">סה"כ תלמידים</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {Math.floor(activeSessions.reduce((total, session) => {
                    const duration = Date.now() - session.startTime.toDate().getTime();
                    return total + duration;
                  }, 0) / (1000 * 60))}
                </div>
                <div className="text-sm text-gray-400">דקות פעילות</div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ActiveSessionsManager; 