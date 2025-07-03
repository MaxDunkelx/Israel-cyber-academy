/**
 * SystemAnalytics Component - System Manager
 * 
 * Comprehensive analytics and insights dashboard with:
 * - User growth trends
 * - Content usage analytics
 * - Session performance metrics
 * - Real-time activity monitoring
 * - Predictive insights
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BookOpen, 
  Play, 
  Clock, 
  Target, 
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  Filter,
  Search,
  ArrowUp,
  ArrowDown,
  Minus,
  Zap,
  Shield,
  Star,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { getSystemStats, getUserAnalytics, getSystemMonitoring, exportSystemData } from '../../firebase/system-manager-service';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const SystemAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [userAnalytics, setUserAnalytics] = useState(null);
  const [monitoring, setMonitoring] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [showDetails, setShowDetails] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Load analytics on component mount
  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  /**
   * Load comprehensive analytics data
   */
  const loadAnalytics = async () => {
    try {
      setLoading(true);
      console.log('📊 Loading comprehensive analytics...');

      // Load all analytics data in parallel
      const [systemStats, userStats, monitoringData] = await Promise.all([
        getSystemStats(true), // Force refresh for analytics
        getUserAnalytics(timeRange),
        getSystemMonitoring()
      ]);

      setAnalytics(systemStats);
      setUserAnalytics(userStats);
      setMonitoring(monitoringData);

      console.log('✅ Analytics loaded successfully');
    } catch (error) {
      console.error('❌ Error loading analytics:', error);
      toast.error('אירעה שגיאה בטעינת הניתוחים');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Export analytics data
   */
  const handleExport = async (dataType = 'all') => {
    try {
      setExporting(true);
      console.log('📤 Exporting analytics data...');

      const exportData = await exportSystemData(dataType);
      
      // Create CSV content
      const csvContent = [
        ['Metric', 'Value', 'Timestamp'],
        ['Total Users', analytics?.users?.total || 0, new Date().toISOString()],
        ['Active Users', analytics?.users?.active || 0, new Date().toISOString()],
        ['Total Lessons', analytics?.content?.totalLessons || 0, new Date().toISOString()],
        ['Total Sessions', analytics?.sessions?.total || 0, new Date().toISOString()],
        ['Active Sessions', analytics?.sessions?.active || 0, new Date().toISOString()],
        ['User Growth Rate', `${analytics?.users?.growthRate || 0}%`, new Date().toISOString()],
        ['Session Completion Rate', `${analytics?.sessions?.completionRate || 0}%`, new Date().toISOString()]
      ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

      // Download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `system_analytics_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('הנתונים יוצאו בהצלחה');
    } catch (error) {
      console.error('❌ Error exporting analytics:', error);
      toast.error('אירעה שגיאה בייצוא הנתונים');
    } finally {
      setExporting(false);
    }
  };

  /**
   * Get trend indicator
   */
  const getTrendIndicator = (current, previous) => {
    if (!previous || previous === 0) return { icon: Minus, color: 'text-gray-400', text: 'ללא נתונים קודמים' };
    
    const change = ((current - previous) / previous) * 100;
    
    if (change > 5) {
      return { icon: TrendingUp, color: 'text-green-400', text: `+${change.toFixed(1)}%` };
    } else if (change < -5) {
      return { icon: TrendingDown, color: 'text-red-400', text: `${change.toFixed(1)}%` };
    } else {
      return { icon: Minus, color: 'text-yellow-400', text: `${change.toFixed(1)}%` };
    }
  };

  /**
   * Get metric card
   */
  const MetricCard = ({ title, value, icon: Icon, trend, color = 'blue', subtitle }) => {
    const trendInfo = trend ? getTrendIndicator(trend.current, trend.previous) : null;
    const TrendIcon = trendInfo?.icon;

    return (
      <Card variant="dark">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-${color}-500/20 flex items-center justify-center`}>
              <Icon className={`w-6 h-6 text-${color}-400`} />
            </div>
            {trendInfo && (
              <div className={`flex items-center space-x-2 ${trendInfo.color}`}>
                <TrendIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{trendInfo.text}</span>
              </div>
            )}
          </div>
          
          <div className="mb-2">
            <div className="text-3xl font-bold text-white">{value}</div>
            <div className="text-sm text-gray-300">{title}</div>
          </div>
          
          {subtitle && (
            <div className="text-xs text-gray-400">{subtitle}</div>
          )}
        </div>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">ניתוחים מתקדמים</h2>
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
        <h2 className="text-2xl font-bold text-white">ניתוחים מתקדמים</h2>
        <div className="flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="24h">24 שעות</option>
            <option value="7d">7 ימים</option>
            <option value="30d">30 ימים</option>
          </select>
          
          <Button onClick={loadAnalytics} variant="secondary" className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>רענן</span>
          </Button>
          
          <Button 
            onClick={() => handleExport('all')} 
            variant="secondary" 
            disabled={exporting}
            className="flex items-center space-x-2"
          >
            {exporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>מייצא...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>ייצא נתונים</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="סה״כ משתמשים"
          value={analytics?.users?.total || 0}
          icon={Users}
          color="blue"
          subtitle={`${analytics?.users?.active || 0} פעילים`}
        />
        
        <MetricCard
          title="שיעורים"
          value={analytics?.content?.totalLessons || 0}
          icon={BookOpen}
          color="green"
          subtitle={`${analytics?.content?.totalSlides || 0} שקופיות`}
        />
        
        <MetricCard
          title="סשנים"
          value={analytics?.sessions?.total || 0}
          icon={Play}
          color="purple"
          subtitle={`${analytics?.sessions?.active || 0} פעילים`}
        />
        
        <MetricCard
          title="פעילות היום"
          value={analytics?.activities?.totalToday || 0}
          icon={Activity}
          color="orange"
          subtitle="אירועים היום"
        />
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="dark">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>ביצועי מערכת</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">קצב צמיחת משתמשים</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{analytics?.users?.growthRate || 0}%</span>
                  {analytics?.users?.growthRate > 0 ? (
                    <ArrowUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">קצב השלמת סשנים</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{analytics?.sessions?.completionRate || 0}%</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">משתמשים חדשים השבוע</span>
                <span className="text-white font-semibold">{analytics?.users?.newThisWeek || 0}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">ממוצע שקופיות לשיעור</span>
                <span className="text-white font-semibold">{analytics?.content?.averageSlidesPerLesson || 0}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="dark">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>סטטוס אבטחה</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">אירועי אבטחה קריטיים</span>
                <div className="flex items-center space-x-2">
                  <span className="text-red-400 font-semibold">{monitoring?.security?.criticalCount || 0}</span>
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">אזהרות אבטחה</span>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 font-semibold">{monitoring?.security?.warningCount || 0}</span>
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">סטטוס מערכת</span>
                <div className="flex items-center space-x-2">
                  <span className={`font-semibold ${
                    analytics?.system?.overall === 'healthy' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {analytics?.system?.overall === 'healthy' ? 'בריא' : 'מושפל'}
                  </span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">סשנים פעילים</span>
                <span className="text-white font-semibold">{monitoring?.sessions?.count || 0}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* User Analytics */}
      {userAnalytics && (
        <Card variant="dark">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>ניתוח משתמשים - {timeRange === '24h' ? '24 שעות' : timeRange === '7d' ? '7 ימים' : '30 ימים'}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{userAnalytics.users.new}</div>
                <div className="text-sm text-gray-300">משתמשים חדשים</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{userAnalytics.activities.total}</div>
                <div className="text-sm text-gray-300">פעילויות</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {userAnalytics.users.byRole.students + userAnalytics.users.byRole.teachers}
                </div>
                <div className="text-sm text-gray-300">משתמשים פעילים</div>
              </div>
            </div>

            {showDetails && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h4 className="text-md font-semibold text-white mb-3">פירוט פעילויות</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(userAnalytics.activities.byType).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-300 capitalize">{type.replace('_', ' ')}</span>
                      <span className="text-white font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 text-center">
              <Button
                onClick={() => setShowDetails(!showDetails)}
                variant="secondary"
                size="sm"
                className="flex items-center space-x-2 mx-auto"
              >
                {showDetails ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    <span>הסתר פרטים</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>הצג פרטים</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Recent Activity Feed */}
      <Card variant="dark">
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>פעילות אחרונה</span>
          </h3>
          
          <div className="space-y-3">
            {analytics?.activities?.recent?.slice(0, 10).map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'error' ? 'bg-red-400' :
                    activity.type === 'warning' ? 'bg-yellow-400' :
                    activity.type === 'success' ? 'bg-green-400' :
                    'bg-blue-400'
                  }`} />
                  <span className="text-sm text-gray-300">{activity.message}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {activity.timestamp.toLocaleTimeString('he-IL')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemAnalytics; 