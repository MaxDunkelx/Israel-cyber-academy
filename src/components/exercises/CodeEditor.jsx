import React, { useState, useEffect, useRef } from 'react';

const CodeEditor = ({ content, onComplete }) => {
  const [htmlCode, setHtmlCode] = useState(content.initialHtml || '<h1>שלום עולם!</h1>');
  const [cssCode, setCssCode] = useState(content.initialCss || 'h1 { color: blue; }');
  const [jsCode, setJsCode] = useState(content.initialJs || 'console.log("Hello World!");');
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('html');
  const [timeLeft, setTimeLeft] = useState(content.duration || 600);
  const [iframeReady, setIframeReady] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete && onComplete();
    }
  }, [timeLeft, onComplete]);

  useEffect(() => {
    if (iframeReady) {
      updateOutput();
    }
  }, [htmlCode, cssCode, jsCode, iframeReady]);

  const updateOutput = () => {
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentDocument) {
        const doc = iframe.contentDocument;
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html dir="rtl" lang="he">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${cssCode}</style>
          </head>
          <body>
            ${htmlCode}
            <script>${jsCode}</script>
          </body>
          </html>
        `);
        doc.close();
      }
    } catch (error) {
      console.log('Iframe not ready yet:', error.message);
    }
  };

  const handleIframeLoad = () => {
    setIframeReady(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRunCode = () => {
    updateOutput();
  };

  const handleReset = () => {
    setHtmlCode(content.initialHtml || '<h1>שלום עולם!</h1>');
    setCssCode(content.initialCss || 'h1 { color: blue; }');
    setJsCode(content.initialJs || 'console.log("Hello World!");');
  };

  return (
    <div className="code-editor bg-gray-900 rounded-xl shadow-2xl p-4 max-w-6xl mx-auto border border-gray-700 h-full flex flex-col">
      <div className="text-center mb-4">
        <div className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-lg inline-block">זמן נותר: {formatTime(timeLeft)}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        {/* Code Editor Section */}
        <div className="space-y-4">
          {/* Tabs */}
          <div className="flex space-x-2 bg-gray-800 p-2 rounded-lg">
            {['html', 'css', 'js'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Code Areas */}
          <div className="space-y-4">
            {activeTab === 'html' && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">HTML</label>
                <textarea
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  className="w-full h-48 p-3 border border-gray-600 rounded-lg font-mono text-sm bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="כתוב כאן את קוד ה-HTML שלך..."
                />
              </div>
            )}

            {activeTab === 'css' && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">CSS</label>
                <textarea
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  className="w-full h-48 p-3 border border-gray-600 rounded-lg font-mono text-sm bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="כתוב כאן את קוד ה-CSS שלך..."
                />
              </div>
            )}

            {activeTab === 'js' && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">JavaScript</label>
                <textarea
                  value={jsCode}
                  onChange={(e) => setJsCode(e.target.value)}
                  className="w-full h-48 p-3 border border-gray-600 rounded-lg font-mono text-sm bg-gray-800 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="כתוב כאן את קוד ה-JavaScript שלך..."
                />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex space-x-3">
            <button
              onClick={handleRunCode}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg text-sm"
            >
              הרץ קוד
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-semibold shadow-lg text-sm"
            >
              אפס
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">תוצאה</label>
          <div className="border border-gray-600 rounded-lg h-64 bg-gray-800 overflow-hidden">
            <iframe
              ref={iframeRef}
              onLoad={handleIframeLoad}
              className="w-full h-full rounded-lg bg-white"
              title="Code Output"
              sandbox="allow-scripts allow-same-origin"
              srcDoc="<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body style='margin:0;padding:20px;font-family:Arial,sans-serif;'><h1>טוען...</h1></body></html>"
            />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-3 bg-gray-800 border border-gray-700 rounded-xl">
        <h4 className="font-semibold text-blue-400 mb-2 text-sm">הוראות:</h4>
        <ul className="text-xs text-gray-300 space-y-1">
          <li className="flex items-center"><span className="text-blue-400 mr-2">•</span> כתוב קוד HTML, CSS ו-JavaScript</li>
          <li className="flex items-center"><span className="text-blue-400 mr-2">•</span> לחץ על "הרץ קוד" כדי לראות את התוצאה</li>
          <li className="flex items-center"><span className="text-blue-400 mr-2">•</span> השתמש בלשוניות כדי לעבור בין השפות</li>
          <li className="flex items-center"><span className="text-blue-400 mr-2">•</span> נסה לשנות את הקוד ולראות איך זה משפיע על התוצאה</li>
        </ul>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => onComplete && onComplete()}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold shadow-lg text-sm"
        >
          המשך לשיעור
        </button>
      </div>
    </div>
  );
};

export default CodeEditor; 