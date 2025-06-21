import React, { useState, useRef, useEffect } from 'react';

const LinuxSimulator = ({ commands, instructions, onComplete }) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [outputHistory, setOutputHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef(null);

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
    const matchingCommand = commands.find(cmd => 
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

  const suggestedCommands = commands
    .filter(cmd => !commandHistory.includes(cmd.command))
    .slice(0, 3);

  return (
    <div className="linux-simulator bg-black text-green-400 p-6 rounded-lg font-mono">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2 text-white">{instructions}</h3>
        <div className="text-sm text-gray-400">
          נסה פקודות כמו: {suggestedCommands.map(cmd => 
            <span key={cmd.command} className="bg-gray-800 px-2 py-1 rounded mx-1">
              {cmd.command}
            </span>
          )}
        </div>
      </div>

      {/* Terminal Output */}
      <div className="terminal-output bg-gray-900 p-4 rounded mb-4 h-64 overflow-y-auto">
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
              <div className="ml-4 text-blue-400 text-sm italic">
                💡 {output.description}
              </div>
            )}
          </div>
        ))}
        
        {showHint && (
          <div className="text-yellow-400 text-sm">
            💡 נסה פקודות בסיסיות כמו: ls, pwd, whoami, date
          </div>
        )}
      </div>

      {/* Command Input */}
      <form onSubmit={handleCommandSubmit} className="flex items-center">
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
      <div className="mt-4 text-sm text-gray-400">
        התקדמות: {currentIndex} / {commands.length} פקודות
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentIndex / commands.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Available Commands */}
      <div className="mt-4">
        <h4 className="text-sm font-bold text-white mb-2">פקודות זמינות:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {commands.map((cmd, index) => (
            <div 
              key={index}
              className={`p-2 rounded ${
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