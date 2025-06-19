import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Shield, GraduationCap, BookOpen, ArrowRight, Sparkles, Zap, Target, Globe, Users, Award, Code, Lock, Star, TrendingUp, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { validateForm } from '../utils/validation';
import toast from 'react-hot-toast';
import cyberLogo from '../assets/cyber-logo.png';

/**
 * Landing Page Component - Beautiful main page for Israel Cyber Campus
 * Features stunning animations, proper branding, and comprehensive information
 */
const Login = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    role: 'student'
  });
  const [errors, setErrors] = useState({});

  // Form validation rules
  const validationRules = {
    email: { required: true, type: 'email' },
    password: { required: true, type: 'password' },
    displayName: { required: !isLogin, minLength: 2, maxLength: 50 }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      role: selectedRole
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateForm(formData, validationRules);
    if (!validation.isValid) {
      setErrors(validation.fieldErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success('התחברת בהצלחה!');
        navigate('/roadmap');
      } else {
        await signup(formData.email, formData.password, formData.displayName, selectedRole);
        toast.success('נרשמת בהצלחה!');
        navigate('/roadmap');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      const errorMessage = error.code === 'auth/user-not-found' ? 'משתמש לא נמצא' :
                          error.code === 'auth/wrong-password' ? 'סיסמה שגויה' :
                          error.code === 'auth/email-already-in-use' ? 'אימייל כבר קיים במערכת' :
                          'אירעה שגיאה בהתחברות';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle guest mode
  const handleGuestMode = (role) => {
    localStorage.setItem('isGuest', 'true');
    localStorage.setItem('guestRole', role);
    toast.success(`ברוך הבא למצב ${role === 'student' ? 'תלמיד' : 'מורה'} אורח!`);
    navigate('/roadmap');
  };

  // Handle role selection
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowLoginForm(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 30 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 relative overflow-x-hidden">
      {/* Large Background Logo */}
      <div className="fixed inset-0 flex items-center justify-center opacity-15 pointer-events-none">
        <img 
          src={cyberLogo} 
          alt="Israel Cyber Campus Background Logo" 
          className="w-[1500px] h-[1500px] object-contain"
        />
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-xl"
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <section className="flex-1 flex flex-col justify-center items-center px-6 py-20">
          {/* Logo Section */}
          <motion.div 
            className="text-center mb-16"
            variants={logoVariants}
          >
            <motion.div 
              className="w-40 h-40 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/30"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 35px 60px -12px rgba(59, 130, 246, 0.5)"
              }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src={cyberLogo} 
                alt="Israel Cyber Campus Logo" 
                className="w-24 h-24 object-contain"
              />
            </motion.div>
            
            <motion.h1 
              className="text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Israel Cyber Campus
            </motion.h1>
            
            <motion.p 
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
              variants={itemVariants}
            >
              הקמפוס הגדול ביותר ללימודי סייבר בישראל
              <br />
              <span className="text-blue-400 font-semibold">אלפי תלמידים • מורים מעולים • חוויית למידה ייחודית</span>
            </motion.p>

            <motion.div 
              className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              <p className="mb-4">
                ישראל קמפוס סייבר הוא מרכז הלמידה המתקדם ביותר ללימודי אבטחת מידע בישראל. 
                עם אלפי תלמידים פעילים, צוות מורים מעולים ופלטפורמת למידה ייחודית שפותחה במיוחד עבורנו.
              </p>
              <p>
                אנו מציעים חוויית למידה אינטראקטיבית, תרגולים מעשיים ותוכן עדכני 
                המכין את התלמידים לעולם האבטחה הדיגיטלית של המחר.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <motion.div 
              className="text-center text-gray-300 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
            >
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">5,000+</div>
              <div className="text-sm">תלמידים פעילים</div>
            </motion.div>
            <motion.div 
              className="text-center text-gray-300 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.1)" }}
            >
              <Award className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-sm">מורים מומחים</div>
            </motion.div>
            <motion.div 
              className="text-center text-gray-300 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
            >
              <Code className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm">תוכנה ייחודית</div>
            </motion.div>
            <motion.div 
              className="text-center text-gray-300 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.1)" }}
            >
              <Lock className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm">גישה מתמדת</div>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-20"
            variants={itemVariants}
          >
            <motion.div 
              className="flex items-center space-x-3 text-gray-300 bg-gray-800/40 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
            >
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">למידה אינטראקטיבית</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-3 text-gray-300 bg-gray-800/40 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
            >
              <Target className="w-5 h-5 text-red-400" />
              <span className="font-medium">תרגול מעשי</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-3 text-gray-300 bg-gray-800/40 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.1)" }}
            >
              <Globe className="w-5 h-5 text-green-400" />
              <span className="font-medium">תוכן עדכני</span>
            </motion.div>
          </motion.div>

          {/* Role Selection Cards */}
          {!showLoginForm && (
            <motion.div 
              className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto"
              variants={itemVariants}
            >
              {/* Student Card */}
              <motion.div
                className="bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex-1"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => handleRoleSelect('student')}
              >
                <div className="text-center">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <GraduationCap className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-4">תלמידים</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                    הצטרף לאלפי התלמידים שכבר לומדים אצלנו! 
                    התחל את מסע הלמידה שלך בעולם הסייבר עם שיעורים אינטראקטיביים, 
                    תרגולים מעשיים ומעקב התקדמות אישי מתקדם.
                  </p>
                  <div className="space-y-4">
                    <button className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
                      <BookOpen className="w-6 h-6 inline ml-3" />
                      התחבר כתלמיד
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGuestMode('student');
                      }}
                      className="w-full py-3 px-8 bg-gray-700/50 text-gray-300 rounded-xl font-medium hover:bg-gray-600/50 transition-all duration-300 border border-gray-600"
                    >
                      <Sparkles className="w-5 h-5 inline ml-3" />
                      נסה כמשתמש אורח
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Teacher Card */}
              <motion.div
                className="bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer flex-1"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => handleRoleSelect('teacher')}
              >
                <div className="text-center">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Shield className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-4">מורים</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                    הצטרף לצוות המורים המוביל שלנו! 
                    נהל את הכיתה שלך, עקוב אחר התקדמות התלמידים, 
                    צור שיעורים מותאמים אישית וקבל תובנות מפורטות על הביצועים.
                  </p>
                  <div className="space-y-4">
                    <button className="w-full py-4 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg">
                      <Shield className="w-6 h-6 inline ml-3" />
                      התחבר כמורה
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGuestMode('teacher');
                      }}
                      className="w-full py-3 px-8 bg-gray-700/50 text-gray-300 rounded-xl font-medium hover:bg-gray-600/50 transition-all duration-300 border border-gray-600"
                    >
                      <Sparkles className="w-5 h-5 inline ml-3" />
                      נסה כמשתמש אורח
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Login Form */}
          {showLoginForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-gray-800/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-700 max-w-md w-full"
            >
              <div className="text-center mb-8">
                <button
                  onClick={() => setShowLoginForm(false)}
                  className="text-gray-400 hover:text-white transition-colors mb-6 text-lg"
                >
                  ← חזור לבחירת תפקיד
                </button>
                <h3 className="text-3xl font-bold text-white mb-3">
                  {isLogin ? 'התחברות' : 'הרשמה'}
                </h3>
                <p className="text-gray-400 text-lg">
                  {isLogin ? 'ברוך שובך לישראל קמפוס סייבר!' : 'צור חשבון חדש והצטרף אלינו'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      שם מלא
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-lg ${
                        errors.displayName 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-600 focus:ring-blue-500'
                      }`}
                      placeholder="הכנס את שמך המלא"
                    />
                    {errors.displayName && (
                      <p className="text-red-400 text-sm mt-2">{errors.displayName[0]}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    אימייל
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-5 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-lg ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-600 focus:ring-blue-500'
                    }`}
                    placeholder="הכנס את האימייל שלך"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2">{errors.email[0]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    סיסמה
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-4 pr-14 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-lg ${
                        errors.password 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-600 focus:ring-blue-500'
                      }`}
                      placeholder="הכנס את הסיסמה שלך"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-2">{errors.password[0]}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      {isLogin ? 'מתחבר...' : 'נרשם...'}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      {isLogin ? 'התחבר' : 'הרשם'}
                      <ArrowRight className="w-5 h-5 mr-3" />
                    </div>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-gray-400 hover:text-white transition-colors text-lg"
                >
                  {isLogin ? 'אין לך חשבון? הירשם כאן' : 'יש לך חשבון? התחבר כאן'}
                </button>
              </div>
            </motion.div>
          )}
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50 py-8">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 mb-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>דירוג 4.9/5</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>95% הצלחה</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>זמין 24/7</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Israel Cyber Campus. כל הזכויות שמורות.
            </p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default Login; 