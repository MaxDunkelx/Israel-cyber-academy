/**
 * Offline Manager - Handles offline functionality and data synchronization
 * 
 * Features:
 * - Network state detection
 * - Offline data storage
 * - Automatic synchronization when online
 * - Conflict resolution
 * - Progress preservation
 */

import { toast } from 'react-hot-toast';

class OfflineManager {
  constructor() {
    this.isOnline = navigator.onLine;
    this.pendingActions = [];
    this.offlineData = new Map();
    this.syncInProgress = false;
    
    this.initializeEventListeners();
    this.loadOfflineData();
  }

  /**
   * Initialize network state listeners
   */
  initializeEventListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.handleOnline();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.handleOffline();
    });

    // Listen for page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isOnline) {
        this.syncPendingActions();
      }
    });
  }

  /**
   * Handle when device comes online
   */
  async handleOnline() {
    console.log('🌐 Device is online - syncing data...');
    toast.success('חיבור לאינטרנט חודש - מסנכרן נתונים...');
    
    // Sync any pending actions
    await this.syncPendingActions();
    
    // Clear offline indicators
    this.clearOfflineIndicators();
  }

  /**
   * Handle when device goes offline
   */
  handleOffline() {
    console.log('📴 Device is offline - enabling offline mode');
    toast.error('אין חיבור לאינטרנט - מופעל מצב לא מקוון');
    
    // Show offline indicators
    this.showOfflineIndicators();
  }

  /**
   * Check if device is currently online
   */
  isDeviceOnline() {
    return this.isOnline;
  }

  /**
   * Store data for offline use
   */
  storeOfflineData(key, data) {
    try {
      this.offlineData.set(key, {
        data,
        timestamp: Date.now(),
        version: this.getDataVersion()
      });
      
      // Save to localStorage for persistence
      localStorage.setItem(`offline_${key}`, JSON.stringify({
        data,
        timestamp: Date.now(),
        version: this.getDataVersion()
      }));
      
      console.log(`💾 Stored offline data for key: ${key}`);
    } catch (error) {
      console.error('Error storing offline data:', error);
    }
  }

  /**
   * Retrieve offline data
   */
  getOfflineData(key) {
    try {
      // First try memory cache
      if (this.offlineData.has(key)) {
        return this.offlineData.get(key).data;
      }
      
      // Fall back to localStorage
      const stored = localStorage.getItem(`offline_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.offlineData.set(key, parsed);
        return parsed.data;
      }
      
      return null;
    } catch (error) {
      console.error('Error retrieving offline data:', error);
      return null;
    }
  }

  /**
   * Add action to pending queue for later sync
   */
  addPendingAction(action) {
    const pendingAction = {
      id: Date.now() + Math.random(),
      action,
      timestamp: Date.now(),
      retryCount: 0
    };
    
    this.pendingActions.push(pendingAction);
    this.savePendingActions();
    
    console.log(`📝 Added pending action: ${action.type}`);
  }

  /**
   * Sync all pending actions when online
   */
  async syncPendingActions() {
    if (this.syncInProgress || !this.isOnline || this.pendingActions.length === 0) {
      return;
    }

    this.syncInProgress = true;
    console.log(`🔄 Syncing ${this.pendingActions.length} pending actions...`);

    const actionsToProcess = [...this.pendingActions];
    const successfulActions = [];
    const failedActions = [];

    for (const pendingAction of actionsToProcess) {
      try {
        await this.executeAction(pendingAction.action);
        successfulActions.push(pendingAction);
        console.log(`✅ Synced action: ${pendingAction.action.type}`);
      } catch (error) {
        console.error(`❌ Failed to sync action: ${pendingAction.action.type}`, error);
        pendingAction.retryCount++;
        
        if (pendingAction.retryCount < 3) {
          failedActions.push(pendingAction);
        } else {
          console.error(`🚫 Action failed permanently: ${pendingAction.action.type}`);
        }
      }
    }

    // Remove successful actions and update failed ones
    this.pendingActions = failedActions;
    this.savePendingActions();

    if (successfulActions.length > 0) {
      toast.success(`סנכרן בהצלחה ${successfulActions.length} פעולות`);
    }

    this.syncInProgress = false;
  }

  /**
   * Execute a specific action
   */
  async executeAction(action) {
    // Import Firebase functions dynamically to avoid issues
    const { doc, updateDoc, setDoc, arrayUnion, serverTimestamp } = await import('firebase/firestore');
    const { db } = await import('../firebase/firebase-config');

    switch (action.type) {
      case 'UPDATE_PROGRESS':
        const userRef = doc(db, 'users', action.userId);
        await updateDoc(userRef, {
          progress: action.progress,
          lastActivityDate: serverTimestamp()
        });
        break;

      case 'SAVE_SESSION_DATA':
        const sessionRef = doc(db, 'sessions', action.sessionId);
        await updateDoc(sessionRef, {
          studentEngagement: action.engagement,
          lastActivity: serverTimestamp()
        });
        break;

      case 'SEND_CHAT_MESSAGE':
        const chatRef = doc(db, 'sessions', action.sessionId);
        await updateDoc(chatRef, {
          chatMessages: arrayUnion(action.message),
          lastActivity: serverTimestamp()
        });
        break;

      case 'UPDATE_SLIDE_ENGAGEMENT':
        const slideRef = doc(db, 'users', action.userId);
        await updateDoc(slideRef, {
          [`progress.${action.lessonId}.pagesEngaged`]: arrayUnion(action.slideId),
          lastActivityDate: serverTimestamp()
        });
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  /**
   * Save pending actions to localStorage
   */
  savePendingActions() {
    try {
      localStorage.setItem('pendingActions', JSON.stringify(this.pendingActions));
    } catch (error) {
      console.error('Error saving pending actions:', error);
    }
  }

  /**
   * Load pending actions from localStorage
   */
  loadPendingActions() {
    try {
      const stored = localStorage.getItem('pendingActions');
      if (stored) {
        this.pendingActions = JSON.parse(stored);
        console.log(`📋 Loaded ${this.pendingActions.length} pending actions`);
      }
    } catch (error) {
      console.error('Error loading pending actions:', error);
    }
  }

  /**
   * Load offline data from localStorage
   */
  loadOfflineData() {
    try {
      const keys = Object.keys(localStorage);
      const offlineKeys = keys.filter(key => key.startsWith('offline_'));
      
      offlineKeys.forEach(key => {
        const dataKey = key.replace('offline_', '');
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          this.offlineData.set(dataKey, parsed);
        }
      });
      
      console.log(`📚 Loaded ${offlineKeys.length} offline data items`);
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  }

  /**
   * Show offline indicators in UI
   */
  showOfflineIndicators() {
    // Add offline banner to page
    const banner = document.createElement('div');
    banner.id = 'offline-banner';
    banner.className = 'fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-50';
    banner.innerHTML = '📴 אין חיבור לאינטרנט - מצב לא מקוון';
    document.body.appendChild(banner);
  }

  /**
   * Clear offline indicators from UI
   */
  clearOfflineIndicators() {
    const banner = document.getElementById('offline-banner');
    if (banner) {
      banner.remove();
    }
  }

  /**
   * Get current data version for conflict resolution
   */
  getDataVersion() {
    return Date.now();
  }

  /**
   * Resolve conflicts between local and server data
   */
  resolveConflict(localData, serverData) {
    // Simple conflict resolution - prefer server data for now
    // In a real implementation, you'd want more sophisticated conflict resolution
    return {
      ...localData,
      ...serverData,
      lastSync: Date.now()
    };
  }

  /**
   * Clear all offline data
   */
  clearOfflineData() {
    this.offlineData.clear();
    this.pendingActions = [];
    
    // Clear from localStorage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('offline_') || key === 'pendingActions') {
        localStorage.removeItem(key);
      }
    });
    
    console.log('🧹 Cleared all offline data');
  }

  /**
   * Get offline status summary
   */
  getStatus() {
    return {
      isOnline: this.isOnline,
      pendingActionsCount: this.pendingActions.length,
      offlineDataCount: this.offlineData.size,
      syncInProgress: this.syncInProgress
    };
  }
}

// Create singleton instance
const offlineManager = new OfflineManager();

export default offlineManager; 