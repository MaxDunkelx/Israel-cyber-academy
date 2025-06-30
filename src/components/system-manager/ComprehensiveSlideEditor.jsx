/**
 * Comprehensive Slide Editor - System Manager
 * 
 * A robust slide editor that supports all slide types:
 * - Presentation slides (text, images, backgrounds)
 * - Poll slides (questions, options, results)
 * - Quiz slides (questions, answers, scoring)
 * - Video slides (video URLs, descriptions)
 * - Interactive slides (drag-drop, matching, simulators)
 * - Break slides (timers, activities)
 * - Reflection slides (open-ended questions)
 * 
 * Features:
 * - Live preview of all slide types
 * - Dynamic form fields based on slide type
 * - Database persistence with real-time saving
 * - Element reordering and styling
 * - Background customization
 * - Timer configuration
 * - Exercise configuration for interactive slides
 */

import React, { useState, useEffect, useRef } from 'react';
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
  Layers,
  MessageSquare,
  Target,
  Clock,
  BookOpen,
  Save,
  RotateCcw,
  EyeOff,
  Grid,
  List,
  Zap,
  AlertCircle,
  Info,
  AlertTriangle,
  RefreshCw,
  Copy,
  Download
} from 'lucide-react';

// Import slide components for preview
import { PresentationSlide, PollSlide, VideoSlide, InteractiveSlide, BreakSlide, ReflectionSlide, QuizSlide } from '../slides';

const ComprehensiveSlideEditor = ({ slide, onSave, onCancel }) => {
  const [editedSlide, setEditedSlide] = useState(slide || {});
  const [selectedElement, setSelectedElement] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showProperties, setShowProperties] = useState(true);
  const [showJsonEditor, setShowJsonEditor] = useState(false);
  const [backgroundType, setBackgroundType] = useState('gradient');
  const [jsonError, setJsonError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (slide) {
      try {
        setEditedSlide({
          ...slide,
          content: slide.content || { elements: [] }
        });
        setError(null);
      } catch (err) {
        console.error('Error initializing slide:', err);
        setError('Failed to load slide data. Please try again.');
      }
    }
  }, [slide]);

  // Handle slide type change
  const handleSlideTypeChange = (newType) => {
    const defaultContent = getDefaultContentForType(newType);
    setEditedSlide({
      ...editedSlide,
      type: newType,
      content: defaultContent
    });
  };

  // Get default content for each slide type
  const getDefaultContentForType = (type) => {
    switch (type) {
      case 'presentation':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          elements: [
            {
              type: 'title',
              text: 'כותרת חדשה',
              style: {
                fontSize: '3rem',
                color: 'white',
                textAlign: 'center',
                marginBottom: '2rem'
              }
            }
          ]
        };
      
      case 'poll':
        return {
          question: 'שאלת הסקר שלך',
          options: [
            { id: 1, text: 'אפשרות 1', emoji: '😊' },
            { id: 2, text: 'אפשרות 2', emoji: '🤔' },
            { id: 3, text: 'אפשרות 3', emoji: '👍' },
            { id: 4, text: 'אפשרות 4', emoji: '👎' }
          ],
          allowMultiple: false,
          showResults: true,
          duration: 120
        };
      
      case 'quiz':
        return {
          questions: [
            {
              id: 1,
              question: 'שאלת החידון שלך',
              options: [
                { id: 'a', text: 'תשובה א' },
                { id: 'b', text: 'תשובה ב' },
                { id: 'c', text: 'תשובה ג' },
                { id: 'd', text: 'תשובה ד' }
              ],
              correctAnswer: 'a',
              explanation: 'הסבר לתשובה הנכונה'
            }
          ],
          passingScore: 70,
          showResults: true,
          duration: 300
        };
      
      case 'video':
        return {
          description: 'תיאור הוידאו',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          autoplay: false,
          showControls: true,
          duration: 180
        };
      
      case 'interactive':
        return {
          type: 'drag-drop',
          instructions: 'הוראות התרגיל',
          categories: [
            { id: 'cat1', name: 'קטגוריה 1', color: '#4CAF50' },
            { id: 'cat2', name: 'קטגוריה 2', color: '#2196F3' }
          ],
          items: [
            { id: 1, text: 'פריט 1', correctCategory: 'cat1' },
            { id: 2, text: 'פריט 2', correctCategory: 'cat2' }
          ]
        };
      
      case 'break':
        return {
          duration: 300,
          message: 'זמן הפסקה!',
          activities: [
            'עשו תרגילי מתיחה',
            'שתו מים',
            'הסתכלו מחוץ לחלון'
          ]
        };
      
      case 'reflection':
        return {
          question: 'מה למדת היום?',
          placeholder: 'כתוב את המחשבות שלך כאן...',
          minWords: 10,
          maxWords: 200,
          duration: 180
        };
      
      default:
        return {};
    }
  };

  // Handle content changes based on slide type
  const handleContentChange = (field, value) => {
    try {
      setError(null);
      
      if (field === 'type') {
        setEditedSlide(prev => ({
          ...prev,
          type: value,
          content: {
            ...prev.content,
            type: value === 'interactive' ? 'drag-drop' : undefined
          }
        }));
      } else if (field.startsWith('content.')) {
        const contentField = field.replace('content.', '');
        setEditedSlide(prev => ({
          ...prev,
          content: {
            ...prev.content,
            [contentField]: value
          }
        }));
      } else {
        setEditedSlide(prev => ({
          ...prev,
          [field]: value
        }));
      }
    } catch (err) {
      console.error('❌ Error updating content:', err);
      setError(`Failed to update content: ${err.message}`);
    }
  };

  // Handle element changes for presentation slides
  const handleElementChange = (elementIndex, updates) => {
    const newElements = [...editedSlide.content.elements];
    newElements[elementIndex] = { ...newElements[elementIndex], ...updates };
    setEditedSlide({
      ...editedSlide,
      content: { ...editedSlide.content, elements: newElements }
    });
  };

  // Add new element to presentation slide
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
        elements: [...(editedSlide.content.elements || []), newElement]
      }
    });
  };

  // Remove element from presentation slide
  const handleRemoveElement = (index) => {
    const newElements = (editedSlide.content.elements || []).filter((_, i) => i !== index);
    setEditedSlide({
      ...editedSlide,
      content: { ...editedSlide.content, elements: newElements }
    });
    setSelectedElement(null);
  };

  // Handle poll option changes
  const handlePollOptionChange = (optionIndex, field, value) => {
    const newOptions = [...editedSlide.content.options];
    newOptions[optionIndex] = { ...newOptions[optionIndex], [field]: value };
    handleContentChange('options', newOptions);
  };

  // Add poll option
  const handleAddPollOption = () => {
    const newOption = {
      id: Date.now(),
      text: 'אפשרות חדשה',
      emoji: '😊'
    };
    const newOptions = [...(editedSlide.content.options || []), newOption];
    handleContentChange('options', newOptions);
  };

  // Remove poll option
  const handleRemovePollOption = (index) => {
    const newOptions = (editedSlide.content.options || []).filter((_, i) => i !== index);
    handleContentChange('options', newOptions);
  };

  // Handle quiz question changes
  const handleQuizQuestionChange = (questionIndex, field, value) => {
    const newQuestions = [...editedSlide.content.questions];
    newQuestions[questionIndex] = { ...newQuestions[questionIndex], [field]: value };
    handleContentChange('questions', newQuestions);
  };

  // Add quiz question
  const handleAddQuizQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: 'שאלה חדשה',
      options: [
        { id: 'a', text: 'תשובה א' },
        { id: 'b', text: 'תשובה ב' },
        { id: 'c', text: 'תשובה ג' },
        { id: 'd', text: 'תשובה ד' }
      ],
      correctAnswer: 'a',
      explanation: 'הסבר לתשובה הנכונה'
    };
    const newQuestions = [...(editedSlide.content.questions || []), newQuestion];
    handleContentChange('questions', newQuestions);
  };

  // Remove quiz question
  const handleRemoveQuizQuestion = (index) => {
    const newQuestions = (editedSlide.content.questions || []).filter((_, i) => i !== index);
    handleContentChange('questions', newQuestions);
  };

  // Handle background change
  const handleBackgroundChange = (background) => {
    setEditedSlide({
      ...editedSlide,
      content: { ...editedSlide.content, background }
    });
  };

  // Handle JSON editor changes
  const handleJsonChange = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      setEditedSlide(parsed);
      setJsonError(null);
    } catch (error) {
      setJsonError(error.message);
    }
  };

  // Save slide to database
  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      // Validate slide data
      if (!editedSlide.title || editedSlide.title.trim() === '') {
        throw new Error('Slide title is required');
      }

      if (!editedSlide.type) {
        throw new Error('Slide type is required');
      }

      // Validate content based on slide type
      if (editedSlide.type === 'interactive' && editedSlide.content?.type) {
        const interactiveTypes = [
          'windows-simulator', 'linux-simulator', 'network-simulator',
          'protocol-simulator', 'code-editor', 'website-builder',
          'database-simulator', 'browser-simulator', 'drag-drop',
          'matching', 'multiple-choice'
        ];
        
        if (!interactiveTypes.includes(editedSlide.content.type)) {
          throw new Error(`Invalid interactive type: ${editedSlide.content.type}`);
        }
      }

      console.log('💾 Saving slide with data:', editedSlide);
      
      await onSave(editedSlide);
      setSuccessMessage('Slide saved successfully!');
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('❌ Error saving slide:', err);
      setError(`Failed to save slide: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Render slide preview
  const renderSlidePreview = () => {
    const previewSlide = { ...editedSlide };
    
    switch (editedSlide.type) {
      case 'presentation':
        return <PresentationSlide slide={previewSlide} />;
      case 'poll':
        return <PollSlide slide={previewSlide} onAnswer={() => {}} answers={{}} />;
      case 'quiz':
        return <QuizSlide slide={previewSlide} onAnswer={() => {}} answers={{}} />;
      case 'video':
        return <VideoSlide slide={previewSlide} onAnswer={() => {}} answers={{}} />;
      case 'interactive':
        return <InteractiveSlide slide={previewSlide} onAnswer={() => {}} answers={{}} />;
      case 'break':
        return <BreakSlide slide={previewSlide} />;
      case 'reflection':
        return <ReflectionSlide slide={previewSlide} onAnswer={() => {}} answers={{}} />;
      default:
        return <div className="text-white p-8">סוג שקופית לא מוכר</div>;
    }
  };

  // Render content editor based on slide type
  const renderContentEditor = () => {
    switch (editedSlide.type) {
      case 'presentation':
        return renderPresentationEditor();
      case 'poll':
        return renderPollEditor();
      case 'quiz':
        return renderQuizEditor();
      case 'video':
        return renderVideoEditor();
      case 'interactive':
        return renderInteractiveEditor();
      case 'break':
        return renderBreakEditor();
      case 'reflection':
        return renderReflectionEditor();
      default:
        return <div>Select a slide type</div>;
    }
  };

  // Presentation slide editor
  const renderPresentationEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Background</label>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Type</label>
            <select
              value={backgroundType}
              onChange={(e) => setBackgroundType(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
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

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-300">Elements</label>
          <div className="flex space-x-2">
            <button
              onClick={() => handleAddElement('title')}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAddElement('text')}
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Type className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {editedSlide.content?.elements?.map((element, index) => (
            <div
              key={`element-${index}-${element.type}-${element.id || index}`}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedElement === index 
                  ? 'border-blue-500 bg-blue-900 bg-opacity-20' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onClick={() => setSelectedElement(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 uppercase">
                  {element.type === 'title' ? 'כותרת' : 'טקסט'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveElement(index);
                  }}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              
              <input
                type="text"
                value={element.text}
                onChange={(e) => handleElementChange(index, { text: e.target.value })}
                className="w-full bg-transparent text-white border-none outline-none"
                style={{ fontSize: element.style?.fontSize || '1.5rem' }}
              />
              
              {selectedElement === index && (
                <div className="mt-3 p-3 bg-gray-700 rounded-lg">
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
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Poll slide editor
  const renderPollEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Question</label>
        <input
          type="text"
          value={editedSlide.content?.question || ''}
          onChange={(e) => handleContentChange('question', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          placeholder="Enter your poll question..."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-300">Options</label>
          <button
            onClick={handleAddPollOption}
            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {editedSlide.content?.options?.map((option, index) => (
            <div key={`option-${index}-${option.id || option.text || index}`} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
              <input
                type="text"
                value={option.emoji}
                onChange={(e) => handlePollOptionChange(index, 'emoji', e.target.value)}
                className="w-16 bg-gray-600 border border-gray-500 rounded px-2 py-1 text-center"
                placeholder="😊"
              />
              <input
                type="text"
                value={option.text}
                onChange={(e) => handlePollOptionChange(index, 'text', e.target.value)}
                className="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-1 text-white"
                placeholder="Option text..."
              />
              <button
                onClick={() => handleRemovePollOption(index)}
                className="p-1 text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Duration (seconds)</label>
          <input
            type="number"
            value={editedSlide.content?.duration || 120}
            onChange={(e) => handleContentChange('duration', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Allow Multiple</label>
          <input
            type="checkbox"
            checked={editedSlide.content?.allowMultiple || false}
            onChange={(e) => handleContentChange('allowMultiple', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
          />
        </div>
      </div>
    </div>
  );

  // Quiz slide editor
  const renderQuizEditor = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-300">Questions</label>
          <button
            onClick={handleAddQuizQuestion}
            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-4">
          {editedSlide.content?.questions?.map((question, qIndex) => (
            <div key={`question-${qIndex}-${question.id || question.question || qIndex}`} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-300">Question {qIndex + 1}</span>
                <button
                  onClick={() => handleRemoveQuizQuestion(qIndex)}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuizQuestionChange(qIndex, 'question', e.target.value)}
                className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white mb-3"
                placeholder="Enter question..."
              />
              
              <div className="space-y-2">
                {question.options?.map((option, oIndex) => (
                  <div key={`option-${qIndex}-${oIndex}-${option.id || option.text || oIndex}`} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={question.correctAnswer === option.id}
                      onChange={() => handleQuizQuestionChange(qIndex, 'correctAnswer', option.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500"
                    />
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => {
                        const newOptions = [...question.options];
                        newOptions[oIndex] = { ...newOptions[oIndex], text: e.target.value };
                        handleQuizQuestionChange(qIndex, 'options', newOptions);
                      }}
                      className="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-1 text-white"
                      placeholder={`Option ${option.id}`}
                    />
                  </div>
                ))}
              </div>
              
              <input
                type="text"
                value={question.explanation}
                onChange={(e) => handleQuizQuestionChange(qIndex, 'explanation', e.target.value)}
                className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white mt-3"
                placeholder="Explanation for correct answer..."
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Passing Score (%)</label>
          <input
            type="number"
            value={editedSlide.content?.passingScore || 70}
            onChange={(e) => handleContentChange('passingScore', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Duration (seconds)</label>
          <input
            type="number"
            value={editedSlide.content?.duration || 300}
            onChange={(e) => handleContentChange('duration', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          />
        </div>
      </div>
    </div>
  );

  // Video slide editor
  const renderVideoEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Video URL</label>
        <input
          type="text"
          value={editedSlide.content?.videoUrl || ''}
          onChange={(e) => handleContentChange('videoUrl', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          placeholder="https://www.youtube.com/embed/..."
        />
        <p className="text-xs text-gray-400 mt-1">
          Use YouTube embed URLs (e.g., https://www.youtube.com/embed/VIDEO_ID)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea
          value={editedSlide.content?.description || ''}
          onChange={(e) => handleContentChange('description', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-20 resize-none"
          placeholder="Describe the video content..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Duration (seconds)</label>
          <input
            type="number"
            value={editedSlide.content?.duration || 180}
            onChange={(e) => handleContentChange('duration', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Autoplay</label>
          <input
            type="checkbox"
            checked={editedSlide.content?.autoplay || false}
            onChange={(e) => handleContentChange('autoplay', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
          />
        </div>
      </div>
    </div>
  );

  // Interactive slide editor
  const renderInteractiveEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Exercise Type</label>
        <select
          value={editedSlide.content?.type || 'drag-drop'}
          onChange={(e) => handleContentChange('type', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
        >
          <option value="drag-drop">Click-Based Exercise</option>
          <option value="matching">Matching</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="windows-simulator">Windows Simulator</option>
          <option value="linux-simulator">Linux Simulator</option>
          <option value="network-simulator">Network Simulator</option>
          <option value="protocol-simulator">Protocol Simulator</option>
          <option value="code-editor">Code Editor</option>
          <option value="website-builder">Website Builder</option>
          <option value="database-simulator">Database Simulator</option>
          <option value="browser-simulator">Browser Simulator</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Instructions</label>
        <textarea
          value={editedSlide.content?.instructions || ''}
          onChange={(e) => handleContentChange('instructions', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-20 resize-none"
          placeholder="Enter exercise instructions..."
        />
      </div>

      {(editedSlide.content?.type === 'drag-drop' || editedSlide.content?.type === 'matching') && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Categories</label>
          <div className="space-y-3">
            {editedSlide.content?.categories?.map((category, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => {
                    const newCategories = [...editedSlide.content.categories];
                    newCategories[index] = { ...newCategories[index], name: e.target.value };
                    handleContentChange('categories', newCategories);
                  }}
                  className="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-1 text-white"
                  placeholder="Category name..."
                />
                <input
                  type="color"
                  value={category.color}
                  onChange={(e) => {
                    const newCategories = [...editedSlide.content.categories];
                    newCategories[index] = { ...newCategories[index], color: e.target.value };
                    handleContentChange('categories', newCategories);
                  }}
                  className="w-12 h-8 rounded border border-gray-600"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Break slide editor
  const renderBreakEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Break Message</label>
        <input
          type="text"
          value={editedSlide.content?.message || ''}
          onChange={(e) => handleContentChange('message', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          placeholder="Time for a break!"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Duration (seconds)</label>
        <input
          type="number"
          value={editedSlide.content?.duration || 300}
          onChange={(e) => handleContentChange('duration', parseInt(e.target.value))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Suggested Activities</label>
        <textarea
          value={editedSlide.content?.activities?.join('\n') || ''}
          onChange={(e) => handleContentChange('activities', e.target.value.split('\n').filter(line => line.trim()))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-20 resize-none"
          placeholder="Enter suggested activities (one per line)..."
        />
      </div>
    </div>
  );

  // Reflection slide editor
  const renderReflectionEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Reflection Question</label>
        <input
          type="text"
          value={editedSlide.content?.question || ''}
          onChange={(e) => handleContentChange('question', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          placeholder="What did you learn today?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Placeholder Text</label>
        <input
          type="text"
          value={editedSlide.content?.placeholder || ''}
          onChange={(e) => handleContentChange('placeholder', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          placeholder="Write your thoughts here..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Min Words</label>
          <input
            type="number"
            value={editedSlide.content?.minWords || 10}
            onChange={(e) => handleContentChange('minWords', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Max Words</label>
          <input
            type="number"
            value={editedSlide.content?.maxWords || 200}
            onChange={(e) => handleContentChange('maxWords', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Duration (seconds)</label>
        <input
          type="number"
          value={editedSlide.content?.duration || 180}
          onChange={(e) => handleContentChange('duration', parseInt(e.target.value))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
        />
      </div>
    </div>
  );

  // Error boundary for preview rendering
  const SafePreview = ({ children }) => {
    const [previewError, setPreviewError] = useState(null);

    if (previewError) {
      return (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-200 mb-2">
            Preview Error
          </h3>
          <p className="text-red-300 mb-4">
            Failed to render slide preview due to an error.
          </p>
          <button
            onClick={() => setPreviewError(null)}
            className="flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Preview</span>
          </button>
        </div>
      );
    }

    try {
      return (
        <div onError={(error) => {
          console.error('Preview error:', error);
          setPreviewError(error);
        }}>
          {children}
        </div>
      );
    } catch (error) {
      console.error('Preview rendering error:', error);
      setPreviewError(error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-96 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              {slide?.id ? 'Edit Slide' : 'Create Slide'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Error and Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 bg-red-900/50 border border-red-500 text-red-200 px-3 py-2 rounded-lg flex items-center space-x-2"
              >
                <AlertCircle className="w-4 h-4" />
                <span className="flex-1 text-sm">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="text-red-300 hover:text-red-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )}
            
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 bg-green-900/50 border border-green-500 text-green-200 px-3 py-2 rounded-lg flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span className="flex-1 text-sm">{successMessage}</span>
                <button
                  onClick={() => setSuccessMessage(null)}
                  className="text-green-300 hover:text-green-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={editedSlide.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                placeholder="Enter slide title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select
                value={editedSlide.type || 'presentation'}
                onChange={(e) => handleSlideTypeChange(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              >
                <option value="presentation">Presentation</option>
                <option value="poll">Poll</option>
                <option value="quiz">Quiz</option>
                <option value="video">Video</option>
                <option value="interactive">Interactive</option>
                <option value="break">Break</option>
                <option value="reflection">Reflection</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
              <input
                type="number"
                value={editedSlide.order || 1}
                onChange={(e) => handleContentChange('order', parseInt(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          {['content', 'style', 'json'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'content' && (
            <div className="space-y-6">
              {editedSlide.type === 'presentation' && renderPresentationEditor()}
              {editedSlide.type === 'poll' && renderPollEditor()}
              {editedSlide.type === 'quiz' && renderQuizEditor()}
              {editedSlide.type === 'video' && renderVideoEditor()}
              {editedSlide.type === 'interactive' && renderInteractiveEditor()}
              {editedSlide.type === 'break' && renderBreakEditor()}
              {editedSlide.type === 'reflection' && renderReflectionEditor()}
            </div>
          )}

          {activeTab === 'style' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Background</label>
                <div className="grid grid-cols-3 gap-2">
                  {['linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'].map((bg) => (
                    <button
                      key={bg}
                      onClick={() => handleBackgroundChange(bg)}
                      className={`w-full h-12 rounded-lg border-2 transition-all ${
                        editedSlide.content?.background === bg
                          ? 'border-blue-400 scale-105'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      style={{ background: bg }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Custom Background</label>
                <input
                  type="text"
                  value={editedSlide.content?.background || ''}
                  onChange={(e) => handleBackgroundChange(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  placeholder="Enter CSS background value..."
                />
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300">JSON Editor</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      try {
                        const jsonString = JSON.stringify(editedSlide, null, 2);
                        navigator.clipboard.writeText(jsonString);
                        setSuccessMessage('JSON copied to clipboard!');
                        setTimeout(() => setSuccessMessage(null), 2000);
                      } catch (err) {
                        setError('Failed to copy JSON: ' + err.message);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Copy JSON"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      try {
                        const jsonString = JSON.stringify(editedSlide, null, 2);
                        const blob = new Blob([jsonString], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `slide-${editedSlide.title || 'untitled'}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                        setSuccessMessage('JSON downloaded!');
                        setTimeout(() => setSuccessMessage(null), 2000);
                      } catch (err) {
                        setError('Failed to download JSON: ' + err.message);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Download JSON"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <textarea
                value={JSON.stringify(editedSlide, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setEditedSlide(parsed);
                    setError(null);
                  } catch (err) {
                    setError('Invalid JSON: ' + err.message);
                  }
                }}
                className="w-full h-64 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono text-sm resize-none"
                placeholder="Enter valid JSON..."
              />
              {error && (
                <div className="text-red-400 text-sm">
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm">{showPreview ? 'Hide' : 'Show'} Preview</span>
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex flex-col">
        {/* Preview Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Slide Preview</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2 bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">{showPreview ? 'Hide' : 'Show'} Preview</span>
              </button>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-4xl h-full">
            <SafePreview>
              {renderSlidePreview()}
            </SafePreview>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveSlideEditor; 