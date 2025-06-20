import { useState, useEffect } from 'react';
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
  Home,
  Edit,
  Save,
  X,
  Users,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cyber-logo.png';
import { toast } from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { updateProfile } from 'firebase/auth';

const emojiOptions = ['😀','😎','🤓','🦸‍♂️','🦸‍♀️','🧑‍💻','👩‍🏫','👨‍🏫','🧑‍🎓','👽','🤖','🦄','🐱','🐶','🐼','🐧','🐸'];

const Profile = () => {
  const { userProfile, logout, currentUser, updateDisplayName } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedEmoji, setSelectedEmoji] = useState(userProfile?.emoji || '😀');
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState(userProfile?.email || '');
  const [resetSent, setResetSent] = useState(false);
  
  // Display name editing state
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState(userProfile?.displayName || '');
  const [isSavingName, setIsSavingName] = useState(false);
  
  // User credentials editing state with defaults
  const [isEditingCredentials, setIsEditingCredentials] = useState(false);
  const [editingCredentials, setEditingCredentials] = useState({
    firstName: userProfile?.firstName || '',
    lastName: userProfile?.lastName || '',
    age: userProfile?.age || '',
    sex: userProfile?.sex || 'male'
  });
  const [isSavingCredentials, setIsSavingCredentials] = useState(false);
  
  const navigate = useNavigate();

  // Get default values for user credentials
  const getDefaultCredentials = () => {
    return {
      firstName: userProfile?.firstName || '',
      lastName: userProfile?.lastName || '',
      age: userProfile?.age || '',
      sex: userProfile?.sex || 'male'
    };
  };

  // Get display value for credentials with defaults
  const getDisplayValue = (field, defaultValue = 'לא הוזן') => {
    const value = userProfile?.[field];
    if (field === 'age' && value) {
      return `${value} שנים`;
    } else if (field === 'sex') {
      if (value === 'female') return 'נקבה';
      if (value === 'male') return 'זכר';
      return defaultValue;
    } else if (field === 'firstName' || field === 'lastName') {
      return value || defaultValue;
    } else if (field === 'fullName') {
      const firstName = userProfile?.firstName || '';
      const lastName = userProfile?.lastName || '';
      return firstName && lastName ? `${firstName} ${lastName}` : defaultValue;
    }
    return value || defaultValue;
  };

  // Update editing state when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setEditingCredentials(getDefaultCredentials());
      setEditingName(userProfile.displayName || '');
      setSelectedEmoji(userProfile.emoji || '😀');
      setResetEmail(userProfile.email || '');
    }
  }, [userProfile]);

  // Handle display name update
  const handleUpdateDisplayName = async () => {
    if (!currentUser || !editingName.trim()) {
      toast.error('שם התצוגה לא יכול להיות ריק');
      return;
    }

    if (editingName.trim() === userProfile?.displayName) {
      setIsEditingName(false);
      return;
    }

    setIsSavingName(true);
    try {
      // Use the context function to update display name
      await updateDisplayName(editingName.trim());
      
      toast.success('שם התצוגה עודכן בהצלחה');
      setIsEditingName(false);
    } catch (error) {
      console.error('Error updating display name:', error);
      toast.error('אירעה שגיאה בעדכון שם התצוגה');
    } finally {
      setIsSavingName(false);
    }
  };

  // Handle user credentials update
  const handleUpdateCredentials = async () => {
    if (!currentUser) {
      toast.error('אירעה שגיאה בעדכון הפרטים');
      return;
    }

    if (!editingCredentials.firstName.trim() || !editingCredentials.lastName.trim()) {
      toast.error('שם פרטי ושם משפחה הם שדות חובה');
      return;
    }

    if (!editingCredentials.age || editingCredentials.age < 1 || editingCredentials.age > 120) {
      toast.error('גיל חייב להיות בין 1 ל-120');
      return;
    }

    setIsSavingCredentials(true);
    try {
      // Update Firestore profile with new credentials
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, { 
        firstName: editingCredentials.firstName.trim(),
        lastName: editingCredentials.lastName.trim(),
        age: parseInt(editingCredentials.age),
        sex: editingCredentials.sex,
        lastActivityDate: new Date()
      }, { merge: true });
      
      toast.success('פרטי המשתמש עודכנו בהצלחה');
      setIsEditingCredentials(false);
      
      // Force a page refresh to update the context
      window.location.reload();
    } catch (error) {
      console.error('Error updating credentials:', error);
      toast.error('אירעה שגיאה בעדכון פרטי המשתמש');
    } finally {
      setIsSavingCredentials(false);
    }
  };

  // Cancel display name editing
  const handleCancelNameEdit = () => {
    setEditingName(userProfile?.displayName || '');
    setIsEditingName(false);
  };

  // Cancel credentials editing
  const handleCancelCredentialsEdit = () => {
    setEditingCredentials(getDefaultCredentials());
    setIsEditingCredentials(false);
  };

  // Get current display name or default
  const getCurrentDisplayName = () => {
    if (userProfile?.displayName && userProfile.displayName !== 'משתמש חדש') {
      return userProfile.displayName;
    }
    const sex = userProfile?.sex || 'male';
    return sex === 'female' ? 'לוחמת סייבר' : 'לוחם סייבר';
  };

  // Password reset handler
  const handlePasswordReset = () => {
    toast.success('פונקציה זו תהיה זמינה בקרוב');
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('התנתקת בהצלחה');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('אירעה שגיאה בהתנתקות');
    }
  };

  // Get statistics from userProfile - synchronized with other components
  const getStatistics = () => {
    if (!userProfile) return {};
    
    return {
      completedLessons: userProfile.completedLessons?.length || 0,
      totalLessons: lessons.length,
      progressPercentage: Math.round(((userProfile.completedLessons?.length || 0) / lessons.length) * 100),
      totalTimeSpent: userProfile.totalTimeSpent || 0,
      totalPagesEngaged: userProfile.totalPagesEngaged || 0,
      achievements: userProfile.achievements?.length || 0,
      streak: userProfile.streak || 0,
      lastActivity: userProfile.lastActivityDate || userProfile.createdAt
    };
  };

  // Get progress percentage - synchronized with Roadmap
  const getProgressPercentage = () => {
    if (!userProfile) return 0;
    const completedLessons = userProfile.completedLessons || [];
    return Math.round((completedLessons.length / lessons.length) * 100);
  };

  // Get completed lessons count - synchronized with Roadmap
  const getCompletedLessons = () => {
    if (!userProfile) return 0;
    return userProfile.completedLessons?.length || 0;
  };

  // Get current streak - synchronized with userProfile
  const getCurrentStreak = () => {
    if (!userProfile) return 0;
    return userProfile.streak || 0;
  };

  // Get total score - synchronized with userProfile
  const getTotalScore = () => {
    if (!userProfile) return 0;
    let totalScore = 0;
    if (userProfile.progress) {
      Object.values(userProfile.progress).forEach(lessonProgress => {
        if (lessonProgress.score) {
          totalScore += lessonProgress.score;
        }
      });
    }
    return totalScore;
  };

  // Get average score - synchronized with userProfile
  const getAverageScore = () => {
    if (!userProfile) return 0;
    const completedLessons = userProfile.completedLessons || [];
    if (completedLessons.length === 0) return 0;
    
    let totalScore = 0;
    let scoredLessons = 0;
    
    if (userProfile.progress) {
      Object.values(userProfile.progress).forEach(lessonProgress => {
        if (lessonProgress.score && lessonProgress.completed) {
          totalScore += lessonProgress.score;
          scoredLessons++;
        }
      });
    }
    
    return scoredLessons > 0 ? Math.round(totalScore / scoredLessons) : 0;
  };

  // Get achievements - synchronized with userProfile
  const getAchievements = () => {
    if (!userProfile) return [];
    
    const userAchievements = userProfile.achievements || [];
    const allAchievements = [
      {
        id: 'first_lesson',
        title: 'שיעור ראשון',
        description: 'השלמת את השיעור הראשון שלך',
        icon: '🎯',
        color: 'from-green-500 to-emerald-500',
        unlocked: userAchievements.includes('first_lesson')
      },
      {
        id: 'three_lessons',
        title: 'לומד מתמיד',
        description: 'השלמת 3 שיעורים',
        icon: '📚',
        color: 'from-blue-500 to-cyan-500',
        unlocked: userAchievements.includes('three_lessons')
      },
      {
        id: 'one_hour',
        title: 'שעת למידה',
        description: 'למדת במשך שעה שלמה',
        icon: '⏰',
        color: 'from-purple-500 to-pink-500',
        unlocked: userAchievements.includes('one_hour')
      },
      {
        id: 'perfect_score',
        title: 'ציון מושלם',
        description: 'השגת ציון מושלם בשיעור',
        icon: '🏆',
        color: 'from-yellow-500 to-orange-500',
        unlocked: userAchievements.includes('perfect_score')
      },
      {
        id: 'streak_7',
        title: 'שבוע של למידה',
        description: 'למדת 7 ימים ברציפות',
        icon: '🔥',
        color: 'from-red-500 to-pink-500',
        unlocked: userAchievements.includes('streak_7')
      },
      {
        id: 'all_lessons',
        title: 'מומחה סייבר',
        description: 'השלמת את כל השיעורים',
        icon: '👑',
        color: 'from-indigo-500 to-purple-500',
        unlocked: userAchievements.includes('all_lessons')
      }
    ];
    
    return allAchievements;
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

  const renderOverview = () => (
    <div className="space-y-6">
      {/* User Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700"
      >
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center text-3xl">
              {selectedEmoji}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 space-x-reverse">
              {isEditingName ? (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="text-2xl font-bold text-white bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                    placeholder="שם התצוגה"
                    maxLength={50}
                  />
                  <button
                    onClick={handleUpdateDisplayName}
                    disabled={isSavingName}
                    className="p-1 text-green-400 hover:text-green-300 disabled:opacity-50"
                    title="שמור"
                  >
                    <Save className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleCancelNameEdit}
                    disabled={isSavingName}
                    className="p-1 text-red-400 hover:text-red-300 disabled:opacity-50"
                    title="בטל"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <h2 className="text-2xl font-bold text-white">{getCurrentDisplayName()}</h2>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="p-1 text-gray-400 hover:text-gray-300"
                    title="ערוך שם תצוגה"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-300">{userProfile.email}</p>
            <div className="flex items-center mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30">
                {userProfile.role === 'teacher' ? 'מורה' : 'תלמיד'}
              </span>
            </div>
          </div>
        </div>

        {/* User Credentials Section */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Users className="h-5 w-5 mr-2" />
              פרטי משתמש
            </h3>
            {!isEditingCredentials && (
              <button
                onClick={() => setIsEditingCredentials(true)}
                className="p-1 text-gray-400 hover:text-gray-300"
                title="ערוך פרטי משתמש"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>

          {isEditingCredentials ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">שם פרטי</label>
                  <input
                    type="text"
                    value={editingCredentials.firstName}
                    onChange={(e) => setEditingCredentials(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                    placeholder="שם פרטי"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">שם משפחה</label>
                  <input
                    type="text"
                    value={editingCredentials.lastName}
                    onChange={(e) => setEditingCredentials(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                    placeholder="שם משפחה"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">גיל</label>
                  <input
                    type="number"
                    value={editingCredentials.age}
                    onChange={(e) => setEditingCredentials(prev => ({ ...prev, age: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                    placeholder="גיל"
                    min="1"
                    max="120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">מגדר</label>
                  <select
                    value={editingCredentials.sex}
                    onChange={(e) => setEditingCredentials(prev => ({ ...prev, sex: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                  >
                    <option value="male">זכר</option>
                    <option value="female">נקבה</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 space-x-reverse">
                <button
                  onClick={handleUpdateCredentials}
                  disabled={isSavingCredentials}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded font-medium flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSavingCredentials ? 'שומר...' : 'שמור'}
                </button>
                <button
                  onClick={handleCancelCredentialsEdit}
                  disabled={isSavingCredentials}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 text-white rounded font-medium flex items-center"
                >
                  <X className="h-4 w-4 mr-2" />
                  בטל
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">
                  {getDisplayValue('fullName')}
                </span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">
                  {getDisplayValue('age')}
                </span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">
                  {getDisplayValue('sex')}
                </span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">{userProfile.email}</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats Grid - Synchronized with userProfile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center border border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4">
            <Target className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">{getProgressPercentage()}%</h3>
          <p className="text-gray-300">התקדמות כללית</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center border border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mx-auto mb-4">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">{getCompletedLessons()}</h3>
          <p className="text-gray-300">שיעורים שהושלמו</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center border border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-4">
            <Star className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">{getAverageScore()}%</h3>
          <p className="text-gray-300">ציון ממוצע</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center border border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-600 rounded-lg mx-auto mb-4">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">{getCurrentStreak()}</h3>
          <p className="text-gray-300">ימי למידה רצופים</p>
        </div>
      </motion.div>

      {/* Additional Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
      >
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center border border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-cyan-600 rounded-lg mx-auto mb-4">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">{getStatistics().totalTimeSpent}</h3>
          <p className="text-gray-300">דקות למידה</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center border border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-lg mx-auto mb-4">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">{getStatistics().totalPagesEngaged}</h3>
          <p className="text-gray-300">עמודים נצפו</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center border border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-pink-600 rounded-lg mx-auto mb-4">
            <Award className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">{getStatistics().achievements}</h3>
          <p className="text-gray-300">הישגים</p>
        </div>
      </motion.div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">התקדמות לפי שיעורים</h3>
        
        <div className="space-y-4">
          {lessons.map((lesson) => {
            const isCompleted = getCompletedLessons().includes(lesson.id);
            const isAvailable = lesson.id <= (userProfile.currentLesson || 1);
            const progress = userProfile.progress?.[lesson.id];
            
            return (
              <div key={lesson.id} className="flex items-center p-4 border border-gray-600 rounded-lg bg-gray-700">
                <div className="text-2xl mr-4">{lesson.icon}</div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">
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
                    <p className="text-sm text-gray-300">{lesson.description}</p>
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
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">הישגים</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getAchievements().map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? 'border-cyber-green bg-gray-700'
                  : 'border-gray-600 bg-gray-700'
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
                  achievement.unlocked ? 'text-white' : 'text-gray-400'
                }`}>
                  {achievement.title}
                </h4>
                <p className={`text-sm ${
                  achievement.unlocked ? 'text-gray-300' : 'text-gray-500'
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
        <div className="bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center mb-8 border border-gray-700">
          {/* Round profile emoji */}
          <div className="relative mb-4">
            <span className="text-7xl rounded-full border-4 border-cyber-blue bg-gray-700 shadow-lg flex items-center justify-center w-28 h-28 cursor-pointer" title="בחר אייקון">
              {selectedEmoji}
            </span>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  className={`text-xl p-1 rounded-full border-2 ${selectedEmoji === emoji ? 'border-cyber-blue bg-cyber-blue/20' : 'border-transparent'}`}
                  onClick={() => setSelectedEmoji(emoji)}
                  aria-label={`בחר ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-400 block mt-1">בחר אייקון לפרופיל שלך</span>
          </div>
          {/* User info and settings */}
          <div className="w-full max-w-md mx-auto mt-4">
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-2xl font-bold text-white mb-2">{getCurrentDisplayName()}</h2>
              <div className="flex items-center text-gray-300 mb-2">
                <Mail className="h-5 w-5 ml-2" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center text-gray-300">
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
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg mb-2 bg-gray-700 text-white"
                    placeholder="האימייל שלך"
                    required
                  />
                  <button type="submit" className="btn-primary w-full">שלח קישור איפוס</button>
                  {resetSent && <div className="text-green-400 mt-2">קישור איפוס נשלח!</div>}
                </form>
              )}
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-2">התקדמות בקורס</h3>
          <div className="w-full bg-gray-700 rounded-full h-6 mb-2">
            <div
              className="bg-gradient-to-r from-cyber-green to-cyber-blue h-6 rounded-full flex items-center justify-end pr-4 text-white font-bold text-lg transition-all duration-700"
              style={{ width: `${getProgressPercentage()}%` }}
            >
              {getProgressPercentage()}%
            </div>
          </div>
          <span className="text-sm text-gray-400">{userProfile.completedLessons?.length || 0} מתוך {lessons.length} שיעורים הושלמו</span>
        </div>
      </div>
    </div>
  );
};

export default Profile; 