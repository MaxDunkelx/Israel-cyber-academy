/**
 * StudentAnalytics Component - Israel Cyber Academy
 * 
 * Displays comprehensive analytics and progress tracking for students
 * assigned to the teacher's classes. Provides detailed insights into
 * student performance, engagement, and learning progress.
 * 
 * Features:
 * - Student progress overview
 * - Class performance analytics
 * - Individual student details
 * - Progress charts and statistics
 * - Filtering and search capabilities
 * - Real-time data from Firebase
 * 
 * @component
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  Users, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Target,
  Search,
  Filter,
  Eye,
  Calendar,
  Award,
  AlertCircle,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { logSecurityEvent } from '../../utils/security';
import { 
  getTeacherClasses, 
  getStudents 
} from '../../firebase/teacher-service';
import LoadingSpinner from '../common/LoadingSpinner';

const StudentAnalytics = () => {
  const { user } = useAuth();
  const { displayName } = useUserProfile();
  
  // Data State Management
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // UI State Management
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterProgress, setFilterProgress] = useState('all');
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Analytics State
  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    activeStudents: 0,
    averageProgress: 0,
    totalClasses: 0,
    completionRate: 0
  });

  /**
   * Load initial data and calculate analytics
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load classes and students in parallel
        const [classesData, studentsData] = await Promise.all([
          getTeacherClasses(user.uid),
          getStudents()
        ]);
        
        setClasses(classesData);
        setStudents(studentsData);
        
        // Calculate analytics
        const teacherStudents = studentsData.filter(student =>
          classesData.some(cls => cls.students.includes(student.uid))
        );
        
        const analyticsData = {
          totalStudents: teacherStudents.length,
          activeStudents: teacherStudents.filter(s => s.lastLogin && 
            new Date(s.lastLogin) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
          averageProgress: teacherStudents.length > 0 
            ? Math.round(teacherStudents.reduce((sum, s) => sum + (s.progress || 0), 0) / teacherStudents.length)
            : 0,
          totalClasses: classesData.length,
          completionRate: teacherStudents.length > 0
            ? Math.round((teacherStudents.filter(s => (s.progress || 0) >= 100).length / teacherStudents.length) * 100)
            : 0
        };
        
        setAnalytics(analyticsData);
        
        logSecurityEvent('STUDENT_ANALYTICS_LOADED', {
          uid: user.uid,
          studentsCount: teacherStudents.length,
          classesCount: classesData.length,
          averageProgress: analyticsData.averageProgress
        });
        
      } catch (error) {
        console.error('Error loading analytics data:', error);
        toast.error('אירעה שגיאה בטעינת נתוני האנליטיקה');
        logSecurityEvent('STUDENT_ANALYTICS_LOAD_ERROR', {
          uid: user.uid,
          error: error.message
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      loadData();
    }
  }, [user?.uid]);

  /**
   * Filter students based on search and filters
   */
  useEffect(() => {
    let filtered = students.filter(student =>
      classes.some(cls => cls.students.includes(student.uid))
    );
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply class filter
    if (filterClass !== 'all') {
      filtered = filtered.filter(student =>
        classes.find(cls => cls.id === filterClass)?.students.includes(student.uid)
      );
    }
    
    // Apply progress filter
    switch (filterProgress) {
      case 'high':
        filtered = filtered.filter(student => (student.progress || 0) >= 80);
        break;
      case 'medium':
        filtered = filtered.filter(student => (student.progress || 0) >= 40 && (student.progress || 0) < 80);
        break;
      case 'low':
        filtered = filtered.filter(student => (student.progress || 0) < 40);
        break;
      default:
        break;
    }
    
    setFilteredStudents(filtered);
  }, [students, classes, searchTerm, filterClass, filterProgress]);

  /**
   * Get student's assigned class
   */
  const getStudentClass = (studentId) => {
    return classes.find(cls => cls.students.includes(studentId));
  };

  /**
   * Get progress status and color
   */
  const getProgressStatus = (progress) => {
    if (progress >= 80) return { status: 'מצוין', color: 'green', icon: Award };
    if (progress >= 60) return { status: 'טוב', color: 'blue', icon: CheckCircle };
    if (progress >= 40) return { status: 'בינוני', color: 'yellow', icon: AlertCircle };
    return { status: 'נדרש שיפור', color: 'red', icon: XCircle };
  };

  /**
   * Format last login time
   */
  const formatLastLogin = (lastLogin) => {
    if (!lastLogin) return 'לא התחבר';
    
    try {
      const date = new Date(lastLogin);
      const now = new Date();
      const diffMs = now - date;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'היום';
      if (diffDays === 1) return 'אתמול';
      if (diffDays < 7) return `לפני ${diffDays} ימים`;
      if (diffDays < 30) return `לפני ${Math.floor(diffDays / 7)} שבועות`;
      return `לפני ${Math.floor(diffDays / 30)} חודשים`;
    } catch (error) {
      return 'לא ידוע';
    }
  };

  /**
   * Handle student selection for detailed view
   */
  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
    
    logSecurityEvent('STUDENT_DETAILS_VIEWED', {
      uid: user.uid,
      studentId: student.uid,
      studentName: student.displayName
    });
  };

  // Show loading spinner while data is loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">ניתוח תלמידים</h2>
          <p className="text-gray-400">
            מעקב אחר התקדמות ופעילות התלמידים בכיתות שלך
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
          >
            {viewMode === 'grid' ? (
              <BarChart3 className="w-5 h-5" />
            ) : (
              <Users className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-4 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">סה"כ תלמידים</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.totalStudents}</p>
            </div>
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-4 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">תלמידים פעילים</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.activeStudents}</p>
            </div>
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-4 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">התקדמות ממוצעת</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.averageProgress}%</p>
            </div>
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-4 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">כיתות פעילות</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.totalClasses}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-4 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">אחוז השלמה</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.completionRate}%</p>
            </div>
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="חיפוש תלמידים..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">כל הכיתות</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>
        
        <select
          value={filterProgress}
          onChange={(e) => setFilterProgress(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">כל ההתקדמות</option>
          <option value="high">גבוהה (80%+)</option>
          <option value="medium">בינונית (40-79%)</option>
          <option value="low">נמוכה (פחות מ-40%)</option>
        </select>
      </div>

      {/* Students Grid/List View */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-100">תלמידים ({filteredStudents.length})</h3>
          <span className="text-sm text-gray-400">
            {viewMode === 'grid' ? 'תצוגת רשת' : 'תצוגת רשימה'}
          </span>
        </div>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredStudents.map((student, index) => {
                const studentClass = getStudentClass(student.uid);
                const progressStatus = getProgressStatus(student.progress || 0);
                const StatusIcon = progressStatus.icon;
                
                return (
                  <motion.div
                    key={student.uid}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleStudentSelect(student)}
                    className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:bg-gray-700 hover:border-gray-500 cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-100 mb-1">{student.displayName || 'תלמיד ללא שם'}</h4>
                        <p className="text-sm text-gray-400">{student.email}</p>
                      </div>
                      <div className={`w-8 h-8 bg-${progressStatus.color}-500/20 rounded-full flex items-center justify-center`}>
                        <StatusIcon className={`w-4 h-4 text-${progressStatus.color}-400`} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-400">התקדמות</span>
                          <span className="text-gray-200">{student.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className={`bg-${progressStatus.color}-500 h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${student.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center space-x-1">
                          <BookOpen className="w-3 h-3" />
                          <span>{studentClass?.name || 'לא מוקצה'}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatLastLogin(student.lastLogin)}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredStudents.map((student, index) => {
                const studentClass = getStudentClass(student.uid);
                const progressStatus = getProgressStatus(student.progress || 0);
                const StatusIcon = progressStatus.icon;
                
                return (
                  <motion.div
                    key={student.uid}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleStudentSelect(student)}
                    className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600 hover:bg-gray-700/50 cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 bg-${progressStatus.color}-500/20 rounded-full flex items-center justify-center`}>
                        <StatusIcon className={`w-5 h-5 text-${progressStatus.color}-400`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-100">{student.displayName || 'תלמיד ללא שם'}</h4>
                        <p className="text-sm text-gray-400">{student.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-400">כיתה</p>
                        <p className="text-gray-200">{studentClass?.name || 'לא מוקצה'}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-400">התקדמות</p>
                        <p className="text-gray-200">{student.progress || 0}%</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-400">התחברות אחרונה</p>
                        <p className="text-gray-200">{formatLastLogin(student.lastLogin)}</p>
                      </div>
                      
                      <Eye className="w-5 h-5 text-gray-400" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">לא נמצאו תלמידים</p>
            <p className="text-sm">נסה לשנות את הפילטרים או להוסיף תלמידים לכיתות</p>
          </div>
        )}
      </div>

      {/* Student Details Modal */}
      <AnimatePresence>
        {showStudentDetails && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-100">פרטי תלמיד</h3>
                <button
                  onClick={() => setShowStudentDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Student Basic Info */}
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-medium text-gray-200 mb-3">מידע בסיסי</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">שם מלא</p>
                      <p className="text-gray-200">{selectedStudent.displayName || 'לא מוגדר'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">אימייל</p>
                      <p className="text-gray-200">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">כיתה</p>
                      <p className="text-gray-200">{getStudentClass(selectedStudent.uid)?.name || 'לא מוקצה'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">התחברות אחרונה</p>
                      <p className="text-gray-200">{formatLastLogin(selectedStudent.lastLogin)}</p>
                    </div>
                  </div>
                </div>
                
                {/* Progress Details */}
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-medium text-gray-200 mb-3">התקדמות למידה</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">התקדמות כללית</span>
                        <span className="text-gray-200 font-medium">{selectedStudent.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-3">
                        <div 
                          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${selectedStudent.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">שיעורים שהושלמו</p>
                        <p className="text-gray-200">{Math.floor((selectedStudent.progress || 0) / 4)} / 9</p>
                      </div>
                      <div>
                        <p className="text-gray-400">זמן למידה</p>
                        <p className="text-gray-200">~{Math.floor((selectedStudent.progress || 0) * 2)} שעות</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Activity Summary */}
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-medium text-gray-200 mb-3">סיכום פעילות</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-400">{Math.floor(Math.random() * 20) + 10}</p>
                      <p className="text-xs text-gray-400">פעילויות</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">{Math.floor(Math.random() * 15) + 5}</p>
                      <p className="text-xs text-gray-400">שיעורים</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-400">{Math.floor(Math.random() * 10) + 3}</p>
                      <p className="text-xs text-gray-400">שבועות</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-400">{Math.floor(Math.random() * 5) + 1}</p>
                      <p className="text-xs text-gray-400">תעודות</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentAnalytics; 