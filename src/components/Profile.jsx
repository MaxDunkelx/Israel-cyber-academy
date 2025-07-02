import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAllLessons } from '../firebase/content-service';
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
  BookOpen,
  GraduationCap,
  Shield,
  Zap,
  Brain,
  Rocket,
  Crown,
  Sparkles,
  Heart,
  Eye,
  BarChart3,
  TrendingUp,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cyber-logo.png';
import { toast } from 'react-hot-toast';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { updateProfile } from 'firebase/auth';
import LiveSessionNotification from './student/LiveSessionNotification';

const emojiOptions = ['😀','😎','🤓','🦸‍♂️','🦸‍♀️','🧑‍💻','👩‍🏫','👨‍🏫','🧑‍🎓','👽','🤖','🦄','🐱','🐶','🐼','🐧','🐸'];

const Profile = () => {
  const { userProfile, logout, currentUser, updateDisplayName, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedEmoji, setSelectedEmoji] = useState(userProfile?.emoji || '😀');
  
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
  
  // Teacher information state
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [loadingTeacher, setLoadingTeacher] = useState(false);
  
  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [freshCurrentLesson, setFreshCurrentLesson] = useState(userProfile?.currentLesson || 1);
  
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
    }
  }, [userProfile]);

  // Load lessons from Firebase
  useEffect(() => {
    const loadLessons = async () => {
      try {
        const lessonsData = await getAllLessons();
        setLessons(lessonsData);
      } catch (error) {
        console.error('Error loading lessons:', error);
        toast.error('שגיאה בטעינת השיעורים');
      }
    };
    
    loadLessons();
  }, []);

  // Refresh currentLesson from database
  useEffect(() => {
    if (!currentUser) return;
    
    const refreshCurrentLesson = async () => {
      try {
        const { doc, getDoc } = await import('firebase/firestore');
        const { db } = await import('../firebase/firebase-config');
        
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const freshUserData = userDoc.data();
          setFreshCurrentLesson(freshUserData.currentLesson || 1);
        }
      } catch (error) {
        console.error('Error refreshing currentLesson:', error);
      }
    };
    
    refreshCurrentLesson();
    const interval = setInterval(refreshCurrentLesson, 10000);
    
    return () => clearInterval(interval);
  }, [currentUser]);

  // Fetch teacher information for students
  useEffect(() => {
    const fetchTeacherInfo = async () => {
      if (userProfile?.role === 'student' && userProfile?.teacherId) {
        setLoadingTeacher(true);
        try {
          const teacherDoc = await getDoc(doc(db, 'users', userProfile.teacherId));
          if (teacherDoc.exists()) {
            setTeacherInfo(teacherDoc.data());
          }
        } catch (error) {
          console.error('Error fetching teacher info:', error);
        } finally {
          setLoadingTeacher(false);
        }
      }
    };

    fetchTeacherInfo();
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

  // Password change handlers
  const handlePasswordReset = () => {
    setShowPasswordChange(true);
  };

  const handlePasswordChange = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('כל השדות הם חובה');
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error('הסיסמה החדשה חייבת להיות לפחות 6 תווים');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('הסיסמה החדשה והאישור אינם תואמים');
      return;
    }
    
    if (newPassword === currentPassword) {
      toast.error('הסיסמה החדשה חייבת להיות שונה מהסיסמה הנוכחית');
      return;
    }
    
    setIsChangingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      toast.success('הסיסמה שונתה בהצלחה');
      setShowPasswordChange(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Password change error:', error);
      toast.error(error.message || 'אירעה שגיאה בשינוי הסיסמה');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleCancelPasswordChange = () => {
    setShowPasswordChange(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
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
        icon: '��',
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
            const isAvailable = lesson.id <= freshCurrentLesson;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Live Session Notification */}
      <LiveSessionNotification />
      
      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Hero Profile Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800/80 via-gray-700/80 to-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-gray-600/50"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Profile Avatar Section */}
            <div className="relative">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-6xl border-4 border-gray-700">
                    {selectedEmoji}
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-gray-800">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </motion.div>
              
              {/* Emoji Selection */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {emojiOptions.map((emoji) => (
                  <motion.button
                    key={emoji}
                    className={`text-2xl p-2 rounded-full border-2 transition-all duration-300 ${
                      selectedEmoji === emoji 
                        ? 'border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/25' 
                        : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
                    }`}
                    onClick={() => setSelectedEmoji(emoji)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* User Information Section */}
            <div className="flex-1 text-center lg:text-right">
              {/* Display Name with Edit Functionality */}
              <div className="mb-6">
                {isEditingName ? (
                  <div className="flex items-center justify-center lg:justify-end gap-3 mb-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="text-3xl font-bold bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                      placeholder="הכנס שם תצוגה"
                    />
                    <motion.button
                      onClick={handleUpdateDisplayName}
                      disabled={isSavingName}
                      className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={handleCancelNameEdit}
                      className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center lg:justify-end gap-3 mb-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {getCurrentDisplayName()}
                    </h2>
                    <motion.button
                      onClick={() => setIsEditingName(true)}
                      className="bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 p-2 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit className="w-5 h-5" />
                    </motion.button>
                  </div>
                )}
              </div>

              {/* User Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center lg:justify-end gap-3 text-gray-300">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-lg">{userProfile?.email}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-end gap-3 text-gray-300">
                  <GraduationCap className="h-5 w-5 text-purple-400" />
                  <span className="text-lg font-semibold">
                    {userProfile?.role === 'teacher' ? 'מורה' : userProfile?.role === 'student' ? 'תלמיד' : 'אורח'}
                  </span>
                </div>
              </div>

              {/* Teacher Information for Students */}
              {userProfile?.role === 'student' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 border border-blue-500/30 mb-4"
                >
                  <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center justify-center lg:justify-end gap-2">
                    <Users className="h-5 w-5" />
                    מורה מקצועי
                  </h3>
                  {loadingTeacher ? (
                    <div className="flex items-center justify-center lg:justify-end gap-2 text-gray-400">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                      טוען פרטי מורה...
                    </div>
                  ) : teacherInfo ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-center lg:justify-end gap-2 text-white">
                        <User className="h-4 w-4 text-blue-400" />
                        <span className="font-semibold">{teacherInfo.displayName || teacherInfo.email}</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-end gap-2 text-gray-300 text-sm">
                        <Mail className="h-4 w-4 text-blue-400" />
                        <span>{teacherInfo.email}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center lg:text-right">
                      לא הוקצה מורה עדיין
                    </div>
                  )}
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-end gap-3">
                <motion.button
                  onClick={handlePasswordReset}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <KeyRound className="w-4 h-4" />
                  שנה סיסמה
                </motion.button>
                <motion.button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4" />
                  התנתק
                </motion.button>
              </div>

              {/* Password Change Form */}
              {showPasswordChange && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 bg-gray-700/50 rounded-xl p-4 border border-gray-600/50"
                >
                  <h4 className="text-lg font-semibold text-white mb-4 text-center">שנה סיסמה</h4>
                  <div className="space-y-3">
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={e => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                      placeholder="סיסמה נוכחית"
                      required
                    />
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={e => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                      placeholder="סיסמה חדשה (לפחות 6 תווים)"
                      required
                    />
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={e => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-600/50 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                      placeholder="אישור סיסמה חדשה"
                      required
                    />
                    <div className="flex gap-2">
                      <motion.button 
                        type="button"
                        onClick={handlePasswordChange}
                        disabled={isChangingPassword}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isChangingPassword ? 'משנה...' : 'שנה סיסמה'}
                      </motion.button>
                      <motion.button 
                        type="button"
                        onClick={handleCancelPasswordChange}
                        disabled={isChangingPassword}
                        className="px-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        בטל
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Progress Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800/80 via-gray-700/80 to-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-600/50"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              התקדמות בקורס
            </h3>
            <p className="text-gray-300">המשך ללמוד ולהתקדם!</p>
          </div>
          
          <div className="relative">
            <div className="w-full bg-gray-700/50 rounded-full h-8 mb-4 border border-gray-600/50 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-full flex items-center justify-end pr-4 text-white font-bold text-lg shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                {getProgressPercentage()}%
              </motion.div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>התחלה</span>
              <span className="font-semibold text-white">
                {userProfile?.completedLessons?.length || 0} מתוך {lessons.length} שיעורים הושלמו
              </span>
              <span>סיום</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile; 