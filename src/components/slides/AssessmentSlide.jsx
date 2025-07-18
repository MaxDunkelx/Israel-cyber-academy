/**
 * Assessment Slide Component - Unified Assessment Interface
 * Combines poll, quiz, and reflection functionality into one component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onAnswer - Answer submission handler
 * @param {Object} props.answers - Current answers state
 */
import { useState, useEffect } from 'react';
import { CheckCircle, MessageSquare, Target, Star, Send } from 'lucide-react';

const AssessmentSlide = ({ slide, onAnswer, answers }) => {
  const { content } = slide;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  // Reset state when slide changes
  useEffect(() => {
    setSelectedAnswer(null);
    setTextInput('');
    setSubmitted(false);
    setShowResults(false);
    setIsCorrect(null);
  }, [slide.id]);

  const handleSubmit = () => {
    if (!submitted) {
      setSubmitted(true);
      
      let result = {};
      
      switch (content.assessmentType) {
        case 'poll':
          result = { selected: selectedAnswer, type: 'poll' };
          setShowResults(true);
          break;
        case 'quiz':
          const correct = content.options.find(opt => opt.id === selectedAnswer)?.correct || false;
          setIsCorrect(correct);
          result = { selected: selectedAnswer, correct, type: 'quiz' };
          setShowResults(true);
          break;
        case 'reflection':
          result = { text: textInput, type: 'reflection' };
          break;
        default:
          result = { selected: selectedAnswer, text: textInput, type: 'assessment' };
      }
      
      if (onAnswer) {
        onAnswer(slide.id, result);
      }
    }
  };

  const renderPollContent = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-8">{content.question}</h2>
      
      {!submitted ? (
        <div className="space-y-4">
          {content.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                selectedAnswer === option
                  ? 'border-blue-400 bg-blue-500/20'
                  : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  {selectedAnswer === option && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-lg">{option}</span>
              </div>
            </button>
          ))}
          
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-colors"
          >
            שלח תשובה
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">תודה על התשובה!</h3>
            <p className="text-gray-300">התשובה שלך נשלחה בהצלחה</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderQuizContent = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-8">{content.question}</h2>
      
      {!submitted ? (
        <div className="space-y-4">
          {content.options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => setSelectedAnswer(option.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                selectedAnswer === option.id
                  ? 'border-blue-400 bg-blue-500/20'
                  : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  {selectedAnswer === option.id && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-lg">{option.text}</span>
              </div>
            </button>
          ))}
          
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-colors"
          >
            בדוק תשובה
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            {isCorrect ? (
              <>
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-400 mb-2">נכון! 🎉</h3>
                <p className="text-gray-300">תשובה נכונה</p>
              </>
            ) : (
              <>
                <Target className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-400 mb-2">לא נכון</h3>
                <p className="text-gray-300">נסה שוב בפעם הבאה</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderReflectionContent = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-8">{content.question}</h2>
      
      {!submitted ? (
        <div className="space-y-4">
          <p className="text-gray-300 text-lg mb-4">{content.prompt}</p>
          
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="כתוב את המחשבות שלך כאן..."
            className="w-full h-32 p-4 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none focus:border-blue-400 focus:outline-none"
          />
          
          <button
            onClick={handleSubmit}
            disabled={!textInput.trim()}
            className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-colors"
          >
            שלח הרהור
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">תודה על השיתוף!</h3>
            <p className="text-gray-300">ההרהור שלך נשמר בהצלחה</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4">
      <div className="w-full max-w-4xl flex flex-col">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">{slide.title}</h1>
            {content.description && (
              <p className="text-gray-300 text-lg">{content.description}</p>
            )}
          </div>
          
          {content.assessmentType === 'poll' && renderPollContent()}
          {content.assessmentType === 'quiz' && renderQuizContent()}
          {content.assessmentType === 'reflection' && renderReflectionContent()}
        </div>
      </div>
    </div>
  );
};

export default AssessmentSlide; 