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
 * - Local content migration and sync
 * - Content status monitoring
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
  Upload,
  RefreshCw,
  Database,
  HardDrive,
  RefreshCw as Sync,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Settings,
  Layers,
  Grid,
  List,
  BookOpen,
  Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { logSecurityEvent } from '../../utils/security';
import { 
  getAllLessons, 
  getSlidesByLessonId, 
  createLesson, 
  updateLesson, 
  deleteLesson,
  createSlide,
  updateSlide,
  deleteSlide,
  getSlideHistory,
  revertSlideToVersion,
  migrateLocalLessonsToFirebase,
  syncLocalWithDatabase,
  getContentStatus
} from '../../firebase/content-service.js';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

// Import slide editor components
import SlideEditor from './SlideEditor';
import LessonForm from './LessonForm';

const ContentManagement = () => {
  const { currentUser } = useAuth();
  
  // State management
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slideLoading, setSlideLoading] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [slideHistory, setSlideHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [showSlideEditor, setShowSlideEditor] = useState(false);
  
  // Content management states
  const [contentStatus, setContentStatus] = useState(null);
  const [migrating, setMigrating] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState('lessons'); // lessons, slides, migration, status
  const [previewMode, setPreviewMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  // Form states
  const [lessonForm, setLessonForm] = useState({
    title: '',
    description: '',
    icon: '',
    duration: '',
    difficulty: 'קל',
    targetAge: '10-13',
    breakDuration: 15
  });
  
  const [slideForm, setSlideForm] = useState({
    title: '',
    type: 'presentation',
    content: {}
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadLessons(),
        loadContentStatus()
      ]);
    } catch (error) {
      console.error('Error loading content:', error);
      toast.error('שגיאה בטעינת התוכן');
    } finally {
      setLoading(false);
    }
  };

  const loadLessons = async () => {
    try {
      const lessonsData = await getAllLessons();
      console.log('Loaded lessons:', lessonsData);
      setLessons(lessonsData);
    } catch (error) {
      console.error('Error loading lessons:', error);
      toast.error('שגיאה בטעינת השיעורים');
    }
  };

  const loadContentStatus = async () => {
    try {
      const status = await getContentStatus();
      setContentStatus(status);
      console.log('Content status:', status);
    } catch (error) {
      console.error('Error loading content status:', error);
    }
  };

  const loadLessonSlides = async (lessonId) => {
    try {
      setSlideLoading(true);
      console.log('Loading slides for lesson:', lessonId);
      const slidesData = await getSlidesByLessonId(lessonId);
      console.log('Loaded slides:', slidesData);
      setSlides(slidesData);
      setSelectedLesson(lessonId);
    } catch (error) {
      console.error('Error loading lesson slides:', error);
      toast.error('שגיאה בטעינת השקופיות');
    } finally {
      setSlideLoading(false);
    }
  };

  const handleMigration = async () => {
    try {
      setMigrating(true);
      const migratedCount = await migrateLocalLessonsToFirebase();
      toast.success(`הגירה הושלמה! ${migratedCount} שיעורים הועברו`);
      await loadContent();
    } catch (error) {
      console.error('Migration error:', error);
      toast.error('שגיאה בהגירה: ' + error.message);
    } finally {
      setMigrating(false);
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      const results = await syncLocalWithDatabase();
      toast.success(`סנכרון הושלם! נוצרו: ${results.created}, עודכנו: ${results.updated}`);
      await loadContent();
    } catch (error) {
      console.error('Sync error:', error);
      toast.error('שגיאה בסנכרון: ' + error.message);
    } finally {
      setSyncing(false);
    }
  };

  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLesson(lessonForm);
      setLessonForm({
        title: '',
        description: '',
        icon: '',
        duration: '',
        difficulty: 'קל',
        targetAge: '10-13',
        breakDuration: 15
      });
      loadLessons();
      toast.success('שיעור נוצר בהצלחה');
    } catch (error) {
      console.error('Error creating lesson:', error);
      toast.error('שגיאה ביצירת השיעור');
    }
  };

  const handleSlideSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSlide) {
        await updateSlide(editingSlide.id, slideForm);
        setEditingSlide(null);
        toast.success('שקופית עודכנה בהצלחה');
      } else {
        await createSlide({
          ...slideForm,
          lessonId: selectedLesson,
          order: slides.length + 1
        });
        toast.success('שקופית נוצרה בהצלחה');
      }
      setSlideForm({
        title: '',
        type: 'presentation',
        content: {}
      });
      loadLessonSlides(selectedLesson);
    } catch (error) {
      console.error('Error saving slide:', error);
      toast.error('שגיאה בשמירת השקופית');
    }
  };

  const handleSlideEdit = (slide) => {
    setEditingSlide(slide);
    setSlideForm({
      title: slide.title,
      type: slide.type,
      content: slide.content
    });
  };

  const handleSlideDelete = async (slideId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את השקופית?')) {
      try {
        await deleteSlide(slideId);
        loadLessonSlides(selectedLesson);
        toast.success('שקופית נמחקה בהצלחה');
      } catch (error) {
        console.error('Error deleting slide:', error);
        toast.error('שגיאה במחיקת השקופית');
      }
    }
  };

  const handleSlideHistory = async (slideId) => {
    try {
      const history = await getSlideHistory(slideId);
      setSlideHistory(history);
      setShowHistory(true);
    } catch (error) {
      console.error('Error loading slide history:', error);
      toast.error('שגיאה בטעינת היסטוריית השקופית');
    }
  };

  const handleRevertSlide = async (slideId, version) => {
      try {
        await revertSlideToVersion(slideId, version);
      loadLessonSlides(selectedLesson);
        setShowHistory(false);
      toast.success('שקופית הוחזרה לגרסה קודמת');
      } catch (error) {
        console.error('Error reverting slide:', error);
      toast.error('שגיאה בהחזרת השקופית');
    }
  };

  const handleLessonDelete = async (lessonId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את השיעור?')) {
      try {
        await deleteLesson(lessonId);
        loadLessons();
        if (selectedLesson === lessonId) {
          setSelectedLesson(null);
          setSlides([]);
        }
        toast.success('שיעור נמחק בהצלחה');
      } catch (error) {
        console.error('Error deleting lesson:', error);
        toast.error('שגיאה במחיקת השיעור');
      }
    }
  };

  const handleEditSlide = (slide) => {
    setSelectedSlide(slide);
    setShowSlideEditor(true);
  };

  const handleSaveSlide = async (slideData) => {
    try {
      if (selectedSlide) {
        await updateSlide(selectedSlide.id, slideData);
        toast.success('שקופית נשמרה בהצלחה');
      } else {
        await createSlide({
          ...slideData,
          lessonId: selectedLesson,
          order: slides.length + 1
        });
        toast.success('שקופית נוצרה בהצלחה');
      }
      setShowSlideEditor(false);
      setSelectedSlide(null);
      loadLessonSlides(selectedLesson);
    } catch (error) {
      console.error('Error saving slide:', error);
      toast.error('שגיאה בשמירת השקופית');
    }
  };

  const handleDeleteSlide = async (slideId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את השקופית?')) {
    try {
      await deleteSlide(slideId);
        loadLessonSlides(selectedLesson);
        toast.success('שקופית נמחקה בהצלחה');
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast.error('שגיאה במחיקת השקופית');
      }
    }
  };

  const handleCreateNewSlide = () => {
    setSelectedSlide(null);
    setShowSlideEditor(true);
  };

  const renderSlideContent = (slide) => {
    switch (slide.type) {
      case 'presentation':
        return (
          <div className="p-4 bg-gray-700 rounded-lg">
            <h4 className="text-white font-semibold mb-2">{slide.title}</h4>
            <div className="text-gray-300 text-sm">
              {slide.content?.elements?.length || 0} אלמנטים
            </div>
          </div>
        );
      case 'interactive':
        return (
          <div className="p-4 bg-purple-700 rounded-lg">
            <h4 className="text-white font-semibold mb-2">{slide.title}</h4>
            <div className="text-purple-200 text-sm">
              {slide.content?.type || 'אינטראקטיבי'}
            </div>
          </div>
        );
      case 'poll':
        return (
          <div className="p-4 bg-blue-700 rounded-lg">
            <h4 className="text-white font-semibold mb-2">{slide.title}</h4>
            <div className="text-blue-200 text-sm">סקר</div>
          </div>
        );
      case 'video':
        return (
          <div className="p-4 bg-red-700 rounded-lg">
            <h4 className="text-white font-semibold mb-2">{slide.title}</h4>
            <div className="text-red-200 text-sm">
              {slide.content?.videoUrl ? 'וידאו' : 'ללא URL'}
            </div>
            {slide.content?.description && (
              <div className="text-red-100 text-xs mt-1 truncate">
                {slide.content.description}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="p-4 bg-gray-600 rounded-lg">
            <h4 className="text-white font-semibold mb-2">{slide.title}</h4>
            <div className="text-gray-300 text-sm">{slide.type}</div>
          </div>
        );
    }
  };

  const renderContentStatus = () => {
    if (!contentStatus) return null;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <HardDrive className="w-5 h-5" />
                <span>תוכן מקומי</span>
        </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">שיעורים:</span>
                  <span className="text-white font-semibold">{contentStatus.local.totalLessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">שקופיות:</span>
                  <span className="text-white font-semibold">{contentStatus.local.totalSlides}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>מסד נתונים</span>
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">שיעורים:</span>
                  <span className="text-white font-semibold">{contentStatus.database.totalLessons}</span>
          </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">שקופיות:</span>
                  <span className="text-white font-semibold">{contentStatus.database.totalSlides}</span>
          </div>
          </div>
      </div>
          </div>
          </div>
          
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">סטטוס סנכרון</h3>
            <div className="space-y-3">
              {contentStatus.comparison.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 border border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {item.status === 'synced' && <CheckCircle className="w-5 h-5 text-green-400" />}
                    {item.status === 'missing_in_db' && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                    {item.status === 'different_slide_count' && <AlertTriangle className="w-5 h-5 text-orange-400" />}
                    <span className="text-white font-medium">{item.title}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {item.local.slides} → {item.database.slides} שקופיות
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={handleMigration}
            disabled={migrating}
            variant="primary"
            className="flex items-center space-x-2"
          >
            {migrating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>מעביר...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>העבר למסד נתונים</span>
              </>
            )}
          </Button>

          <Button
            onClick={handleSync}
            disabled={syncing}
            variant="secondary"
            className="flex items-center space-x-2"
          >
            {syncing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>מסנכרן...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>סנכרון תוכן</span>
              </>
            )}
          </Button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">ניהול תוכן</h1>
        <p className="text-gray-400">ניהול שיעורים, שקופיות ותוכן המערכת</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-900/50 border border-gray-700 rounded-lg p-1">
          {[
            { id: 'lessons', label: 'שיעורים', icon: BookOpen },
            { id: 'slides', label: 'שקופיות', icon: FileText },
            { id: 'migration', label: 'הגירה וסנכרון', icon: Database },
            { id: 'status', label: 'סטטוס תוכן', icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'lessons' && (
        <div className="grid lg:grid-cols-3 gap-6">
        {/* Lessons Panel */}
        <div className="lg:col-span-1">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">שיעורים</h2>
            
            {/* Create Lesson Form */}
              <form onSubmit={handleLessonSubmit} className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">כותרת</label>
              <input
                type="text"
                value={lessonForm.title}
                onChange={(e) => setLessonForm({...lessonForm, title: e.target.value})}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
                required
              />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">תיאור</label>
              <textarea
                value={lessonForm.description}
                onChange={(e) => setLessonForm({...lessonForm, description: e.target.value})}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
                rows="3"
              />
                </div>
              <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">משך</label>
                <input
                  type="text"
                  value={lessonForm.duration}
                  onChange={(e) => setLessonForm({...lessonForm, duration: e.target.value})}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
                      placeholder="45 דקות"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">רמת קושי</label>
                    <select
                      value={lessonForm.difficulty}
                      onChange={(e) => setLessonForm({...lessonForm, difficulty: e.target.value})}
                      className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                    >
                      <option value="קל">קל</option>
                      <option value="בינוני">בינוני</option>
                      <option value="קשה">קשה</option>
                    </select>
                  </div>
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                צור שיעור
              </Button>
            </form>

            {/* Lessons List */}
            <div className="space-y-2">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedLesson === lesson.id
                        ? 'bg-blue-900/30 border-blue-500'
                        : 'bg-gray-800/50 border-gray-600 hover:bg-gray-800'
                  }`}
                  onClick={() => loadLessonSlides(lesson.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-medium text-white">{lesson.title}</h3>
                        <p className="text-sm text-gray-400">{lesson.description}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        {lesson.totalSlides} שקופיות • {lesson.duration}
                      </div>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLessonDelete(lesson.id);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-xs"
                    >
                      מחק
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            </div>
        </div>

        {/* Slides Panel */}
        <div className="lg:col-span-2">
          {selectedLesson ? (
            <div className="space-y-6">
              {/* Slides List */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">שקופיות</h2>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCreateNewSlide}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      + שקופית חדשה
                    </Button>
                    <Button
                      onClick={() => loadLessonSlides(selectedLesson)}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={slideLoading}
                    >
                      רענן
                    </Button>
                  </div>
                </div>
                
                {slideLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="space-y-3">
                    {slides.map((slide) => (
                        <div key={slide.id} className="border border-gray-600 p-4 rounded-lg bg-gray-800/30">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm bg-gray-700 px-2 py-1 rounded text-gray-300">
                                {slide.order}
                              </span>
                                <h3 className="font-medium text-white">{slide.title}</h3>
                                <span className="text-xs bg-blue-700 px-2 py-1 rounded text-blue-200">
                                {slide.type}
                              </span>
                                <span className="text-xs bg-green-700 px-2 py-1 rounded text-green-200">
                                v{slide.version}
                              </span>
                            </div>
                            {renderSlideContent(slide)}
                            <div className="text-xs text-gray-500 mt-2">
                              עודכן: {slide.updatedAt?.toLocaleString() || 'לא ידוע'}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleEditSlide(slide)}
                              className="bg-blue-600 hover:bg-blue-700 text-xs"
                            >
                              ערוך
                            </Button>
                            <Button
                              onClick={() => handleSlideHistory(slide.id)}
                              className="bg-purple-600 hover:bg-purple-700 text-xs"
                            >
                              היסטוריה
                            </Button>
                            <Button
                              onClick={() => handleDeleteSlide(slide.id)}
                              className="bg-red-600 hover:bg-red-700 text-xs"
                            >
                              מחק
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                </div>
            </div>
          ) : (
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                <div className="text-center text-gray-400 py-8">
                בחר שיעור כדי לראות את השקופיות
                </div>
              </div>
          )}
        </div>
      </div>
      )}

      {/* Migration Tab */}
      {activeTab === 'migration' && (
        <div className="space-y-6">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>הגירה וסנכרון תוכן</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-gray-800/50 border border-gray-600 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">העברת תוכן מקומי</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    העבר את כל התוכן המקומי למסד הנתונים של Firebase
                  </p>
                  <Button
                    onClick={handleMigration}
                    disabled={migrating}
                    variant="primary"
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    {migrating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>מעביר...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>העבר למסד נתונים</span>
                      </>
                    )}
                  </Button>
                </div>

                <div className="p-4 bg-gray-800/50 border border-gray-600 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">סנכרון תוכן</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    סנכרן בין התוכן המקומי למסד הנתונים
                  </p>
                  <Button
                    onClick={handleSync}
                    disabled={syncing}
                    variant="secondary"
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    {syncing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>מסנכרן...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>סנכרון תוכן</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">מידע חשוב</h3>
                <ul className="text-yellow-200 text-sm space-y-1">
                  <li>• הגירה תעביר את כל התוכן המקומי למסד הנתונים</li>
                  <li>• סנכרון יעדכן תוכן קיים ויוסיף תוכן חדש</li>
                  <li>• התוכן המקומי יישאר זמין כגיבוי</li>
                  <li>• לאחר הגירה, התוכן יטען מהמסד נתונים</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Status Tab */}
      {activeTab === 'status' && renderContentStatus()}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">היסטוריית גרסאות</h3>
              <Button 
                onClick={() => setShowHistory(false)}
                className="bg-gray-600 hover:bg-gray-700"
              >
                סגור
              </Button>
            </div>
            
            {slideHistory.length === 0 ? (
              <p className="text-gray-500">אין היסטוריית גרסאות</p>
            ) : (
              <div className="space-y-3">
                {slideHistory.map((version) => (
                  <div key={version.version} className="border p-3 rounded">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">גרסה {version.version}</span>
                      <Button
                        onClick={() => handleRevertSlide(selectedSlide?.id, version.version)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-sm"
                      >
                        חזור לגרסה זו
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>עודכן על ידי: {version.updatedBy}</div>
                      <div>תאריך: {version.updatedAt?.toDate?.()?.toLocaleString() || 'לא ידוע'}</div>
                      <div>כותרת: {version.content.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Slide Editor Modal */}
      {showSlideEditor && (
        <SlideEditor
          slide={selectedSlide}
          onSave={handleSaveSlide}
          onCancel={() => {
            setShowSlideEditor(false);
            setSelectedSlide(null);
          }}
        />
      )}
    </div>
  );
};

export default ContentManagement; 