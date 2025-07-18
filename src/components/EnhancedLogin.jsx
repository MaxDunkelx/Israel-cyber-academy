import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getLoginAnalytics } from '../firebase/login-analytics-service';
import { usePureAuth } from '../contexts/PureAuthContext';

// Frontend script removed - using admin script instead: scripts/create-all-auth-users.cjs

const EnhancedLogin = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile, login, logout } = usePureAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalLessons: 0,
    activeSessions: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [terminalText, setTerminalText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const canvasRef = useRef(null);
  const matrixIntervalRef = useRef(null);
  const terminalTimeoutRef = useRef(null);
  const subtitleTimeoutRef = useRef(null);

  useEffect(() => {
    console.log('🚪 LOGIN PAGE: Page loaded with auth state:', {
      hasCurrentUser: !!currentUser,
      currentUserEmail: currentUser?.email,
      hasUserProfile: !!userProfile,
      userProfileRole: userProfile?.role
    });

    // Note: User redirect logic is handled by LoginRoute in App.jsx
    // This component should only handle the login UI, not redirects

    loadRealStatistics();
    setupMatrixRain();
    startTerminalAnimation();
    createFloatingOrbs();

    // Cleanup function
    return () => {
      if (matrixIntervalRef.current) {
        clearInterval(matrixIntervalRef.current);
      }
      if (terminalTimeoutRef.current) {
        clearTimeout(terminalTimeoutRef.current);
      }
      if (subtitleTimeoutRef.current) {
        clearTimeout(subtitleTimeoutRef.current);
      }
    };
  }, [currentUser, userProfile, navigate]);

  const createFloatingOrbs = () => {
    const orbsContainer = document.getElementById('floating-orbs');
    if (!orbsContainer) return;

    // Create orbs more efficiently
    const orbCount = 6; // Reduced for better performance
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < orbCount; i++) {
      const orb = document.createElement('div');
      orb.className = 'floating-orb';
      orb.style.left = `${Math.random() * 100}%`;
      orb.style.animationDelay = `${Math.random() * 5}s`;
      orb.style.animationDuration = `${Math.random() * 5 + 10}s`;
      fragment.appendChild(orb);
    }
    
    orbsContainer.appendChild(fragment);
  };

  const terminalLines = [
    'root@cyber:~$ systemctl start cyber-portal',
    '● Starting Israel Cyber Campus Portal...',
    '● Loading quantum encryption modules...',
    '● Initializing neural network connections...',
    '● Establishing secure communication channels...',
    '● Authenticating system credentials...',
    '● Validating cyber security protocols...',
    '● Loading holographic interface...',
    '● Activating matrix rain effect...',
    '● Connecting to student database...',
    '● Syncing lesson modules...',
    '● Preparing interactive simulations...',
    '● System ready for user authentication',
    'root@cyber:~$ netstat -tuln | grep :443',
    'tcp6       0      0 :::443                  :::*                    LISTEN',
    'tcp6       0      0 :::8080                 :::*                    LISTEN',
    'root@cyber:~$ tail -f /var/log/cyber-access.log',
    '[INFO] System boot sequence completed',
    '[INFO] Quantum encryption handshake successful',
    '[INFO] Neural network fully operational',
    '[INFO] Holographic interface initialized',
    '[INFO] Matrix rain effect: LEFT_PANEL_ONLY',
    '[INFO] Security protocols: MAXIMUM_LEVEL',
    '[INFO] User authentication system ready',
    '[INFO] Waiting for user connection...',
    'root@cyber:~$ _'
  ];

  const startTerminalAnimation = () => {
    setIsTyping(true);
    let lineIndex = 0;
    let charIndex = 0;
    
    const typeNextChar = () => {
      if (lineIndex >= terminalLines.length) {
        setIsTyping(false);
        return;
      }
      
      const currentLineText = terminalLines[lineIndex];
      
      if (charIndex < currentLineText.length) {
        setTerminalText(prev => prev + (currentLineText[charIndex] || ''));
        charIndex++;
        terminalTimeoutRef.current = setTimeout(typeNextChar, 30);
      } else {
        setTerminalText(prev => prev + '\n');
        lineIndex++;
        charIndex = 0;
        terminalTimeoutRef.current = setTimeout(typeNextChar, 150);
      }
    };
    
    typeNextChar();
  };



  const loadRealStatistics = async () => {
    try {
      setStatsLoading(true);
      console.log('🎯 Starting analytics load...');
      
      const loginAnalytics = await getLoginAnalytics();
      console.log('🎯 Analytics received:', loginAnalytics);
      
      if (loginAnalytics && typeof loginAnalytics === 'object') {
        const newStats = {
          totalUsers: (loginAnalytics.totalStudents || 0) + (loginAnalytics.totalTeachers || 0),
          totalStudents: loginAnalytics.totalStudents || 0,
          totalTeachers: loginAnalytics.totalTeachers || 0,
          totalLessons: loginAnalytics.totalLessons || 0,
          activeSessions: 0 // Not used in the 3 main containers
        };
        
        console.log('🎯 Setting stats to:', newStats);
        setStats(newStats);
        console.log('✅ Login analytics loaded successfully!');
      } else {
        console.error('🎯 Invalid analytics data type:', typeof loginAnalytics, loginAnalytics);
        throw new Error('Invalid analytics data received from login-analytics collection');
      }
    } catch (error) {
      console.error('❌ Error loading login analytics:', error.message);
      setStats({
        totalUsers: 0,
        totalStudents: 0,
        totalTeachers: 0,
        totalLessons: 0,
        activeSessions: 0
      });
    } finally {
      setStatsLoading(false);
      console.log('🎯 Stats loading finished');
    }
  };

  const setupMatrixRain = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth * 0.333;
    canvas.height = window.innerHeight;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff88';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    matrixIntervalRef.current = setInterval(draw, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🏁 PURE LOGIN FORM STEP 1: Form submitted with data:', {
      email: email?.trim() || 'Empty',
      passwordLength: password?.length || 0,
      selectedRole: selectedRole || 'None',
      timestamp: new Date().toISOString()
    });
    
    // Input validation
    if (!email?.trim() || !password?.trim()) {
      console.log('🏁 PURE LOGIN FORM STEP 2: ❌ Validation failed - missing email/password');
      toast.error('נא למלא את כל השדות');
      return;
    }

    if (!selectedRole) {
      console.log('🏁 PURE LOGIN FORM STEP 2: ❌ Validation failed - no role selected');
      toast.error('נא לבחור תפקיד');
      return;
    }

    console.log('🏁 PURE LOGIN FORM STEP 2: ✅ Validation passed - proceeding with pure login');
    
    setLoading(true);
    try {
      console.log('🏁 PURE LOGIN FORM STEP 3: Calling pure authentication service...');
      
      await login(email.trim(), password);
      
      console.log('🏁 PURE LOGIN FORM STEP 4: ✅ Pure authentication completed successfully!');
      console.log('🏁 PURE LOGIN FORM STEP 5: 🎯 PureAuthContext will handle redirect based on role...');
      
      toast.success('התחברת בהצלחה!');
      // Don't navigate manually - let PureAuthContext handle role-based redirect
      
    } catch (error) {
      console.error('🏁 PURE LOGIN FORM STEP 4: ❌ Pure authentication failed:', {
        errorCode: error?.code,
        errorMessage: error?.message,
        errorType: error?.constructor?.name,
        email: email?.trim()
      });
      
      let errorMessage = 'אירעה שגיאה בהתחברות';
      
      if (error?.message) {
        console.log('🏁 PURE LOGIN FORM STEP 4.1: Mapping error message to user message');
        
        if (error.message.includes('Invalid email or password')) {
          errorMessage = 'אימייל או סיסמה שגויים';
          console.log('🏁 PURE LOGIN FORM STEP 4.2: Invalid credentials');
        } else if (error.message.includes('Account is disabled')) {
          errorMessage = 'החשבון מושבת. פנה למנהל המערכת';
          console.log('🏁 PURE LOGIN FORM STEP 4.2: Account disabled');
        } else if (error.message.includes('network')) {
          errorMessage = 'בעיית חיבור לאינטרנט';
          console.log('🏁 PURE LOGIN FORM STEP 4.2: Network connectivity issue');
        } else {
          errorMessage = 'אירעה שגיאה בהתחברות';
          console.log('🏁 PURE LOGIN FORM STEP 4.2: Unknown error:', error.message);
        }
      }
      
      console.log('🏁 PURE LOGIN FORM STEP 4.3: Showing error message to user:', errorMessage);
      toast.error(errorMessage);
      
    } finally {
      setLoading(false);
      console.log('🏁 PURE LOGIN FORM STEP 5: Login process completed (success or failure)');
    }
  };

  // Clear existing session
  const handleClearSession = async () => {
    console.log('🚪 LOGIN PAGE: Clearing existing session...');
    try {
      await logout();
      toast.success('Session cleared - you can now login as a different user');
      console.log('🚪 LOGIN PAGE: ✅ Session cleared successfully');
    } catch (error) {
      console.error('🚪 LOGIN PAGE: ❌ Error clearing session:', error);
      toast.error('Error clearing session');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]"></div>
      </div>

      {/* Matrix Rain Background - Only on left 1/3 */}
      <canvas
        ref={canvasRef}
        className="absolute left-0 top-0 z-0 opacity-30"
        style={{ 
          background: 'transparent',
          width: '33.333%',
          height: '100%'
        }}
      />

      {/* Optimized Background Effects */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="cyber-grid"></div>
      </div>

      {/* Floating Cyber Orbs - Reduced count */}
      <div id="floating-orbs" className="absolute inset-0 z-5 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-start justify-center p-4" style={{ paddingTop: '100px' }}>
        <div className="w-full max-w-4xl mx-auto">
          {/* Centered Main content */}
          <div className="flex flex-col items-center">
          {/* Enhanced Logo with Emitting Pulse */}
          <div className="relative mb-2 flex justify-center" style={{ marginTop: '-200px' }}>
            <div className="relative z-10">
              {/* Emitting pulse rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-144 h-144 rounded-full border border-cyan-400/30"
                  style={{
                    animation: 'emitPulse 2s ease-out infinite',
                    transform: 'translateY(20px)'
                  }}
                ></div>
                <div 
                  className="absolute w-144 h-144 rounded-full border border-green-400/30"
                  style={{
                    animation: 'emitPulse 2s ease-out infinite 0.5s',
                    transform: 'translateY(20px)'
                  }}
                ></div>
                <div 
                  className="absolute w-144 h-144 rounded-full border border-cyan-400/20"
                  style={{
                    animation: 'emitPulse 2s ease-out infinite 1s',
                    transform: 'translateY(20px)'
                  }}
                ></div>
              </div>
              
              {/* Core pulse glow */}
              <div 
                className="absolute inset-0 w-144 h-144 mx-auto rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 60%)',
                  animation: 'corePulse 1.5s ease-in-out infinite',
                  transform: 'translateY(20px)'
                }}
              ></div>
              
              {/* Main logo with enhanced glow */}
              <img 
                src="/cyber-logo.png" 
                alt="Israel Cyber Campus" 
                className="w-144 h-144 mx-auto relative"
                style={{
                  filter: 'brightness(1.3) contrast(1.2) drop-shadow(0 0 25px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 50px rgba(0, 255, 136, 0.6))',
                  transform: 'translateY(20px)',
                  width: '576px',
                  height: 'auto',
                  maxWidth: '750px'
                }}
              />
              
              {/* Active corner indicators */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-144 h-144" style={{ transform: 'translateY(20px) translateX(-50%)' }}>
                <div className="absolute top-2 left-2 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>

          {/* Enhanced Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl mx-auto" style={{ marginTop: '-100px' }}>
            <div className="relative bg-green-900/40 backdrop-blur-sm border border-green-500/50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/25 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="text-3xl font-bold text-green-300 mb-2 font-mono animate-pulse">{stats.totalStudents || 0}</div>
                <div className="text-green-100 font-mono text-sm">[תלמידים_פעילים]</div>
              </div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <div className="relative bg-blue-900/40 backdrop-blur-sm border border-blue-500/50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/25 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="text-3xl font-bold text-blue-300 mb-2 font-mono animate-pulse">{stats.totalTeachers || 0}</div>
                <div className="text-blue-100 font-mono text-sm">[מדריכים_מקצועיים]</div>
              </div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            </div>
            <div className="relative bg-purple-900/40 backdrop-blur-sm border border-purple-500/50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/25 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="text-3xl font-bold text-purple-300 mb-2 font-mono animate-pulse">{stats.totalLessons || 0}</div>
                <div className="text-purple-100 font-mono text-sm">[מודולים_מתקדמים]</div>
              </div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Cyber Status Indicators */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 font-mono text-sm">[מערכת_פעילה]</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
              <span className="text-cyan-300 font-mono text-sm">[אבטחה_מקסימלית]</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
              <span className="text-blue-300 font-mono text-sm">[חיבור_קוונטי]</span>
            </div>
          </div>

          {/* Enhanced Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl mx-auto">
            <div 
              className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 group overflow-hidden ${
                selectedRole === 'student' 
                  ? 'border-blue-400 bg-blue-900/20 shadow-lg shadow-blue-500/25' 
                  : 'border-blue-500/50 bg-black/20 hover:border-blue-400 hover:bg-blue-900/10'
              }`}
              onClick={() => setSelectedRole('student')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative z-10 text-center">
                <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 10px #3b82f6)' }}>👨‍🎓</div>
                <h3 className="text-xl font-semibold text-blue-300 mb-2 font-mono group-hover:text-blue-200 transition-colors">[גישה_לתלמיד]</h3>
                <p className="text-blue-200 text-sm font-mono">[שיעורים_אינטראקטיביים] • [מעבדות_סייבר]</p>
              </div>
              {selectedRole === 'student' && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              )}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>

            <div 
              className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 group overflow-hidden ${
                selectedRole === 'teacher' 
                  ? 'border-green-400 bg-green-900/20 shadow-lg shadow-green-500/25' 
                  : 'border-green-500/50 bg-black/20 hover:border-green-400 hover:bg-green-900/10'
              }`}
              onClick={() => setSelectedRole('teacher')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative z-10 text-center">
                <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 10px #22c55e)' }}>👨‍🏫</div>
                <h3 className="text-xl font-semibold text-green-300 mb-2 font-mono group-hover:text-green-200 transition-colors">[גישה_למדריך]</h3>
                <p className="text-green-200 text-sm font-mono">[ניהול_כיתות] • [שליטה_בזמן_אמת]</p>
              </div>
              {selectedRole === 'teacher' && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              )}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>

            <div 
              className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 group overflow-hidden ${
                selectedRole === 'system-manager' 
                  ? 'border-red-400 bg-red-900/20 shadow-lg shadow-red-500/25' 
                  : 'border-red-500/50 bg-black/20 hover:border-red-400 hover:bg-red-900/10'
              }`}
              onClick={() => setSelectedRole('system-manager')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative z-10 text-center">
                <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 10px #ef4444)' }}>👨‍💼</div>
                <h3 className="text-xl font-semibold text-red-300 mb-2 font-mono group-hover:text-red-200 transition-colors">[מנהל_מערכת]</h3>
                <p className="text-red-200 text-sm font-mono">[ניהול_מתקדם] • [בקרת_תוכן]</p>
              </div>
              {selectedRole === 'system-manager' && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              )}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </div>

          {/* Enhanced Login Form - Only show after role selection */}
          {selectedRole && (
            <div className="w-full max-w-lg mx-auto">
              <div className="bg-gradient-to-br from-black/80 to-slate-900/80 backdrop-blur-md border-2 border-cyan-500/60 rounded-xl p-8 mb-6 shadow-2xl shadow-cyan-500/20">
                <div className="text-center mb-6">
                  <div className="text-cyan-400 font-mono text-lg mb-2 font-bold tracking-wider">[התחברות_מערכת]</div>
                  <div className="text-cyan-300 font-mono text-sm">גישה אושרה עבור: {selectedRole === 'student' ? 'תלמיד' : selectedRole === 'teacher' ? 'מדריך' : 'מנהל_מערכת'}</div>
                  
                  {/* Show current session info if user is logged in */}
                  {currentUser && (
                    <div className="mt-4 p-3 bg-yellow-900/50 border border-yellow-500/30 rounded-lg">
                      <p className="text-yellow-300 text-sm mb-2 font-mono">
                        [מחובר_כרגע]: {currentUser.email}
                      </p>
                      <button
                        type="button"
                        onClick={handleClearSession}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors font-mono"
                      >
                        [נקה_חיבור]
                      </button>
                    </div>
                  )}
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-mono text-cyan-400 mb-2 font-semibold tracking-wide">
                      [כתובת_אימייל]
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-black/90 border-2 border-cyan-500/40 rounded-lg text-green-300 font-mono text-base placeholder-green-600/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 shadow-lg shadow-cyan-500/10"
                      placeholder="user@domain.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-mono text-cyan-400 mb-2 font-semibold tracking-wide">
                      [סיסמה]
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-black/90 border-2 border-cyan-500/40 rounded-lg text-green-300 font-mono text-base placeholder-green-600/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 shadow-lg shadow-cyan-500/10"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 bg-gradient-to-r from-cyan-600 via-green-600 to-cyan-700 text-white font-mono font-bold text-lg rounded-lg border-2 border-cyan-400/50 hover:from-cyan-500 hover:via-green-500 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/30"
                  >
                    {loading ? '[מתחבר...]' : '[התחבר]'}
                  </button>
                </form>
                
                <div className="text-center mt-6">
                  <div className="text-cyan-400 font-mono text-sm font-semibold">[רמת_אבטחה: מקסימלית]</div>
                  <div className="flex justify-center items-center mt-2 space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Database Restore Component - Only show in development */}
          {import.meta.env.DEV && (
            <div className="mt-8 w-full max-w-lg mx-auto">
      
            </div>
          )}

          {/* Enhanced Footer */}
          <div className="mt-12 text-center">
            <p className="text-cyan-300/70 text-sm mb-2">
              <span 
                className="inline-flex items-center font-mono"
              >
                <span 
                  className="w-3 h-3 bg-magenta-400 rounded-full mr-2"
                  style={{
                    animation: 'beaconDot 3s ease-in-out infinite',
                    boxShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff'
                  }}
                ></span>
                [גרסת_פורטל_2025]
              </span>
            </p>
            <p className="text-cyan-200/50 text-xs font-mono">
              [מערכת_למידה_מתקדמת] | [טכנולוגיות_עתידיות]
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-16">
            <p className="text-gray-300 text-base">
              © {new Date().getFullYear()} Israel Cyber Campus • כל הזכויות שמורות
            </p>
            <p className="text-cyan-400 text-sm mt-3 font-mono">
              System Status: Online • Security Level: Maximum • Quantum Ready
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* Upper Left Terminal */}
      {showTerminal && (
        <div className="fixed top-4 left-4 z-20">
          <div 
            className="bg-black/80 backdrop-blur-sm border border-green-500/50 rounded-lg p-2 w-64 transition-all duration-500 ease-in-out"
            style={{
              minHeight: '12rem',
              height: isTyping ? 'fit-content' : '12rem'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-green-400 font-mono text-xs">[מסוף]</div>
              <button
                onClick={() => setShowTerminal(false)}
                className="text-green-400 hover:text-green-300 font-mono text-xs transition-colors duration-200"
              >
                סגור
              </button>
            </div>
            
            <div className="font-mono text-xs bg-black/80">
              <pre className="text-green-300 whitespace-pre-wrap leading-tight">
                {terminalText || ''}
                {isTyping && <span className="text-green-400 animate-pulse">█</span>}
              </pre>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #00ffff, transparent),
            radial-gradient(2px 2px at 40px 70px, #ff00ff, transparent),
            radial-gradient(1px 1px at 90px 40px, #ffff00, transparent),
            radial-gradient(1px 1px at 130px 80px, #00ff88, transparent),
            radial-gradient(2px 2px at 160px 30px, #ff0080, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          animation: float 20s linear infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-100px); }
        }

        .cyber-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.15) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: grid-move 25s linear infinite;
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .logo-container {
          position: relative;
          display: inline-block;
        }

        .spinning-logo {
          height: 150px;
          width: auto;
          filter: drop-shadow(0 0 50px rgba(0, 255, 255, 1)) drop-shadow(0 0 100px rgba(255, 0, 255, 0.8));
          animation: logo-spin 8s linear infinite;
        }

        .floating-orb {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #00ffff, #0080ff);
          border-radius: 50%;
          box-shadow: 0 0 15px #00ffff;
          animation: float-orb linear infinite;
          opacity: 0.6;
        }

        .floating-orb:nth-child(even) {
          background: radial-gradient(circle, #00ff88, #008844);
          box-shadow: 0 0 15px #00ff88;
        }

        @keyframes float-orb {
          0% { 
            transform: translateY(100vh); 
            opacity: 0;
          }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { 
            transform: translateY(-100px); 
            opacity: 0;
          }
        }

        @keyframes emitPulse {
          0% { 
            transform: translateY(20px) scale(1);
            opacity: 0.8;
          }
          100% { 
            transform: translateY(20px) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes corePulse {
          0%, 100% { 
            transform: translateY(20px) scale(1);
            opacity: 0.2;
          }
          50% { 
            transform: translateY(20px) scale(1.05);
            opacity: 0.4;
          }
        }

        @keyframes logo-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, transparent 70%);
          border-radius: 50%;
          animation: glow-pulse 2s ease-in-out infinite alternate;
        }

        .logo-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 250px;
          height: 250px;
          border: 3px solid rgba(0, 255, 255, 0.6);
          border-radius: 50%;
          animation: pulse-ring 3s ease-in-out infinite;
        }

        .logo-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          border: 2px solid rgba(255, 0, 255, 0.4);
          border-radius: 50%;
          animation: ring-rotate 10s linear infinite;
        }

        @keyframes glow-pulse {
          0% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1.3); }
        }

        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
        }

        @keyframes ring-rotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .stat-card {
          background: rgba(0, 0, 0, 0.6);
          border: 2px solid rgba(0, 255, 255, 0.4);
          border-radius: 16px;
          padding: 1.8rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(15px);
          transition: all 0.4s ease;
          box-shadow: 0 8px 32px rgba(0, 255, 255, 0.2);
          transform: scale(0.85);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .stat-card:hover::before {
          left: 100%;
        }

        .stat-card:hover {
          border-color: rgba(0, 255, 255, 0.8);
          transform: translateY(-4px) scale(0.9);
          box-shadow: 0 12px 40px rgba(0, 255, 255, 0.4);
        }

        .stat-icon {
          margin-bottom: 0.8rem;
        }

        .stat-number {
          font-size: 2.2rem;
          font-weight: bold;
          color: #ffffff;
          text-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
        }

        .stat-label {
          font-size: 1rem;
          color: #b0b0b0;
          margin-top: 0.5rem;
        }

        .role-card {
          background: rgba(0, 0, 0, 0.5);
          border: 3px solid;
          border-radius: 25px;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.4s ease;
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .role-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .role-card:hover::before {
          left: 100%;
        }

        .role-card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .role-card.selected {
          border-width: 4px;
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 20px 60px rgba(0, 255, 255, 0.5);
        }

        .role-icon {
          margin-bottom: 1.5rem;
          display: inline-flex;
          padding: 1.5rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .cyber-portal-container {
          background: rgba(0, 0, 0, 0.9);
          border: 2px solid rgba(0, 255, 255, 0.5);
          border-radius: 20px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: 0 15px 50px rgba(0, 255, 255, 0.2);
        }

        .portal-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #00ffff, #0080ff);
          border-radius: 20px;
          z-index: -1;
          animation: portal-glow 3s ease-in-out infinite alternate;
        }

        @keyframes portal-glow {
          0% { opacity: 0.2; }
          100% { opacity: 0.4; }
        }

        .portal-content {
          position: relative;
          z-index: 1;
        }

        .cyber-input-group {
          margin-bottom: 1.5rem;
        }

        .cyber-label {
          display: block;
          color: #00ffff;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
        }

        .cyber-input-container {
          position: relative;
        }

        .cyber-input {
          width: 100%;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(0, 255, 255, 0.3);
          border-radius: 8px;
          padding: 0.875rem 1rem;
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .cyber-input:focus {
          outline: none;
          border-color: rgba(0, 255, 255, 0.8);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
          background: rgba(0, 0, 0, 0.9);
        }

        .cyber-input::placeholder {
          color: rgba(156, 163, 175, 0.7);
        }

        .input-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 8px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .cyber-input:focus + .input-glow {
          opacity: 1;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
        }

        .cyber-submit-btn {
          width: 100%;
          background: linear-gradient(45deg, #00ffff, #0080ff);
          border: none;
          border-radius: 12px;
          padding: 1rem;
          color: #000000;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          text-shadow: none;
          box-shadow: 0 5px 20px rgba(0, 255, 255, 0.3);
        }

        .cyber-submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .cyber-submit-btn:hover::before {
          left: 100%;
        }

        .cyber-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 255, 255, 0.5);
        }

        .cyber-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .cyber-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid transparent;
          border-top: 3px solid #000000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .cyber-subtitle {
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
          animation: subtitle-glow 3s ease-in-out infinite alternate;
        }

        @keyframes subtitle-glow {
          0% { text-shadow: 0 0 20px rgba(0, 255, 255, 0.6); }
          100% { text-shadow: 0 0 30px rgba(0, 255, 255, 0.9), 0 0 40px rgba(0, 255, 255, 0.4); }
        }

        .beacon-text {
          position: relative;
          text-shadow: 0 0 10px rgba(255, 0, 255, 0.8);
          animation: beacon-pulse 2s ease-in-out infinite;
        }

        .beacon-text::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -20px;
          width: 8px;
          height: 8px;
          background: #ff00ff;
          border-radius: 50%;
          transform: translateY(-50%);
          animation: beacon-dot 2s ease-in-out infinite;
        }

        @keyframes beacon-pulse {
          0% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.8; transform: scale(1); }
        }

        @keyframes beacon-dot {
          0% { opacity: 0.5; box-shadow: 0 0 5px #ff00ff; }
          50% { opacity: 1; box-shadow: 0 0 15px #ff00ff, 0 0 25px #ff00ff; }
          100% { opacity: 0.5; box-shadow: 0 0 5px #ff00ff; }
        }

        @keyframes textPulse {
          0% { text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff; }
          100% { text-shadow: 0 0 15px #00ffff, 0 0 25px #00ffff, 0 0 35px #00ffff; }
        }

        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 5px #00ffff; }
          50% { text-shadow: 0 0 10px #00ffff, 0 0 15px #00ffff; }
        }

        @keyframes textFade {
          0%, 100% { opacity: 0.7; text-shadow: 0 0 3px #00ffff; }
          50% { opacity: 1; text-shadow: 0 0 5px #00ffff, 0 0 8px #00ffff; }
        }

        @keyframes beaconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        @keyframes beaconDot {
          0%, 100% { 
            opacity: 0.6; 
            transform: scale(1);
            box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2);
            box-shadow: 0 0 15px #ff00ff, 0 0 30px #ff00ff, 0 0 45px #ff00ff;
          }
        }

        @keyframes textShimmer {
          0%, 100% { 
            opacity: 0.7; 
            text-shadow: 0 0 3px #00ffff;
          }
          50% { 
            opacity: 1; 
            text-shadow: 0 0 5px #00ffff, 0 0 8px #00ffff, 0 0 12px #00ffff;
          }
        }

        @keyframes colorRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes logoGlow {
          0% { filter: drop-shadow(0 0 50px #00ffff) drop-shadow(0 0 100px #00ffff) drop-shadow(0 0 150px #00ffff) drop-shadow(0 0 200px #00ffff); }
          100% { filter: drop-shadow(0 0 60px #00ffff) drop-shadow(0 0 120px #00ffff) drop-shadow(0 0 180px #00ffff) drop-shadow(0 0 240px #00ffff); }
        }

        @media (max-width: 768px) {
          .spinning-logo {
            height: 100px;
          }
          
          .stat-card {
            padding: 1.2rem;
            transform: scale(0.7);
          }
          
          .stat-number {
            font-size: 1.8rem;
          }
          
          .role-card {
            padding: 2rem 1.5rem;
          }
          
          .cyber-portal-container {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedLogin; 