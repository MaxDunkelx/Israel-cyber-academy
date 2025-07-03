/**
 * SystemLogs Component - System Manager
 * 
 * System activity monitoring and logs with real Firebase integration
 */

import React, { useState, useEffect } from 'react';
import { FileSearch, Download, Filter, Search, Calendar, AlertTriangle, Info, CheckCircle, XCircle, RefreshCw, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { collection, getDocs, query, orderBy, limit, where, startAfter } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const SystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Load logs on component mount
  useEffect(() => {
    loadLogs();
  }, []);

  /**
   * Load system logs from Firebase
   */
  const loadLogs = async (isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
      }

      console.log('📋 Loading system logs from Firebase...');

      // Get security events
      const securityEventsRef = collection(db, 'securityEvents');
      let securityQuery = query(
        securityEventsRef,
        orderBy('timestamp', 'desc'),
        limit(50)
      );

      if (isLoadMore && lastDoc) {
        securityQuery = query(
          securityEventsRef,
          orderBy('timestamp', 'desc'),
          startAfter(lastDoc),
          limit(50)
        );
      }

      const securitySnapshot = await getDocs(securityQuery);
      
      // Get user activities
      const userActivitiesRef = collection(db, 'userActivities');
      let activitiesQuery = query(
        userActivitiesRef,
        orderBy('timestamp', 'desc'),
        limit(50)
      );

      if (isLoadMore && lastDoc) {
        activitiesQuery = query(
          userActivitiesRef,
          orderBy('timestamp', 'desc'),
          startAfter(lastDoc),
          limit(50)
        );
      }

      const activitiesSnapshot = await getDocs(activitiesQuery);

      // Combine and process logs
      const allLogs = [];

      // Process security events
      securitySnapshot.forEach((doc) => {
        const data = doc.data();
        allLogs.push({
          id: `security_${doc.id}`,
          type: data.severity || 'info',
          message: data.description || data.event,
          timestamp: data.timestamp?.toDate?.() || new Date(),
          userId: data.userId || data.userEmail,
          action: data.eventType || 'security_event',
          source: 'security',
          details: data
        });
      });

      // Process user activities
      activitiesSnapshot.forEach((doc) => {
        const data = doc.data();
        allLogs.push({
          id: `activity_${doc.id}`,
          type: data.type || 'info',
          message: data.description || data.action,
          timestamp: data.timestamp?.toDate?.() || new Date(),
          userId: data.userId || data.userEmail,
          action: data.action || 'user_activity',
          source: 'activity',
          details: data
        });
      });

      // Sort by timestamp (newest first)
      allLogs.sort((a, b) => b.timestamp - a.timestamp);

      if (isLoadMore) {
        setLogs(prev => [...prev, ...allLogs]);
      } else {
        setLogs(allLogs);
      }

      // Update pagination state
      const lastSecurityDoc = securitySnapshot.docs[securitySnapshot.docs.length - 1];
      const lastActivityDoc = activitiesSnapshot.docs[activitiesSnapshot.docs.length - 1];
      setLastDoc(lastSecurityDoc || lastActivityDoc);
      setHasMore(securitySnapshot.docs.length === 50 || activitiesSnapshot.docs.length === 50);

      console.log(`✅ Loaded ${allLogs.length} system logs`);
      
      if (!isLoadMore) {
        setLoading(false);
      }

    } catch (error) {
      console.error('❌ Error loading system logs:', error);
      toast.error('אירעה שגיאה בטעינת לוגי המערכת');
      setLoading(false);
    }
  };

  /**
   * Load more logs (pagination)
   */
  const loadMoreLogs = () => {
    if (hasMore && !loading) {
      loadLogs(true);
    }
  };

  /**
   * Refresh logs
   */
  const refreshLogs = () => {
    setLastDoc(null);
    setHasMore(true);
    loadLogs();
  };

  /**
   * Export logs to CSV
   */
  const exportLogs = () => {
    try {
      const csvContent = [
        ['Type', 'Message', 'User', 'Action', 'Timestamp'],
        ...filteredLogs.map(log => [
          log.type,
          log.message,
          log.userId || 'System',
          log.action,
          log.timestamp.toLocaleString('he-IL')
        ])
      ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `system_logs_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('לוגי המערכת יוצאו בהצלחה');
    } catch (error) {
      console.error('Error exporting logs:', error);
      toast.error('אירעה שגיאה בייצוא הלוגים');
    }
  };

  const getLogTypeInfo = (type) => {
    const typeMap = {
      info: { icon: Info, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
      warning: { icon: AlertTriangle, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
      success: { icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/10' },
      error: { icon: XCircle, color: 'text-red-400', bgColor: 'bg-red-500/10' },
      security: { icon: Shield, color: 'text-purple-400', bgColor: 'bg-purple-500/10' }
    };
    return typeMap[type] || typeMap.info;
  };

  const filteredLogs = logs.filter(log => {
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.userId && log.userId.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  if (loading && logs.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">לוגים מערכת</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">לוגים מערכת</h2>
        <div className="flex space-x-2">
          <Button onClick={refreshLogs} variant="secondary" className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>רענן</span>
          </Button>
          <Button onClick={exportLogs} variant="secondary" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>ייצא לוגים</span>
          </Button>
        </div>
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
                <option value="security">אבטחה</option>
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
          
          {filteredLogs.length === 0 && !loading && (
            <div className="text-center py-8">
              <FileSearch className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">לא נמצאו לוגים</p>
            </div>
          )}

          {hasMore && (
            <div className="text-center py-4">
              <Button onClick={loadMoreLogs} variant="secondary" disabled={loading}>
                {loading ? 'טוען...' : 'טען עוד לוגים'}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
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

        <Card variant="dark">
          <div className="text-center p-4">
            <Shield className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-white">
              {logs.filter(log => log.type === 'security').length}
            </div>
            <div className="text-sm text-gray-300">אירועי אבטחה</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemLogs; 