/**
 * ContentManagement Component - System Manager
 * 
 * Perfect content management interface with:
 * - Lesson creation, editing, and deletion
 * - Advanced slide editor with JSON tools
 * - Live preview for all slide types
 * - Drag-and-drop reordering
 * - Beautiful UI with animations
 * - Comprehensive error handling
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  FolderOpen, 
  FileText,
  Plus,
  Pencil,
  Eye,
  Trash2,
  Settings,
  Code,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  Sparkles,
  Play,
  Square,
  X,
  Check,
  Copy,
  Grid3X3,
  List,
  Palette,
  Type,
  Image,
  Save,
  RotateCcw,
  AlertCircle,
  Info,
  BookOpen,
  Clock,
  Users,
  Star,
  MoreVertical,
  Edit3,
  Copy as CopyIcon,
  Download,
  Upload,
  Zap,
  Shield,
  Target,
  MessageSquare,
  Video,
  Music,
  Layers
} from 'lucide-react';
import { getAllLessons, getSlidesByLessonId, updateSlide, createSlide, deleteSlide, createLesson, updateLesson, deleteLesson } from '../../firebase/content-service';
import ComprehensiveSlideEditor from './ComprehensiveSlideEditor';
import AdvancedSlideEditor from './AdvancedSlideEditor';
import LessonGenerator from './LessonGenerator';

const ContentManagement = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [slides, setSlides] = useState([]);
  const [editingSlide, setEditingSlide] = useState(null);
  const [previewSlide, setPreviewSlide] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [quickEditMode, setQuickEditMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [draggedSlide, setDraggedSlide] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [useAdvancedEditor, setUseAdvancedEditor] = useState(false);
  const [showLessonGenerator, setShowLessonGenerator] = useState(false);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      const lessonsData = await getAllLessons();
      setLessons(lessonsData);
    } catch (err) {
      setError('Failed to load lessons: ' + err.message);
      console.error('Error loading lessons:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSlides = async (lessonId) => {
    try {
      setError(null);
      const slidesData = await getSlidesByLessonId(lessonId);
      setSlides(slidesData);
    } catch (err) {
      setError('Failed to load slides: ' + err.message);
      console.error('Error loading slides:', err);
    }
  };

  const handleLessonClick = async (lesson) => {
    if (selectedLesson?.id === lesson.id) {
      setSelectedLesson(null);
      setSlides([]);
    } else {
      setSelectedLesson(lesson);
      await loadSlides(lesson.id);
    }
  };

  const handleSlideClick = (slide) => {
    setPreviewSlide(slide);
    setQuickEditMode(false);
    setSelectedElement(null);
  };

  const handleEditSlide = (slide) => {
    setEditingSlide(slide);
    setPreviewSlide(null);
  };

  const handleSaveSlide = async (slideData) => {
    try {
      setError(null);
      setSuccessMessage(null);
      
      // Ensure the slide has the correct lessonId (Firestore document ID)
      const slideToSave = {
        ...slideData,
        lessonId: selectedLesson.id // Always use Firestore document ID
      };
      
      if (editingSlide.id) {
        await updateSlide(editingSlide.id, slideToSave);
        setSuccessMessage('Slide updated successfully!');
      } else {
        await createSlide(slideToSave);
        setSuccessMessage('Slide created successfully!');
      }
      
      await loadSlides(selectedLesson.id);
      setEditingSlide(null);
      
      // Auto-hide success message
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to save slide: ' + err.message);
      console.error('Error saving slide:', err);
    }
  };

  const handleDeleteSlide = async (slideId) => {
    try {
      setError(null);
      await deleteSlide(slideId);
      await loadSlides(selectedLesson.id);
      setPreviewSlide(null);
      setSuccessMessage('Slide deleted successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to delete slide: ' + err.message);
      console.error('Error deleting slide:', err);
    }
  };

  const handleCreateNewSlide = () => {
    const newSlide = {
      lessonId: selectedLesson.id, // Use Firestore document ID
      title: 'שקופית חדשה',
      type: 'presentation',
      order: slides.length + 1,
      content: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        elements: [
          {
            type: 'title',
            text: 'שקופית חדשה',
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
    };
    setEditingSlide(newSlide);
  };

  const handleDuplicateSlide = async (slide) => {
    const duplicatedSlide = {
      ...slide,
      id: null,
      title: `${slide.title} (העתק)`,
      order: slides.length + 1
    };
    setEditingSlide(duplicatedSlide);
  };

  const handleCreateNewLesson = () => {
    setEditingLesson({
      title: 'שיעור חדש',
      description: 'תיאור השיעור',
      order: lessons.length + 1,
      difficulty: 'beginner',
      duration: 60,
      tags: []
    });
    setShowLessonModal(true);
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setShowLessonModal(true);
  };

  const handleSaveLesson = async (lessonData) => {
    try {
      setError(null);
      setSuccessMessage(null);
      
      if (editingLesson.id) {
        await updateLesson(editingLesson.id, lessonData);
        setSuccessMessage('Lesson updated successfully!');
      } else {
        await createLesson(lessonData);
        setSuccessMessage('Lesson created successfully!');
      }
      
      await loadLessons();
      setShowLessonModal(false);
      setEditingLesson(null);
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to save lesson: ' + err.message);
      console.error('Error saving lesson:', err);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      setError(null);
      await deleteLesson(lessonId);
      await loadLessons();
      setShowConfirmDelete(null);
      setSuccessMessage('Lesson deleted successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to delete lesson: ' + err.message);
      console.error('Error deleting lesson:', err);
    }
  };

  const handleGenerateLesson = async (lessonData) => {
    try {
      setError(null);
      setSuccessMessage(null);
      
      // Create the lesson first
      const newLesson = await createLesson({
        title: lessonData.title,
        description: lessonData.description,
        difficulty: lessonData.difficulty,
        duration: lessonData.duration
      });
      
      // Create all slides for the lesson
      for (const slide of lessonData.slides) {
        await createSlide({
          ...slide,
          lessonId: newLesson.id // Use Firestore document ID
        });
      }
      
      await loadLessons();
      setShowLessonGenerator(false);
      setSuccessMessage('Lesson generated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to generate lesson: ' + err.message);
      console.error('Error generating lesson:', err);
    }
  };

  const handleQuickEdit = (elementIndex, updates) => {
    if (!previewSlide) return;
    
    const newElements = [...previewSlide.content.elements];
    newElements[elementIndex] = { ...newElements[elementIndex], ...updates };
    
    setPreviewSlide({
      ...previewSlide,
      content: { ...previewSlide.content, elements: newElements }
    });
  };

  const handleSaveQuickEdit = async () => {
    if (!previewSlide) return;
    
    try {
      await updateSlide(previewSlide.id, previewSlide);
      await loadSlides(selectedLesson.id);
      setQuickEditMode(false);
      setSelectedElement(null);
      setSuccessMessage('Quick edit saved!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to save changes: ' + err.message);
      console.error('Error saving quick edit:', err);
    }
  };

  const handleDragStart = (e, slide) => {
    setDraggedSlide(slide);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetSlide) => {
    e.preventDefault();
    if (!draggedSlide || draggedSlide.id === targetSlide.id) return;

    try {
      // Update slide orders
      const newSlides = [...slides];
      const draggedIndex = newSlides.findIndex(s => s.id === draggedSlide.id);
      const targetIndex = newSlides.findIndex(s => s.id === targetSlide.id);
      
      // Remove dragged slide and insert at target position
      const [draggedItem] = newSlides.splice(draggedIndex, 1);
      newSlides.splice(targetIndex, 0, draggedItem);
      
      // Update orders
      newSlides.forEach((slide, index) => {
        slide.order = index + 1;
      });
      
      setSlides(newSlides);
      
      // Save all updated slides
      for (const slide of newSlides) {
        await updateSlide(slide.id, slide);
      }
      
      setSuccessMessage('Slide order updated!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to reorder slides: ' + err.message);
      console.error('Error reordering slides:', err);
    } finally {
      setDraggedSlide(null);
    }
  };

  const getSlideTypeIcon = (type) => {
    switch (type) {
      case 'presentation': return <FileText className="w-4 h-4" />;
      case 'poll': return <MessageSquare className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'interactive': return <Zap className="w-4 h-4" />;
      case 'break': return <Clock className="w-4 h-4" />;
      case 'reflection': return <BookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getSlideTypeColor = (type) => {
    switch (type) {
      case 'presentation': return 'bg-blue-500';
      case 'poll': return 'bg-green-500';
      case 'quiz': return 'bg-yellow-500';
      case 'video': return 'bg-red-500';
      case 'interactive': return 'bg-purple-500';
      case 'break': return 'bg-gray-500';
      case 'reflection': return 'bg-indigo-500';
      default: return 'bg-blue-500';
    }
  };

  const filteredLessons = lessons.filter(lesson =>
    lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading content...</p>
        </div>
      </div>
    );
  }

  if (editingSlide) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="bg-gray-800 shadow-lg border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setEditingSlide(null)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ArrowUp className="w-5 h-5 rotate-90" />
                  <span>Back to Content</span>
                </button>
                <span className="text-gray-600">|</span>
                <h1 className="text-xl font-semibold text-white">
                  {editingSlide.id ? 'Edit Slide' : 'Create New Slide'}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          {useAdvancedEditor ? (
            <AdvancedSlideEditor
              slide={editingSlide}
              onSave={handleSaveSlide}
              onCancel={() => setEditingSlide(null)}
            />
          ) : (
            <ComprehensiveSlideEditor
              slide={editingSlide}
              onSave={handleSaveSlide}
              onCancel={() => setEditingSlide(null)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Content Manager</h1>
              <p className="text-gray-400">Manage your lessons and slides with advanced editing tools</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCreateNewLesson}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Lesson</span>
              </button>
              <button
                onClick={() => setShowLessonGenerator(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Lesson</span>
              </button>
              <button
                onClick={() => setUseAdvancedEditor(!useAdvancedEditor)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  useAdvancedEditor 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={useAdvancedEditor ? 'Switch to Basic Editor' : 'Switch to Advanced Editor'}
              >
                <Zap className="w-4 h-4" />
                <span className="text-sm">{useAdvancedEditor ? 'Advanced' : 'Basic'}</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Error and Success Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg flex items-center space-x-2"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-300 hover:text-red-100"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
          
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-lg flex items-center space-x-2"
            >
              <Check className="w-5 h-5" />
              <span>{successMessage}</span>
              <button
                onClick={() => setSuccessMessage(null)}
                className="ml-auto text-green-300 hover:text-green-100"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lessons List */}
        <div className="space-y-4">
          {filteredLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
            >
              {/* Lesson Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLessonClick(lesson)}
                      className="flex items-center space-x-3 text-white hover:text-blue-400 transition-colors"
                    >
                      {selectedLesson?.id === lesson.id ? (
                        <FolderOpen className="w-6 h-6 text-blue-400" />
                      ) : (
                        <Folder className="w-6 h-6" />
                      )}
                      <div className="text-right">
                        <h3 className="text-lg font-semibold">{lesson.title}</h3>
                        <p className="text-gray-400 text-sm">{lesson.description}</p>
                      </div>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>{slides.length} slides</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{lesson.duration || 60} min</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{lesson.difficulty || 'beginner'}</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEditLesson(lesson)}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                        title="Edit Lesson"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowConfirmDelete({ type: 'lesson', id: lesson.id, title: lesson.title })}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete Lesson"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slides Section */}
              <AnimatePresence>
                {selectedLesson?.id === lesson.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6"
                  >
                    {/* Slides Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-white">Slides</h4>
                      <button
                        onClick={handleCreateNewSlide}
                        className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>New Slide</span>
                      </button>
                    </div>

                    {/* Slides Grid */}
                    {slides.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {slides.map((slide, slideIndex) => (
                          <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: slideIndex * 0.05 }}
                            draggable
                            onDragStart={(e) => handleDragStart(e, slide)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, slide)}
                            className={`relative group cursor-move ${
                              draggedSlide?.id === slide.id ? 'opacity-50' : ''
                            }`}
                          >
                            <div
                              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-blue-500 transition-all duration-200"
                              onClick={() => handleSlideClick(slide)}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <div className={`p-1 rounded ${getSlideTypeColor(slide.type)}`}>
                                    {getSlideTypeIcon(slide.type)}
                                  </div>
                                  <span className="text-sm text-gray-300">{slide.type}</span>
                                </div>
                                <span className="text-xs text-gray-500">#{slide.order}</span>
                              </div>
                              
                              <h5 className="text-white font-medium mb-2 line-clamp-2">{slide.title}</h5>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditSlide(slide);
                                    }}
                                    className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                                    title="Edit Slide"
                                  >
                                    <Pencil className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDuplicateSlide(slide);
                                    }}
                                    className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                                    title="Duplicate Slide"
                                  >
                                    <CopyIcon className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowConfirmDelete({ type: 'slide', id: slide.id, title: slide.title });
                                    }}
                                    className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                                    title="Delete Slide"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-400 mb-2">No slides yet</h3>
                        <p className="text-gray-500 mb-4">Create your first slide to get started</p>
                        <button
                          onClick={handleCreateNewSlide}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Create First Slide
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-16">
            <Folder className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 mb-4">No lessons found</h2>
            <p className="text-gray-500 mb-8">Create your first lesson to start building content</p>
            <button
              onClick={handleCreateNewLesson}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Create Your First Lesson
            </button>
          </div>
        )}
      </div>

      {/* Slide Preview Modal */}
      <AnimatePresence>
        {previewSlide && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden border border-gray-700"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded ${getSlideTypeColor(previewSlide.type)}`}>
                    {getSlideTypeIcon(previewSlide.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{previewSlide.title}</h3>
                    <p className="text-gray-400 text-sm">Slide #{previewSlide.order} • {previewSlide.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditSlide(previewSlide)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setPreviewSlide(null)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-6">
                <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {/* Render the actual slide component here */}
                  <div className="w-full h-full">
                    {/* This would render the actual slide component */}
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-6xl mb-6">
                          {previewSlide.type === 'presentation' && '📄'}
                          {previewSlide.type === 'poll' && '📊'}
                          {previewSlide.type === 'quiz' && '🎯'}
                          {previewSlide.type === 'video' && '🎥'}
                          {previewSlide.type === 'interactive' && '🎮'}
                          {previewSlide.type === 'break' && '⏰'}
                          {previewSlide.type === 'reflection' && '💭'}
                        </div>
                        <h2 className="text-3xl font-bold mb-4">{previewSlide.title}</h2>
                        <p className="text-gray-300 text-lg mb-2">Slide Type: {previewSlide.type}</p>
                        <p className="text-gray-400 text-sm">
                          Click "Edit" to modify this slide with advanced tools
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lesson Modal */}
      <AnimatePresence>
        {showLessonModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-700"
            >
              <LessonModal
                lesson={editingLesson}
                onSave={handleSaveLesson}
                onCancel={() => {
                  setShowLessonModal(false);
                  setEditingLesson(null);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {showConfirmDelete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg shadow-2xl max-w-md w-full border border-gray-700 p-6"
            >
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Confirm Delete</h3>
                <p className="text-gray-400 mb-6">
                  Are you sure you want to delete "{showConfirmDelete.title}"? This action cannot be undone.
                </p>
                
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setShowConfirmDelete(null)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (showConfirmDelete.type === 'lesson') {
                        handleDeleteLesson(showConfirmDelete.id);
                      } else {
                        handleDeleteSlide(showConfirmDelete.id);
                      }
                      setShowConfirmDelete(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lesson Generator Modal */}
      <AnimatePresence>
        {showLessonGenerator && (
          <LessonGenerator
            onGenerate={handleGenerateLesson}
            onCancel={() => setShowLessonGenerator(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Lesson Modal Component
const LessonModal = ({ lesson, onSave, onCancel }) => {
  const [formData, setFormData] = useState(lesson || {});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          {lesson?.id ? 'Edit Lesson' : 'Create New Lesson'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter lesson title..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter lesson description..."
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
            <input
              type="number"
              value={formData.order || 1}
              onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Duration (minutes)</label>
            <input
              type="number"
              value={formData.duration || 60}
              onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
          <select
            value={formData.difficulty || 'beginner'}
            onChange={(e) => handleInputChange('difficulty', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-4 mt-8">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {lesson?.id ? 'Update Lesson' : 'Create Lesson'}
        </button>
      </div>
    </div>
  );
};

export default ContentManagement; 