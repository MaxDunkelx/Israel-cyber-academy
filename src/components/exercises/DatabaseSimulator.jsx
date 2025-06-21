import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const DatabaseSimulator = ({ content, onComplete }) => {
  const [tables, setTables] = useState({});
  const [currentQuery, setCurrentQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [queryError, setQueryError] = useState('');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [timeLeft, setTimeLeft] = useState(content.duration || 600);
  const [showHint, setShowHint] = useState(false);

  // Initialize sample tables
  useEffect(() => {
    const initialTables = {};
    content.tables.forEach(table => {
      initialTables[table.name] = {
        columns: table.columns,
        data: [...table.sampleData]
      };
    });
    setTables(initialTables);
  }, [content.tables]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete && onComplete({ completed: completedExercises.length, total: content.exercises.length });
    }
  }, [timeLeft, onComplete, completedExercises.length, content.exercises.length]);

  const executeQuery = () => {
    setQueryError('');
    setQueryResult(null);

    const query = currentQuery.trim().toLowerCase();
    
    try {
      // Simple SQL parser for educational purposes
      if (query.startsWith('select')) {
        // Handle SELECT queries
        const tableMatch = query.match(/from\s+(\w+)/);
        if (tableMatch && tables[tableMatch[1]]) {
          setQueryResult(tables[tableMatch[1]].data);
        } else {
          setQueryError('טבלה לא נמצאה');
        }
      } else if (query.startsWith('create table')) {
        // Handle CREATE TABLE
        const tableMatch = query.match(/create\s+table\s+(\w+)\s*\(([^)]+)\)/i);
        if (tableMatch) {
          const tableName = tableMatch[1];
          const columns = tableMatch[2].split(',').map(col => col.trim().split(' ')[0]);
          
          setTables(prev => ({
            ...prev,
            [tableName]: { columns, data: [] }
          }));
          setQueryResult({ message: `טבלה ${tableName} נוצרה בהצלחה` });
        } else {
          setQueryError('סטקס שגוי ליצירת טבלה');
        }
      } else if (query.startsWith('insert into')) {
        // Handle INSERT
        const insertMatch = query.match(/insert\s+into\s+(\w+)\s*\(([^)]+)\)\s*values\s*\(([^)]+)\)/i);
        if (insertMatch) {
          const tableName = insertMatch[1];
          const columns = insertMatch[2].split(',').map(col => col.trim());
          const values = insertMatch[3].split(',').map(val => val.trim().replace(/['"]/g, ''));
          
          if (tables[tableName]) {
            const newRow = {};
            columns.forEach((col, index) => {
              newRow[col] = values[index];
            });
            
            setTables(prev => ({
              ...prev,
              [tableName]: {
                ...prev[tableName],
                data: [...prev[tableName].data, newRow]
              }
            }));
            setQueryResult({ message: 'רשומה נוספה בהצלחה' });
          } else {
            setQueryError('טבלה לא נמצאה');
          }
        } else {
          setQueryError('סטקס שגוי להכנסת נתונים');
        }
      } else {
        setQueryError('פקודה לא נתמכת או סטקס שגוי');
      }
    } catch (error) {
      setQueryError('שגיאה בביצוע השאילתה');
    }
  };

  const checkExerciseCompletion = () => {
    const exercise = content.exercises[currentExercise];
    if (!exercise) return;

    const query = currentQuery.toLowerCase();
    let isCompleted = false;

    switch (exercise.id) {
      case 1: // Create table
        isCompleted = query.includes('create table') && query.includes('enrollments');
        break;
      case 2: // Insert data
        isCompleted = query.includes('insert into') && query.includes('enrollments');
        break;
      case 3: // Complex query
        isCompleted = query.includes('join') || query.includes('select') && query.includes('from');
        break;
      default:
        isCompleted = true;
    }

    if (isCompleted && !completedExercises.includes(exercise.id)) {
      setCompletedExercises(prev => [...prev, exercise.id]);
    }
  };

  useEffect(() => {
    checkExerciseCompletion();
  }, [currentQuery, currentExercise]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSampleQuery = () => {
    const exercise = content.exercises[currentExercise];
    if (!exercise) return '';
    
    switch (exercise.id) {
      case 1:
        return "CREATE TABLE enrollments (student_id INT, course_id INT, semester VARCHAR(20))";
      case 2:
        return "INSERT INTO enrollments (student_id, course_id, semester) VALUES (1, 1, '2024A')";
      case 3:
        return "SELECT students.name, courses.title FROM students JOIN enrollments ON students.id = enrollments.student_id JOIN courses ON courses.id = enrollments.course_id";
      default:
        return '';
    }
  };

  return (
    <div className="database-simulator p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">סימולטור מסדי נתונים</h2>
        <p className="text-gray-300 mb-4">{content.instructions}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            תרגיל {currentExercise + 1} מתוך {content.exercises.length}
          </div>
          <div className="text-sm font-mono bg-gray-100 px-3 py-1 rounded text-gray-800">
            זמן נותר: {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Exercise and Query */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-semibold mb-3 text-white">תרגיל נוכחי</h3>
            {content.exercises[currentExercise] && (
              <div>
                <h4 className="font-medium mb-2 text-white">{content.exercises[currentExercise].title}</h4>
                <p className="text-gray-300 mb-2">{content.exercises[currentExercise].description}</p>
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={() => setShowHint(!showHint)} 
                    variant="outline" 
                    size="sm"
                    className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                  >
                    {showHint ? 'הסתר רמז' : 'הצג רמז'}
                  </Button>
                  {showHint && (
                    <p className="text-sm text-blue-400">רמז: {content.exercises[currentExercise].hint}</p>
                  )}
                </div>
                <Button 
                  onClick={() => setCurrentQuery(getSampleQuery())}
                  variant="outline" 
                  size="sm"
                  className="mt-2 text-green-400 border-green-400 hover:bg-green-400 hover:text-white"
                >
                  הצג דוגמה
                </Button>
              </div>
            )}
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-3 text-white">שאילתת SQL</h3>
            <textarea
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              placeholder="הקלד את השאילתה שלך כאן..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm bg-gray-800 text-white"
            />
            <Button onClick={executeQuery} className="mt-3 bg-blue-600 hover:bg-blue-700">
              הרץ שאילתה
            </Button>
          </Card>

          {queryError && (
            <Card className="bg-red-900/50 border-red-500/50">
              <h3 className="text-lg font-semibold text-red-400 mb-2">שגיאה</h3>
              <p className="text-red-300">{queryError}</p>
            </Card>
          )}

          {queryResult && (
            <Card className="bg-green-900/50 border-green-500/50">
              <h3 className="text-lg font-semibold text-green-400 mb-2">תוצאה</h3>
              {queryResult.message ? (
                <p className="text-green-300">{queryResult.message}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-green-500/30">
                        {queryResult.length > 0 && Object.keys(queryResult[0]).map(key => (
                          <th key={key} className="text-left p-2 text-green-400">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.map((row, index) => (
                        <tr key={index} className="border-b border-green-500/30">
                          {Object.values(row).map((value, i) => (
                            <td key={i} className="p-2 text-green-300">{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Right side - Tables and Navigation */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-semibold mb-3 text-white">טבלאות קיימות</h3>
            <div className="space-y-4">
              {Object.entries(tables).map(([tableName, tableData]) => (
                <div key={tableName} className="border border-gray-600 rounded-lg p-3">
                  <h4 className="font-medium mb-2 text-white">{tableName}</h4>
                  <p className="text-sm text-gray-400 mb-2">
                    עמודות: {tableData.columns.join(', ')}
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-600">
                          {tableData.columns.map(col => (
                            <th key={col} className="text-left p-1 text-gray-300">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.data.slice(0, 3).map((row, index) => (
                          <tr key={index} className="border-b border-gray-600">
                            {tableData.columns.map(col => (
                              <td key={col} className="p-1 text-gray-400">{row[col]}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {tableData.data.length > 3 && (
                      <p className="text-xs text-gray-500 mt-1">
                        +{tableData.data.length - 3} רשומות נוספות
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-3 text-white">ניווט</h3>
            <div className="flex gap-2 mb-3">
              <Button
                onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
                disabled={currentExercise === 0}
                variant="outline"
                size="sm"
                className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
              >
                קודם
              </Button>
              <Button
                onClick={() => setCurrentExercise(Math.min(content.exercises.length - 1, currentExercise + 1))}
                disabled={currentExercise === content.exercises.length - 1}
                variant="outline"
                size="sm"
                className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
              >
                הבא
              </Button>
            </div>
            <div className="space-y-2">
              {content.exercises.map((exercise, index) => (
                <button
                  key={exercise.id}
                  onClick={() => setCurrentExercise(index)}
                  className={`w-full text-left p-2 rounded text-sm ${
                    currentExercise === index
                      ? 'bg-blue-600 text-white'
                      : completedExercises.includes(exercise.id)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {completedExercises.includes(exercise.id) ? '✅ ' : '⭕ '}
                  {exercise.title}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {completedExercises.length === content.exercises.length && (
        <Card className="mt-6 bg-green-900/50 border-green-500/50">
          <h3 className="text-lg font-semibold text-green-400 mb-2">🎉 כל הכבוד!</h3>
          <p className="text-green-300">השלמת את כל התרגילים בהצלחה!</p>
        </Card>
      )}
    </div>
  );
};

export default DatabaseSimulator; 