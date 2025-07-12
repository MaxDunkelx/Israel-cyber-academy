/**
 * Enhanced Login Component - Modern Landing Page with Interactive Elements
 * 
 * Features:
 * - Responsive design with optimized background effects
 * - Role-based authentication system
 * - Interactive statistics display
 * - Form validation and error handling
 * - Accessibility features
 * - Performance optimized
 */

import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, EyeOff, GraduationCap, Zap, Target, Globe, Users, Award, 
  Code, Lock, Star, TrendingUp, Clock, Brain, ShieldCheck, 
  Database, Network, Bug, UserCheck, ArrowRight, Shield 
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import cyberLogo from '../assets/cyber-logo.png';
import './EnhancedLogin.css';

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  },
  card: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  },
  logo: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
};

const STATISTICS_DATA = {
  row1: [
    { icon: Users, number: '5,000+', label: 'האקרים צעירים', color: 'from-emerald-500 to-teal-600' },
    { icon: Award, number: '50+', label: 'מומחי סייבר', color: 'from-purple-500 to-indigo-600' },
    { icon: Code, number: '100%', label: 'טכנולוגיה מתקדמת', color: 'from-orange-500 to-red-600' },
    { icon: Lock, number: '24/7', label: 'אבטחה מתמדת', color: 'from-cyan-500 to-blue-600' },
    { icon: Zap, text: 'למידה אינטראקטיבית', color: 'from-yellow-500 to-amber-600' },
    { icon: Target, text: 'תרגול מעשי', color: 'from-green-500 to-emerald-600' },
  ],
  row2: [
    { icon: Globe, text: 'תוכן עדכני', color: 'from-blue-500 to-indigo-600' },
    { icon: Brain, text: 'AI מתקדם', color: 'from-pink-500 to-rose-600' },
    { icon: Star, text: 'דירוג 4.9/5', color: 'from-yellow-400 to-orange-500' },
    { icon: TrendingUp, text: '95% הצלחה', color: 'from-lime-500 to-green-600' },
    { icon: Clock, text: 'זמין 24/7', color: 'from-violet-500 to-purple-600' },
    { icon: ShieldCheck, text: 'אבטחה מתקדמת', color: 'from-sky-500 to-blue-500' },
  ],
};

const ROLE_CONFIG = {
  student: {
    icon: GraduationCap,
    title: 'תלמידים',
    description: 'הצטרף עכשיו למסע הלמידה המתקדם ביותר בעולם הסייבר. התחל ללמוד עם אלפי תלמידים אחרים!',
    buttonText: 'הצטרף עכשיו',
  },
  teacher: {
    icon: UserCheck,
    title: 'מורים',
    description: 'הצטרף לצוות ההוראה המוביל שלנו. נהל כיתות, עקוב אחר התקדמות וצור חוויית למידה ייחודית.',
    buttonText: 'הצטרף כמורה',
  },
  system_manager: {
    icon: Shield,
    title: 'מנהל מערכת',
    description: 'גישה מלאה לניהול המערכת, משתמשים ותוכן. רק למנהלי המערכת המוסמכים.',
    buttonText: 'התחבר כמנהל',
  },
};

// ============================================================================
// OPTIMIZED BACKGROUND EFFECTS
// ============================================================================

// Enhanced Matrix Rain - Optimized for smooth performance and visual impact
const MatrixRain = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Enhanced character set with Hebrew, English, and symbols
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンאבגדהוזסעפצקרשת';
    const charArray = chars.split('');
    const fontSize = 18;
    const columns = canvas.width / fontSize;
    const drops = new Array(Math.floor(columns)).fill(1);
    const maxDrops = Math.min(columns, 35); // Increased for more impressive visual impact
    
    // Create gradient effect for matrix characters
    const createGradient = (x, y) => {
      const gradient = ctx.createLinearGradient(x, y, x, y + fontSize);
      gradient.addColorStop(0, '#00ff41'); // Bright green at top
      gradient.addColorStop(0.5, '#3B82F6'); // Blue in middle
      gradient.addColorStop(1, '#1e40af'); // Dark blue at bottom
      return gradient;
    };
    
    const draw = () => {
      // Smoother fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < maxDrops; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Apply gradient effect
        ctx.fillStyle = createGradient(x, y);
        ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
        ctx.fillText(text, x, y);
        
        // Add glow effect for some characters
        if (Math.random() > 0.95) {
          ctx.shadowColor = '#00ff41';
          ctx.shadowBlur = 5;
          ctx.fillText(text, x, y);
          ctx.shadowBlur = 0;
        }
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    // Smooth 60fps animation
    const interval = setInterval(draw, 100);
    
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

// Static floating icons - No animations for better performance
const FloatingIcons = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Database Icon */}
      <div className="absolute top-20 left-10 text-blue-400/20">
        <Database className="w-8 h-8" />
      </div>
      
      {/* Network Icon */}
      <div className="absolute top-40 right-20 text-green-400/20">
        <Network className="w-6 h-6" />
      </div>
      
      {/* Code Icon */}
      <div className="absolute bottom-40 left-20 text-purple-400/20">
        <Code className="w-7 h-7" />
      </div>
      
      {/* Bug Icon */}
      <div className="absolute bottom-20 right-10 text-red-400/20">
        <Bug className="w-6 h-6" />
      </div>
      
      {/* Shield Icon */}
      <div className="absolute top-60 left-1/4 text-yellow-400/20">
        <Shield className="w-5 h-5" />
      </div>
      
      {/* Lock Icon */}
      <div className="absolute bottom-60 right-1/4 text-cyan-400/20">
        <Lock className="w-6 h-6" />
      </div>
    </div>
  );
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getBorderColor = (color) => {
  if (color.includes('emerald')) return '#10b981';
  if (color.includes('purple')) return '#8b5cf6';
  if (color.includes('orange')) return '#f97316';
  if (color.includes('cyan')) return '#06b6d4';
  if (color.includes('yellow')) return '#eab308';
  if (color.includes('green')) return '#22c55e';
  if (color.includes('blue')) return '#3b82f6';
  if (color.includes('pink')) return '#ec4899';
  if (color.includes('lime')) return '#84cc16';
  if (color.includes('violet')) return '#8b5cf6';
  if (color.includes('sky')) return '#0ea5e9';
  return '#3b82f6';
};

// ============================================================================
// COMPONENTS
// ============================================================================

const StatisticsCard = memo(({ item, index, variants }) => (
  <motion.div 
    className={`relative overflow-hidden rounded-xl p-4 bg-slate-800/50 backdrop-blur-xl border-2 hover:bg-slate-800/70 transition-all duration-300`}
    style={{
      borderColor: getBorderColor(item.color)
    }}
    variants={variants}
  >
    {/* Consistent background for all statistics cards */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-10" />
    
    <div className="relative z-10 text-center">
    {item.number ? (
      <>
          <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg`}>
            <item.icon className="w-6 h-6 text-white" />
        </div>
          <div className="text-2xl font-bold text-white mb-1">{item.number}</div>
          <div className="text-xs text-gray-300">{item.label}</div>
      </>
    ) : (
        <>
          <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg`}>
            <item.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-sm text-gray-300 font-medium">{item.text}</div>
        </>
      )}
    </div>
  </motion.div>
));

const RoleCard = ({ role, icon: Icon, title, description, buttonText, onClick, isSelected }) => {
  const getRoleColors = () => {
    switch (role) {
      case 'student':
        return {
          gradient: 'from-blue-500 to-cyan-600',
          hover: 'hover:from-blue-400 hover:to-cyan-500',
          border: 'border-blue-500/30',
          glow: 'shadow-blue-500/25',
        };
      case 'teacher':
        return {
          gradient: 'from-green-500 to-emerald-600',
          hover: 'hover:from-green-400 hover:to-emerald-500',
          border: 'border-green-500/30',
          glow: 'shadow-green-500/25',
        };
      case 'system_manager':
        return {
          gradient: 'from-purple-500 to-indigo-600',
          hover: 'hover:from-purple-400 hover:to-indigo-500',
          border: 'border-purple-500/30',
          glow: 'shadow-purple-500/25',
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          hover: 'hover:from-gray-400 hover:to-gray-500',
          border: 'border-gray-500/30',
          glow: 'shadow-gray-500/25',
        };
    }
  };

  const colors = getRoleColors();

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-300 border-2 ${
        isSelected 
          ? 'bg-slate-800/95 backdrop-blur-2xl shadow-xl' 
          : 'bg-slate-800/50 backdrop-blur-xl hover:bg-slate-800/70'
      } ${colors.border}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Removed infinite animation for better performance */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-5`} />
      
      <div className="relative z-10 text-center">
        <div
          className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg ${colors.glow}`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-6">{description}</p>
        
        <motion.button
          className={`w-full py-3 px-6 bg-gradient-to-r ${colors.gradient} ${colors.hover} text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg ${colors.glow}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.div>
  );
};

const FormInput = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error, 
  placeholder, 
  required = false,
  min,
  max,
  options = null,
  autocomplete
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-200 mb-2">
      {label}
    </label>
    {options ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-slate-700/50 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm backdrop-blur-sm"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        required={required}
        className={`w-full px-4 py-3 bg-slate-700/50 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 text-sm backdrop-blur-sm ${
          error 
            ? 'border-red-500 focus:ring-red-500/20' 
            : 'border-slate-600 focus:ring-blue-500/20 focus:border-blue-500'
        }`}
        placeholder={placeholder}
      />
    )}
    {error && (
      <p className="text-red-400 text-xs mt-2">{error[0]}</p>
    )}
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const EnhancedLogin = () => {
  const { login, signup } = useAuth();
  const [selectedRole, setSelectedRole] = useState('student');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    sex: 'male',
    email: '',
    password: '',
  });

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
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔍 Login attempt started:', { email: formData.email, isLogin, selectedRole });
    setIsLoading(true);
    setErrors({});

    try {
      // Simple validation for testing
      if (!formData.email || !formData.password) {
        setErrors({ 
          email: formData.email ? null : ['Email is required'],
          password: formData.password ? null : ['Password is required']
        });
        setIsLoading(false);
        return;
      }

      console.log('🔍 Attempting authentication with:', { email: formData.email, isLogin, selectedRole });

      if (isLogin) {
        console.log('🔐 Attempting login...');
        const result = await login(formData.email, formData.password);
        console.log('✅ Login successful:', result);
        toast.success('התחברת בהצלחה!');
      } else {
        console.log('📝 Attempting signup...');
        const displayName = `${formData.firstName} ${formData.lastName}`;
        const result = await signup(formData.email, formData.password, displayName, selectedRole, formData);
        console.log('✅ Signup successful:', result);
        toast.success('נרשמת בהצלחה!');
      }
    } catch (error) {
      console.error('❌ Authentication error:', error);
      toast.error(error.message || 'שגיאה בהתחברות');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowLoginForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <MatrixRain />
      <FloatingIcons />
      
      {/* Background Logo - Optimized for smooth performance */}
      <div className="fixed inset-0 flex items-center justify-center opacity-25 pointer-events-none z-0">
        <img 
          src={cyberLogo} 
          alt="Background Logo" 
          className="w-[2800px] h-[2800px] object-contain drop-shadow-[0_0_80px_rgba(59,130,246,0.5)] animate-smooth-spin"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-blue-900/20 to-black/30 animate-gradient-move backdrop-blur-sm" />
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col pt-8"
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="visible"
      >
        <section className="flex-1 flex flex-col justify-center items-center px-6 py-16 mt-4">
          {/* Logo Section */}
          <motion.div 
            className="text-center mb-6 z-10 relative -mt-[200px]"
            variants={ANIMATION_VARIANTS.logo}
          >
            <motion.div className="pt-0 pb-1 flex items-center justify-center mx-auto relative">
              <motion.img 
                src={cyberLogo} 
                alt="Logo" 
                className="w-[760px] h-[400px] object-contain animate-blink-glow"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* Statistics Section - Row 1 */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12 max-w-6xl mx-auto -mt-[100px]"
            variants={ANIMATION_VARIANTS.item}
          >
            {STATISTICS_DATA.row1.map((item, index) => (
              <StatisticsCard 
                key={index} 
                item={item} 
                index={index} 
                variants={ANIMATION_VARIANTS.item}
              />
            ))}
          </motion.div>

          {/* Statistics Section - Row 2 */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12 max-w-6xl mx-auto"
            variants={ANIMATION_VARIANTS.item}
          >
            {STATISTICS_DATA.row2.map((item, index) => (
              <StatisticsCard 
                key={index} 
                item={item} 
                index={index} 
                variants={ANIMATION_VARIANTS.item}
              />
            ))}
          </motion.div>

          {/* Role Selection Cards */}
          <motion.div 
            variants={ANIMATION_VARIANTS.container}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-16"
          >
            {Object.entries(ROLE_CONFIG).map(([role, config]) => (
              <div key={role} className="flex justify-center">
                <RoleCard
                  role={role}
                  icon={config.icon}
                  title={config.title}
                  description={config.description}
                  buttonText={config.buttonText}
                  onClick={() => handleRoleSelect(role)}
                  isSelected={selectedRole === role}
                />
              </div>
            ))}
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
                className="bg-slate-800/95 backdrop-blur-2xl rounded-2xl p-8 shadow-xl border-2 border-blue-500/50 max-w-md w-full relative overflow-hidden"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5" />
                
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
                    {isLogin ? 'ברוך שובך!' : 'התחבר למערכת'}
                  </motion.h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  {!isLogin && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                          label="שם פרטי"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          error={errors.firstName}
                          placeholder="שם פרטי"
                          required
                        />
                        <FormInput
                          label="שם משפחה"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          error={errors.lastName}
                          placeholder="שם משפחה"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                          label="גיל"
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          error={errors.age}
                          placeholder="גיל"
                          min="1"
                          max="120"
                          required
                        />
                        <FormInput
                          label="מגדר"
                          name="sex"
                          value={formData.sex}
                          onChange={handleInputChange}
                          options={[
                            { value: 'male', label: 'זכר' },
                            { value: 'female', label: 'נקבה' }
                          ]}
                        />
                      </div>
                    </>
                  )}

                  <FormInput
                    label="אימייל"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="הכנס את האימייל שלך"
                    required
                  />

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
                        required
                        autocomplete="current-password"
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

          {/* Footer */}
          <motion.footer 
            className="mt-16 mb-6 text-center"
            variants={ANIMATION_VARIANTS.item}
          >
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-5 border border-slate-700/50 max-w-2xl mx-auto">
              <motion.div 
                className="text-gray-300 text-lg font-medium"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                כל הזכויות שמורות
              </motion.div>
              <motion.div 
                className="text-gray-400 text-sm mt-1"
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