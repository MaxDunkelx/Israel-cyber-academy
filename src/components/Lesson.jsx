import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getLessonById, getNextLesson, getPreviousLesson } from '../data/lessons';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  BookOpen,
  Play,
  Home,
  Trophy
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';
import MultipleChoiceExercise from './exercises/MultipleChoiceExercise';
import DragDropExercise from './exercises/DragDropExercise';
import MatchingExercise from './exercises/MatchingExercise';

const Lesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { userProfile, updateUserProgress } = useAuth();
  const [currentStep, setCurrentStep] = useState('theory'); // 'theory', 'exercise', 'complete'
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseResults, setExerciseResults] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const lesson = getLessonById(parseInt(lessonId));
  const nextLesson = getNextLesson(parseInt(lessonId));
  const prevLesson = getPreviousLesson(parseInt(lessonId));

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyber-blue to-cyber-purple">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">שיעור לא נמצא</h1>
          <button 
            onClick={() => navigate('/roadmap')}
            className="btn-primary"
          >
            חזור למסלול הלמידה
          </button>
        </div>
      </div>
    );
  }

  const handleExerciseComplete = (exerciseIndex, isCorrect, score = 0) => {
    setExerciseResults(prev => ({
      ...prev,
      [exerciseIndex]: { isCorrect, score }
    }));

    // Save temporary progress after each exercise
    if (userProfile && !userProfile.isGuest) {
      updateUserProgress(lesson.id, false, 0, true); // temporary progress
    }

    if (isCorrect) {
      toast.success('תשובה נכונה! מעולה! 🎉');
    } else {
      toast.error('נסה שוב! 💪');
    }
  };

  const handleCompleteLesson = async () => {
    const totalExercises = lesson.content.exercises.length;
    const correctAnswers = Object.values(exerciseResults).filter(result => result.isCorrect).length;
    const score = Math.round((correctAnswers / totalExercises) * 100);

    try {
      // Save as permanent (not temporary) on completion
      await updateUserProgress(lesson.id, true, score, false);
      setShowConfetti(true);
      toast.success(`שיעור הושלם! ציון: ${score}%`);
      setTimeout(() => {
        setShowConfetti(false);
        if (nextLesson) {
          navigate(`/lesson/${nextLesson.id}`);
        } else {
          navigate('/roadmap');
        }
      }, 3000);
    } catch (error) {
      toast.error('אירעה שגיאה בשמירת ההתקדמות');
    }
  };

  const isLessonCompleted = userProfile?.completedLessons?.includes(lesson.id);

  const renderTheory = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{lesson.icon}</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {lesson.title}
        </h1>
        <p className="text-gray-600 text-lg">{lesson.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-semibold text-blue-800">זמן משוער</span>
          </div>
          <p className="text-blue-700">{lesson.duration}</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Trophy className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="font-semibold text-yellow-800">רמת קושי</span>
          </div>
          <p className="text-yellow-700">{lesson.difficulty}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <BookOpen className="h-6 w-6 text-cyber-blue mr-3" />
          תיאוריה
        </h2>
        
        <div className="space-y-4">
          {lesson.content.theory.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start space-x-3 space-x-reverse"
            >
              <div className="bg-cyber-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                {index + 1}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setCurrentStep('exercise')}
          className="btn-primary text-lg px-8 py-3"
        >
          <Play className="h-5 w-5 mr-2" />
          התחל בתרגילים
        </button>
      </div>
    </motion.div>
  );

  const renderExercise = () => {
    const exercise = lesson.content.exercises[currentExerciseIndex];
    
    if (!exercise) return null;

    const renderExerciseComponent = () => {
      switch (exercise.type) {
        case 'multiple_choice':
          return (
            <MultipleChoiceExercise
              exercise={exercise}
              onComplete={(isCorrect) => handleExerciseComplete(currentExerciseIndex, isCorrect)}
            />
          );
        case 'drag_drop':
          return (
            <DragDropExercise
              exercise={exercise}
              onComplete={(isCorrect) => handleExerciseComplete(currentExerciseIndex, isCorrect)}
            />
          );
        case 'matching':
          return (
            <MatchingExercise
              exercise={exercise}
              onComplete={(isCorrect) => handleExerciseComplete(currentExerciseIndex, isCorrect)}
            />
          );
        default:
          return (
            <div className="text-center text-gray-600">
              <p>תרגיל זה עדיין בפיתוח</p>
            </div>
          );
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            תרגיל {currentExerciseIndex + 1} מתוך {lesson.content.exercises.length}
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-cyber-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentExerciseIndex + 1) / lesson.content.exercises.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          {renderExerciseComponent()}
        </div>

        <div className="flex justify-center items-center space-x-6 space-x-reverse mt-8">
          <button
            onClick={() => setCurrentExerciseIndex(Math.max(0, currentExerciseIndex - 1))}
            disabled={currentExerciseIndex === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            תרגיל קודם
          </button>

          {currentExerciseIndex < lesson.content.exercises.length - 1 ? (
            <button
              onClick={() => setCurrentExerciseIndex(currentExerciseIndex + 1)}
              className="btn-primary"
            >
              תרגיל הבא
              <ArrowRight className="h-4 w-4 mr-2" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep('complete')}
              className="btn-primary"
            >
              סיים שיעור
              <CheckCircle className="h-4 w-4 mr-2" />
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  const renderComplete = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6"
    >
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        כל הכבוד! השיעור הושלם בהצלחה!
      </h1>
      
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">סיכום השיעור</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>תרגילים שהושלמו:</span>
            <span className="font-bold text-cyber-green">
              {Object.keys(exerciseResults).length} / {lesson.content.exercises.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span>תשובות נכונות:</span>
            <span className="font-bold text-cyber-blue">
              {Object.values(exerciseResults).filter(r => r.isCorrect).length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 space-x-reverse">
        <button
          onClick={() => navigate('/roadmap')}
          className="btn-secondary"
        >
          <Home className="h-4 w-4 mr-2" />
          חזור למסלול
        </button>
        
        {nextLesson && (
          <button
            onClick={() => navigate(`/lesson/${nextLesson.id}`)}
            className="btn-primary"
          >
            שיעור הבא
            <ArrowRight className="h-4 w-4 mr-2" />
          </button>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-blue to-cyber-purple p-4">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      
      <div className="max-w-4xl mx-auto">
        {/* Navigation Header */}
        <div className="bg-white rounded-lg p-4 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/roadmap')}
              className="btn-secondary"
            >
              <Home className="h-4 w-4 mr-2" />
              חזור למסלול
            </button>
            
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">
                {lesson.title}
              </h1>
              {isLessonCompleted && (
                <div className="flex items-center justify-center text-cyber-green mt-1">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm">הושלם</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2 space-x-reverse">
              {prevLesson && (
                <button
                  onClick={() => navigate(`/lesson/${prevLesson.id}`)}
                  className="btn-secondary"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              
              {nextLesson && (
                <button
                  onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                  className="btn-secondary"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          {currentStep === 'theory' && renderTheory()}
          {currentStep === 'exercise' && renderExercise()}
          {currentStep === 'complete' && renderComplete()}
        </div>
      </div>
    </div>
  );
};

export default Lesson; 