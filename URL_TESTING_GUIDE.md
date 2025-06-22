# URL Testing Guide - Israel Cyber Academy

## 🎯 **Quick Test Summary**

### **For Teachers**
1. **Login URL**: `http://localhost:5175/Israel-cyber-academy/teacher/login`
2. **Dashboard URL**: `http://localhost:5175/Israel-cyber-academy/teacher/dashboard`
3. **Expected Flow**: Login → Dashboard → Teacher Interface

### **For Students**
1. **Login URL**: `http://localhost:5175/Israel-cyber-academy/`
2. **Dashboard URL**: `http://localhost:5175/Israel-cyber-academy/roadmap`
3. **Expected Flow**: Login → Roadmap → Student Interface

## 🔍 **Testing Scenarios**

### **Scenario 1: Teacher Login Test**
```bash
# 1. Go to teacher login
http://localhost:5175/Israel-cyber-academy/teacher/login

# 2. Login with teacher credentials
Email: maxbunnyshow@gmail.com
Password: [your-password]

# 3. Expected behavior:
# - Should redirect to /teacher/dashboard
# - Should show teacher navigation
# - Should have access to all teacher features
```

### **Scenario 2: Student Login Test**
```bash
# 1. Go to student login
http://localhost:5175/Israel-cyber-academy/

# 2. Login with student credentials
Email: [student-email]
Password: [student-password]

# 3. Expected behavior:
# - Should redirect to /roadmap
# - Should show student navigation
# - Should have access to lessons
```

### **Scenario 3: Role Protection Test**
```bash
# 1. Login as teacher
http://localhost:5175/Israel-cyber-academy/teacher/login

# 2. Try to access student URL
http://localhost:5175/Israel-cyber-academy/roadmap
# Expected: Should redirect to /teacher/dashboard

# 3. Login as student
http://localhost:5175/Israel-cyber-academy/

# 4. Try to access teacher URL
http://localhost:5175/Israel-cyber-academy/teacher/dashboard
# Expected: Should redirect to /
```

## 🛠️ **Debug Information**

### **Console Logs to Watch For**
When testing, check the browser console for these logs:

#### **Teacher Login Success**
```
🔍 TeacherLogin - Current user: maxbunnyshow@gmail.com
🔍 TeacherLogin - User role: teacher
✅ Login successful, waiting for role update...
✅ User is confirmed as teacher, redirecting to dashboard
🔀 Main route: Teacher detected, redirecting to /teacher/dashboard
✅ TeacherRoute: Access granted for teacher
```

#### **Student Login Success**
```
🔍 AppContent - Current user: [student-email]
🔍 AppContent - User role: student
🔀 Main route: Student detected, redirecting to /roadmap
✅ StudentRoute: Access granted for student
```

#### **Access Denied**
```
🚫 TeacherRoute: Access denied. User role is student but teacher role required
🚫 TeacherRoute: Redirecting to /teacher/login
```

### **Debug Component**
In development mode, you'll see a debug component showing:
- Current user email
- User role
- Loading states
- Authentication status

## 🔧 **Troubleshooting**

### **Issue 1: Wrong Redirects**
**Symptoms**: Teacher logs in but goes to student interface
**Solution**: 
1. Check user role in Firebase
2. Run the role check script
3. Verify role is set to 'teacher'

### **Issue 2: Access Denied**
**Symptoms**: User gets access denied message
**Solution**:
1. Check browser console for role information
2. Verify user has correct role in Firebase
3. Clear browser cache and try again

### **Issue 3: Loading Forever**
**Symptoms**: Page shows loading spinner indefinitely
**Solution**:
1. Check Firebase connection
2. Check browser console for errors
3. Verify authentication state

## 📋 **URL Structure Reference**

### **Teacher Platform URLs**
```
/teacher/login          # Teacher login page
/teacher/dashboard      # Teacher dashboard
/teacher/classes        # Class management
/teacher/students       # Student management
/teacher/analytics      # Analytics dashboard
/teacher/comments       # Comments management
/teacher/lessons        # Lesson preview
/teacher/session/:id    # Session hosting
/teacher/monitor/:id    # Student monitoring
/teacher/controller/:id # Lesson controller
```

### **Student Platform URLs**
```
/                       # Student login
/roadmap                # Student dashboard
/interactive-lesson/:id # Interactive lessons
/profile                # Student profile
```

### **Development URLs**
```
/data-test              # Data testing (dev only)
```

## 🎮 **Quick Test Commands**

### **Test Teacher Access**
```bash
# 1. Open teacher login
open http://localhost:5175/Israel-cyber-academy/teacher/login

# 2. Login with teacher credentials
# 3. Verify redirect to dashboard
# 4. Test teacher navigation
```

### **Test Student Access**
```bash
# 1. Open student login
open http://localhost:5175/Israel-cyber-academy/

# 2. Login with student credentials
# 3. Verify redirect to roadmap
# 4. Test student navigation
```

### **Test Role Protection**
```bash
# 1. Login as teacher
# 2. Try accessing: http://localhost:5175/Israel-cyber-academy/roadmap
# 3. Should redirect to teacher dashboard

# 4. Login as student
# 5. Try accessing: http://localhost:5175/Israel-cyber-academy/teacher/dashboard
# 6. Should redirect to student login
```

## 🔒 **Security Features**

### **Route Protection**
- ✅ All teacher routes check for teacher role
- ✅ All student routes check for student role
- ✅ Unauthenticated users redirected to appropriate login
- ✅ Wrong role access attempts logged and blocked

### **Navigation Protection**
- ✅ Teacher navigation only shows for teachers
- ✅ Student navigation only shows for students
- ✅ Role-based menu items

### **Session Management**
- ✅ Automatic role detection on login
- ✅ Secure redirects based on role
- ✅ Session validation on route changes

## 📊 **Expected Console Output**

### **Successful Teacher Login**
```
🔍 TeacherLogin - Current user: maxbunnyshow@gmail.com
🔍 TeacherLogin - User role: teacher
✅ Login successful, waiting for role update...
✅ User is confirmed as teacher, redirecting to dashboard
🔀 Main route: Teacher detected, redirecting to /teacher/dashboard
✅ TeacherRoute: Access granted for teacher
```

### **Successful Student Login**
```
🔍 AppContent - Current user: student@example.com
🔍 AppContent - User role: student
🔀 Main route: Student detected, redirecting to /roadmap
✅ StudentRoute: Access granted for student
```

### **Access Denied**
```
🚫 TeacherRoute: Access denied. User role is student but teacher role required
🚫 TeacherRoute: Redirecting to /teacher/login
```

## 🎯 **Success Criteria**

### **Teacher Platform**
- ✅ Teacher can login at `/teacher/login`
- ✅ Teacher is redirected to `/teacher/dashboard`
- ✅ Teacher sees teacher navigation
- ✅ Teacher can access all teacher features
- ✅ Student trying to access teacher URLs is blocked

### **Student Platform**
- ✅ Student can login at `/`
- ✅ Student is redirected to `/roadmap`
- ✅ Student sees student navigation
- ✅ Student can access lessons
- ✅ Teacher trying to access student URLs is redirected

### **Security**
- ✅ Role-based access control works
- ✅ Unauthorized access is blocked
- ✅ Proper redirects based on role
- ✅ Security events are logged

---

*Use this guide to verify that the URL structure and role-based access control are working correctly.* 