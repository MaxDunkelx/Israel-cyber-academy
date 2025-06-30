import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Shuffle, ArrowRight } from 'lucide-react';

const MatchingExercise = ({ exercise, onComplete }) => {
  // Extract data from exercise prop
  const pairs = exercise?.pairs || [];
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  // For matching exercises, each tool should match with its own description
  // So the correct match is the same index
  const getCorrectMatch = (leftIndex) => leftIndex;

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
    if (getCorrectMatch(selectedLeft) === selectedRight) {
      setScore(score + 1);
    }
  };

  const checkAnswer = () => {
    const correctMatches = Object.keys(matches).filter(
      leftIndex => getCorrectMatch(parseInt(leftIndex)) === matches[leftIndex]
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
    return rightIndex !== undefined && getCorrectMatch(leftIndex) === rightIndex;
  };

  // Helper function to get the appropriate text based on data structure
  const getLeftText = (pair) => {
    return pair.tool || pair.left || pair.command || 'פריט';
  };

  const getRightText = (pair) => {
    return pair.description || pair.right || 'תיאור';
  };

  const getLeftIcon = (pair) => {
    return pair.icon || '💻';
  };

  // Determine column headers based on data structure
  const getLeftHeader = () => {
    if (pairs.length > 0) {
      if (pairs[0].tool) return 'כלי אבטחה';
      if (pairs[0].command) return 'פקודות';
      return 'פקודות';
    }
    return 'פריטים';
  };

  const getRightHeader = () => {
    if (pairs.length > 0) {
      if (pairs[0].description) return 'תיאורים';
      return 'תיאורים';
    }
    return 'תיאורים';
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto h-full flex flex-col">
      {/* Main Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Left Column - Tools */}
        <div className="space-y-3">
          <h4 className="text-xl font-bold text-purple-300 text-center mb-3">
            {getLeftHeader()}
          </h4>
          <div className="space-y-2">
            {pairs.map((pair, index) => (
              <motion.div
                key={`left-${index}`}
                className={`p-5 rounded-2xl border-4 cursor-pointer transition-all duration-200 text-lg md:text-xl lg:text-2xl font-bold tracking-wide select-none focus:outline-none focus:ring-4 focus:ring-blue-400/50 ${
                  selectedLeft === index
                    ? 'border-blue-400 bg-blue-800/60 shadow-2xl scale-105'
                    : matches[index] !== undefined
                    ? isMatchCorrect(index)
                      ? 'border-green-400 bg-green-800/40'
                      : 'border-red-400 bg-red-800/40'
                    : 'border-gray-600 bg-gray-700/80 hover:border-purple-400 hover:bg-purple-800/40 hover:scale-105'
                }`}
                onClick={() => handleLeftClick(index)}
                whileHover={matches[index] === undefined ? { scale: 1.02 } : {}}
                whileTap={matches[index] === undefined ? { scale: 0.98 } : {}}
                tabIndex={0}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl md:text-3xl">{getLeftIcon(pair)}</span>
                  <span className="font-semibold text-white text-lg md:text-xl lg:text-2xl">
                    {getLeftText(pair)}
                  </span>
                  {matches[index] !== undefined && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto"
                    >
                      {isMatchCorrect(index) ? (
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-400" />
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Descriptions */}
        <div className="space-y-3">
          <h4 className="text-xl font-bold text-green-300 text-center mb-3">
            {getRightHeader()}
          </h4>
          <div className="space-y-2">
            {pairs.map((pair, index) => (
              <motion.div
                key={`right-${index}`}
                className={`p-5 rounded-2xl border-4 cursor-pointer transition-all duration-200 text-lg md:text-xl lg:text-2xl font-bold tracking-wide select-none focus:outline-none focus:ring-4 focus:ring-green-400/50 ${
                  selectedRight === index
                    ? 'border-blue-400 bg-blue-800/60 shadow-2xl scale-105'
                    : isRightMatched(index)
                    ? 'border-gray-500 bg-gray-600/60 opacity-60'
                    : 'border-gray-600 bg-gray-700/80 hover:border-green-400 hover:bg-green-800/40 hover:scale-105'
                }`}
                onClick={() => handleRightClick(index)}
                whileHover={!isRightMatched(index) ? { scale: 1.02 } : {}}
                whileTap={!isRightMatched(index) ? { scale: 0.98 } : {}}
                tabIndex={0}
              >
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-white text-lg md:text-xl lg:text-2xl">
                    {getRightText(pair)}
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
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg border border-blue-500 hover:border-blue-400 transition-all duration-200 flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="h-5 w-5" />
            התאם פריטים
          </motion.button>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 space-x-reverse pt-4">
        <motion.button
          onClick={shuffleItems}
          className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-200 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Shuffle className="h-5 w-5" />
          התחל מחדש
        </motion.button>
        
        <motion.button
          onClick={checkAnswer}
          disabled={Object.keys(matches).length !== pairs.length}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg border border-blue-500 hover:border-blue-400 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={Object.keys(matches).length === pairs.length ? { scale: 1.05 } : {}}
          whileTap={Object.keys(matches).length === pairs.length ? { scale: 0.95 } : {}}
        >
          <CheckCircle className="h-5 w-5" />
          בדוק תשובות
        </motion.button>
      </div>

      {/* Progress */}
      <div className="text-center">
        <p className="text-base text-gray-300">
          התאמות: {Object.keys(matches).length} / {pairs.length}
        </p>
        {score > 0 && (
          <p className="text-base text-green-400 font-semibold">
            נכון: {score} / {Object.keys(matches).length}
          </p>
        )}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-6 rounded-xl border-2 ${
            isCorrect 
              ? 'bg-green-900/30 text-green-200 border-green-500' 
              : 'bg-red-900/30 text-red-200 border-red-500'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {isCorrect ? (
              <CheckCircle className="h-8 w-8" />
            ) : (
              <XCircle className="h-8 w-8" />
            )}
            <span className="text-2xl font-bold">
              {isCorrect ? 'מעולה! כל ההתאמות נכונות!' : 'נסה שוב!'}
            </span>
          </div>
          <p className="text-lg">
            {isCorrect 
              ? 'כל הכבוד! הצלחת להתאים את כל הכלים לתיאורים הנכונים שלהם!' 
              : 'יש כמה התאמות שגויות. נסה שוב!'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MatchingExercise; 