/**
 * Enhanced Login Component - Israel Cyber Academy Landing Page
 * 
 * This is the most amazing login page for the Israel Cyber Security Campus.
 * Features stunning animations, particle effects, and cutting-edge design.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, GraduationCap, Zap, Target, Globe, Users, Award, Code, Lock, Star, TrendingUp, Clock, Brain, Rocket, ShieldCheck, Database, Network, Bug, UserCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { validateForm } from '../utils/validation';
import toast from 'react-hot-toast';
import cyberLogo from '../assets/cyber-logo.png';

// Animation variants (Optimized)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1, // Reduced stagger for faster loading
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5, // Reduced duration
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4, // Reduced duration
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Matrix Rain Effect (Optimized for Performance)
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
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = new Array(Math.floor(columns)).fill(1);
    
    // Limit the number of drops for better performance
    const maxDrops = Math.min(columns, 50);
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < maxDrops; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 50); // Reduced frequency for better performance
    
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
      className="fixed inset-0 z-0 opacity-30"
      style={{ pointerEvents: 'none' }}
    />
  );
};

// Particle System (Optimized for Performance)
const ParticleSystem = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Reduced particle count for better performance
    const particleCount = 15;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    
    setParticles(newParticles);
    
    const animate = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          opacity: particle.opacity + (Math.random() - 0.5) * 0.1,
        }))
      );
    };
    
    const interval = setInterval(animate, 100); // Reduced frequency
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: Math.max(0.1, Math.min(0.6, particle.opacity)),
            transform: `scale(${particle.size})`,
          }}
        />
      ))}
    </div>
  );
};

// Floating Icons Component (Optimized)
const FloatingIcons = () => {
  const icons = [
    { icon: Database, color: 'text-blue-400' },
    { icon: Network, color: 'text-purple-400' },
    { icon: Code, color: 'text-cyan-400' },
    { icon: Lock, color: 'text-green-400' },
    { icon: Bug, color: 'text-yellow-400' },
    { icon: ShieldCheck, color: 'text-red-400' },
  ]; // Reduced from 8 to 6 icons
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${item.color} opacity-10`} // Reduced opacity
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0], // Reduced movement range
              x: [0, Math.random() * 20 - 10, 0], // Reduced movement
              rotate: [0, 180], // Reduced rotation
              scale: [1, 1.1, 1], // Reduced scale
            }}
            transition={{
              duration: Math.random() * 15 + 15, // Reduced duration
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5, // Reduced delay
            }}
          >
            <Icon className="w-8 h-8" /> {/* Reduced size */}
          </motion.div>
        );
      })}
    </div>
  );
};

// Animated Background Gradient (Optimized)
const AnimatedGradient = () => {
  return (
    <div className="fixed inset-0 z-0">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 via-purple-900/10 to-cyan-900/20"
        animate={{
          background: [
            "linear-gradient(45deg, #0f172a, #1e3a8a, #7c3aed, #0891b2)",
            "linear-gradient(135deg, #0f172a, #7c3aed, #1e3a8a, #0891b2)",
          ],
        }}
        transition={{
          duration: 30, // Increased duration for smoother, less frequent changes
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Enhanced Role Selection Cards (Optimized Design)
const RoleCard = ({ role, icon: Icon, title, description, buttonText, gradientFrom, gradientTo, borderColor, onClick, isSelected }) => {
  const isStudent = role === 'student';
  
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        scale: 1.02,
        boxShadow: isStudent 
          ? "0 25px 50px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.1)"
          : "0 25px 50px rgba(168, 85, 247, 0.3), 0 0 30px rgba(168, 85, 247, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative cursor-pointer rounded-3xl transition-all duration-300 w-full h-[480px]
        ${isStudent 
          ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 border border-blue-600/30' 
          : 'bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 border border-purple-600/30'
        }
        ${isSelected 
          ? isStudent 
            ? 'ring-2 ring-blue-400 ring-opacity-60 shadow-2xl' 
            : 'ring-2 ring-purple-400 ring-opacity-60 shadow-2xl'
          : ''
        }
        backdrop-blur-sm flex flex-col justify-between overflow-hidden
      `}
    >
      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Subtle glow effect */}
      <div className={`
        absolute inset-0 rounded-3xl opacity-10
        ${isStudent ? 'bg-blue-400' : 'bg-purple-400'}
        blur-2xl
      `} />
      
      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center justify-start flex-1 pt-8">
        {/* Icon with enhanced styling */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`
            mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-2xl
            ${isStudent 
              ? 'bg-gradient-to-br from-blue-600/20 to-blue-700/20 border border-blue-500/30' 
              : 'bg-gradient-to-br from-purple-600/20 to-purple-700/20 border border-purple-500/30'
            }
            backdrop-blur-sm shadow-xl
          `}
        >
          <Icon className={`h-14 w-14 ${isStudent ? 'text-blue-300' : 'text-purple-300'}`} />
        </motion.div>
        
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`
            mb-4 text-4xl font-bold
            ${isStudent ? 'text-blue-100' : 'text-purple-100'}
          `}
        >
          {title}
        </motion.h3>
        
        {/* Action-focused description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`
            text-lg opacity-80 leading-relaxed px-6 flex-1 max-w-sm
            ${isStudent ? 'text-blue-200' : 'text-purple-200'}
          `}
        >
          {description}
        </motion.p>
      </div>

      {/* Enhanced Login Button */}
      <div className="relative z-10 mt-6 px-6 pb-6">
        <motion.button 
          onClick={onClick}
          className={`
            w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 
            ${isStudent 
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-blue-500/25 border border-blue-500/30' 
              : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg hover:shadow-purple-500/25 border border-purple-500/30'
            }
            hover:scale-[1.02] active:scale-[0.98]
          `}
          whileHover={{ 
            y: -2,
            boxShadow: isStudent 
              ? "0 10px 25px rgba(59, 130, 246, 0.4)" 
              : "0 10px 25px rgba(168, 85, 247, 0.4)"
          }}
          whileTap={{ y: 0 }}
        >
          {buttonText}
        </motion.button>
      </div>
      
      {/* Subtle animated border */}
      <div className={`
        absolute inset-0 rounded-3xl opacity-30
        ${isStudent 
          ? 'bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-700/20' 
          : 'bg-gradient-to-r from-purple-500/20 via-purple-600/20 to-purple-700/20'
        }
        animate-pulse
      `} style={{ zIndex: -1 }} />
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
      <AnimatedGradient />
      <MatrixRain />
      <ParticleSystem />
      <FloatingIcons />
      
      {/* Large Background Logo */}
      <div className="fixed inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
        <motion.img 
          src={cyberLogo} 
          alt="Israel Cyber Campus Background Logo" 
          className="w-[2000px] h-[2000px] object-contain"
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
        <section className="flex-1 flex flex-col justify-center items-center px-6 py-20 mt-8">
          {/* Logo Section */}
          <motion.div 
            className="text-center mb-20"
            variants={logoVariants}
          >
            <motion.div 
              className="relative w-64 h-64 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-blue-500/50"
              whileHover={{ 
                scale: 1.1, // Reduced scale
                boxShadow: "0 30px 60px -20px rgba(59, 130, 246, 0.6)" // Reduced shadow
              }}
              animate={{
                boxShadow: [
                  "0 0 30px rgba(59, 130, 246, 0.3)", // Reduced glow
                  "0 0 50px rgba(147, 51, 234, 0.3)",
                  "0 0 30px rgba(59, 130, 246, 0.3)",
                ],
              }}
              transition={{ 
                duration: 0.4, // Reduced duration
                boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" } // Increased duration, reduced frequency
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10" // Reduced opacity
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 30, // Increased duration for slower rotation
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <img 
                src={cyberLogo} 
                alt="Israel Cyber Campus Logo" 
                className="w-56 h-56 object-contain relative z-10"
              />
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-blue-400/20" // Reduced opacity
                animate={{
                  scale: [1, 1.1, 1], // Reduced scale
                  opacity: [0.3, 0, 0.3], // Reduced opacity
                }}
                transition={{
                  duration: 3, // Increased duration
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            
            <motion.h1 
              className="text-8xl font-black text-white mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent relative"
              variants={itemVariants}
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-[length:200%_200%] bg-clip-text text-transparent"
              >
                Israel Cyber Campus
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed mb-10"
              variants={itemVariants}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold">
                הקמפוס הגדול ביותר ללימודי סייבר בישראל
              </span>
              <br />
              <span className="text-blue-400 font-semibold text-2xl">
                אלפי תלמידים • מורים מעולים • חוויית למידה ייחודית
              </span>
            </motion.p>

            <motion.div 
              className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              <p className="mb-6">
                ישראל קמפוס סייבר הוא מרכז הלמידה המתקדם ביותר ללימודי אבטחת מידע בישראל. 
                עם אלפי תלמידים פעילים, צוות מורים מעולים ופלטפורמת למידה ייחודית שפותחה במיוחד עבורנו.
              </p>
              <p>
                אנו מציעים חוויית למידה אינטראקטיבית, תרגולים מעשיים ותוכן עדכני 
                המכין את התלמידים לעולם האבטחה הדיגיטלית של המחר.
              </p>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto"
            variants={itemVariants}
          >
            {[
              { icon: Users, color: 'blue', number: '5,000+', label: 'תלמידים פעילים' },
              { icon: Award, color: 'purple', number: '50+', label: 'מורים מומחים' },
              { icon: Code, color: 'cyan', number: '100%', label: 'תוכנה ייחודית' },
              { icon: Lock, color: 'green', number: '24/7', label: 'גישה מתמדת' },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center text-gray-300 bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: `rgba(59, 130, 246, 0.1)`,
                  borderColor: `rgba(59, 130, 246, 0.5)`
                }}
                variants={itemVariants}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <motion.div
                  className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10`}
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <stat.icon className={`w-6 h-6 text-white`} />
                </motion.div>
                <div className="text-3xl font-black text-white mb-2 relative z-10">
                  {stat.number}
                </div>
                <div className="text-xs font-medium relative z-10">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Features Section */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16 max-w-6xl mx-auto"
            variants={itemVariants}
          >
            {[
              { icon: Zap, color: 'yellow', text: 'למידה אינטראקטיבית' },
              { icon: Target, color: 'red', text: 'תרגול מעשי' },
              { icon: Globe, color: 'green', text: 'תוכן עדכני' },
              { icon: Brain, color: 'purple', text: 'AI מתקדם' },
              { icon: Rocket, color: 'blue', text: 'חדשנות מתמדת' },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center space-y-3 text-gray-300 bg-gray-800/50 backdrop-blur-xl px-4 py-6 rounded-xl border border-gray-700/50 group cursor-pointer text-center"
                whileHover={{ 
                  scale: 1.03, 
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderColor: "rgba(59, 130, 246, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={`w-12 h-12 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-lg flex items-center justify-center`}
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <span className="font-semibold text-sm leading-tight">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Role Selection Cards */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto mb-20"
          >
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
          </motion.div>

          {/* Enhanced Login Form */}
          <AnimatePresence>
            {showLoginForm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-gray-800/95 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-gray-700 max-w-lg w-full relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
                />
                <div className="text-center mb-10 relative z-10">
                  <motion.button
                    onClick={() => setShowLoginForm(false)}
                    className="text-gray-400 hover:text-white transition-colors mb-8 text-xl font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← חזור לבחירת תפקיד
                  </motion.button>
                  <motion.h2 
                    className="text-3xl font-bold text-white mb-6 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {isLogin ? 'ברוך שובך לישראל קמפוס סייבר!' : 'צור חשבון חדש והצטרף אלינו'}
                  </motion.h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  {!isLogin && (
                    <>
                      <div>
                        <label className="block text-lg font-semibold text-gray-300 mb-4">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-6 py-5 bg-gray-700/50 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 text-lg backdrop-blur-sm ${
                            errors.firstName 
                              ? 'border-red-500 focus:ring-red-500/20' 
                              : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                          }`}
                          placeholder="הכנס את שמך המלא"
                        />
                        {errors.displayName && (
                          <p className="text-red-400 text-sm mt-3">{errors.displayName[0]}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-lg font-semibold text-gray-300 mb-4">
                            שם פרטי
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full px-6 py-5 bg-gray-700/50 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 text-lg backdrop-blur-sm ${
                              errors.firstName 
                                ? 'border-red-500 focus:ring-red-500/20' 
                                : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                            }`}
                            placeholder="שם פרטי"
                          />
                          {errors.firstName && (
                            <p className="text-red-400 text-sm mt-3">{errors.firstName[0]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-lg font-semibold text-gray-300 mb-4">
                            שם משפחה
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full px-6 py-5 bg-gray-700/50 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 text-lg backdrop-blur-sm ${
                              errors.lastName 
                                ? 'border-red-500 focus:ring-red-500/20' 
                                : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                            }`}
                            placeholder="שם משפחה"
                          />
                          {errors.lastName && (
                            <p className="text-red-400 text-sm mt-3">{errors.lastName[0]}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-lg font-semibold text-gray-300 mb-4">
                            גיל
                          </label>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            min="1"
                            max="120"
                            className={`w-full px-6 py-5 bg-gray-700/50 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 text-lg backdrop-blur-sm ${
                              errors.age 
                                ? 'border-red-500 focus:ring-red-500/20' 
                                : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                            }`}
                            placeholder="גיל"
                          />
                          {errors.age && (
                            <p className="text-red-400 text-sm mt-3">{errors.age[0]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-lg font-semibold text-gray-300 mb-4">
                            מגדר
                          </label>
                          <select
                            name="sex"
                            value={formData.sex}
                            onChange={handleInputChange}
                            className="w-full px-6 py-5 bg-gray-700/50 border-2 border-gray-600 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg backdrop-blur-sm"
                          >
                            <option value="male">זכר</option>
                            <option value="female">נקבה</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-lg font-semibold text-gray-300 mb-4">
                      אימייל
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-5 bg-gray-700/50 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 text-lg backdrop-blur-sm ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                      }`}
                      placeholder="הכנס את האימייל שלך"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-3">{errors.email[0]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-300 mb-4">
                      סיסמה
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-6 py-5 pr-16 bg-gray-700/50 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 transition-all duration-300 text-lg backdrop-blur-sm ${
                          errors.password 
                            ? 'border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-600 focus:ring-blue-500/20 focus:border-blue-500'
                        }`}
                        placeholder="הכנס את הסיסמה שלך"
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
                      <p className="text-red-400 text-sm mt-3">{errors.password[0]}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 px-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-blue-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        {isLogin ? 'מתחבר...' : 'נרשם...'}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        {isLogin ? 'התחבר' : 'הרשם'}
                        <ArrowRight className="w-6 h-6 mr-4" />
                      </div>
                    )}
                  </motion.button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-gray-400 hover:text-white transition-colors text-lg font-medium"
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
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            {[
              { icon: Star, color: 'yellow', text: 'דירוג 4.9/5' },
              { icon: TrendingUp, color: 'green', text: '95% הצלחה' },
              { icon: Clock, color: 'blue', text: 'זמין 24/7' },
              { icon: ShieldCheck, color: 'purple', text: 'אבטחה מתקדמת' },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center space-y-2 text-gray-300 bg-gray-800/30 backdrop-blur-xl px-4 py-4 rounded-xl border border-gray-700/30 group"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderColor: "rgba(59, 130, 246, 0.5)"
                }}
              >
                <motion.div
                  className={`w-10 h-10 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-lg flex items-center justify-center`}
                  whileHover={{ rotate: 180, scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                >
                  <feature.icon className="w-5 h-5 text-white" />
                </motion.div>
                <span className="font-semibold text-xs text-center">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.footer 
            className="mt-20 mb-8 text-center"
            variants={itemVariants}
          >
            <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 max-w-2xl mx-auto">
              <motion.p 
                className="text-gray-400 text-lg font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                ישראל קמפוס סייבר - כל הזכויות שמורות
              </motion.p>
              <motion.p 
                className="text-gray-500 text-sm mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                Israel Cyber Campus - All Rights Reserved
              </motion.p>
            </div>
          </motion.footer>
        </section>
      </motion.div>
    </div>
  );
};

export default EnhancedLogin; 