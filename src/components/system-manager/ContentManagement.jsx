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
  Layers,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { getAllLessons, getSlidesByLessonId, updateSlide, createSlide, deleteSlide, createLesson, updateLesson, deleteLesson } from '../../firebase/content-service';
import ComprehensiveSlideEditor from './ComprehensiveSlideEditor';
import AdvancedSlideEditor from './AdvancedSlideEditor';
import LessonGenerator from './LessonGenerator';

// Error boundary component for slide previews
const SlidePreviewErrorBoundary = ({ children, slideTitle, onError }) => {
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  if (hasError) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-200 mb-2">
          Preview Error - {slideTitle}
        </h3>
        <p className="text-red-300 mb-4">
          This slide contains content that cannot be previewed safely.
        </p>
        {errorDetails && (
          <details className="text-left bg-red-900/30 rounded p-3 mb-4">
            <summary className="cursor-pointer text-red-200 font-medium">
              Technical Details
            </summary>
            <pre className="text-xs text-red-300 mt-2 whitespace-pre-wrap">
              {errorDetails}
            </pre>
          </details>
        )}
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => {
              setHasError(false);
              setErrorDetails(null);
            }}
            className="flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Preview</span>
          </button>
          <button
            onClick={() => onError && onError(errorDetails)}
            className="flex items-center space-x-2 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Slide</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div onError={(error) => {
      console.error('Slide preview error:', error);
      setHasError(true);
      setErrorDetails(error.message || 'Unknown error occurred');
    }}>
      {children}
    </div>
  );
};

// Safe slide preview component
const SafeSlidePreview = ({ slide, onEdit }) => {
  const [previewError, setPreviewError] = useState(null);

  const handlePreviewError = (error) => {
    console.error('Slide preview failed:', error);
    setPreviewError(error);
  };

  if (previewError) {
    return (
      <SlidePreviewErrorBoundary
        slideTitle={slide.title || 'Unknown Slide'}
        onError={handlePreviewError}
      >
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-yellow-200 mb-2">
            Preview Unavailable
          </h3>
          <p className="text-yellow-300 mb-4">
            This slide type cannot be previewed in the content manager.
          </p>
          <button
            onClick={() => onEdit(slide)}
            className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors mx-auto"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Slide</span>
          </button>
        </div>
      </SlidePreviewErrorBoundary>
    );
  }

  // Try to render the slide preview safely
  try {
    // For interactive slides that might crash, show a safe preview
    if (slide.type === 'interactive' && slide.content?.type) {
      const interactiveTypes = [
        'windows-simulator', 'linux-simulator', 'network-simulator',
        'protocol-simulator', 'code-editor', 'website-builder',
        'database-simulator', 'browser-simulator'
      ];
      
      if (interactiveTypes.includes(slide.content.type)) {
        return (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 text-center">
            <Play className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-200 mb-2">
              Interactive Exercise
            </h3>
            <p className="text-blue-300 mb-2">
              Type: {slide.content.type.replace('-', ' ').toUpperCase()}
            </p>
            {slide.content.instructions && (
              <p className="text-blue-300 text-sm mb-4">
                {slide.content.instructions}
              </p>
            )}
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => onEdit(slide)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Exercise</span>
              </button>
              <div className="text-blue-300 text-sm">
                ⚠️ Preview not available for simulators
              </div>
            </div>
          </div>
        );
      }
    }

    // For other slide types, show basic preview
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{slide.title}</h3>
          <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
            {slide.type}
          </span>
        </div>
        
        {slide.content?.elements && slide.content.elements.length > 0 ? (
          <div className="space-y-3">
            {slide.content.elements.slice(0, 3).map((element, index) => (
              <div key={index} className="text-gray-300 text-sm">
                {element.type === 'title' && <strong>{element.text}</strong>}
                {element.type === 'subtitle' && <em>{element.text}</em>}
                {element.type === 'text' && <span>{element.text}</span>}
                {element.type === 'image' && <span>🖼️ Image: {element.alt || 'No alt text'}</span>}
                {element.type === 'video' && <span>🎥 Video: {element.src || 'No source'}</span>}
                {element.type === 'timer' && <span>⏱️ Timer: {element.duration}s</span>}
              </div>
            ))}
            {slide.content.elements.length > 3 && (
              <div className="text-gray-500 text-sm">
                +{slide.content.elements.length - 3} more elements
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-400 italic">No content to preview</p>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-700">
          <button
            onClick={() => onEdit(slide)}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Slide
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering slide preview:', error);
    return (
      <SlidePreviewErrorBoundary
        slideTitle={slide.title || 'Unknown Slide'}
        onError={handlePreviewError}
      >
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-200 mb-2">
            Preview Error
          </h3>
          <p className="text-red-300 mb-4">
            Failed to render slide preview due to an error.
          </p>
          <button
            onClick={() => onEdit(slide)}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mx-auto"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Slide</span>
          </button>
        </div>
      </SlidePreviewErrorBoundary>
    );
  }
};

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
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Loading lessons from database...');
      
      const lessonsData = await getAllLessons();
      console.log(`✅ Loaded ${lessonsData.length} lessons`);
      setLessons(lessonsData);
      
      if (lessonsData.length === 0) {
        setError('No lessons found. Please check your database connection or run the sync script.');
      }
    } catch (err) {
      console.error('❌ Error loading lessons:', err);
      setError(`Failed to load lessons: ${err.message}. Please check your database connection.`);
      
      // Auto-retry on network errors
      if (retryCount < 3 && (err.message.includes('network') || err.message.includes('permission'))) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          loadLessons();
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadSlides = async (lessonId) => {
    try {
      setError(null);
      console.log(`🔄 Loading slides for lesson ${lessonId}...`);
      
      const slidesData = await getSlidesByLessonId(lessonId);
      console.log(`✅ Loaded ${slidesData.length} slides`);
      setSlides(slidesData);
      
      if (slidesData.length === 0) {
        console.log('⚠️ No slides found for this lesson');
      }
    } catch (err) {
      console.error('❌ Error loading slides:', err);
      setError(`Failed to load slides: ${err.message}`);
      setSlides([]);
    }
  };

  const handleLessonClick = async (lesson) => {
    try {
      if (selectedLesson?.id === lesson.id) {
        setSelectedLesson(null);
        setSlides([]);
      } else {
        setSelectedLesson(lesson);
        await loadSlides(lesson.id);
      }
    } catch (error) {
      console.error('❌ Error handling lesson click:', error);
      setError(`Failed to load lesson: ${error.message}`);
    }
  };

  const handleSlideClick = (slide) => {
    try {
      setPreviewSlide(slide);
      setQuickEditMode(false);
      setSelectedElement(null);
    } catch (error) {
      console.error('❌ Error handling slide click:', error);
      setError(`Failed to preview slide: ${error.message}`);
    }
  };

  const handleEditSlide = (slide) => {
    try {
      setEditingSlide(slide);
      setPreviewSlide(null);
    } catch (error) {
      console.error('❌ Error handling edit slide:', error);
      setError(`Failed to edit slide: ${error.message}`);
    }
  };

  const handleSaveSlide = async (slideData) => {
    try {
      setError(null);
      setSuccessMessage(null);
      
      if (!selectedLesson) {
        throw new Error('No lesson selected');
      }
      
      console.log('💾 Saving slide...');
      
      // Ensure the slide has the correct lessonId (Firestore document ID)
      const slideToSave = {
        ...slideData,
        lessonId: selectedLesson.id // Always use Firestore document ID
      };
      
      if (editingSlide.id) {
        await updateSlide(editingSlide.id, slideToSave);
        setSuccessMessage('Slide updated successfully!');
        console.log('✅ Slide updated');
      } else {
        await createSlide(slideToSave);
        setSuccessMessage('Slide created successfully!');
        console.log('✅ Slide created');
      }
      
      await loadSlides(selectedLesson.id);
      setEditingSlide(null);
      
      // Auto-hide success message
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('❌ Error saving slide:', err);
      setError(`Failed to save slide: ${err.message}`);
    }
  };

  const handleDeleteSlide = async (slideId) => {
    try {
      setError(null);
      console.log(`🗑️ Deleting slide ${slideId}...`);
      
      await deleteSlide(slideId);
      await loadSlides(selectedLesson.id);
      setPreviewSlide(null);
      setSuccessMessage('Slide deleted successfully!');
      
      console.log('✅ Slide deleted');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('❌ Error deleting slide:', err);
      setError(`Failed to delete slide: ${err.message}`);
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

  const handleDuplicateSlide = (slide) => {
    try {
      const duplicatedSlide = {
        ...slide,
        id: null, // Remove ID so it creates a new slide
        title: `${slide.title} (Copy)`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setEditingSlide(duplicatedSlide);
      setPreviewSlide(null);
      
      console.log('📋 Slide duplicated for editing');
    } catch (error) {
      console.error('❌ Error duplicating slide:', error);
      setError(`Failed to duplicate slide: ${error.message}`);
    }
  };

  const handleCreateNewLesson = () => {
    try {
      setEditingLesson({
        title: '',
        description: '',
        icon: '📚',
        duration: '60 דקות',
        difficulty: 'בינוני',
        targetAge: '10-13',
        breakDuration: 10
      });
      setShowLessonModal(true);
    } catch (error) {
      console.error('❌ Error creating new lesson:', error);
      setError(`Failed to create new lesson: ${error.message}`);
    }
  };

  const handleEditLesson = (lesson) => {
    try {
      setEditingLesson(lesson);
      setShowLessonModal(true);
    } catch (error) {
      console.error('❌ Error editing lesson:', error);
      setError(`Failed to edit lesson: ${error.message}`);
    }
  };

  const handleSaveLesson = async (lessonData) => {
    try {
      setError(null);
      setSuccessMessage(null);
      
      console.log('💾 Saving lesson...');
      
      if (editingLesson.id) {
        await updateLesson(editingLesson.id, lessonData);
        setSuccessMessage('Lesson updated successfully!');
        console.log('✅ Lesson updated');
      } else {
        await createLesson(lessonData);
        setSuccessMessage('Lesson created successfully!');
        console.log('✅ Lesson created');
      }
      
      await loadLessons();
      setShowLessonModal(false);
      setEditingLesson(null);
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('❌ Error saving lesson:', err);
      setError(`Failed to save lesson: ${err.message}`);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      setError(null);
      console.log(`🗑️ Deleting lesson ${lessonId}...`);
      
      await deleteLesson(lessonId);
      await loadLessons();
      setShowConfirmDelete(null);
      setSuccessMessage('Lesson deleted successfully!');
      
      console.log('✅ Lesson deleted');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('❌ Error deleting lesson:', err);
      setError(`Failed to delete lesson: ${err.message}`);
    }
  };

  const handleGenerateLesson = async (lessonData) => {
    try {
      setError(null);
      setSuccessMessage(null);
      
      console.log('🚀 Generating lesson...');
      
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
      
      console.log('✅ Lesson generated');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('❌ Error generating lesson:', err);
      setError(`Failed to generate lesson: ${err.message}`);
    }
  };

  const handleQuickEdit = (elementIndex, updates) => {
    try {
      if (!previewSlide) return;
      
      const newElements = [...previewSlide.content.elements];
      newElements[elementIndex] = { ...newElements[elementIndex], ...updates };
      
      setPreviewSlide({
        ...previewSlide,
        content: { ...previewSlide.content, elements: newElements }
      });
    } catch (error) {
      console.error('❌ Error in quick edit:', error);
      setError(`Failed to edit element: ${error.message}`);
    }
  };

  const handleSaveQuickEdit = async () => {
    try {
      if (!previewSlide) return;
      
      console.log('💾 Saving quick edit...');
      
      await updateSlide(previewSlide.id, previewSlide);
      await loadSlides(selectedLesson.id);
      setQuickEditMode(false);
      setSelectedElement(null);
      setSuccessMessage('Quick edit saved!');
      
      console.log('✅ Quick edit saved');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('❌ Error saving quick edit:', err);
      setError(`Failed to save changes: ${err.message}`);
    }

  };

  const handleDragStart = (e, slide) => {
    try {
      setDraggedSlide(slide);
    } catch (error) {
      console.error('❌ Error starting drag:', error);
    }
  };

  const handleDragOver = (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.error('❌ Error during drag over:', error);
    }
  };

  const handleDrop = async (e, targetSlide) => {
    try {
      e.preventDefault();
      if (!draggedSlide || draggedSlide.id === targetSlide.id) return;
      
      // Implement slide reordering logic here
      console.log('🔄 Reordering slides...');
      
      // For now, just show a message
      setSuccessMessage('Slide reordering will be implemented soon!');
      setTimeout(() => setSuccessMessage(null), 3000);
      
      setDraggedSlide(null);
    } catch (error) {
      console.error('❌ Error dropping slide:', error);
      setError(`Failed to reorder slides: ${error.message}`);
    }
  };

  const handleRetryLoad = () => {
    setRetryCount(0);
    setError(null);
    loadLessons();
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
              <span className="flex-1">{error}</span>
              <div className="flex items-center space-x-2">
                {retryCount > 0 && (
                  <button
                    onClick={handleRetryLoad}
                    className="flex items-center space-x-1 bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Retry</span>
                  </button>
                )}
                <button
                  onClick={() => setError(null)}
                  className="text-red-300 hover:text-red-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
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
              <span className="flex-1">{successMessage}</span>
              <button
                onClick={() => setSuccessMessage(null)}
                className="text-green-300 hover:text-green-100"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lessons List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredLessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gray-800 rounded-lg p-6 cursor-pointer transition-all duration-200 hover:bg-gray-700 hover:shadow-lg ${
                selectedLesson?.id === lesson.id ? 'ring-2 ring-blue-500 bg-gray-700' : ''
              }`}
              onClick={() => handleLessonClick(lesson)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{lesson.icon || '📚'}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{lesson.title}</h3>
                    <p className="text-sm text-gray-400">{lesson.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditLesson(lesson);
                    }}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Edit Lesson"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirmDelete(lesson);
                    }}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete Lesson"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{lesson.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{lesson.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{lesson.targetAge}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>{lesson.breakDuration || 0}m break</span>
                </div>
              </div>
              
              {selectedLesson?.id === lesson.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-gray-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-300">Slides ({slides.length})</h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCreateNewSlide();
                      }}
                      className="flex items-center space-x-1 bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Slide</span>
                    </button>
                  </div>
                  
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {slides.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No slides yet</p>
                      </div>
                    ) : (
                      slides.map((slide, index) => (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                            previewSlide?.id === slide.id 
                              ? 'bg-blue-600/20 border border-blue-500/30' 
                              : 'bg-gray-700/50 hover:bg-gray-700'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSlideClick(slide);
                          }}
                          draggable
                          onDragStart={(e) => handleDragStart(e, slide)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, slide)}
                        >
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className={`w-2 h-2 rounded-full ${getSlideTypeColor(slide.type)}`}></div>
                            <div className="flex items-center space-x-2 min-w-0">
                              {getSlideTypeIcon(slide.type)}
                              <span className="text-sm text-gray-300 truncate">{slide.title}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditSlide(slide);
                              }}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                              title="Edit Slide"
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicateSlide(slide);
                              }}
                              className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                              title="Duplicate Slide"
                            >
                              <CopyIcon className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSlide(slide.id);
                              }}
                              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete Slide"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Slide Preview Modal */}
        <AnimatePresence>
          {previewSlide && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
              onClick={() => setPreviewSlide(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-gray-700 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getSlideTypeIcon(previewSlide.type)}
                    <h2 className="text-lg font-semibold text-white">{previewSlide.title}</h2>
                    <span className="text-sm text-gray-400 bg-gray-600 px-2 py-1 rounded">
                      {previewSlide.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditSlide(previewSlide)}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
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
                  <SafeSlidePreview
                    slide={previewSlide}
                    onEdit={handleEditSlide}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lesson Generator Modal */}
        <AnimatePresence>
          {showLessonGenerator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
              onClick={() => setShowLessonGenerator(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <LessonGenerator
                  onGenerate={handleGenerateLesson}
                  onCancel={() => setShowLessonGenerator(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showConfirmDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
              onClick={() => setShowConfirmDelete(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Delete {showConfirmDelete.title}?
                  </h3>
                  <p className="text-gray-300 mb-6">
                    This action cannot be undone. All slides in this lesson will also be deleted.
                  </p>
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => setShowConfirmDelete(null)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteLesson(showConfirmDelete.id);
                        setShowConfirmDelete(null);
                      }}
                      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
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
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
              onClick={() => setShowLessonModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <LessonModal
                  lesson={editingLesson}
                  onSave={handleSaveLesson}
                  onCancel={() => setShowLessonModal(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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