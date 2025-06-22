/**
 * Roadmap Component - Israel Cyber Academy Learning Dashboard
 * 
 * This is the main learning dashboard that displays all available lessons
 * and tracks user progress through the cyber security curriculum.
 * 
 * Key Features:
 * - Visual lesson roadmap with progress indicators
 * - Lesson status tracking (locked, available, completed)
 * - Progress statistics and analytics
 * - Resume functionality for incomplete lessons
 * - Responsive design with Hebrew RTL support
 * - Cyberpunk/hacking aesthetic with Matrix-style animations
 * 
 * Component Flow:
 * 1. Load user progress and lesson data
 * 2. Calculate lesson availability based on completion
 * 3. Display lessons with appropriate status indicators
 * 4. Handle lesson navigation and progress updates
 * 5. Show progress statistics and achievements
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useAuth';
import { lessons } from '../data/lessons';
import { 
  Lock, 
  Unlock, 
  CheckCircle, 
  Play, 
  Trophy,
  Clock,
  Star,
  BookOpen,
  ArrowRight,
  Sparkles,
  Timer,
  Shield,
  Cpu,
  Globe,
  Code,
  Database,
  Network,
  Terminal,
  Zap,
  Target,
  Eye,
  Brain,
  Fingerprint,
  Key,
  Search,
  Monitor,
  Smartphone,
  Server,
  Wifi,
  ShieldCheck,
  Bug,
  LockKeyhole,
  UnlockKeyhole
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import cyberLogo from '../assets/cyber-logo.png';
import Confetti from 'react-confetti';

/**
 * Matrix Code Animation Component
 */
const MatrixCode = () => {
  const [codeLines, setCodeLines] = useState([]);

  useEffect(() => {
    const generateCodeLine = () => {
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const length = Math.floor(Math.random() * 20) + 10;
      let line = '';
      for (let i = 0; i < length; i++) {
        line += chars[Math.floor(Math.random() * chars.length)];
      }
      return line;
    };

    const interval = setInterval(() => {
      setCodeLines(prev => {
        const newLines = [...prev, generateCodeLine()];
        if (newLines.length > 15) {
          return newLines.slice(1);
        }
        return newLines;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent" />
      {codeLines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.3, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 2, ease: "linear" }}
          className="absolute text-green-400 font-mono text-xs whitespace-nowrap"
          style={{
            top: `${(index / 15) * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `translateX(${Math.random() * 200 - 100}px)`
          }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Get lesson icon based on lesson ID
 */
const getLessonIcon = (lessonId) => {
  const iconMap = {
    1: Shield,
    2: Cpu,
    3: Monitor,
    4: Terminal,
    5: Network,
    6: Code,
    7: Globe,
    8: Smartphone,
    9: Eye,
    10: Key,
    11: Database,
    12: Search,
    13: Brain,
    14: Server,
    15: Bug,
    16: Zap,
    17: Code,
    18: ShieldCheck
  };
  
  return iconMap[lessonId] || Shield;
};

/**
 * Roadmap Component - Main learning dashboard with lesson overview and progress tracking
 */
const Roadmap = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { displayName, role } = useUserProfile();
  const location = useLocation();
  
  // Component state management
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lastLesson, setLastLesson] = useState(null);
  const [newlyUnlockedLessons, setNewlyUnlockedLessons] = useState(new Set());
  const [previousCompletedLessons, setPreviousCompletedLessons] = useState(new Set());
  const [showUnlock, setShowUnlock] = useState(false);
  const [unlockedLessonId, setUnlockedLessonId] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Debug lessons data
  useEffect(() => {
    console.log('📚 Roadmap: Lessons data loaded:', {
      lessonsCount: lessons?.length || 0,
      lessons: lessons?.slice(0, 3).map(l => ({ id: l.id, title: l.title, hasContent: !!l.content, hasSlides: !!l.content?.slides })) || [],
      firstLesson: lessons?.[0] || null
    });
  }, []);

  /**
   * Find the last lesson with progress for resume functionality
   * Analyzes user progress to determine the most recent incomplete lesson
   */
  useEffect(() => {
    if (userProfile?.progress) {
      const progressEntries = Object.entries(userProfile.progress);
      if (progressEntries.length > 0) {
        // Sort by last activity and find the most recent
        const sortedEntries = progressEntries
          .filter(([_, progress]) => progress.lastActivity)
          .sort((a, b) => new Date(b[1].lastActivity) - new Date(a[1].lastActivity));
        
        if (sortedEntries.length > 0) {
          const [lessonId, progress] = sortedEntries[0];
          const lesson = lessons.find(l => l.id === parseInt(lessonId));
          if (lesson && !progress.completed) {
            setLastLesson({ lesson, progress });
          }
        }
      }
    }
  }, [userProfile]);

  /**
   * Determine lesson status based on user progress
   * 
   * @param {number} lessonId - ID of the lesson to check
   * @returns {string} Lesson status: 'locked', 'available', or 'completed'
   */
  const getLessonStatus = useCallback((lessonId) => {
    if (!userProfile) return 'locked';
    
    const completedLessons = userProfile.completedLessons || [];
    const currentLesson = userProfile.currentLesson || 1;
    
    // Debug logging for lesson status
    if (lessonId <= 3) { // Only log for first 3 lessons to avoid spam
      console.log(`🔍 Lesson ${lessonId} status check:`, {
        completedLessons,
        currentLesson,
        isCompleted: completedLessons.includes(lessonId),
        isAvailable: lessonId <= currentLesson,
        status: completedLessons.includes(lessonId) ? 'completed' : 
                lessonId <= currentLesson ? 'available' : 'locked'
      });
    }
    
    // First lesson should always be available for new users
    if (lessonId === 1) {
      return completedLessons.includes(lessonId) ? 'completed' : 'available';
    }
    
    if (completedLessons.includes(lessonId)) {
      return 'completed';
    } else if (lessonId <= currentLesson) {
      return 'available';
    } else {
      return 'locked';
    }
  }, [userProfile]);

  /**
   * Calculate overall progress percentage
   * 
   * @returns {number} Percentage of completed lessons (0-100)
   */
  const getProgressPercentage = useCallback(() => {
    if (!userProfile || !lessons || !Array.isArray(lessons) || lessons.length === 0) return 0;
    const completedLessons = userProfile.completedLessons || [];
    return Math.round((completedLessons.length / lessons.length) * 100);
  }, [userProfile]);

  /**
   * Get total time spent from user profile
   * 
   * @returns {number} Total minutes spent learning
   */
  const getTotalTimeSpent = useCallback(() => {
    if (!userProfile) return 0;
    return userProfile.totalTimeSpent || 0;
  }, [userProfile]);

  /**
   * Get total pages engaged from user profile
   * 
   * @returns {number} Total pages engaged
   */
  const getTotalPagesEngaged = useCallback(() => {
    if (!userProfile) return 0;
    return userProfile.totalPagesEngaged || 0;
  }, [userProfile]);

  /**
   * Get user achievements
   * 
   * @returns {Array} Array of achievement IDs
   */
  const getUserAchievements = useCallback(() => {
    if (!userProfile) return [];
    return userProfile.achievements || [];
  }, [userProfile]);

  /**
   * Handle lesson click navigation
   * Navigates to interactive lesson if lesson is available
   * 
   * @param {Object} lesson - Lesson object to navigate to
   */
  const handleLessonClick = useCallback((lesson) => {
    if (!lesson || !lesson.id) {
      console.error('❌ Invalid lesson object:', lesson);
      return;
    }
    const status = getLessonStatus(lesson.id);
    if (status !== 'locked') {
      navigate(`/interactive-lesson/${lesson.id}`);
    }
  }, [navigate, getLessonStatus]);

  /**
   * Handle continue last lesson functionality
   * Resumes the most recent incomplete lesson
   */
  const handleContinueLastLesson = useCallback(() => {
    if (lastLesson) {
      navigate(`/interactive-lesson/${lastLesson.lesson.id}`);
      toast.success(`ממשיך בשיעור: ${lastLesson.lesson.title}`);
    }
  }, [lastLesson, navigate]);

  /**
   * Get appropriate icon for lesson status
   * 
   * @param {string} status - Lesson status
   * @returns {JSX.Element} Status icon component
   */
  const getStatusIcon = useCallback((status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'available':
        return <UnlockKeyhole className="h-6 w-6 text-blue-500" />;
      case 'locked':
        return <LockKeyhole className="h-6 w-6 text-gray-400" />;
      default:
        return <Unlock className="h-6 w-6 text-gray-400" />;
    }
  }, []);

  /**
   * Get last slide for a lesson
   * 
   * @param {number} lessonId - Lesson ID
   * @returns {number} Last slide index
   */
  const getLastSlide = useCallback((lessonId) => {
    if (!userProfile?.progress?.[lessonId]) return 0;
    return userProfile.progress[lessonId].lastSlide || 0;
  }, [userProfile]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Matrix Code Animation Background */}
      <MatrixCode />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Confetti for achievements */}
      {showUnlock && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#00ff00', '#00ffff', '#ff00ff', '#ffff00', '#ff0000', '#0000ff']}
        />
      )}

      <div className="relative z-10">
        {/* Header with improved home button positioning */}
        <header className="bg-black/80 backdrop-blur-xl border-b border-green-500/30 p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative">
                <img src={cyberLogo} alt="Cyber Logo" className="w-16 h-16 animate-pulse" />
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  Israel Cyber Campus
                </h1>
                <p className="text-green-400 text-sm font-mono">Terminal v2.0.1</p>
              </div>
            </div>

            {/* Home Button - Centered and styled */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => navigate('/')}
                className="group relative bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 border border-green-400/30"
              >
                <div className="absolute inset-0 bg-green-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center space-x-2 space-x-reverse">
                  <Terminal className="w-5 h-5" />
                  <span>בית</span>
                </span>
              </button>
              
              {/* User Info */}
              <div className="text-right">
                <p className="text-white font-semibold">{displayName || 'משתמש'}</p>
                <p className="text-green-400 text-sm font-mono">{role === 'teacher' ? 'ADMIN' : 'USER'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              ברוכים הבאים למרכז השליטה
            </motion.h2>
            <motion.p 
              className="text-xl text-green-400 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {'>'} המשך את מסע הלמידה שלך בעולם הסייבר
            </motion.p>

            {/* Continue Last Lesson Button */}
            {lastLesson && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8"
              >
                <button
                  onClick={handleContinueLastLesson}
                  className="group relative bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto space-x-3 border border-green-400/30"
                >
                  <div className="absolute inset-0 bg-green-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center space-x-3 space-x-reverse">
                    <Terminal className="w-6 h-6 group-hover:animate-pulse" />
                    <span>המשך שיעור אחרון: {lastLesson.lesson.title}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <p className="text-green-400 text-sm mt-2 font-mono">
                  {'>'} נעצרת בסלייד {lastLesson.progress.lastSlide + 1}
                </p>
              </motion.div>
            )}
            
            {/* Statistics Dashboard */}
            <motion.div 
              className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-green-500/30 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">סטטיסטיקות מערכת</h3>
              
              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Completed Lessons */}
                <div className="group relative bg-gradient-to-br from-green-900/30 to-cyan-900/30 rounded-xl border border-green-500/30 p-6 hover:border-green-400/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-green-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex flex-col items-center text-center">
                    <Trophy className="h-10 w-10 text-yellow-500 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-white mb-2">
                      {userProfile?.completedLessons?.length || 0}
                    </div>
                    <div className="text-sm text-green-400 font-mono">
                      שיעורים הושלמו
                    </div>
                  </div>
                </div>

                {/* Progress Percentage */}
                <div className="group relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30 p-6 hover:border-purple-400/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex flex-col items-center text-center">
                    <Star className="h-10 w-10 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-white mb-2">
                      {getProgressPercentage()}%
                    </div>
                    <div className="text-sm text-purple-400 font-mono">
                      התקדמות
                    </div>
                  </div>
                </div>

                {/* Pages Engaged */}
                <div className="group relative bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl border border-blue-500/30 p-6 hover:border-blue-400/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex flex-col items-center text-center">
                    <Eye className="h-10 w-10 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-white mb-2">
                      {getTotalPagesEngaged()}
                    </div>
                    <div className="text-sm text-blue-400 font-mono">
                      עמודים נצפו
                    </div>
                  </div>
                </div>

                {/* Total Time Spent */}
                <div className="group relative bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-xl border border-orange-500/30 p-6 hover:border-orange-400/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex flex-col items-center text-center">
                    <Timer className="h-10 w-10 text-orange-400 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-white mb-2">
                      {getTotalTimeSpent()}
                    </div>
                    <div className="text-sm text-orange-400 font-mono">
                      דקות למידה
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-800/50 rounded-full h-4 mb-4 border border-gray-700">
                <div 
                  className="bg-gradient-to-r from-green-500 to-cyan-500 h-4 rounded-full transition-all duration-500 shadow-lg shadow-green-500/25"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              
              <p className="text-center text-green-400 text-sm font-mono">
                {'>'} התקדמות כללית: {getProgressPercentage()}% ({userProfile?.completedLessons?.length || 0} מתוך {lessons?.length || 0} שיעורים)
              </p>
            </motion.div>
          </div>

          {/* Lessons Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {lessons && Array.isArray(lessons) && lessons.length > 0 ? lessons.map((lesson, index) => {
              // Add null checks and debugging
              if (!lesson || !lesson.id) {
                console.warn('⚠️ Invalid lesson data:', lesson);
                return null;
              }
              
              const status = getLessonStatus(lesson.id);
              const isNewlyUnlocked = newlyUnlockedLessons.has(lesson.id);
              const lastSlide = getLastSlide(lesson.id);
              const LessonIcon = getLessonIcon(lesson.id);
              
              // Debug lesson structure
              if (!lesson.content || !lesson.content.slides) {
                console.warn('⚠️ Lesson missing content or slides:', lesson.id, lesson);
              }
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                    isNewlyUnlocked ? 'animate-pulse' : ''
                  }`}
                  onClick={() => handleLessonClick(lesson)}
                >
                  {/* Lesson Card */}
                  <div className={`relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-8 border-2 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/25 ${
                    status === 'completed' 
                      ? 'border-green-500 bg-green-900/20 hover:border-green-400' 
                      : status === 'available' 
                      ? 'border-cyan-500 bg-cyan-900/20 hover:border-cyan-400' 
                      : 'border-gray-600 bg-gray-900/20 hover:border-gray-500'
                  }`}>
                    
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      status === 'completed' 
                        ? 'bg-green-500/10' 
                        : status === 'available' 
                        ? 'bg-cyan-500/10' 
                        : 'bg-gray-500/10'
                    }`} />
                    
                    {/* Status Icon */}
                    <div className="relative flex justify-between items-start mb-6">
                      <div className={`p-4 rounded-xl ${
                        status === 'completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : status === 'available' 
                          ? 'bg-cyan-500/20 text-cyan-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        <LessonIcon className="h-8 w-8" />
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(status)}
                        {isNewlyUnlocked && (
                          <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Lesson Info */}
                    <div className="relative space-y-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">
                        {lesson.title || 'שיעור ללא כותרת'}
                      </h3>
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {lesson.description || 'תיאור לא זמין'}
                      </p>
                      
                      {/* Lesson Details */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-400 font-mono">⏱️ {lesson.duration || 'לא מוגדר'}</span>
                        <span className="text-cyan-400 font-mono">🎯 {lesson.difficulty || 'לא מוגדר'}</span>
                      </div>

                      {/* Progress Indicator for Available/Completed Lessons */}
                      {(status === 'available' || status === 'completed') && (
                        <div className="mt-6">
                          <div className="flex justify-between text-sm text-gray-300 mb-2">
                            <span className="font-mono">התקדמות</span>
                            <span className="font-mono">{lastSlide + 1} / {lesson.content?.slides?.length || 0}</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-3 border border-gray-700">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 shadow-lg ${
                                status === 'completed' 
                                  ? 'bg-gradient-to-r from-green-500 to-green-400 shadow-green-500/25' 
                                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/25'
                              }`}
                              style={{ 
                                width: `${status === 'completed' ? 100 : ((lastSlide + 1) / (lesson.content?.slides?.length || 1)) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="mt-6">
                        {status === 'completed' ? (
                          <div className="flex items-center justify-center space-x-2 text-green-400 bg-green-500/10 rounded-lg py-3 border border-green-500/30">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-medium font-mono">הושלם</span>
                          </div>
                        ) : status === 'available' ? (
                          <div className="flex items-center justify-center space-x-2 text-cyan-400 bg-cyan-500/10 rounded-lg py-3 border border-cyan-500/30 group-hover:bg-cyan-500/20 transition-colors">
                            <Play className="h-5 w-5" />
                            <span className="font-medium font-mono">
                              {lastSlide > 0 ? 'המשך' : 'התחל'}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2 text-gray-400 bg-gray-500/10 rounded-lg py-3 border border-gray-500/30">
                            <LockKeyhole className="h-5 w-5" />
                            <span className="font-medium font-mono">נעול</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Unlock Animation Overlay */}
                  {isNewlyUnlocked && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl border-2 border-yellow-400 animate-pulse" />
                  )}
                </motion.div>
              );
            }) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 text-xl mb-4 font-mono">אין שיעורים זמינים</div>
                <div className="text-gray-500 text-sm font-mono">
                  {!lessons ? 'טוען שיעורים...' : 'לא נמצאו שיעורים במערכת'}
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Footer */}
        <footer className="bg-black/80 border-t border-green-500/30 py-8 mt-12 flex flex-col items-center">
          <div className="relative">
            <img src={cyberLogo} alt="Cyber Logo" className="w-32 h-32 mb-4 opacity-80 hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping" />
          </div>
          <p className="text-green-400 text-sm font-mono">© 2024 Israel Cyber Campus. כל הזכויות שמורות.</p>
          <p className="text-gray-500 text-xs font-mono mt-2">Terminal v2.0.1 | Matrix Protocol Active</p>
        </footer>
      </div>
    </div>
  );
};

export default Roadmap; 