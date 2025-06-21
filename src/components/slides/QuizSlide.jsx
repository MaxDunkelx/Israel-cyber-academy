import { useState } from 'react';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';

/**
 * Quiz Slide Component
 * Renders quiz and assessment slides
 * 
 * @param {Object} props - Component props
 * @param {Object} props.slide - Slide data
 * @param {Function} props.onAnswer - Answer submission handler
 * @param {Object} props.answers - Current answers state
 */
const QuizSlide = ({ slide, onAnswer, answers }) => {
  const { content } = slide;
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionId, answerId) => {
    if (submitted) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length === content.questions.length) {
      let correctCount = 0;
      
      content.questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctCount++;
        }
      });
      
      const finalScore = Math.round((correctCount / content.questions.length) * 100);
      setScore(finalScore);
      setSubmitted(true);
      onAnswer(slide.id, { 
        answers: selectedAnswers, 
        score: finalScore, 
        isCorrect: finalScore >= 70 
      });
    }
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === content.questions.length;

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center p-4" style={{ minHeight: '500px' }}>
      <div className="max-w-4xl w-full h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-4 flex-shrink-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            {slide.title}
          </h2>
          <p className="text-base md:text-lg text-gray-200" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            {content.description}
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-3 flex-1 overflow-y-auto">
          {content.questions?.map((question, questionIndex) => (
            <div key={question.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <h3 className="text-base font-bold text-white mb-2">
                שאלה {questionIndex + 1}: {question.question}
              </h3>
              
              <div className="space-y-1">
                {question.options?.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(question.id, option.id)}
                    disabled={submitted}
                    className={`w-full p-2 rounded-lg border-2 transition-all duration-300 text-right ${
                      selectedAnswers[question.id] === option.id
                        ? submitted && option.id === question.correctAnswer
                          ? 'bg-green-600/20 border-green-500 text-green-400'
                          : submitted && option.id !== question.correctAnswer
                          ? 'bg-red-600/20 border-red-500 text-red-400'
                          : 'bg-blue-600/20 border-blue-500 text-blue-400'
                        : submitted && option.id === question.correctAnswer
                        ? 'bg-green-600/20 border-green-500 text-green-400'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{option.text}</span>
                      {selectedAnswers[question.id] === option.id && (
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          {submitted && option.id === question.correctAnswer ? (
                            <CheckCircle className="w-2 h-2 text-green-600" />
                          ) : submitted && option.id !== question.correctAnswer ? (
                            <XCircle className="w-2 h-2 text-red-600" />
                          ) : (
                            <CheckCircle className="w-2 h-2 text-blue-600" />
                          )}
                        </div>
                      )}
                      {submitted && option.id === question.correctAnswer && selectedAnswers[question.id] !== option.id && (
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <CheckCircle className="w-2 h-2 text-green-600" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        {!submitted && (
          <div className="text-center mt-3 flex-shrink-0">
            <button
              onClick={handleSubmit}
              disabled={!isAllAnswered}
              className={`px-4 py-2 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-105 ${
                !isAllAnswered
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 shadow-2xl'
              }`}
            >
              שלח תשובות
            </button>
          </div>
        )}

        {/* Results */}
        {submitted && (
          <div className="mt-3 text-center flex-shrink-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="w-12 h-12 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl mb-3">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">התוצאה שלך:</h3>
              <div className="text-3xl font-bold text-yellow-400 mb-2">{score}%</div>
              <p className="text-base text-gray-200">
                {score >= 90 ? 'מצוין!' : score >= 80 ? 'טוב מאוד!' : score >= 70 ? 'טוב!' : 'נסה שוב!'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSlide; 