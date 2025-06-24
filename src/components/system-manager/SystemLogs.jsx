/**
 * SystemLogs Component - System Manager
 * 
 * System activity monitoring and logs
 */

import React, { useState } from 'react';
import { FileSearch, Download, Filter, Search, Calendar, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const SystemLogs = () => {
  const [logs, setLogs] = useState([
    {
      id: 1,
      type: 'info',
      message: 'משתמש חדש נרשם: יוסי כהן',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      userId: 'user123',
      action: 'user_registration'
    },
    {
      id: 2,
      type: 'warning',
      message: 'ניסיון התחברות כושל: user@example.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      userId: null,
      action: 'failed_login'
    },
    {
      id: 3,
      type: 'success',
      message: 'שיעור עודכן בהצלחה: מבוא לעולם הסייבר',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      userId: 'teacher456',
      action: 'lesson_update'
    },
    {
      id: 4,
      type: 'error',
      message: 'שגיאה בטעינת נתונים: מסד נתונים לא זמין',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      userId: null,
      action: 'database_error'
    }
  ]);

  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getLogTypeInfo = (type) => {
    const typeMap = {
      info: { icon: Info, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
      warning: { icon: AlertTriangle, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
      success: { icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/10' },
      error: { icon: XCircle, color: 'text-red-400', bgColor: 'bg-red-500/10' }
    };
    return typeMap[type] || typeMap.info;
  };

  const filteredLogs = logs.filter(log => {
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const exportLogs = () => {
    // TODO: Implement log export
    console.log('Exporting logs...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">לוגים מערכת</h2>
        <Button onClick={exportLogs} variant="secondary" className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>ייצא לוגים</span>
        </Button>
      </div>

      {/* Filters */}
      <Card variant="dark">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="חיפוש בלוגים..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            
            <div className="md:w-48">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="all">כל הסוגים</option>
                <option value="info">מידע</option>
                <option value="warning">אזהרה</option>
                <option value="success">הצלחה</option>
                <option value="error">שגיאה</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Logs Table */}
      <Card variant="dark">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-right p-4 text-gray-300">סוג</th>
                <th className="text-right p-4 text-gray-300">הודעה</th>
                <th className="text-right p-4 text-gray-300">משתמש</th>
                <th className="text-right p-4 text-gray-300">פעולה</th>
                <th className="text-right p-4 text-gray-300">זמן</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => {
                const typeInfo = getLogTypeInfo(log.type);
                const Icon = typeInfo.icon;
                
                return (
                  <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="p-4">
                      <div className={`flex items-center space-x-2 ${typeInfo.color}`}>
                        <Icon className="w-4 h-4" />
                        <span className="text-sm capitalize">{log.type}</span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="text-white text-sm">{log.message}</div>
                    </td>
                    
                    <td className="p-4">
                      <div className="text-gray-300 text-sm">
                        {log.userId || 'מערכת'}
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="text-gray-400 text-sm">
                        {log.action}
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="text-gray-400 text-sm">
                        {log.timestamp.toLocaleString('he-IL')}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <FileSearch className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">לא נמצאו לוגים</p>
            </div>
          )}
        </div>
      </Card>

      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card variant="dark">
          <div className="text-center p-4">
            <Info className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-white">
              {logs.filter(log => log.type === 'info').length}
            </div>
            <div className="text-sm text-gray-300">הודעות מידע</div>
          </div>
        </Card>
        
        <Card variant="dark">
          <div className="text-center p-4">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold text-white">
              {logs.filter(log => log.type === 'warning').length}
            </div>
            <div className="text-sm text-gray-300">אזהרות</div>
          </div>
        </Card>
        
        <Card variant="dark">
          <div className="text-center p-4">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-white">
              {logs.filter(log => log.type === 'success').length}
            </div>
            <div className="text-sm text-gray-300">הצלחות</div>
          </div>
        </Card>
        
        <Card variant="dark">
          <div className="text-center p-4">
            <XCircle className="w-8 h-8 mx-auto mb-2 text-red-400" />
            <div className="text-2xl font-bold text-white">
              {logs.filter(log => log.type === 'error').length}
            </div>
            <div className="text-sm text-gray-300">שגיאות</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemLogs; 