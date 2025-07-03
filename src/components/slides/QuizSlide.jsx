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
      
      content.questions.forEach((question, questionIndex) => {
        const questionId = question.id || `question-${questionIndex}`;
        const correctAnswer = question.correctAnswer || question.correct;
        
        if (selectedAnswers[questionId] === correctAnswer) {
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
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-5xl w-full h-full flex flex-col">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" 
               style={{ textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 0 20px rgba(59,130,246,0.5)' }}>
            {slide.title}
          </h2>
          {content.description && (
            <p className="text-xl md:text-2xl text-blue-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" 
               style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              {content.description}
            </p>
          )}
        </div>

        {/* Content Container */}
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30 shadow-2xl flex-1 flex flex-col">
          {/* Questions */}
          <div className="space-y-8 flex-1 overflow-y-auto">
            {content.questions?.map((question, questionIndex) => (
              <div key={`question-${questionIndex}`} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  שאלה {questionIndex + 1}: {question.question}
                </h3>
                
                <div className="space-y-3">
                  {question.options?.map((option, optionIndex) => {
                    // Handle both string options and object options
                    const optionText = typeof option === 'string' ? option : option.text;
                    const optionId = typeof option === 'string' ? optionIndex : option.id;
                    const questionId = question.id || `question-${questionIndex}`;
                    const correctAnswer = question.correctAnswer || question.correct;
                    
                    return (
                      <button
                        key={`${questionId}-${optionId}`}
                        onClick={() => handleAnswerSelect(questionId, optionId)}
                        disabled={submitted}
                        className={`w-full p-5 rounded-2xl border-4 transition-all duration-300 text-right text-lg md:text-xl lg:text-2xl font-bold tracking-wide select-none focus:outline-none focus:ring-4 focus:ring-blue-400/50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                          selectedAnswers[questionId] === optionId
                            ? submitted && optionId === correctAnswer
                              ? 'bg-gradient-to-r from-green-600 to-emerald-600 border-green-400 text-white shadow-lg shadow-green-500/25'
                              : submitted && optionId !== correctAnswer
                              ? 'bg-gradient-to-r from-red-600 to-pink-600 border-red-400 text-white shadow-lg shadow-red-500/25'
                              : 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-400 text-white shadow-lg shadow-blue-500/25'
                            : submitted && optionId === correctAnswer
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 border-green-400 text-white shadow-lg shadow-green-500/25'
                            : 'bg-gray-700/80 border-gray-600 text-gray-300 hover:bg-gray-600/80 hover:text-white'
                        }`}
                        tabIndex={0}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg md:text-xl lg:text-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{optionText}</span>
                          {selectedAnswers[questionId] === optionId && (
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                              {submitted && optionId === correctAnswer ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : submitted && optionId !== correctAnswer ? (
                                <XCircle className="w-5 h-5 text-red-600" />
                              ) : (
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                              )}
                            </div>
                          )}
                          {submitted && optionId === correctAnswer && selectedAnswers[questionId] !== optionId && (
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
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
                className={`px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] ${
                  !isAllAnswered
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-2xl shadow-green-500/25'
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
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">התוצאה שלך:</h3>
                <div className="text-5xl font-bold text-yellow-400 mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">{score}%</div>
                <p className="text-xl text-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {score >= 90 ? 'מצוין!' : score >= 80 ? 'טוב מאוד!' : score >= 70 ? 'טוב!' : 'נסה שוב!'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSlide; 