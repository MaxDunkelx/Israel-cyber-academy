/**
 * Roadmap Component - Israel Cyber Campus Learning Dashboard
 * 
 * Displays the learning roadmap for students with:
 * - Available lessons
 * - Progress tracking
 * - Interactive navigation
 * - Achievement system
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
import { getAllLessons } from '../firebase/content-service';
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
import LiveSessionNotification from './student/LiveSessionNotification';

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
  const { userProfile, currentUser } = useAuth();
  const { displayName, role } = useUserProfile();
  const location = useLocation();
  
  // Component state management
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lastLesson, setLastLesson] = useState(null);
  const [newlyUnlockedLessons, setNewlyUnlockedLessons] = useState(new Set());
  const [previousCompletedLessons, setPreviousCompletedLessons] = useState(new Set());
  const [showUnlock, setShowUnlock] = useState(false);
  const [unlockedLessonId, setUnlockedLessonId] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [refreshedProfile, setRefreshedProfile] = useState(null);

  // Load lessons from Firebase
  useEffect(() => {
    const loadLessons = async () => {
      try {
        const lessonsData = await getAllLessons();
        
        // Filter to only show lessons with clear IDs (lesson1, lesson2, etc.)
        const clearIdLessons = lessonsData?.filter(lesson => 
          lesson.id && lesson.id.startsWith('lesson')
        ) || [];
        
        // Sort lessons by originalId to ensure proper order (1, 2, 3, ..., 19)
        const sortedLessons = clearIdLessons.sort((a, b) => {
          const aId = a.originalId || parseInt(a.id.replace('lesson', '')) || 0;
          const bId = b.originalId || parseInt(b.id.replace('lesson', '')) || 0;
          return aId - bId;
        });
        
        setLessons(sortedLessons);
        console.log('📚 Roadmap: Lessons data loaded and sorted:', {
          lessonsCount: sortedLessons?.length || 0,
          lessons: sortedLessons?.slice(0, 3).map(l => ({ 
            originalId: l.originalId, 
            id: l.id, 
            title: l.title, 
            hasContent: !!l.content, 
            hasSlides: !!l.content?.slides 
          })) || [],
          firstLesson: sortedLessons?.[0] || null,
          order: sortedLessons?.map(l => l.originalId || l.id).join(', ') || 'none'
        });
      } catch (error) {
        console.error('Error loading lessons:', error);
        toast.error('שגיאה בטעינת השיעורים');
      }
    };
    
    loadLessons();
  }, []);

  // Simple refresh of currentLesson from database
  useEffect(() => {
    if (!currentUser || role !== 'student') return;

    const refreshCurrentLesson = async () => {
      try {
        console.log('🔄 Refreshing currentLesson from database...');
        const { doc, getDoc } = await import('firebase/firestore');
        const { db } = await import('../firebase/firebase-config');
        
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const freshUserData = userDoc.data();
          console.log('📥 Fresh user data:', {
            currentLesson: freshUserData.currentLesson,
            displayName: freshUserData.displayName
          });
          setRefreshedProfile(freshUserData);
          
          // Show notification if teacher unlocked new lessons
          if (userProfile && freshUserData.currentLesson > userProfile.currentLesson) {
            const newlyUnlocked = freshUserData.currentLesson - userProfile.currentLesson;
            toast.success(`המורה פתח ${newlyUnlocked} שיעורים חדשים!`);
          }
        } else {
          console.log('❌ User document not found');
        }
      } catch (error) {
        console.error('Error refreshing currentLesson:', error);
      }
    };

    // Refresh immediately and then every 10 seconds
    refreshCurrentLesson();
    const interval = setInterval(refreshCurrentLesson, 10000);
    
    // Also refresh after 1 second to make sure we get fresh data
    const immediateRefresh = setTimeout(refreshCurrentLesson, 1000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(immediateRefresh);
    };
  }, [currentUser, role]); // Removed userProfile dependency to prevent re-running

      // Debug user profile (development only)
    useEffect(() => {
      if (import.meta.env.DEV) {
        console.log('👤 Roadmap: User profile state:', {
          userProfile: userProfile ? {
            displayName: userProfile.displayName,
            role: userProfile.role,
            currentLesson: userProfile.currentLesson,
            completedLessons: userProfile.completedLessons,
            progress: userProfile.progress ? Object.keys(userProfile.progress) : null
          } : null,
          refreshedProfile: refreshedProfile ? {
            currentLesson: refreshedProfile.currentLesson,
            classId: refreshedProfile.classId
          } : null,
          hasUserProfile: !!userProfile,
          profileKeys: userProfile ? Object.keys(userProfile) : []
        });
      }
    }, [userProfile, refreshedProfile]);

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
   * @param {string} lessonId - Firestore ID of the lesson to check
   * @returns {string} Lesson status: 'locked', 'available', or 'completed'
   */
  const getLessonStatus = useCallback((lessonId) => {
    // Always try to get fresh data first, then fall back to cached
    const activeProfile = refreshedProfile || userProfile;
    if (!activeProfile) {
      console.log(`❌ No profile data available for lesson ${lessonId}`);
      return 'locked';
    }
    
    // Find the lesson to get its originalId (lesson number)
    const lesson = lessons?.find(l => l.id === lessonId);
    if (!lesson) {
      console.log(`⚠️ Lesson not found for ID: ${lessonId}`);
      return 'locked';
    }
    
    const lessonNumber = lesson.originalId || parseInt(lessonId);
    const completedLessons = activeProfile.completedLessons || [];
    const teacherAssignedLesson = activeProfile.currentLesson || 0;
    
    // Debug logging for lesson status (development only)
    if (import.meta.env.DEV && lessonNumber <= 3) {
      // Ensure completedLessons is always an array for debug logging
      const completedLessonsArray = Array.isArray(completedLessons) ? completedLessons : [];
      console.log(`🔍 Lesson ${lessonNumber} (${lessonId}) status check:`, {
        completedLessons: completedLessonsArray,
        teacherAssignedLesson,
        isCompleted: completedLessonsArray.includes(lessonId),
        isTeacherUnlocked: lessonNumber <= teacherAssignedLesson,
        status: completedLessonsArray.includes(lessonId) ? 'completed' : 
                lessonNumber <= teacherAssignedLesson ? 'available' : 'locked',
        usingRefreshedProfile: !!refreshedProfile,
        activeProfileSource: refreshedProfile ? 'refreshed' : 'cached',
        completedLessonsLength: completedLessonsArray.length,
        profileDisplayName: activeProfile.displayName
      });
    }
    
    // Check if lesson is completed (either in completedLessons array or progress shows completed)
    // Ensure completedLessons is always an array
    const completedLessonsArray = Array.isArray(completedLessons) ? completedLessons : [];
    
    // Convert lesson number to clear lesson ID for progress checking
    const clearLessonId = `lesson${lessonNumber}`;
    
    const isCompleted = completedLessonsArray.includes(clearLessonId) || 
                       (activeProfile.progress && activeProfile.progress[clearLessonId] && activeProfile.progress[clearLessonId].completed);
    
    if (isCompleted) {
      console.log(`✅ Lesson ${lessonNumber} (${lessonId}) is completed`);
      return 'completed';
    }
    
    // Check if teacher has unlocked this lesson
    if (lessonNumber <= teacherAssignedLesson) {
      console.log(`🔓 Lesson ${lessonNumber} (${lessonId}) is available (teacher unlocked up to lesson ${teacherAssignedLesson})`);
      return 'available';
    }
    
    // Lesson is locked until teacher unlocks it
    console.log(`🔒 Lesson ${lessonNumber} (${lessonId}) is locked (teacher only unlocked up to lesson ${teacherAssignedLesson})`);
    return 'locked';
  }, [userProfile, refreshedProfile, lessons]);

  /**
   * Calculate overall progress percentage
   * 
   * @returns {number} Percentage of completed lessons (0-100)
   */
  const getProgressPercentage = useCallback(() => {
    const activeProfile = refreshedProfile || userProfile;
    if (!activeProfile || !lessons || lessons.length === 0) {
      console.log('❌ Cannot calculate progress percentage - missing data');
      return 0;
    }
    const completedCount = Array.isArray(activeProfile.completedLessons) ? activeProfile.completedLessons.length : 0;
    const percentage = Math.round((completedCount / lessons.length) * 100);
    console.log('📊 getProgressPercentage:', percentage + '%', `(${completedCount}/${lessons.length})`);
    return percentage;
  }, [userProfile, refreshedProfile, lessons]);

  /**
   * Get total time spent from user profile
   * 
   * @returns {number} Total minutes spent learning
   */
  const getTotalTimeSpent = useCallback(() => {
    const activeProfile = refreshedProfile || userProfile;
    if (!activeProfile) {
      console.log('❌ No user profile available for totalTimeSpent');
      return 0;
    }
    const minutes = Math.floor((activeProfile.totalTimeSpent || 0) / 60);
    console.log('📊 getTotalTimeSpent:', minutes, 'from profile:', activeProfile.totalTimeSpent);
    return minutes;
  }, [userProfile, refreshedProfile]);

  /**
   * Get total pages engaged from user profile
   * 
   * @returns {number} Total pages engaged
   */
  const getTotalPagesEngaged = useCallback(() => {
    const activeProfile = refreshedProfile || userProfile;
    if (!activeProfile) {
      console.log('❌ No user profile available for totalPagesEngaged');
      return 0;
    }
    const total = activeProfile.totalPagesEngaged || 0;
    console.log('📊 getTotalPagesEngaged:', total, 'from profile:', activeProfile.totalPagesEngaged);
    return total;
  }, [userProfile, refreshedProfile]);

  /**
   * Get user achievements
   * 
   * @returns {Array} Array of achievement IDs
   */
  const getUserAchievements = useCallback(() => {
    const activeProfile = refreshedProfile || userProfile;
    if (!activeProfile) return [];
    return activeProfile.achievements || [];
  }, [userProfile, refreshedProfile]);

  /**
   * Get completed lessons count
   * 
   * @returns {number} Number of completed lessons
   */
  const getCompletedLessonsCount = useCallback(() => {
    const activeProfile = refreshedProfile || userProfile;
    if (!activeProfile) {
      console.log('❌ No user profile available for completedLessons');
      return 0;
    }
    const count = Array.isArray(activeProfile.completedLessons) ? activeProfile.completedLessons.length : 0;
    console.log('📊 getCompletedLessonsCount:', count, 'from profile:', activeProfile.completedLessons);
    return count;
  }, [userProfile, refreshedProfile]);

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
      navigate(`/student/lesson/${lesson.id}`);
    }
  }, [navigate, getLessonStatus]);

  /**
   * Handle continue last lesson functionality
   * Resumes the most recent incomplete lesson
   */
  const handleContinueLastLesson = useCallback(() => {
    if (lastLesson) {
      // Check if student has access to this lesson (teacher unlocked it)
      const status = getLessonStatus(lastLesson.lesson.id);
      if (status !== 'locked') {
        navigate(`/student/lesson/${lastLesson.lesson.id}`);
        toast.success(`ממשיך בשיעור: ${lastLesson.lesson.title}`);
      } else {
        toast.error('השיעור עדיין לא נפתח על ידי המורה');
      }
    }
  }, [lastLesson, navigate, getLessonStatus]);

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
   * @param {string} lessonId - Lesson Firestore ID
   * @returns {number} Last slide index
   */
  const getLastSlide = useCallback((lessonId) => {
    // Find the lesson to get its originalId (lesson number)
    const lesson = lessons?.find(l => l.id === lessonId);
    if (!lesson) {
      console.log(`⚠️ Lesson not found for ID: ${lessonId}`);
      return 0;
    }
    
    // Convert lesson number to clear lesson ID for progress checking
    const lessonNumber = lesson.originalId || parseInt(lessonId);
    const clearLessonId = `lesson${lessonNumber}`;
    
    // Use clear lesson ID to access progress
    if (!userProfile?.progress?.[clearLessonId]) {
      console.log(`⚠️ No progress found for lesson ${clearLessonId}`);
      return 0;
    }
    
    const lastSlide = userProfile.progress[clearLessonId].lastSlide || 0;
    console.log(`📊 Last slide for lesson ${clearLessonId}: ${lastSlide}`);
    return lastSlide;
  }, [userProfile, lessons]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Live Session Notification */}
      <LiveSessionNotification />
      
      {/* Matrix Code Animation */}
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
        {/* Main Content */}
        <div className="max-w-[78%] mx-auto px-8 py-12">
          {/* Welcome Section */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse"
              style={{
                textShadow: '0 0 30px rgba(16,185,129,0.8), 0 0 60px rgba(34,211,238,0.6), 0 0 90px rgba(59,130,246,0.4)',
                filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.3))'
              }}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              ברוכים הבאים למרכז השליטה
            </motion.h2>
            <motion.p 
              className="text-2xl text-green-400 font-mono"
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
                className="mb-12"
              >
                <button
                  onClick={handleContinueLastLesson}
                  className="group relative bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-white px-12 py-6 rounded-xl font-bold text-xl shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto space-x-4 border border-green-400/30"
                >
                  <div className="absolute inset-0 bg-green-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center space-x-4 space-x-reverse">
                    <Terminal className="w-8 h-8 group-hover:animate-pulse" />
                    <span>המשך שיעור אחרון: {lastLesson.lesson.title}</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <p className="text-green-400 text-lg mt-3 font-mono">
                  {'>'} נעצרת בסלייד {lastLesson.progress.lastSlide + 1}
                </p>
              </motion.div>
            )}
            
            {/* Statistics Dashboard */}
            <motion.div 
              className="bg-black/60 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-green-500/30 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-3xl font-bold text-white mb-8 text-center">סטטיסטיקות מערכת</h3>
              
              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {/* Completed Lessons */}
                <div className="group relative bg-gradient-to-br from-green-900/30 to-cyan-900/30 rounded-2xl border border-green-500/30 p-8 hover:border-green-400/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex flex-col items-center text-center">
                    <Trophy className="h-14 w-14 text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-4xl font-bold text-white mb-3">
                      {getCompletedLessonsCount()}
                    </div>
                    <div className="text-base text-green-400 font-mono">
                      שיעורים הושלמו
                    </div>
                  </div>
                </div>

                {/* Progress Percentage */}
                <div className="group relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/30 p-8 hover:border-purple-400/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex flex-col items-center text-center">
                    <Star className="h-14 w-14 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-4xl font-bold text-white mb-3">
                      {getProgressPercentage()}%
                    </div>
                    <div className="text-base text-purple-400 font-mono">
                      התקדמות
                    </div>
                  </div>
                </div>

                {/* Pages Engaged */}
                <div className="group relative bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl border border-blue-500/30 p-8 hover:border-blue-400/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex flex-col items-center text-center">
                    <Eye className="h-14 w-14 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-4xl font-bold text-white mb-3">
                      {getTotalPagesEngaged()}
                    </div>
                    <div className="text-base text-blue-400 font-mono">
                      עמודים נצפו
                    </div>
                  </div>
                </div>

                {/* Total Time Spent */}
                <div className="group relative bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl border border-orange-500/30 p-8 hover:border-orange-400/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex flex-col items-center text-center">
                    <Timer className="h-14 w-14 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-4xl font-bold text-white mb-3">
                      {getTotalTimeSpent()}
                    </div>
                    <div className="text-base text-orange-400 font-mono">
                      דקות למידה
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-800/50 rounded-full h-6 mb-6 border border-gray-700">
                <div 
                  className="bg-gradient-to-r from-green-500 to-cyan-500 h-6 rounded-full transition-all duration-500 shadow-lg shadow-green-500/25"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              
              <p className="text-center text-green-400 text-base font-mono">
                {'>'} התקדמות כללית: {getProgressPercentage()}% ({getCompletedLessonsCount()} מתוך {lessons?.length || 0} שיעורים)
              </p>
            </motion.div>
          </div>

          {/* Lessons Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
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
              
              // Debug lesson structure (development only)
              if (import.meta.env.DEV && !lesson.totalSlides) {
                console.log(`📊 Lesson ${lesson.id} has ${lesson.totalSlides || 0} slides in database`);
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
                      <div className="flex items-center gap-3">
                        <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm font-mono border border-green-500/30">
                          שיעור {lesson.originalId || lesson.id}
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">
                          {lesson.title || 'שיעור ללא כותרת'}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {lesson.description || 'תיאור לא זמין'}
                      </p>
                      
                      {/* Lesson Details */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-400 font-mono">⏱️ {lesson.timeRange || lesson.duration || 'לא מוגדר'}</span>
                        <span className="text-cyan-400 font-mono">🎯 {lesson.difficulty || 'לא מוגדר'}</span>
                      </div>

                      {/* Progress Indicator for Available/Completed Lessons */}
                      {(status === 'available' || status === 'completed') && (
                        <div className="mt-6">
                          <div className="flex justify-between text-sm text-gray-300 mb-2">
                            <span className="font-mono">התקדמות</span>
                            <span className="font-mono">{lastSlide + 1} / {lesson.totalSlides || 0}</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-3 border border-gray-700">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 shadow-lg ${
                                status === 'completed' 
                                  ? 'bg-gradient-to-r from-green-500 to-green-400 shadow-green-500/25' 
                                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/25'
                              }`}
                              style={{ 
                                width: `${status === 'completed' ? 100 : ((lastSlide + 1) / (lesson.totalSlides || 1)) * 100}%` 
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