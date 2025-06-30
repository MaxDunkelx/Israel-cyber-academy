import React, { useState, useRef, useEffect } from 'react';

const LinuxSimulator = ({ commands = [], instructions = 'Try Linux commands in this safe simulator', onComplete }) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [outputHistory, setOutputHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef(null);

  // Ensure commands is always an array
  const safeCommands = Array.isArray(commands) ? commands : [];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    const newHistory = [...commandHistory, currentCommand];
    setCommandHistory(newHistory);

    // Find matching command
    const matchingCommand = safeCommands.find(cmd => 
      cmd.command.toLowerCase() === currentCommand.toLowerCase()
    );

    if (matchingCommand) {
      setOutputHistory([...outputHistory, {
        command: currentCommand,
        output: matchingCommand.output,
        description: matchingCommand.description,
        success: true
      }]);
      setCurrentIndex(currentIndex + 1);
      setShowHint(false);
    } else {
      setOutputHistory([...outputHistory, {
        command: currentCommand,
        output: 'Command not found. Try another command.',
        success: false
      }]);
      setShowHint(true);
    }

    setCurrentCommand('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommandSubmit(e);
    }
  };

  const suggestedCommands = safeCommands
    .filter(cmd => !commandHistory.includes(cmd.command))
    .slice(0, 3);

  return (
    <div className="linux-simulator bg-black text-green-400 p-4 rounded-lg font-mono h-full flex flex-col">
      <div className="mb-3">
        <div className="text-sm text-gray-400">
          נסה פקודות כמו: {suggestedCommands.map(cmd => 
            <span key={cmd.command} className="bg-gray-800 px-2 py-1 rounded mx-1">
              {cmd.command}
            </span>
          )}
        </div>
      </div>

      {/* Terminal Output */}
      <div className="terminal-output bg-gray-900 p-3 rounded mb-3 h-48 overflow-y-auto flex-1">
        <div className="mb-2 text-gray-500">
          student@linux:~$ <span className="text-green-400">welcome to Linux simulator!</span>
        </div>
        
        {outputHistory.map((output, index) => (
          <div key={index} className="mb-2">
            <div className="text-gray-500">
              student@linux:~$ <span className="text-white">{output.command}</span>
            </div>
            <div className={`ml-4 ${output.success ? 'text-green-400' : 'text-red-400'}`}>
              {output.output}
            </div>
            {output.description && (
              <div className="ml-4 text-blue-400 text-xs italic">
                💡 {output.description}
              </div>
            )}
          </div>
        ))}
        
        {showHint && (
          <div className="text-yellow-400 text-xs">
            💡 נסה פקודות בסיסיות כמו: ls, pwd, whoami, date
          </div>
        )}
      </div>

      {/* Command Input */}
      <form onSubmit={handleCommandSubmit} className="flex items-center mb-3">
        <span className="text-gray-500 mr-2">student@linux:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-green-400 outline-none border-none"
          placeholder="הקלד פקודה..."
        />
      </form>

      {/* Progress */}
      <div className="text-xs text-gray-400 mb-3">
        התקדמות: {currentIndex} / {safeCommands.length} פקודות
        <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${safeCommands.length > 0 ? (currentIndex / safeCommands.length) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      {/* Available Commands */}
      <div>
        <h4 className="text-xs font-bold text-white mb-2">פקודות זמינות:</h4>
        <div className="grid grid-cols-2 gap-1 text-xs">
          {safeCommands.map((cmd, index) => (
            <div 
              key={index}
              className={`p-1 rounded ${
                commandHistory.includes(cmd.command) 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              <div className="font-bold">{cmd.command}</div>
              <div className="text-xs opacity-75">{cmd.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinuxSimulator; 