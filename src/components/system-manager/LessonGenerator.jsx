/**
 * Lesson Generator Component
 * 
 * Features:
 * - Generate complete lessons with all slide types
 * - Pre-built templates for different subjects
 * - Custom slide type selection
 * - Automatic slide ordering
 * - Bulk slide creation
 * - Template customization
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  Plus,
  X,
  Save,
  Copy,
  Download,
  Upload,
  BookOpen,
  Target,
  Users,
  Clock,
  Star,
  Check,
  AlertCircle,
  Info,
  Zap,
  Palette,
  Type,
  Image,
  Video,
  Code,
  MessageSquare,
  Play,
  Pause,
  Layers,
  Grid3X3,
  List,
  Settings,
  RotateCw,
  Eye,
  Edit3,
  Trash2
} from 'lucide-react';

// Pre-built lesson templates
const LESSON_TEMPLATES = {
  cybersecurity: {
    name: 'Cybersecurity Fundamentals',
    description: 'Complete lesson on cybersecurity basics',
    difficulty: 'beginner',
    duration: 90,
    slides: [
      {
        type: 'presentation',
        title: 'מבוא לאבטחת סייבר',
        content: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          elements: [
            {
              type: 'title',
              text: 'מבוא לאבטחת סייבר',
              style: {
                fontSize: '3rem',
                color: 'white',
                textAlign: 'center',
                direction: 'rtl',
                fontFamily: 'Arial, sans-serif'
              }
            }
          ]
        }
      },
      {
        type: 'poll',
        title: 'סקר ידע קיים',
        content: {
          question: 'מה אתם יודעים על אבטחת סייבר?',
          options: ['כלום', 'קצת', 'הרבה', 'מומחה']
        }
      },
      {
        type: 'video',
        title: 'סרטון על האקרים',
        content: {
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          description: 'סרטון הסבר על האקרים'
        }
      },
      {
        type: 'interactive',
        title: 'סימולטור דפדפן',
        content: {
          component: 'BrowserSimulator',
          url: 'https://example.com',
          allowNavigation: true,
          showConsole: true
        }
      },
      {
        type: 'quiz',
        title: 'חידון אבטחה',
        content: {
          question: 'מה הדרך הטובה ביותר להגן על סיסמה?',
          options: [
            { id: 'a', text: 'לשתף עם חברים', correct: false },
            { id: 'b', text: 'לשמור במחשב', correct: false },
            { id: 'c', text: 'לשנות באופן קבוע', correct: true },
            { id: 'd', text: 'לכתוב על נייר', correct: false }
          ]
        }
      },
      {
        type: 'break',
        title: 'הפסקה',
        content: {
          duration: 300,
          message: 'קחו הפסקה קצרה'
        }
      },
      {
        type: 'reflection',
        title: 'הרהור',
        content: {
          question: 'מה למדתם היום?',
          prompt: 'שתפו את המחשבות שלכם'
        }
      },
      {
        type: 'summary',
        title: 'סיכום',
        content: {
          points: [
            'אבטחת סייבר חשובה',
            'סיסמאות חזקות',
            'זהירות ברשת'
          ]
        }
      }
    ]
  },
  computerBasics: {
    name: 'Computer Basics',
    description: 'Introduction to computer hardware and software',
    difficulty: 'beginner',
    duration: 60,
    slides: [
      {
        type: 'presentation',
        title: 'מבוא למחשבים',
        content: {
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          elements: [
            {
              type: 'title',
              text: 'מבוא למחשבים',
              style: {
                fontSize: '3rem',
                color: 'white',
                textAlign: 'center',
                direction: 'rtl',
                fontFamily: 'Arial, sans-serif'
              }
            }
          ]
        }
      },
      {
        type: 'interactive',
        title: 'סימולטור מחשב',
        content: {
          component: 'ComputerSimulator',
          showComponents: true,
          allowInteraction: true
        }
      },
      {
        type: 'quiz',
        title: 'חידון רכיבים',
        content: {
          question: 'איזה רכיב אחראי על עיבוד המידע?',
          options: [
            { id: 'a', text: 'RAM', correct: false },
            { id: 'b', text: 'CPU', correct: true },
            { id: 'c', text: 'GPU', correct: false },
            { id: 'd', text: 'HDD', correct: false }
          ]
        }
      }
    ]
  },
  networking: {
    name: 'Networking Fundamentals',
    description: 'Learn about computer networks and protocols',
    difficulty: 'intermediate',
    duration: 75,
    slides: [
      {
        type: 'presentation',
        title: 'מבוא לרשתות',
        content: {
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          elements: [
            {
              type: 'title',
              text: 'מבוא לרשתות מחשבים',
              style: {
                fontSize: '3rem',
                color: 'white',
                textAlign: 'center',
                direction: 'rtl',
                fontFamily: 'Arial, sans-serif'
              }
            }
          ]
        }
      },
      {
        type: 'interactive',
        title: 'סימולטור רשת',
        content: {
          component: 'NetworkSimulator',
          showTopology: true,
          allowConfiguration: true
        }
      }
    ]
  }
};

// Available slide types
const SLIDE_TYPES = [
  { id: 'presentation', name: 'מצגת', icon: Layers, color: 'blue' },
  { id: 'poll', name: 'סקר', icon: MessageSquare, color: 'green' },
  { id: 'quiz', name: 'חידון', icon: Target, color: 'purple' },
  { id: 'video', name: 'וידאו', icon: Video, color: 'red' },
  { id: 'interactive', name: 'אינטראקטיבי', icon: Zap, color: 'yellow' },
  { id: 'break', name: 'הפסקה', icon: Pause, color: 'gray' },
  { id: 'reflection', name: 'הרהור', icon: Star, color: 'pink' },
  { id: 'summary', name: 'סיכום', icon: Check, color: 'teal' }
];

const LessonGenerator = ({ onGenerate, onCancel }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customLesson, setCustomLesson] = useState({
    title: '',
    description: '',
    difficulty: 'beginner',
    duration: 60
  });
  const [selectedSlideTypes, setSelectedSlideTypes] = useState([]);
  const [generatedSlides, setGeneratedSlides] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Generate slides from template
  const generateFromTemplate = (template) => {
    setSelectedTemplate(template);
    setGeneratedSlides(template.slides.map((slide, index) => ({
      ...slide,
      order: index + 1,
      id: `slide-${Date.now()}-${index}`
    })));
  };

  // Generate custom slides
  const generateCustomSlides = () => {
    const slides = [];
    selectedSlideTypes.forEach((slideType, index) => {
      const baseSlide = {
        id: `slide-${Date.now()}-${index}`,
        order: index + 1,
        title: `${slideType.name} ${index + 1}`,
        type: slideType.id
      };

      switch (slideType.id) {
        case 'presentation':
          slides.push({
            ...baseSlide,
            content: {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              elements: [
                {
                  type: 'title',
                  text: baseSlide.title,
                  style: {
                    fontSize: '3rem',
                    color: 'white',
                    textAlign: 'center',
                    direction: 'rtl',
                    fontFamily: 'Arial, sans-serif'
                  }
                }
              ]
            }
          });
          break;

        case 'poll':
          slides.push({
            ...baseSlide,
            content: {
              question: 'שאלת סקר',
              options: ['אפשרות 1', 'אפשרות 2', 'אפשרות 3', 'אפשרות 4']
            }
          });
          break;

        case 'quiz':
          slides.push({
            ...baseSlide,
            content: {
              question: 'שאלת חידון',
              options: [
                { id: 'a', text: 'תשובה א', correct: false },
                { id: 'b', text: 'תשובה ב', correct: true },
                { id: 'c', text: 'תשובה ג', correct: false },
                { id: 'd', text: 'תשובה ד', correct: false }
              ]
            }
          });
          break;

        case 'video':
          slides.push({
            ...baseSlide,
            content: {
              videoUrl: '',
              description: 'תיאור הוידאו'
            }
          });
          break;

        case 'interactive':
          slides.push({
            ...baseSlide,
            content: {
              component: 'CodeEditor',
              language: 'javascript',
              code: 'console.log("Hello, World!");',
              theme: 'vs-dark',
              readOnly: false
            }
          });
          break;

        case 'break':
          slides.push({
            ...baseSlide,
            content: {
              duration: 300,
              message: 'קחו הפסקה קצרה'
            }
          });
          break;

        case 'reflection':
          slides.push({
            ...baseSlide,
            content: {
              question: 'מה למדתם?',
              prompt: 'שתפו את המחשבות שלכם'
            }
          });
          break;

        case 'summary':
          slides.push({
            ...baseSlide,
            content: {
              points: ['נקודה 1', 'נקודה 2', 'נקודה 3']
            }
          });
          break;

        default:
          slides.push(baseSlide);
      }
    });

    setGeneratedSlides(slides);
  };

  // Toggle slide type selection
  const toggleSlideType = (slideType) => {
    setSelectedSlideTypes(prev => 
      prev.find(st => st.id === slideType.id)
        ? prev.filter(st => st.id !== slideType.id)
        : [...prev, slideType]
    );
  };

  // Handle slide reordering
  const moveSlide = (fromIndex, toIndex) => {
    const newSlides = [...generatedSlides];
    const [movedSlide] = newSlides.splice(fromIndex, 1);
    newSlides.splice(toIndex, 0, movedSlide);
    
    // Update order
    newSlides.forEach((slide, index) => {
      slide.order = index + 1;
    });
    
    setGeneratedSlides(newSlides);
  };

  // Delete slide
  const deleteSlide = (index) => {
    const newSlides = generatedSlides.filter((_, i) => i !== index);
    newSlides.forEach((slide, i) => {
      slide.order = i + 1;
    });
    setGeneratedSlides(newSlides);
  };

  // Generate final lesson
  const handleGenerate = () => {
    const lesson = {
      ...customLesson,
      slides: generatedSlides,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    onGenerate(lesson);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 px-6 py-4 rounded-t-lg flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Lesson Generator</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`px-3 py-1 rounded ${previewMode ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              <Eye className="w-4 h-4" />
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
            {/* Templates */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">תבניות מוכנות</h3>
              <div className="space-y-2">
                {Object.entries(LESSON_TEMPLATES).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => generateFromTemplate(template)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedTemplate?.name === template.name
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <h4 className="font-semibold">{template.name}</h4>
                    <p className="text-sm opacity-75">{template.description}</p>
                    <div className="flex items-center space-x-2 mt-2 text-xs">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{template.duration} min</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{template.difficulty}</span>
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Lesson */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">שיעור מותאם אישית</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="כותרת השיעור"
                  value={customLesson.title}
                  onChange={(e) => setCustomLesson({ ...customLesson, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                />
                <textarea
                  placeholder="תיאור השיעור"
                  value={customLesson.description}
                  onChange={(e) => setCustomLesson({ ...customLesson, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white resize-none"
                  rows="3"
                />
                <select
                  value={customLesson.difficulty}
                  onChange={(e) => setCustomLesson({ ...customLesson, difficulty: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  <option value="beginner">מתחיל</option>
                  <option value="intermediate">בינוני</option>
                  <option value="advanced">מתקדם</option>
                </select>
                <input
                  type="number"
                  placeholder="משך (דקות)"
                  value={customLesson.duration}
                  onChange={(e) => setCustomLesson({ ...customLesson, duration: parseInt(e.target.value) || 60 })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                />
              </div>
            </div>

            {/* Slide Types */}
            <div className="p-4 flex-1">
              <h3 className="text-lg font-semibold text-white mb-4">סוגי שקופיות</h3>
              <div className="space-y-2">
                {SLIDE_TYPES.map((slideType) => {
                  const Icon = slideType.icon;
                  const isSelected = selectedSlideTypes.find(st => st.id === slideType.id);
                  return (
                    <button
                      key={slideType.id}
                      onClick={() => toggleSlideType(slideType)}
                      className={`w-full p-3 rounded-lg text-left transition-colors flex items-center space-x-3 ${
                        isSelected
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{slideType.name}</span>
                      {isSelected && <Check className="w-4 h-4 ml-auto" />}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={generateCustomSlides}
                disabled={selectedSlideTypes.length === 0}
                className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                צור שקופיות
              </button>
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col">
            {previewMode ? (
              /* Preview Mode */
              <div className="flex-1 bg-gray-900 p-4">
                <div className="h-full bg-white rounded-lg shadow-lg relative overflow-hidden">
                  {generatedSlides[currentSlideIndex] && (
                    <div className="h-full flex flex-col">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <h2 className="text-3xl font-bold mb-4">
                            {generatedSlides[currentSlideIndex].title}
                          </h2>
                          <p className="text-gray-600">
                            סוג: {generatedSlides[currentSlideIndex].type}
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-100 flex items-center justify-between">
                        <button
                          onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                          disabled={currentSlideIndex === 0}
                          className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                        >
                          הקודם
                        </button>
                        <span className="text-sm text-gray-600">
                          {currentSlideIndex + 1} / {generatedSlides.length}
                        </span>
                        <button
                          onClick={() => setCurrentSlideIndex(Math.min(generatedSlides.length - 1, currentSlideIndex + 1))}
                          disabled={currentSlideIndex === generatedSlides.length - 1}
                          className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                        >
                          הבא
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Edit Mode */
              <div className="flex-1 p-4">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      שקופיות שנוצרו ({generatedSlides.length})
                    </h3>
                    <button
                      onClick={handleGenerate}
                      disabled={generatedSlides.length === 0}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      צור שיעור
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto space-y-2">
                    {generatedSlides.map((slide, index) => (
                      <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-400">#{slide.order}</span>
                            <div>
                              <h4 className="text-white font-semibold">{slide.title}</h4>
                              <p className="text-gray-400 text-sm">{slide.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => moveSlide(index, Math.max(0, index - 1))}
                              disabled={index === 0}
                              className="p-1 text-gray-400 hover:text-white disabled:opacity-50"
                            >
                              ↑
                            </button>
                            <button
                              onClick={() => moveSlide(index, Math.min(generatedSlides.length - 1, index + 1))}
                              disabled={index === generatedSlides.length - 1}
                              className="p-1 text-gray-400 hover:text-white disabled:opacity-50"
                            >
                              ↓
                            </button>
                            <button
                              onClick={() => deleteSlide(index)}
                              className="p-1 text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonGenerator; 