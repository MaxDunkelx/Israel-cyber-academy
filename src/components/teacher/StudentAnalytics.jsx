/**
 * StudentAnalytics Component - Israel Cyber Academy
 * 
<<<<<<< HEAD
 * Displays comprehensive analytics and progress tracking for students
 * assigned to the teacher's classes. Provides detailed insights into
 * student performance, engagement, and learning progress.
=======
 * Provides comprehensive analytics and progress tracking for students
 * assigned to the teacher's classes. Shows detailed statistics, progress
 * charts, and individual student performance data.
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
 * 
 * Features:
 * - Student progress overview
 * - Class performance analytics
 * - Individual student details
<<<<<<< HEAD
 * - Progress charts and statistics
 * - Filtering and search capabilities
=======
 * - Progress visualization
 * - Filtering and search
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
 * - Real-time data from Firebase
 * 
 * @component
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
<<<<<<< HEAD
  Users, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Target,
=======
  BarChart3, 
  Users, 
  TrendingUp, 
  Clock, 
  BookOpen,
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
  Search,
  Filter,
  Eye,
  Calendar,
<<<<<<< HEAD
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
=======
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { logSecurityEvent } from '../../utils/security';
import { getTeacherClasses } from '../../firebase/teacher-service';
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
import LoadingSpinner from '../common/LoadingSpinner';

const StudentAnalytics = () => {
  const { user } = useAuth();
<<<<<<< HEAD
  const { displayName } = useUserProfile();
  
  // Data State Management
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
=======
  
  // Data State Management
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // UI State Management
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterProgress, setFilterProgress] = useState('all');
  const [showStudentDetails, setShowStudentDetails] = useState(false);
<<<<<<< HEAD
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
=======
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
  
  // Analytics State
  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    activeStudents: 0,
<<<<<<< HEAD
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
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
        logSecurityEvent('STUDENT_ANALYTICS_LOAD_ERROR', {
          uid: user.uid,
          error: error.message
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
<<<<<<< HEAD
      loadData();
=======
      loadAnalytics();
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
    }
  }, [user?.uid]);

  /**
<<<<<<< HEAD
   * Filter students based on search and filters
   */
  useEffect(() => {
    let filtered = students.filter(student =>
      classes.some(cls => cls.students.includes(student.uid))
    );
=======
   * Filter students based on search and filter criteria
   */
  useEffect(() => {
    let filtered = students;
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
<<<<<<< HEAD
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
=======
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.className?.toLowerCase().includes(searchTerm.toLowerCase())
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
      );
    }
    
    // Apply class filter
    if (filterClass !== 'all') {
<<<<<<< HEAD
      filtered = filtered.filter(student =>
        classes.find(cls => cls.id === filterClass)?.students.includes(student.uid)
      );
=======
      filtered = filtered.filter(student => student.classId === filterClass);
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
    }
    
    // Apply progress filter
    switch (filterProgress) {
      case 'high':
<<<<<<< HEAD
        filtered = filtered.filter(student => (student.progress || 0) >= 80);
        break;
      case 'medium':
        filtered = filtered.filter(student => (student.progress || 0) >= 40 && (student.progress || 0) < 80);
        break;
      case 'low':
        filtered = filtered.filter(student => (student.progress || 0) < 40);
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
        break;
      default:
        break;
    }
    
    setFilteredStudents(filtered);
<<<<<<< HEAD
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
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
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
<<<<<<< HEAD
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
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">סה"כ תלמידים</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.totalStudents}</p>
            </div>
<<<<<<< HEAD
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
=======
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
<<<<<<< HEAD
          className="bg-gray-800 rounded-xl p-4 border border-gray-700"
=======
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">תלמידים פעילים</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.activeStudents}</p>
            </div>
<<<<<<< HEAD
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-400" />
=======
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
<<<<<<< HEAD
          className="bg-gray-800 rounded-xl p-4 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">התקדמות ממוצעת</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.averageProgress}%</p>
            </div>
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
=======
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">שיעורים שהושלמו</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.completedLessons}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-400" />
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
<<<<<<< HEAD
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
=======
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">התקדמות ממוצעת</p>
              <p className="text-2xl font-bold text-gray-100">{analytics.averageProgress}%</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
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
<<<<<<< HEAD
            placeholder="חיפוש תלמידים..."
=======
            placeholder="חיפוש לפי שם, אימייל או כיתה..."
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
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
<<<<<<< HEAD
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
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
                  <motion.div
                    key={student.uid}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
<<<<<<< HEAD
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
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
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
<<<<<<< HEAD
              className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto"
=======
              className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl border border-gray-700"
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-100">פרטי תלמיד</h3>
                <button
                  onClick={() => setShowStudentDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                >
<<<<<<< HEAD
                  <X className="w-5 h-5" />
=======
                  <XCircle className="w-5 h-5" />
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
                </button>
              </div>
              
              <div className="space-y-6">
<<<<<<< HEAD
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
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
                  </div>
                </div>
                
                {/* Progress Details */}
<<<<<<< HEAD
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
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
                    </div>
                  </div>
                </div>
                
<<<<<<< HEAD
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
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentAnalytics; 