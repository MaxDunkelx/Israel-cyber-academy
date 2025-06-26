/**
 * CreateTeacherModal Component
 * 
 * Modal for creating new teacher accounts
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Mail, User, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebase-config';
import { logSecurityEvent } from '../../../utils/security';
import Button from '../../ui/Button';

const CreateTeacherModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    displayName: '',
    password: 'Teacher123!' // Default password for new teachers
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;
      
      // Update display name in Auth
      const displayName = formData.displayName || `${formData.firstName} ${formData.lastName}`;
      await updateProfile(user, { displayName });
      
      // Create comprehensive teacher profile in Firestore
      const teacherProfile = {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        role: 'teacher',
        // User credentials
        firstName: formData.firstName,
        lastName: formData.lastName,
        // Teacher-specific fields
        teacherClasses: [], // Array of class IDs managed by this teacher
        teacherPermissions: ['manage_students', 'view_analytics', 'add_comments'],
        teacherSettings: {
          defaultClassId: null,
          notificationPreferences: {
            emailNotifications: true,
            studentProgressAlerts: true,
            classUpdates: true
          }
        },
        // Progress tracking (for consistency)
        progress: {},
        completedLessons: [],
        currentLesson: 1,
        totalTimeSpent: 0,
        totalPagesEngaged: 0,
        achievements: [],
        streak: 0,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        lastActivityDate: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      // Store profile in Firestore
      await setDoc(doc(db, 'users', user.uid), teacherProfile);
      
      // Log security event
      logSecurityEvent('TEACHER_CREATED', {
        teacherId: user.uid,
        teacherEmail: formData.email,
        createdBy: auth.currentUser?.uid,
        timestamp: new Date().toISOString()
      });
      
      toast.success('המורה נוצר בהצלחה');
      onSuccess();
    } catch (error) {
      console.error('Error creating teacher:', error);
      
      let errorMessage = 'אירעה שגיאה ביצירת המורה';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'כתובת האימייל כבר קיימת במערכת';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'הסיסמה חייבת להכיל לפחות 6 תווים';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'כתובת האימייל אינה תקינה';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
          className="bg-gray-800 rounded-lg w-full max-w-md"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <UserPlus className="w-5 h-5" />
                <span>צור מורה חדש</span>
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">אימייל</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="הכנס אימייל"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">שם פרטי</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="שם פרטי"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">שם משפחה</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="שם משפחה"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">שם תצוגה</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="שם תצוגה (אופציונלי)"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  variant="primary"
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>יוצר...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>צור מורה</span>
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

export default CreateTeacherModal; 