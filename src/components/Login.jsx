/**
 * Login Component - Israel Cyber Campus Landing Page
 * 
 * Provides authentication interface with:
 * - Email/password login
 * - Role-based routing
 * - Error handling
 * - Responsive design
 * - Kid-friendly design with cool animations
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Shield, GraduationCap, BookOpen, ArrowRight, Zap, Target, Globe, Users, Award, Code, Lock, Star, TrendingUp, Clock, Rocket, Brain, Gamepad2, Sparkles, ShieldCheck, Trophy, Crown, Lightning, Fire, Heart, BrainCircuit, Cpu, Database, Network, Bug, Virus, Key, Fingerprint, Smartphone, Laptop, Monitor, Server, Wifi, Satellite, Cloud, ShieldAlert, Sword, Armor, Helmet, SwordCross, Target as TargetIcon, Zap as ZapIcon, Brain as BrainIcon, Rocket as RocketIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { validateForm } from '../utils/validation';
import toast from 'react-hot-toast';
import cyberLogo from '../assets/cyber-logo.png';

/**
 * Landing Page Component - Beautiful main page for Israel Cyber Campus
 * Features stunning animations, proper branding, and comprehensive information
 */
const Login = () => {
  // Authentication context
  const { login, signup } = useAuth();
  
  // Form state management
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  
  // Form data and validation
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    firstName: '',
    lastName: '',
    age: '',
    sex: 'male',
    role: 'student'
  });
  const [errors, setErrors] = useState({});

  // Cool Hebrew text for kids
  const coolTexts = {
    hero: {
      title: "🏆 קמפוס הסייבר של ישראל 🏆",
      subtitle: "המקום הכי מגניב ללמוד סייבר בישראל!",
      description: "בואו להיות האקרים הטובים! למדו איך להגן על העולם הדיגיטלי עם משחקים, אתגרים וכלים מגניבים!",
      features: [
        "🎮 משחקים אינטראקטיביים מגניבים",
        "⚡ אתגרים ומיסיונים מרגשים", 
        "🏅 תעודות ומדליות להשגה",
        "👥 חברים חדשים מכל הארץ",
        "🚀 טכנולוגיות הכי מתקדמות"
      ]
    },
    stats: [
      { icon: Users, number: "5,000+", label: "האקרים צעירים", color: "from-blue-500 to-cyan-500", bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20" },
      { icon: Trophy, number: "50+", label: "מורים מומחים", color: "from-purple-500 to-pink-500", bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20" },
      { icon: Crown, number: "100%", label: "כיף מובטח", color: "from-yellow-500 to-orange-500", bgColor: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20" },
      { icon: Rocket, number: "24/7", label: "זמינות מלאה", color: "from-green-500 to-emerald-500", bgColor: "bg-gradient-to-br from-green-500/20 to-emerald-500/20" }
    ],
    roles: {
      student: {
        title: "🎓 תלמידים",
        subtitle: "בואו להיות האקרים של המחר!",
        description: "הצטרפו למסע הרפתקאות בעולם הסייבר! למדו איך לפרוץ (למטרות טובות), להגן על מערכות ולפתור אתגרים מגניבים!",
        features: ["🎮 משחקי האקינג", "🏆 תחרויות", "📚 שיעורים אינטראקטיביים", "👥 חברים חדשים"],
        buttonText: "התחבר כתלמיד",
        gradient: "from-blue-600 via-purple-600 to-cyan-600"
      },
      teacher: {
        title: "🛡️ מורים",
        subtitle: "הדריכו את הדור הבא של האקרים!",
        description: "הצטרפו לצוות המורים המוביל! עזרו לתלמידים לגלות את העולם המרתק של אבטחת מידע וטכנולוגיה!",
        features: ["📊 ניהול כיתות", "📈 מעקב התקדמות", "🎯 יצירת תוכן", "🏅 הדרכה מתקדמת"],
        buttonText: "התחבר כמורה", 
        gradient: "from-emerald-600 via-teal-600 to-cyan-600"
      }
    }
  };

  // Form validation rules for different scenarios
  const validationRules = {
    email: { required: true, type: 'email' },
    password: { required: true, type: 'password' },
    displayName: { required: !isLogin, minLength: 2, maxLength: 50 },
    firstName: { required: !isLogin, minLength: 2, maxLength: 30 },
    lastName: { required: !isLogin, minLength: 2, maxLength: 30 },
    age: { required: !isLogin, type: 'number', min: 1, max: 120 }
  };

  // Rotate through cool animations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimation(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Handle form input changes
   * Updates form data and clears validation errors when user starts typing
   * 
   * @param {Event} e - Input change event
   */
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

  /**
   * Handle form submission
   * Validates form data and attempts authentication
   * 
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form using utility function
    const validation = validateForm(formData, validationRules);
    if (!validation.isValid) {
      setErrors(validation.fieldErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        // Attempt user login
        await login(formData.email, formData.password);
        toast.success('🎉 התחברת בהצלחה! ברוך שובך!');
      } else {
        // Prepare credentials object for signup
        const credentials = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          sex: formData.sex
        };
        
        // Attempt user registration with credentials
        await signup(formData.email, formData.password, formData.displayName, selectedRole, credentials);
        toast.success('🎊 נרשמת בהצלחה! ברוך הבא למשפחה!');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Provide user-friendly error messages in Hebrew
      const errorMessage = error.code === 'auth/user-not-found' ? '❌ משתמש לא נמצא' :
                          error.code === 'auth/wrong-password' ? '🔒 סיסמה שגויה' :
                          error.code === 'auth/email-already-in-use' ? '📧 אימייל כבר קיים במערכת' :
                          '⚠️ אירעה שגיאה בהתחברות';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle role selection
   * Shows login form and sets selected role
   * 
   * @param {string} role - Selected role ('student' or 'teacher')
   */
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowLoginForm(true);
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.15
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
        stiffness: 200,
        damping: 15,
        duration: 1.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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
    hidden: { scale: 0.8, opacity: 0, y: 40 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.08,
      y: -15,
      rotateY: 5,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/30 to-purple-900/30 relative overflow-x-hidden">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`,
            backgroundSize: '100px 100px, 150px 150px'
          }} />
        </div>

        {/* Floating Cyber Elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Icons */}
        <motion.div
          className="absolute top-1/4 left-1/6 text-blue-400/30"
          variants={floatingVariants}
          animate="float"
        >
          <Shield className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="absolute top-3/4 right-1/6 text-purple-400/30"
          variants={floatingVariants}
          animate="float"
          style={{ animationDelay: '1s' }}
        >
          <Code className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/3 text-cyan-400/30"
          variants={floatingVariants}
          animate="float"
          style={{ animationDelay: '2s' }}
        >
          <Brain className="w-8 h-8" />
        </motion.div>
      </div>

      {/* Large Background Logo */}
      <div className="fixed inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0">
        <motion.img 
          src={cyberLogo} 
          alt="Israel Cyber Campus Background Logo" 
          className="w-[1200px] h-[1200px] object-contain"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col pt-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <section className="flex-1 flex flex-col justify-center items-center px-6 py-20 mt-8">
          {/* Logo Section */}
          <motion.div 
            className="text-center mb-16"
            variants={logoVariants}
          >
            <motion.div 
              className="w-44 h-44 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/40 relative overflow-hidden"
              whileHover={{ 
                scale: 1.15,
                boxShadow: "0 40px 80px -12px rgba(59, 130, 246, 0.6)"
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-white/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <img 
                src={cyberLogo} 
                alt="Israel Cyber Campus Logo" 
                className="w-28 h-28 object-contain relative z-10"
              />
            </motion.div>
            
            <motion.h1 
              className="text-8xl font-black text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight"
              variants={itemVariants}
            >
              {coolTexts.hero.title}
            </motion.h1>
            
            <motion.p 
              className="text-3xl text-gray-200 max-w-5xl mx-auto leading-relaxed mb-8 font-bold"
              variants={itemVariants}
            >
              {coolTexts.hero.subtitle}
            </motion.p>

            <motion.div 
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
              variants={itemVariants}
            >
              <p className="mb-6 text-lg">
                {coolTexts.hero.description}
              </p>
            </motion.div>

            {/* Cool Features List */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-16"
              variants={itemVariants}
            >
              {coolTexts.hero.features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3 text-gray-200 bg-gray-800/50 backdrop-blur-sm px-6 py-4 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-2xl">{feature.split(' ')[0]}</span>
                  <span className="font-semibold text-lg">{feature.split(' ').slice(1).join(' ')}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-6xl mx-auto"
            variants={itemVariants}
          >
            {coolTexts.stats.map((stat, index) => (
              <motion.div 
                key={index}
                className={`text-center text-gray-200 ${stat.bgColor} backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30 relative overflow-hidden group`}
                whileHover={{ 
                  scale: 1.1, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                <motion.div 
                  className="relative z-10"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <stat.icon className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${stat.color} p-2 rounded-2xl text-white`} />
                </motion.div>
                <div className="text-4xl font-black text-white mb-2 relative z-10">{stat.number}</div>
                <div className="text-lg font-semibold relative z-10">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Role Selection Cards */}
          {!showLoginForm && (
            <motion.div 
              className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto"
              variants={itemVariants}
            >
              {/* Student Card */}
              <motion.div
                className="bg-gray-800/70 backdrop-blur-xl rounded-3xl p-10 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex-1 relative overflow-hidden group"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => handleRoleSelect('student')}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="text-center relative z-10">
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-blue-500/50"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.8 }}
                  >
                    <GraduationCap className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-4xl font-black text-white mb-6">{coolTexts.roles.student.title}</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed text-xl font-medium">
                    {coolTexts.roles.student.description}
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {coolTexts.roles.student.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-300">
                        <span className="text-xl">{feature.split(' ')[0]}</span>
                        <span className="text-sm font-medium">{feature.split(' ').slice(1).join(' ')}</span>
                      </div>
                    ))}
                  </div>
                  
                  <motion.button 
                    className={`w-full py-6 px-8 bg-gradient-to-r ${coolTexts.roles.student.gradient} text-white rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 shadow-lg group-hover:shadow-blue-500/50`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BookOpen className="w-7 h-7 inline ml-3" />
                    {coolTexts.roles.student.buttonText}
                  </motion.button>
                </div>
              </motion.div>

              {/* Teacher Card */}
              <motion.div
                className="bg-gray-800/70 backdrop-blur-xl rounded-3xl p-10 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer flex-1 relative overflow-hidden group"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => handleRoleSelect('teacher')}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="text-center relative z-10">
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-emerald-500/50"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Shield className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-4xl font-black text-white mb-6">{coolTexts.roles.teacher.title}</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed text-xl font-medium">
                    {coolTexts.roles.teacher.description}
                  </p>
                  
                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {coolTexts.roles.teacher.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-300">
                        <span className="text-xl">{feature.split(' ')[0]}</span>
                        <span className="text-sm font-medium">{feature.split(' ').slice(1).join(' ')}</span>
                      </div>
                    ))}
                  </div>
                  
                  <motion.button 
                    className={`w-full py-6 px-8 bg-gradient-to-r ${coolTexts.roles.teacher.gradient} text-white rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 shadow-lg group-hover:shadow-emerald-500/50`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Shield className="w-7 h-7 inline ml-3" />
                    {coolTexts.roles.teacher.buttonText}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Enhanced Login Form */}
          <AnimatePresence>
            {showLoginForm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-gray-800/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-gray-700 max-w-lg w-full relative overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
                
                <div className="text-center mb-10 relative z-10">
                  <motion.button
                    onClick={() => setShowLoginForm(false)}
                    className="text-gray-400 hover:text-white transition-colors mb-8 text-lg font-medium hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ← חזור לבחירת תפקיד
                  </motion.button>
                  <h3 className="text-4xl font-black text-white mb-4">
                    {isLogin ? '🎉 התחברות' : '🚀 הרשמה'}
                  </h3>
                  <p className="text-gray-400 text-xl font-medium">
                    {isLogin ? 'ברוך שובך! מוכנים להתחיל?' : 'בואו להצטרף למשפחה!'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  {!isLogin && (
                    <>
                      <div>
                        <label className="block text-lg font-bold text-gray-200 mb-4">
                          👤 שם מלא
                        </label>
                        <input
                          type="text"
                          name="displayName"
                          value={formData.displayName}
                          onChange={handleInputChange}
                          className={`w-full px-6 py-5 bg-gray-700/60 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 text-lg font-medium ${
                            errors.displayName 
                              ? 'border-red-500 focus:ring-red-500/30' 
                              : 'border-gray-600 focus:ring-blue-500/30 focus:border-blue-500'
                          }`}
                          placeholder="הכנס את שמך המלא"
                        />
                        {errors.displayName && (
                          <p className="text-red-400 text-sm mt-3 font-medium">{errors.displayName[0]}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-lg font-bold text-gray-200 mb-4">
                            📝 שם פרטי
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full px-6 py-5 bg-gray-700/60 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 text-lg font-medium ${
                              errors.firstName 
                                ? 'border-red-500 focus:ring-red-500/30' 
                                : 'border-gray-600 focus:ring-blue-500/30 focus:border-blue-500'
                            }`}
                            placeholder="שם פרטי"
                          />
                          {errors.firstName && (
                            <p className="text-red-400 text-sm mt-3 font-medium">{errors.firstName[0]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-lg font-bold text-gray-200 mb-4">
                            👨‍👩‍👧‍👦 שם משפחה
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full px-6 py-5 bg-gray-700/60 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 text-lg font-medium ${
                              errors.lastName 
                                ? 'border-red-500 focus:ring-red-500/30' 
                                : 'border-gray-600 focus:ring-blue-500/30 focus:border-blue-500'
                            }`}
                            placeholder="שם משפחה"
                          />
                          {errors.lastName && (
                            <p className="text-red-400 text-sm mt-3 font-medium">{errors.lastName[0]}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-lg font-bold text-gray-200 mb-4">
                            🎂 גיל
                          </label>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            min="1"
                            max="120"
                            className={`w-full px-6 py-5 bg-gray-700/60 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 text-lg font-medium ${
                              errors.age 
                                ? 'border-red-500 focus:ring-red-500/30' 
                                : 'border-gray-600 focus:ring-blue-500/30 focus:border-blue-500'
                            }`}
                            placeholder="גיל"
                          />
                          {errors.age && (
                            <p className="text-red-400 text-sm mt-3 font-medium">{errors.age[0]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-lg font-bold text-gray-200 mb-4">
                            👥 מגדר
                          </label>
                          <select
                            name="sex"
                            value={formData.sex}
                            onChange={handleInputChange}
                            className="w-full px-6 py-5 bg-gray-700/60 border-2 border-gray-600 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-lg font-medium"
                          >
                            <option value="male">👨 זכר</option>
                            <option value="female">👩 נקבה</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-lg font-bold text-gray-200 mb-4">
                      📧 אימייל
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-5 bg-gray-700/60 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 text-lg font-medium ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500/30' 
                          : 'border-gray-600 focus:ring-blue-500/30 focus:border-blue-500'
                      }`}
                      placeholder="הכנס את האימייל שלך"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-3 font-medium">{errors.email[0]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-gray-200 mb-4">
                      🔒 סיסמה
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-6 py-5 pr-16 bg-gray-700/60 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 text-lg font-medium ${
                          errors.password 
                            ? 'border-red-500 focus:ring-red-500/30' 
                            : 'border-gray-600 focus:ring-blue-500/30 focus:border-blue-500'
                        }`}
                        placeholder="הכנס את הסיסמה שלך"
                        autocomplete="current-password"
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
                      </motion.button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-3 font-medium">{errors.password[0]}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white rounded-2xl font-black text-xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white mr-4"></div>
                        <span className="text-lg font-bold">{isLogin ? 'מתחבר...' : 'נרשם...'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="text-lg font-bold">{isLogin ? 'התחבר' : 'הרשם'}</span>
                        <ArrowRight className="w-6 h-6 mr-4" />
                      </div>
                    )}
                  </motion.button>
                </form>

                <div className="mt-10 text-center relative z-10">
                  <motion.button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-gray-400 hover:text-white transition-colors text-lg font-medium hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isLogin ? '❓ אין לך חשבון? הירשם כאן' : '✅ יש לך חשבון? התחבר כאן'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Enhanced Footer Section */}
        <footer className="bg-gray-900/60 backdrop-blur-sm border-t border-gray-700/50 py-12">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="flex flex-wrap justify-center items-center gap-10 mb-8">
              <motion.div 
                className="flex items-center space-x-3 text-gray-300 bg-gray-800/50 px-6 py-3 rounded-2xl border border-gray-700/50"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              >
                <Star className="w-6 h-6 text-yellow-400" />
                <span className="font-bold">דירוג 4.9/5 ⭐</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-300 bg-gray-800/50 px-6 py-3 rounded-2xl border border-gray-700/50"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.1)" }}
              >
                <TrendingUp className="w-6 h-6 text-green-400" />
                <span className="font-bold">95% הצלחה 🏆</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-300 bg-gray-800/50 px-6 py-3 rounded-2xl border border-gray-700/50"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
              >
                <Clock className="w-6 h-6 text-blue-400" />
                <span className="font-bold">זמין 24/7 ⚡</span>
              </motion.div>
            </div>
            <p className="text-gray-500 text-lg font-medium">
              © 2024 Israel Cyber Campus. כל הזכויות שמורות. 🚀
            </p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default Login; 