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
    <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center p-8" style={{ minHeight: '500px' }}>
      <div className="max-w-4xl w-full h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            {slide.title}
          </h2>
          <p className="text-xl text-gray-200" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            {content.description}
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-8 flex-1 overflow-y-auto">
          {content.questions?.map((question, questionIndex) => (
            <div key={question.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">
                שאלה {questionIndex + 1}: {question.question}
              </h3>
              
              <div className="space-y-3">
                {question.options?.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(question.id, option.id)}
                    disabled={submitted}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-right ${
                      selectedAnswers[question.id] === option.id
                        ? submitted && option.id === question.correctAnswer
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 border-green-400 text-white'
                          : submitted && option.id !== question.correctAnswer
                          ? 'bg-gradient-to-r from-red-600 to-pink-600 border-red-400 text-white'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-400 text-white'
                        : submitted && option.id === question.correctAnswer
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 border-green-400 text-white'
                        : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.text}</span>
                      {selectedAnswers[question.id] === option.id && (
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          {submitted && option.id === question.correctAnswer ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : submitted && option.id !== question.correctAnswer ? (
                            <XCircle className="w-4 h-4 text-red-600" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                      )}
                      {submitted && option.id === question.correctAnswer && selectedAnswers[question.id] !== option.id && (
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
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
          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              disabled={!isAllAnswered}
              className={`px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                !isAllAnswered
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-2xl'
              }`}
            >
              שלח תשובות
            </button>
          </div>
        )}

        {/* Results */}
        {submitted && (
          <div className="mt-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">התוצאה שלך:</h3>
              <div className="text-5xl font-bold text-yellow-400 mb-4">{score}%</div>
              <p className="text-xl text-gray-200">
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