import React, { useState, useEffect } from 'react';

const BrowserSimulator = ({ content, onComplete }) => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [tabs, setTabs] = useState([
    { id: 1, title: 'דף הבית', url: '', active: true }
  ]);
  const [bookmarks, setBookmarks] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(content.duration || 600);
  const [showTaskList, setShowTaskList] = useState(true);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete && onComplete(true);
    }
  }, [timeLeft, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleUrlChange = (e) => {
    setCurrentUrl(e.target.value);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (currentUrl.trim()) {
      const newHistory = [...history, { url: currentUrl, timestamp: new Date().toLocaleTimeString() }];
      setHistory(newHistory);
      
      // Update active tab
      const updatedTabs = tabs.map(tab => 
        tab.id === activeTab 
          ? { ...tab, url: currentUrl, title: currentUrl.split('/').pop() || currentUrl }
          : tab
      );
      setTabs(updatedTabs);

      // Check if this completes a task
      const task = content.tasks.find(t => t.url === currentUrl);
      if (task && !completedTasks.includes(task.id)) {
        setCompletedTasks([...completedTasks, task.id]);
        setScore(score + task.points);
      }

      setCurrentUrl('');
    }
  };

  const addNewTab = () => {
    const newTab = {
      id: Math.max(...tabs.map(t => t.id)) + 1,
      title: 'לשונית חדשה',
      url: '',
      active: false
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (tabId) => {
    if (tabs.length > 1) {
      const updatedTabs = tabs.filter(tab => tab.id !== tabId);
      setTabs(updatedTabs);
      if (activeTab === tabId) {
        setActiveTab(updatedTabs[0].id);
      }
    }
  };

  const addBookmark = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    if (activeTabData && activeTabData.url) {
      const newBookmark = {
        id: Date.now(),
        title: activeTabData.title,
        url: activeTabData.url
      };
      setBookmarks([...bookmarks, newBookmark]);
      
      // Check if this completes a task
      const task = content.tasks.find(t => t.action === 'add_bookmark');
      if (task && !completedTasks.includes(task.id)) {
        setCompletedTasks([...completedTasks, task.id]);
        setScore(score + task.points);
      }
    }
  };

  const clearHistory = () => {
    setHistory([]);
    
    // Check if this completes a task
    const task = content.tasks.find(t => t.action === 'clear_history');
    if (task && !completedTasks.includes(task.id)) {
      setCompletedTasks([...completedTasks, task.id]);
      setScore(score + task.points);
    }
  };

  const openPrivacySettings = () => {
    // Check if this completes a task
    const task = content.tasks.find(t => t.action === 'privacy_settings');
    if (task && !completedTasks.includes(task.id)) {
      setCompletedTasks([...completedTasks, task.id]);
      setScore(score + task.points);
    }
  };

  const getActiveTab = () => tabs.find(tab => tab.id === activeTab);

  return (
    <div className="browser-simulator bg-gray-900 rounded-xl shadow-2xl p-6 max-w-6xl mx-auto border border-gray-700">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-white mb-3">סימולטור דפדפן</h3>
        <p className="text-gray-300 mb-4 text-lg">{content.instructions}</p>
        <div className="flex justify-center items-center space-x-4 text-sm">
          <div className="text-gray-400 bg-gray-800 px-4 py-2 rounded-lg">זמן נותר: {formatTime(timeLeft)}</div>
          <div className="text-green-400 bg-gray-800 px-4 py-2 rounded-lg">ניקוד: {score}</div>
          <div className="text-blue-400 bg-gray-800 px-4 py-2 rounded-lg">משימות: {completedTasks.length}/{content.tasks.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Browser Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Browser Toolbar */}
            <div className="bg-gray-100 p-3 border-b">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab(tabs[0].id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  ⬅️ חזור
                </button>
                <button
                  onClick={() => setActiveTab(tabs[0].id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  ➡️ קדימה
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  🔄 רענן
                </button>
                <button
                  onClick={addNewTab}
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                >
                  ➕ לשונית חדשה
                </button>
                <button
                  onClick={addBookmark}
                  className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                >
                  ⭐ סימניה
                </button>
                <button
                  onClick={openPrivacySettings}
                  className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                >
                  ⚙️ הגדרות
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-gray-200 p-2 border-b">
              <div className="flex space-x-1">
                {tabs.map(tab => (
                  <div
                    key={tab.id}
                    className={`flex items-center px-3 py-1 rounded-t cursor-pointer ${
                      tab.id === activeTab ? 'bg-white' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="text-sm truncate max-w-32">{tab.title}</span>
                    {tabs.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          closeTab(tab.id);
                        }}
                        className="ml-2 text-gray-500 hover:text-red-500"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Address Bar */}
            <div className="p-3 border-b">
              <form onSubmit={handleUrlSubmit} className="flex">
                <input
                  type="text"
                  value={currentUrl}
                  onChange={handleUrlChange}
                  placeholder="הקלד כתובת אתר..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                >
                  🔍
                </button>
              </form>
            </div>

            {/* Browser Content */}
            <div className="p-6 min-h-64">
              <div className="text-center text-gray-600">
                {getActiveTab()?.url ? (
                  <div>
                    <h3 className="text-xl font-bold mb-2">דף האתר: {getActiveTab()?.url}</h3>
                    <p>תוכן האתר יוצג כאן...</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold mb-2">ברוכים הבאים לדפדפן המדומה!</h3>
                    <p>הקלד כתובת אתר בשורת הכתובת למעלה</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Tasks and Info */}
        <div className="space-y-6">
          {/* Task List */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-3">משימות לביצוע:</h4>
            <div className="space-y-2">
              {content.tasks.map(task => (
                <div
                  key={task.id}
                  className={`p-2 rounded text-sm ${
                    completedTasks.includes(task.id)
                      ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                      : 'bg-gray-700/50 text-gray-300 border border-gray-600/30'
                  }`}
                >
                  <div className="font-semibold">{task.description}</div>
                  <div className="text-xs opacity-75">ניקוד: {task.points}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bookmarks */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-3">⭐ סימניות:</h4>
            {bookmarks.length > 0 ? (
              <div className="space-y-1">
                {bookmarks.map(bookmark => (
                  <div key={bookmark.id} className="text-sm text-gray-300 p-1 hover:bg-gray-700 rounded cursor-pointer">
                    {bookmark.title}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">אין סימניות</p>
            )}
          </div>

          {/* History */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-semibold text-white">📚 היסטוריה:</h4>
              <button
                onClick={clearHistory}
                className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                מחק
              </button>
            </div>
            {history.length > 0 ? (
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {history.slice(-5).map((item, index) => (
                  <div key={index} className="text-sm text-gray-300 p-1 hover:bg-gray-700 rounded cursor-pointer">
                    <div>{item.url}</div>
                    <div className="text-xs text-gray-500">{item.timestamp}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">אין היסטוריה</p>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-xl">
        <h4 className="font-semibold text-blue-400 mb-3 text-lg">הוראות:</h4>
        <ul className="text-sm text-gray-300 space-y-2">
          <li className="flex items-center"><span className="text-blue-400 mr-2">•</span> הקלד כתובות אתרים בשורת הכתובת</li>
          <li className="flex items-center"><span className="text-blue-400 mr-2">•</span> פתח לשוניות חדשות לניווט מרובה</li>
          <li className="flex items-center"><span className="text-blue-400 mr-2">•</span> הוסף סימניות לאתרים מועדפים</li>
          <li className="flex items-center"><span className="text-blue-400 mr-2">•</span> מחק היסטוריה לפרטיות</li>
          <li className="flex items-center"><span className="text-blue-400 mr-2">•</span> שנה הגדרות פרטיות</li>
        </ul>
      </div>

      {/* Completion Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => onComplete && onComplete(true)}
          className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold shadow-lg"
        >
          סיים תרגיל
        </button>
      </div>
    </div>
  );
};

export default BrowserSimulator; 