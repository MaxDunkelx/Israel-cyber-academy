import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { lessons } from '../data/lessons';
import { 
  Lock, 
  Unlock, 
  CheckCircle, 
  Play, 
  Trophy,
  Clock,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const Roadmap = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState(null);

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-cyber-green" />;
      case 'available':
        return <Play className="h-6 w-6 text-cyber-blue" />;
      case 'locked':
        return <Lock className="h-6 w-6 text-gray-400" />;
      default:
        return <Unlock className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'lesson-completed';
      case 'available':
        return 'lesson-available';
      case 'locked':
        return 'lesson-locked';
      default:
        return 'lesson-locked';
    }
  };

  // Helper to get last slide for resume
  const getLastSlide = (lessonId) => {
    return userProfile?.progress?.[lessonId]?.lastSlide ?? 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-blue to-cyber-purple p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            מסלול הלמידה שלך
          </motion.h1>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center">
                  <Trophy className="h-6 w-6 text-cyber-yellow mr-2" />
                  <span className="text-lg font-semibold">
                    {userProfile?.completedLessons?.length || 0} / {lessons.length} שיעורים הושלמו
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-cyber-purple mr-2" />
                  <span className="text-lg font-semibold">
                    {getProgressPercentage()}% התקדמות
                  </span>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4">
              <motion.div 
                className="bg-gradient-to-r from-cyber-green to-cyber-blue h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
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
                className={`lesson-card cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  isCompleted ? 'lesson-completed' : 
                  isAvailable ? 'lesson-available' : 'lesson-locked'
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
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {lesson.id}. {lesson.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3">
                  {lesson.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {lesson.duration}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lesson.difficulty === 'קל' ? 'bg-green-100 text-green-800' :
                    lesson.difficulty === 'בינוני' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {lesson.difficulty}
                  </span>
                </div>
                
                {isCompleted && (
                  <div className="mt-3 flex items-center text-cyber-green">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">הושלם</span>
                  </div>
                )}
                
                {isAvailable && !isCompleted && (
                  <div className="mt-3 flex items-center text-cyber-blue">
                    <Play className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">זמין</span>
                  </div>
                )}
                
                {status === 'locked' && (
                  <div className="mt-3 flex items-center text-gray-400">
                    <Lock className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">נעול</span>
                  </div>
                )}
                
                {/* Resume Button */}
                {isAvailable && hasProgress && !isCompleted && (
                  <button
                    className="mt-2 w-full btn-primary text-sm font-bold"
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/interactive-lesson/${lesson.id}?slide=${lastSlide}`);
                    }}
                  >
                    המשך שיעור
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="bg-white rounded-lg p-6 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-3xl font-bold text-cyber-blue mb-2">
              {userProfile?.completedLessons?.length || 0}
            </div>
            <div className="text-gray-600">שיעורים הושלמו</div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg p-6 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-3xl font-bold text-cyber-green mb-2">
              {getProgressPercentage()}%
            </div>
            <div className="text-gray-600">אחוז התקדמות</div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg p-6 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-3xl font-bold text-cyber-purple mb-2">
              {lessons.length - (userProfile?.completedLessons?.length || 0)}
            </div>
            <div className="text-gray-600">שיעורים נותרים</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap; 