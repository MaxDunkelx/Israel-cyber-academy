import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Users, 
  BookOpen, 
  Clock, 
  ChevronLeft,
  Plus,
  Search,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { getTeacherClasses, getTeacherStudents } from '../../firebase/teacher-service';
import { createSession } from '../../firebase/session-service';
import { getAllLessons } from '../../firebase/content-service';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const SessionCreation = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [classesData, studentsData, lessonsData] = await Promise.all([
        getTeacherClasses(currentUser.uid),
        getTeacherStudents(currentUser.uid),
        getAllLessons()
      ]);
      
      setClasses(classesData);
      setStudents(studentsData);
      setLessons(lessonsData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('אירעה שגיאה בטעינת הנתונים');
      setLoading(false);
    }
  };

  const handleStartSession = async () => {
    if (!selectedClass || !selectedLesson) {
      toast.error('יש לבחור כיתה ושיעור');
      return;
    }

    try {
      setCreating(true);
      
      const sessionData = {
        teacherId: currentUser.uid,
        teacherName: currentUser.displayName || currentUser.email,
        classId: selectedClass.id,
        className: selectedClass.name,
        lessonId: selectedLesson.id,
        lessonName: selectedLesson.title,
        studentIds: selectedClass.studentIds || [],
        totalSlides: selectedLesson.content.slides.length
      };

      const sessionId = await createSession(sessionData);
      
      toast.success('השיעור התחיל בהצלחה!');
      navigate(`/teacher/session/${sessionId}`);
    } catch (error) {
      console.error('Error starting session:', error);
      toast.error('אירעה שגיאה בהתחלת השיעור');
      setCreating(false);
    }
  };

  const filteredClasses = classes.filter(classItem =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClassStudentCount = (classItem) => {
    return classItem.studentIds ? classItem.studentIds.length : 0;
  };

  const getLessonDuration = (lesson) => {
    if (!lesson || !lesson.content || !lesson.content.slides) return 0;
    return lesson.content.slides.reduce((total, slide) => total + (slide.duration || 3), 0);
  };

  const getLessonSlideCount = (lesson) => {
    if (!lesson || !lesson.content || !lesson.content.slides) return 0;
    return lesson.content.slides.length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/teacher/dashboard')}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>חזור</span>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">יצירת שיעור חדש</h1>
              <p className="text-gray-300 text-sm">בחר כיתה ושיעור כדי להתחיל</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Class Selection */}
          <Card variant="dark" className="border-gray-700">
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>בחירת כיתה</span>
              </h2>
              
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="חיפוש כיתות..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Classes List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredClasses.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400">לא נמצאו כיתות</p>
                  </div>
                ) : (
                  filteredClasses.map((classItem) => (
                    <div
                      key={classItem.id}
                      onClick={() => setSelectedClass(classItem)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedClass?.id === classItem.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">{classItem.name}</h3>
                          <p className="text-sm text-gray-400">
                            {getClassStudentCount(classItem)} תלמידים
                          </p>
                        </div>
                        {selectedClass?.id === classItem.id && (
                          <CheckCircle className="w-5 h-5 text-blue-400" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>

          {/* Lesson Selection */}
          <Card variant="dark" className="border-gray-700">
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>בחירת שיעור</span>
              </h2>

              {/* Lessons List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedLesson?.id === lesson.id
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">{lesson.title}</h3>
                        <p className="text-sm text-gray-400">
                          {getLessonSlideCount(lesson)} שקופיות • {getLessonDuration(lesson)} דקות
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {lesson.description}
                        </p>
                      </div>
                      {selectedLesson?.id === lesson.id && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Session Summary */}
        {(selectedClass || selectedLesson) && (
          <Card variant="dark" className="border-gray-700 mt-8">
            <div className="p-6">
              <h2 className="text-lg font-bold text-white mb-4">סיכום השיעור</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedClass && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-2">
                      {selectedClass.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {getClassStudentCount(selectedClass)} תלמידים
                    </div>
                  </div>
                )}
                
                {selectedLesson && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-2">
                      {selectedLesson.title}
                    </div>
                    <div className="text-sm text-gray-400">
                      {getLessonSlideCount(selectedLesson)} שקופיות
                    </div>
                  </div>
                )}
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">
                    {selectedLesson ? getLessonDuration(selectedLesson) : 0} דקות
                  </div>
                  <div className="text-sm text-gray-400">משך משוער</div>
                </div>
              </div>

              {/* Start Session Button */}
              <div className="mt-6 text-center">
                <Button
                  onClick={handleStartSession}
                  disabled={!selectedClass || !selectedLesson || creating}
                  variant="primary"
                  size="lg"
                  className="flex items-center space-x-2 mx-auto"
                >
                  {creating ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                  <span>
                    {creating ? 'מתחיל שיעור...' : 'התחל שיעור'}
                  </span>
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SessionCreation; 