import React, { useState, useEffect } from 'react';

const WebsiteBuilder = ({ content, onComplete }) => {
  const [website, setWebsite] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [timeLeft, setTimeLeft] = useState(content.duration || 900);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete && onComplete();
    }
  }, [timeLeft, onComplete]);

  const components = [
    {
      id: 'header',
      name: 'כותרת ראשית',
      icon: '📋',
      html: '<h1>כותרת ראשית</h1>',
      css: 'h1 { color: #333; text-align: center; font-size: 2.5rem; margin: 20px 0; }'
    },
    {
      id: 'paragraph',
      name: 'פסקה',
      icon: '📝',
      html: '<p>זהו טקסט לדוגמה. כאן תוכל לכתוב את התוכן שלך.</p>',
      css: 'p { color: #666; font-size: 1.1rem; line-height: 1.6; margin: 15px 0; }'
    },
    {
      id: 'image',
      name: 'תמונה',
      icon: '🖼️',
      html: '<img src="https://via.placeholder.com/300x200" alt="תמונה לדוגמה" />',
      css: 'img { max-width: 100%; height: auto; border-radius: 8px; margin: 15px 0; }'
    },
    {
      id: 'button',
      name: 'כפתור',
      icon: '🔘',
      html: '<button onclick="alert(\'שלום!\')">לחץ כאן</button>',
      css: 'button { background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 1rem; } button:hover { background-color: #0056b3; }'
    },
    {
      id: 'list',
      name: 'רשימה',
      icon: '📋',
      html: '<ul><li>פריט ראשון</li><li>פריט שני</li><li>פריט שלישי</li></ul>',
      css: 'ul { margin: 15px 0; } li { color: #555; font-size: 1rem; margin: 5px 0; }'
    },
    {
      id: 'divider',
      name: 'קו מפריד',
      icon: '➖',
      html: '<hr />',
      css: 'hr { border: none; height: 2px; background-color: #ddd; margin: 20px 0; }'
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addComponent = (component) => {
    const newComponent = {
      ...component,
      id: `${component.id}-${Date.now()}`,
      order: website.length
    };
    setWebsite([...website, newComponent]);
  };

  const removeComponent = (id) => {
    setWebsite(website.filter(comp => comp.id !== id));
  };

  const moveComponent = (fromIndex, toIndex) => {
    const newWebsite = [...website];
    const [movedComponent] = newWebsite.splice(fromIndex, 1);
    newWebsite.splice(toIndex, 0, movedComponent);
    setWebsite(newWebsite);
  };

  const generateWebsite = () => {
    const html = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>האתר שלי</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
            background-color: #f5f5f5; 
        }
        .container { 
            background-color: white; 
            padding: 30px; 
            border-radius: 10px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
        }
        ${website.map(comp => comp.css).join('\n')}
    </style>
</head>
<body>
    <div class="container">
        ${website.map(comp => comp.html).join('\n')}
    </div>
</body>
</html>`;

    return html;
  };

  const downloadWebsite = () => {
    try {
      const html = generateWebsite();
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'my-website.html';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading website:', error);
      alert('שגיאה בהורדת האתר. נסה שוב.');
    }
  };

  return (
    <div className="website-builder bg-gray-900 rounded-xl shadow-2xl p-8 max-w-7xl mx-auto border border-gray-700">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-3">בונה אתרים</h3>
        <p className="text-gray-300 mb-4 text-lg">{content.instructions}</p>
        <div className="text-sm text-gray-400 bg-gray-800 px-4 py-2 rounded-lg inline-block">זמן נותר: {formatTime(timeLeft)}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Components Panel */}
        <div className="lg:col-span-1">
          <h4 className="text-xl font-semibold text-white mb-6">רכיבים זמינים</h4>
          <div className="space-y-3">
            {components.map((component) => (
              <div
                key={component.id}
                className="p-4 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-800 transition-all duration-200 bg-gray-800/50"
                onClick={() => addComponent(component)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{component.icon}</span>
                  <span className="font-medium text-gray-200">{component.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Website Builder */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-semibold text-white">בנה את האתר שלך</h4>
            <div className="flex space-x-3">
              <button
                onClick={downloadWebsite}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg flex items-center space-x-2"
              >
                <span>💾</span>
                <span>הורד אתר</span>
              </button>
            </div>
          </div>

          {/* Builder Area */}
          <div className="border border-gray-600 rounded-lg p-6 bg-gray-800/50 min-h-96">
            {website.length === 0 ? (
              <div className="text-center text-gray-400 py-20">
                <div className="text-6xl mb-6">🏗️</div>
                <p className="text-lg">גרור רכיבים לכאן כדי להתחיל לבנות את האתר שלך</p>
                <p className="text-sm mt-2 text-gray-500">לחץ על רכיבים בצד שמאל כדי להוסיף אותם</p>
              </div>
            ) : (
              <div className="space-y-3">
                {website.map((component, index) => (
                  <div
                    key={component.id}
                    className="p-4 bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-between hover:bg-gray-600 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{component.icon}</span>
                      <span className="font-medium text-gray-200">{component.name}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => removeComponent(component.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-all duration-200"
                      >
                        מחק
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-xl">
        <h4 className="font-semibold text-blue-400 mb-3 text-lg">הוראות:</h4>
        <ul className="text-sm text-gray-300 space-y-2">
          <li className="flex items-center"><span className="text-blue-400 mr-2">•</span> לחץ על רכיב כדי להוסיף אותו לאתר</li>
          <li className="flex items-center"><span className="text-blue-400 mr-2">•</span> לחץ על "מחק" כדי להסיר רכיב</li>
          <li className="flex items-center"><span className="text-blue-400 mr-2">•</span> לחץ על "הורד אתר" כדי לשמור את האתר שלך</li>
          <li className="flex items-center"><span className="text-blue-400 mr-2">•</span> השתמש בעורך הקוד בשיעור הקודם כדי לראות את התוצאה</li>
        </ul>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => onComplete && onComplete()}
          className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold shadow-lg"
        >
          המשך לשיעור
        </button>
      </div>
    </div>
  );
};

export default WebsiteBuilder; 