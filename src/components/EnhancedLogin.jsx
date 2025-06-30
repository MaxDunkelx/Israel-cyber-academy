/**
 * Enhanced Login Component - Israel Cyber Academy Landing Page
 * 
 * Government-style design with light blue, black, and white color scheme.
 * Optimized for performance and better structure.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, GraduationCap, Zap, Target, Globe, Users, Award, Code, Lock, Star, TrendingUp, Clock, Brain, Rocket, ShieldCheck, Database, Network, Bug, UserCheck, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { validateForm } from '../utils/validation';
import toast from 'react-hot-toast';
import cyberLogo from '../assets/cyber-logo.png';

// Optimized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Revert MatrixRain back to original blue only
const MatrixRain = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops = new Array(Math.floor(columns)).fill(1);
    
    // Reduced drops for better performance
    const maxDrops = Math.min(columns, 30);
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#3B82F6'; // Light blue color
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < maxDrops; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 60);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-20"
      style={{ pointerEvents: 'none' }}
    />
  );
};

// Revert ParticleSystem back to original blue only
const ParticleSystem = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Reduced particle count
    const particleCount = 10;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    
    setParticles(newParticles);
    
    const animate = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          opacity: particle.opacity + (Math.random() - 0.5) * 0.05,
        }))
      );
    };
    
    const interval = setInterval(animate, 120);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-300 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: Math.max(0.1, Math.min(0.4, particle.opacity)),
            transform: `scale(${particle.size})`,
          }}
        />
      ))}
    </div>
  );
};

// Revert FloatingIcons back to original blue only
const FloatingIcons = () => {
  const icons = [
    { icon: Database, color: 'text-blue-300' },
    { icon: Network, color: 'text-blue-400' },
    { icon: Code, color: 'text-blue-300' },
    { icon: Lock, color: 'text-blue-400' },
    { icon: Bug, color: 'text-blue-300' },
    { icon: ShieldCheck, color: 'text-blue-400' },
  ];
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${item.color} opacity-5`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-8 h-8" />
          </motion.div>
        );
      })}
    </div>
  );
};

// Government-style Role Card with reduced size
const RoleCard = ({ role, icon: Icon, title, description, buttonText, onClick, isSelected }) => {
  const isStudent = role === 'student';
  const isTeacher = role === 'teacher';
  const isSystemManager = role === 'system_manager';
  
  // Different colors for each role
  const getRoleColors = () => {
    if (isStudent) {
      return {
        container: 'from-emerald-500/20 to-teal-600/20',
        iconBg: 'from-emerald-500 to-teal-600',
        border: 'border-emerald-500/30',
        hover: 'hover:border-emerald-400/50'
      };
    } else if (isTeacher) {
      return {
        container: 'from-purple-500/20 to-indigo-600/20',
        iconBg: 'from-purple-500 to-indigo-600',
        border: 'border-purple-500/30',
        hover: 'hover:border-purple-400/50'
      };
    } else {
      return {
        container: 'from-orange-500/20 to-red-600/20',
        iconBg: 'from-orange-500 to-red-600',
        border: 'border-orange-500/30',
        hover: 'hover:border-orange-400/50'
      };
    }
  };
  
  const colors = getRoleColors();
  
  return (
    <motion.div
      className={`bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border ${colors.border} ${colors.hover} transition-all duration-300 cursor-pointer relative overflow-hidden group max-w-sm w-full`}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.container} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="text-center relative z-10">
        <motion.div 
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${colors.iconBg} border border-white/20 backdrop-blur-sm shadow-lg`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="h-8 w-8 text-white" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 mb-6 leading-relaxed text-sm">
          {description}
        </p>
        
        <motion.button 
          className={`w-full py-3 px-6 bg-gradient-to-r ${colors.iconBg} text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.div>
  );
};

/**
 * Enhanced Login Component
 */
const EnhancedLogin = () => {
  // Authentication context
  const { login, signup } = useAuth();
  
  // Form state management
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
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

  // Form validation rules
  const validationRules = {
    email: { required: true, type: 'email' },
    password: { required: true, type: 'password' },
    displayName: { required: !isLogin, type: 'text' },
    firstName: { required: !isLogin, type: 'text' },
    lastName: { required: !isLogin, type: 'text' },
    age: { required: !isLogin, type: 'number', min: 1, max: 120 }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      role: selectedRole
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
        
        // Let the App.jsx routing handle the redirect based on user role
        toast.success('התחברת בהצלחה!');
      } else {
        const credentials = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          sex: formData.sex
        };
        
        await signup(formData.email, formData.password, formData.displayName, selectedRole, credentials);
        toast.success('נרשמת בהצלחה!');
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

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowLoginForm(true);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Effects */}
      <MatrixRain />
      <ParticleSystem />
      <FloatingIcons />
      
      {/* Demo Mode Notification */}
      {(!import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === 'your_api_key_here') && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-yellow-500/90 backdrop-blur-sm border border-yellow-400 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-yellow-900 font-semibold">
            <span>🎭</span>
            <span>מצב דמו פעיל - התחברות ללא Firebase</span>
            <span>🎭</span>
          </div>
          <p className="text-yellow-800 text-sm mt-1">
            השתמש בכל אימייל וסיסמה כדי להתחבר ולחקור את המערכת
          </p>
        </div>
      )}
      
      {/* Large Background Logo */}
      <div className="fixed inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
        <motion.img 
          src={cyberLogo} 
          alt="Israel Cyber Campus Background Logo" 
          className="w-[2800px] h-[2800px] object-contain"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
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
        <section className="flex-1 flex flex-col justify-center items-center px-6 py-16 mt-4">
          {/* Logo Section */}
          <motion.div 
            className="text-center mb-16"
            variants={logoVariants}
          >
            <motion.div 
              className="relative w-56 h-56 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/30"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
              }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.2)",
                  "0 0 30px rgba(59, 130, 246, 0.3)",
                  "0 0 20px rgba(59, 130, 246, 0.2)",
                ],
              }}
              transition={{ 
                duration: 0.3,
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/10 to-blue-600/10"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <img 
                src={cyberLogo} 
                alt="Israel Cyber Campus Logo" 
                className="w-48 h-48 object-contain relative z-10"
              />
              <motion.div
                className="absolute -inset-1 rounded-full border-2 border-blue-400/20"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.2, 0, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            
            <motion.h1 
              className="text-7xl font-black text-white mb-6 relative"
              variants={itemVariants}
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)",
                    "0 0 30px rgba(59, 130, 246, 1), 0 0 60px rgba(59, 130, 246, 0.8), 0 0 90px rgba(59, 130, 246, 0.6)",
                    "0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)",
                  ],
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-[length:200%_200%] bg-clip-text text-transparent"
              >
                Israel Cyber Campus
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-[length:200%_200%] bg-clip-text text-transparent blur-sm opacity-50"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Israel Cyber Campus
              </motion.div>
            </motion.h1>
            
            <motion.div 
              className="text-2xl text-gray-200 max-w-5xl mx-auto leading-relaxed mb-8 relative"
              variants={itemVariants}
            >
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 font-bold relative z-10"
                animate={{
                  textShadow: [
                    "0 0 15px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)",
                    "0 0 25px rgba(59, 130, 246, 0.8), 0 0 50px rgba(59, 130, 246, 0.6)",
                    "0 0 15px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)",
                  ],
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ברוכים הבאים לישראל קמפוס סייבר
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 bg-[length:200%_200%] bg-clip-text text-transparent blur-sm opacity-30"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                ברוכים הבאים לישראל קמפוס סייבר
              </motion.div>
              <br />
              <motion.span 
                className="text-blue-300 font-semibold text-xl relative z-10"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 15px rgba(59, 130, 246, 0.7), 0 0 30px rgba(59, 130, 246, 0.5)",
                    "0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                בחר את הדרך שלך: תלמיד, מורה, או מנהל מערכת
              </motion.span>
            </motion.div>

            <motion.div 
              className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              <motion.div 
                className="mb-6 relative"
                animate={{
                  textShadow: [
                    "0 0 8px rgba(59, 130, 246, 0.3), 0 0 16px rgba(59, 130, 246, 0.2)",
                    "0 0 12px rgba(59, 130, 246, 0.5), 0 0 24px rgba(59, 130, 246, 0.3)",
                    "0 0 8px rgba(59, 130, 246, 0.3), 0 0 16px rgba(59, 130, 246, 0.2)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-semibold">
                  פלטפורמת הלמידה המתקדמת ביותר בעולם הסייבר.
                </span>
                <br />
                <span className="text-gray-200">
                  הצטרפו אלינו למסע למידה אינטראקטיבי ומרתק עם הטכנולוגיות החדישות ביותר. 
                  כאן תגלו עולם של אפשרויות אינסופיות, תפתחו כישורים מתקדמים ותצטרפו לקהילה של מומחי סייבר עתידיים.
                </span>
              </motion.div>
              
              <motion.div 
                className="mb-6 relative"
                animate={{
                  textShadow: [
                    "0 0 6px rgba(34, 197, 94, 0.3), 0 0 12px rgba(34, 197, 94, 0.2)",
                    "0 0 10px rgba(34, 197, 94, 0.5), 0 0 20px rgba(34, 197, 94, 0.3)",
                    "0 0 6px rgba(34, 197, 94, 0.3), 0 0 12px rgba(34, 197, 94, 0.2)",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 font-semibold">
                  עם מערכות סימולציה מתקדמות, תרגול מעשי אינטנסיבי, ומנטורים מקצועיים,
                </span>
                <br />
                <span className="text-gray-200">
                  אנו מבטיחים שכל תלמיד יקבל את הכלים הטובים ביותר להצלחה בעולם הסייבר.
                </span>
              </motion.div>
              
              <motion.div 
                className="text-blue-300 font-bold text-xl relative"
                animate={{
                  textShadow: [
                    "0 0 15px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4), 0 0 45px rgba(59, 130, 246, 0.2)",
                    "0 0 25px rgba(59, 130, 246, 0.8), 0 0 50px rgba(59, 130, 246, 0.6), 0 0 75px rgba(59, 130, 246, 0.4)",
                    "0 0 15px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4), 0 0 45px rgba(59, 130, 246, 0.2)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🚀 אלפי תלמידים כבר בחרו בדרך שלנו להפוך למומחי סייבר מובילים - הגיע תורך להצטרף למהפכה! ⚡
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto"
            variants={itemVariants}
          >
            {[
              { icon: Users, number: '5,000+', label: 'האקרים צעירים', color: 'from-emerald-500 to-teal-600' },
              { icon: Award, number: '50+', label: 'מומחי סייבר', color: 'from-purple-500 to-indigo-600' },
              { icon: Code, number: '100%', label: 'טכנולוגיה מתקדמת', color: 'from-orange-500 to-red-600' },
              { icon: Lock, number: '24/7', label: 'אבטחה מתמדת', color: 'from-cyan-500 to-blue-600' },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center text-gray-200 bg-slate-800/50 backdrop-blur-xl px-6 py-6 rounded-lg border border-slate-700/50 group cursor-pointer"
                whileHover={{ 
                  scale: 1.02, 
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderColor: "rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                <motion.div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-3xl font-black text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-white">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Section */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12 max-w-5xl mx-auto"
            variants={itemVariants}
          >
            {[
              { icon: Zap, text: 'למידה אינטראקטיבית', color: 'from-yellow-500 to-orange-600' },
              { icon: Target, text: 'תרגול מעשי', color: 'from-green-500 to-emerald-600' },
              { icon: Globe, text: 'תוכן עדכני', color: 'from-blue-500 to-cyan-600' },
              { icon: Brain, text: 'AI מתקדם', color: 'from-purple-500 to-pink-600' },
              { icon: Rocket, text: 'חדשנות מתמדת', color: 'from-red-500 to-pink-600' },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center space-y-2 text-gray-200 bg-slate-800/50 backdrop-blur-xl px-3 py-4 rounded-lg border border-slate-700/50 group cursor-pointer text-center"
                whileHover={{ 
                  scale: 1.02, 
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderColor: "rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center`}
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="w-5 h-5 text-white" />
                </motion.div>
                <span className="font-medium text-xs leading-tight">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Role Selection Cards */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-16"
          >
          
          {/* Student-specific engaging text */}
          {selectedRole === 'student' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full text-center mb-8"
            >
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">
                  🚀 האם אתה מוכן להפוך להאקר? 🚀
                </h3>
                <p className="text-lg text-gray-200 mb-3">
                  ברוכים הבאים לעולם הסייבר! כאן תלמדו איך לפרוץ (למטרות טובות), להגן על מערכות, 
                  ולפתור אתגרים טכנולוגיים מרתקים. איזה סוג האקר אתם רוצים להיות?
                </p>
                <p className="text-blue-300 font-semibold">
                  הצטרפו למסע הרפתקאות דיגיטלי עם אלפי תלמידים שכבר בדרך להפוך למומחי סייבר! 🎮✨
                </p>
              </div>
            </motion.div>
          )}
            <div className="flex justify-center">
              <RoleCard
                role="student"
                icon={GraduationCap}
                title="תלמידים"
                description="הצטרף עכשיו למסע הלמידה המתקדם ביותר בעולם הסייבר. התחל ללמוד עם אלפי תלמידים אחרים!"
                buttonText="הצטרף עכשיו"
                onClick={() => handleRoleSelect('student')}
                isSelected={selectedRole === 'student'}
              />
            </div>
            <div className="flex justify-center">
              <RoleCard
                role="teacher"
                icon={UserCheck}
                title="מורים"
                description="הצטרף לצוות ההוראה המוביל שלנו. נהל כיתות, עקוב אחר התקדמות וצור חוויית למידה ייחודית."
                buttonText="הצטרף כמורה"
                onClick={() => handleRoleSelect('teacher')}
                isSelected={selectedRole === 'teacher'}
              />
            </div>
            <div className="flex justify-center">
              <RoleCard
                role="system_manager"
                icon={Shield}
                title="מנהל מערכת"
                description="גישה מלאה לניהול המערכת, משתמשים ותוכן. רק למנהלי המערכת המוסמכים."
                buttonText="התחבר כמנהל"
                onClick={() => handleRoleSelect('system_manager')}
                isSelected={selectedRole === 'system_manager'}
              />
            </div>
          </motion.div>

          {/* System Manager Login Note */}
          {selectedRole === 'system_manager' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-blue-300 text-sm">
                  <Shield className="w-4 h-4 inline mr-2" />
                  גישה למנהלי מערכת בלבד. השתמש באימייל המוסמך שלך.
                </p>
              </div>
            </motion.div>
          )}

          {/* Login Form */}
          <AnimatePresence>
            {showLoginForm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-slate-800/95 backdrop-blur-2xl rounded-2xl p-8 shadow-xl border border-slate-700 max-w-md w-full relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5"
                />
                <div className="text-center mb-8 relative z-10">
                  <motion.button
                    onClick={() => setShowLoginForm(false)}
                    className="text-gray-300 hover:text-white transition-colors mb-6 text-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← חזור לבחירת תפקיד
                  </motion.button>
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-4 text-center"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {isLogin ? 'ברוך שובך לישראל קמפוס סייבר!' : 'צור חשבון חדש והצטרף אלינו'}
                  </motion.h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  {!isLogin && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-200 mb-2">
                            שם פרטי
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-slate-700/50 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm backdrop-blur-sm ${
                              errors.firstName 
                                ? 'border-red-500 focus:ring-red-500/20' 
                                : 'border-slate-600 focus:ring-blue-500/20 focus:border-blue-500'
                            }`}
                            placeholder="שם פרטי"
                          />
                          {errors.firstName && (
                            <p className="text-red-400 text-xs mt-2">{errors.firstName[0]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-200 mb-2">
                            שם משפחה
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-slate-700/50 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm backdrop-blur-sm ${
                              errors.lastName 
                                ? 'border-red-500 focus:ring-red-500/20' 
                                : 'border-slate-600 focus:ring-blue-500/20 focus:border-blue-500'
                            }`}
                            placeholder="שם משפחה"
                          />
                          {errors.lastName && (
                            <p className="text-red-400 text-xs mt-2">{errors.lastName[0]}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-200 mb-2">
                            גיל
                          </label>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            min="1"
                            max="120"
                            className={`w-full px-4 py-3 bg-slate-700/50 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm backdrop-blur-sm ${
                              errors.age 
                                ? 'border-red-500 focus:ring-red-500/20' 
                                : 'border-slate-600 focus:ring-blue-500/20 focus:border-blue-500'
                            }`}
                            placeholder="גיל"
                          />
                          {errors.age && (
                            <p className="text-red-400 text-xs mt-2">{errors.age[0]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-200 mb-2">
                            מגדר
                          </label>
                          <select
                            name="sex"
                            value={formData.sex}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-700/50 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm backdrop-blur-sm"
                          >
                            <option value="male">זכר</option>
                            <option value="female">נקבה</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      אימייל
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm backdrop-blur-sm ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-slate-600 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                      placeholder="הכנס את האימייל שלך"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-2">{errors.email[0]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      סיסמה
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 pr-12 bg-slate-700/50 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm backdrop-blur-sm ${
                          errors.password 
                            ? 'border-red-500 focus:ring-red-500/20' 
                            : 'border-slate-600 focus:ring-blue-500/20 focus:border-blue-500'
                        }`}
                        placeholder="הכנס את הסיסמה שלך"
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </motion.button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-2">{errors.password[0]}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-base hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {isLogin ? 'מתחבר...' : 'נרשם...'}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        {isLogin ? 'התחבר' : 'הרשם'}
                        <ArrowRight className="w-5 h-5 mr-2" />
                      </div>
                    )}
                  </motion.button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                    >
                      {isLogin ? 'אין לך חשבון? הרשם עכשיו' : 'יש לך חשבון? התחבר עכשיו'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Additional Features Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            {[
              { icon: Star, text: 'דירוג 4.9/5', color: 'from-yellow-500 to-orange-600' },
              { icon: TrendingUp, text: '95% הצלחה', color: 'from-green-500 to-emerald-600' },
              { icon: Clock, text: 'זמין 24/7', color: 'from-purple-500 to-pink-600' },
              { icon: ShieldCheck, text: 'אבטחה מתקדמת', color: 'from-cyan-500 to-blue-600' },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center space-y-2 text-gray-200 bg-slate-800/40 backdrop-blur-xl px-3 py-3 rounded-lg border border-slate-700/40 group"
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderColor: "rgba(59, 130, 246, 0.4)"
                }}
              >
                <motion.div
                  className={`w-8 h-8 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center`}
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="w-4 h-4 text-white" />
                </motion.div>
                <span className="font-medium text-xs text-center">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.footer 
            className="mt-16 mb-6 text-center"
            variants={itemVariants}
          >
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 max-w-2xl mx-auto">
              <motion.div 
                className="text-gray-300 text-base font-medium"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                ישראל קמפוס סייבר - כל הזכויות שמורות
              </motion.div>
              <motion.div 
                className="text-gray-400 text-xs mt-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                Israel Cyber Campus - All Rights Reserved
              </motion.div>
            </div>
          </motion.footer>
        </section>
      </motion.div>
    </div>
  );
};

export default EnhancedLogin; 