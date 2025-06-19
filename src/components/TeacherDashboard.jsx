import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { lessons } from '../data/lessons';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Send,
  Unlock,
  BarChart3,
  Calendar,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import toast from 'react-hot-toast';

const TeacherDashboard = () => {
  const { userProfile } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    averageProgress: 0,
    completedLessons: 0
  });

  useEffect(() => {
    if (userProfile?.role === 'teacher') {
      fetchStudents();
    }
  }, [userProfile]);

  const fetchStudents = async () => {
    try {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const studentsData = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === 'student');
      
      setStudents(studentsData);
      
      // Calculate stats
      const totalStudents = studentsData.length;
      const activeStudents = studentsData.filter(s => 
        s.lastLogin && new Date(s.lastLogin.toDate()) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length;
      
      const totalProgress = studentsData.reduce((sum, student) => {
        const completed = student.completedLessons?.length || 0;
        return sum + (completed / lessons.length) * 100;
      }, 0);
      
      const averageProgress = totalStudents > 0 ? Math.round(totalProgress / totalStudents) : 0;
      
      const totalCompletedLessons = studentsData.reduce((sum, student) => {
        return sum + (student.completedLessons?.length || 0);
      }, 0);
      
      setStats({
        totalStudents,
        activeStudents,
        averageProgress,
        completedLessons: totalCompletedLessons
      });
      
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('שגיאה בטעינת נתוני תלמידים');
    } finally {
      setLoading(false);
    }
  };

  const unlockLessonForAll = async (lessonId) => {
    try {
      const updates = students.map(student => 
        updateDoc(doc(db, 'users', student.id), {
          currentLesson: Math.max(student.currentLesson || 1, lessonId)
        })
      );
      
      await Promise.all(updates);
      toast.success(`שלב ${lessonId} נפתח לכל התלמידים`);
      fetchStudents(); // Refresh data
    } catch (error) {
      console.error('Error unlocking lesson:', error);
      toast.error('שגיאה בפתיחת השלב');
    }
  };

  const sendReminder = async (studentId, studentName) => {
    try {
      // In a real app, this would send an email or notification
      toast.success(`תזכורת נשלחה ל${studentName}`);
    } catch (error) {
      toast.error('שגיאה בשליחת תזכורת');
    }
  };

  const getStudentProgress = (student) => {
    const completed = student.completedLessons?.length || 0;
    return Math.round((completed / lessons.length) * 100);
  };

  const getLessonStatus = (student, lessonId) => {
    const completedLessons = student.completedLessons || [];
    const currentLesson = student.currentLesson || 1;
    
    if (completedLessons.includes(lessonId)) {
      return 'completed';
    } else if (lessonId <= currentLesson) {
      return 'available';
    } else {
      return 'locked';
    }
  };

  if (userProfile?.role !== 'teacher') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyber-blue to-cyber-purple">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">גישה מוגבלת</h1>
          <p>רק מורים יכולים לגשת לדשבורד זה</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyber-blue to-cyber-purple">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>טוען נתונים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-blue to-cyber-purple p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            דשבורד מורה
          </motion.h1>
          <p className="text-white/80 text-lg">
            ברוך הבא, {userProfile?.displayName}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-lg p-6 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Users className="h-8 w-8 text-cyber-blue mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {stats.totalStudents}
            </div>
            <div className="text-gray-600">סה"כ תלמידים</div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg p-6 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TrendingUp className="h-8 w-8 text-cyber-green mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {stats.activeStudents}
            </div>
            <div className="text-gray-600">תלמידים פעילים</div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg p-6 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Target className="h-8 w-8 text-cyber-purple mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {stats.averageProgress}%
            </div>
            <div className="text-gray-600">התקדמות ממוצעת</div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg p-6 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <BookOpen className="h-8 w-8 text-cyber-yellow mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {stats.completedLessons}
            </div>
            <div className="text-gray-600">שיעורים שהושלמו</div>
          </motion.div>
        </div>

        {/* Lesson Management */}
        <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Unlock className="h-6 w-6 text-cyber-blue mr-3" />
            ניהול שלבים
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {lessons.slice(0, 8).map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => unlockLessonForAll(lesson.id)}
                className="p-3 rounded-lg border-2 border-gray-200 hover:border-cyber-blue hover:bg-cyber-blue/5 transition-all duration-200"
              >
                <div className="text-2xl mb-1">{lesson.icon}</div>
                <div className="text-xs font-medium text-gray-700">
                  שלב {lesson.id}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 text-cyber-blue mr-3" />
            התקדמות תלמידים
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-right py-3 px-4 font-semibold">תלמיד</th>
                  <th className="text-right py-3 px-4 font-semibold">התקדמות</th>
                  <th className="text-right py-3 px-4 font-semibold">שיעור נוכחי</th>
                  <th className="text-right py-3 px-4 font-semibold">פעילות אחרונה</th>
                  <th className="text-right py-3 px-4 font-semibold">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-cyber-blue rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {student.displayName?.charAt(0) || '?'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            {student.displayName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-cyber-blue h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getStudentProgress(student)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {getStudentProgress(student)}%
                        </span>
                      </div>
                    </td>
                    
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-gray-700">
                        שלב {student.currentLesson || 1}
                      </span>
                    </td>
                    
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          {student.lastLogin 
                            ? new Date(student.lastLogin.toDate()).toLocaleDateString('he-IL')
                            : 'לא התחבר'
                          }
                        </span>
                      </div>
                    </td>
                    
                    <td className="py-3 px-4">
                      <button
                        onClick={() => sendReminder(student.id, student.displayName)}
                        className="btn-secondary text-sm px-3 py-1"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        תזכורת
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 