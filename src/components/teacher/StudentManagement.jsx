import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Award, 
  UserPlus, 
  UserMinus,
  Building,
  Eye,
  Filter
} from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, my, unassigned, others
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
        student.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const filteredStudents = getFilteredStudents();

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
                            {(student.displayName || student.email || '?')[0].toUpperCase()}
                          </div>
                        </div>
                        <div className="mr-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.displayName || 'ללא שם'}
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
                <strong>{selectedStudent.displayName || selectedStudent.email}</strong>
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
    </div>
  );
}
