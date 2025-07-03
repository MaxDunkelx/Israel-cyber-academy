import React, { useState } from 'react';

function generatePassword({ length, includeUppercase, includeLowercase, includeNumbers, includeSymbols }) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  let chars = '';
  if (includeUppercase) chars += upper;
  if (includeLowercase) chars += lower;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;
  if (!chars) chars = lower;
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

const PasswordGenerator = ({ options, tips = [], examples = [], onComplete }) => {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleGenerate = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setCopied(false);
    setCompleted(true);
    if (onComplete) onComplete(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-xl shadow-lg transition"
        onClick={handleGenerate}
      >
        צור סיסמה חזקה
      </button>
      {password && (
        <div className="flex flex-col items-center gap-2">
          <div className="bg-gray-900 text-green-400 font-mono text-2xl px-6 py-3 rounded-lg shadow border border-green-500 select-all">
            {password}
          </div>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg mt-2"
            onClick={handleCopy}
          >
            {copied ? 'הועתק!' : 'העתק סיסמה'}
          </button>
        </div>
      )}
      {examples && examples.length > 0 && (
        <div className="mt-4 text-right w-full max-w-lg">
          <div className="font-bold text-white mb-2">דוגמאות לסיסמאות חזקות:</div>
          <ul className="list-disc list-inside text-gray-200">
            {examples.map((ex, i) => <li key={i}>{ex}</li>)}
          </ul>
        </div>
      )}
      {tips && tips.length > 0 && (
        <div className="mt-4 text-right w-full max-w-lg">
          <div className="font-bold text-white mb-2">טיפים לסיסמה חזקה:</div>
          <ul className="list-disc list-inside text-gray-200">
            {tips.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </div>
      )}
      {completed && (
        <div className="mt-6 text-green-400 font-bold text-lg">כל הכבוד! יצרת סיסמה חזקה 🎉</div>
      )}
    </div>
  );
};

export default PasswordGenerator; 