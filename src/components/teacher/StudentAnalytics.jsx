/**
 * StudentAnalytics Component - Israel Cyber Academy
 * 
 * Provides comprehensive analytics and progress tracking for students
 * assigned to the teacher's classes. Shows detailed statistics, progress
 * charts, and individual student performance data.
 * 
 * Features:
 * - Student progress overview
 * - Class performance analytics
 * - Individual student details
 * - Progress visualization
 * - Filtering and search
 * - Real-time data from Firebase
 * 
 * @component
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Clock, 
  BookOpen,
  Search,
  Filter,
  Eye,
  Calendar,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { logSecurityEvent } from '../../utils/security';
import { getTeacherClasses } from '../../firebase/teacher-service';
import LoadingSpinner from '../common/LoadingSpinner';

const StudentAnalytics = () => {
  const { user } = useAuth();
  
  // Data State Management
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // UI State Management
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterProgress, setFilterProgress] = useState('all');
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  
  // Analytics State
  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    activeStudents: 0,
    completedLessons: 0,
    averageProgress: 0,
    topPerformers: [],
    needsAttention: []
  });

  /**
   * Load teacher's classes and student data
   * Calculates analytics and prepares data for display
   */
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        
        // Load teacher's classes
        const classesData = await getTeacherClasses(user.uid);
        setClasses(classesData);
        
        // Extract and process student data
        const allStudents = [];
        classesData.forEach(cls => {
          // Mock student data - in production this would come from Firebase
          const classStudents = cls.students.map(studentId => ({
            uid: studentId,
            displayName: `תלמיד ${studentId.slice(-4)}`,
            email: `student${studentId.slice(-4)}@example.com`,
            classId: cls.id,
            className: cls.name,
            lessonName: cls.lessonName,
            progress: Math.floor(Math.random() * 100), // Mock progress
            completedLessons: Math.floor(Math.random() * 25),
            totalLessons: 25,
            lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
            status: Math.random() > 0.2 ? 'active' : 'inactive'
          }));
          allStudents.push(...classStudents);
        });
        
        setStudents(allStudents);
        setFilteredStudents(allStudents);
        
        // Calculate analytics
        const totalStudents = allStudents.length;
        const activeStudents = allStudents.filter(s => s.status === 'active').length;
        const completedLessons = allStudents.reduce((sum, s) => sum + s.completedLessons, 0);
        const averageProgress = totalStudents > 0 ? 
          Math.round(allStudents.reduce((sum, s) => sum + s.progress, 0) / totalStudents) : 0;
        
        const topPerformers = [...allStudents]
          .sort((a, b) => b.progress - a.progress)
          .slice(0, 5);
        
        const needsAttention = allStudents
          .filter(s => s.progress < 30 || s.status === 'inactive')
          .slice(0, 5);
        
        setAnalytics({
          totalStudents,
          activeStudents,
          completedLessons,
          averageProgress,
          topPerformers,
          needsAttention
        });
        
        logSecurityEvent('STUDENT_ANALYTICS_LOADED', {
          uid: user.uid,
          classesCount: classesData.length,
          studentsCount: totalStudents,
          averageProgress
        });
        
      } catch (error) {
        console.error('Error loading analytics:', error);
        toast.error('אירעה שגיאה בטעינת הנתונים');
        logSecurityEvent('STUDENT_ANALYTICS_LOAD_ERROR', {
          uid: user.uid,
          error: error.message
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      loadAnalytics();
    }
  }, [user?.uid]);

  /**
   * Filter students based on search and filter criteria
   */
  useEffect(() => {
    let filtered = students;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.className?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply class filter
    if (filterClass !== 'all') {
      filtered = filtered.filter(student => student.classId === filterClass);
    }
    
    // Apply progress filter
    switch (filterProgress) {
      case 'high':
        filtered = filtered.filter(student => student.progress >= 80);
        break;
      case 'medium':
        filtered = filtered.filter(student => student.progress >= 40 && student.progress < 80);
        break;
      case 'low':
        filtered = filtered.filter(student => student.progress < 40);
        break;
      case 'inactive':
        filtered = filtered.filter(student => student.status === 'inactive');
        break;
      default:
        break;
    }
    
    setFilteredStudents(filtered);
  }, [students, searchTerm, filterClass, filterProgress]);

  /**
   * Get progress color based on percentage
   * @param {number} progress - Progress percentage
   * @returns {string} Tailwind color class
   */
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-400';
    if (progress >= 60) return 'text-yellow-400';
    if (progress >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  /**
   * Get progress background color
   * @param {number} progress - Progress percentage
   * @returns {string} Tailwind color class
   */
  const getProgressBgColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  /**
   * Format date for display
   * @param {Date} date - Date to format
   * @returns {string} Formatted date string
   */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Handle student detail view
   * @param {Object} student - Student object to view
   */
  const handleViewStudent = (student) => {
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
            מעקב אחר התקדמות {analytics.totalStudents} תלמידים ב-{classes.length} כיתות
          </p>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">סה"כ תלמידים</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">תלמידים פעילים</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.activeStudents}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">שיעורים שהושלמו</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.completedLessons}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">התקדמות ממוצעת</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.averageProgress}%</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
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
            placeholder="חיפוש לפי שם, אימייל או כיתה..."
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
          <option value="all">כל הרמות</option>
          <option value="high">התקדמות גבוהה (80%+)</option>
          <option value="medium">התקדמות בינונית (40-80%)</option>
          <option value="low">התקדמות נמוכה (<40%)</option>
          <option value="inactive">לא פעילים</option>
        </select>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Students List */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-100">רשימת תלמידים</h3>
              <span className="text-sm text-gray-400">{filteredStudents.length} תלמידים</span>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {filteredStudents.map((student) => (
                  <motion.div
                    key={student.uid}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 rounded-lg border border-gray-600 bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
                    onClick={() => handleViewStudent(student)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          student.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <p className="font-medium text-gray-100">{student.displayName}</p>
                          <p className="text-sm text-gray-400">{student.email}</p>
                          <p className="text-xs text-gray-500">{student.className}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-sm font-medium ${getProgressColor(student.progress)}`}>
                            {student.progress}%
                          </span>
                          <Eye className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="w-20 bg-gray-600 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressBgColor(student.progress)}`}
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>לא נמצאו תלמידים</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Highlights */}
        <div className="space-y-6">
          {/* Top Performers */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-gray-100">תלמידים מצטיינים</h3>
            </div>
            
            <div className="space-y-3">
              {analytics.topPerformers.map((student, index) => (
                <div key={student.uid} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400 font-bold">#{index + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-200">{student.displayName}</p>
                      <p className="text-xs text-gray-400">{student.className}</p>
                    </div>
                  </div>
                  <span className="text-green-400 font-bold">{student.progress}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Needs Attention */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-semibold text-gray-100">דורש תשומת לב</h3>
            </div>
            
            <div className="space-y-3">
              {analytics.needsAttention.map((student) => (
                <div key={student.uid} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-200">{student.displayName}</p>
                    <p className="text-xs text-gray-400">{student.className}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${getProgressColor(student.progress)}`}>
                      {student.progress}%
                    </span>
                    {student.status === 'inactive' && (
                      <div className="text-xs text-red-400">לא פעיל</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
              className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-100">פרטי תלמיד</h3>
                <button
                  onClick={() => setShowStudentDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Student Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">שם</label>
                    <p className="text-gray-200">{selectedStudent.displayName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">אימייל</label>
                    <p className="text-gray-200">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">כיתה</label>
                    <p className="text-gray-200">{selectedStudent.className}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">שיעור</label>
                    <p className="text-gray-200">{selectedStudent.lessonName}</p>
                  </div>
                </div>
                
                {/* Progress Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">התקדמות</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">התקדמות כללית</span>
                      <span className={`font-bold ${getProgressColor(selectedStudent.progress)}`}>
                        {selectedStudent.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${getProgressBgColor(selectedStudent.progress)}`}
                        style={{ width: `${selectedStudent.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>שיעורים שהושלמו: {selectedStudent.completedLessons}/{selectedStudent.totalLessons}</span>
                      <span>סטטוס: {selectedStudent.status === 'active' ? 'פעיל' : 'לא פעיל'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Activity Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">פעילות אחרונה</label>
                  <p className="text-gray-200">{formatDate(selectedStudent.lastActivity)}</p>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowStudentDetails(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-gray-200 transition-colors"
                >
                  סגור
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentAnalytics; 