import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit, 
  UserCheck, 
  UserX, 
  BookOpen,
  Calendar,
  Clock,
  Target,
  Search,
  Filter,
  MoreVertical,
  Save,
  X
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { 
  getAllStudents, 
  getAllClasses, 
  createClass, 
  updateClass, 
  deleteClass, 
  assignStudentsToClass,
  getTeacherClasses 
} from '../../firebase/teacher-service';
import { getAllLessonsWithSlideCounts } from '../../firebase/content-service';
import LoadingSpinner from '../common/LoadingSpinner';

const StudentPool = () => {
  const { currentUser } = useAuth();
  
  // State management
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [draggedStudent, setDraggedStudent] = useState(null);
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  
  // Form states
  const [newClass, setNewClass] = useState({
    name: '',
    description: '',
    maxStudents: 30,
    initialLesson: ''
  });

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const teacherId = currentUser?.id || currentUser?.uid;
      console.log('🔄 Loading data for teacher:', teacherId);
      
      // Load students, classes, and lessons
      console.log('📚 Fetching students...');
      const studentsData = await getAllStudents();
      console.log('✅ Students fetched:', studentsData.length, 'students');
      console.log('📋 Students data:', studentsData);
      
      console.log('🏫 Fetching classes...');
      const classesData = await getTeacherClasses(teacherId);
      console.log('✅ Classes fetched:', classesData.length, 'classes');
      console.log('📋 Classes data:', classesData);
      
      console.log('📖 Fetching lessons...');
      const lessonsDataRaw = await getAllLessonsWithSlideCounts();
      // Sort lessons by order or originalId
      const lessonsData = lessonsDataRaw.slice().sort((a, b) => {
        const orderA = a.order ?? a.originalId ?? 0;
        const orderB = b.order ?? b.originalId ?? 0;
        if (orderA !== orderB) return orderA - orderB;
        return (a.title || '').localeCompare(b.title || '');
      });
      console.log('✅ Lessons fetched:', lessonsData.length, 'lessons');
      console.log('📋 Lessons data:', lessonsData);
      
      setStudents(studentsData);
      setClasses(classesData);
      setLessons(lessonsData);
      
      console.log('✅ All data loaded successfully');
    } catch (error) {
      console.error('❌ Error loading data:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      toast.error('שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  };

  // Filter students based on search and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'assigned' && student.assignedToClass) ||
                         (filterStatus === 'unassigned' && !student.assignedToClass);
    
    return matchesSearch && matchesFilter;
  });

  // Handle class creation
  const handleCreateClass = async (e) => {
    e.preventDefault();
    
    if (!newClass.name.trim()) {
      toast.error('שם הכיתה הוא שדה חובה');
      return;
    }

    try {
      const teacherId = currentUser?.id || currentUser?.uid;
      const createdClass = await createClass(newClass, teacherId);
      setClasses(prev => [createdClass, ...prev]);
      setNewClass({ name: '', description: '', maxStudents: 30, initialLesson: '' });
      setShowCreateClass(false);
      toast.success('הכיתה נוצרה בהצלחה');
    } catch (error) {
      console.error('Error creating class:', error);
      toast.error('שגיאה ביצירת הכיתה');
    }
  };

  // Handle class update
  const handleUpdateClass = async (e) => {
    e.preventDefault();
    
    if (!editingClass.name.trim()) {
      toast.error('שם הכיתה הוא שדה חובה');
      return;
    }

    try {
      const teacherId = currentUser?.id || currentUser?.uid;
      await updateClass(editingClass.id, {
        name: editingClass.name,
        description: editingClass.description,
        maxStudents: editingClass.maxStudents
      }, teacherId);
      
      setClasses(prev => prev.map(c => 
        c.id === editingClass.id ? { ...c, ...editingClass } : c
      ));
      setEditingClass(null);
      toast.success('הכיתה עודכנה בהצלחה');
    } catch (error) {
      console.error('Error updating class:', error);
      toast.error('שגיאה בעדכון הכיתה');
    }
  };

  // Handle class deletion
  const handleDeleteClass = async (classId) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק כיתה זו?')) return;

    try {
      const teacherId = currentUser?.id || currentUser?.uid;
      await deleteClass(classId, teacherId);
      setClasses(prev => prev.filter(c => c.id !== classId));
      toast.success('הכיתה נמחקה בהצלחה');
    } catch (error) {
      console.error('Error deleting class:', error);
      toast.error('שגיאה במחיקת הכיתה');
    }
  };

  // Handle student assignment
  const handleAssignStudents = async (classId, studentIds) => {
    try {
      const teacherId = currentUser?.id || currentUser?.uid;
      await assignStudentsToClass(classId, studentIds, teacherId);
      
      // Update local state
      setStudents(prev => prev.map(student => ({
        ...student,
        classId: studentIds.includes(student.id) ? classId : student.classId,
        teacherId: studentIds.includes(student.id) ? teacherId : student.teacherId,
        assignedToClass: studentIds.includes(student.id),
        assignedToTeacher: studentIds.includes(student.id)
      })));
      
      setClasses(prev => prev.map(c => 
        c.id === classId ? { ...c, studentIds } : c
      ));
      
      toast.success('התלמידים הוקצו בהצלחה');
    } catch (error) {
      console.error('Error assigning students:', error);
      toast.error('שגיאה בהקצאת התלמידים');
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, student) => {
    setDraggedStudent(student);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetClass) => {
    e.preventDefault();
    
    if (!draggedStudent) return;
    
    const currentStudentIds = targetClass.studentIds || [];
    const newStudentIds = [...currentStudentIds, draggedStudent.id];
    
    handleAssignStudents(targetClass.id, newStudentIds);
    setDraggedStudent(null);
  };

  // Remove student from class
  const handleRemoveStudent = async (classId, studentId) => {
    const currentStudentIds = classes.find(c => c.id === classId)?.studentIds || [];
    const newStudentIds = currentStudentIds.filter(id => id !== studentId);
    
    await handleAssignStudents(classId, newStudentIds);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">ניהול תלמידים וכיתות</h2>
          <p className="text-gray-400">הקצאת תלמידים לכיתות וניהול כיתות</p>
        </div>
        <button
          onClick={() => setShowCreateClass(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>צור כיתה חדשה</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Pool */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">בריכת תלמידים</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="חיפוש תלמידים..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">כל התלמידים</option>
                <option value="assigned">מוקצים</option>
                <option value="unassigned">לא מוקצים</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredStudents.map((student) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, student)}
                  className={`p-3 rounded-lg cursor-move transition-colors ${
                    student.assignedToClass 
                      ? 'bg-green-900/50 border border-green-500/50' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        student.assignedToClass ? 'bg-green-400' : 'bg-gray-400'
                      }`} />
                      <div>
                        <p className="text-white font-medium">{student.displayName}</p>
                        <p className="text-gray-400 text-sm">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {student.assignedToClass && (
                        <span className="text-green-400 text-xs bg-green-900/50 px-2 py-1 rounded">
                          מוקצה
                        </span>
                      )}
                      <UserCheck className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Classes Management */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">כיתות</h3>
            <span className="text-gray-400 text-sm">{classes.length} כיתות</span>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {classes.map((classItem) => (
                <motion.div
                  key={classItem.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, classItem)}
                  className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                    draggedStudent ? 'border-blue-500 bg-blue-900/20' : 'border-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-semibold">{classItem.name}</h4>
                      <p className="text-gray-400 text-sm">{classItem.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingClass(classItem)}
                        className="p-1 hover:bg-gray-700 rounded"
                      >
                        <Edit className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteClass(classItem.id)}
                        className="p-1 hover:bg-red-600 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <span>{classItem.studentIds?.length || 0} / {classItem.maxStudents} תלמידים</span>
                    <span>{classItem.isActive ? 'פעיל' : 'לא פעיל'}</span>
                  </div>

                  {/* Assigned Students */}
                  <div className="space-y-1">
                    {classItem.studentIds?.map((studentId) => {
                      const student = students.find(s => s.id === studentId);
                      return student ? (
                        <div key={studentId} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                          <span className="text-white text-sm">{student.displayName}</span>
                          <button
                            onClick={() => handleRemoveStudent(classItem.id, studentId)}
                            className="p-1 hover:bg-red-600 rounded"
                          >
                            <X className="w-3 h-3 text-red-400" />
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>

                  {(!classItem.studentIds || classItem.studentIds.length === 0) && (
                    <p className="text-gray-500 text-sm text-center py-4">
                      גרור תלמידים לכאן כדי להקצות אותם לכיתה
                    </p>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-semibold text-white mb-4">צור כיתה חדשה</h3>
              <form onSubmit={handleCreateClass} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">שם הכיתה</label>
                  <input
                    type="text"
                    value={newClass.name}
                    onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="לדוגמה: כיתה א'"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">תיאור</label>
                  <textarea
                    value={newClass.description}
                    onChange={(e) => setNewClass(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="תיאור קצר של הכיתה"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">מספר מקסימלי של תלמידים</label>
                  <input
                    type="number"
                    value={newClass.maxStudents}
                    onChange={(e) => setNewClass(prev => ({ ...prev, maxStudents: parseInt(e.target.value) }))}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="50"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">שיעור התחלתי (אופציונלי)</label>
                  <select
                    value={newClass.initialLesson}
                    onChange={(e) => setNewClass(prev => ({ ...prev, initialLesson: e.target.value }))}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">בחר שיעור התחלתי (אופציונלי)</option>
                    {lessons.map(lesson => {
                      const lessonId = lesson.originalId || lesson.order;
                      return (
                        <option key={lesson.id} value={lessonId}>
                          שיעור {lessonId} - {lesson.title} ({lesson.totalSlides || lesson.slides?.length || 0} שקופיות)
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                  >
                    צור כיתה
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateClass(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
                  >
                    ביטול
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Class Modal */}
      <AnimatePresence>
        {editingClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-semibold text-white mb-4">ערוך כיתה</h3>
              <form onSubmit={handleUpdateClass} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">שם הכיתה</label>
                  <input
                    type="text"
                    value={editingClass.name}
                    onChange={(e) => setEditingClass(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">תיאור</label>
                  <textarea
                    value={editingClass.description}
                    onChange={(e) => setEditingClass(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">מספר מקסימלי של תלמידים</label>
                  <input
                    type="number"
                    value={editingClass.maxStudents}
                    onChange={(e) => setEditingClass(prev => ({ ...prev, maxStudents: parseInt(e.target.value) }))}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="50"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                  >
                    שמור שינויים
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingClass(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
                  >
                    ביטול
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentPool;
