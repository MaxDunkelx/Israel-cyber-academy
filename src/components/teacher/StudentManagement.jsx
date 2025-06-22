import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Award, 
  UserPlus, 
  UserMinus,
  Building,
  Eye,
  Filter,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  GraduationCap
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { isTeacher, validateTeacherAccess, logSecurityEvent } from '../../utils/security';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

export default function StudentManagement({
  students,
  classes,
  currentTeacherId,
  onAssignStudent,
  onUnassignStudent,
  getStudentProgress,
  getMyStudents,
  getUnassignedStudents,
  getOtherTeachersStudents
}) {
  const { currentUser } = useAuth();
  const { role } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, my, unassigned, others
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    // Security check - ensure only teachers can access this component
    if (!currentUser) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', { role: 'none' }, { component: 'StudentManagement' });
      return;
    }

    const validation = validateTeacherAccess({ role }, 'manage_students');
    if (!validation.success) {
      logSecurityEvent('INSUFFICIENT_PERMISSIONS', { role, uid: currentUser.uid }, { 
        component: 'StudentManagement',
        reason: validation.message 
      });
      toast.error('אין לך הרשאות לניהול תלמידים');
      return;
    }

    // Load mock data
    loadData();
  }, [currentUser, role]);

  // Security check - if not a teacher, show access denied
  if (!isTeacher({ role })) {
    logSecurityEvent('STUDENT_ACCESS_ATTEMPT', { role, uid: currentUser?.uid }, { component: 'StudentManagement' });
    return (
      <div className="text-center py-8">
        <p className="text-red-400">אין לך הרשאות לגשת לניהול תלמידים</p>
      </div>
    );
  }

  const loadData = () => {
    // Mock data - in real app, this would come from Firebase
    const mockClasses = [
      { id: 1, name: 'כיתה א\'' },
      { id: 2, name: 'כיתה ב\'' },
      { id: 3, name: 'כיתה ג\'' }
    ];

    const mockStudents = [
      {
        id: 1,
        name: 'יוסי כהן',
        email: 'yossi@example.com',
        phone: '050-1234567',
        classId: 1,
        className: 'כיתה א\'',
        progress: 75,
        lastActivity: '2024-01-15T10:30:00Z',
        completedLessons: 6,
        totalLessons: 9
      },
      {
        id: 2,
        name: 'שרה לוי',
        email: 'sarah@example.com',
        phone: '050-2345678',
        classId: 1,
        className: 'כיתה א\'',
        progress: 88,
        lastActivity: '2024-01-15T09:15:00Z',
        completedLessons: 8,
        totalLessons: 9
      },
      {
        id: 3,
        name: 'דוד אברהם',
        email: 'david@example.com',
        phone: '050-3456789',
        classId: 2,
        className: 'כיתה ב\'',
        progress: 92,
        lastActivity: '2024-01-15T11:45:00Z',
        completedLessons: 9,
        totalLessons: 9
      },
      {
        id: 4,
        name: 'מיכל רוזן',
        email: 'michal@example.com',
        phone: '050-4567890',
        classId: 2,
        className: 'כיתה ב\'',
        progress: 67,
        lastActivity: '2024-01-14T16:20:00Z',
        completedLessons: 6,
        totalLessons: 9
      },
      {
        id: 5,
        name: 'עמית שפירא',
        email: 'amit@example.com',
        phone: '050-5678901',
        classId: 3,
        className: 'כיתה ג\'',
        progress: 100,
        lastActivity: '2024-01-15T12:30:00Z',
        completedLessons: 9,
        totalLessons: 9
      }
    ];

    setClasses(mockClasses);
    setStudents(mockStudents);
    setLoading(false);
  };

  const myStudents = getMyStudents();
  const unassignedStudents = getUnassignedStudents();
  const otherTeachersStudents = getOtherTeachersStudents();

  const getFilteredStudents = () => {
    let filtered = students;
    
    // Apply filter
    switch (filterType) {
      case 'my':
        filtered = myStudents;
        break;
      case 'unassigned':
        filtered = unassignedStudents;
        break;
      case 'others':
        filtered = otherTeachersStudents;
        break;
      default:
        filtered = students;
    }
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getStudentClass = (classId) => {
    return classes.find(c => c.id === classId);
  };

  const getTeacherName = (teacherId) => {
    if (!teacherId) return 'לא משויך';
    if (teacherId === currentTeacherId) return 'אני';
    return `מורה ${teacherId.slice(-4)}`; // Show last 4 chars of teacher ID
  };

  const handleAssignStudent = async (studentId, classId) => {
    await onAssignStudent(studentId, classId, currentTeacherId);
    setShowAssignModal(false);
    setSelectedStudent(null);
  };

  const handleUnassignStudent = async (studentId) => {
    if (window.confirm('האם אתה בטוח שברצונך לבטל את ההקצאה של תלמיד זה?')) {
      await onUnassignStudent(studentId);
    }
  };

  const handleAddStudent = (studentData) => {
    const newStudent = {
      id: Date.now(),
      ...studentData,
      progress: 0,
      lastActivity: new Date().toISOString(),
      completedLessons: 0,
      totalLessons: 9
    };
    setStudents([...students, newStudent]);
    setShowAddModal(false);
    toast.success('תלמיד נוסף בהצלחה');
  };

  const handleEditStudent = (studentData) => {
    setStudents(students.map(student => student.id === studentData.id ? studentData : student));
    setEditingStudent(null);
    toast.success('תלמיד עודכן בהצלחה');
  };

  const handleDeleteStudent = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId));
    toast.success('תלמיד נמחק בהצלחה');
  };

  const filteredStudents = getFilteredStudents();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Users className="h-6 w-6 text-cyber-blue mr-3" />
          ניהול תלמידים
        </h2>
        <p className="text-gray-600">צפה בהתקדמות התלמידים והקצה אותם לכיתות</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
          <Users className="h-8 w-8 text-cyber-blue mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {students.length}
          </div>
          <div className="text-gray-600">סה"כ תלמידים</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
          <UserPlus className="h-8 w-8 text-cyber-green mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {myStudents.length}
          </div>
          <div className="text-gray-600">התלמידים שלי</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
          <UserMinus className="h-8 w-8 text-cyber-yellow mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {unassignedStudents.length}
          </div>
          <div className="text-gray-600">לא משויכים</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
          <Building className="h-8 w-8 text-cyber-purple mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {otherTeachersStudents.length}
          </div>
          <div className="text-gray-600">של מורים אחרים</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="חפש תלמידים..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
            >
              <option value="all">כל התלמידים</option>
              <option value="my">התלמידים שלי</option>
              <option value="unassigned">לא משויכים</option>
              <option value="others">של מורים אחרים</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  תלמיד
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  מורה אחראי
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  כיתה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  התקדמות
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => {
                const progress = getStudentProgress(student);
                const studentClass = getStudentClass(student.classId);
                const teacherName = getTeacherName(student.teacherId);
                const isMyStudent = student.teacherId === currentTeacherId;
                const isUnassigned = !student.teacherId;
                
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-cyber-blue flex items-center justify-center text-white font-medium">
                            {(student.name || student.email || '?')[0].toUpperCase()}
                          </div>
                        </div>
                        <div className="mr-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name || 'ללא שם'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isMyStudent 
                          ? 'bg-cyber-green text-white'
                          : isUnassigned
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-cyber-yellow text-gray-800'
                      }`}>
                        {teacherName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {studentClass ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyber-blue text-white">
                          {studentClass.name}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          לא משויך
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 mr-3">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2 space-x-reverse">
                        {isUnassigned && (
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setShowAssignModal(true);
                            }}
                            className="text-cyber-blue hover:text-cyber-blue-dark"
                            title="הקצה לעצמי"
                          >
                            <UserPlus className="h-4 w-4" />
                          </button>
                        )}
                        {isMyStudent && (
                          <button
                            onClick={() => handleUnassignStudent(student.id)}
                            className="text-red-600 hover:text-red-800"
                            title="בטל הקצאה"
                          >
                            <UserMinus className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowAssignModal(true);
                          }}
                          className="text-gray-600 hover:text-cyber-blue"
                          title="צפה בפרטים"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Student Modal */}
      {showAssignModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                הקצה תלמיד לכיתה
              </h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                <strong>{selectedStudent.name || selectedStudent.email}</strong>
              </p>
              <p className="text-sm text-gray-500">
                התקדמות נוכחית: {getStudentProgress(selectedStudent)}%
              </p>
            </div>

            <div className="space-y-3">
              {classes.map((classData) => (
                <button
                  key={classData.id}
                  onClick={() => handleAssignStudent(selectedStudent.id, classData.id)}
                  className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-right"
                >
                  <div className="font-medium text-gray-800">{classData.name}</div>
                  <div className="text-sm text-gray-500">
                    {students.filter(s => s.classId === classData.id).length} תלמידים
                  </div>
                </button>
              ))}
            </div>

            {classes.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                אין כיתות זמינות. צור כיתה תחילה.
              </p>
            )}
          </div>
        </div>
      )}

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">לא נמצאו תלמידים</h3>
          <p className="text-gray-500">נסה לשנות את החיפוש או הפילטרים</p>
        </div>
      )}

      {/* Add/Edit Student Modal */}
      {(showAddModal || editingStudent) && (
        <StudentModal
          studentData={editingStudent}
          classes={classes}
          onSave={editingStudent ? handleEditStudent : handleAddStudent}
          onCancel={() => {
            setShowAddModal(false);
            setEditingStudent(null);
          }}
        />
      )}
    </div>
  );
}

// Student Modal Component
const StudentModal = ({ studentData, classes, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: studentData?.name || '',
    email: studentData?.email || '',
    phone: studentData?.phone || '',
    classId: studentData?.classId || classes[0]?.id || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.classId) {
      toast.error('נא למלא את כל השדות הנדרשים');
      return;
    }
    
    const selectedClass = classes.find(cls => cls.id === parseInt(formData.classId));
    onSave({ 
      ...studentData, 
      ...formData, 
      classId: parseInt(formData.classId),
      className: selectedClass?.name 
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <h3 className="text-xl font-bold text-white mb-4">
          {studentData ? 'ערוך תלמיד' : 'הוסף תלמיד חדש'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">שם מלא</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="שם התלמיד"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-2">אימייל</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="student@example.com"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-2">טלפון</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="050-1234567"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-2">כיתה</label>
            <select
              value={formData.classId}
              onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button type="submit" variant="primary" className="flex-1">
              {studentData ? 'עדכן' : 'הוסף'}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
              ביטול
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
