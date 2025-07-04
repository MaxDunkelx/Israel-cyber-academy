/**
 * CreateStudentModal Component - System Manager
 * 
 * Modal for creating new student accounts
 * Creates users directly in Firestore without Firebase Auth login
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { X, UserPlus, Mail, Lock, User, Calendar, GraduationCap } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { logSecurityEvent } from '../../../utils/security';
import Button from '../../ui/Button';

const CreateStudentModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    grade: '',
    school: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'שם פרטי הוא שדה חובה';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'שם משפחה הוא שדה חובה';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'אימייל הוא שדה חובה';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'אימייל לא תקין';
    }

    if (!formData.password) {
      newErrors.password = 'סיסמה היא שדה חובה';
    } else if (formData.password.length < 6) {
      newErrors.password = 'סיסמה חייבת להיות לפחות 6 תווים';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'סיסמאות אינן תואמות';
    }

    if (!formData.grade.trim()) {
      newErrors.grade = 'כיתה היא שדה חובה';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Generate a unique user ID
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create comprehensive student profile in Firestore
      const studentProfile = {
        uid: userId,
        email: formData.email.toLowerCase(),
        displayName: `${formData.firstName} ${formData.lastName}`,
        role: 'student',
        // Personal information
        firstName: formData.firstName,
        lastName: formData.lastName,
        grade: formData.grade,
        school: formData.school || '',
        phone: formData.phone || '',
        // Student-specific fields
        classId: null,
        teacherId: null,
        // Progress tracking
        progress: {
          1: {
            completed: false,
            score: 0,
            completedAt: null,
            temporary: false,
            lastSlide: 0,
            pagesEngaged: [],
            lastActivity: new Date()
          }
        },
        completedLessons: [],
        currentLesson: 1,
        totalTimeSpent: 0,
        totalPagesEngaged: 0,
        achievements: [],
        streak: 0,
        // Password (for login verification)
        password: formData.password, // In production, this should be hashed
        // Status flags
        hasFirebaseAuth: false, // Will be created on first login
        isActive: true,
        // Timestamps
        createdAt: serverTimestamp(),
        lastLogin: null,
        lastActivityDate: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      // Store profile in Firestore
      await setDoc(doc(db, 'users', userId), studentProfile);
      
      // Log security event
      logSecurityEvent('STUDENT_CREATED', {
        studentId: userId,
        studentEmail: formData.email,
        createdBy: 'system_manager',
        timestamp: new Date().toISOString()
      });
      
      toast.success('תלמיד נוצר בהצלחה! התלמיד יכול להתחבר עכשיו.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        grade: '',
        school: '',
        phone: ''
      });
      
      onSuccess && onSuccess(userId);
      onClose();
      
    } catch (error) {
      console.error('Error creating student:', error);
      
      let errorMessage = 'אירעה שגיאה ביצירת התלמיד';
      
      if (error.code === 'permission-denied') {
        errorMessage = 'אין הרשאה ליצור משתמשים';
      } else if (error.message && error.message.includes('already exists')) {
        errorMessage = 'כתובת האימייל כבר קיימת במערכת';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        grade: '',
        school: '',
        phone: ''
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <UserPlus className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white">צור תלמיד חדש</h2>
              </div>
              <button
                onClick={handleClose}
                disabled={loading}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Info Alert */}
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">
                <UserPlus className="w-4 h-4 inline mr-2" />
                התלמיד יוכל להתחבר מיד עם הפרטים שיוזנו כאן. המערכת תישאר מחוברת כמנהל המערכת.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    שם פרטי *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 ${
                        errors.firstName 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-600 focus:ring-blue-500'
                      }`}
                      placeholder="שם פרטי"
                      disabled={loading}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    שם משפחה *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 ${
                        errors.lastName 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-600 focus:ring-blue-500'
                      }`}
                      placeholder="שם משפחה"
                      disabled={loading}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  אימייל *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-600 focus:ring-blue-500'
                    }`}
                    placeholder="student@example.com"
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    סיסמה *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 ${
                        errors.password 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-600 focus:ring-blue-500'
                      }`}
                      placeholder="לפחות 6 תווים"
                      disabled={loading}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    אישור סיסמה *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 ${
                        errors.confirmPassword 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-600 focus:ring-blue-500'
                      }`}
                      placeholder="אישור סיסמה"
                      disabled={loading}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Grade and School */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    כיתה *
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border focus:outline-none focus:ring-2 ${
                        errors.grade 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-600 focus:ring-blue-500'
                      }`}
                      disabled={loading}
                    >
                      <option value="">בחר כיתה</option>
                      <option value="ז">ז</option>
                      <option value="ח">ח</option>
                      <option value="ט">ט</option>
                      <option value="י">י</option>
                      <option value="יא">יא</option>
                      <option value="יב">יב</option>
                    </select>
                  </div>
                  {errors.grade && (
                    <p className="text-red-400 text-sm mt-1">{errors.grade}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    בית ספר
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="שם בית הספר"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  טלפון
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="050-1234567"
                  disabled={loading}
                />
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={handleClose}
                  variant="secondary"
                  className="flex-1"
                  disabled={loading}
                >
                  ביטול
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? 'יוצר...' : 'צור תלמיד'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateStudentModal; 