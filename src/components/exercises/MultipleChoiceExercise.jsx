import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Lightbulb, ArrowRight } from 'lucide-react';

const MultipleChoiceExercise = ({ exercise, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (answerId) => {
    if (isAnswered) return;
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === exercise.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      onComplete(correct);
    }, 3000);
  };

  const getAnswerClass = (optionId) => {
    if (!isAnswered) {
      return selectedAnswer === optionId
        ? 'border-cyber-blue bg-blue-50'
        : 'border-gray-300 bg-white hover:border-cyber-blue hover:bg-blue-50';
    }

    if (optionId === exercise.correctAnswer) {
      return 'border-cyber-green bg-green-50';
    }

    if (optionId === selectedAnswer && optionId !== exercise.correctAnswer) {
      return 'border-cyber-red bg-red-50';
    }

    return 'border-gray-300 bg-gray-50 opacity-60';
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-cyber-blue mb-4">
          {exercise.title}
        </h3>
        {exercise.question && (
          <p className="text-xl text-cyber-blue leading-relaxed mb-6">
            {exercise.question}
          </p>
        )}
      </div>

      {/* Content */}
      {exercise.content && (
        <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
          {exercise.content.image && (
            <img 
              src={exercise.content.image} 
              alt={exercise.content.text || "תמונה"} 
              className="w-full max-w-md mx-auto rounded-lg mb-4"
            />
          )}
          {exercise.content.text && (
            <p className="text-lg text-gray-700 text-center">
              {exercise.content.text}
            </p>
          )}
        </div>
      )}

      {/* Answer Options */}
      <div className="space-y-3">
        {exercise.options.map((option, index) => (
          <motion.div
            key={option.id}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              getAnswerClass(option.id)
            }`}
            onClick={() => handleAnswerSelect(option.id)}
            whileHover={!isAnswered ? { scale: 1.02 } : {}}
            whileTap={!isAnswered ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-lg ${
                selectedAnswer === option.id
                  ? 'border-cyber-blue bg-cyber-blue text-white'
                  : 'border-gray-300 bg-white text-gray-600'
              }`}>
                {String.fromCharCode(65 + index)} {/* A, B, C, D */}
              </div>
              <div className="flex items-center gap-3 flex-1">
                {option.icon && (
                  <span className="text-2xl">{option.icon}</span>
                )}
                <span className="font-semibold text-gray-800 text-lg">
                  {option.text}
                </span>
              </div>
              {isAnswered && option.id === exercise.correctAnswer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <CheckCircle className="h-6 w-6 text-cyber-green" />
                </motion.div>
              )}
              {isAnswered && option.id === selectedAnswer && option.id !== exercise.correctAnswer && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <XCircle className="h-6 w-6 text-cyber-red" />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hint */}
      {exercise.hint && (
        <div className="text-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 mx-auto text-cyber-purple hover:text-purple-700 transition-colors"
          >
            <Lightbulb className="h-5 w-5" />
            <span className="font-medium">רמז</span>
          </button>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg"
            >
              <p className="text-yellow-800 font-medium">{exercise.hint}</p>
            </motion.div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center">
        <motion.button
          onClick={handleSubmit}
          disabled={!selectedAnswer || isAnswered}
          className="btn-primary flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={selectedAnswer && !isAnswered ? { scale: 1.05 } : {}}
          whileTap={selectedAnswer && !isAnswered ? { scale: 0.95 } : {}}
        >
          <ArrowRight className="h-5 w-5" />
          שלח תשובה
        </motion.button>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-6 rounded-xl border-2 ${
            isCorrect 
              ? 'bg-green-50 text-green-800 border-green-500' 
              : 'bg-red-50 text-red-800 border-red-500'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {isCorrect ? (
              <CheckCircle className="h-8 w-8" />
            ) : (
              <XCircle className="h-8 w-8" />
            )}
            <span className="text-2xl font-bold">
              {isCorrect ? 'מעולה! תשובה נכונה!' : 'נסה שוב!'}
            </span>
          </div>
          {exercise.explanation && (
            <p className="text-lg">
              {exercise.explanation}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MultipleChoiceExercise; 