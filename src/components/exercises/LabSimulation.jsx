import { useState } from 'react';
import { CheckCircle, PlayCircle } from 'lucide-react';

const LabSimulation = ({ content, onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  const handleSelect = (idx) => {
    setSelected(idx);
    setDone(true);
    onComplete && onComplete(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 text-lg font-bold text-blue-700 text-center">{content.instructions}</div>
      <div className="grid grid-cols-1 gap-6">
        {content.scenarios.map((scenario, idx) => (
          <button
            key={idx}
            disabled={done}
            onClick={() => handleSelect(idx)}
            className={`
              flex flex-col items-center justify-center p-6 rounded-xl shadow-lg border-2
              ${selected === idx
                ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white border-green-600 scale-105'
                : 'bg-white/80 text-gray-700 border-blue-200 hover:bg-blue-50'}
              transition-all duration-150
            `}
          >
            <div className="text-4xl mb-2">{scenario.icon}</div>
            <div className="font-bold text-lg mb-1">{scenario.name}</div>
            <div className="text-md">{scenario.description}</div>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="mt-8 p-6 bg-green-50 border-l-4 border-green-400 rounded-xl text-green-700 text-center">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-7 h-7 mr-2 text-green-600" />
            <span className="text-lg font-bold">תוצאה:</span>
          </div>
          <div className="text-lg">{content.scenarios[selected].result}</div>
        </div>
      )}
      {done && (
        <div className="mt-6 flex items-center justify-center">
          <PlayCircle className="w-8 h-8 text-blue-400 mr-2" />
          <span className="font-bold text-blue-700">התרגיל הסתיים! תוכל/י לבדוק עוד תרחישים או לעבור הלאה.</span>
        </div>
      )}
    </div>
  );
};

export default LabSimulation;
