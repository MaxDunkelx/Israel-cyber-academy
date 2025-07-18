/**
 * Lesson Builder Component - System Manager
 * 
 * Immersive lesson creation and editing interface
 * Features:
 * - Visual lesson structure
 * - Drag & drop slide reordering
 * - Real-time preview
 * - All slide types with full configuration
 * - Interactive slide builder with exercise types
 * - Professional UI with animations
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  Copy, 
  Move, 
  Save, 
  X, 
  ChevronDown, 
  ChevronUp,
  Play,
  Pause,
  Settings,
  Palette,
  Type,
  Image,
  Video,
  MousePointer,
  Target,
  MessageSquare,
  Clock,
  BookOpen,
  FileText,
  Zap,
  Layers,
  Grid,
  List,
  Shuffle,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import { PresentationSlide, PollSlide, VideoSlide, InteractiveSlide, BreakSlide, ReflectionSlide, QuizSlide } from '../slides';

const LessonBuilder = ({ lesson, onSave, onCancel }) => {
  const [lessonData, setLessonData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    estimatedDuration: 30,
    slides: []
  });
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [editingSlide, setEditingSlide] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('structure');
  const [dragIndex, setDragIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [showSlideCreator, setShowSlideCreator] = useState(false);
  const [slideTypeFilter, setSlideTypeFilter] = useState('all');

  useEffect(() => {
    if (lesson) {
      setLessonData({
        title: lesson.title || '',
        description: lesson.description || '',
        category: lesson.category || '',
        difficulty: lesson.difficulty || 'beginner',
        estimatedDuration: lesson.estimatedDuration || 30,
        slides: lesson.content?.slides || []
      });
    }
  }, [lesson]);

  const handleLessonChange = (field, value) => {
    setLessonData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSlideChange = (index, field, value) => {
    setLessonData(prev => ({
      ...prev,
      slides: prev.slides.map((slide, i) => 
        i === index ? { ...slide, [field]: value } : slide
      )
    }));
  };

  const addSlide = (type) => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      type,
      title: `שקופית חדשה - ${type}`,
      content: getDefaultContent(type),
      order: lessonData.slides.length
    };

    setLessonData(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide]
    }));

    setShowSlideCreator(false);
    setSelectedSlide(newSlide);
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'presentation':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          elements: [
            {
              type: 'title',
              text: 'כותרת ראשית',
              style: { fontSize: '3rem', color: 'white', textAlign: 'center' }
            },
            {
              type: 'subtitle',
              text: 'כותרת משנה',
              style: { fontSize: '1.5rem', color: 'white', textAlign: 'center', opacity: 0.9 }
            }
          ]
        };
      case 'poll':
        return {
          question: 'שאלה חדשה?',
          options: [
            { id: 1, text: 'אפשרות 1', emoji: '😊' },
            { id: 2, text: 'אפשרות 2', emoji: '🤔' },
            { id: 3, text: 'אפשרות 3', emoji: '😎' }
          ],
          allowMultiple: false,
          showResults: true,
          duration: 60
        };
      case 'interactive':
        return {
          type: 'drag-drop',
          instructions: 'הוראות לתרגיל',
          categories: [
            { id: 'cat1', name: 'קטגוריה 1', color: '#4CAF50' },
            { id: 'cat2', name: 'קטגוריה 2', color: '#2196F3' }
          ],
          items: [
            { id: 1, text: 'פריט 1', correctCategory: 'cat1' },
            { id: 2, text: 'פריט 2', correctCategory: 'cat2' }
          ],
          duration: 180
        };
      case 'video':
        return {
          videoUrl: '',
          description: 'תיאור הוידאו',
          duration: 180
        };
      case 'quiz':
        return {
          question: 'שאלת חידון',
          options: [
            { id: 1, text: 'תשובה 1', correct: false },
            { id: 2, text: 'תשובה 2', correct: true },
            { id: 3, text: 'תשובה 3', correct: false },
            { id: 4, text: 'תשובה 4', correct: false }
          ],
          explanation: 'הסבר לתשובה הנכונה',
          duration: 120
        };
      case 'break':
        return {
          message: 'הפסקה קצרה',
          activity: 'פעילות להפסקה',
          duration: 300
        };
      case 'reflection':
        return {
          question: 'שאלת הרהור',
          prompt: 'חשבו על...',
          duration: 180
        };
      default:
        return {};
    }
  };

  const deleteSlide = (index) => {
    setLessonData(prev => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index)
    }));
    setSelectedSlide(null);
  };

  const duplicateSlide = (index) => {
    const slide = lessonData.slides[index];
    const newSlide = {
      ...slide,
      id: `slide-${Date.now()}`,
      title: `${slide.title} (עותק)`,
      order: lessonData.slides.length
    };

    setLessonData(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide]
    }));
  };

  const moveSlide = (fromIndex, toIndex) => {
    const slides = [...lessonData.slides];
    const [movedSlide] = slides.splice(fromIndex, 1);
    slides.splice(toIndex, 0, movedSlide);
    
    setLessonData(prev => ({
      ...prev,
      slides: slides.map((slide, index) => ({ ...slide, order: index }))
    }));
  };

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setHoverIndex(index);
  };

  const handleDrop = (toIndex) => {
    if (dragIndex !== null && dragIndex !== toIndex) {
      moveSlide(dragIndex, toIndex);
    }
    setDragIndex(null);
    setHoverIndex(null);
  };

  const renderSlidePreview = (slide, index) => {
    const isSelected = selectedSlide?.id === slide.id;
    const isDragging = dragIndex === index;
    const isHovered = hoverIndex === index;

    return (
      <div
        key={slide.id}
        className={`relative group cursor-pointer transition-all duration-200 ${
          isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
        } ${isDragging ? 'opacity-50' : ''} ${isHovered ? 'bg-blue-100' : ''}`}
        onClick={() => setSelectedSlide(slide)}
        draggable
        onDragStart={() => handleDragStart(index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDrop={() => handleDrop(index)}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 truncate">{slide.title}</h3>
                <p className="text-sm text-gray-500">{slide.type}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingSlide(slide);
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  duplicateSlide(index);
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSlide(index);
                }}
                className="p-1 hover:bg-red-100 rounded text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSlideCreator = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">יצירת שקופית חדשה</h2>
          <button onClick={() => setShowSlideCreator(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { type: 'presentation', icon: FileText, label: 'הצגה', color: 'bg-blue-500' },
              { type: 'poll', icon: MessageSquare, label: 'סקר', color: 'bg-green-500' },
              { type: 'interactive', icon: MousePointer, label: 'אינטראקטיבי', color: 'bg-purple-500' },
              { type: 'video', icon: Video, label: 'וידאו', color: 'bg-red-500' },
              { type: 'quiz', icon: Target, label: 'חידון', color: 'bg-yellow-500' },
              { type: 'break', icon: Clock, label: 'הפסקה', color: 'bg-gray-500' },
              { type: 'reflection', icon: BookOpen, label: 'הרהור', color: 'bg-indigo-500' },
              { type: 'summary', icon: CheckCircle, label: 'סיכום', color: 'bg-teal-500' }
            ].map((slideType) => {
              const Icon = slideType.icon;
              return (
                <button
                  key={slideType.type}
                  onClick={() => addSlide(slideType.type)}
                  className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 ${slideType.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900">{slideType.label}</h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSlideEditor = () => {
    if (!editingSlide) return null;

    return (
      <SlideEditor
        slide={editingSlide}
        onSave={(updatedSlide) => {
          const index = lessonData.slides.findIndex(s => s.id === editingSlide.id);
          if (index !== -1) {
            handleSlideChange(index, 'content', updatedSlide.content);
            handleSlideChange(index, 'title', updatedSlide.title);
          }
          setEditingSlide(null);
        }}
        onCancel={() => setEditingSlide(null)}
      />
    );
  };

  const renderLessonPreview = () => {
    if (!selectedSlide) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>בחר שקופית לתצוגה מקדימה</p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full bg-gray-900 rounded-lg overflow-hidden">
        <div className="h-full">
          {(() => {
            switch (selectedSlide.type) {
              // New unified slide types
              case 'content':
                return <ContentSlide slide={selectedSlide} />;
              case 'assessment':
                return <AssessmentSlide slide={selectedSlide} onAnswer={() => {}} answers={{}} />;
              case 'video':
                return <VideoSlide slide={selectedSlide} onAnswer={() => {}} answers={{}} />;
              case 'interactive':
                return <InteractiveSlide slide={selectedSlide} onAnswer={() => {}} answers={{}} />;
              case 'break':
                return <BreakSlide slide={selectedSlide} />;
              
              // Legacy slide types (for backward compatibility)
              case 'presentation':
                return <PresentationSlide slide={selectedSlide} />;
              case 'poll':
                return <PollSlide slide={selectedSlide} onAnswer={() => {}} answers={{}} />;
              case 'reflection':
                return <ReflectionSlide slide={selectedSlide} onAnswer={() => {}} answers={{}} />;
              case 'quiz':
                return <QuizSlide slide={selectedSlide} onAnswer={() => {}} answers={{}} />;
              
              default:
                return <div className="text-white p-8">סוג שקופית לא מוכר</div>;
            }
          })()}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col z-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {lesson ? 'עריכת שיעור' : 'יצירת שיעור חדש'}
            </h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`p-2 rounded-lg transition-colors ${
                  previewMode ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveTab(activeTab === 'structure' ? 'preview' : 'structure')}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              >
                {activeTab === 'structure' ? <Eye className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              ביטול
            </button>
            <button
              onClick={() => onSave(lessonData)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>שמור שיעור</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Lesson Info & Slides */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Lesson Info */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold mb-4">פרטי השיעור</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">כותרת</label>
                <input
                  type="text"
                  value={lessonData.title}
                  onChange={(e) => handleLessonChange('title', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="כותרת השיעור"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">תיאור</label>
                <textarea
                  value={lessonData.description}
                  onChange={(e) => handleLessonChange('description', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md h-20"
                  placeholder="תיאור השיעור"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריה</label>
                <input
                  type="text"
                  value={lessonData.category}
                  onChange={(e) => handleLessonChange('category', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="קטגוריה"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">רמת קושי</label>
                <select
                  value={lessonData.difficulty}
                  onChange={(e) => handleLessonChange('difficulty', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="beginner">מתחיל</option>
                  <option value="intermediate">בינוני</option>
                  <option value="advanced">מתקדם</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">משך משוער (דקות)</label>
                <input
                  type="number"
                  value={lessonData.estimatedDuration}
                  onChange={(e) => handleLessonChange('estimatedDuration', parseInt(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Slides List */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">שקופיות ({lessonData.slides.length})</h3>
                <button
                  onClick={() => setShowSlideCreator(true)}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {/* Filter */}
              <select
                value={slideTypeFilter}
                onChange={(e) => setSlideTypeFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">כל הסוגים</option>
                <option value="presentation">הצגה</option>
                <option value="poll">סקר</option>
                <option value="interactive">אינטראקטיבי</option>
                <option value="video">וידאו</option>
                <option value="quiz">חידון</option>
                <option value="break">הפסקה</option>
                <option value="reflection">הרהור</option>
              </select>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {lessonData.slides
                .filter(slide => slideTypeFilter === 'all' || slide.type === slideTypeFilter)
                .map((slide, index) => renderSlidePreview(slide, index))}
            </div>
          </div>
        </div>

        {/* Right Panel - Preview/Editor */}
        <div className="flex-1 bg-gray-50">
          {activeTab === 'structure' ? (
            <div className="h-full p-6">
              <div className="bg-white rounded-lg shadow-sm h-full">
                {renderLessonPreview()}
              </div>
            </div>
          ) : (
            <div className="h-full p-6">
              <div className="bg-white rounded-lg shadow-sm h-full p-6">
                <h2 className="text-xl font-semibold mb-4">תצוגה מקדימה של השיעור</h2>
                <div className="text-gray-500 text-center py-12">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>תצוגה מקדימה של השיעור תהיה זמינה כאן</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showSlideCreator && renderSlideCreator()}
      {editingSlide && renderSlideEditor()}
    </div>
  );
};

// Enhanced SlideEditor component for interactive slides
const SlideEditor = ({ slide, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: slide.title || '',
    content: slide.content || {}
  });
  const [activeTab, setActiveTab] = useState('basic');

  const handleContentChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }));
  };

  const renderInteractiveOptions = () => {
    const { type } = formData.content;
    
    switch (type) {
      case 'drag-drop':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">הוראות</label>
              <textarea
                value={formData.content.instructions || ''}
                onChange={(e) => handleContentChange('instructions', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="הוראות לתרגיל"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריות</label>
              {(formData.content.categories || []).map((category, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={category.name || ''}
                    onChange={(e) => {
                      const newCategories = [...(formData.content.categories || [])];
                      newCategories[index] = { ...category, name: e.target.value };
                      handleContentChange('categories', newCategories);
                    }}
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="שם הקטגוריה"
                  />
                  <input
                    type="color"
                    value={category.color || '#000000'}
                    onChange={(e) => {
                      const newCategories = [...(formData.content.categories || [])];
                      newCategories[index] = { ...category, color: e.target.value };
                      handleContentChange('categories', newCategories);
                    }}
                    className="w-12 h-10 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={() => {
                      const newCategories = formData.content.categories?.filter((_, i) => i !== index) || [];
                      handleContentChange('categories', newCategories);
                    }}
                    className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newCategories = [...(formData.content.categories || []), { id: `cat${Date.now()}`, name: '', color: '#000000' }];
                  handleContentChange('categories', newCategories);
                }}
                className="w-full p-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400"
              >
                + הוסף קטגוריה
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">פריטים</label>
              {(formData.content.items || []).map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item.text || ''}
                    onChange={(e) => {
                      const newItems = [...(formData.content.items || [])];
                      newItems[index] = { ...item, text: e.target.value };
                      handleContentChange('items', newItems);
                    }}
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="טקסט הפריט"
                  />
                  <select
                    value={item.correctCategory || ''}
                    onChange={(e) => {
                      const newItems = [...(formData.content.items || [])];
                      newItems[index] = { ...item, correctCategory: e.target.value };
                      handleContentChange('items', newItems);
                    }}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">בחר קטגוריה</option>
                    {(formData.content.categories || []).map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      const newItems = formData.content.items?.filter((_, i) => i !== index) || [];
                      handleContentChange('items', newItems);
                    }}
                    className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newItems = [...(formData.content.items || []), { id: Date.now(), text: '', correctCategory: '' }];
                  handleContentChange('items', newItems);
                }}
                className="w-full p-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400"
              >
                + הוסף פריט
              </button>
            </div>
          </div>
        );
        
      case 'matching':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">הוראות</label>
              <textarea
                value={formData.content.instructions || ''}
                onChange={(e) => handleContentChange('instructions', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="הוראות לתרגיל"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">זוגות התאמה</label>
              {(formData.content.pairs || []).map((pair, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={pair.left || ''}
                    onChange={(e) => {
                      const newPairs = [...(formData.content.pairs || [])];
                      newPairs[index] = { ...pair, left: e.target.value };
                      handleContentChange('pairs', newPairs);
                    }}
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="פריט שמאלי"
                  />
                  <input
                    type="text"
                    value={pair.right || ''}
                    onChange={(e) => {
                      const newPairs = [...(formData.content.pairs || [])];
                      newPairs[index] = { ...pair, right: e.target.value };
                      handleContentChange('pairs', newPairs);
                    }}
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    placeholder="פריט ימני"
                  />
                  <button
                    onClick={() => {
                      const newPairs = formData.content.pairs?.filter((_, i) => i !== index) || [];
                      handleContentChange('pairs', newPairs);
                    }}
                    className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newPairs = [...(formData.content.pairs || []), { left: '', right: '' }];
                  handleContentChange('pairs', newPairs);
                }}
                className="w-full p-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400"
              >
                + הוסף זוג
              </button>
            </div>
          </div>
        );
        
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">שאלה</label>
              <textarea
                value={formData.content.question || ''}
                onChange={(e) => handleContentChange('question', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="השאלה"
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
                    placeholder="טקסט האפשרות"
                  />
                  <input
                    type="checkbox"
                    checked={option.correct || false}
                    onChange={(e) => {
                      const newOptions = [...(formData.content.options || [])];
                      newOptions[index] = { ...option, correct: e.target.checked };
                      handleContentChange('options', newOptions);
                    }}
                    className="w-4 h-4"
                  />
                  <button
                    onClick={() => {
                      const newOptions = formData.content.options?.filter((_, i) => i !== index) || [];
                      handleContentChange('options', newOptions);
                    }}
                    className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newOptions = [...(formData.content.options || []), { id: Date.now(), text: '', correct: false }];
                  handleContentChange('options', newOptions);
                }}
                className="w-full p-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400"
              >
                + הוסף אפשרות
              </button>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>בחר סוג תרגיל אינטראקטיבי</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">עריכת שקופית: {slide.title}</h2>
          <div className="flex gap-2">
            <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800">
              ביטול
            </button>
            <button 
              onClick={() => onSave(formData)} 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              שמור
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Left Panel - Editor */}
          <div className="w-1/2 border-r border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">כותרת השקופית</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              {slide.type === 'interactive' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">סוג תרגיל</label>
                  <select
                    value={formData.content.type || ''}
                    onChange={(e) => handleContentChange('type', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">בחר סוג תרגיל</option>
                    <option value="drag-drop">תרגיל לחיצה</option>
                    <option value="matching">התאמת זוגות</option>
                    <option value="multiple-choice">בחירה מרובה</option>
                    <option value="windows-simulator">סימולטור Windows</option>
                    <option value="linux-simulator">סימולטור Linux</option>
                    <option value="network-simulator">סימולטור רשת</option>
                    <option value="code-editor">עורך קוד</option>
                    <option value="website-builder">בונה אתרים</option>
                  </select>
                </div>
              )}

              {slide.type === 'interactive' && formData.content.type && renderInteractiveOptions()}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="w-1/2 p-6">
            <div className="h-full bg-gray-900 rounded-lg overflow-hidden">
              <div className="h-full">
                {(() => {
                  const previewSlide = { ...slide, ...formData };
                  switch (slide.type) {
                    case 'presentation':
                      return <PresentationSlide slide={previewSlide} />;
                    case 'poll':
                      return <PollSlide slide={previewSlide} onAnswer={() => {}} answers={{}} />;
                    case 'video':
                      return <VideoSlide slide={previewSlide} onAnswer={() => {}} answers={{}} />;
                    case 'interactive':
                      return <InteractiveSlide slide={previewSlide} onAnswer={() => {}} answers={{}} />;
                    case 'break':
                      return <BreakSlide slide={previewSlide} />;
                    case 'reflection':
                      return <ReflectionSlide slide={previewSlide} onAnswer={() => {}} answers={{}} />;
                    case 'quiz':
                      return <QuizSlide slide={previewSlide} onAnswer={() => {}} answers={{}} />;
                    default:
                      return <div className="text-white p-8">תצוגה מקדימה</div>;
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonBuilder; 