import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Building, UserPlus } from 'lucide-react';

export default function ClassManagement({
  classes,
  students,
  currentTeacherId,
  onCreateClass,
  onUpdateClass,
  onDeleteClass,
  onAssignStudent,
  selectedClass,
  onSelectClass,
  getClassProgress
}) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    maxStudents: 30,
    schedule: ''
  });

  const handleCreateClass = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('שם הכיתה הוא שדה חובה');
      return;
    }

    await onCreateClass(formData);
    setFormData({ name: '', description: '', maxStudents: 30, schedule: '' });
    setShowCreateForm(false);
  };

  const handleDeleteClass = async (classId, className) => {
    if (window.confirm(`האם אתה בטוח שברצונך למחוק את הכיתה "${className}"?`)) {
      await onDeleteClass(classId);
    }
  };

  const getClassStudents = (classId) => {
    return students.filter(student => student.classId === classId);
  };

  const getTeacherName = (teacherId) => {
    if (!teacherId) return 'לא משויך';
    if (teacherId === currentTeacherId) return 'אני';
    return `מורה ${teacherId.slice(-4)}`;
  };

  const myClasses = classes.filter(c => c.teacherId === currentTeacherId);
  const otherClasses = classes.filter(c => c.teacherId !== currentTeacherId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Building className="h-6 w-6 text-cyber-blue mr-3" />
            ניהול כיתות
          </h2>
          <p className="text-gray-600">צור כיתות חדשות ונהל תלמידים</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 ml-2" />
          צור כיתה חדשה
        </button>
      </div>

      {/* Create Class Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">צור כיתה חדשה</h3>
          <form onSubmit={handleCreateClass} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שם הכיתה *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                  placeholder="לדוגמה: כיתה א'"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  מספר מקסימלי של תלמידים
                </label>
                <input
                  type="number"
                  value={formData.maxStudents}
                  onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                  min="1"
                  max="100"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                תיאור הכיתה
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                rows="3"
                placeholder="תיאור קצר של הכיתה..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                לוח זמנים
              </label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                placeholder="לדוגמה: ימי שני ורביעי, 14:00-16:00"
              />
            </div>
            <div className="flex justify-end space-x-3 space-x-reverse">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="btn-secondary"
              >
                ביטול
              </button>
              <button type="submit" className="btn-primary">
                צור כיתה
              </button>
            </div>
          </form>
        </div>
      )}

      {/* My Classes */}
      {myClasses.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">הכיתות שלי</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myClasses.map((classData) => {
              const classStudents = getClassStudents(classData.id);
              const progress = getClassProgress(classData);
              
              return (
                <div key={classData.id} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{classData.name}</h3>
                      <p className="text-gray-600 text-sm">{classData.description}</p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <button
                        onClick={() => handleDeleteClass(classData.id, classData.name)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="מחק כיתה"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">תלמידים</span>
                      <span className="font-medium">{classStudents.length} / {classData.maxStudents || 30}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">התקדמות</span>
                      <span className="font-medium">{progress}%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-cyber-blue h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {classData.schedule && (
                      <div className="text-sm text-gray-600">
                        📅 {classData.schedule}
                      </div>
                    )}

                    <button
                      onClick={() => onSelectClass(classData)}
                      className="w-full btn-primary text-sm flex items-center justify-center"
                    >
                      <Users className="h-4 w-4 ml-1" />
                      צפה בפרטים
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Other Teachers' Classes */}
      {otherClasses.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">כיתות של מורים אחרים</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherClasses.map((classData) => {
              const classStudents = getClassStudents(classData.id);
              const progress = getClassProgress(classData);
              
              return (
                <div key={classData.id} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{classData.name}</h3>
                      <p className="text-gray-600 text-sm">{classData.description}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        מורה: {getTeacherName(classData.teacherId)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">תלמידים</span>
                      <span className="font-medium">{classStudents.length} / {classData.maxStudents || 30}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">התקדמות</span>
                      <span className="font-medium">{progress}%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-cyber-yellow h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {classData.schedule && (
                      <div className="text-sm text-gray-600">
                        📅 {classData.schedule}
                      </div>
                    )}

                    <button
                      onClick={() => onSelectClass(classData)}
                      className="w-full btn-secondary text-sm flex items-center justify-center"
                    >
                      <Users className="h-4 w-4 ml-1" />
                      צפה בפרטים
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {classes.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">אין כיתות עדיין</h3>
          <p className="text-gray-500 mb-4">צור כיתה ראשונה כדי להתחיל</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary"
          >
            צור כיתה ראשונה
          </button>
        </div>
      )}
    </div>
  );
}
