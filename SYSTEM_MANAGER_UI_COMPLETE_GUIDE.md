# System Manager UI - Complete System Guide

## ⚙️ System Manager Interface Overview

The System Manager UI provides comprehensive administrative tools for managing the entire learning management system. System managers can manage users, content, system settings, and monitor system performance. This interface is designed for administrators who need full control over the platform.

---

## 📱 System Manager Interface Components

### **1. System Manager Dashboard** (`src/components/system-manager/SystemManagerDashboard.jsx`)

#### **Purpose**
The main administrative dashboard providing an overview of system health, user statistics, content status, and quick access to administrative functions.

#### **Key Features**
- **System Overview**: Real-time system statistics and health metrics
- **User Management**: Quick access to user administration tools
- **Content Management**: Direct access to content creation and management
- **System Analytics**: Platform-wide analytics and performance metrics
- **Quick Actions**: Rapid access to common administrative tasks
- **System Status**: Real-time monitoring of system components

#### **Data Flow**
```javascript
// Load dashboard data
useEffect(() => {
  const loadDashboardData = async () => {
    // 1. Get system manager profile from AuthContext
    // 2. Load system-wide statistics
    // 3. Load user analytics
    // 4. Load content statistics
    // 5. Load system health metrics
    // 6. Update UI with real-time data
  };
  
  loadDashboardData();
}, [currentUser]);

// Real-time system monitoring
const monitorSystemHealth = async () => {
  // Monitor active sessions
  const sessionsRef = collection(db, 'sessions');
  const activeSessionsQuery = query(sessionsRef, where('status', '==', 'active'));
  
  const unsubscribe = onSnapshot(activeSessionsQuery, (snapshot) => {
    setActiveSessions(snapshot.docs.length);
    setActiveUsers(snapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      return acc + (data.joinedStudents?.length || 0);
    }, 0));
  });
  
  return unsubscribe;
};

// Load system statistics
const loadSystemStats = async () => {
  // Get total users
  const usersSnapshot = await getDocs(collection(db, 'users'));
  const totalUsers = usersSnapshot.docs.length;
  
  // Get user distribution by role
  const userRoles = usersSnapshot.docs.reduce((acc, doc) => {
    const role = doc.data().role;
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});
  
  // Get content statistics
  const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
  const totalLessons = lessonsSnapshot.docs.length;
  
  // Get session statistics
  const sessionsSnapshot = await getDocs(collection(db, 'sessions'));
  const totalSessions = sessionsSnapshot.docs.length;
  
  setSystemStats({
    totalUsers,
    userRoles,
    totalLessons,
    totalSessions,
    activeSessions: 0,
    activeUsers: 0
  });
};
```

#### **UI Elements**
- **Statistics Cards**: System-wide metrics and KPIs
- **User Distribution Chart**: Visual representation of user roles
- **System Health Indicators**: Real-time system status
- **Quick Action Buttons**: Direct access to administrative functions
- **Recent Activity Feed**: Latest system events and activities
- **Performance Metrics**: System performance and load indicators

---

### **2. User Management** (`src/components/system-manager/UserManagement.jsx`)

#### **Purpose**
Comprehensive interface for managing all users in the system, including students, teachers, and other system managers.

#### **Key Features**
- **User List**: Complete list of all system users with filtering and search
- **User Creation**: Create new users with role assignment
- **User Editing**: Modify user profiles, roles, and permissions
- **User Deletion**: Remove users from the system
- **Bulk Operations**: Perform operations on multiple users
- **User Analytics**: Individual user statistics and activity tracking
- **Role Management**: Assign and modify user roles and permissions

#### **Data Flow**
```javascript
// Load all users
const loadUsers = async (filters = {}) => {
  const usersRef = collection(db, 'users');
  let q = usersRef;
  
  // Apply filters
  if (filters.role) {
    q = query(q, where('role', '==', filters.role));
  }
  
  if (filters.search) {
    // Note: Firestore doesn't support full-text search
    // This would need to be implemented with a search service
    // For now, we'll load all users and filter client-side
  }
  
  const snapshot = await getDocs(q);
  let users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Client-side filtering for search
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    users = users.filter(user => 
      user.displayName?.toLowerCase().includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm) ||
      user.firstName?.toLowerCase().includes(searchTerm) ||
      user.lastName?.toLowerCase().includes(searchTerm)
    );
  }
  
  setUsers(users);
  setLoading(false);
};

// Create new user
const createUser = async (userData) => {
  try {
    // Validate user data
    const validation = validateUserData(userData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    );
    
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: userData.email,
      displayName: userData.displayName,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      age: userData.age,
      sex: userData.sex,
      createdAt: new Date(),
      updatedAt: new Date(),
      
      // Role-specific fields
      ...(userData.role === 'student' && {
        progress: {},
        completedLessons: [],
        currentLesson: 1,
        totalTimeSpent: 0,
        totalPagesEngaged: 0,
        achievements: [],
        streak: 0
      }),
      
      ...(userData.role === 'teacher' && {
        assignedStudents: [],
        createdSessions: [],
        teacherSettings: {
          defaultLanguage: 'he',
          notificationPreferences: {
            email: true,
            push: true,
            sessionReminders: true
          }
        }
      }),
      
      ...(userData.role === 'system_manager' && {
        systemManagerPermissions: ['manage_users', 'manage_content', 'manage_system'],
        systemManagerSettings: {
          defaultLanguage: 'he',
          notificationPreferences: {
            email: true,
            push: true
          }
        }
      })
    });
    
    toast.success('המשתמש נוצר בהצלחה');
    loadUsers(); // Refresh user list
    
  } catch (error) {
    console.error('User creation error:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      toast.error('כתובת האימייל כבר קיימת במערכת');
    } else if (error.code === 'auth/weak-password') {
      toast.error('הסיסמה חייבת להכיל לפחות 6 תווים');
    } else {
      toast.error('אירעה שגיאה ביצירת המשתמש');
    }
  }
};

// Update user
const updateUser = async (userId, updates) => {
  try {
    // Validate updates
    const validation = validateUserUpdates(updates);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }
    
    // Update user profile
    await updateDoc(doc(db, 'users', userId), {
      ...updates,
      updatedAt: new Date()
    });
    
    // If role is being changed, update role-specific fields
    if (updates.role) {
      await updateUserRole(userId, updates.role);
    }
    
    toast.success('המשתמש עודכן בהצלחה');
    loadUsers(); // Refresh user list
    
  } catch (error) {
    console.error('User update error:', error);
    toast.error('אירעה שגיאה בעדכון המשתמש');
  }
};

// Delete user
const deleteUser = async (userId) => {
  try {
    // Get user data first
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    
    // Delete user profile
    await deleteDoc(doc(db, 'users', userId));
    
    // Delete user progress data
    const progressRef = collection(db, 'userProgress');
    const progressQuery = query(progressRef, where('userId', '==', userId));
    const progressSnapshot = await getDocs(progressQuery);
    
    const deletePromises = progressSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Delete user from Firebase Auth (requires admin SDK)
    // This would need to be done server-side
    
    toast.success('המשתמש נמחק בהצלחה');
    loadUsers(); // Refresh user list
    
  } catch (error) {
    console.error('User deletion error:', error);
    toast.error('אירעה שגיאה במחיקת המשתמש');
  }
};
```

#### **UI Elements**
- **User Table**: Comprehensive user list with sorting and filtering
- **User Creation Form**: Modal for creating new users
- **User Edit Form**: Modal for editing existing users
- **User Details Panel**: Detailed view of individual user data
- **Bulk Action Toolbar**: Tools for managing multiple users
- **Search and Filter Controls**: Advanced filtering options
- **User Analytics Panel**: Individual user statistics

---

### **3. Content Management** (`src/components/system-manager/ContentManagement.jsx`)

#### **Purpose**
Comprehensive interface for managing all learning content, including lessons, slides, and interactive exercises.

#### **Key Features**
- **Lesson Management**: Create, edit, and organize lessons
- **Slide Management**: Manage individual slides within lessons
- **Content Migration**: Migrate content between local and cloud storage
- **Content Synchronization**: Sync content across different storage systems
- **Content Analytics**: Track content usage and effectiveness
- **Content Versioning**: Manage different versions of content
- **Bulk Operations**: Perform operations on multiple content items

#### **Data Flow**
```javascript
// Load content data
const loadContent = async () => {
  // Load lessons from local data
  const localLessons = await import('../data/lessons');
  
  // Load lessons from Firestore
  const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
  const firestoreLessons = lessonsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  
  // Merge and organize content
  const allLessons = [...localLessons.default, ...firestoreLessons];
  setLessons(allLessons);
  
  // Load content statistics
  const contentStats = calculateContentStats(allLessons);
  setContentStats(contentStats);
};

// Create new lesson
const createLesson = async (lessonData) => {
  try {
    // Validate lesson data
    const validation = validateLessonData(lessonData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }
    
    // Create lesson in Firestore
    const lessonRef = await addDoc(collection(db, 'lessons'), {
      ...lessonData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: currentUser.uid,
      version: 1,
      isPublished: false
    });
    
    toast.success('השיעור נוצר בהצלחה');
    loadContent(); // Refresh content list
    
  } catch (error) {
    console.error('Lesson creation error:', error);
    toast.error('אירעה שגיאה ביצירת השיעור');
  }
};

// Update lesson
const updateLesson = async (lessonId, updates) => {
  try {
    // Validate updates
    const validation = validateLessonUpdates(updates);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }
    
    // Update lesson
    await updateDoc(doc(db, 'lessons', lessonId), {
      ...updates,
      updatedAt: new Date(),
      version: increment(1)
    });
    
    toast.success('השיעור עודכן בהצלחה');
    loadContent(); // Refresh content list
    
  } catch (error) {
    console.error('Lesson update error:', error);
    toast.error('אירעה שגיאה בעדכון השיעור');
  }
};

// Delete lesson
const deleteLesson = async (lessonId) => {
  try {
    // Check if lesson is being used in active sessions
    const sessionsRef = collection(db, 'sessions');
    const sessionsQuery = query(sessionsRef, where('lessonId', '==', lessonId));
    const sessionsSnapshot = await getDocs(sessionsQuery);
    
    if (!sessionsSnapshot.empty) {
      throw new Error('לא ניתן למחוק שיעור שנמצא בשימוש בסשנים פעילים');
    }
    
    // Delete lesson
    await deleteDoc(doc(db, 'lessons', lessonId));
    
    // Delete associated slides
    const slidesRef = collection(db, 'slides');
    const slidesQuery = query(slidesRef, where('lessonId', '==', lessonId));
    const slidesSnapshot = await getDocs(slidesQuery);
    
    const deletePromises = slidesSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    toast.success('השיעור נמחק בהצלחה');
    loadContent(); // Refresh content list
    
  } catch (error) {
    console.error('Lesson deletion error:', error);
    toast.error(error.message || 'אירעה שגיאה במחיקת השיעור');
  }
};

// Migrate content to Firestore
const migrateContent = async () => {
  try {
    setMigrationStatus('migrating');
    
    // Load local lessons
    const localLessons = await import('../data/lessons');
    
    // Migrate each lesson
    for (const lesson of localLessons.default) {
      // Check if lesson already exists
      const existingLesson = await getDoc(doc(db, 'lessons', lesson.id));
      
      if (!existingLesson.exists()) {
        // Create lesson
        await setDoc(doc(db, 'lessons', lesson.id), {
          ...lesson,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: currentUser.uid,
          version: 1,
          isPublished: true
        });
        
        // Migrate slides
        if (lesson.content && lesson.content.slides) {
          for (const slide of lesson.content.slides) {
            await addDoc(collection(db, 'slides'), {
              lessonId: lesson.id,
              ...slide,
              createdAt: new Date(),
              updatedAt: new Date(),
              createdBy: currentUser.uid,
              version: 1
            });
          }
        }
      }
    }
    
    setMigrationStatus('completed');
    toast.success('התוכן הועבר בהצלחה');
    loadContent(); // Refresh content list
    
  } catch (error) {
    console.error('Content migration error:', error);
    setMigrationStatus('error');
    toast.error('אירעה שגיאה בהעברת התוכן');
  }
};
```

#### **UI Elements**
- **Content Tabs**: Organized tabs for lessons, slides, migration, and analytics
- **Lesson Management Panel**: Create, edit, and organize lessons
- **Slide Editor**: Visual editor for creating and editing slides
- **Migration Tools**: Tools for migrating content between storage systems
- **Content Analytics**: Usage statistics and effectiveness metrics
- **Bulk Operations**: Tools for managing multiple content items
- **Content Preview**: Preview content before publishing

---

### **4. Enhanced Content Management** (`src/components/system-manager/EnhancedContentManagement.jsx`)

#### **Purpose**
Advanced content management interface with enhanced features for complex content operations and bulk management.

#### **Key Features**
- **Advanced Lesson Builder**: Visual lesson creation with drag-and-drop
- **Slide Type Management**: Comprehensive slide type creation and editing
- **Content Templates**: Pre-built templates for common content types
- **Content Workflow**: Approval and publishing workflow
- **Content Backup**: Backup and restore content functionality
- **Content Validation**: Automated content validation and testing

#### **Data Flow**
```javascript
// Load enhanced content data
const loadEnhancedContent = async () => {
  // Load lessons with detailed analytics
  const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
  const lessons = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Load slides with usage statistics
  const slidesSnapshot = await getDocs(collection(db, 'slides'));
  const slides = slidesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Calculate content analytics
  const analytics = calculateContentAnalytics(lessons, slides);
  
  setLessons(lessons);
  setSlides(slides);
  setAnalytics(analytics);
};

// Create interactive slide
const createInteractiveSlide = async (slideData) => {
  try {
    // Validate slide data
    const validation = validateInteractiveSlide(slideData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }
    
    // Create slide with enhanced metadata
    const slideRef = await addDoc(collection(db, 'slides'), {
      ...slideData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: currentUser.uid,
      version: 1,
      isPublished: false,
      analytics: {
        usageCount: 0,
        averageScore: 0,
        completionRate: 0
      }
    });
    
    toast.success('השקופית נוצרה בהצלחה');
    loadEnhancedContent(); // Refresh content list
    
  } catch (error) {
    console.error('Slide creation error:', error);
    toast.error('אירעה שגיאה ביצירת השקופית');
  }
};

// Bulk content operations
const performBulkOperation = async (operation, selectedItems) => {
  try {
    setBulkOperationStatus('processing');
    
    switch (operation) {
      case 'publish':
        await publishMultipleItems(selectedItems);
        break;
      case 'unpublish':
        await unpublishMultipleItems(selectedItems);
        break;
      case 'delete':
        await deleteMultipleItems(selectedItems);
        break;
      case 'export':
        await exportMultipleItems(selectedItems);
        break;
      default:
        throw new Error('פעולה לא מוכרת');
    }
    
    setBulkOperationStatus('completed');
    toast.success('הפעולה הושלמה בהצלחה');
    loadEnhancedContent(); // Refresh content list
    
  } catch (error) {
    console.error('Bulk operation error:', error);
    setBulkOperationStatus('error');
    toast.error('אירעה שגיאה בביצוע הפעולה');
  }
};
```

---

### **5. Lesson Builder** (`src/components/system-manager/LessonBuilder.jsx`)

#### **Purpose**
Visual lesson creation interface with drag-and-drop functionality and comprehensive slide type support.

#### **Key Features**
- **Visual Lesson Creation**: Drag-and-drop interface for lesson building
- **Slide Type Support**: All slide types with specialized editors
- **Real-time Preview**: Live preview of lesson content
- **Slide Management**: Add, remove, and reorder slides
- **Content Validation**: Real-time validation of lesson content
- **Template System**: Pre-built lesson templates

#### **Data Flow**
```javascript
// Initialize lesson builder
const initializeLessonBuilder = async (lessonId = null) => {
  if (lessonId) {
    // Load existing lesson
    const lessonDoc = await getDoc(doc(db, 'lessons', lessonId));
    const lessonData = lessonDoc.data();
    
    // Load slides
    const slidesRef = collection(db, 'slides');
    const slidesQuery = query(slidesRef, where('lessonId', '==', lessonId));
    const slidesSnapshot = await getDocs(slidesQuery);
    const slides = slidesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    setLesson(lessonData);
    setSlides(slides);
  } else {
    // Create new lesson
    setLesson({
      title: '',
      description: '',
      category: '',
      difficulty: 'beginner',
      estimatedDuration: 0,
      order: 1,
      isActive: true,
      prerequisites: [],
      tags: []
    });
    setSlides([]);
  }
};

// Add new slide
const addSlide = async (slideType) => {
  const newSlide = {
    type: slideType,
    title: `שקופית חדשה - ${slideType}`,
    order: slides.length,
    content: getDefaultSlideContent(slideType),
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: currentUser.uid,
    version: 1
  };
  
  setSlides([...slides, newSlide]);
  setSelectedSlide(slides.length);
};

// Update slide
const updateSlide = async (slideIndex, updates) => {
  const updatedSlides = [...slides];
  updatedSlides[slideIndex] = {
    ...updatedSlides[slideIndex],
    ...updates,
    updatedAt: new Date(),
    version: updatedSlides[slideIndex].version + 1
  };
  
  setSlides(updatedSlides);
};

// Save lesson
const saveLesson = async () => {
  try {
    // Validate lesson
    const validation = validateLesson(lesson, slides);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }
    
    if (lesson.id) {
      // Update existing lesson
      await updateDoc(doc(db, 'lessons', lesson.id), {
        ...lesson,
        updatedAt: new Date(),
        version: increment(1)
      });
      
      // Update slides
      for (const slide of slides) {
        if (slide.id) {
          await updateDoc(doc(db, 'slides', slide.id), {
            ...slide,
            updatedAt: new Date(),
            version: increment(1)
          });
        } else {
          await addDoc(collection(db, 'slides'), {
            ...slide,
            lessonId: lesson.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: currentUser.uid,
            version: 1
          });
        }
      }
    } else {
      // Create new lesson
      const lessonRef = await addDoc(collection(db, 'lessons'), {
        ...lesson,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: currentUser.uid,
        version: 1,
        isPublished: false
      });
      
      // Create slides
      for (const slide of slides) {
        await addDoc(collection(db, 'slides'), {
          ...slide,
          lessonId: lessonRef.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: currentUser.uid,
          version: 1
        });
      }
    }
    
    toast.success('השיעור נשמר בהצלחה');
    
  } catch (error) {
    console.error('Lesson save error:', error);
    toast.error('אירעה שגיאה בשמירת השיעור');
  }
};
```

---

### **6. System Settings** (`src/components/system-manager/SystemSettings.jsx`)

#### **Purpose**
Comprehensive system configuration interface for managing platform settings, security, and system behavior.

#### **Key Features**
- **General Settings**: Basic system configuration
- **Security Settings**: Authentication and authorization settings
- **Content Settings**: Content management and publishing settings
- **User Settings**: User management and role settings
- **Analytics Settings**: Analytics and reporting configuration
- **System Maintenance**: System maintenance and backup tools

#### **Data Flow**
```javascript
// Load system settings
const loadSystemSettings = async () => {
  // Load settings from Firestore
  const settingsDoc = await getDoc(doc(db, 'systemSettings', 'main'));
  
  if (settingsDoc.exists()) {
    setSettings(settingsDoc.data());
  } else {
    // Use default settings
    setSettings(getDefaultSystemSettings());
  }
};

// Update system settings
const updateSystemSettings = async (newSettings) => {
  try {
    // Validate settings
    const validation = validateSystemSettings(newSettings);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }
    
    // Update settings
    await setDoc(doc(db, 'systemSettings', 'main'), {
      ...newSettings,
      updatedAt: new Date(),
      updatedBy: currentUser.uid
    });
    
    // Apply settings changes
    await applySystemSettings(newSettings);
    
    toast.success('ההגדרות נשמרו בהצלחה');
    
  } catch (error) {
    console.error('Settings update error:', error);
    toast.error('אירעה שגיאה בשמירת ההגדרות');
  }
};

// Apply system settings
const applySystemSettings = async (settings) => {
  // Apply authentication settings
  if (settings.authentication) {
    // Update Firebase Auth settings (requires admin SDK)
    // This would need to be done server-side
  }
  
  // Apply content settings
  if (settings.content) {
    // Update content publishing rules
    // Update content validation rules
  }
  
  // Apply user settings
  if (settings.users) {
    // Update user management rules
    // Update role permissions
  }
  
  // Apply analytics settings
  if (settings.analytics) {
    // Update analytics collection rules
    // Update reporting settings
  }
};
```

---

### **7. System Logs** (`src/components/system-manager/SystemLogs.jsx`)

#### **Purpose**
Comprehensive logging interface for monitoring system events, user activities, and system performance.

#### **Key Features**
- **Event Logging**: Track all system events and user activities
- **Error Monitoring**: Monitor and track system errors
- **Performance Logging**: Track system performance metrics
- **Security Logging**: Monitor security-related events
- **Log Filtering**: Advanced filtering and search capabilities
- **Log Export**: Export logs for external analysis

#### **Data Flow**
```javascript
// Load system logs
const loadSystemLogs = async (filters = {}) => {
  const logsRef = collection(db, 'systemLogs');
  let q = logsRef;
  
  // Apply filters
  if (filters.severity) {
    q = query(q, where('severity', '==', filters.severity));
  }
  
  if (filters.action) {
    q = query(q, where('action', '==', filters.action));
  }
  
  if (filters.userId) {
    q = query(q, where('userId', '==', filters.userId));
  }
  
  if (filters.startDate && filters.endDate) {
    q = query(q, 
      where('timestamp', '>=', filters.startDate),
      where('timestamp', '<=', filters.endDate)
    );
  }
  
  // Order by timestamp (newest first)
  q = query(q, orderBy('timestamp', 'desc'));
  
  // Limit results
  q = query(q, limit(100));
  
  const snapshot = await getDocs(q);
  const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  setLogs(logs);
  setLoading(false);
};

// Create log entry
const createLogEntry = async (logData) => {
  await addDoc(collection(db, 'systemLogs'), {
    ...logData,
    timestamp: new Date(),
    ipAddress: getClientIP(), // This would need to be implemented
    userAgent: navigator.userAgent
  });
};

// Export logs
const exportLogs = async (filters = {}) => {
  try {
    const logs = await loadSystemLogs(filters);
    
    // Convert to CSV
    const csv = convertLogsToCSV(logs);
    
    // Download file
    downloadCSV(csv, `system-logs-${new Date().toISOString()}.csv`);
    
    toast.success('הלוגים יוצאו בהצלחה');
    
  } catch (error) {
    console.error('Log export error:', error);
    toast.error('אירעה שגיאה בייצוא הלוגים');
  }
};
```

---

## 🔄 System Manager Data Flow

### **Authentication & Authorization**
```javascript
// 1. System manager logs in via AuthContext
// 2. System detects system_manager role
// 3. Redirects to system manager dashboard
// 4. Loads system manager profile and permissions
// 5. Initializes system manager-specific features
// 6. Validates permissions for each action
```

### **User Management Flow**
```javascript
// 1. System manager accesses user management
// 2. System loads all users with filtering options
// 3. System manager performs user operations
// 4. System validates permissions and data
// 5. System updates user data and related records
// 6. System logs all actions for audit trail
```

### **Content Management Flow**
```javascript
// 1. System manager accesses content management
// 2. System loads all content with analytics
// 3. System manager creates/edits content
// 4. System validates content and relationships
// 5. System saves content with versioning
// 6. System updates content analytics and usage
```

---

## 📊 System Manager Data Models

### **System Manager Profile**
```javascript
{
  uid: "string",                    // Firebase Auth UID
  email: "string",                  // System manager email
  displayName: "string",            // System manager name
  role: "system_manager",           // User role
  firstName: "string",              // First name
  lastName: "string",               // Last name
  
  // System manager permissions
  systemManagerPermissions: ["array"], // Array of permissions
  systemManagerSettings: {              // System manager preferences
    defaultLanguage: "string",
    notificationPreferences: {
      email: "boolean",
      push: "boolean",
      systemAlerts: "boolean"
    },
    dashboardPreferences: {
      defaultView: "string",
      refreshInterval: "number",
      showAnalytics: "boolean"
    }
  },
  
  // System manager analytics
  totalUsersManaged: "number",      // Total users managed
  totalContentCreated: "number",    // Total content created
  totalSystemChanges: "number",     // Total system changes made
  
  // Timestamps
  createdAt: "timestamp",
  updatedAt: "timestamp",
  lastLoginAt: "timestamp"
}
```

### **System Settings**
```javascript
{
  id: "string",                     // Settings ID (usually 'main')
  
  // General settings
  general: {
    siteName: "string",             // Site name
    siteDescription: "string",      // Site description
    defaultLanguage: "string",      // Default language
    timezone: "string",             // System timezone
    maintenanceMode: "boolean"      // Maintenance mode flag
  },
  
  // Authentication settings
  authentication: {
    allowRegistration: "boolean",   // Allow user registration
    requireEmailVerification: "boolean", // Require email verification
    passwordMinLength: "number",    // Minimum password length
    sessionTimeout: "number",       // Session timeout in minutes
    maxLoginAttempts: "number"      // Maximum login attempts
  },
  
  // Content settings
  content: {
    allowContentCreation: "boolean", // Allow content creation
    requireApproval: "boolean",     // Require content approval
    maxFileSize: "number",          // Maximum file size in MB
    allowedFileTypes: ["array"],    // Allowed file types
    autoBackup: "boolean"           // Automatic content backup
  },
  
  // User settings
  users: {
    allowUserDeletion: "boolean",   // Allow user deletion
    allowRoleChanges: "boolean",    // Allow role changes
    maxUsersPerTeacher: "number",   // Maximum students per teacher
    allowBulkOperations: "boolean"  // Allow bulk user operations
  },
  
  // Analytics settings
  analytics: {
    trackUserActivity: "boolean",   // Track user activity
    trackContentUsage: "boolean",   // Track content usage
    trackSystemPerformance: "boolean", // Track system performance
    dataRetentionDays: "number"     // Data retention period
  },
  
  // Security settings
  security: {
    enableAuditLogging: "boolean",  // Enable audit logging
    logSecurityEvents: "boolean",   // Log security events
    requireStrongPasswords: "boolean", // Require strong passwords
    enableTwoFactorAuth: "boolean"  // Enable two-factor authentication
  },
  
  // Timestamps
  createdAt: "timestamp",
  updatedAt: "timestamp",
  updatedBy: "string"               // Last updated by
}
```

### **System Logs**
```javascript
{
  id: "string",                     // Log ID
  userId: "string|null",            // User UID (if applicable)
  action: "string",                 // Action performed
  resource: "string",               // Resource affected
  details: "object",                // Action details
  
  // Security tracking
  ipAddress: "string",              // User IP address
  userAgent: "string",              // Browser user agent
  timestamp: "timestamp",           // Action timestamp
  
  // Context
  sessionId: "string|null",         // Session ID (if applicable)
  lessonId: "string|null",          // Lesson ID (if applicable)
  severity: "info|warning|error",   // Log severity
  
  // Additional metadata
  category: "string",               // Log category
  tags: ["array"],                  // Log tags
  duration: "number|null",          // Action duration (if applicable)
  result: "success|failure|partial" // Action result
}
```

---

## 🎯 System Manager Features & Capabilities

### **User Management**
- **User Creation**: Create new users with role assignment
- **User Editing**: Modify user profiles and permissions
- **User Deletion**: Remove users from the system
- **Bulk Operations**: Perform operations on multiple users
- **Role Management**: Assign and modify user roles
- **User Analytics**: Track user activity and performance

### **Content Management**
- **Lesson Creation**: Create and organize lessons
- **Slide Management**: Manage individual slides and content
- **Content Migration**: Migrate content between storage systems
- **Content Validation**: Validate content integrity and relationships
- **Content Analytics**: Track content usage and effectiveness
- **Content Versioning**: Manage different versions of content

### **System Administration**
- **System Settings**: Configure system behavior and preferences
- **Security Management**: Manage authentication and authorization
- **System Monitoring**: Monitor system health and performance
- **Log Management**: View and manage system logs
- **Backup and Restore**: Backup and restore system data
- **System Maintenance**: Perform system maintenance tasks

### **Analytics and Reporting**
- **System Analytics**: Platform-wide analytics and metrics
- **User Analytics**: Detailed user activity analysis
- **Content Analytics**: Content usage and effectiveness metrics
- **Performance Analytics**: System performance monitoring
- **Custom Reports**: Generate custom reports and exports
- **Data Visualization**: Visual representation of analytics data

### **Security and Compliance**
- **Access Control**: Manage user access and permissions
- **Audit Logging**: Track all system activities
- **Security Monitoring**: Monitor security events and threats
- **Data Protection**: Ensure data privacy and protection
- **Compliance Reporting**: Generate compliance reports
- **Security Settings**: Configure security parameters

---

## 🔧 Technical Implementation

### **State Management**
```javascript
// Global state (AuthContext)
const AuthContext = {
  currentUser: null,        // Firebase user object
  userProfile: null,        // System manager profile data
  role: "system_manager",   // User role
  loading: false,           // Loading state
  isDemoMode: false         // Demo mode flag
};

// Local state (components)
const [systemState, setSystemState] = useState({
  users: [],
  content: [],
  settings: {},
  logs: [],
  analytics: {}
});
```

### **Permission System**
```javascript
// Permission definitions
const PERMISSIONS = {
  manage_users: {
    description: 'Manage system users',
    actions: ['create_user', 'edit_user', 'delete_user', 'assign_roles']
  },
  manage_content: {
    description: 'Manage learning content',
    actions: ['create_content', 'edit_content', 'delete_content', 'publish_content']
  },
  manage_system: {
    description: 'Manage system settings',
    actions: ['update_settings', 'view_logs', 'system_maintenance']
  },
  view_analytics: {
    description: 'View system analytics',
    actions: ['view_user_analytics', 'view_content_analytics', 'view_system_analytics']
  }
};

// Check permissions
const checkPermission = (permission, action) => {
  const userPermissions = userProfile.systemManagerPermissions || [];
  return userPermissions.includes(permission);
};

// Check action permission
const checkActionPermission = (action) => {
  for (const [permission, config] of Object.entries(PERMISSIONS)) {
    if (config.actions.includes(action)) {
      return checkPermission(permission, action);
    }
  }
  return false;
};
```

### **Error Handling**
```javascript
// System-wide error handling
const handleSystemError = (error, context) => {
  console.error(`System error in ${context}:`, error);
  
  // Log error to system logs
  createLogEntry({
    action: 'system_error',
    resource: context,
    details: {
      error: error.message,
      stack: error.stack,
      context: context
    },
    severity: 'error',
    userId: currentUser?.uid
  });
  
  // Show user-friendly error message
  toast.error('אירעה שגיאה במערכת. אנא נסה שוב או פנה למנהל המערכת.');
};

// Permission error handling
const handlePermissionError = (action) => {
  console.error(`Permission denied for action: ${action}`);
  
  // Log permission violation
  createLogEntry({
    action: 'permission_denied',
    resource: action,
    details: {
      requestedAction: action,
      userId: currentUser?.uid
    },
    severity: 'warning',
    userId: currentUser?.uid
  });
  
  toast.error('אין לך הרשאה לבצע פעולה זו.');
};
```

---

## 🚀 Performance Optimization

### **Data Loading Optimization**
```javascript
// Paginated data loading
const usePaginatedData = (collectionName, pageSize = 20) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  
  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    try {
      const collectionRef = collection(db, collectionName);
      let q = query(collectionRef, orderBy('createdAt', 'desc'), limit(pageSize));
      
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }
      
      const snapshot = await getDocs(q);
      const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      setData(prev => [...prev, ...newData]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === pageSize);
      
    } catch (error) {
      console.error('Data loading error:', error);
      toast.error('אירעה שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  };
  
  return { data, loading, hasMore, loadMore };
};
```

### **Real-time Updates Optimization**
```javascript
// Optimized real-time listeners
const useOptimizedSnapshot = (docRef, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setData(doc.data());
      } else {
        setData(null);
      }
      setLoading(false);
    }, (error) => {
      console.error('Snapshot error:', error);
      setLoading(false);
    });
    
    return unsubscribe;
  }, [docRef]);
  
  return { data, loading };
};
```

---

## 🔒 Security Considerations

### **Access Control**
```javascript
// Verify system manager permissions
const verifySystemManagerPermissions = async (action) => {
  const systemManagerDoc = await getDoc(doc(db, 'users', currentUser.uid));
  const systemManagerData = systemManagerDoc.data();
  
  if (systemManagerData.role !== 'system_manager') {
    throw new Error('Access denied: System manager role required');
  }
  
  const permissions = systemManagerData.systemManagerPermissions || [];
  
  // Check specific permission
  if (!permissions.includes(action)) {
    throw new Error(`Access denied: ${action} permission required`);
  }
  
  return true;
};

// Validate sensitive operations
const validateSensitiveOperation = async (operation, targetId) => {
  // Check if operation affects current user
  if (targetId === currentUser.uid) {
    throw new Error('Cannot perform operation on own account');
  }
  
  // Check if operation affects system-critical data
  if (isSystemCritical(targetId)) {
    throw new Error('Cannot modify system-critical data');
  }
  
  return true;
};
```

### **Data Validation**
```javascript
// Validate system settings
const validateSystemSettings = (settings) => {
  const errors = [];
  
  // Validate general settings
  if (!settings.general?.siteName) {
    errors.push('Site name is required');
  }
  
  // Validate authentication settings
  if (settings.authentication?.passwordMinLength < 6) {
    errors.push('Minimum password length must be at least 6 characters');
  }
  
  // Validate content settings
  if (settings.content?.maxFileSize > 100) {
    errors.push('Maximum file size cannot exceed 100MB');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate user data
const validateUserData = (userData) => {
  const errors = [];
  
  if (!userData.email || !isValidEmail(userData.email)) {
    errors.push('Valid email is required');
  }
  
  if (!userData.displayName || userData.displayName.trim().length === 0) {
    errors.push('Display name is required');
  }
  
  if (!userData.role || !['student', 'teacher', 'system_manager'].includes(userData.role)) {
    errors.push('Valid role is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

---

This comprehensive guide covers all aspects of the System Manager UI, including components, data flow, features, and technical implementation. It provides a complete understanding of how the system manager interface works and what data is available for backend integration. 