/**
 * SystemSettings Component - System Manager
 * 
 * System configuration and settings management
 */

import React, { useState } from 'react';
import { Settings, Save, RefreshCw, Database, Shield, Globe, Bell, Palette } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    systemName: 'Israel Cyber Campus',
    defaultLanguage: 'he',
    maintenanceMode: false,
    emailNotifications: true,
    maxFileSize: 10,
    sessionTimeout: 30,
    theme: 'dark'
  });

  const handleSave = () => {
    // TODO: Implement settings save
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">הגדרות מערכת</h2>
        <Button onClick={handleSave} variant="primary" className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>שמור הגדרות</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="dark">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>הגדרות כלליות</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">שם המערכת</label>
                <input
                  type="text"
                  value={settings.systemName}
                  onChange={(e) => setSettings({...settings, systemName: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">שפה ברירת מחדל</label>
                <select
                  value={settings.defaultLanguage}
                  onChange={(e) => setSettings({...settings, defaultLanguage: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="he">עברית</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">ערכת נושא</label>
                <select
                  value={settings.theme}
                  onChange={(e) => setSettings({...settings, theme: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="dark">כהה</option>
                  <option value="light">בהיר</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="dark">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>הגדרות אבטחה</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">מצב תחזוקה</span>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                  className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">פג תוקף סשן (דקות)</label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-2">גודל קובץ מקסימלי (MB)</label>
                <input
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => setSettings({...settings, maxFileSize: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card variant="dark">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>הגדרות התראות</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">התראות אימייל</span>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                  className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card variant="dark">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>סטטוס מערכת</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">סטטוס מסד נתונים</span>
                <span className="text-green-400">פעיל</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">שרת אימות</span>
                <span className="text-green-400">פעיל</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">שרת אחסון</span>
                <span className="text-green-400">פעיל</span>
              </div>
              
              <Button variant="secondary" size="sm" className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>רענן סטטוס</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemSettings; 