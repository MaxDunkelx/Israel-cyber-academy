import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Award,
  Target,
  Calendar,
  Activity,
  PieChart,
  LineChart,
  Filter
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { isTeacher, validateTeacherAccess, logSecurityEvent } from '../../utils/security';
import Card from '../ui/Card';
import LoadingSpinner from '../common/LoadingSpinner';

export default function TeacherAnalytics({
  classes,
  students,
  lessons,
  currentTeacherId,
  getClassProgress,
  getStudentProgress
}) {
  const { currentUser } = useAuth();
  const { role } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [selectedClass, setSelectedClass] = useState('all');

  useEffect(() => {
    // Security check - ensure only teachers can access this component
    if (!currentUser) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', { role: 'none' }, { component: 'TeacherAnalytics' });
      return;
    }

    const validation = validateTeacherAccess({ role }, 'view_analytics');
    if (!validation.success) {
      logSecurityEvent('INSUFFICIENT_PERMISSIONS', { role, uid: currentUser.uid }, { 
        component: 'TeacherAnalytics',
        reason: validation.message 
      });
      toast.error('אין לך הרשאות לצפייה בניתוח נתונים');
      return;
    }

    // Load analytics data
    loadAnalyticsData();
  }, [currentUser, role]);

  // Security check - if not a teacher, show access denied
  if (!isTeacher({ role })) {
    logSecurityEvent('STUDENT_ACCESS_ATTEMPT', { role, uid: currentUser?.uid }, { component: 'TeacherAnalytics' });
    return (
      <div className="text-center py-8">
        <p className="text-red-400">אין לך הרשאות לגשת לניתוח נתונים</p>
      </div>
    );
  }

  const loadAnalyticsData = () => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Calculate analytics data
  const myClasses = classes.filter(c => c.teacherId === currentTeacherId);
  const myStudents = students.filter(s => s.teacherId === currentTeacherId);
  const unassignedStudents = students.filter(s => !s.teacherId);

  // Overall statistics
  const totalStudents = students.length;
  const myStudentCount = myStudents.length;
  const unassignedCount = unassignedStudents.length;
  const otherTeachersStudents = totalStudents - myStudentCount - unassignedCount;

  // Class statistics
  const averageClassProgress = myClasses.length > 0 
    ? Math.round(myClasses.reduce((sum, c) => sum + getClassProgress(c), 0) / myClasses.length)
    : 0;

  // Student progress statistics
  const studentProgresses = myStudents.map(s => getStudentProgress(s));
  const averageStudentProgress = studentProgresses.length > 0
    ? Math.round(studentProgresses.reduce((sum, p) => sum + p, 0) / studentProgresses.length)
    : 0;

  // Top performing students
  const topStudents = [...myStudents]
    .sort((a, b) => getStudentProgress(b) - getStudentProgress(a))
    .slice(0, 5);

  // Class performance
  const classPerformance = myClasses.map(classData => ({
    ...classData,
    progress: getClassProgress(classData),
    studentCount: students.filter(s => s.classId === classData.id).length
  }));

  // Mock lesson completion data
  const lessonCompletionData = lessons.slice(0, 9).map((lesson, index) => ({
    lessonId: lesson.id,
    title: lesson.title,
    completionRate: Math.floor(Math.random() * 100),
    averageScore: Math.floor(Math.random() * 100),
    studentsAttempted: Math.floor(Math.random() * myStudentCount)
  }));

  // Mock time spent data
  const timeSpentData = [
    { day: 'ראשון', hours: 2.5 },
    { day: 'שני', hours: 3.2 },
    { day: 'שלישי', hours: 1.8 },
    { day: 'רביעי', hours: 4.1 },
    { day: 'חמישי', hours: 2.9 },
    { day: 'שישי', hours: 1.2 },
    { day: 'שבת', hours: 0.5 }
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">ניתוח נתונים</h2>
          <p className="text-gray-300">סטטיסטיקות וניתוח ביצועים</p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">שבוע</option>
              <option value="month">חודש</option>
              <option value="quarter">רבעון</option>
            </select>
          </div>
          
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">כל הכיתות</option>
            {myClasses.map(classData => (
              <option key={classData.id} value={classData.id}>
                {classData.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600">
          <div className="flex items-center space-x-4">
            <Users className="w-8 h-8 text-white" />
            <div>
              <p className="text-blue-100 text-sm">תלמידים פעילים</p>
              <p className="text-white text-2xl font-bold">{myStudentCount}</p>
              <p className="text-blue-100 text-xs">מתוך {totalStudents}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-white" />
            <div>
              <p className="text-green-100 text-sm">כיתות פעילות</p>
              <p className="text-white text-2xl font-bold">{myClasses.length}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600">
          <div className="flex items-center space-x-4">
            <Target className="w-8 h-8 text-white" />
            <div>
              <p className="text-purple-100 text-sm">ממוצע התקדמות</p>
              <p className="text-white text-2xl font-bold">{averageClassProgress}%</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600">
          <div className="flex items-center space-x-4">
            <BarChart3 className="w-8 h-8 text-white" />
            <div>
              <p className="text-orange-100 text-sm">ממוצע התקדמות</p>
              <p className="text-white text-2xl font-bold">{averageStudentProgress}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Performance Chart */}
        <Card>
          <h3 className="text-xl font-bold text-white mb-4">ביצועי כיתות</h3>
          <div className="space-y-4">
            {classPerformance.map(classData => (
              <div key={classData.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">{classData.name}</span>
                  <span className="text-white text-sm font-semibold">{classData.studentCount} תלמידים</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">התקדמות</span>
                      <span className="text-blue-400">{classData.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${classData.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">ציון ממוצע</span>
                      <span className="text-green-400">{classData.averageScore}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${classData.averageScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Student Distribution */}
        <Card>
          <h3 className="text-xl font-bold text-white mb-4">התפלגות תלמידים</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-cyber-blue rounded-full ml-2"></div>
                <span className="text-sm font-medium text-gray-700">התלמידים שלי</span>
              </div>
              <span className="text-sm text-gray-600">{myStudentCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-cyber-yellow rounded-full ml-2"></div>
                <span className="text-sm font-medium text-gray-700">לא משויכים</span>
              </div>
              <span className="text-sm text-gray-600">{unassignedCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-cyber-green rounded-full ml-2"></div>
                <span className="text-sm font-medium text-gray-700">של מורים אחרים</span>
              </div>
              <span className="text-sm text-gray-600">{otherTeachersStudents}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Performing Students */}
      <Card>
        <h3 className="text-xl font-bold text-white mb-4">תלמידים מצטיינים</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">תלמיד</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">כיתה</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">התקדמות</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">שיעורים הושלמו</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">זמן למידה</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topStudents.map((student, index) => {
                const studentClass = classes.find(c => c.id === student.classId);
                const progress = getStudentProgress(student);
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-cyber-blue flex items-center justify-center text-white font-medium text-sm">
                            {(student.displayName || student.email || '?')[0].toUpperCase()}
                          </div>
                        </div>
                        <div className="mr-3">
                          <div className="text-sm font-medium text-gray-900">
                            {student.displayName || 'ללא שם'}
                          </div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {studentClass ? studentClass.name : 'לא משויך'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="flex-1 mr-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-cyber-blue h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm text-gray-900">{progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {Math.floor(Math.random() * 9) + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {Math.floor(Math.random() * 20) + 5}h
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Lesson Completion Chart */}
      <Card>
        <h3 className="text-xl font-bold text-white mb-4">השלמת שיעורים</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessonCompletionData.map(lesson => (
            <div key={lesson.lessonId} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">{lesson.title}</h4>
                <span className="text-xs text-gray-500">שיעור {lesson.lessonId}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>אחוז השלמה</span>
                  <span className="font-medium">{lesson.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-cyber-green h-2 rounded-full transition-all duration-300"
                    style={{ width: `${lesson.completionRate}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>ציון ממוצע: {lesson.averageScore}%</span>
                  <span>{lesson.studentsAttempted} תלמידים</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
