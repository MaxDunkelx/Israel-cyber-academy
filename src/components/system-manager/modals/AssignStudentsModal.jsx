/**
 * AssignStudentsModal Component
 * 
 * Modal for assigning students to teachers
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, UserCheck, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { collection, getDocs, query, where, updateDoc, doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { logSecurityEvent } from '../../../utils/security';
import Button from '../../ui/Button';

const AssignStudentsModal = ({ onClose, onSuccess }) => {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Load teachers and students on component mount
  useEffect(() => {
    loadTeachersAndStudents();
  }, []);

  const loadTeachersAndStudents = async () => {
    try {
      setLoadingData(true);
      
      // Load teachers
      const teachersRef = collection(db, 'users');
      const teachersQuery = query(teachersRef, where('role', '==', 'teacher'));
      const teachersSnapshot = await getDocs(teachersQuery);
      
      const teachersData = [];
      teachersSnapshot.forEach((doc) => {
        const data = doc.data();
        teachersData.push({
          id: doc.id,
          name: data.displayName || data.email,
          email: data.email
        });
      });
      setTeachers(teachersData);
      
      // Load students
      const studentsQuery = query(teachersRef, where('role', '==', 'student'));
      const studentsSnapshot = await getDocs(studentsQuery);
      
      const studentsData = [];
      studentsSnapshot.forEach((doc) => {
        const data = doc.data();
        studentsData.push({
          id: doc.id,
          name: data.displayName || data.email,
          email: data.email,
          assigned: !!data.teacherId
        });
      });
      setStudents(studentsData);
      
    } catch (error) {
      console.error('Error loading teachers and students:', error);
      toast.error('אירעה שגיאה בטעינת הנתונים');
    } finally {
      setLoadingData(false);
    }
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedTeacher) {
      toast.error('יש לבחור מורה');
      return;
    }

    if (selectedStudents.length === 0) {
      toast.error('יש לבחור תלמידים');
      return;
    }

    setLoading(true);

    try {
      // Use batch write for atomic operations
      const batch = writeBatch(db);
      
      // Ensure we're using the correct document ID for teacher
      const teacherDocumentId = selectedTeacher;
      
      // Update all selected students to assign them to the teacher
      for (const studentId of selectedStudents) {
        // Ensure we're using the correct document ID for each student
        const studentDocumentId = studentId;
        const studentRef = doc(db, 'users', studentDocumentId);
        batch.update(studentRef, {
          teacherId: teacherDocumentId,
          updatedAt: serverTimestamp()
        });
      }
      
      // Commit all changes
      await batch.commit();
      
      // Log security event
      logSecurityEvent('STUDENTS_ASSIGNED_TO_TEACHER', {
        teacherId: teacherDocumentId,
        studentIds: selectedStudents,
        assignedBy: 'system_manager', // Pure auth - no Firebase Auth UID
        timestamp: new Date().toISOString()
      });
      
      toast.success(`${selectedStudents.length} תלמידים הוקצו בהצלחה`);
      onSuccess();
    } catch (error) {
      console.error('Error assigning students:', error);
      toast.error('אירעה שגיאה בהקצאת התלמידים');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>הקצאת תלמידים למורה</span>
              </h2>
              <Button
                onClick={onClose}
                variant="secondary"
                size="sm"
                className="flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {loadingData ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-300">טוען נתונים...</p>
                </div>
              ) : (
                <>
                  {/* Teacher Selection */}
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">בחר מורה</label>
                    <select
                      value={selectedTeacher}
                      onChange={(e) => setSelectedTeacher(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">בחר מורה...</option>
                      {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name} ({teacher.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Student Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-gray-300 text-sm">בחר תלמידים</label>
                      <div className="text-sm text-gray-400">
                        נבחרו {selectedStudents.length} תלמידים
                      </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="חיפוש תלמידים..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Students List */}
                    <div className="max-h-64 overflow-y-auto border border-gray-600 rounded">
                      {filteredStudents.map(student => (
                        <div
                          key={student.id}
                          className={`flex items-center justify-between p-3 border-b border-gray-600 hover:bg-gray-700 cursor-pointer ${
                            selectedStudents.includes(student.id) ? 'bg-blue-600/20' : ''
                          }`}
                          onClick={() => handleStudentSelect(student.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => handleStudentSelect(student.id)}
                              className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                            />
                            <div>
                              <div className="text-white font-medium">{student.name}</div>
                              <div className="text-gray-400 text-sm">{student.email}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {student.assigned && (
                              <span className="text-green-400 text-xs">מוקצה</span>
                            )}
                            <UserCheck className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <Button
                  type="submit"
                  disabled={loading || loadingData || !selectedTeacher || selectedStudents.length === 0}
                  variant="primary"
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>מקצה...</span>
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4" />
                      <span>הקצה תלמידים</span>
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={onClose}
                  variant="secondary"
                  className="flex-1"
                >
                  ביטול
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AssignStudentsModal; 