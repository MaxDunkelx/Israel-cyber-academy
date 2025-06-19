import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getLessonById } from '../data/lessons';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Clock,
  CheckCircle,
  Home
} from 'lucide-react';
import DragDropExercise from './exercises/DragDropExercise';
import MatchingExercise from './exercises/MatchingExercise';
import MultipleChoiceExercise from './exercises/MultipleChoiceExercise';

const InteractiveLesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile, updateUserProgress, setLastLessonSlide } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lesson, setLesson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completedSlides, setCompletedSlides] = useState({});
  const timerRef = useRef(null);

  useEffect(() => {
    const lessonData = getLessonById(parseInt(lessonId));
    if (lessonData) {
      setLesson(lessonData);
      setTimeLeft(lessonData.content.slides[0]?.content?.duration || 30);
    }
  }, [lessonId]);

  useEffect(() => {
    if (timeLeft > 0 && isPlaying) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      handleNextSlide();
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, isPlaying]);

  // On mount, set currentSlide from URL param if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const slideParam = parseInt(params.get('slide'), 10);
    if (!isNaN(slideParam) && slideParam >= 0) {
      setCurrentSlide(slideParam);
    }
  }, [location.search]);

  // On slide change, persist last slide for resume
  useEffect(() => {
    if (lesson && userProfile && !userProfile.isGuest && typeof setLastLessonSlide === 'function') {
      setLastLessonSlide(lesson.id, currentSlide);
      // Also updateUserProgress with lastSlide
      updateUserProgress(lesson.id, false, 0, true, currentSlide);
    }
    // eslint-disable-next-line
  }, [currentSlide, lesson]);

  // Save temporary progress after each slide interaction
  useEffect(() => {
    if (lesson && userProfile && !userProfile.isGuest) {
      updateUserProgress(lesson.id, false, 0, true); // temporary progress
    }
    // eslint-disable-next-line
  }, [currentSlide]);

  // Mark slide as completed when user interacts or views
  useEffect(() => {
    if (!lesson) return;
    const slide = lesson.content.slides[currentSlide];
    // For interactive, only mark as completed if answered
    if (slide.type === 'interactive') {
      if (answers[slide.id] && answers[slide.id].isCorrect !== false) {
        setCompletedSlides(prev => ({ ...prev, [slide.id]: true }));
      }
    } else {
      setCompletedSlides(prev => ({ ...prev, [slide.id]: true }));
    }
  }, [currentSlide, answers, lesson]);

  const handleNextSlide = () => {
    if (currentSlide < lesson.content.slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      const nextSlide = lesson.content.slides[currentSlide + 1];
      setTimeLeft(nextSlide?.content?.duration || 30);
      setIsPlaying(true);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      const prevSlide = lesson.content.slides[currentSlide - 1];
      setTimeLeft(prevSlide?.content?.duration || 30);
      setIsPlaying(true);
    }
  };

  const handleAnswer = (slideId, answer) => {
    setAnswers(prev => ({ ...prev, [slideId]: answer }));
    
    if (userProfile && !userProfile.isGuest) {
      updateUserProgress(lesson.id, true, 50);
    }
  };

  // Mark as permanent on lesson completion
  const handleCompleteLesson = async () => {
    try {
      await updateUserProgress(lesson.id, true, 100, false); // permanent progress
      // Auto-advance to next lesson if exists
      const nextLessonId = lesson.id + 1;
      const nextLesson = getLessonById(nextLessonId);
      if (nextLesson) {
        navigate(`/interactive-lesson/${nextLessonId}`);
      } else {
        navigate('/roadmap');
      }
    } catch (error) {
      // Optionally show error toast
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'presentation':
        return <PresentationSlide slide={slide} />;
      case 'poll':
        return <PollSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
      case 'video':
        return <VideoSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
      case 'interactive':
        return <InteractiveSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
      case 'break':
        return <BreakSlide slide={slide} />;
      case 'reflection':
        return <ReflectionSlide slide={slide} onAnswer={handleAnswer} answers={answers} />;
      default:
        return <div>סלייד לא מוכר</div>;
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyber-blue to-cyber-purple">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>טוען שיעור...</p>
        </div>
      </div>
    );
  }

  const currentSlideData = lesson.content.slides[currentSlide];
  const progressPercentage = ((currentSlide + 1) / lesson.content.slides.length) * 100;

  // Helper: Check if all slides are completed
  const allSlidesCompleted = lesson && lesson.content.slides.every(slide => completedSlides[slide.id]);

  // Helper: Get checklist data
  const slideChecklist = lesson ? lesson.content.slides.map(slide => ({
    id: slide.id,
    title: slide.title,
    type: slide.type,
    completed: !!completedSlides[slide.id]
  })) : [];

  // On last slide, show checklist, progress bar, and finish button
  const isLastSlide = lesson && currentSlide === lesson.content.slides.length - 1;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/roadmap')}
            className="flex items-center space-x-2 text-cyber-blue hover:text-cyber-blue/80"
          >
            <Home className="h-5 w-5" />
            <span>חזרה לדף הבית</span>
          </button>
          <div className="text-lg font-semibold">{lesson.title}</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-cyber-green" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-cyber-blue" />
            <span>{currentSlide + 1} / {lesson.content.slides.length}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 h-2">
        <div 
          className="bg-gradient-to-r from-cyber-blue to-cyber-green h-2 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {renderSlide(currentSlideData)}
          {isLastSlide && (
            <div className="mt-12 bg-gray-800 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">סיכום התקדמות השיעור</h2>
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
                <div
                  className="bg-gradient-to-r from-cyber-blue to-cyber-green h-4 rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((Object.keys(completedSlides).length / lesson.content.slides.length) * 100)}%` }}
                ></div>
              </div>
              {/* Checklist */}
              <ul className="mb-6 space-y-2">
                {slideChecklist.map((slide, idx) => (
                  <li key={slide.id} className="flex items-center space-x-3 space-x-reverse">
                    <span className={`inline-block w-6 h-6 rounded-full text-center font-bold ${slide.completed ? 'bg-cyber-green text-white' : 'bg-gray-600 text-white'}`}>{slide.completed ? '✔' : idx + 1}</span>
                    <span className={slide.completed ? 'text-cyber-green' : 'text-gray-300'}>{slide.title}</span>
                  </li>
                ))}
              </ul>
              {/* Finish Button */}
              <button
                className={`w-full btn-primary text-lg py-3 font-bold ${!allSlidesCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!allSlidesCompleted}
                onClick={handleCompleteLesson}
              >
                סיים שיעור
              </button>
              {!allSlidesCompleted && (
                <div className="mt-4 text-center text-cyber-red font-semibold">יש להשלים את כל השקופיות והפעילויות לפני סיום השיעור.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-8 bg-gray-800 p-4 rounded-full shadow-lg">
        <button
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
          className="p-3 bg-cyber-blue rounded-full hover:bg-cyber-blue/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          style={{ width: 56, height: 56 }}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 bg-cyber-green rounded-full hover:bg-cyber-green/80 flex items-center justify-center"
          style={{ width: 56, height: 56 }}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </button>
        <button
          onClick={handleNextSlide}
          disabled={currentSlide === lesson.content.slides.length - 1}
          className="p-3 bg-cyber-blue rounded-full hover:bg-cyber-blue/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          style={{ width: 56, height: 56 }}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

// Presentation Slide Component
const PresentationSlide = ({ slide }) => {
  return (
    <div 
      className="min-h-[70vh] rounded-2xl p-8 flex flex-col justify-center items-center"
      style={{ background: slide.content.background }}
    >
      {slide.content.elements.map((element, index) => {
        switch (element.type) {
          case 'title':
            return (
              <h1 key={index} style={element.style}>
                {element.text}
              </h1>
            );
          case 'subtitle':
            return (
              <p key={index} style={element.style}>
                {element.text}
              </p>
            );
          case 'image':
            return (
              <img 
                key={index}
                src={element.src} 
                alt={element.alt}
                style={element.style}
                className="object-cover"
              />
            );
          case 'list':
            return (
              <ul key={index} style={element.style} className="list-disc list-inside space-y-2">
                {element.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case 'animation':
            return (
              <div key={index} style={element.style} className="animate-pulse">
                {element.element}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

// Poll Slide Component
const PollSlide = ({ slide, onAnswer, answers }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleVote = (optionId) => {
    setSelectedOption(optionId);
    onAnswer(slide.id, { selected: optionId });
    setShowResults(true);
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">{slide.title}</h2>
      <p className="text-xl mb-8">{slide.content.question}</p>
      
      <div className="space-y-4">
        {slide.content.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleVote(option.id)}
            disabled={showResults}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedOption === option.id
                ? 'border-cyber-blue bg-cyber-blue/20'
                : 'border-gray-600 hover:border-cyber-blue'
            } ${showResults ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">{option.emoji}</span>
              <span className="text-lg">{option.text}</span>
            </div>
          </button>
        ))}
      </div>

      {showResults && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">תוצאות הסקר</h3>
          <div className="space-y-2">
            {slide.content.options.map((option) => (
              <div key={option.id} className="flex items-center justify-between">
                <span>{option.text}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-cyber-blue h-2 rounded-full"
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{Math.floor(Math.random() * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Video Slide Component
const VideoSlide = ({ slide, onAnswer, answers }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">{slide.title}</h2>
      <p className="text-lg mb-8 text-center text-gray-300">{slide.content.description}</p>
      
      <div className="relative">
        <iframe
          src={slide.content.videoUrl}
          title={slide.title}
          className="w-full h-96 rounded-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {slide.content.questions && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">שאלות לסרטון</h3>
          {slide.content.questions.map((question, index) => (
            <div key={index} className="mb-4">
              <p className="mb-2">{question.question}</p>
              <textarea
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyber-blue"
                rows="3"
                placeholder="כתוב את התשובה שלך..."
                onChange={(e) => onAnswer(slide.id, { [index]: e.target.value })}
              />
            </div>
          ))}
        </div>
      )}

      {slide.content.quiz && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">מבחן קצר</h3>
          {slide.content.quiz.questions.map((question, index) => (
            <div key={index} className="mb-6">
              <p className="mb-3">{question.question}</p>
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    onClick={() => onAnswer(slide.id, { [index]: optIndex })}
                    className={`w-full p-3 text-right rounded-lg border transition-all ${
                      answers[slide.id]?.[index] === optIndex
                        ? 'border-cyber-blue bg-cyber-blue/20'
                        : 'border-gray-600 hover:border-cyber-blue'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Interactive Slide Component
const InteractiveSlide = ({ slide, onAnswer, answers }) => {
  if (slide.content.type === 'drag-drop') {
    return (
      <div className="max-w-6xl mx-auto">
        <DragDropExercise
          exercise={{
            title: slide.title,
            instructions: slide.content.instructions,
            items: slide.content.items,
            categories: slide.content.categories
          }}
          onComplete={(isCorrect) => onAnswer(slide.id, { isCorrect })}
        />
      </div>
    );
  }
  
  if (slide.content.type === 'matching') {
    return (
      <div className="max-w-6xl mx-auto">
        <MatchingExercise
          exercise={{
            title: slide.title,
            instructions: slide.content.instructions,
            pairs: slide.content.pairs.map((pair, index) => ({
              ...pair,
              correctMatch: index // Each pair matches with its corresponding index
            }))
          }}
          onComplete={(isCorrect) => onAnswer(slide.id, { isCorrect })}
        />
      </div>
    );
  }

  if (slide.content.type === 'multiple-choice') {
    return (
      <div className="max-w-6xl mx-auto">
        <MultipleChoiceExercise
          exercise={{
            title: slide.title,
            question: slide.content.question,
            content: slide.content.content,
            options: slide.content.options,
            correctAnswer: slide.content.correctAnswer,
            explanation: slide.content.explanation,
            hint: slide.content.hint
          }}
          onComplete={(isCorrect) => onAnswer(slide.id, { isCorrect })}
        />
      </div>
    );
  }
  
  // Default placeholder for other types
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">{slide.title}</h2>
      <p className="text-lg mb-8 text-gray-300">{slide.content.instructions}</p>
      <div className="bg-gray-800 p-8 rounded-lg">
        <p className="text-xl">פעילות אינטראקטיבית - {slide.content.type}</p>
        <p className="text-gray-400 mt-2">(תתפתח בקרוב)</p>
      </div>
    </div>
  );
};

// Break Slide Component
const BreakSlide = ({ slide }) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="text-6xl mb-6">☕</div>
      <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
      <p className="text-xl mb-8">{slide.content.message}</p>
      
      {slide.content.activity && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">{slide.content.activity.title}</h3>
          <p className="mb-4">{slide.content.activity.question}</p>
          <p className="text-sm text-gray-400">רמז: {slide.content.activity.hint}</p>
        </div>
      )}
    </div>
  );
};

// Reflection Slide Component
const ReflectionSlide = ({ slide, onAnswer, answers }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">{slide.title}</h2>
      
      <div className="space-y-6">
        {slide.content.questions.map((question, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg">
            <p className="text-lg mb-4">{question}</p>
            <textarea
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyber-blue"
              rows="4"
              placeholder="כתוב את התשובה שלך..."
              onChange={(e) => onAnswer(slide.id, { [index]: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveLesson; 