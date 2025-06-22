# URL Guide - Israel Cyber Academy

## 🌐 **Base URL Structure**
- **Development**: `http://localhost:5175/Israel-cyber-academy/`
- **Production**: `https://your-domain.com/Israel-cyber-academy/`

## 👨‍🎓 **Student Platform URLs**

### **Authentication**
- **Student Login**: `/` (main page)
- **Student Registration**: `/` (main page)

### **Student Dashboard & Learning**
- **Student Dashboard**: `/roadmap`
- **Interactive Lesson**: `/interactive-lesson/:lessonId`
- **Student Profile**: `/profile`

### **Student Access Pattern**
```
Student Login → /roadmap → /interactive-lesson/1 → /interactive-lesson/2 → etc.
```

## 👨‍🏫 **Teacher Platform URLs**

### **Authentication**
- **Teacher Login**: `/teacher/login`
- **Teacher Dashboard**: `/teacher/dashboard`

### **Teacher Management Tools**
- **Class Management**: `/teacher/classes`
- **Student Management**: `/teacher/students`
- **Analytics**: `/teacher/analytics`
- **Comments**: `/teacher/comments`
- **Lesson Preview**: `/teacher/lessons`

### **Session Management**
- **Session Hosting**: `/teacher/session/:sessionId`
- **Student Monitor**: `/teacher/monitor/:sessionId`
- **Lesson Controller**: `/teacher/controller/:sessionId`

### **Teacher Access Pattern**
```
Teacher Login → /teacher/dashboard → /teacher/classes → /teacher/students → etc.
```

## 🔐 **Role-Based Access Control**

### **Student Role Access**
- ✅ Can access: `/`, `/roadmap`, `/interactive-lesson/*`, `/profile`
- ❌ Cannot access: Any `/teacher/*` URLs
- 🔄 Redirects: Students trying to access teacher URLs → `/`

### **Teacher Role Access**
- ✅ Can access: All `/teacher/*` URLs
- ❌ Cannot access: Student learning URLs (redirected to teacher dashboard)
- 🔄 Redirects: Teachers accessing `/` → `/teacher/dashboard`

## 🚀 **Quick Access URLs**

### **For Students**
```
http://localhost:5175/Israel-cyber-academy/                    # Student Login
http://localhost:5175/Israel-cyber-academy/roadmap            # Student Dashboard
http://localhost:5175/Israel-cyber-academy/interactive-lesson/1  # Lesson 1
```

### **For Teachers**
```
http://localhost:5175/Israel-cyber-academy/teacher/login      # Teacher Login
http://localhost:5175/Israel-cyber-academy/teacher/dashboard  # Teacher Dashboard
http://localhost:5175/Israel-cyber-academy/teacher/classes    # Class Management
http://localhost:5175/Israel-cyber-academy/teacher/students   # Student Management
http://localhost:5175/Israel-cyber-academy/teacher/analytics  # Analytics
http://localhost:5175/Israel-cyber-academy/teacher/lessons    # Lesson Preview
```

## 🔍 **Debugging URLs**

### **Development Only**
```
http://localhost:5175/Israel-cyber-academy/data-test          # Data Test
```

## 📱 **Mobile Responsive URLs**
All URLs work on mobile devices with responsive design.

## 🔒 **Security Features**

### **URL Protection**
- **Route Guards**: Each route checks user role before allowing access
- **Automatic Redirects**: Wrong role → correct platform
- **Session Validation**: All protected routes validate authentication

### **Access Logging**
- All access attempts are logged for security
- Unauthorized access attempts are tracked
- Teacher actions are logged for audit purposes

## 🎯 **Testing Scenarios**

### **Scenario 1: Student Login**
1. Go to: `http://localhost:5175/Israel-cyber-academy/`
2. Login as student
3. Should redirect to: `/roadmap`
4. Try accessing: `/teacher/dashboard` → Should redirect to `/`

### **Scenario 2: Teacher Login**
1. Go to: `http://localhost:5175/Israel-cyber-academy/teacher/login`
2. Login as teacher
3. Should redirect to: `/teacher/dashboard`
4. Try accessing: `/roadmap` → Should redirect to `/teacher/dashboard`

### **Scenario 3: Direct URL Access**
1. Teacher accessing `/` → Should redirect to `/teacher/dashboard`
2. Student accessing `/teacher/login` → Should show login but redirect after login
3. Unauthenticated user → Should show appropriate login page

## 🛠️ **Troubleshooting**

### **Common Issues**
1. **Wrong redirects**: Check user role in Firebase
2. **Access denied**: Verify role permissions
3. **Loading issues**: Check authentication state

### **Debug Tools**
- **Debug Component**: Shows current user state (development only)
- **Console Logs**: Check browser console for routing logs
- **Network Tab**: Monitor redirects and API calls

## 📋 **URL Summary Table**

| Role | Login URL | Dashboard URL | Main Features |
|------|-----------|---------------|---------------|
| **Student** | `/` | `/roadmap` | Lessons, Progress, Profile |
| **Teacher** | `/teacher/login` | `/teacher/dashboard` | Classes, Students, Analytics, Sessions |

## 🔄 **Redirect Flow**

### **Student Flow**
```
/ → /roadmap → /interactive-lesson/1 → /interactive-lesson/2 → /profile
```

### **Teacher Flow**
```
/teacher/login → /teacher/dashboard → /teacher/classes → /teacher/students → /teacher/analytics
```

---

*Last Updated: December 2024*
*Version: 2.0 - Complete URL Structure*

# URL Guide - Israel Cyber Academy Teacher Platform

## Base URL Configuration
- **Base Path**: `/Israel-cyber-academy/`
- **Vite Config**: `base: '/Israel-cyber-academy/'`
- **Router Basename**: `/Israel-cyber-academy`

## Teacher Platform URLs

### Authentication
- **Teacher Login**: `/Israel-cyber-academy/teacher/login`
- **Student Login**: `/Israel-cyber-academy/`

### Teacher Dashboard
- **Main Dashboard**: `/Israel-cyber-academy/teacher/dashboard`
- **Classes Management**: `/Israel-cyber-academy/teacher/classes`
- **Students Management**: `/Israel-cyber-academy/teacher/students`
- **Analytics**: `/Israel-cyber-academy/teacher/analytics`
- **Comments**: `/Israel-cyber-academy/teacher/comments`
- **Lesson Preview**: `/Israel-cyber-academy/teacher/lessons`

### Session Management
- **Session Hosting**: `/Israel-cyber-academy/teacher/session/{sessionId}`
- **Student Monitor**: `/Israel-cyber-academy/teacher/monitor/{sessionId}`
- **Lesson Controller**: `/Israel-cyber-academy/teacher/controller/{sessionId}`

## Student Platform URLs

### Main Routes
- **Student Login**: `/Israel-cyber-academy/`
- **Roadmap**: `/Israel-cyber-academy/roadmap`
- **Interactive Lesson**: `/Israel-cyber-academy/interactive-lesson/{lessonId}`
- **Profile**: `/Israel-cyber-academy/profile`

## Testing Instructions

### 1. Test Teacher Login
1. Go to: `https://maxdunkelx.github.io/Israel-cyber-academy/teacher/login`
2. Login with teacher credentials
3. Should redirect to: `/Israel-cyber-academy/teacher/dashboard`

### 2. Test Page Refresh
1. Navigate to any teacher page
2. Refresh the browser (F5 or Ctrl+R)
3. Should stay on the same page without 404 errors

### 3. Test Direct URL Access
1. Try accessing teacher URLs directly:
   - `/Israel-cyber-academy/teacher/dashboard`
   - `/Israel-cyber-academy/teacher/classes`
   - `/Israel-cyber-academy/teacher/students`
2. Should load correctly if authenticated as teacher

### 4. Test Role-Based Access
1. Login as student, try to access teacher URLs
2. Should redirect to student login or show access denied
3. Login as teacher, try to access student URLs
4. Should redirect to teacher dashboard

## Common Issues and Solutions

### Issue: 404 Error on Refresh
**Solution**: Router basename is now correctly set to `/Israel-cyber-academy`

### Issue: Wrong Redirects
**Solution**: All teacher components now redirect to `/teacher/login` instead of student routes

### Issue: Authentication State
**Solution**: Check browser console for debug messages showing user role and authentication state

## Development vs Production

### Development (localhost)
- Base URL: `http://localhost:5173/`
- Teacher Login: `http://localhost:5173/teacher/login`

### Production (GitHub Pages)
- Base URL: `https://maxdunkelx.github.io/Israel-cyber-academy/`
- Teacher Login: `https://maxdunkelx.github.io/Israel-cyber-academy/teacher/login`

## Debug Information

When in development mode, the TeacherDashboard will show debug information including:
- Current URL
- Pathname
- User Role
- User Email
- Loading State

This helps verify that routing and authentication are working correctly. 