import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Lightbulb, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const MultipleChoiceExercise = ({ exercise, onComplete }) => {
  // Check if this is a quiz (multiple questions) or single question
  const isQuiz = exercise?.questions && exercise.questions.length > 1;
  
  // For quiz mode
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  
  // For single question mode
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Get current question data
  const currentQuestion = isQuiz ? exercise.questions[currentQuestionIndex] : exercise;
  const totalQuestions = isQuiz ? exercise.questions.length : 1;

  const handleAnswerSelect = (answerId) => {
    if (isQuiz) {
      if (quizCompleted) return;
      setQuizAnswers(prev => ({ ...prev, [currentQuestionIndex]: answerId }));
    } else {
      if (isAnswered) return;
      setSelectedAnswer(answerId);
    }
  };

  const handleSubmit = () => {
    if (isQuiz) {
      // Calculate quiz score
      let score = 0;
      exercise.questions.forEach((question, index) => {
        if (quizAnswers[index] === question.correctAnswer) {
          score++;
        }
      });
      setQuizScore(score);
      setQuizCompleted(true);
      
      setTimeout(() => {
        onComplete(score === totalQuestions);
      }, 3000);
    } else {
      // Single question mode
      if (!selectedAnswer) return;

      const correct = selectedAnswer === exercise.correctAnswer;
      setIsCorrect(correct);
      setIsAnswered(true);
      setShowFeedback(true);

      setTimeout(() => {
        setShowFeedback(false);
        onComplete(correct);
      }, 3000);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getAnswerClass = (optionId) => {
    if (isQuiz) {
      if (quizCompleted) {
        if (optionId === currentQuestion.correctAnswer) {
          return 'border-green-400 bg-green-800/30';
        }
        if (optionId === quizAnswers[currentQuestionIndex] && optionId !== currentQuestion.correctAnswer) {
          return 'border-red-400 bg-red-800/30';
        }
        return 'border-gray-600 bg-gray-600/50 opacity-60';
      }
      
      return quizAnswers[currentQuestionIndex] === optionId
        ? 'border-blue-400 bg-blue-800/50'
        : 'border-gray-600 bg-gray-700/50 hover:border-blue-400 hover:bg-blue-800/30';
    } else {
      // Single question mode (original logic)
      if (!isAnswered) {
        return selectedAnswer === optionId
          ? 'border-blue-400 bg-blue-800/50'
          : 'border-gray-600 bg-gray-700/50 hover:border-blue-400 hover:bg-blue-800/30';
      }

      if (optionId === exercise.correctAnswer) {
        return 'border-green-400 bg-green-800/30';
      }

      if (optionId === selectedAnswer && optionId !== exercise.correctAnswer) {
        return 'border-red-400 bg-red-800/30';
      }

      return 'border-gray-600 bg-gray-600/50 opacity-60';
    }
  };

  // Quiz completion feedback
  if (isQuiz && quizCompleted) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-4">חידון הושלם!</h3>
          <div className="bg-green-900/30 border-2 border-green-500 rounded-xl p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="h-12 w-12 text-green-400" />
              <span className="text-3xl font-bold text-green-200">
                ציון: {quizScore} / {totalQuestions}
              </span>
            </div>
            <p className="text-xl text-green-200">
              {quizScore === totalQuestions 
                ? 'מעולה! כל התשובות נכונות!' 
                : `כל הכבוד! ${quizScore} תשובות נכונות מתוך ${totalQuestions}`
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto h-full flex flex-col">
      {/* Quiz Navigation */}
      {isQuiz && !quizCompleted && (
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
            קודם
          </button>
          <span className="text-gray-300">
            {currentQuestionIndex + 1} / {totalQuestions}
          </span>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === totalQuestions - 1}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            הבא
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Question Content */}
      <div className="text-center mb-6">
        {currentQuestion?.image && (
          <div className="mb-4">
            <img
              src={currentQuestion.image}
              alt="Question"
              className="mx-auto max-w-full h-auto rounded-lg shadow-lg"
              style={{ maxHeight: '300px' }}
            />
          </div>
        )}
        
        {currentQuestion?.text && (
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 leading-relaxed">
              {currentQuestion.text}
            </h3>
            {currentQuestion?.options && currentQuestion.options.length === 4 && (
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-3 mb-3">
                <p className="text-blue-200 font-semibold text-base md:text-lg">
                  בחר תשובה אחת מתוך 4 אפשרויות
                </p>
              </div>
            )}
            {currentQuestion?.subtext && (
              <p className="text-gray-300 text-base md:text-lg">
                {currentQuestion.subtext}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-2 flex-1">
        {currentQuestion?.options?.map((option, index) => {
          // Handle both string options and object options
          const optionText = typeof option === 'string' ? option : option.text;
          const optionId = option.id || index;
          
          return (
            <motion.div
              key={optionId}
              className={`p-5 rounded-2xl border-4 cursor-pointer transition-all duration-200 text-lg md:text-xl lg:text-2xl font-bold tracking-wide select-none focus:outline-none focus:ring-4 focus:ring-blue-400/50 ${
                getAnswerClass(optionId)
              }`}
              onClick={() => handleAnswerSelect(optionId)}
              whileHover={!isAnswered && !quizCompleted ? { scale: 1.05 } : {}}
              whileTap={!isAnswered && !quizCompleted ? { scale: 0.97 } : {}}
              tabIndex={0}
            >
              <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center font-bold text-xl md:text-2xl lg:text-3xl ${
                (isQuiz ? quizAnswers[currentQuestionIndex] : selectedAnswer) === optionId
                  ? 'border-blue-400 bg-blue-400 text-white'
                  : 'border-gray-500 bg-gray-600 text-gray-300'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <div className="flex items-center gap-4 flex-1">
                {typeof option === 'object' && option.icon && (
                  <span className="text-2xl md:text-3xl">{option.icon}</span>
                )}
                <span className="font-semibold text-white text-lg md:text-xl lg:text-2xl">
                  {optionText}
                </span>
              </div>
              {((isQuiz && quizCompleted) || (!isQuiz && isAnswered)) && optionId === currentQuestion.correctAnswer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </motion.div>
              )}
              {((isQuiz && quizCompleted) || (!isQuiz && isAnswered)) && optionId === (isQuiz ? quizAnswers[currentQuestionIndex] : selectedAnswer) && optionId !== currentQuestion.correctAnswer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <XCircle className="h-5 w-5 text-red-400" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Hint */}
      {currentQuestion?.hint && (
        <div className="text-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 mx-auto text-purple-300 hover:text-purple-200 transition-colors"
          >
            <Lightbulb className="h-4 w-4" />
            <span className="font-medium text-sm">רמז</span>
          </button>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 p-3 bg-yellow-900/30 border-2 border-yellow-500 rounded-lg"
            >
              <p className="text-yellow-200 font-medium text-sm">{currentQuestion.hint}</p>
            </motion.div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center">
        {isQuiz ? (
          <motion.button
            onClick={handleSubmit}
            disabled={Object.keys(quizAnswers).length !== totalQuestions}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg border border-blue-500 hover:border-blue-400 transition-all duration-200 flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={Object.keys(quizAnswers).length === totalQuestions ? { scale: 1.05 } : {}}
            whileTap={Object.keys(quizAnswers).length === totalQuestions ? { scale: 0.95 } : {}}
          >
            <ArrowRight className="h-5 w-5" />
            סיים חידון
          </motion.button>
        ) : (
          <motion.button
            onClick={handleSubmit}
            disabled={!selectedAnswer || isAnswered}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg border border-blue-500 hover:border-blue-400 transition-all duration-200 flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={selectedAnswer && !isAnswered ? { scale: 1.05 } : {}}
            whileTap={selectedAnswer && !isAnswered ? { scale: 0.95 } : {}}
          >
            <ArrowRight className="h-5 w-5" />
            שלח תשובה
          </motion.button>
        )}
      </div>

      {/* Feedback for single question */}
      {!isQuiz && showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-4 rounded-xl border-2 ${
            isCorrect 
              ? 'bg-green-900/30 text-green-200 border-green-500' 
              : 'bg-red-900/30 text-red-200 border-red-500'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            {isCorrect ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <XCircle className="h-6 w-6" />
            )}
            <span className="text-xl font-bold">
              {isCorrect ? 'מעולה! תשובה נכונה!' : 'נסה שוב!'}
            </span>
          </div>
          {currentQuestion?.explanation && (
            <p className="text-base">
              {currentQuestion.explanation}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MultipleChoiceExercise; 