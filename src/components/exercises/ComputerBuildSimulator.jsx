import { useState } from 'react';
import { CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

const ComputerBuildSimulator = ({ content, onComplete }) => {
  const [selected, setSelected] = useState({});
  const [done, setDone] = useState(false);

  // חישוב התקציב הכולל
  const budgetUsed = Object.values(selected).reduce(
    (sum, opt) => sum + (opt?.price || 0), 0
  );
  const overBudget = budgetUsed > content.budget;
  const allSelected = Object.keys(selected).length === content.components.length;

  // בחירת רכיב
  const handleSelect = (componentId, option) => {
    if (done) return;
    setSelected(prev => ({ ...prev, [componentId]: option }));
  };

  // שליחה וסיכום
  const handleSubmit = () => {
    setDone(true);
    onComplete && onComplete({ selected, budgetUsed, isCorrect: !overBudget });
  };

  // איפוס
  const handleRestart = () => {
    setSelected({});
    setDone(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10">
      {/* Header - תקציב */}
      <div className={`rounded-xl p-6 mb-4 shadow-lg flex flex-col items-center ${overBudget ? 'bg-red-100 border-red-500 border' : 'bg-blue-100 border-blue-400 border'}`}>
        <div className="text-2xl font-bold text-blue-800 mb-2">תקציב: {content.budget.toLocaleString()} ש"ח</div>
        <div className={`text-xl font-bold ${overBudget ? 'text-red-600' : 'text-green-700'}`}>
          {overBudget
            ? <>חרגת מהתקציב! <AlertTriangle className="inline ml-2 text-red-500" /></>
            : <>בחירות נוכחיות: {budgetUsed.toLocaleString()} ש"ח</>
          }
        </div>
        <div className="text-md text-gray-600 mt-1">בחרו רכיב אחד מכל קטגוריה – לחצו כדי לבחור!</div>
      </div>

      {/* רכיבים */}
      <div className="space-y-8">
        {content.components.map(component => (
          <div key={component.id} className="bg-white/70 rounded-xl shadow p-6 border border-gray-200">
            <div className="font-bold text-blue-700 mb-3 text-lg">{component.name}</div>
            <div className="flex gap-4 flex-wrap">
              {component.options.map(option => {
                const selectedOpt = selected[component.id]?.name === option.name;
                return (
                  <button
                    key={option.name}
                    onClick={() => handleSelect(component.id, option)}
                    disabled={done}
                    className={
                      `p-4 rounded-lg border-2 min-w-[140px] transition-all duration-150 shadow 
                      ${selectedOpt
                        ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white border-blue-700 scale-105"
                        : "bg-gray-100 text-gray-800 border-gray-400 hover:bg-blue-50"}
                      ${done ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}`
                    }
                  >
                    <div className="font-bold text-lg">{option.name}</div>
                    <div className="text-md">₪{option.price} | ביצועים: {option.performance}</div>
                    <div className="text-xs text-gray-600 mt-2">{option.description}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* כפתורי שליחה ואיפוס */}
      <div className="flex flex-col items-center mt-8 space-y-3">
        {!done && (
          <button
            onClick={handleSubmit}
            disabled={!allSelected || overBudget}
            className={`px-10 py-4 rounded-lg text-xl font-bold transition-all duration-300 shadow-md 
              ${!allSelected || overBudget
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-700"}`}
          >
            סיים הרכבה
          </button>
        )}
        {done && (
          <>
            <div className="text-center mt-4">
              {overBudget ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl font-bold flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
                  חריגה מהתקציב! נסו להרכיב שוב.
                </div>
              ) : (
                <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl font-bold flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  כל הכבוד! הרכבתם מחשב מעולה ב־{budgetUsed.toLocaleString()} ש"ח!
                </div>
              )}
            </div>
            <button
              onClick={handleRestart}
              className="mt-6 flex items-center px-6 py-2 bg-blue-100 border border-blue-300 text-blue-700 rounded-lg font-bold hover:bg-blue-200 transition"
            >
              <RefreshCw className="w-5 h-5 ml-2" /> נסו שוב
            </button>
          </>
        )}
      </div>

      {/* סיכום רכיבים שנבחרו */}
      {(done || allSelected) && (
        <div className="bg-white/90 rounded-xl shadow-md border border-gray-200 p-6 mt-10">
          <div className="font-bold text-blue-800 mb-4 text-lg">סיכום הבחירות שלך:</div>
          <ul className="list-disc text-gray-700 text-md space-y-2 pr-4">
            {content.components.map(component => (
              <li key={component.id}>
                <span className="font-bold">{component.name}:</span>
                &nbsp;{selected[component.id]?.name || <span className="text-gray-400">לא נבחר</span>} 
                {selected[component.id] && (
                  <> – ₪{selected[component.id].price} | {selected[component.id].description}</>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ComputerBuildSimulator;
