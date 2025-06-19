import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/**
 * Roadmap Component - Main learning dashboard with lesson overview and progress tracking
 */
const Roadmap = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { displayName, role, isGuest } = useUserProfile();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lastLesson, setLastLesson] = useState(null);

  // Find the last lesson with progress
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

  const getLessonStatus = (lessonId) => {
    if (!userProfile) return 'locked';
    
    const completedLessons = userProfile.completedLessons || [];
    const currentLesson = userProfile.currentLesson || 1;
    
    if (completedLessons.includes(lessonId)) {
      return 'completed';
    } else if (lessonId <= currentLesson) {
      return 'available';
    } else {
      return 'locked';
    }
  };

  const getProgressPercentage = () => {
    if (!userProfile) return 0;
    const completedLessons = userProfile.completedLessons || [];
    return Math.round((completedLessons.length / lessons.length) * 100);
  };

  const handleLessonClick = (lesson) => {
    const status = getLessonStatus(lesson.id);
    if (status !== 'locked') {
      navigate(`/interactive-lesson/${lesson.id}`);
    }
  };

  const handleContinueLastLesson = () => {
    if (lastLesson) {
      navigate(`/interactive-lesson/${lastLesson.lesson.id}`);
      toast.success(`ממשיך בשיעור: ${lastLesson.lesson.title}`);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'available':
        return <Play className="h-6 w-6 text-blue-500" />;
      case 'locked':
        return <Lock className="h-6 w-6 text-gray-400" />;
      default:
        return <Unlock className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'available':
        return 'border-yellow-500 bg-yellow-50';
      case 'locked':
        return 'border-gray-300 bg-gray-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  // Helper to get last slide for resume
  const getLastSlide = (lessonId) => {
    return userProfile?.progress?.[lessonId]?.lastSlide ?? 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ברוך הבא, {displayName}! 👋
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isGuest ? 'מצב אורח - נסה את המערכת' : 'המשך את מסע הלמידה שלך בעולם הסייבר'}
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
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto space-x-3"
              >
                <BookOpen className="w-6 h-6 group-hover:animate-pulse" />
                <span>המשך שיעור אחרון: {lastLesson.lesson.title}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-gray-400 text-sm mt-2">
                נעצרת בסלייד {lastLesson.progress.currentSlide + 1}
              </p>
            </motion.div>
          )}
          
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                  <span className="text-lg font-semibold text-white">
                    {userProfile?.completedLessons?.length || 0} / {lessons.length} שיעורים הושלמו
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-purple-400 mr-2" />
                  <span className="text-lg font-semibold text-white">
                    {getProgressPercentage()}% התקדמות
                  </span>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lessons.map((lesson, index) => {
            const status = getLessonStatus(lesson.id);
            const isCompleted = status === 'completed';
            const isAvailable = status === 'available';
            const hasProgress = !!userProfile?.progress?.[lesson.id];
            const lastSlide = getLastSlide(lesson.id);
            
            return (
              <motion.div
                key={lesson.id}
                className={`bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isCompleted ? 'border-green-500/50 bg-green-900/20' : 
                  isAvailable ? 'border-yellow-500/50 bg-yellow-900/20' : 
                  'border-gray-600 bg-gray-800/30'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleLessonClick(lesson)}
                onMouseEnter={() => setSelectedLesson(lesson.id)}
                onMouseLeave={() => setSelectedLesson(null)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{lesson.icon}</div>
                  {getStatusIcon(status)}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">
                  {lesson.id}. {lesson.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-3">
                  {lesson.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {lesson.duration}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lesson.difficulty === 'קל' ? 'bg-green-900/50 text-green-300 border border-green-500/30' :
                    lesson.difficulty === 'בינוני' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30' :
                    'bg-red-900/50 text-red-300 border border-red-500/30'
                  }`}>
                    {lesson.difficulty}
                  </span>
                </div>
                
                {isCompleted && (
                  <div className="mt-3 flex items-center text-green-400">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">הושלם</span>
                  </div>
                )}
                
                {isAvailable && !isCompleted && (
                  <div className="mt-3 flex items-center text-blue-400">
                    <Play className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">זמין</span>
                  </div>
                )}
                
                {status === 'locked' && (
                  <div className="mt-3 flex items-center text-gray-500">
                    <Lock className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">נעול</span>
                  </div>
                )}
                
                {/* Resume Button */}
                {isAvailable && hasProgress && !isCompleted && (
                  <button
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2"
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/interactive-lesson/${lesson.id}`);
                    }}
                  >
                    <Play className="w-4 h-4" />
                    <span>המשך מסלייד {lastSlide + 1}</span>
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Roadmap; 