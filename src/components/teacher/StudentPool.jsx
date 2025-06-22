/**
 * StudentPool Component - Israel Cyber Academy
 * 
 * Manages student assignments to classes with drag-and-drop functionality.
 * Allows teachers to create classes, assign students, and track class progress.
 * 
 * Features:
 * - Drag-and-drop student assignment
 * - Class creation with lesson selection
 * - Real-time Firebase integration
 * - Search and filtering
 * - Class management (delete, view details)
 * - Security logging
 * 
 * @component
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Settings,
  Calendar,
  Clock,
  BookOpen,
  UserCheck,
  UserX,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { logSecurityEvent } from '../../utils/security';
import { 
  getStudents, 
  createClass, 
  getTeacherClasses, 
  assignStudentToClass, 
  removeStudentFromClass,
  deleteClass
} from '../../firebase/teacher-service';
import LoadingSpinner from '../common/LoadingSpinner';

const StudentPool = () => {
  const { user } = useAuth();
  const { displayName } = useUserProfile();
  
  // Data State Management
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);
  
  // UI State Management
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showClassSettings, setShowClassSettings] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [draggedStudent, setDraggedStudent] = useState(null);
  
  // Form State Management
  const [newClass, setNewClass] = useState({
    name: '',
    lessonId: 1,
    lessonName: 'מבוא לאבטחת סייבר',
    startDate: '',
    startHour: '09:00',
    maxStudents: 25
  });

  /**
   * Available lessons for class creation
   */
  const availableLessons = [
    { id: 1, name: 'מבוא לאבטחת סייבר', description: 'יסודות האבטחה הדיגיטלית' },
    { id: 2, name: 'רכיבי המחשב', description: 'הכרת החומרה והתוכנה' },
    { id: 3, name: 'מערכת ההפעלה Windows', description: 'עבודה עם Windows' },
    { id: 4, name: 'מערכת ההפעלה Linux', description: 'עבודה עם Linux' },
    { id: 5, name: 'רשתות תקשורת', description: 'יסודות הרשתות' },
    { id: 6, name: 'פרוטוקולי תקשורת', description: 'HTTP, HTTPS, FTP ועוד' },
    { id: 7, name: 'פיתוח אתרים', description: 'HTML, CSS, JavaScript' },
    { id: 8, name: 'מסדי נתונים', description: 'SQL ו-NoSQL' },
    { id: 9, name: 'כלי פיתוח', description: 'Git, Docker, ועוד' }
  ];

  /**
   * Load initial data from Firebase
   * Fetches students and teacher's classes
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load students and classes in parallel
        const [studentsData, classesData] = await Promise.all([
          getStudents(),
          getTeacherClasses(user.uid)
        ]);
        
        setStudents(studentsData);
        setClasses(classesData);
        
        // Calculate assigned students
        const assigned = studentsData.filter(student => 
          classesData.some(cls => cls.students.includes(student.uid))
        );
        setAssignedStudents(assigned);
        
        logSecurityEvent('STUDENT_POOL_DATA_LOADED', {
          uid: user.uid,
          studentsCount: studentsData.length,
          classesCount: classesData.length,
          assignedCount: assigned.length
        });
        
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('אירעה שגיאה בטעינת הנתונים');
        logSecurityEvent('STUDENT_POOL_LOAD_ERROR', {
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
   * Filter students based on search term and status
   */
  useEffect(() => {
    let filtered = students;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    switch (filterStatus) {
      case 'assigned':
        filtered = filtered.filter(student =>
          classes.some(cls => cls.students.includes(student.uid))
        );
        break;
      case 'unassigned':
        filtered = filtered.filter(student =>
          !classes.some(cls => cls.students.includes(student.uid))
        );
        break;
      default:
        break;
    }
    
    setFilteredStudents(filtered);
  }, [students, classes, searchTerm, filterStatus]);

  /**
   * Handle class creation with validation
   */
  const handleCreateClass = async () => {
    try {
      // Validate form data
      if (!newClass.name || !newClass.startDate) {
        toast.error('יש למלא את כל השדות הנדרשים');
        return;
      }

      // Create class in Firebase
      const classData = {
        ...newClass,
        teacherId: user.uid,
        teacherName: displayName,
        createdAt: new Date().toISOString(),
        students: [],
        currentLesson: 1,
        totalLessons: 25,
        status: 'active'
      };

      const createdClass = await createClass(classData);
      
      // Update local state
      setClasses(prev => [...prev, createdClass]);
      
      // Reset form
      setNewClass({
        name: '',
        lessonId: 1,
        lessonName: 'מבוא לאבטחת סייבר',
        startDate: '',
        startHour: '09:00',
        maxStudents: 25
      });
      setShowCreateClass(false);
      
      toast.success('הכיתה נוצרה בהצלחה');
      
      logSecurityEvent('CLASS_CREATED', {
        uid: user.uid,
        classId: createdClass.id,
        className: createdClass.name,
        lessonId: createdClass.lessonId
      });
      
    } catch (error) {
      console.error('Error creating class:', error);
      toast.error('אירעה שגיאה ביצירת הכיתה');
      logSecurityEvent('CLASS_CREATION_ERROR', {
        uid: user.uid,
        error: error.message
      });
    }
  };

  /**
   * Handle student assignment to class via drag-and-drop
   */
  const handleStudentAssignment = useCallback(async (studentId, classId, action = 'assign') => {
    try {
      if (action === 'assign') {
        await assignStudentToClass(studentId, classId);
        setClasses(prev => prev.map(cls => 
          cls.id === classId 
            ? { ...cls, students: [...cls.students, studentId] }
            : cls
        ));
        toast.success('התלמיד הוקצה לכיתה בהצלחה');
      } else {
        await removeStudentFromClass(studentId, classId);
        setClasses(prev => prev.map(cls => 
          cls.id === classId 
            ? { ...cls, students: cls.students.filter(id => id !== studentId) }
            : cls
        ));
        toast.success('התלמיד הוסר מהכיתה בהצלחה');
      }
      
      logSecurityEvent('STUDENT_ASSIGNMENT_CHANGED', {
        uid: user.uid,
        studentId,
        classId,
        action
      });
      
    } catch (error) {
      console.error('Error updating student assignment:', error);
      toast.error('אירעה שגיאה בעדכון הקצאת התלמיד');
    }
  }, [user.uid]);

  /**
   * Handle class deletion with confirmation
   */
  const handleDeleteClass = async (classId) => {
    try {
      await deleteClass(classId);
      setClasses(prev => prev.filter(cls => cls.id !== classId));
      setShowClassSettings(false);
      setSelectedClass(null);
      
      toast.success('הכיתה נמחקה בהצלחה');
      
      logSecurityEvent('CLASS_DELETED', {
        uid: user.uid,
        classId
      });
      
    } catch (error) {
      console.error('Error deleting class:', error);
      toast.error('אירעה שגיאה במחיקת הכיתה');
    }
  };

  /**
   * Drag event handlers for student cards
   */
  const handleDragStart = (e, student) => {
    setDraggedStudent(student);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, classId) => {
    e.preventDefault();
    if (draggedStudent) {
      handleStudentAssignment(draggedStudent.uid, classId, 'assign');
      setDraggedStudent(null);
    }
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('he-IL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
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
          <h2 className="text-2xl font-bold text-gray-100 mb-2">בריכת תלמידים</h2>
          <p className="text-gray-400">
            {students.length} תלמידים זמינים • {classes.length} כיתות פעילות
          </p>
        </div>
        
        <button
          onClick={() => setShowCreateClass(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-gray-100 font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>צור כיתה חדשה</span>
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="חיפוש לפי שם או אימייל..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">כל התלמידים</option>
          <option value="assigned">מוקצים לכיתה</option>
          <option value="unassigned">לא מוקצים</option>
        </select>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Students Pool */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-100">תלמידים זמינים</h3>
              <span className="text-sm text-gray-400">{filteredStudents.length} תלמידים</span>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {filteredStudents.map((student) => {
                  const isAssigned = classes.some(cls => cls.students.includes(student.uid));
                  
                  return (
                    <motion.div
                      key={student.uid}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, student)}
                      className={`p-4 rounded-lg border cursor-move transition-all duration-200 ${
                        isAssigned
                          ? 'bg-green-500/10 border-green-500/30 text-green-100'
                          : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-gray-200'
                      } ${draggedStudent?.uid === student.uid ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            isAssigned ? 'bg-green-500' : 'bg-gray-500'
                          }`}></div>
                          <div>
                            <p className="font-medium">{student.displayName || 'תלמיד ללא שם'}</p>
                            <p className="text-sm text-gray-400">{student.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isAssigned 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-600 text-gray-300'
                          }`}>
                            {isAssigned ? 'מוקצה' : 'זמין'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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

        {/* Classes Section */}
        <div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-100">הכיתות שלי</h3>
              <span className="text-sm text-gray-400">{classes.length} כיתות</span>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {classes.map((cls) => (
                  <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, cls.id)}
                    className="p-4 rounded-lg border border-gray-600 bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-100 mb-1">{cls.name}</h4>
                        <p className="text-sm text-gray-400 mb-2">{cls.lessonName}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(cls.startDate)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{cls.startHour}</span>
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setSelectedClass(cls);
                          setShowClassSettings(true);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        {cls.students.length} / {cls.maxStudents} תלמידים
                      </span>
                      <div className="w-16 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(cls.students.length / cls.maxStudents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {classes.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>אין כיתות פעילות</p>
                  <p className="text-xs mt-1">צור כיתה חדשה כדי להתחיל</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Class Modal */}
      <AnimatePresence>
        {showCreateClass && (
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
              className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-100 mb-4">צור כיתה חדשה</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">שם הכיתה</label>
                  <input
                    type="text"
                    value={newClass.name}
                    onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="למשל: כיתה א'"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">שיעור</label>
                  <select
                    value={newClass.lessonId}
                    onChange={(e) => {
                      const lesson = availableLessons.find(l => l.id === parseInt(e.target.value));
                      setNewClass(prev => ({ 
                        ...prev, 
                        lessonId: parseInt(e.target.value),
                        lessonName: lesson?.name || prev.lessonName
                      }));
                    }}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {availableLessons.map(lesson => (
                      <option key={lesson.id} value={lesson.id}>
                        {lesson.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">תאריך התחלה</label>
                    <input
                      type="date"
                      value={newClass.startDate}
                      onChange={(e) => setNewClass(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">שעת התחלה</label>
                    <input
                      type="time"
                      value={newClass.startHour}
                      onChange={(e) => setNewClass(prev => ({ ...prev, startHour: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">מספר מקסימלי של תלמידים</label>
                  <input
                    type="number"
                    value={newClass.maxStudents}
                    onChange={(e) => setNewClass(prev => ({ ...prev, maxStudents: parseInt(e.target.value) }))}
                    min="1"
                    max="50"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateClass(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-gray-200 transition-colors"
                >
                  ביטול
                </button>
                <button
                  onClick={handleCreateClass}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-gray-100 transition-colors"
                >
                  צור כיתה
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Class Settings Modal */}
      <AnimatePresence>
        {showClassSettings && selectedClass && (
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
              className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-100 mb-4">הגדרות כיתה</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-medium text-gray-200 mb-2">{selectedClass.name}</h4>
                  <p className="text-sm text-gray-400">{selectedClass.lessonName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">תאריך התחלה:</span>
                    <p className="text-gray-200">{formatDate(selectedClass.startDate)}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">שעת התחלה:</span>
                    <p className="text-gray-200">{selectedClass.startHour}</p>
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400">תלמידים:</span>
                  <p className="text-gray-200">{selectedClass.students.length} / {selectedClass.maxStudents}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowClassSettings(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-gray-200 transition-colors"
                >
                  סגור
                </button>
                <button
                  onClick={() => handleDeleteClass(selectedClass.id)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-gray-100 transition-colors"
                >
                  מחק כיתה
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentPool; 