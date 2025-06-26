import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Pencil,
  Eye,
  Settings,
  Palette,
  FileText,
  Image,
  Play,
  X,
  Check,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  Sparkles,
  Type,
  Video,
  Music,
  Code,
  Layers
} from 'lucide-react';

const BeautifulSlideEditor = ({ slide, onSave, onCancel }) => {
  const [editedSlide, setEditedSlide] = useState(slide);
  const [selectedElement, setSelectedElement] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showProperties, setShowProperties] = useState(true);
  const [showJsonEditor, setShowJsonEditor] = useState(false);
  const [backgroundType, setBackgroundType] = useState('gradient');
  const [jsonError, setJsonError] = useState(null);

  useEffect(() => {
    setEditedSlide(slide);
  }, [slide]);

  const handleElementChange = (elementIndex, updates) => {
    const newElements = [...editedSlide.content.elements];
    newElements[elementIndex] = { ...newElements[elementIndex], ...updates };
    setEditedSlide({
      ...editedSlide,
      content: { ...editedSlide.content, elements: newElements }
    });
  };

  const handleAddElement = (type) => {
    const newElement = {
      type,
      text: type === 'title' ? 'כותרת חדשה' : 'טקסט חדש',
      style: {
        fontSize: type === 'title' ? '3rem' : '1.5rem',
        color: 'white',
        textAlign: 'center',
        direction: 'rtl',
        fontFamily: 'Arial, sans-serif',
        fontWeight: type === 'title' ? 'bold' : 'normal'
      }
    };

    setEditedSlide({
      ...editedSlide,
      content: {
        ...editedSlide.content,
        elements: [...editedSlide.content.elements, newElement]
      }
    });
  };

  const handleRemoveElement = (index) => {
    const newElements = editedSlide.content.elements.filter((_, i) => i !== index);
    setEditedSlide({
      ...editedSlide,
      content: { ...editedSlide.content, elements: newElements }
    });
    setSelectedElement(null);
  };

  const handleBackgroundChange = (background) => {
    setEditedSlide({
      ...editedSlide,
      content: { ...editedSlide.content, background }
    });
  };

  const handleJsonChange = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      setEditedSlide(parsed);
      setJsonError(null);
    } catch (error) {
      setJsonError(error.message);
    }
  };

  const handleSave = () => {
    if (jsonError) {
      alert('Please fix JSON errors before saving');
      return;
    }
    onSave(editedSlide);
  };

  const renderElement = (element, index) => {
    const isSelected = selectedElement === index;
    
    return (
      <motion.div
        key={index}
        className={`relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
          isSelected 
            ? 'border-blue-500 bg-blue-900 bg-opacity-20' 
            : 'border-gray-600 hover:border-gray-500 bg-gray-800 bg-opacity-50'
        }`}
        onClick={() => setSelectedElement(index)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            {element.type === 'title' ? 'כותרת' : 'טקסט'}
          </span>
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveElement(index);
              }}
              className="p-1 text-red-400 hover:text-red-300 transition-colors"
              title="Remove"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
        
        <input
          type="text"
          value={element.text}
          onChange={(e) => handleElementChange(index, { text: e.target.value })}
          className="w-full bg-transparent text-white text-center border-none outline-none"
          style={{
            ...element.style,
            fontSize: element.style?.fontSize || '1.5rem'
          }}
        />
        
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-gray-700 rounded-lg"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">גודל טקסט</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={parseFloat(element.style?.fontSize || '1.5rem')}
                  onChange={(e) => handleElementChange(index, {
                    style: { ...element.style, fontSize: `${e.target.value}rem` }
                  })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">צבע</label>
                <input
                  type="color"
                  value={element.style?.color || '#ffffff'}
                  onChange={(e) => handleElementChange(index, {
                    style: { ...element.style, color: e.target.value }
                  })}
                  className="w-full h-8 rounded border border-gray-600"
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex">
      {/* Left Panel - Elements */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Elements</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowJsonEditor(!showJsonEditor)}
              className={`p-2 rounded-lg transition-colors ${
                showJsonEditor 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600'
              }`}
              title="JSON Editor"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowProperties(!showProperties)}
              className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-700 rounded-lg hover:bg-gray-600"
              title="Properties"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!showJsonEditor ? (
          <>
            <div className="space-y-4 mb-6">
              <button
                onClick={() => handleAddElement('title')}
                className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 shadow-lg"
              >
                <Type className="w-5 h-5" />
                <span>Add Title</span>
              </button>
              <button
                onClick={() => handleAddElement('text')}
                className="w-full flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span>Add Text</span>
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Slide Elements</h3>
              {editedSlide.content?.elements?.map((element, index) => (
                <div key={index}>
                  {renderElement(element, index)}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">JSON Editor</h3>
            <div className="relative">
              <textarea
                value={JSON.stringify(editedSlide, null, 2)}
                onChange={(e) => handleJsonChange(e.target.value)}
                className="w-full h-96 bg-gray-900 border border-gray-600 rounded-lg p-3 text-green-400 font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Edit JSON here..."
              />
              {jsonError && (
                <div className="absolute bottom-2 left-2 right-2 bg-red-900 border border-red-700 rounded p-2">
                  <p className="text-red-200 text-xs">JSON Error: {jsonError}</p>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-400">
              <p>💡 Edit the JSON directly to modify slide structure</p>
              <p>⚠️ Invalid JSON will prevent saving</p>
            </div>
          </div>
        )}
      </div>

      {/* Center Panel - Preview */}
      <div className="flex-1 flex flex-col">
        {/* Preview Controls */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-white">Slide Preview</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    previewMode 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:text-white'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onCancel}
                className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                disabled={jsonError}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all duration-200 shadow-lg ${
                  jsonError 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Save Slide</span>
              </button>
            </div>
          </div>
        </div>

        {/* Slide Preview */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div 
            className={`relative rounded-xl shadow-2xl overflow-hidden border border-gray-700 ${
              previewMode ? 'w-full max-w-4xl' : 'w-full max-w-2xl'
            }`}
            style={{
              background: editedSlide.content?.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              minHeight: previewMode ? '600px' : '400px',
              aspectRatio: previewMode ? '16/9' : '4/3'
            }}
          >
            <div className="p-8 h-full flex flex-col justify-center items-center">
              {editedSlide.content?.elements?.map((element, index) => {
                if (element.type === 'title') {
                  return (
                    <div
                      key={index}
                      className="text-center mb-4"
                      style={{
                        ...element.style,
                        fontSize: element.style?.fontSize || '3rem',
                        direction: 'rtl',
                        fontFamily: 'Arial, sans-serif',
                        textShadow: '3px 3px 6px rgba(0,0,0,0.7)'
                      }}
                    >
                      {element.text}
                    </div>
                  );
                }
                if (element.type === 'text') {
                  return (
                    <div
                      key={index}
                      className="text-center"
                      style={{
                        ...element.style,
                        fontSize: element.style?.fontSize || '1.5rem',
                        direction: 'rtl',
                        fontFamily: 'Arial, sans-serif',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                      }}
                    >
                      {element.text}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Properties */}
      <AnimatePresence>
        {showProperties && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-gray-800 border-l border-gray-700 overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">Properties</h2>
              
              {/* Slide Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Slide Title</label>
                <input
                  type="text"
                  value={editedSlide.title || ''}
                  onChange={(e) => setEditedSlide({ ...editedSlide, title: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Background */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Background</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Type</label>
                    <select
                      value={backgroundType}
                      onChange={(e) => setBackgroundType(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="gradient">Gradient</option>
                      <option value="solid">Solid Color</option>
                      <option value="image">Image</option>
                    </select>
                  </div>
                  
                  {backgroundType === 'gradient' && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleBackgroundChange('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')}
                        className="h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 hover:scale-105 transition-transform"
                      />
                      <button
                        onClick={() => handleBackgroundChange('linear-gradient(135deg, #f093fb 0%, #f5576c 100%)')}
                        className="h-12 rounded-lg bg-gradient-to-br from-pink-400 to-red-500 hover:scale-105 transition-transform"
                      />
                      <button
                        onClick={() => handleBackgroundChange('linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)')}
                        className="h-12 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 hover:scale-105 transition-transform"
                      />
                      <button
                        onClick={() => handleBackgroundChange('linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)')}
                        className="h-12 rounded-lg bg-gradient-to-br from-green-400 to-teal-400 hover:scale-105 transition-transform"
                      />
                      <button
                        onClick={() => handleBackgroundChange('linear-gradient(135deg, #fa709a 0%, #fee140 100%)')}
                        className="h-12 rounded-lg bg-gradient-to-br from-pink-400 to-yellow-400 hover:scale-105 transition-transform"
                      />
                      <button
                        onClick={() => handleBackgroundChange('linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)')}
                        className="h-12 rounded-lg bg-gradient-to-br from-cyan-300 to-pink-300 hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  
                  {backgroundType === 'solid' && (
                    <input
                      type="color"
                      value={editedSlide.content?.background || '#667eea'}
                      onChange={(e) => handleBackgroundChange(e.target.value)}
                      className="w-full h-12 rounded-lg border border-gray-600"
                    />
                  )}
                </div>
              </div>

              {/* Slide Order */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Slide Order</label>
                <input
                  type="number"
                  value={editedSlide.order || 1}
                  onChange={(e) => setEditedSlide({ ...editedSlide, order: parseInt(e.target.value) })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Slide Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Slide Type</label>
                <select
                  value={editedSlide.type || 'presentation'}
                  onChange={(e) => setEditedSlide({ ...editedSlide, type: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="presentation">Presentation</option>
                  <option value="quiz">Quiz</option>
                  <option value="poll">Poll</option>
                  <option value="video">Video</option>
                  <option value="interactive">Interactive</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BeautifulSlideEditor; 