import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  BookOpen, 
  Filter,
  Search,
  Calendar,
  User,
  Tag
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { isTeacher, validateTeacherAccess, logSecurityEvent, sanitizeInput } from '../../utils/security';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

export default function TeacherComments({
  lessons,
  comments,
  onAddComment,
  onUpdateComment,
  onDeleteComment
}) {
  const { currentUser } = useAuth();
  const { role } = useUserProfile();
  const [selectedLesson, setSelectedLesson] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [formData, setFormData] = useState({
    lessonId: '',
    slideIndex: 0,
    text: '',
    type: 'note'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Security check - ensure only teachers can access this component
    if (!currentUser) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', { role: 'none' }, { component: 'TeacherComments' });
      return;
    }

    const validation = validateTeacherAccess({ role }, 'add_comments');
    if (!validation.success) {
      logSecurityEvent('INSUFFICIENT_PERMISSIONS', { role, uid: currentUser.uid }, { 
        component: 'TeacherComments',
        reason: validation.message 
      });
      toast.error('אין לך הרשאות לניהול הערות');
      return;
    }

    // Load comments data
    loadCommentsData();
  }, [currentUser, role]);

  // Security check - if not a teacher, show access denied
  if (!isTeacher({ role })) {
    logSecurityEvent('STUDENT_ACCESS_ATTEMPT', { role, uid: currentUser?.uid }, { component: 'TeacherComments' });
    return (
      <div className="text-center py-8">
        <p className="text-red-400">אין לך הרשאות לגשת לניהול הערות</p>
      </div>
    );
  }

  const loadCommentsData = () => {
    // Mock data - in real app, this would come from Firebase
    const mockComments = [
      {
        id: 1,
        lessonId: 1,
        lessonName: 'שיעור 1 - מבוא לאבטחת סייבר',
        type: 'tip',
        content: 'חשוב לזכור שסיסמאות חזקות הן המפתח לאבטחה טובה',
        author: 'שרה כהן',
        createdAt: '2024-01-15T10:30:00Z',
        isPublic: true
      },
      {
        id: 2,
        lessonId: 2,
        lessonName: 'שיעור 2 - רכיבי מחשב',
        type: 'warning',
        content: 'שימו לב: יש לבדוק את החיבורים לפני הפעלת המחשב',
        author: 'דוד לוי',
        createdAt: '2024-01-14T15:45:00Z',
        isPublic: true
      },
      {
        id: 3,
        lessonId: 1,
        lessonName: 'שיעור 1 - מבוא לאבטחת סייבר',
        type: 'info',
        content: 'השיעור הבא יעסוק בנושאים מתקדמים יותר',
        author: 'מיכל אברהם',
        createdAt: '2024-01-13T09:20:00Z',
        isPublic: false
      },
      {
        id: 4,
        lessonId: 3,
        lessonName: 'שיעור 3 - מערכת הפעלה Windows',
        type: 'tip',
        content: 'השתמשו ב-Ctrl+Alt+Del לפתיחת מנהל המשימות',
        author: 'עמית שפירא',
        createdAt: '2024-01-12T14:15:00Z',
        isPublic: true
      },
      {
        id: 5,
        lessonId: 2,
        lessonName: 'שיעור 2 - רכיבי מחשב',
        type: 'info',
        content: 'RAM הוא זיכרון זמני שמתרוקן בעת כיבוי המחשב',
        author: 'יוסי כהן',
        createdAt: '2024-01-11T11:30:00Z',
        isPublic: true
      }
    ];

    setComments(mockComments);
    setLoading(false);
  };

  // Filter comments based on selections
  const filteredComments = comments.filter(comment => {
    const lessonMatch = selectedLesson === 'all' || comment.lessonId === parseInt(selectedLesson);
    const typeMatch = selectedType === 'all' || comment.type === selectedType;
    const searchMatch = comment.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       comment.lessonId.toString().includes(searchTerm);
    
    return lessonMatch && typeMatch && searchMatch;
  });

  const getLessonTitle = (lessonId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    return lesson ? lesson.title : `שיעור ${lessonId}`;
  };

  const getCommentTypeLabel = (type) => {
    const typeLabels = {
      note: 'הערה',
      tip: 'טיפ',
      warning: 'אזהרה',
      question: 'שאלה',
      answer: 'תשובה'
    };
    return typeLabels[type] || type;
  };

  const getCommentTypeColor = (type) => {
    const typeColors = {
      note: 'bg-blue-100 text-blue-800',
      tip: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      question: 'bg-purple-100 text-purple-800',
      answer: 'bg-gray-100 text-gray-800'
    };
    return typeColors[type] || 'bg-gray-100 text-gray-800';
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!formData.text.trim() || !formData.lessonId) return;

    await onAddComment(
      parseInt(formData.lessonId),
      formData.slideIndex,
      formData.text,
      formData.type
    );

    setFormData({
      lessonId: '',
      slideIndex: 0,
      text: '',
      type: 'note'
    });
    setShowAddForm(false);
  };

  const handleEditComment = async (e) => {
    e.preventDefault();
    if (!editingComment || !editingComment.text.trim()) return;

    await onUpdateComment(
      editingComment.id,
      editingComment.text,
      editingComment.type
    );

    setEditingComment(null);
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק הערה זו?')) {
      await onDeleteComment(commentId);
    }
  };

  const startEditing = (comment) => {
    setEditingComment({
      id: comment.id,
      text: comment.text,
      type: comment.type
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <MessageSquare className="h-6 w-6 text-cyber-blue mr-3" />
          ניהול הערות
        </h2>
        <p className="text-gray-600">הוסף וערוך הערות לשיעורים ולשקופיות</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
          <MessageSquare className="h-8 w-8 text-cyber-blue mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {comments.length}
          </div>
          <div className="text-gray-600">סה"כ הערות</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
          <BookOpen className="h-8 w-8 text-cyber-green mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {new Set(comments.map(c => c.lessonId)).size}
          </div>
          <div className="text-gray-600">שיעורים עם הערות</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
          <Tag className="h-8 w-8 text-cyber-purple mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {new Set(comments.map(c => c.type)).size}
          </div>
          <div className="text-gray-600">סוגי הערות</div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
          <Calendar className="h-8 w-8 text-cyber-yellow mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {comments.filter(c => {
              const today = new Date();
              const commentDate = new Date(c.createdAt);
              return commentDate.toDateString() === today.toDateString();
            }).length}
          </div>
          <div className="text-gray-600">הערות היום</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="חפש בהערות..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedLesson}
              onChange={(e) => setSelectedLesson(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
            >
              <option value="all">כל השיעורים</option>
              {lessons.map(lesson => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
            >
              <option value="all">כל הסוגים</option>
              <option value="note">הערה</option>
              <option value="tip">טיפ</option>
              <option value="warning">אזהרה</option>
              <option value="question">שאלה</option>
              <option value="answer">תשובה</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Comment Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">הוסף הערה חדשה</h3>
          <form onSubmit={handleAddComment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שיעור *
                </label>
                <select
                  value={formData.lessonId}
                  onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                  required
                >
                  <option value="">בחר שיעור</option>
                  {lessons.map(lesson => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  מספר שקופית
                </label>
                <input
                  type="number"
                  value={formData.slideIndex}
                  onChange={(e) => setFormData({ ...formData, slideIndex: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  סוג הערה
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                >
                  <option value="note">הערה</option>
                  <option value="tip">טיפ</option>
                  <option value="warning">אזהרה</option>
                  <option value="question">שאלה</option>
                  <option value="answer">תשובה</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                תוכן ההערה *
              </label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                rows="4"
                placeholder="כתוב את ההערה שלך כאן..."
                required
              />
            </div>
            <div className="flex justify-end space-x-3 space-x-reverse">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                ביטול
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyber-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                הוסף הערה
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">הערות ({filteredComments.length})</h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="h-5 w-5 ml-2" />
              הוסף הערה
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredComments.map(comment => (
            <div key={comment.id} className="p-6 hover:bg-gray-50">
              {editingComment && editingComment.id === comment.id ? (
                // Edit Form
                <form onSubmit={handleEditComment} className="space-y-4">
                  <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    <span className="text-sm text-gray-500">
                      {getLessonTitle(comment.lessonId)} - שקופית {comment.slideIndex}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCommentTypeColor(comment.type)}`}>
                      {getCommentTypeLabel(comment.type)}
                    </span>
                  </div>
                  <textarea
                    value={editingComment.text}
                    onChange={(e) => setEditingComment({ ...editingComment, text: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                    rows="3"
                    required
                  />
                  <div className="flex justify-end space-x-2 space-x-reverse">
                    <button
                      type="button"
                      onClick={() => setEditingComment(null)}
                      className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      ביטול
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 text-sm bg-cyber-blue text-white rounded hover:bg-blue-700"
                    >
                      שמור
                    </button>
                  </div>
                </form>
              ) : (
                // Display Comment
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 space-x-reverse mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {getLessonTitle(comment.lessonId)}
                        </span>
                        <span className="text-sm text-gray-500">
                          - שקופית {comment.slideIndex}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCommentTypeColor(comment.type)}`}>
                          {getCommentTypeLabel(comment.type)}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.text}</p>
                      <div className="flex items-center space-x-4 space-x-reverse mt-3 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 ml-1" />
                          {new Date(comment.createdAt).toLocaleDateString('he-IL')}
                        </span>
                        <span className="flex items-center">
                          <User className="h-4 w-4 ml-1" />
                          מורה
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 space-x-reverse mr-4">
                      <button
                        onClick={() => startEditing(comment)}
                        className="p-2 text-gray-600 hover:text-cyber-blue hover:bg-blue-50 rounded-lg transition-colors"
                        title="ערוך הערה"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="מחק הערה"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredComments.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">לא נמצאו הערות</h3>
            <p className="text-gray-500 mb-4">נסה לשנות את החיפוש או הפילטרים</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              הוסף הערה ראשונה
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
