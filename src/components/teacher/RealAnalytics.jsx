import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { 
  getTeacherClasses, 
  getTeacherStudents
} from '../../firebase/teacher-service.jsx';
import { getTeacherSessionHistory } from '../../firebase/session-service';
import Card from '../ui/Card';

const RealAnalytics = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teacherAnalytics, setTeacherAnalytics] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classAnalytics, setClassAnalytics] = useState(null);
  const [sessionAttendance, setSessionAttendance] = useState(null);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    loadData();
  }, [currentUser]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (import.meta.env.DEV) {
        console.log('Loading real analytics data for teacher:', currentUser.uid);
      }
      
      // Load all data in parallel
      const [classesData, studentsData, sessionHistoryData] = await Promise.all([
        getTeacherClasses(currentUser.uid),
        getTeacherStudents(currentUser.uid),
        getTeacherSessionHistory(currentUser.uid, 20)
      ]);
      
      // DEBUG: Log the actual data received
      console.log('🔍 DEBUG - Real Analytics Data:', {
        classesCount: classesData.length,
        studentsCount: studentsData.length,
        studentsData: studentsData.map(s => ({ id: s.uid, name: s.displayName, classId: s.classId })),
        classesData: classesData.map(c => ({ id: c.id, name: c.name, studentIds: c.studentIds }))
      });
      
      // Create analytics data from real data
      const analyticsData = {
        totalClasses: classesData.length,
        totalStudents: studentsData.length,
        totalActiveStudents: studentsData.filter(s => s.lastActivity > Date.now() - 7 * 24 * 60 * 60 * 1000).length,
        averageProgress: Math.round(studentsData.reduce((acc, s) => acc + (s.progress?.completedLessons?.length || 0), 0) / Math.max(studentsData.length, 1) * 10),
        averageTimeSpent: Math.round(studentsData.reduce((acc, s) => acc + (s.totalTimeSpent || 0), 0) / Math.max(studentsData.length, 1) / 60)
      };
      
      console.log('🔍 DEBUG - Analytics Data Created:', analyticsData);
      
      if (import.meta.env.DEV) {
        console.log('Loaded data:', {
          classes: classesData.length,
          students: studentsData.length,
          sessions: sessionHistoryData.totalSessions
        });
      }
      
      setClasses(classesData);
      setStudents(studentsData);
      setTeacherAnalytics(analyticsData);
      setSessionAttendance(sessionHistoryData);
      
      // Set first class as selected by default
      if (classesData.length > 0 && !selectedClass) {
        setSelectedClass(classesData[0].id);
        await loadClassAnalytics(classesData[0].id);
      }
      
    } catch (error) {
      console.error('Error loading real analytics:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadClassAnalytics = async (classId) => {
    try {
      console.log('Loading analytics for class:', classId);
      // Create mock class analytics since real-analytics-service was removed
      const classStudents = students.filter(s => s.classId === classId);
      const analytics = {
        totalStudents: classStudents.length,
        averageProgress: Math.round(classStudents.reduce((acc, s) => acc + (s.progress?.completedLessons?.length || 0), 0) / Math.max(classStudents.length, 1) * 10),
        averageTimeSpent: Math.round(classStudents.reduce((acc, s) => acc + (s.totalTimeSpent || 0), 0) / Math.max(classStudents.length, 1) / 60),
        completedLessons: classStudents.reduce((acc, s) => {
          const lessons = s.progress?.completedLessons || [];
          lessons.forEach(lesson => {
            acc[lesson] = (acc[lesson] || 0) + 1;
          });
          return acc;
        }, {})
      };
      setClassAnalytics(analytics);
      console.log('Class analytics loaded:', analytics);
    } catch (error) {
      console.error('Error loading class analytics:', error);
      setError(error.message);
    }
  };

  const handleClassChange = async (classId) => {
    try {
      setSelectedClass(classId);
      await loadClassAnalytics(classId);
    } catch (error) {
      console.error('Error changing class:', error);
      setError(error.message);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'לא ידוע';
    try {
      const dateObj = date.toDate ? date.toDate() : new Date(date);
      if (isNaN(dateObj.getTime())) return 'לא ידוע';
      return dateObj.toLocaleDateString('he-IL', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'לא ידוע';
    }
  };

  const formatDuration = (minutes) => {
    if (!minutes || minutes === 0 || typeof minutes !== 'number') return '0 דקות';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} שעות ${mins} דקות`;
    }
    return `${mins} דקות`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">טוען נתונים אמיתיים מהמסד נתונים...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-400 text-lg">שגיאה בטעינת הנתונים: {error}</p>
            <button 
              onClick={loadData}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              נסה שוב
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
          <h1 className="text-3xl font-bold text-white mb-2">ניתוח נתונים אמיתיים</h1>
          <p className="text-gray-400">נתונים מבוססים על פעילות אמיתית של תלמידים במסד הנתונים</p>
          </div>
          <button
            onClick={loadData}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>רענן נתונים</span>
          </button>
        </div>

        {/* Teacher Overview */}
        {teacherAnalytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-700">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-300">כיתות</h3>
                <p className="text-3xl font-bold text-blue-400">{teacherAnalytics.totalClasses || classes.length}</p>
                <p className="text-sm text-gray-400">כיתות פעילות</p>
              </div>
            </Card>
            <Card className="bg-gray-900 border-gray-700">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-300">תלמידים</h3>
                <p className="text-3xl font-bold text-green-400">{teacherAnalytics.totalStudents || students.length}</p>
                <p className="text-sm text-gray-400">
                  {teacherAnalytics.totalActiveStudents || 0} פעילים
                </p>
              </div>
            </Card>
            <Card className="bg-gray-900 border-gray-700">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-300">התקדמות ממוצעת</h3>
                <p className="text-3xl font-bold text-yellow-400">{teacherAnalytics.averageProgress || 0}%</p>
              </div>
            </Card>
            <Card className="bg-gray-900 border-gray-700">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-300">זמן ממוצע</h3>
                <p className="text-3xl font-bold text-purple-400">{formatDuration(teacherAnalytics.averageTimeSpent || 0)}</p>
              </div>
            </Card>
          </div>
        )}

        {/* Class Selection */}
        {classes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">בחר כיתה לניתוח מפורט</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.map((classData) => (
                <button
                  key={classData.id}
                  onClick={() => handleClassChange(classData.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedClass === classData.id
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                  }`}
                >
                  <h3 className="font-semibold text-white">{classData.name}</h3>
                  <p className="text-sm text-gray-400">
                    {classData.studentIds?.length || 0} תלמידים
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Class Analytics */}
        {classAnalytics && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">סטטיסטיקות כיתה: {classAnalytics.className}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
              <Card className="bg-gray-900 border-gray-700">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-300">תלמידים</h3>
                  <p className="text-3xl font-bold text-green-400">{typeof classAnalytics.totalStudents === 'number' ? classAnalytics.totalStudents : 0}</p>
                  <p className="text-sm text-gray-400">{typeof classAnalytics.activeStudents === 'number' ? classAnalytics.activeStudents : 0} פעילים</p>
                </div>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-300">התקדמות ממוצעת</h3>
                  <p className="text-3xl font-bold text-yellow-400">{typeof classAnalytics.averageProgress === 'number' ? classAnalytics.averageProgress : 0}%</p>
                </div>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-300">שיעורים שהושלמו</h3>
                  <p className="text-3xl font-bold text-blue-400">{typeof classAnalytics.averageCompletedLessons === 'number' ? classAnalytics.averageCompletedLessons : 0}</p>
                </div>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-300">זמן ממוצע</h3>
                  <p className="text-3xl font-bold text-purple-400">{formatDuration(classAnalytics.averageTimeSpent || 0)}</p>
                </div>
              </Card>
            </div>
            
            {/* Student List */}
            {classAnalytics.students && classAnalytics.students.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">רשימת תלמידים</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-gray-300">
                    <thead>
                      <tr>
                        <th className="px-2 py-1 text-right">שם</th>
                        <th className="px-2 py-1 text-right">התקדמות</th>
                        <th className="px-2 py-1 text-right">שיעורים שהושלמו</th>
                        <th className="px-2 py-1 text-right">זמן</th>
                        <th className="px-2 py-1 text-right">פעילות אחרונה</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classAnalytics.students.map((student) => (
                        <tr key={student.uid} className="border-b border-gray-700">
                          <td className="px-2 py-1">{student.displayName || 'תלמיד ללא שם'}</td>
                          <td className="px-2 py-1">{typeof student.progress === 'number' ? student.progress : 0}%</td>
                          <td className="px-2 py-1">{Array.isArray(student.completedLessons) ? student.completedLessons.length : 0}</td>
                          <td className="px-2 py-1">{formatDuration(student.totalTimeSpent || 0)}</td>
                          <td className="px-2 py-1">{formatDate(student.lastActivityAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Session Attendance */}
        {sessionAttendance && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">נוכחות בשיעורים חיים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
              <Card className="bg-gray-900 border-gray-700">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-300">שיעורים חיים</h3>
                  <p className="text-3xl font-bold text-blue-400">{typeof sessionAttendance.totalSessions === 'number' ? sessionAttendance.totalSessions : 0}</p>
                </div>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-300">נוכחות ממוצעת</h3>
                  <p className="text-3xl font-bold text-green-400">{typeof sessionAttendance.averageAttendance === 'number' ? sessionAttendance.averageAttendance : 0}</p>
                </div>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-300">סה"כ נוכחות</h3>
                  <p className="text-3xl font-bold text-purple-400">{typeof sessionAttendance.totalAttendance === 'number' ? sessionAttendance.totalAttendance : 0}</p>
                </div>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-300">תלמידים ייחודיים</h3>
                  <p className="text-3xl font-bold text-orange-400">{Object.keys(sessionAttendance.studentAttendance || {}).length}</p>
                </div>
              </Card>
            </div>
            
            {/* Detailed Session History with Student Attendance */}
            {sessionAttendance.detailedSessions && sessionAttendance.detailedSessions.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <h4 className="text-lg font-semibold text-white mb-4">היסטוריית שיעורים מפורטת עם נוכחות תלמידים</h4>
                <div className="space-y-6">
                  {sessionAttendance.detailedSessions.slice(0, 5).map((session) => (
                    <div key={session.sessionId} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h5 className="text-lg font-semibold text-white">
                            {session.lessonName || `שיעור ${session.lessonId || 'לא ידוע'}`}
                          </h5>
                          <p className="text-gray-400 text-sm">{session.className}</p>
                          <p className="text-gray-400 text-sm">{formatDate(session.date)}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">{session.attendance}</div>
                          <div className="text-sm text-gray-400">נוכחים</div>
                          <div className="text-sm text-gray-400">{formatDuration(session.duration)}</div>
                        </div>
                      </div>
                      
                      {/* Student Attendance List */}
                      {session.students && session.students.length > 0 && (
                        <div className="mt-4">
                          <h6 className="text-md font-semibold text-gray-300 mb-2">תלמידים שהשתתפו:</h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {session.students.map((student) => (
                              <div key={student.id} className="flex items-center justify-between bg-gray-600 rounded p-2">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                  <span className="text-sm text-white">{student.name}</span>
                                </div>
                                <div className="text-xs text-gray-400 text-left">
                                  <div>הצטרף: {formatDate(student.joinedAt)}</div>
                                  <div>פעילות אחרונה: {formatDate(student.lastActivity)}</div>
                                  <div>שקופית: {student.currentSlide}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Student Attendance Summary */}
            {sessionAttendance.studentAttendance && Object.keys(sessionAttendance.studentAttendance).length > 0 && (
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <h4 className="text-lg font-semibold text-white mb-4">סיכום נוכחות תלמידים</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-gray-300">
                    <thead>
                      <tr>
                        <th className="px-2 py-1 text-right">שם תלמיד</th>
                        <th className="px-2 py-1 text-right">שיעורים שהשתתף</th>
                        <th className="px-2 py-1 text-right">אחוז נוכחות</th>
                        <th className="px-2 py-1 text-right">זמן ממוצע לשיעור</th>
                        <th className="px-2 py-1 text-right">נוכחות אחרונה</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(sessionAttendance.studentAttendance)
                        .sort(([,a], [,b]) => b.sessionsAttended - a.sessionsAttended)
                        .slice(0, 10)
                        .map(([studentId, student]) => (
                        <tr key={studentId} className="border-b border-gray-700">
                          <td className="px-2 py-1">{student.name}</td>
                          <td className="px-2 py-1">{student.sessionsAttended}</td>
                          <td className="px-2 py-1">{student.attendancePercentage}%</td>
                          <td className="px-2 py-1">{formatDuration(student.averageTimePerSession || 0)}</td>
                          <td className="px-2 py-1">{formatDate(student.lastAttendance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Data Message */}
        {classes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">אין כיתות זמינות לניתוח</p>
            <p className="text-gray-500 text-sm mt-2">צור כיתה חדשה כדי לראות נתונים</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealAnalytics;
