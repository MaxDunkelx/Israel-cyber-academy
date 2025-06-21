import { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Server, Wifi, Globe, Activity, CheckCircle } from 'lucide-react';

const NetworkSimulator = ({ exercise, onComplete }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [connections, setConnections] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const { components, connections: initialConnections } = exercise;

  const getComponentIcon = (type) => {
    switch (type) {
      case 'computer':
        return <Monitor className="h-8 w-8" />;
      case 'server':
        return <Server className="h-8 w-8" />;
      case 'router':
        return <Wifi className="h-8 w-8" />;
      default:
        return <Globe className="h-8 w-8" />;
    }
  };

  const getComponentColor = (type) => {
    switch (type) {
      case 'computer':
        return 'bg-blue-500';
      case 'server':
        return 'bg-green-500';
      case 'router':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleComponentClick = (component) => {
    if (selectedComponent === null) {
      setSelectedComponent(component);
    } else if (selectedComponent.name !== component.name) {
      // Create connection
      const newConnection = {
        from: selectedComponent.name,
        to: component.name,
        protocol: 'HTTP'
      };
      setConnections([...connections, newConnection]);
      setSelectedComponent(null);
    } else {
      setSelectedComponent(null);
    }
  };

  const startSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(0);
    
    const interval = setInterval(() => {
      setSimulationStep(prev => {
        if (prev >= connections.length) {
          clearInterval(interval);
          setIsSimulating(false);
          setCompleted(true);
          setTimeout(() => onComplete(true), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const resetSimulation = () => {
    setConnections([]);
    setSelectedComponent(null);
    setIsSimulating(false);
    setSimulationStep(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-4">
          סימולטור רשת
        </h3>
        <p className="text-xl text-gray-200 mb-6">
          {exercise.instructions}
        </p>
      </div>

      {/* Network Canvas */}
      <div className="bg-gray-800/50 p-8 rounded-xl border-2 border-gray-600 min-h-[500px] relative">
        {/* Components */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {components.map((component, index) => (
            <motion.div
              key={component.name}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedComponent?.name === component.name
                  ? 'border-yellow-400 bg-yellow-500/20'
                  : 'border-gray-600 bg-gray-700/50 hover:border-blue-400 hover:bg-blue-800/30'
              }`}
              onClick={() => handleComponentClick(component)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-center">
                <div className={`${getComponentColor(component.type)} rounded-lg p-3 mb-3 mx-auto w-fit`}>
                  {getComponentIcon(component.type)}
                </div>
                <h4 className="font-bold text-white text-lg mb-1">
                  {component.name}
                </h4>
                <p className="text-gray-300 text-sm">
                  {component.ip}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connections */}
        <div className="space-y-4">
          {connections.map((connection, index) => (
            <motion.div
              key={`${connection.from}-${connection.to}`}
              className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                isSimulating && index < simulationStep
                  ? 'border-green-400 bg-green-800/30'
                  : 'border-gray-600 bg-gray-700/50'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-blue-400 font-bold">
                  {connection.from}
                </div>
                <Activity className="h-5 w-5 text-blue-400" />
                <div className="text-green-400 font-bold">
                  {connection.to}
                </div>
              </div>
              <div className="text-purple-400 font-mono">
                {connection.protocol}
              </div>
              {isSimulating && index < simulationStep && (
                <CheckCircle className="h-6 w-6 text-green-400" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        {selectedComponent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-blue-900/30 border-2 border-blue-500 rounded-lg"
          >
            <p className="text-blue-200 text-center">
              בחר מכשיר נוסף כדי ליצור חיבור עם {selectedComponent.name}
            </p>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <motion.button
          onClick={startSimulation}
          disabled={connections.length === 0 || isSimulating}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg border border-green-500 hover:border-green-400 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={connections.length > 0 && !isSimulating ? { scale: 1.05 } : {}}
          whileTap={connections.length > 0 && !isSimulating ? { scale: 0.95 } : {}}
        >
          <Activity className="h-5 w-5" />
          הפעל סימולציה
        </motion.button>
        
        <motion.button
          onClick={resetSimulation}
          disabled={isSimulating}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg border border-red-500 hover:border-red-400 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isSimulating ? { scale: 1.05 } : {}}
          whileTap={!isSimulating ? { scale: 0.95 } : {}}
        >
          <Globe className="h-5 w-5" />
          אפס
        </motion.button>
      </div>

      {/* Status */}
      {isSimulating && (
        <div className="text-center">
          <p className="text-yellow-200 text-lg">
            סימולציה פעילה... שלב {simulationStep + 1} מתוך {connections.length}
          </p>
        </div>
      )}

      {completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 bg-green-900/30 border-2 border-green-500 rounded-xl"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-green-200">
              סימולציה הושלמה!
            </span>
          </div>
          <p className="text-green-200">
            כל החיבורים ברשת עובדים בצורה תקינה
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default NetworkSimulator; 