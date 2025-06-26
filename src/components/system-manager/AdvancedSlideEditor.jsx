/**
 * Advanced Slide Editor Component
 * 
 * Features:
 * - Image library with drag-and-drop
 * - Visual and JSON editing for all slide types
 * - Live preview and validation
 * - Interactive slide templates
 * - Video URL management
 * - Real-time JSON sync
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image, 
  Code, 
  Eye, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Move, 
  RotateCw,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Volume2,
  Settings,
  Palette,
  Type,
  Layout,
  Zap,
  Check,
  AlertCircle,
  Download,
  Upload,
  Copy,
  Undo,
  Redo
} from 'lucide-react';

// Image Library - 20+ pre-made images
const IMAGE_LIBRARY = [
  // Technology & Cyber
  { id: 'cyber-shield', url: 'https://img.icons8.com/color/96/cyber-security.png', name: 'Cyber Shield' },
  { id: 'hacker', url: 'https://img.icons8.com/color/96/hacker.png', name: 'Hacker' },
  { id: 'computer', url: 'https://img.icons8.com/color/96/computer.png', name: 'Computer' },
  { id: 'network', url: 'https://img.icons8.com/color/96/network.png', name: 'Network' },
  { id: 'database', url: 'https://img.icons8.com/color/96/database.png', name: 'Database' },
  { id: 'code', url: 'https://img.icons8.com/color/96/code.png', name: 'Code' },
  { id: 'browser', url: 'https://img.icons8.com/color/96/browser.png', name: 'Browser' },
  { id: 'server', url: 'https://img.icons8.com/color/96/server.png', name: 'Server' },
  
  // Learning & Education
  { id: 'book', url: 'https://img.icons8.com/color/96/book.png', name: 'Book' },
  { id: 'graduation-cap', url: 'https://img.icons8.com/color/96/graduation-cap.png', name: 'Graduation' },
  { id: 'lightbulb', url: 'https://img.icons8.com/color/96/lightbulb.png', name: 'Idea' },
  { id: 'target', url: 'https://img.icons8.com/color/96/target.png', name: 'Target' },
  { id: 'trophy', url: 'https://img.icons8.com/color/96/trophy.png', name: 'Trophy' },
  { id: 'star', url: 'https://img.icons8.com/color/96/star.png', name: 'Star' },
  
  // UI Elements
  { id: 'arrow-right', url: 'https://img.icons8.com/color/96/arrow-right.png', name: 'Arrow' },
  { id: 'check-circle', url: 'https://img.icons8.com/color/96/check-circle.png', name: 'Check' },
  { id: 'warning', url: 'https://img.icons8.com/color/96/warning.png', name: 'Warning' },
  { id: 'info', url: 'https://img.icons8.com/color/96/info.png', name: 'Info' },
  { id: 'question', url: 'https://img.icons8.com/color/96/question.png', name: 'Question' },
  { id: 'settings', url: 'https://img.icons8.com/color/96/settings.png', name: 'Settings' },
  { id: 'gear', url: 'https://img.icons8.com/color/96/gear.png', name: 'Gear' },
  { id: 'lock', url: 'https://img.icons8.com/color/96/lock.png', name: 'Lock' },
  { id: 'key', url: 'https://img.icons8.com/color/96/key.png', name: 'Key' }
];

// Interactive Slide Templates
const INTERACTIVE_TEMPLATES = {
  codeEditor: {
    name: 'Code Editor',
    template: {
      type: 'interactive',
      component: 'CodeEditor',
      content: {
        language: 'javascript',
        code: 'console.log("Hello, World!");',
        theme: 'vs-dark',
        readOnly: false
      }
    }
  },
  dragDrop: {
    name: 'Drag & Drop',
    template: {
      type: 'interactive',
      component: 'DragDropExercise',
      content: {
        items: [
          { id: '1', text: 'Item 1', category: 'A' },
          { id: '2', text: 'Item 2', category: 'B' }
        ],
        categories: ['A', 'B']
      }
    }
  },
  quiz: {
    name: 'Interactive Quiz',
    template: {
      type: 'interactive',
      component: 'MultipleChoiceExercise',
      content: {
        question: 'What is cybersecurity?',
        options: [
          { id: 'a', text: 'Protecting computers', correct: true },
          { id: 'b', text: 'Breaking into systems', correct: false },
          { id: 'c', text: 'Playing games', correct: false }
        ]
      }
    }
  },
  simulator: {
    name: 'Simulator',
    template: {
      type: 'interactive',
      component: 'BrowserSimulator',
      content: {
        url: 'https://example.com',
        allowNavigation: true,
        showConsole: true
      }
    }
  }
};

const AdvancedSlideEditor = ({ slide, onSave, onCancel }) => {
  const [slideData, setSlideData] = useState(slide || {});
  const [editMode, setEditMode] = useState('visual'); // 'visual' or 'json'
  const [showImageLibrary, setShowImageLibrary] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [jsonError, setJsonError] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef(null);

  // Initialize slide data
  useEffect(() => {
    if (!slideData.id) {
      setSlideData({
        id: `slide-${Date.now()}`,
        title: 'שקופית חדשה',
        type: 'presentation',
        content: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          elements: [
            {
              id: 'title-1',
              type: 'title',
              text: 'כותרת ראשית',
              style: {
                fontSize: '3rem',
                color: 'white',
                textAlign: 'center',
                direction: 'rtl',
                fontFamily: 'Arial, sans-serif',
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)'
              }
            }
          ]
        }
      });
    }
    saveToHistory(slideData);
  }, []);

  // Save to history for undo/redo
  const saveToHistory = (data) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(data)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo/Redo functions
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSlideData(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSlideData(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  };

  // Update slide data and save to history
  const updateSlideData = (newData) => {
    setSlideData(newData);
    saveToHistory(newData);
    setJsonError(null);
  };

  // Handle JSON editing
  const handleJsonChange = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      updateSlideData(parsed);
      setJsonError(null);
    } catch (error) {
      setJsonError(error.message);
    }
  };

  // Add image to slide
  const addImage = (imageData) => {
    const newElement = {
      id: `image-${Date.now()}`,
      type: 'image',
      src: imageData.url,
      alt: imageData.name,
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        cursor: 'move',
        userSelect: 'none'
      }
    };

    const newSlideData = {
      ...slideData,
      content: {
        ...slideData.content,
        elements: [...slideData.content.elements, newElement]
      }
    };

    updateSlideData(newSlideData);
    setShowImageLibrary(false);
  };

  // Handle element selection and dragging
  const handleElementClick = (elementId) => {
    setSelectedElement(elementId);
  };

  const handleElementDrag = (elementId, newPosition) => {
    const newElements = slideData.content.elements.map(element => {
      if (element.id === elementId) {
        return {
          ...element,
          style: {
            ...element.style,
            top: `${newPosition.y}px`,
            left: `${newPosition.x}px`
          }
        };
      }
      return element;
    });

    const newSlideData = {
      ...slideData,
      content: {
        ...slideData.content,
        elements: newElements
      }
    };

    updateSlideData(newSlideData);
  };

  // Handle element resize
  const handleElementResize = (elementId, newSize) => {
    const newElements = slideData.content.elements.map(element => {
      if (element.id === elementId) {
        return {
          ...element,
          style: {
            ...element.style,
            width: `${newSize.width}px`,
            height: `${newSize.height}px`
          }
        };
      }
      return element;
    });

    const newSlideData = {
      ...slideData,
      content: {
        ...slideData.content,
        elements: newElements
      }
    };

    updateSlideData(newSlideData);
  };

  // Delete element
  const deleteElement = (elementId) => {
    const newElements = slideData.content.elements.filter(element => element.id !== elementId);
    const newSlideData = {
      ...slideData,
      content: {
        ...slideData.content,
        elements: newElements
      }
    };

    updateSlideData(newSlideData);
    setSelectedElement(null);
  };

  // Add text element
  const addTextElement = () => {
    const newElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      text: 'טקסט חדש',
      style: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '1.5rem',
        color: 'white',
        textAlign: 'center',
        direction: 'rtl',
        fontFamily: 'Arial, sans-serif',
        cursor: 'move',
        userSelect: 'none'
      }
    };

    const newSlideData = {
      ...slideData,
      content: {
        ...slideData.content,
        elements: [...slideData.content.elements, newElement]
      }
    };

    updateSlideData(newSlideData);
  };

  // Apply interactive template
  const applyTemplate = (template) => {
    const newSlideData = {
      ...slideData,
      type: template.template.type,
      content: template.template.content
    };

    updateSlideData(newSlideData);
    setShowTemplates(false);
  };

  // Save slide
  const handleSave = () => {
    if (jsonError) {
      alert('Please fix JSON errors before saving');
      return;
    }
    onSave(slideData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-7xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 px-6 py-4 rounded-t-lg flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-white">עורך שקופיות מתקדם</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setEditMode('visual')}
                className={`px-3 py-1 rounded ${editMode === 'visual' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                <Layout className="w-4 h-4" />
              </button>
              <button
                onClick={() => setEditMode('json')}
                className={`px-3 py-1 rounded ${editMode === 'json' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                <Code className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
            >
              <Redo className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>שמור</span>
            </button>
            <button
              onClick={onCancel}
              className="p-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
            {/* Slide Properties */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">מאפייני שקופית</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">כותרת</label>
                  <input
                    type="text"
                    value={slideData.title || ''}
                    onChange={(e) => updateSlideData({ ...slideData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">סוג</label>
                  <select
                    value={slideData.type || 'presentation'}
                    onChange={(e) => updateSlideData({ ...slideData, type: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  >
                    <option value="presentation">מצגת</option>
                    <option value="poll">סקר</option>
                    <option value="quiz">חידון</option>
                    <option value="video">וידאו</option>
                    <option value="interactive">אינטראקטיבי</option>
                    <option value="break">הפסקה</option>
                    <option value="reflection">הרהור</option>
                    <option value="summary">סיכום</option>
                  </select>
                </div>

                {slideData.type === 'video' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">URL וידאו</label>
                    <input
                      type="url"
                      value={slideData.content?.videoUrl || ''}
                      onChange={(e) => updateSlideData({
                        ...slideData,
                        content: { ...slideData.content, videoUrl: e.target.value }
                      })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Tools */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">כלים</h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => setShowImageLibrary(true)}
                  className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Image className="w-4 h-4" />
                  <span>הוסף תמונה</span>
                </button>
                
                <button
                  onClick={addTextElement}
                  className="w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center space-x-2"
                >
                  <Type className="w-4 h-4" />
                  <span>הוסף טקסט</span>
                </button>
                
                {slideData.type === 'interactive' && (
                  <button
                    onClick={() => setShowTemplates(true)}
                    className="w-full px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>בחר תבנית</span>
                  </button>
                )}
              </div>
            </div>

            {/* Element Properties */}
            {selectedElement && (
              <div className="p-4 flex-1">
                <h3 className="text-lg font-semibold text-white mb-4">מאפייני אלמנט</h3>
                {/* Element editing controls would go here */}
              </div>
            )}
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col">
            {editMode === 'visual' ? (
              <>
                {/* Canvas */}
                <div className="flex-1 bg-gray-900 p-4">
                  <div
                    ref={canvasRef}
                    className="w-full h-full bg-white rounded-lg shadow-lg relative overflow-hidden"
                    style={{
                      background: slideData.content?.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  >
                    {/* Render slide elements */}
                    {slideData.content?.elements?.map((element) => (
                      <SlideElement
                        key={element.id}
                        element={element}
                        isSelected={selectedElement === element.id}
                        onClick={() => handleElementClick(element.id)}
                        onDrag={handleElementDrag}
                        onResize={handleElementResize}
                        onDelete={deleteElement}
                      />
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="h-32 bg-gray-800 border-t border-gray-700 p-4">
                  <h4 className="text-white font-semibold mb-2">תצוגה מקדימה</h4>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">הפעל</button>
                    <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">עצור</button>
                  </div>
                </div>
              </>
            ) : (
              /* JSON Editor */
              <div className="flex-1 p-4">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">עורך JSON</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(JSON.stringify(slideData, null, 2))}
                        className="px-3 py-1 bg-gray-700 text-white rounded text-sm flex items-center space-x-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>העתק</span>
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.readText().then(text => {
                            try {
                              const parsed = JSON.parse(text);
                              updateSlideData(parsed);
                            } catch (error) {
                              setJsonError('Invalid JSON format');
                            }
                          });
                        }}
                        className="px-3 py-1 bg-gray-700 text-white rounded text-sm flex items-center space-x-1"
                      >
                        <Upload className="w-3 h-3" />
                        <span>הדבק</span>
                      </button>
                    </div>
                  </div>
                  
                  {jsonError && (
                    <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-200 flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>שגיאת JSON: {jsonError}</span>
                    </div>
                  )}
                  
                  <textarea
                    value={JSON.stringify(slideData, null, 2)}
                    onChange={(e) => handleJsonChange(e.target.value)}
                    className="flex-1 p-4 bg-gray-800 border border-gray-600 rounded text-green-400 font-mono text-sm resize-none"
                    placeholder="Enter JSON here..."
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Image Library Modal */}
        <AnimatePresence>
          {showImageLibrary && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">ספריית תמונות</h3>
                  <button
                    onClick={() => setShowImageLibrary(false)}
                    className="p-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {IMAGE_LIBRARY.map((image) => (
                    <div
                      key={image.id}
                      className="p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                      onClick={() => addImage(image)}
                    >
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-24 object-contain mb-2"
                      />
                      <p className="text-white text-sm text-center">{image.name}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Templates Modal */}
        <AnimatePresence>
          {showTemplates && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg p-6 max-w-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">בחר תבנית אינטראקטיבית</h3>
                  <button
                    onClick={() => setShowTemplates(false)}
                    className="p-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(INTERACTIVE_TEMPLATES).map(([key, template]) => (
                    <div
                      key={key}
                      className="p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                      onClick={() => applyTemplate(template)}
                    >
                      <h4 className="text-white font-semibold mb-2">{template.name}</h4>
                      <p className="text-gray-300 text-sm">תבנית מוכנה לשימוש</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Slide Element Component
const SlideElement = ({ element, isSelected, onClick, onDrag, onResize, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.closest('.resize-handle')) return;
    
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    onClick();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    onDrag(element.id, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const renderElement = () => {
    switch (element.type) {
      case 'title':
      case 'text':
        return (
          <div
            style={element.style}
            className={`cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            onMouseDown={handleMouseDown}
          >
            {element.text}
          </div>
        );
      
      case 'image':
        return (
          <div
            style={element.style}
            className={`cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
            onMouseDown={handleMouseDown}
          >
            <img
              src={element.src}
              alt={element.alt}
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {renderElement()}
      
      {isSelected && (
        <div className="absolute inset-0 pointer-events-none">
          <button
            onClick={() => onDelete(element.id)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center pointer-events-auto hover:bg-red-600"
          >
            <Trash2 className="w-3 h-3" />
          </button>
          
          {/* Resize handles */}
          <div className="resize-handle absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize pointer-events-auto" />
          <div className="resize-handle absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize pointer-events-auto" />
          <div className="resize-handle absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize pointer-events-auto" />
          <div className="resize-handle absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize pointer-events-auto" />
        </div>
      )}
    </div>
  );
};

export default AdvancedSlideEditor; 