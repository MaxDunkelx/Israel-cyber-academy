import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const MatchingExercise = ({ exercise, onComplete }) => {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const leftItems = exercise.pairs.map(pair => pair.tool);
  const [shuffledRight, setShuffledRight] = useState(() => exercise.pairs.map(pair => pair.description).sort(() => Math.random() - 0.5));

  const handleLeftClick = (index) => {
    if (isCompleted) return;
    setSelectedLeft(selectedLeft === index ? null : index);
  };

  const handleRightClick = (index) => {
    if (isCompleted) return;
    setSelectedRight(selectedRight === index ? null : index);
  };

  const handleMatch = () => {
    if (selectedLeft === null || selectedRight === null) return;

    const newMatches = { ...matches };
    newMatches[selectedLeft] = selectedRight;
    setMatches(newMatches);

    setSelectedLeft(null);
    setSelectedRight(null);

    // Check if all matches are complete
    if (Object.keys(newMatches).length === leftItems.length) {
      checkAllMatches(newMatches);
    }
  };

  const checkAllMatches = (allMatches) => {
    const correctMatches = exercise.pairs.map((pair, index) => ({
      left: index,
      right: shuffledRight.indexOf(pair.description)
    }));

    const isAllCorrect = correctMatches.every(match => 
      allMatches[match.left] === match.right
    );

    setIsCorrect(isAllCorrect);
    setIsCompleted(true);

    setTimeout(() => {
      onComplete(isAllCorrect);
    }, 2000);
  };

  const resetExercise = () => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatches({});
    setIsCompleted(false);
    setIsCorrect(false);
  };

  const getItemClass = (index, side) => {
    const isSelected = side === 'left' ? selectedLeft === index : selectedRight === index;
    const isMatched = side === 'left' ? matches[index] !== undefined : Object.values(matches).includes(index);
    
    if (isCompleted) {
      const correctMatch = exercise.pairs.find((pair, i) => 
        side === 'left' ? i === index : pair.description === shuffledRight[index]
      );
      const isCorrectMatch = side === 'left' 
        ? matches[index] === shuffledRight.indexOf(correctMatch.description)
        : Object.entries(matches).some(([left, right]) => 
            right === index && left === exercise.pairs.findIndex(p => p.description === shuffledRight[index])
          );
      // Always visible, just color for correct/incorrect
      return isCorrectMatch 
        ? 'bg-cyber-green/10 text-cyber-blue border-cyber-green' 
        : 'bg-cyber-red/10 text-cyber-blue border-cyber-red';
    }
    
    if (isMatched) {
      // Matched but not completed: keep visible, blue border
      return 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue';
    }
    
    if (isSelected) {
      return 'bg-cyber-purple/10 text-cyber-blue border-cyber-purple';
    }
    
    return 'bg-white text-cyber-blue hover:bg-gray-50 border-gray-300';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          {exercise.title}
        </h3>
        <p className="text-lg text-white leading-relaxed">
          {exercise.instructions || 'התאם בין הרכיב לתפקיד שלו'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Components */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white text-center mb-4">רכיבים</h4>
          {leftItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => handleLeftClick(index)}
              disabled={isCompleted || matches[index] !== undefined}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-right text-cyber-blue ${
                getItemClass(index, 'left')
              } ${!isCompleted && matches[index] === undefined ? 'hover:shadow-md cursor-pointer' : 'cursor-default'}`}
              whileHover={!isCompleted && matches[index] === undefined ? { scale: 1.02 } : {}}
              whileTap={!isCompleted && matches[index] === undefined ? { scale: 0.98 } : {}}
            >
              <span className="font-medium text-lg text-cyber-blue">{item}</span>
            </motion.button>
          ))}
        </div>

        {/* Right Column - Functions */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white text-center mb-4">תפקידים</h4>
          {shuffledRight.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => handleRightClick(index)}
              disabled={isCompleted || Object.values(matches).includes(index)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-right text-cyber-blue ${
                getItemClass(index, 'right')
              } ${!isCompleted && !Object.values(matches).includes(index) ? 'hover:shadow-md cursor-pointer' : 'cursor-default'}`}
              whileHover={!isCompleted && !Object.values(matches).includes(index) ? { scale: 1.02 } : {}}
              whileTap={!isCompleted && !Object.values(matches).includes(index) ? { scale: 0.98 } : {}}
            >
              <span className="font-medium text-lg text-cyber-blue">{item}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Match Button */}
      {selectedLeft !== null && selectedRight !== null && !isCompleted && (
        <div className="text-center">
          <button
            onClick={handleMatch}
            className="btn-primary text-white"
          >
            התאם
          </button>
        </div>
      )}

      {/* Reset Button */}
      <div className="text-center">
        <button
          onClick={resetExercise}
          className="btn-secondary text-white"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          התחל מחדש
        </button>
      </div>

      {/* Progress */}
      <div className="text-center">
        <div className="text-lg font-semibold text-white mb-2">
          התאמות: {Object.keys(matches).length} / {leftItems.length}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-cyber-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${(Object.keys(matches).length / leftItems.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Result */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-6 rounded-lg ${
            isCorrect ? 'bg-cyber-green/10 text-white' : 'bg-cyber-red/10 text-white'
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            {isCorrect ? (
              <CheckCircle className="h-8 w-8 mr-3" />
            ) : (
              <XCircle className="h-8 w-8 mr-3" />
            )}
            <span className="text-xl font-bold">
              {isCorrect ? 'מעולה! כל ההתאמות נכונות!' : 'נסה שוב!'}
            </span>
          </div>
          
          {!isCorrect && (
            <div className="text-sm">
              <p className="mb-2">ההתאמות הנכונות:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {exercise.pairs.map((pair, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded">
                    <strong className="text-cyber-blue">{pair.tool}</strong> → <span className="text-cyber-blue">{pair.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MatchingExercise; 