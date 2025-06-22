/**
 * StudentPool Component - Israel Cyber Academy
 * 
<<<<<<< HEAD
 * Enhanced student management interface for instructors.
 * Features drag-and-drop assignment, real-time updates, and beautiful UI.
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
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
<<<<<<< HEAD
  CheckCircle,
  Mail,
  Phone,
  GraduationCap,
  Star,
  Eye,
  Edit3,
  MoreVertical,
  RefreshCw,
  Download,
  Upload
=======
  CheckCircle
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { logSecurityEvent } from '../../utils/security';
import { 
  getStudents, 
<<<<<<< HEAD
  getAllAvailableStudents,
=======
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
  createClass, 
  getTeacherClasses, 
  assignStudentToClass, 
  removeStudentFromClass,
  deleteClass
} from '../../firebase/teacher-service';
import LoadingSpinner from '../common/LoadingSpinner';
<<<<<<< HEAD
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

const StudentPool = () => {
  const { currentUser } = useAuth();
=======

const StudentPool = () => {
  const { user } = useAuth();
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
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
<<<<<<< HEAD
  const [isDragging, setIsDragging] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
=======
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
  
  // Form State Management
  const [newClass, setNewClass] = useState({
    name: '',
    lessonId: 1,
    lessonName: 'מבוא לאבטחת סייבר',
    startDate: '',
    startHour: '09:00',
<<<<<<< HEAD
    maxStudents: 25,
    description: ''
=======
    maxStudents: 25
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
  });

  /**
   * Available lessons for class creation
   */
  const availableLessons = [
<<<<<<< HEAD
    { id: 1, name: 'מבוא לאבטחת סייבר', description: 'יסודות האבטחה הדיגיטלית', color: 'blue' },
    { id: 2, name: 'רכיבי המחשב', description: 'הכרת החומרה והתוכנה', color: 'green' },
    { id: 3, name: 'מערכת ההפעלה Windows', description: 'עבודה עם Windows', color: 'purple' },
    { id: 4, name: 'מערכת ההפעלה Linux', description: 'עבודה עם Linux', color: 'orange' },
    { id: 5, name: 'רשתות תקשורת', description: 'יסודות הרשתות', color: 'cyan' },
    { id: 6, name: 'פרוטוקולי תקשורת', description: 'HTTP, HTTPS, FTP ועוד', color: 'pink' },
    { id: 7, name: 'פיתוח אתרים', description: 'HTML, CSS, JavaScript', color: 'yellow' },
    { id: 8, name: 'מסדי נתונים', description: 'SQL ו-NoSQL', color: 'indigo' },
    { id: 9, name: 'כלי פיתוח', description: 'Git, Docker, ועוד', color: 'red' }
=======
    { id: 1, name: 'מבוא לאבטחת סייבר', description: 'יסודות האבטחה הדיגיטלית' },
    { id: 2, name: 'רכיבי המחשב', description: 'הכרת החומרה והתוכנה' },
    { id: 3, name: 'מערכת ההפעלה Windows', description: 'עבודה עם Windows' },
    { id: 4, name: 'מערכת ההפעלה Linux', description: 'עבודה עם Linux' },
    { id: 5, name: 'רשתות תקשורת', description: 'יסודות הרשתות' },
    { id: 6, name: 'פרוטוקולי תקשורת', description: 'HTTP, HTTPS, FTP ועוד' },
    { id: 7, name: 'פיתוח אתרים', description: 'HTML, CSS, JavaScript' },
    { id: 8, name: 'מסדי נתונים', description: 'SQL ו-NoSQL' },
    { id: 9, name: 'כלי פיתוח', description: 'Git, Docker, ועוד' }
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
  ];

  /**
   * Load initial data from Firebase
<<<<<<< HEAD
=======
   * Fetches students and teacher's classes
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
<<<<<<< HEAD
        if (!currentUser?.uid) {
          console.log('No authenticated user found');
          return;
        }
        
        const [studentsData, classesData] = await Promise.all([
          getAllAvailableStudents(),
          getTeacherClasses(currentUser.uid)
=======
        // Load students and classes in parallel
        const [studentsData, classesData] = await Promise.all([
          getStudents(),
          getTeacherClasses(user.uid)
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
        ]);
        
        setStudents(studentsData);
        setClasses(classesData);
        
<<<<<<< HEAD
        const assigned = studentsData.filter(student => 
          classesData.some(cls => cls.students?.includes(student.uid))
        );
        setAssignedStudents(assigned);
        
        // Log detailed breakdown
        const studentsWithRole = studentsData.filter(s => s.role === 'student');
        const usersWithoutRole = studentsData.filter(s => !s.role || s.role !== 'student');
        
        console.log('📊 Student Pool Breakdown:', {
          totalAvailable: studentsData.length,
          studentsWithRole: studentsWithRole.length,
          usersWithoutRole: usersWithoutRole.length,
          assignedToClasses: assigned.length,
          unassigned: studentsData.length - assigned.length
        });
        
        logSecurityEvent('STUDENT_POOL_DATA_LOADED', {
          uid: currentUser.uid,
=======
        // Calculate assigned students
        const assigned = studentsData.filter(student => 
          classesData.some(cls => cls.students.includes(student.uid))
        );
        setAssignedStudents(assigned);
        
        logSecurityEvent('STUDENT_POOL_DATA_LOADED', {
          uid: user.uid,
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
          studentsCount: studentsData.length,
          classesCount: classesData.length,
          assignedCount: assigned.length
        });
        
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('אירעה שגיאה בטעינת הנתונים');
<<<<<<< HEAD
=======
        logSecurityEvent('STUDENT_POOL_LOAD_ERROR', {
          uid: user.uid,
          error: error.message
        });
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
    if (currentUser?.uid) {
      loadData();
    }
  }, [currentUser?.uid]);

  /**
   * Filter students based on search and status
=======
    if (user?.uid) {
      loadData();
    }
  }, [user?.uid]);

  /**
   * Filter students based on search term and status
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
   */
  useEffect(() => {
    let filtered = students;
    
<<<<<<< HEAD
=======
    // Apply search filter
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
<<<<<<< HEAD
    switch (filterStatus) {
      case 'assigned':
        filtered = filtered.filter(student =>
          classes.some(cls => cls.students?.includes(student.uid))
=======
    // Apply status filter
    switch (filterStatus) {
      case 'assigned':
        filtered = filtered.filter(student =>
          classes.some(cls => cls.students.includes(student.uid))
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
        );
        break;
      case 'unassigned':
        filtered = filtered.filter(student =>
<<<<<<< HEAD
          !classes.some(cls => cls.students?.includes(student.uid))
=======
          !classes.some(cls => cls.students.includes(student.uid))
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
        );
        break;
      default:
        break;
    }
    
    setFilteredStudents(filtered);
  }, [students, classes, searchTerm, filterStatus]);

  /**
<<<<<<< HEAD
   * Handle class creation
   */
  const handleCreateClass = async () => {
    try {
=======
   * Handle class creation with validation
   */
  const handleCreateClass = async () => {
    try {
      // Validate form data
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
      if (!newClass.name || !newClass.startDate) {
        toast.error('יש למלא את כל השדות הנדרשים');
        return;
      }

<<<<<<< HEAD
      const classData = {
        ...newClass,
        teacherId: currentUser.uid,
=======
      // Create class in Firebase
      const classData = {
        ...newClass,
        teacherId: user.uid,
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
        teacherName: displayName,
        createdAt: new Date().toISOString(),
        students: [],
        currentLesson: 1,
        totalLessons: 25,
        status: 'active'
      };

<<<<<<< HEAD
      const createdClass = await createClass(classData, currentUser.uid);
      
      setClasses(prev => [...prev, { ...classData, id: createdClass }]);
      setShowCreateClass(false);
=======
      const createdClass = await createClass(classData);
      
      // Update local state
      setClasses(prev => [...prev, createdClass]);
      
      // Reset form
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
      setNewClass({
        name: '',
        lessonId: 1,
        lessonName: 'מבוא לאבטחת סייבר',
        startDate: '',
        startHour: '09:00',
<<<<<<< HEAD
        maxStudents: 25,
        description: ''
      });
      
      toast.success('הכיתה נוצרה בהצלחה!');
      
      logSecurityEvent('CLASS_CREATED', {
        uid: currentUser.uid,
        classId: createdClass,
        className: classData.name
=======
        maxStudents: 25
      });
      setShowCreateClass(false);
      
      toast.success('הכיתה נוצרה בהצלחה');
      
      logSecurityEvent('CLASS_CREATED', {
        uid: user.uid,
        classId: createdClass.id,
        className: createdClass.name,
        lessonId: createdClass.lessonId
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
      });
      
    } catch (error) {
      console.error('Error creating class:', error);
      toast.error('אירעה שגיאה ביצירת הכיתה');
<<<<<<< HEAD
=======
      logSecurityEvent('CLASS_CREATION_ERROR', {
        uid: user.uid,
        error: error.message
      });
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
    }
  };

  /**
<<<<<<< HEAD
   * Handle student assignment
   */
  const handleStudentAssignment = useCallback(async (studentId, classId, action) => {
    try {
      if (action === 'assign') {
        await assignStudentToClass(studentId, classId, currentUser.uid);
        setClasses(prev => prev.map(cls => 
          cls.id === classId 
            ? { ...cls, students: [...(cls.students || []), studentId] }
=======
   * Handle student assignment to class via drag-and-drop
   */
  const handleStudentAssignment = useCallback(async (studentId, classId, action = 'assign') => {
    try {
      if (action === 'assign') {
        await assignStudentToClass(studentId, classId);
        setClasses(prev => prev.map(cls => 
          cls.id === classId 
            ? { ...cls, students: [...cls.students, studentId] }
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
            : cls
        ));
        toast.success('התלמיד הוקצה לכיתה בהצלחה');
      } else {
        await removeStudentFromClass(studentId, classId);
        setClasses(prev => prev.map(cls => 
          cls.id === classId 
<<<<<<< HEAD
            ? { ...cls, students: (cls.students || []).filter(id => id !== studentId) }
=======
            ? { ...cls, students: cls.students.filter(id => id !== studentId) }
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
            : cls
        ));
        toast.success('התלמיד הוסר מהכיתה בהצלחה');
      }
      
<<<<<<< HEAD
      setHasUnsavedChanges(false);
      
      logSecurityEvent('STUDENT_ASSIGNMENT_CHANGED', {
        uid: currentUser.uid,
=======
      logSecurityEvent('STUDENT_ASSIGNMENT_CHANGED', {
        uid: user.uid,
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
        studentId,
        classId,
        action
      });
      
    } catch (error) {
      console.error('Error updating student assignment:', error);
      toast.error('אירעה שגיאה בעדכון הקצאת התלמיד');
    }
<<<<<<< HEAD
  }, [currentUser.uid]);

  /**
   * Save all changes to database
   */
  const handleSaveChanges = async () => {
    if (!hasUnsavedChanges) return;
    
    try {
      setIsSaving(true);
      
      // Save all class changes to database
      for (const cls of classes) {
        const classRef = doc(db, 'classes', cls.id);
        await updateDoc(classRef, {
          students: cls.students || [],
          updatedAt: serverTimestamp()
        });
      }
      
      setHasUnsavedChanges(false);
      toast.success('השינויים נשמרו בהצלחה!');
      
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('אירעה שגיאה בשמירת השינויים');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Handle class deletion
=======
  }, [user.uid]);

  /**
   * Handle class deletion with confirmation
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
   */
  const handleDeleteClass = async (classId) => {
    try {
      await deleteClass(classId);
      setClasses(prev => prev.filter(cls => cls.id !== classId));
      setShowClassSettings(false);
      setSelectedClass(null);
      
      toast.success('הכיתה נמחקה בהצלחה');
      
      logSecurityEvent('CLASS_DELETED', {
<<<<<<< HEAD
        uid: currentUser.uid,
=======
        uid: user.uid,
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
        classId
      });
      
    } catch (error) {
      console.error('Error deleting class:', error);
      toast.error('אירעה שגיאה במחיקת הכיתה');
    }
  };

  /**
<<<<<<< HEAD
   * Drag and drop handlers
=======
   * Drag event handlers for student cards
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
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
<<<<<<< HEAD
    if (draggedStudent && !isDragging) {
      setIsDragging(true);
      
      // Check if student is already assigned to another class
      const currentClass = classes.find(cls => 
        cls.students?.includes(draggedStudent.uid)
      );
      
      if (currentClass && currentClass.id !== classId) {
        // Show notification about the move
        const targetClass = classes.find(cls => cls.id === classId);
        toast.success(`התלמיד הועבר מ"${currentClass.name}" ל"${targetClass?.name}"`);
        
        // Remove from current class first, then add to new class
        handleStudentAssignment(draggedStudent.uid, currentClass.id, 'remove').then(() => {
          // After removal, add to new class
          return handleStudentAssignment(draggedStudent.uid, classId, 'assign');
        }).finally(() => {
          setIsDragging(false);
          setDraggedStudent(null);
        });
      } else {
        // Student is not in any class, just add to new class
        handleStudentAssignment(draggedStudent.uid, classId, 'assign').finally(() => {
          setIsDragging(false);
          setDraggedStudent(null);
        });
      }
=======
    if (draggedStudent) {
      handleStudentAssignment(draggedStudent.uid, classId, 'assign');
      setDraggedStudent(null);
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
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

<<<<<<< HEAD
  /**
   * Get student assignment status
   */
  const getStudentAssignmentStatus = (studentId) => {
    const assignedClass = classes.find(cls => cls.students?.includes(studentId));
    return assignedClass ? {
      assigned: true,
      className: assignedClass.name,
      classId: assignedClass.id
    } : {
      assigned: false,
      className: null,
      classId: null
    };
  };

  /**
   * Warn user before leaving with unsaved changes
   */
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'יש לך שינויים לא שמורים. האם אתה בטוח שברצונך לעזוב?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Show loading spinner
=======
  // Show loading spinner while data is loading
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="flex h-[80vh] w-full">
      {/* Sidebar: Available Users */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col p-4 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-100 flex items-center mb-2">
            <Users className="w-5 h-5 mr-2 text-blue-400" />
            משתמשים זמינים
          </h2>
          <input
            type="text"
            placeholder="חיפוש..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">כל המשתמשים</option>
            <option value="unassigned">לא מוקצים</option>
            <option value="assigned">מוקצים</option>
          </select>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {filteredStudents.length === 0 ? (
            <div className="text-gray-400 text-center mt-8">
              <Users className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>לא נמצאו משתמשים זמינים</p>
            </div>
          ) : (
            filteredStudents.map((student) => {
              const isAssigned = classes.some(cls => cls.students?.includes(student.uid));
              const assignedClass = classes.find(cls => cls.students?.includes(student.uid));
              
              return (
                <div
                  key={student.uid}
                  draggable={!isAssigned}
                  onDragStart={(e) => handleDragStart(e, student)}
                  className={`flex items-center p-2 rounded-lg border transition-all duration-150 ${
                    isAssigned 
                      ? 'cursor-not-allowed bg-green-900/60 border-green-700 text-green-100' 
                      : 'cursor-grab bg-gray-800 hover:bg-blue-900 border-gray-700 text-gray-100'
                  } ${draggedStudent?.uid === student.uid ? 'opacity-50 scale-95' : ''} ${isDragging ? 'pointer-events-none opacity-75' : ''}`}
                  title={
                    isAssigned 
                      ? `מוקצה לכיתה: ${assignedClass?.name}` 
                      : student.displayName || student.email
                  }
                >
                  <UserCheck className={`w-5 h-5 mr-2 ${isAssigned ? 'text-green-400' : 'text-blue-400'}`} />
                  <span className="truncate">{student.displayName || student.email}</span>
                  {isAssigned && (
                    <span className="ml-auto text-xs bg-green-700 px-2 py-1 rounded-full">
                      מוקצה
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* Main Area: Classes */}
      <main className="flex-1 flex flex-col p-6 bg-gray-950 overflow-x-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-100 flex items-center">
            <BookOpen className="w-7 h-7 mr-3 text-purple-400" />
            ניהול כיתות
            {hasUnsavedChanges && (
              <span className="ml-3 text-yellow-400 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                שינויים לא שמורים
              </span>
            )}
          </h2>
          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <button
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200"
              >
                {isSaving ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                <span>{isSaving ? 'שומר...' : 'שמור שינויים'}</span>
              </button>
            )}
            <button
              onClick={() => setShowCreateClass(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>צור כיתה חדשה</span>
            </button>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {classes.length === 0 ? (
            <div className="text-gray-400 text-center mt-8">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg">אין כיתות פעילות</p>
              <p className="text-xs">צור כיתה חדשה כדי להתחיל</p>
            </div>
          ) : (
            classes.map((cls) => (
              <div
                key={cls.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, cls.id)}
                className={`min-w-[320px] max-w-xs bg-gray-800 rounded-xl border-2 border-gray-700 p-4 flex flex-col transition-all duration-200 ${draggedStudent ? 'border-blue-500/50 bg-blue-500/5' : ''} ${isDragging ? 'border-yellow-500/50 bg-yellow-500/5' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-100 truncate">{cls.name}</h4>
                  <button
                    onClick={() => {
                      setSelectedClass(cls);
                      setShowClassSettings(true);
                    }}
                    className="p-1 rounded-full hover:bg-gray-600 text-gray-400"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  {cls.startDate && formatDate(cls.startDate)}
                </div>
                <div className="flex-1 space-y-2 overflow-y-auto min-h-[60px]">
                  {(cls.students && cls.students.length > 0) ? (
                    cls.students.map((studentId) => {
                      const student = students.find((s) => s.uid === studentId);
                      if (!student) return null;
                      return (
                        <div
                          key={student.uid}
                          draggable
                          onDragStart={(e) => handleDragStart(e, student)}
                          className="flex items-center p-2 rounded-lg cursor-grab bg-blue-900/60 border border-blue-700 text-blue-100 hover:bg-blue-800 transition-all duration-150"
                          title={student.displayName || student.email}
                        >
                          <UserCheck className="w-4 h-4 mr-2 text-blue-300" />
                          <span className="truncate">{student.displayName || student.email}</span>
                          <button
                            onClick={() => {
                              // Save to database (this will update state automatically)
                              handleStudentAssignment(student.uid, cls.id, 'remove');
                            }}
                            className="ml-auto p-1 rounded-full hover:bg-red-600 text-red-300"
                            title="הסר מהכיתה"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-gray-500 text-xs text-center py-4">אין תלמידים מוקצים</div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-400">
                    {cls.students?.length || 0}/{cls.maxStudents || 25} תלמידים
                  </span>
                  <span className="text-xs text-gray-400">
                    {Math.round(((cls.students?.length || 0) / (cls.maxStudents || 25)) * 100)}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Create Class Modal */}
      {showCreateClass && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700"
          >
            <h3 className="text-xl font-semibold text-gray-100 mb-4">צור כיתה חדשה</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">שם הכיתה</label>
                <input
                  type="text"
                  value={newClass.name}
                  onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="לדוגמה: כיתה א'"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">תיאור</label>
                <textarea
                  value={newClass.description}
                  onChange={(e) => setNewClass(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="תיאור קצר של הכיתה"
                  rows="3"
                />
              </div>
              
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
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">מספר מקסימלי של תלמידים</label>
                <input
                  type="number"
                  value={newClass.maxStudents}
                  onChange={(e) => setNewClass(prev => ({ ...prev, maxStudents: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="50"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateClass(false)}
                className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                ביטול
              </button>
              <button
                onClick={handleCreateClass}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                צור כיתה
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Student Details Modal */}
      {showStudentDetails && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-100">פרטי תלמיד</h3>
              <button
                onClick={() => setShowStudentDetails(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-100">{selectedStudent.displayName}</p>
                  <p className="text-sm text-gray-400">{selectedStudent.email}</p>
                </div>
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="font-medium text-gray-200 mb-2">סטטוס הקצאה</h4>
                {(() => {
                  const assignment = getStudentAssignmentStatus(selectedStudent.uid);
                  return assignment.assigned ? (
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>מוקצה לכיתה: {assignment.className}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-400">
                      <UserX className="w-4 h-4" />
                      <span>לא מוקצה לכיתה</span>
                    </div>
                  );
                })()}
              </div>
              
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="font-medium text-gray-200 mb-2">סטטיסטיקות</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">שיעורים שהושלמו</p>
                    <p className="text-gray-100">{selectedStudent.completedLessons?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">זמן למידה</p>
                    <p className="text-gray-100">{selectedStudent.totalTimeSpent || 0} דקות</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowStudentDetails(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                סגור
              </button>
            </div>
          </motion.div>
        </div>
      )}
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
    </div>
  );
};

export default StudentPool; 