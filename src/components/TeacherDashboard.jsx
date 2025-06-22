import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { lessons } from '../data/lessons';
import ClassManagement from './teacher/ClassManagement';
import StudentManagement from './teacher/StudentManagement';
import LessonPreview from './teacher/LessonPreview';
import TeacherAnalytics from './teacher/TeacherAnalytics';
import TeacherComments from './teacher/TeacherComments';
import { 
  Building, 
  Users, 
  BookOpen, 
  BarChart3, 
  MessageSquare,
  LogOut,
  User,
  Home
} from 'lucide-react';

export default function TeacherDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('students'); // Start with students tab
  const [showDashboard, setShowDashboard] = useState(true);

  // Mock data - replace with real data from Firebase
  const [classes, setClasses] = useState([
    {
      id: '1',
      name: 'כיתה א\'',
      description: 'כיתה מתחילים',
      maxStudents: 25,
      schedule: 'ימי שני ורביעי, 14:00-16:00',
      teacherId: user?.uid || 'teacher1'
    },
    {
      id: '2', 
      name: 'כיתה ב\'',
      description: 'כיתה מתקדמים',
      maxStudents: 20,
      schedule: 'ימי שלישי וחמישי, 16:00-18:00',
      teacherId: 'teacher2'
    }
  ]);

  const [students, setStudents] = useState([
    {
      id: '1',
      displayName: 'יוסי כהן',
      email: 'yossi@example.com',
      classId: '1',
      teacherId: user?.uid || 'teacher1',
      lastLogin: new Date(),
      progress: 75
    },
    {
      id: '2',
      displayName: 'שרה לוי',
      email: 'sara@example.com',
      classId: '1',
      teacherId: user?.uid || 'teacher1',
      lastLogin: new Date(),
      progress: 60
    },
    {
      id: '3',
      displayName: 'דוד ישראלי',
      email: 'david@example.com',
      classId: '2',
      teacherId: 'teacher2',
      lastLogin: new Date(),
      progress: 85
    },
    {
      id: '4',
      displayName: 'מיכל רוזן',
      email: 'michal@example.com',
      classId: null,
      teacherId: null,
      lastLogin: new Date(),
      progress: 0
    },
    {
      id: '5',
      displayName: 'עמית כהן',
      email: 'amit@example.com',
      classId: null,
      teacherId: null,
      lastLogin: new Date(),
      progress: 0
    }
  ]);

  const [comments, setComments] = useState([]);

  // Mock functions - replace with real Firebase operations
  const onCreateClass = async (classData) => {
    const newClass = {
      id: Date.now().toString(),
      ...classData,
      teacherId: user?.uid,
      createdAt: new Date()
    };
    setClasses([...classes, newClass]);
  };

  const onUpdateClass = async (classId, classData) => {
    setClasses(classes.map(c => c.id === classId ? { ...c, ...classData } : c));
  };

  const onDeleteClass = async (classId) => {
    setClasses(classes.filter(c => c.id !== classId));
  };

  const onAssignStudent = async (studentId, classId, teacherId = user?.uid) => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, classId, teacherId } : s
    ));
  };

  const onUnassignStudent = async (studentId) => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, classId: null, teacherId: null } : s
    ));
  };

  const onUnlockLesson = async (lessonId, classId) => {
    console.log('Unlocking lesson', lessonId, 'for class', classId);
  };

  const onAddComment = async (lessonId, slideIndex, text, type = 'note') => {
    const newComment = {
      id: Date.now().toString(),
      lessonId,
      slideIndex,
      text,
      type,
      teacherId: user?.uid,
      createdAt: new Date()
    };
    setComments([...comments, newComment]);
  };

  const onUpdateComment = async (commentId, text, type) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, text, type } : c
    ));
  };

  const onDeleteComment = async (commentId) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  const getClassProgress = (classData) => {
    const classStudents = students.filter(s => s.classId === classData.id);
    if (classStudents.length === 0) return 0;
    
    const totalProgress = classStudents.reduce((sum, s) => sum + (s.progress || 0), 0);
    return Math.round(totalProgress / classStudents.length);
  };

  const getStudentProgress = (student) => {
    return student.progress || 0;
  };

  const getLessonProgress = (lessonId, classId) => {
    return Math.floor(Math.random() * 100);
  };

  const getMyStudents = () => {
    return students.filter(s => s.teacherId === user?.uid);
  };

  const getUnassignedStudents = () => {
    return students.filter(s => !s.teacherId);
  };

  const getOtherTeachersStudents = () => {
    return students.filter(s => s.teacherId && s.teacherId !== user?.uid);
  };

  const tabs = [
    { id: 'students', label: 'ניהול תלמידים', icon: Users },
    { id: 'classes', label: 'ניהול כיתות', icon: Building },
    { id: 'lessons', label: 'תצוגה מקדימה', icon: BookOpen },
    { id: 'analytics', label: 'אנליטיקה', icon: BarChart3 },
    { id: 'comments', label: 'הערות', icon: MessageSquare }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'students':
        return (
          <StudentManagement
            students={students}
            classes={classes}
            currentTeacherId={user?.uid}
            onAssignStudent={onAssignStudent}
            onUnassignStudent={onUnassignStudent}
            getStudentProgress={getStudentProgress}
            getMyStudents={getMyStudents}
            getUnassignedStudents={getUnassignedStudents}
            getOtherTeachersStudents={getOtherTeachersStudents}
          />
        );
      case 'classes':
        return (
          <ClassManagement
            classes={classes}
            students={students}
            currentTeacherId={user?.uid}
            onCreateClass={onCreateClass}
            onUpdateClass={onUpdateClass}
            onDeleteClass={onDeleteClass}
            onAssignStudent={onAssignStudent}
            selectedClass={null}
            onSelectClass={() => {}}
            getClassProgress={getClassProgress}
          />
        );
      case 'lessons':
        return (
          <LessonPreview
            lesson={null}
            selectedClass={null}
            onUnlockLesson={onUnlockLesson}
            onAddComment={onAddComment}
            getLessonProgress={getLessonProgress}
          />
        );
      case 'analytics':
        return (
          <TeacherAnalytics
            classes={classes}
            students={students}
            lessons={lessons}
            currentTeacherId={user?.uid}
            getClassProgress={getClassProgress}
            getStudentProgress={getStudentProgress}
          />
        );
      case 'comments':
        return (
          <TeacherComments
            lessons={lessons}
            comments={comments}
            onAddComment={onAddComment}
            onUpdateComment={onUpdateComment}
            onDeleteComment={onDeleteComment}
          />
        );
      default:
        return <div>בחר לשונית</div>;
    }
  };

  if (!showDashboard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">לוח בקרה למורה</h1>
          <p className="text-gray-600 mb-8">ברוך הבא למערכת ניהול התלמידים</p>
          <button
            onClick={() => setShowDashboard(true)}
            className="btn-primary flex items-center mx-auto"
          >
            <User className="h-5 w-5 ml-2" />
            כניסה ללוח הבקרה
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">לוח בקרה למורה</h1>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {user?.displayName || user?.email}
                </div>
                <div className="text-sm text-gray-500">מורה</div>
              </div>
              <button
                onClick={() => setShowDashboard(false)}
                className="btn-secondary flex items-center"
              >
                <Home className="h-4 w-4 ml-2" />
                דף הבית
              </button>
              <button
                onClick={logout}
                className="btn-secondary flex items-center"
              >
                <LogOut className="h-4 w-4 ml-2" />
                התנתק
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 space-x-reverse">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-cyber-blue text-cyber-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 ml-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </div>
    </div>
  );
}
