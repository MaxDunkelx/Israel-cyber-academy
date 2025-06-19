import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Shuffle, ArrowRight } from 'lucide-react';

const MatchingExercise = ({ exercise, onComplete }) => {
  const pairs = exercise.pairs || [];
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const handleLeftClick = (index) => {
    if (isCompleted || matches[index] !== undefined) return;
    setSelectedLeft(index);
    setSelectedRight(null);
  };

  const handleRightClick = (index) => {
    if (isCompleted || Object.values(matches).includes(index)) return;
    setSelectedRight(index);
  };

  const makeMatch = () => {
    if (selectedLeft === null || selectedRight === null) return;

    const newMatches = { ...matches, [selectedLeft]: selectedRight };
    setMatches(newMatches);
    setSelectedLeft(null);
    setSelectedRight(null);

    // Check if this match is correct
    if (pairs[selectedLeft].correctMatch === selectedRight) {
      setScore(score + 1);
    }
  };

  const checkAnswer = () => {
    const correctMatches = Object.keys(matches).filter(
      leftIndex => pairs[leftIndex].correctMatch === matches[leftIndex]
    ).length;

    const isAllCorrect = correctMatches === pairs.length;
    setIsCorrect(isAllCorrect);
    setIsCompleted(true);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      onComplete(isAllCorrect);
    }, 3000);
  };

  const shuffleItems = () => {
    setMatches({});
    setSelectedLeft(null);
    setSelectedRight(null);
    setIsCompleted(false);
    setIsCorrect(false);
    setShowFeedback(false);
    setScore(0);
  };

  const getMatchedRightIndex = (leftIndex) => {
    return matches[leftIndex];
  };

  const isRightMatched = (rightIndex) => {
    return Object.values(matches).includes(rightIndex);
  };

  const isMatchCorrect = (leftIndex) => {
    const rightIndex = matches[leftIndex];
    return rightIndex !== undefined && pairs[leftIndex].correctMatch === rightIndex;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-cyber-blue mb-4">
          {exercise.title}
        </h3>
        <p className="text-xl text-cyber-blue leading-relaxed">
          {exercise.instructions}
        </p>
      </div>

      {/* Main Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Tools */}
        <div className="space-y-4">
          <h4 className="text-2xl font-bold text-cyber-purple text-center mb-4">
            כלי אבטחה
          </h4>
          <div className="space-y-3">
            {pairs.map((pair, index) => (
              <motion.div
                key={`left-${index}`}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedLeft === index
                    ? 'border-cyber-blue bg-blue-50 shadow-lg scale-105'
                    : matches[index] !== undefined
                    ? isMatchCorrect(index)
                      ? 'border-cyber-green bg-green-50'
                      : 'border-cyber-red bg-red-50'
                    : 'border-gray-300 bg-white hover:border-cyber-purple hover:bg-purple-50'
                }`}
                onClick={() => handleLeftClick(index)}
                whileHover={matches[index] === undefined ? { scale: 1.02 } : {}}
                whileTap={matches[index] === undefined ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{pair.icon}</span>
                  <span className="font-semibold text-gray-800 text-lg">
                    {pair.tool}
                  </span>
                  {matches[index] !== undefined && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto"
                    >
                      {isMatchCorrect(index) ? (
                        <CheckCircle className="h-6 w-6 text-cyber-green" />
                      ) : (
                        <XCircle className="h-6 w-6 text-cyber-red" />
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Descriptions */}
        <div className="space-y-4">
          <h4 className="text-2xl font-bold text-cyber-green text-center mb-4">
            תיאורים
          </h4>
          <div className="space-y-3">
            {pairs.map((pair, index) => (
              <motion.div
                key={`right-${index}`}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedRight === index
                    ? 'border-cyber-blue bg-blue-50 shadow-lg scale-105'
                    : isRightMatched(index)
                    ? 'border-gray-400 bg-gray-100 opacity-60'
                    : 'border-gray-300 bg-white hover:border-cyber-green hover:bg-green-50'
                }`}
                onClick={() => handleRightClick(index)}
                whileHover={!isRightMatched(index) ? { scale: 1.02 } : {}}
                whileTap={!isRightMatched(index) ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-800 text-lg">
                    {pair.description}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Match Button */}
      {selectedLeft !== null && selectedRight !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.button
            onClick={makeMatch}
            className="btn-primary flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="h-5 w-5" />
            התאם פריטים
          </motion.button>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 space-x-reverse pt-6">
        <motion.button
          onClick={shuffleItems}
          className="btn-secondary flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Shuffle className="h-5 w-5" />
          התחל מחדש
        </motion.button>
        
        <motion.button
          onClick={checkAnswer}
          disabled={isCompleted || Object.keys(matches).length !== pairs.length}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isCompleted && Object.keys(matches).length === pairs.length ? { scale: 1.05 } : {}}
          whileTap={!isCompleted && Object.keys(matches).length === pairs.length ? { scale: 0.95 } : {}}
        >
          <ArrowRight className="h-5 w-5" />
          בדוק תשובה
        </motion.button>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-6 rounded-xl ${
            isCorrect 
              ? 'bg-green-50 text-green-800 border-2 border-green-500' 
              : 'bg-red-50 text-red-800 border-2 border-red-500'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {isCorrect ? (
              <CheckCircle className="h-8 w-8" />
            ) : (
              <XCircle className="h-8 w-8" />
            )}
            <span className="text-2xl font-bold">
              {isCorrect ? 'מעולה! התאמה נכונה!' : 'נסה שוב!'}
            </span>
          </div>
          <p className="text-lg">
            {isCorrect 
              ? `ציון: ${score}/${pairs.length} - כל ההתאמות נכונות!`
              : `ציון: ${score}/${pairs.length} - בדוק שוב את ההתאמות שלך`
            }
          </p>
        </motion.div>
      )}

      {/* Progress Indicator */}
      {!isCompleted && (
        <div className="text-center">
          <p className="text-gray-600">
            {Object.keys(matches).length} / {pairs.length} התאמות הושלמו
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <motion.div 
              className="bg-cyber-blue h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(Object.keys(matches).length / pairs.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchingExercise; 