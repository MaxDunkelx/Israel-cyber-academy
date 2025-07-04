import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFolder, 
  FaFolderOpen, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaTimes, 
  FaSave,
  FaSearch,
  FaList,
  FaGrid3X3
} from 'react-icons/fa';
import { getAllLessons, getSlidesByLessonId, createSlide, updateSlide, deleteSlide } from '../../firebase/content-service';
import ComprehensiveSlideEditor from './ComprehensiveSlideEditor';

const EnhancedContentManagement = () => {
  const [lessons, setLessons] = useState([]);
  const [slides, setSlides] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [editingSlide, setEditingSlide] = useState(null);
  const [previewSlide, setPreviewSlide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      setLoading(true);
      const lessonsData = await getAllLessons();
      setLessons(lessonsData);
      setError(null);
    } catch (err) {
      setError('Failed to load lessons');
      console.error('Error loading lessons:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSlides = async (lessonId) => {
    try {
      const slidesData = await getSlidesByLessonId(lessonId);
      setSlides(slidesData);
    } catch (err) {
      setError('Failed to load slides');
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
    setEditingSlide(null);
  };

  const handleEditSlide = (slide) => {
    setEditingSlide(slide);
    setPreviewSlide(null);
  };

  const handleSaveSlide = async (slideData) => {
    try {
      setError(null);
      
      // Ensure the slide has the correct lessonId
      const slideToSave = {
        ...slideData,
        lessonId: selectedLesson.id.toString()
      };

      if (editingSlide.id) {
        // Update existing slide
        await updateSlide(editingSlide.id, slideToSave);
        console.log('✅ Slide updated successfully');
      } else {
        // Create new slide
        const newSlideId = await createSlide(slideToSave);
        console.log('✅ Slide created successfully:', newSlideId);
      }
      
      // Reload slides to show the updated data
      await loadSlides(selectedLesson.id);
      setEditingSlide(null);
      
      // Show success message
      alert('Slide saved successfully!');
      
    } catch (err) {
      setError('Failed to save slide: ' + err.message);
      console.error('Error saving slide:', err);
    }
  };

  const handleDeleteSlide = async (slideId) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      try {
        await deleteSlide(slideId);
        await loadSlides(selectedLesson.id);
        setPreviewSlide(null);
        alert('Slide deleted successfully!');
      } catch (err) {
        setError('Failed to delete slide: ' + err.message);
        console.error('Error deleting slide:', err);
      }
    }
  };

  const handleCreateNewSlide = () => {
    const newSlide = {
      lessonId: selectedLesson.id.toString(),
      title: 'New Slide',
      type: 'presentation',
      order: slides.length + 1,
      content: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        elements: [
          {
            type: 'title',
            text: 'New Slide',
            style: {
              fontSize: '3rem',
              color: 'white',
              textAlign: 'center'
            }
          }
        ]
      }
    };
    setEditingSlide(newSlide);
  };

  const renderSlidePreview = (slide) => {
    const { content } = slide;
    if (!content) return null;

    return (
      <div 
        className="slide-preview"
        style={{
          background: content.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '200px',
          height: '120px',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onClick={() => handleSlideClick(slide)}
      >
        {/* Slide type indicator */}
        <div className="absolute top-2 right-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          {slide.type}
        </div>
        
        {/* Content preview based on slide type */}
        {slide.type === 'presentation' && content.elements && (
          content.elements.map((element, index) => {
            if (element.type === 'title') {
              return (
                <div
                  key={index}
                  style={{
                    ...element.style,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {element.text}
                </div>
              );
            }
            return null;
          })
        )}
        
        {slide.type === 'poll' && (
          <div className="text-center text-white">
            <div className="text-lg font-bold mb-1">📊</div>
            <div className="text-xs">{content.question}</div>
          </div>
        )}
        
        {slide.type === 'quiz' && (
          <div className="text-center text-white">
            <div className="text-lg font-bold mb-1">🎯</div>
            <div className="text-xs">Quiz</div>
          </div>
        )}
        
        {slide.type === 'video' && (
          <div className="text-center text-white">
            <div className="text-lg font-bold mb-1">🎥</div>
            <div className="text-xs">Video</div>
          </div>
        )}
        
        {slide.type === 'interactive' && (
          <div className="text-center text-white">
            <div className="text-lg font-bold mb-1">🎮</div>
            <div className="text-xs">Interactive</div>
          </div>
        )}
        
        {slide.type === 'break' && (
          <div className="text-center text-white">
            <div className="text-lg font-bold mb-1">⏰</div>
            <div className="text-xs">Break</div>
          </div>
        )}
        
        {slide.type === 'reflection' && (
          <div className="text-center text-white">
            <div className="text-lg font-bold mb-1">💭</div>
            <div className="text-xs">Reflection</div>
          </div>
        )}
        
        <div className="slide-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.1)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FaEye style={{ color: 'white', fontSize: '1.5rem' }} />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading lessons...</p>
          </div>
        </div>
      </div>
    );
  }

  if (editingSlide) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setEditingSlide(null)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <FaTimes />
                  <span>Back to Lessons</span>
                </button>
                <span className="text-gray-400">|</span>
                <h1 className="text-xl font-semibold text-gray-900">
                  {editingSlide.id ? 'Edit Slide' : 'Create New Slide'}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <ComprehensiveSlideEditor
          slide={editingSlide}
          onSave={handleSaveSlide}
          onCancel={() => setEditingSlide(null)}
        />
      </div>
    );
  }

  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Management</h1>
          <p className="text-gray-600">Manage your lessons and slides with our comprehensive editor</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Search and View Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white bg-gray-800'
                }`}
              >
                <FaList className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white bg-gray-800'
                }`}
              >
                <FaGrid3X3 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {filteredLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedLesson?.id === lesson.id ? 'ring-4 ring-indigo-500' : ''
              }`}
              onClick={() => handleLessonClick(lesson)}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {selectedLesson?.id === lesson.id ? (
                    <FaFolderOpen className="text-3xl text-indigo-600" />
                  ) : (
                    <FaFolder className="text-3xl text-gray-400" />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{lesson.title}</h3>
                    <p className="text-gray-600">{lesson.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{lesson.duration}</div>
                    <div className="text-sm text-gray-500">{lesson.difficulty}</div>
                  </div>
                </div>

                {/* Slides Grid - Show when lesson is selected */}
                {selectedLesson?.id === lesson.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-gray-200 pt-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Slides ({slides.length})
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreateNewSlide();
                        }}
                        className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <FaPlus />
                        <span>Add Slide</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                      {slides.map((slide, slideIndex) => (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: slideIndex * 0.05 }}
                          className="relative group"
                        >
                          {renderSlidePreview(slide)}
                          
                          {/* Slide Actions Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditSlide(slide);
                              }}
                              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              title="Edit Slide"
                            >
                              <FaEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSlideClick(slide);
                              }}
                              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                              title="Preview Slide"
                            >
                              <FaEye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSlide(slide.id);
                              }}
                              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              title="Delete Slide"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {/* Slide Title */}
                          <div className="mt-2 text-center">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {slide.title}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                              {slide.type}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Slide Preview Modal */}
        {previewSlide && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">{previewSlide.title}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditSlide(previewSlide)}
                    className="flex items-center space-x-2 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setPreviewSlide(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {/* Render the actual slide component here */}
                  <div className="w-full h-full">
                    {/* This would render the actual slide component */}
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-4xl mb-4">
                          {previewSlide.type === 'presentation' && '📄'}
                          {previewSlide.type === 'poll' && '📊'}
                          {previewSlide.type === 'quiz' && '🎯'}
                          {previewSlide.type === 'video' && '🎥'}
                          {previewSlide.type === 'interactive' && '🎮'}
                          {previewSlide.type === 'break' && '⏰'}
                          {previewSlide.type === 'reflection' && '💭'}
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{previewSlide.title}</h2>
                        <p className="text-gray-300">Slide Type: {previewSlide.type}</p>
                        <p className="text-gray-400 text-sm mt-2">
                          Click "Edit" to modify this slide
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedContentManagement; 