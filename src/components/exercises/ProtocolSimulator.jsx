import React, { useState, useEffect } from 'react';

const ProtocolSimulator = ({ content, onComplete }) => {
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(content.duration || 300);

  useEffect(() => {
    if (timeLeft > 0 && !isRunning) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      onComplete && onComplete();
    }
  }, [timeLeft, isRunning, onComplete]);

  const startSimulation = (protocol) => {
    setSelectedProtocol(protocol);
    setCurrentStep(0);
    setIsRunning(true);
  };

  const nextStep = () => {
    if (currentStep < selectedProtocol.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsRunning(false);
    }
  };

  const resetSimulation = () => {
    setSelectedProtocol(null);
    setCurrentStep(0);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="protocol-simulator bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">סימולטור פרוטוקולים</h3>
        <p className="text-gray-600 mb-4">{content.instructions}</p>
        <div className="text-sm text-gray-500">זמן נותר: {formatTime(timeLeft)}</div>
      </div>

      {!selectedProtocol ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {content.protocols.map((protocol) => (
            <button
              key={protocol.id}
              onClick={() => startSimulation(protocol)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <h4 className="text-lg font-semibold mb-2">{protocol.name}</h4>
              <p className="text-sm opacity-90">{protocol.description}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="simulation-area">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg mb-6">
            <h4 className="text-xl font-bold mb-2">{selectedProtocol.name}</h4>
            <p className="text-sm opacity-90 mb-4">{selectedProtocol.description}</p>
            
            <div className="steps-container">
              <h5 className="text-lg font-semibold mb-3">תהליך התקשורת:</h5>
              <div className="space-y-2">
                {selectedProtocol.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg transition-all duration-500 ${
                      index <= currentStep
                        ? 'bg-white text-green-600 font-semibold'
                        : 'bg-white bg-opacity-20 text-white'
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              {isRunning && currentStep < selectedProtocol.steps.length - 1 && (
                <button
                  onClick={nextStep}
                  className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  השלב הבא
                </button>
              )}
              <button
                onClick={resetSimulation}
                className="bg-white text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                התחל מחדש
              </button>
            </div>
          </div>

          {!isRunning && currentStep === selectedProtocol.steps.length - 1 && (
            <div className="text-center">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                <p className="font-semibold">הסימולציה הושלמה בהצלחה! 🎉</p>
                <p className="text-sm mt-1">למדת איך {selectedProtocol.name} עובד</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={() => onComplete && onComplete()}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          המשך לשיעור
        </button>
      </div>
    </div>
  );
};

export default ProtocolSimulator; 