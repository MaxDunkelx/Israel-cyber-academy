/**
 * SlideEditor Component - System Manager
 * 
 * Visual slide editor for creating and editing slide content
 * Features:
 * - Visual element placement
 * - Real-time preview
 * - Element properties editing
 * - Background customization
 * - Timer configuration
 * - URL-based media (images/videos)
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  X, 
  Save, 
  Eye, 
  Edit, 
  Plus, 
  Trash2, 
  Type, 
  Image, 
  Video, 
  Square, 
  Clock,
  Palette,
  Link,
  Move,
  Copy,
  Undo,
  Redo
} from 'lucide-react';
import { ChromePicker } from 'react-color';
import Card from '../ui/Card';
import Button from '../ui/Button';

const SlideEditor = ({ slide, onSave, onClose }) => {
  // State management
  const [slideData, setSlideData] = useState(slide);
  const [selectedElement, setSelectedElement] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPickerTarget, setColorPickerTarget] = useState(null);

  // Element types available
  const elementTypes = [
    { id: 'title', label: 'כותרת', icon: Type, defaultStyle: { fontSize: '3rem', color: 'white', textAlign: 'center', marginBottom: '2rem' } },
    { id: 'subtitle', label: 'כותרת משנה', icon: Type, defaultStyle: { fontSize: '1.5rem', color: 'white', textAlign: 'center', opacity: 0.9 } },
    { id: 'text', label: 'טקסט', icon: Type, defaultStyle: { fontSize: '1rem', color: 'white', textAlign: 'right', lineHeight: '1.6' } },
    { id: 'image', label: 'תמונה', icon: Image, defaultStyle: { width: '300px', borderRadius: '15px', margin: '2rem auto' } },
    { id: 'video', label: 'וידאו', icon: Video, defaultStyle: { width: '100%', maxWidth: '600px', margin: '2rem auto' } },
    { id: 'button', label: 'כפתור', icon: Square, defaultStyle: { padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' } },
    { id: 'timer', label: 'טיימר', icon: Clock, defaultStyle: { fontSize: '2rem', color: 'white', textAlign: 'center', margin: '1rem 0' } }
  ];

  // Background presets
  const backgroundPresets = [
    { name: 'כחול-סגול', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'ירוק-כחול', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { name: 'כתום-אדום', value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { name: 'סגול-ורוד', value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    { name: 'כחול כהה', value: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)' },
    { name: 'שחור', value: '#000000' },
    { name: 'לבן', value: '#ffffff' }
  ];

  // Initialize slide data
  useEffect(() => {
    setSlideData(slide);
  }, [slide]);

  /**
   * Add new element to slide
   */
  const addElement = (elementType) => {
    const typeConfig = elementTypes.find(t => t.id === elementType);
    if (!typeConfig) return;

    const newElement = {
      id: `element-${Date.now()}`,
      type: elementType,
      text: elementType === 'title' ? 'כותרת חדשה' : 
            elementType === 'subtitle' ? 'כותרת משנה' :
            elementType === 'text' ? 'טקסט חדש' :
            elementType === 'button' ? 'כפתור' : '',
      style: { ...typeConfig.defaultStyle },
      ...(elementType === 'image' && { src: '', alt: 'תמונה' }),
      ...(elementType === 'video' && { src: '', title: 'וידאו' }),
      ...(elementType === 'timer' && { duration: 30, text: 'זמן קריאה' })
    };

    setSlideData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        elements: [...(prev.content.elements || []), newElement]
      }
    }));

    setSelectedElement(newElement);
    toast.success(`נוסף אלמנט ${typeConfig.label}`);
  };

  /**
   * Update element
   */
  const updateElement = (elementId, updates) => {
    setSlideData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        elements: prev.content.elements.map(el => 
          el.id === elementId ? { ...el, ...updates } : el
        )
      }
    }));
  };

  /**
   * Delete element
   */
  const deleteElement = (elementId) => {
    setSlideData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        elements: prev.content.elements.filter(el => el.id !== elementId)
      }
    }));

    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
    }

    toast.success('האלמנט נמחק');
  };

  /**
   * Duplicate element
   */
  const duplicateElement = (element) => {
    const newElement = {
      ...element,
      id: `element-${Date.now()}`,
      text: element.text ? `${element.text} (עותק)` : element.text
    };

    setSlideData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        elements: [...(prev.content.elements || []), newElement]
      }
    }));

    toast.success('האלמנט הוכפל');
  };

  /**
   * Handle color picker
   */
  const handleColorChange = (color, target) => {
    if (target === 'background') {
      setSlideData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          background: color.hex
        }
      }));
    } else if (selectedElement) {
      updateElement(selectedElement.id, {
        style: {
          ...selectedElement.style,
          [target]: color.hex
        }
      });
    }
  };

  /**
   * Save slide
   */
  const handleSave = () => {
    if (!slideData.title.trim()) {
      toast.error('יש להזין כותרת לשקופית');
      return;
    }

    onSave(slideData);
  };

  /**
   * Render element preview
   */
  const renderElement = (element) => {
    const isSelected = selectedElement?.id === element.id;

    const elementStyle = {
      ...element.style,
      position: 'relative',
      cursor: 'pointer',
      border: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
      borderRadius: '4px',
      padding: '4px'
    };

    switch (element.type) {
      case 'title':
      case 'subtitle':
      case 'text':
        return (
          <div style={elementStyle} onClick={() => setSelectedElement(element)}>
            <div style={element.style}>{element.text}</div>
          </div>
        );

      case 'image':
        return (
          <div style={elementStyle} onClick={() => setSelectedElement(element)}>
            {element.src ? (
              <img 
                src={element.src} 
                alt={element.alt} 
                style={element.style}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : null}
            <div 
              style={{ 
                ...element.style, 
                backgroundColor: '#374151', 
                display: element.src ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <Image className="w-8 h-8" />
            </div>
          </div>
        );

      case 'video':
        return (
          <div style={elementStyle} onClick={() => setSelectedElement(element)}>
            {element.src ? (
              <iframe
                src={element.src}
                title={element.title}
                style={element.style}
                frameBorder="0"
                allowFullScreen
              />
            ) : (
              <div 
                style={{ 
                  ...element.style, 
                  backgroundColor: '#374151', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <Video className="w-8 h-8" />
              </div>
            )}
          </div>
        );

      case 'button':
        return (
          <div style={elementStyle} onClick={() => setSelectedElement(element)}>
            <button style={element.style}>{element.text}</button>
          </div>
        );

      case 'timer':
        return (
          <div style={elementStyle} onClick={() => setSelectedElement(element)}>
            <div style={element.style}>
              {element.text}: {element.duration}s
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-lg w-full max-w-7xl h-full max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-white">עורך שקופיות</h2>
            <input
              type="text"
              value={slideData.title}
              onChange={(e) => setSlideData(prev => ({ ...prev, title: e.target.value }))}
              className="px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="כותרת השקופית"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setPreviewMode(!previewMode)}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              {previewMode ? <Edit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{previewMode ? 'עריכה' : 'תצוגה מקדימה'}</span>
            </Button>
            
            <Button
              onClick={handleSave}
              variant="primary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>שמור</span>
            </Button>
            
            <Button
              onClick={onClose}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>סגור</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Elements */}
          {!previewMode && (
            <div className="w-80 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
              <h3 className="text-lg font-bold text-white mb-4">אלמנטים</h3>
              
              {/* Add Elements */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-300 mb-3">הוסף אלמנט</h4>
                <div className="grid grid-cols-2 gap-2">
                  {elementTypes.map((type) => (
                    <Button
                      key={type.id}
                      onClick={() => addElement(type.id)}
                      variant="secondary"
                      size="sm"
                      className="flex items-center space-x-2 text-xs"
                    >
                      <type.icon className="w-3 h-3" />
                      <span>{type.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Background */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-300 mb-3">רקע</h4>
                <div className="space-y-2">
                  {backgroundPresets.map((preset) => (
                    <div
                      key={preset.name}
                      onClick={() => setSlideData(prev => ({
                        ...prev,
                        content: { ...prev.content, background: preset.value }
                      }))}
                      className="flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-700"
                    >
                      <div
                        className="w-6 h-6 rounded border border-gray-600"
                        style={{ background: preset.value }}
                      />
                      <span className="text-sm text-gray-300">{preset.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Element Properties */}
              {selectedElement && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">מאפיינים</h4>
                  <ElementProperties
                    element={selectedElement}
                    onUpdate={(updates) => updateElement(selectedElement.id, updates)}
                    onDelete={() => deleteElement(selectedElement.id)}
                    onDuplicate={() => duplicateElement(selectedElement)}
                    onColorChange={(color, target) => handleColorChange(color, target)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Center - Slide Preview */}
          <div className="flex-1 p-4 flex items-center justify-center">
            <div 
              className="w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-2xl"
              style={{ background: slideData.content?.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              {previewMode ? (
                <SlidePreview slide={slideData} />
              ) : (
                <div className="w-full h-full p-8 relative">
                  {slideData.content?.elements?.map((element) => (
                    <div key={element.id} className="mb-4">
                      {renderElement(element)}
                    </div>
                  ))}
                  
                  {(!slideData.content?.elements || slideData.content.elements.length === 0) && (
                    <div className="text-center text-white/50 mt-20">
                      <p>לחץ על "הוסף אלמנט" כדי להתחיל</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Element List */}
          {!previewMode && (
            <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
              <h3 className="text-lg font-bold text-white mb-4">רשימת אלמנטים</h3>
              
              <div className="space-y-2">
                {slideData.content?.elements?.map((element, index) => {
                  const typeInfo = elementTypes.find(t => t.id === element.type);
                  const isSelected = selectedElement?.id === element.id;
                  
                  return (
                    <div
                      key={element.id}
                      onClick={() => setSelectedElement(element)}
                      className={`p-3 rounded cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {typeInfo && <typeInfo.icon className="w-4 h-4" />}
                          <span className="text-sm">{typeInfo?.label || element.type}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <span className="text-xs opacity-75">{index + 1}</span>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteElement(element.id);
                            }}
                            variant="danger"
                            size="sm"
                            className="flex items-center space-x-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-xs opacity-75 mt-1 truncate">
                        {element.text || element.src || 'אלמנט'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Color Picker Modal */}
        <AnimatePresence>
          {showColorPicker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="bg-gray-800 p-4 rounded-lg shadow-2xl">
                <ChromePicker
                  color={colorPickerTarget === 'background' ? slideData.content?.background : selectedElement?.style?.[colorPickerTarget]}
                  onChange={(color) => handleColorChange(color, colorPickerTarget)}
                />
                <Button
                  onClick={() => setShowColorPicker(false)}
                  variant="secondary"
                  size="sm"
                  className="mt-2 w-full"
                >
                  סגור
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

/**
 * Element Properties Component
 */
const ElementProperties = ({ element, onUpdate, onDelete, onDuplicate, onColorChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPickerTarget, setColorPickerTarget] = useState(null);

  const handleColorClick = (target) => {
    setColorPickerTarget(target);
    setShowColorPicker(true);
  };

  return (
    <div className="space-y-3">
      {/* Text Content */}
      {(element.type === 'title' || element.type === 'subtitle' || element.type === 'text' || element.type === 'button') && (
        <div>
          <label className="block text-xs text-gray-300 mb-1">טקסט</label>
          <input
            type="text"
            value={element.text || ''}
            onChange={(e) => onUpdate({ text: e.target.value })}
            className="w-full px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
      )}

      {/* URL for images/videos */}
      {(element.type === 'image' || element.type === 'video') && (
        <div>
          <label className="block text-xs text-gray-300 mb-1">URL</label>
          <input
            type="url"
            value={element.src || ''}
            onChange={(e) => onUpdate({ src: e.target.value })}
            placeholder={element.type === 'image' ? 'https://example.com/image.jpg' : 'https://youtube.com/watch?v=...'}
            className="w-full px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
      )}

      {/* Timer duration */}
      {element.type === 'timer' && (
        <div>
          <label className="block text-xs text-gray-300 mb-1">משך (שניות)</label>
          <input
            type="number"
            value={element.duration || 30}
            onChange={(e) => onUpdate({ duration: parseInt(e.target.value) })}
            min="1"
            max="300"
            className="w-full px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
      )}

      {/* Font Size */}
      <div>
        <label className="block text-xs text-gray-300 mb-1">גודל גופן</label>
        <input
          type="text"
          value={element.style?.fontSize || '1rem'}
          onChange={(e) => onUpdate({ 
            style: { ...element.style, fontSize: e.target.value }
          })}
          className="w-full px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Text Color */}
      <div>
        <label className="block text-xs text-gray-300 mb-1">צבע טקסט</label>
        <div className="flex items-center space-x-2">
          <div
            className="w-6 h-6 rounded border border-gray-600 cursor-pointer"
            style={{ backgroundColor: element.style?.color || '#ffffff' }}
            onClick={() => handleColorClick('color')}
          />
          <input
            type="text"
            value={element.style?.color || '#ffffff'}
            onChange={(e) => onUpdate({ 
              style: { ...element.style, color: e.target.value }
            })}
            className="flex-1 px-2 py-1 bg-gray-700 text-white text-sm rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2 pt-2">
        <Button
          onClick={onDuplicate}
          variant="secondary"
          size="sm"
          className="flex items-center space-x-1 text-xs"
        >
          <Copy className="w-3 h-3" />
          <span>הכפל</span>
        </Button>
        
        <Button
          onClick={onDelete}
          variant="danger"
          size="sm"
          className="flex items-center space-x-1 text-xs"
        >
          <Trash2 className="w-3 h-3" />
          <span>מחק</span>
        </Button>
      </div>
    </div>
  );
};

/**
 * Slide Preview Component
 */
const SlidePreview = ({ slide }) => {
  return (
    <div className="w-full h-full p-8">
      {slide.content?.elements?.map((element) => {
        switch (element.type) {
          case 'title':
          case 'subtitle':
          case 'text':
            return (
              <div key={element.id} style={element.style}>
                {element.text}
              </div>
            );

          case 'image':
            return element.src ? (
              <img 
                key={element.id}
                src={element.src} 
                alt={element.alt} 
                style={element.style}
              />
            ) : null;

          case 'video':
            return element.src ? (
              <iframe
                key={element.id}
                src={element.src}
                title={element.title}
                style={element.style}
                frameBorder="0"
                allowFullScreen
              />
            ) : null;

          case 'button':
            return (
              <button key={element.id} style={element.style}>
                {element.text}
              </button>
            );

          case 'timer':
            return (
              <div key={element.id} style={element.style}>
                {element.text}: {element.duration}s
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default SlideEditor; 