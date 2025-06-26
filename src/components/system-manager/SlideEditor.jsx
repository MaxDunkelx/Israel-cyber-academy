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
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';

const SlideEditor = ({ slide, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'presentation',
    content: {}
  });
  const [activeTab, setActiveTab] = useState('basic');
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (slide) {
      setFormData({
        title: slide.title || '',
        type: slide.type || 'presentation',
        content: slide.content || {}
      });
    }
  }, [slide]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContentChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }));
  };

  const handleElementChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        elements: prev.content.elements?.map((element, i) => 
          i === index ? { ...element, [field]: value } : element
        ) || []
      }
    }));
  };

  const addElement = (type) => {
    const newElement = {
      type,
      text: '',
      style: getDefaultStyle(type)
    };

    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        elements: [...(prev.content.elements || []), newElement]
      }
    }));
  };

  const removeElement = (index) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        elements: prev.content.elements?.filter((_, i) => i !== index) || []
      }
    }));
  };

  const getDefaultStyle = (type) => {
    switch (type) {
      case 'title':
        return { fontSize: '3rem', color: 'white', textAlign: 'center', marginBottom: '2rem' };
      case 'subtitle':
        return { fontSize: '1.5rem', color: 'white', textAlign: 'center', opacity: 0.9 };
      case 'text':
        return { fontSize: '1.2rem', color: 'white', textAlign: 'center' };
      case 'list':
        return { fontSize: '1.3rem', color: 'white', textAlign: 'right', lineHeight: '2' };
      default:
        return { fontSize: '1rem', color: 'white' };
    }
  };

  const renderBasicTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">כותרת השקופית</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="כותרת השקופית"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">סוג השקופית</label>
        <select
          value={formData.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="presentation">הצגה</option>
          <option value="poll">סקר</option>
          <option value="interactive">אינטראקטיבי</option>
          <option value="video">וידאו</option>
          <option value="quiz">חידון</option>
          <option value="break">הפסקה</option>
          <option value="reflection">הרהור</option>
          <option value="summary">סיכום</option>
        </select>
      </div>

      {formData.type === 'presentation' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">רקע</label>
          <input
            type="text"
            value={formData.content.background || ''}
            onChange={(e) => handleContentChange('background', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
        </div>
      )}

      {formData.type === 'video' && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">כתובת הוידאו (URL)</label>
            <input
              type="text"
              value={formData.content.videoUrl || ''}
              onChange={(e) => handleContentChange('videoUrl', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="https://www.youtube.com/embed/dQw4w9WgXcQ"
            />
            <p className="text-xs text-gray-500 mt-1">
              עבור YouTube, השתמש בפורמט: https://www.youtube.com/embed/VIDEO_ID
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">תיאור הוידאו</label>
            <textarea
              value={formData.content.description || ''}
              onChange={(e) => handleContentChange('description', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md h-20"
              placeholder="תיאור קצר של הוידאו..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">משך הוידאו (בשניות)</label>
            <input
              type="number"
              value={formData.content.duration || ''}
              onChange={(e) => handleContentChange('duration', parseInt(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="180"
              min="0"
            />
          </div>
        </div>
      )}

      {formData.type === 'poll' && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">שאלה</label>
            <input
              type="text"
              value={formData.content.question || ''}
              onChange={(e) => handleContentChange('question', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="השאלה שלך..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">אפשרויות</label>
            {(formData.content.options || []).map((option, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={option.text || ''}
                  onChange={(e) => {
                    const newOptions = [...(formData.content.options || [])];
                    newOptions[index] = { ...option, text: e.target.value };
                    handleContentChange('options', newOptions);
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  placeholder={`אפשרות ${index + 1}`}
                />
                <input
                  type="text"
                  value={option.emoji || ''}
                  onChange={(e) => {
                    const newOptions = [...(formData.content.options || [])];
                    newOptions[index] = { ...option, emoji: e.target.value };
                    handleContentChange('options', newOptions);
                  }}
                  className="w-16 p-2 border border-gray-300 rounded-md"
                  placeholder="😊"
                />
                <Button
                  onClick={() => {
                    const newOptions = formData.content.options?.filter((_, i) => i !== index) || [];
                    handleContentChange('options', newOptions);
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  מחק
                </Button>
              </div>
            ))}
            <Button
              onClick={() => {
                const newOptions = [...(formData.content.options || []), { id: Date.now(), text: '', emoji: '' }];
                handleContentChange('options', newOptions);
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              הוסף אפשרות
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  const renderElementsTab = () => (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <Button onClick={() => addElement('title')} className="bg-blue-600 hover:bg-blue-700">כותרת</Button>
        <Button onClick={() => addElement('subtitle')} className="bg-blue-600 hover:bg-blue-700">תת כותרת</Button>
        <Button onClick={() => addElement('text')} className="bg-blue-600 hover:bg-blue-700">טקסט</Button>
        <Button onClick={() => addElement('list')} className="bg-blue-600 hover:bg-blue-700">רשימה</Button>
        <Button onClick={() => addElement('image')} className="bg-blue-600 hover:bg-blue-700">תמונה</Button>
      </div>

      {(formData.content.elements || []).map((element, index) => (
        <div key={index} className="border p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{element.type}</span>
            <Button
              onClick={() => removeElement(index)}
              className="bg-red-600 hover:bg-red-700 text-sm"
            >
              מחק
            </Button>
          </div>

          <div className="space-y-2">
            {element.type === 'image' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL התמונה</label>
                <input
                  type="text"
                  value={element.src || ''}
                  onChange={(e) => handleElementChange(index, 'src', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            ) : element.type === 'list' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">פריטי הרשימה</label>
                <textarea
                  value={element.items?.join('\n') || ''}
                  onChange={(e) => handleElementChange(index, 'items', e.target.value.split('\n').filter(item => item.trim()))}
                  className="w-full p-2 border border-gray-300 rounded-md h-24"
                  placeholder="פריט 1&#10;פריט 2&#10;פריט 3"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">טקסט</label>
                <textarea
                  value={element.text || ''}
                  onChange={(e) => handleElementChange(index, 'text', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md h-20"
                  placeholder="הטקסט שלך..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">סגנון (CSS)</label>
              <textarea
                value={JSON.stringify(element.style || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const style = JSON.parse(e.target.value);
                    handleElementChange(index, 'style', style);
                  } catch (error) {
                    // Ignore invalid JSON while typing
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-md h-24 font-mono text-sm"
                placeholder='{"fontSize": "2rem", "color": "white"}'
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPreviewTab = () => (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => setPreviewMode(!previewMode)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {previewMode ? 'ערוך' : 'תצוגה מקדימה'}
        </Button>
      </div>

      {previewMode ? (
        <div 
          className="w-full h-96 rounded-lg border-2 border-gray-300 relative overflow-hidden"
          style={{ background: formData.content.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          <div className="absolute inset-0 p-8 flex flex-col justify-center items-center">
            {formData.type === 'video' ? (
              <div className="w-full h-full flex flex-col">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-white mb-2">{formData.title}</h2>
                  {formData.content.description && (
                    <p className="text-white opacity-90">{formData.content.description}</p>
                  )}
                </div>
                {formData.content.videoUrl ? (
                  <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden">
                    <iframe
                      src={formData.content.videoUrl}
                      title={formData.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="flex-1 bg-gray-900 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">לא נבחר URL וידאו</p>
                  </div>
                )}
              </div>
            ) : (
              (formData.content.elements || []).map((element, index) => (
                <div key={index} style={element.style}>
                  {element.type === 'title' && <h1>{element.text}</h1>}
                  {element.type === 'subtitle' && <h2>{element.text}</h2>}
                  {element.type === 'text' && <p>{element.text}</p>}
                  {element.type === 'list' && (
                    <ul>
                      {element.items?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {element.type === 'image' && (
                    <img 
                      src={element.src} 
                      alt="Preview" 
                      style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          לחץ על "תצוגה מקדימה" כדי לראות את השקופית
        </div>
      )}
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">תוכן מלא (JSON)</label>
        <textarea
          value={JSON.stringify(formData.content, null, 2)}
          onChange={(e) => {
            try {
              const content = JSON.parse(e.target.value);
              handleInputChange('content', content);
            } catch (error) {
              // Ignore invalid JSON while typing
            }
          }}
          className="w-full p-2 border border-gray-300 rounded-md h-64 font-mono text-sm"
          placeholder='{"background": "...", "elements": [...]}'
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {slide ? 'עריכת שקופית' : 'יצירת שקופית חדשה'}
          </h2>
          <div className="flex gap-2">
            <Button onClick={onCancel} className="bg-gray-600 hover:bg-gray-700">
              ביטול
            </Button>
            <Button 
              onClick={() => onSave(formData)} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              שמור
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Tabs */}
          <div className="w-64 border-r bg-gray-50">
            <div className="p-4">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('basic')}
                  className={`w-full text-left p-2 rounded ${
                    activeTab === 'basic' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  🎯 בסיסי
                </button>
                <button
                  onClick={() => setActiveTab('elements')}
                  className={`w-full text-left p-2 rounded ${
                    activeTab === 'elements' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  🧩 אלמנטים
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`w-full text-left p-2 rounded ${
                    activeTab === 'preview' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  👁️ תצוגה מקדימה
                </button>
                <button
                  onClick={() => setActiveTab('advanced')}
                  className={`w-full text-left p-2 rounded ${
                    activeTab === 'advanced' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  ⚙️ מתקדם
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'basic' && renderBasicTab()}
            {activeTab === 'elements' && renderElementsTab()}
            {activeTab === 'preview' && renderPreviewTab()}
            {activeTab === 'advanced' && renderAdvancedTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideEditor; 