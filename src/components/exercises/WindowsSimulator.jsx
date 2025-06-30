import { useState } from 'react';
import { CheckCircle, XCircle, Settings, Folder, File, Monitor, Shield } from 'lucide-react';

/**
 * Windows Simulator Exercise Component
 * 
 * This component creates an interactive Windows management simulation where users
 * can perform various Windows tasks and earn points.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.exercise - Exercise configuration data
 * @param {Function} props.onComplete - Callback when exercise is completed
 */
const WindowsSimulator = ({ exercise, onComplete }) => {
  const [currentBudget, setCurrentBudget] = useState(exercise.budget || 100);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', isPositive: true });

  const handleTaskAction = (taskId, action, points) => {
    if (currentBudget < points) {
      setFeedback({
        message: 'אין לך מספיק נקודות לביצוע פעולה זו!',
        isPositive: false
      });
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 3000);
      return;
    }

    // Deduct points
    setCurrentBudget(prev => prev - points);
    
    // Add to completed tasks
    setCompletedTasks(prev => [...prev, { taskId, action, points }]);
    
    // Show positive feedback
    setFeedback({
      message: `פעולה הושלמה בהצלחה! קיבלת ${points} נקודות`,
      isPositive: true
    });
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);

    // Check if all tasks are completed
    const totalTasks = exercise.tasks.reduce((sum, task) => sum + task.options.length, 0);
    if (completedTasks.length + 1 >= totalTasks) {
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    }
  };

  const getTaskIcon = (taskId) => {
    switch (taskId) {
      case 'desktop':
        return <Monitor className="h-6 w-6" />;
      case 'files':
        return <Folder className="h-6 w-6" />;
      case 'settings':
        return <Settings className="h-6 w-6" />;
      case 'performance':
        return <Shield className="h-6 w-6" />;
      default:
        return <File className="h-6 w-6" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col">
      {/* Budget Display */}
      <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-300 text-sm">נהל את המחשב הווירטואלי שלך</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-400">{currentBudget}</div>
            <div className="text-xs text-gray-400">נקודות זמינות</div>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {exercise.tasks.map((task) => (
          <div key={task.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-3">
              {getTaskIcon(task.id)}
              <div>
                <h4 className="text-base font-semibold text-white">{task.name}</h4>
                <p className="text-xs text-gray-400">{task.description}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {task.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleTaskAction(task.id, option.action, option.points)}
                  disabled={currentBudget < option.points}
                  className="w-full flex justify-between items-center p-2 rounded-lg bg-gray-700/30 hover:bg-gray-600/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-600/30 hover:border-gray-500/50"
                >
                  <span className="text-white text-sm">{option.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{option.points} נקודות</span>
                    {completedTasks.some(ct => ct.taskId === task.id && ct.action === option.action) && (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          feedback.isPositive ? 'bg-green-600/90' : 'bg-red-600/90'
        }`}>
          <div className="flex items-center gap-2">
            {feedback.isPositive ? (
              <CheckCircle className="h-5 w-5 text-white" />
            ) : (
              <XCircle className="h-5 w-5 text-white" />
            )}
            <span className="text-white font-medium">{feedback.message}</span>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="mt-4 bg-gray-700/30 rounded-lg p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium text-sm">התקדמות</span>
          <span className="text-gray-400 text-sm">
            {completedTasks.length} / {exercise.tasks.reduce((sum, task) => sum + task.options.length, 0)}
          </span>
        </div>
        <div className="w-full bg-gray-600/50 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(completedTasks.length / exercise.tasks.reduce((sum, task) => sum + task.options.length, 0)) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WindowsSimulator; 