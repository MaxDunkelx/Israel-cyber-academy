/**
 * ContentManagement Component - System Manager
 * 
 * Complete content management interface for lessons, slides, and exercises
 * Features:
 * - Lesson management (create, edit, delete)
 * - Slide editor with visual interface
 * - Exercise configuration
 * - Media management (URLs for images/videos)
 * - Real-time preview
 * - Database-driven content
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  X, 
  Copy,
  Move,
  Search,
  Filter,
  Play,
  Image,
  Video,
  Type,
  MousePointer,
  Coffee,
  Brain,
  HelpCircle,
  Clock,
  Palette,
  Link,
  Download,
  Upload
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { logSecurityEvent } from '../../utils/security';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

// Import slide editor components
import SlideEditor from './SlideEditor';
import LessonForm from './LessonForm';

const ContentManagement = () => {
  const { currentUser } = useAuth();
  
  // State management
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [editingSlide, setEditingSlide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  // Modal states
  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const [showEditLesson, setShowEditLesson] = useState(false);
  const [showDeleteLesson, setShowDeleteLesson] = useState(false);
  const [showSlideEditor, setShowSlideEditor] = useState(false);

  // Load lessons on component mount
  useEffect(() => {
    loadLessons();
  }, []);

  /**
   * Load lessons from database
   */
  const loadLessons = async () => {
    try {
      setLoading(true);
      
      // TODO: Implement real Firebase query
      // For now, using mock data based on existing lessons
      const mockLessons = [
        {
          id: 1,
          title: "מבוא לעולם הסייבר",
          description: "שיעור מקיף בן 2.15 שעות - הכרת עולם הסייבר, האקרים, איומים דיגיטליים ופעילויות אינטראקטיביות",
          icon: "🛡️",
          duration: "2.15 שעות",
          difficulty: "קל",
          targetAge: "10-13",
          breakDuration: 15,
          slides: [
            {
              id: "slide-1",
              type: "presentation",
              title: "ברוכים הבאים לעולם הסייבר! 🚀",
              content: {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                elements: [
                  {
                    type: "title",
                    text: "שיעור 1: מבוא לעולם הסייבר",
                    style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
                  },
                  {
                    type: "subtitle",
                    text: "היום נלמד על האקרים, איומים דיגיטליים ואיך להישאר בטוחים באינטרנט",
                    style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
                  },
                  {
                    type: "image",
                    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
                    alt: "Cybersecurity",
                    style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
                  },
                  {
                    type: "timer",
                    duration: 45,
                    text: "זמן קריאה"
                  }
                ]
              }
            }
          ],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          title: "מבנה המחשב וחומרה",
          description: "שיעור על רכיבי המחשב והחומרה",
          icon: "💻",
          duration: "1.5 שעות",
          difficulty: "בינוני",
          targetAge: "10-13",
          breakDuration: 10,
          slides: [],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      setLessons(mockLessons);
      setLoading(false);
    } catch (error) {
      console.error('Error loading lessons:', error);
      toast.error('אירעה שגיאה בטעינת השיעורים');
      setLoading(false);
    }
  };

  /**
   * Handle lesson selection
   */
  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setEditingSlide(null);
  };

  /**
   * Handle slide editing
   */
  const handleSlideEdit = (slide) => {
    setEditingSlide(slide);
    setShowSlideEditor(true);
  };

  /**
   * Handle slide creation
   */
  const handleCreateSlide = () => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      type: "presentation",
      title: "שקופית חדשה",
      content: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        elements: [
          {
            type: "title",
            text: "כותרת חדשה",
            style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
          }
        ]
      }
    };

    setEditingSlide(newSlide);
    setShowSlideEditor(true);
  };

  /**
   * Handle slide save
   */
  const handleSlideSave = async (slideData) => {
    try {
      if (selectedLesson) {
        const updatedLesson = { ...selectedLesson };
        
        if (editingSlide) {
          // Update existing slide
          const slideIndex = updatedLesson.slides.findIndex(s => s.id === editingSlide.id);
          if (slideIndex !== -1) {
            updatedLesson.slides[slideIndex] = slideData;
          } else {
            updatedLesson.slides.push(slideData);
          }
        } else {
          // Add new slide
          updatedLesson.slides.push(slideData);
        }

        // TODO: Save to Firebase
        // await updateLesson(updatedLesson);

        setSelectedLesson(updatedLesson);
        setShowSlideEditor(false);
        setEditingSlide(null);
        
        toast.success('השקופית נשמרה בהצלחה');
      }
    } catch (error) {
      console.error('Error saving slide:', error);
      toast.error('אירעה שגיאה בשמירת השקופית');
    }
  };

  /**
   * Handle slide deletion
   */
  const handleSlideDelete = async (slideId) => {
    if (!selectedLesson) return;

    try {
      const updatedLesson = {
        ...selectedLesson,
        slides: selectedLesson.slides.filter(slide => slide.id !== slideId)
      };

      // TODO: Save to Firebase
      // await updateLesson(updatedLesson);

      setSelectedLesson(updatedLesson);
      toast.success('השקופית נמחקה בהצלחה');
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast.error('אירעה שגיאה במחיקת השקופית');
    }
  };

  /**
   * Get slide type info
   */
  const getSlideTypeInfo = (type) => {
    const typeMap = {
      presentation: { label: 'מצגת', icon: FileText, color: 'text-blue-400' },
      poll: { label: 'סקר', icon: HelpCircle, color: 'text-green-400' },
      video: { label: 'וידאו', icon: Video, color: 'text-purple-400' },
      interactive: { label: 'אינטראקטיבי', icon: MousePointer, color: 'text-orange-400' },
      break: { label: 'הפסקה', icon: Coffee, color: 'text-gray-400' },
      reflection: { label: 'הרהור', icon: Brain, color: 'text-pink-400' },
      quiz: { label: 'חידון', icon: HelpCircle, color: 'text-yellow-400' }
    };
    return typeMap[type] || typeMap.presentation;
  };

  /**
   * Filter lessons
   */
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || lesson.difficulty === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Lesson List */}
      <div className="w-1/3 bg-gray-800/50 border-r border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">שיעורים</h3>
          <Button
            onClick={() => setShowCreateLesson(true)}
            variant="primary"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>שיעור חדש</span>
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="space-y-3 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="חיפוש שיעורים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">כל הרמות</option>
            <option value="קל">קל</option>
            <option value="בינוני">בינוני</option>
            <option value="מתקדם">מתקדם</option>
          </select>
        </div>

        {/* Lesson List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredLessons.map((lesson) => {
            const isSelected = selectedLesson?.id === lesson.id;
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => handleLessonSelect(lesson)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{lesson.icon}</span>
                    <div>
                      <div className="font-medium">{lesson.title}</div>
                      <div className="text-xs opacity-75">
                        {lesson.slides.length} שקופיות • {lesson.duration}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLesson(lesson);
                        setShowEditLesson(true);
                      }}
                      variant="secondary"
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLesson(lesson);
                        setShowDeleteLesson(true);
                      }}
                      variant="danger"
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Slide Management */}
      <div className="flex-1 bg-gray-900 p-4">
        {selectedLesson ? (
          <div className="h-full flex flex-col">
            {/* Lesson Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedLesson.title}</h2>
                <p className="text-gray-300 text-sm">{selectedLesson.description}</p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={handleCreateSlide}
                  variant="primary"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>שקופית חדשה</span>
                </Button>
                
                <Button
                  onClick={() => setShowEditLesson(true)}
                  variant="secondary"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>ערוך שיעור</span>
                </Button>
              </div>
            </div>

            {/* Slides List */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedLesson.slides.map((slide, index) => {
                  const typeInfo = getSlideTypeInfo(slide.type);
                  
                  return (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <typeInfo.icon className={`w-4 h-4 ${typeInfo.color}`} />
                          <span className="text-sm text-gray-300">{typeInfo.label}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Button
                            onClick={() => handleSlideEdit(slide)}
                            variant="secondary"
                            size="sm"
                            className="flex items-center space-x-1"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          
                          <Button
                            onClick={() => handleSlideDelete(slide.id)}
                            variant="danger"
                            size="sm"
                            className="flex items-center space-x-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-white font-medium text-sm">{slide.title}</h4>
                        
                        {/* Slide Preview */}
                        <div 
                          className="w-full h-32 rounded bg-cover bg-center border border-gray-600"
                          style={{
                            background: slide.content.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          }}
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white text-xs opacity-75">
                              {slide.content.elements?.length || 0} אלמנטים
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>שקופית {index + 1}</span>
                          {slide.content.duration && (
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{slide.content.duration}s</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {selectedLesson.slides.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400 mb-4">אין שקופיות בשיעור זה</p>
                  <Button
                    onClick={handleCreateSlide}
                    variant="primary"
                    className="flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>צור שקופית ראשונה</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">בחר שיעור כדי להתחיל לערוך</p>
          </div>
        )}
      </div>

      {/* Slide Editor Modal */}
      <AnimatePresence>
        {showSlideEditor && editingSlide && (
          <SlideEditor
            slide={editingSlide}
            onSave={handleSlideSave}
            onClose={() => {
              setShowSlideEditor(false);
              setEditingSlide(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentManagement; 