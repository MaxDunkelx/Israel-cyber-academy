import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { isTeacher, logSecurityEvent } from '../../utils/security';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const TeacherLogin = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();
  const { role, loading: roleLoading } = useUserProfile();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Debug logging
  console.log('🔍 TeacherLogin - Current user:', currentUser?.email);
  console.log('🔍 TeacherLogin - User role:', role);
  console.log('🔍 TeacherLogin - Role loading:', roleLoading);

  // Check if user is already logged in as teacher
  useEffect(() => {
    if (currentUser && role === 'teacher' && !roleLoading) {
      console.log('✅ TeacherLogin: User is already logged in as teacher, redirecting to dashboard');
      navigate('/teacher/dashboard');
    }
  }, [currentUser, role, roleLoading, navigate]);

  // Show loading while checking role
  if (roleLoading) {
    console.log('⏳ TeacherLogin: Loading user role...');
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If user is already logged in as teacher, show loading
  if (currentUser && role === 'teacher') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

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
    
    if (!formData.email) {
      newErrors.email = 'נא להזין כתובת אימייל';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'נא להזין כתובת אימייל תקינה';
    }
    
    if (!formData.password) {
      newErrors.password = 'נא להזין סיסמה';
    } else if (formData.password.length < 6) {
      newErrors.password = 'הסיסמה חייבת להכיל לפחות 6 תווים';
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
      console.log('🔐 Attempting teacher login for:', formData.email);
      
      const result = await login(formData.email, formData.password);
      
      if (result) {
        console.log('✅ Login successful, waiting for role update...');
        
        // Wait for the auth state and role to update
        const checkRole = () => {
          console.log('🔍 Checking role after login...');
          console.log('🔍 Current role:', role);
          
          if (role === 'teacher') {
            console.log('✅ User is confirmed as teacher, redirecting to dashboard');
            logSecurityEvent('TEACHER_LOGIN_SUCCESS', { 
              email: formData.email
            });
            toast.success('ברוך הבא לאזור המורה!');
            navigate('/teacher/dashboard');
          } else if (role === 'student') {
            console.log('❌ User is a student, access denied');
            logSecurityEvent('STUDENT_LOGIN_ATTEMPT_TEACHER_PORTAL', { 
              email: formData.email, 
              role: role 
            });
            toast.error('אין לך הרשאות לגשת לאזור המורה. אנא התחבר כאדם');
            // The routing logic will handle the redirect
          } else {
            console.log('⏳ Role not yet updated, waiting...');
            setTimeout(checkRole, 500); // Check again in 500ms
          }
        };
        
        // Start checking role after a short delay
        setTimeout(checkRole, 1000);
      } else {
        logSecurityEvent('TEACHER_LOGIN_FAILED', { 
          email: formData.email, 
          error: 'Login failed' 
        });
        toast.error('שגיאה בהתחברות');
      }
    } catch (error) {
      console.error('Login error:', error);
      logSecurityEvent('TEACHER_LOGIN_ERROR', { 
        email: formData.email, 
        error: error.message 
      });
      toast.error('אירעה שגיאה בהתחברות');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentLogin = () => {
    console.log('🔄 Redirecting to student login');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Israel Cyber Campus</h1>
          <p className="text-gray-300">אזור המורה</p>
        </div>

        {/* Login Form */}
        <Card className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">התחברות מורה</h2>
            <p className="text-gray-300">התחבר לניהול כיתות ותלמידים</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                כתובת אימייל
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="teacher@example.com"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <div className="flex items-center mt-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                סיסמה
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center mt-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="sm" className="mr-2" />
                  מתחבר...
                </div>
              ) : (
                'התחבר כאדם'
              )}
            </Button>
          </form>

          {/* Student Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              אתה תלמיד?{' '}
              <button
                onClick={handleStudentLogin}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                התחבר כאדם
              </button>
            </p>
          </div>

          {/* Debug Info - Development Only */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Debug Info:</h3>
              <div className="text-xs text-gray-400 space-y-1">
                <div>Current User: {currentUser?.email || 'None'}</div>
                <div>User Role: {role || 'Loading...'}</div>
                <div>Role Loading: {roleLoading ? 'Yes' : 'No'}</div>
                <div>Form Loading: {loading ? 'Yes' : 'No'}</div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TeacherLogin; 