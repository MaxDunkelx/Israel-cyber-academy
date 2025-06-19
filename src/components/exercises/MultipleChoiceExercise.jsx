import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const MultipleChoiceExercise = ({ exercise, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === exercise.correct;
    setIsCorrect(correct);
    setIsAnswered(true);
    
    setTimeout(() => {
      onComplete(correct);
    }, 1500);
  };

  const getAnswerClass = (answerIndex) => {
    if (!isAnswered) {
      return selectedAnswer === answerIndex 
        ? 'bg-cyber-blue text-white border-cyber-blue' 
        : 'bg-white hover:bg-gray-50 border-gray-300';
    }
    
    if (answerIndex === exercise.correct) {
      return 'bg-cyber-green text-white border-cyber-green';
    }
    
    if (answerIndex === selectedAnswer && answerIndex !== exercise.correct) {
      return 'bg-cyber-red text-white border-cyber-red';
    }
    
    return 'bg-gray-100 text-gray-500 border-gray-300';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          שאלה
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          {exercise.question}
        </p>
      </div>

      <div className="space-y-3">
        {exercise.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-right ${
              getAnswerClass(index)
            } ${!isAnswered ? 'hover:shadow-md cursor-pointer' : 'cursor-default'}`}
            whileHover={!isAnswered ? { scale: 1.02 } : {}}
            whileTap={!isAnswered ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {isAnswered && index === exercise.correct && (
                  <CheckCircle className="h-5 w-5 text-white mr-3" />
                )}
                {isAnswered && index === selectedAnswer && index !== exercise.correct && (
                  <XCircle className="h-5 w-5 text-white mr-3" />
                )}
                <span className="font-medium text-lg">
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              </div>
              
              {!isAnswered && selectedAnswer === index && (
                <div className="w-4 h-4 bg-cyber-blue rounded-full"></div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-4 rounded-lg ${
            isCorrect ? 'bg-cyber-green/10 text-cyber-green' : 'bg-cyber-red/10 text-cyber-red'
          }`}
        >
          <div className="flex items-center justify-center mb-2">
            {isCorrect ? (
              <CheckCircle className="h-6 w-6 mr-2" />
            ) : (
              <XCircle className="h-6 w-6 mr-2" />
            )}
            <span className="font-bold text-lg">
              {isCorrect ? 'תשובה נכונה!' : 'תשובה שגויה'}
            </span>
          </div>
          <p className="text-sm">
            {isCorrect 
              ? 'כל הכבוד! המשך כך!' 
              : `התשובה הנכונה היא: ${exercise.options[exercise.correct]}`
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MultipleChoiceExercise; 