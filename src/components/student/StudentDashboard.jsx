import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  Clock, 
  ChevronLeft,
  Play,
  CheckCircle,
  AlertCircle,
  Target,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { getStudentAvailableSessions } from '../../firebase/session-service';
import { lessons } from '../../data/lessons';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [availableSessions, setAvailableSessions] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [stats, setStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    activeSessions: 0,
    totalTimeSpent: 0
  });

  useEffect(() => {
    loadData();
  }, [currentUser, userProfile]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load available sessions
      const sessions = await getStudentAvailableSessions(currentUser.uid);
      setAvailableSessions(sessions);
      
      // Get real completed lessons from user profile
      const realCompletedLessons = [];
      if (userProfile?.progress) {
        Object.entries(userProfile.progress).forEach(([lessonId, progress]) => {
          if (progress.completed && progress.completedAt) {
            const lesson = lessons.find(l => l.id === parseInt(lessonId));
            if (lesson) {
              realCompletedLessons.push({
                id: parseInt(lessonId),
                title: lesson.title,
                completedAt: progress.completedAt,
                score: progress.score || 0
              });
            }
          }
        });
      }
      setCompletedLessons(realCompletedLessons);
      
      // Calculate real stats from user profile
      setStats({
        totalLessons: lessons.length,
        completedLessons: realCompletedLessons.length,
        activeSessions: sessions.length,
        totalTimeSpent: userProfile?.totalTimeSpent || 0
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('אירעה שגיאה בטעינת הנתונים');
      setLoading(false);
    }
  };

  const handleJoinSession = (sessionId) => {
    navigate(`/student/session/${sessionId}`);
  };

  const handleContinueLesson = (lessonId) => {
    // Check if student has access to this lesson (teacher unlocked it)
    if (userProfile?.currentLesson && lessonId <= userProfile.currentLesson) {
      navigate(`/student/lesson/${lessonId}`);
    } else {
      toast.error('השיעור עדיין לא נפתח על ידי המורה');
    }
  };

  const formatSessionDuration = (startTime) => {
    if (!startTime) return '0 דקות';
    const duration = Date.now() - startTime.toDate().getTime();
    const minutes = Math.floor(duration / (1000 * 60));
    return `${minutes} דקות`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card variant="dark">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{stats.totalLessons}</div>
              <div className="text-sm text-gray-300">סה"כ שיעורים</div>
            </div>
          </Card>
          
          <Card variant="dark">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{stats.completedLessons}</div>
              <div className="text-sm text-gray-300">שיעורים שהושלמו</div>
            </div>
          </Card>
          
          <Card variant="dark">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{stats.activeSessions}</div>
              <div className="text-sm text-gray-300">שיעורים פעילים</div>
            </div>
          </Card>
          
          <Card variant="dark">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">{Math.floor(stats.totalTimeSpent / 60)}</div>
              <div className="text-sm text-gray-300">שעות למידה</div>
            </div>
          </Card>
        </div>

        {/* Current Teacher-Assigned Lesson */}
        <Card variant="dark" className="mb-8">
          <div className="p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>שיעור נוכחי</span>
            </h2>
            
            <div className="bg-gray-800/50 rounded-lg p-4">
              {userProfile?.currentLesson ? (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">שיעור {userProfile.currentLesson}</h3>
                    <p className="text-sm text-gray-400">
                      הוקצה על ידי המורה • {userProfile.lessonStartDate ? 
                        `התחיל ב-${new Date(userProfile.lessonStartDate).toLocaleDateString('he-IL')}` : 
                        'לא התחיל עדיין'
                      }
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400">פעיל</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400">המורה עדיין לא הקצה שיעור</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Sessions */}
          <Card variant="dark">
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>שיעורים פעילים</span>
              </h2>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {availableSessions.length === 0 ? (
                  <div className="text-center py-8">
                    <Play className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400">אין שיעורים פעילים כרגע</p>
                  </div>
                ) : (
                  availableSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 rounded-lg border border-gray-600 bg-gray-700/50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">{session.lessonName}</h3>
                          <p className="text-sm text-gray-400">
                            {session.className} • {session.connectedStudents?.length || 0} תלמידים מחוברים
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            התחיל לפני {formatSessionDuration(session.startTime)}
                          </p>
                        </div>
                        <Button
                          onClick={() => handleJoinSession(session.id)}
                          variant="primary"
                          size="sm"
                          className="flex items-center space-x-2"
                        >
                          <Play className="w-4 h-4" />
                          <span>הצטרף</span>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card variant="dark">
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>שיעורים שהושלמו</span>
              </h2>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {completedLessons.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400">עדיין לא השלמת שיעורים</p>
                  </div>
                ) : (
                  completedLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="p-4 rounded-lg border border-gray-600 bg-gray-700/50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">{lesson.title}</h3>
                          <p className="text-sm text-gray-400">
                            הושלם ב-{formatDate(lesson.completedAt)}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="w-16 bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${lesson.score}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-green-400">{lesson.score}%</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleContinueLesson(lesson.id)}
                          variant="secondary"
                          size="sm"
                        >
                          חזור לשיעור
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card variant="dark" className="mt-8">
          <div className="p-6">
            <h2 className="text-lg font-bold text-white mb-4">פעולות מהירות</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => navigate('/student/roadmap')}
                className="flex items-center space-x-3 p-4 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
              >
                <BookOpen className="w-6 h-6 text-white" />
                <span className="text-white">המשך למידה</span>
              </button>
              
              <button 
                onClick={() => navigate('/student/profile')}
                className="flex items-center space-x-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Users className="w-6 h-6 text-blue-400" />
                <span className="text-white">פרופיל אישי</span>
              </button>
              
              <button 
                onClick={() => navigate('/student/roadmap')}
                className="flex items-center space-x-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Target className="w-6 h-6 text-green-400" />
                <span className="text-white">מפת דרכים</span>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard; 