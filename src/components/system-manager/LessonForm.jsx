/**
 * LessonForm Component
 * 
 * Form for creating and editing lessons
 */

import React, { useState } from 'react';
import { BookOpen, Save, X } from 'lucide-react';
import Button from '../ui/Button';

const LessonForm = ({ lesson, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: lesson?.title || '',
    description: lesson?.description || '',
    icon: lesson?.icon || '📚',
    duration: lesson?.duration || '1 שעות',
    difficulty: lesson?.difficulty || 'קל',
    targetAge: lesson?.targetAge || '10-13',
    breakDuration: lesson?.breakDuration || 10
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
        <BookOpen className="w-5 h-5" />
        <span>{lesson ? 'ערוך שיעור' : 'צור שיעור חדש'}</span>
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm mb-2">כותרת</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-2">תיאור</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">אייקון</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({...formData, icon: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">משך</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">רמת קושי</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="קל">קל</option>
              <option value="בינוני">בינוני</option>
              <option value="מתקדם">מתקדם</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">גיל יעד</label>
            <input
              type="text"
              value={formData.targetAge}
              onChange={(e) => setFormData({...formData, targetAge: e.target.value})}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <Button type="submit" variant="primary" className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>שמור</span>
          </Button>
          
          <Button onClick={onCancel} variant="secondary" className="flex items-center space-x-2">
            <X className="w-4 h-4" />
            <span>ביטול</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LessonForm; 