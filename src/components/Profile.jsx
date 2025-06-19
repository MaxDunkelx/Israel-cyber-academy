import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { lessons } from '../data/lessons';
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  Target, 
  Award,
  Star,
  Clock,
  CheckCircle,
  Lock,
  KeyRound,
  Home
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cyber-logo.png';

const emojiOptions = ['😀','😎','🤓','🦸‍♂️','🦸‍♀️','🧑‍💻','👩‍🏫','👨‍🏫','🧑‍🎓','👽','🤖','🦄','🐱','🐶','🐼','🐧','🐸'];

const Profile = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedEmoji, setSelectedEmoji] = useState(userProfile?.emoji || '😀');
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState(userProfile?.email || '');
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  // Password reset handler (dummy for guest/demo)
  const handlePasswordReset = (e) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => setShowReset(false), 2000);
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyber-blue to-cyber-purple">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>טוען פרופיל...</p>
        </div>
      </div>
    );
  }

  if (userProfile && userProfile.isGuest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyber-blue to-cyber-purple p-4">
        <img src={logo} alt="Logo" className="h-60 w-60 mb-6 rounded-2xl drop-shadow-2xl border-4 border-cyber-blue" />
        <div className="bg-white rounded-lg p-8 shadow-lg text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-cyber-blue">פרופיל אורח</h1>
          <div className="flex flex-col items-center mb-4">
            <span className="text-6xl mb-2">{selectedEmoji}</span>
            <span className="text-lg font-semibold text-gray-800">{userProfile.displayName}</span>
            <span className="text-sm text-gray-500">{userProfile.role === 'teacher' ? 'מורה (אורח)' : 'תלמיד (אורח)'}</span>
          </div>
          <div className="flex flex-col items-center space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-cyber-blue" />
              <span className="text-gray-700">{userProfile.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <KeyRound className="h-5 w-5 text-cyber-blue" />
              <span className="text-gray-700">סיסמה: <span className="font-mono">none</span></span>
            </div>
          </div>
          <div className="bg-cyber-blue/10 rounded-lg p-3 mb-4">
            <span className="text-cyber-blue font-semibold">עריכת פרופיל אינה זמינה במצב הדגמה (אורח).</span>
          </div>
          <button
            className="mt-2 px-4 py-2 bg-cyber-blue text-white rounded-lg font-semibold hover:bg-cyber-blue/80 transition"
            onClick={() => navigate('/roadmap')}
          >
            חזרה לדף הבית
          </button>
        </div>
      </div>
    );
  }

  const getProgressPercentage = () => {
    const completedLessons = userProfile.completedLessons || [];
    return Math.round((completedLessons.length / lessons.length) * 100);
  };

  const getCompletedLessons = () => {
    return userProfile.completedLessons || [];
  };

  const getCurrentStreak = () => {
    // This would be calculated based on login history
    return 5; // Placeholder
  };

  const getTotalScore = () => {
    const progress = userProfile.progress || {};
    return Object.values(progress).reduce((sum, lesson) => sum + (lesson.score || 0), 0);
  };

  const getAverageScore = () => {
    const completedLessons = getCompletedLessons();
    if (completedLessons.length === 0) return 0;
    
    const progress = userProfile.progress || {};
    const totalScore = completedLessons.reduce((sum, lessonId) => {
      return sum + (progress[lessonId]?.score || 0);
    }, 0);
    
    return Math.round(totalScore / completedLessons.length);
  };

  const getAchievements = () => {
    const achievements = [];
    const completedCount = getCompletedLessons().length;
    
    if (completedCount >= 1) {
      achievements.push({
        id: 1,
        title: 'מתחיל',
        description: 'השלמת שיעור ראשון',
        icon: '🎯',
        unlocked: true
      });
    }
    
    if (completedCount >= 5) {
      achievements.push({
        id: 2,
        title: 'לומד מתמיד',
        description: 'השלמת 5 שיעורים',
        icon: '📚',
        unlocked: true
      });
    }
    
    if (completedCount >= 10) {
      achievements.push({
        id: 3,
        title: 'מומחה מתחיל',
        description: 'השלמת 10 שיעורים',
        icon: '🏆',
        unlocked: true
      });
    }
    
    if (completedCount >= 16) {
      achievements.push({
        id: 4,
        title: 'מומחה סייבר',
        description: 'השלמת את כל השיעורים',
        icon: '👑',
        unlocked: true
      });
    }
    
    if (getAverageScore() >= 90) {
      achievements.push({
        id: 5,
        title: 'מצוינות',
        description: 'ציון ממוצע מעל 90%',
        icon: '⭐',
        unlocked: true
      });
    }
    
    // Add locked achievements
    if (completedCount < 5) {
      achievements.push({
        id: 2,
        title: 'לומד מתמיד',
        description: 'השלמת 5 שיעורים',
        icon: '📚',
        unlocked: false
      });
    }
    
    if (completedCount < 10) {
      achievements.push({
        id: 3,
        title: 'מומחה מתחיל',
        description: 'השלמת 10 שיעורים',
        icon: '🏆',
        unlocked: false
      });
    }
    
    if (completedCount < 16) {
      achievements.push({
        id: 4,
        title: 'מומחה סייבר',
        description: 'השלמת את כל השיעורים',
        icon: '👑',
        unlocked: false
      });
    }
    
    if (getAverageScore() < 90) {
      achievements.push({
        id: 5,
        title: 'מצוינות',
        description: 'ציון ממוצע מעל 90%',
        icon: '⭐',
        unlocked: false
      });
    }
    
    return achievements;
  };

  const tabs = [
    { id: 'overview', label: 'סקירה כללית', icon: User },
    { id: 'progress', label: 'התקדמות', icon: Target },
    { id: 'achievements', label: 'הישגים', icon: Trophy }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Logo at the top */}
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="Logo" className="h-60 w-60 mb-4 rounded-2xl drop-shadow-2xl border-4 border-cyber-blue" />
      </div>
      {/* Emoji selector */}
      <div className="flex flex-col items-center mb-4">
        <div className="text-7xl mb-2 cursor-pointer" title="בחר אייקון">
          {selectedEmoji}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {emojiOptions.map((emoji) => (
            <button
              key={emoji}
              className={`text-2xl p-1 rounded-full border-2 ${selectedEmoji === emoji ? 'border-cyber-blue bg-cyber-blue/10' : 'border-transparent'}`}
              onClick={() => setSelectedEmoji(emoji)}
              aria-label={`בחר ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-500">בחר אייקון לפרופיל שלך</span>
      </div>
      {/* User info */}
      <div className="bg-white rounded-lg p-6 shadow-lg mb-4">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{userProfile.displayName}</h2>
          <div className="flex items-center text-gray-600 mb-2">
            <Mail className="h-5 w-5 ml-2" />
            <span>{userProfile.email}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <User className="h-5 w-5 ml-2" />
            <span>{userProfile.role === 'teacher' ? 'מורה' : userProfile.role === 'student' ? 'תלמיד' : 'אורח'}</span>
          </div>
        </div>
        {/* Password reset */}
        <div className="flex flex-col items-center mt-4">
          <button
            className="btn-secondary flex items-center text-sm mb-2"
            onClick={() => setShowReset(!showReset)}
          >
            <KeyRound className="h-4 w-4 ml-2" />
            איפוס סיסמה
          </button>
          {showReset && (
            <form onSubmit={handlePasswordReset} className="w-full max-w-xs mx-auto mt-2">
              <input
                type="email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                placeholder="האימייל שלך"
                required
              />
              <button type="submit" className="btn-primary w-full">שלח קישור איפוס</button>
              {resetSent && <div className="text-green-600 mt-2">קישור איפוס נשלח!</div>}
            </form>
          )}
        </div>
      </div>
      
      {/* User Info Card */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center space-x-4 space-x-reverse mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {userProfile.displayName?.charAt(0) || '?'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{userProfile.displayName}</h2>
            <p className="text-gray-600">{userProfile.email}</p>
            <p className="text-sm text-gray-500">
              {userProfile.role === 'teacher' ? 'מורה' : 'תלמיד'}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">תאריך הצטרפות</p>
              <p className="font-medium">
                {userProfile.createdAt ? 
                  new Date(userProfile.createdAt.toDate()).toLocaleDateString('he-IL') : 
                  'לא זמין'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">התחברות אחרונה</p>
              <p className="font-medium">
                {userProfile.lastLogin ? 
                  new Date(userProfile.lastLogin.toDate()).toLocaleDateString('he-IL') : 
                  'לא זמין'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Star className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">רצף ימים</p>
              <p className="font-medium">{getCurrentStreak()} ימים</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          className="bg-white rounded-lg p-6 shadow-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Target className="h-8 w-8 text-cyber-blue mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {getProgressPercentage()}%
          </div>
          <div className="text-gray-600">התקדמות כללית</div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-6 shadow-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CheckCircle className="h-8 w-8 text-cyber-green mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {getCompletedLessons().length}
          </div>
          <div className="text-gray-600">שיעורים הושלמו</div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-6 shadow-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Award className="h-8 w-8 text-cyber-purple mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {getAverageScore()}%
          </div>
          <div className="text-gray-600">ציון ממוצע</div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-6 shadow-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Trophy className="h-8 w-8 text-cyber-yellow mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {getTotalScore()}
          </div>
          <div className="text-gray-600">סה"כ נקודות</div>
        </motion.div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6">התקדמות לפי שיעורים</h3>
        
        <div className="space-y-4">
          {lessons.map((lesson) => {
            const isCompleted = getCompletedLessons().includes(lesson.id);
            const isAvailable = lesson.id <= (userProfile.currentLesson || 1);
            const progress = userProfile.progress?.[lesson.id];
            
            return (
              <div key={lesson.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl mr-4">{lesson.icon}</div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">
                      {lesson.id}. {lesson.title}
                    </h4>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-cyber-green" />
                      ) : isAvailable ? (
                        <div className="w-5 h-5 border-2 border-cyber-blue rounded-full"></div>
                      ) : (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{lesson.description}</p>
                    {isCompleted && progress?.score && (
                      <span className="text-sm font-medium text-cyber-green">
                        ציון: {progress.score}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6">הישגים</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getAchievements().map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? 'border-cyber-green bg-cyber-green/5'
                  : 'border-gray-200 bg-gray-50'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <div className={`text-4xl mb-3 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <h4 className={`font-bold mb-2 ${
                  achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {achievement.title}
                </h4>
                <p className={`text-sm ${
                  achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <div className="mt-3">
                    <span className="text-xs bg-cyber-green text-white px-2 py-1 rounded-full">
                      הושג!
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-blue to-cyber-purple p-4">
      <div className="max-w-2xl mx-auto">
        {/* Go back to home button */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => navigate('/roadmap')}
            className="btn-secondary flex items-center"
          >
            <Home className="h-5 w-5 ml-2" />
            חזור למסך הבית
          </button>
        </div>
        {/* Logo at the top */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="h-40 w-40 mb-4 rounded-2xl drop-shadow-2xl border-4 border-cyber-blue" />
        </div>
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center mb-8">
          {/* Round profile emoji */}
          <div className="relative mb-4">
            <span className="text-7xl rounded-full border-4 border-cyber-blue bg-white shadow-lg flex items-center justify-center w-28 h-28 cursor-pointer" title="בחר אייקון">
              {selectedEmoji}
            </span>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  className={`text-xl p-1 rounded-full border-2 ${selectedEmoji === emoji ? 'border-cyber-blue bg-cyber-blue/10' : 'border-transparent'}`}
                  onClick={() => setSelectedEmoji(emoji)}
                  aria-label={`בחר ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-500 block mt-1">בחר אייקון לפרופיל שלך</span>
          </div>
          {/* User info and settings */}
          <div className="w-full max-w-md mx-auto mt-4">
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{userProfile.displayName}</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <Mail className="h-5 w-5 ml-2" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 ml-2" />
                <span>{userProfile.role === 'teacher' ? 'מורה' : userProfile.role === 'student' ? 'תלמיד' : 'אורח'}</span>
              </div>
            </div>
            {/* Settings: Change password */}
            <div className="flex flex-col items-center mt-4">
              <button
                className="btn-secondary flex items-center text-sm mb-2"
                onClick={() => setShowReset(!showReset)}
              >
                <KeyRound className="h-4 w-4 ml-2" />
                שנה/אפס סיסמה
              </button>
              {showReset && (
                <form onSubmit={handlePasswordReset} className="w-full max-w-xs mx-auto mt-2">
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                    placeholder="האימייל שלך"
                    required
                  />
                  <button type="submit" className="btn-primary w-full">שלח קישור איפוס</button>
                  {resetSent && <div className="text-green-600 mt-2">קישור איפוס נשלח!</div>}
                </form>
              )}
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">התקדמות בקורס</h3>
          <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
            <div
              className="bg-gradient-to-r from-cyber-green to-cyber-blue h-6 rounded-full flex items-center justify-end pr-4 text-white font-bold text-lg transition-all duration-700"
              style={{ width: `${getProgressPercentage()}%` }}
            >
              {getProgressPercentage()}%
            </div>
          </div>
          <span className="text-sm text-gray-500">{userProfile.completedLessons?.length || 0} מתוך {lessons.length} שיעורים הושלמו</span>
        </div>
      </div>
    </div>
  );
};

export default Profile; 