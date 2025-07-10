# 🚀 Deployment Guide - Israel Cyber Academy

## 📋 **Pre-Deployment Checklist**

### ✅ **Environment Variables Setup**

1. **Copy the example environment file:**
   ```bash
   cp env.example .env.local
   ```

2. **Fill in your Firebase configuration:**
   ```bash
   # .env.local
   VITE_FIREBASE_API_KEY=your_actual_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=israel-cyber-academy.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=israel-cyber-academy
   VITE_FIREBASE_STORAGE_BUCKET=israel-cyber-academy.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=750693821908
   VITE_FIREBASE_APP_ID=1:750693821908:web:6518d1facad1d8095cfa41
   ```

3. **For production, create .env.production:**
   ```bash
   cp .env.local .env.production
   ```

### 🔐 **Security Configuration**

1. **Firebase Console Setup:**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project: `israel-cyber-academy`
   - Go to Authentication > Settings > Authorized domains
   - Add your production domain

2. **Firestore Security Rules:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users collection - users can only access their own data
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Sessions collection
       match /sessions/{sessionId} {
         allow read: if request.auth != null && (
           resource.data.teacherId == request.auth.uid ||
           (resource.data.studentIds != null && resource.data.studentIds.hasAny([request.auth.uid]))
         );
         allow create: if request.auth != null &&
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "teacher";
         allow update, delete: if request.auth != null &&
           resource.data.teacherId == request.auth.uid;
       }
       
       // Lessons collection - public read access
       match /lessons/{lessonId} {
         allow read: if true;
         allow write: if request.auth != null && 
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'system_manager';
       }
     }
   }
   ```

## 🚀 **Deployment Options**

### **Option 1: GitHub Pages (Current)**

**Advantages:**
- ✅ Free hosting
- ✅ Automatic deployments
- ✅ Easy setup

**Disadvantages:**
- ⚠️ Hardcoded Firebase config (less secure)
- ⚠️ Limited environment variable support

**Setup:**
```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### **Option 2: Vercel (Recommended for Production)**

**Advantages:**
- ✅ Full environment variable support
- ✅ Better security
- ✅ Automatic deployments
- ✅ Custom domains
- ✅ Analytics

**Setup:**
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard:**
   - Go to your project settings
   - Add all variables from `.env.production`

### **Option 3: Netlify**

**Advantages:**
- ✅ Full environment variable support
- ✅ Easy setup
- ✅ Custom domains

**Setup:**
1. **Connect your GitHub repository**
2. **Set build command:** `npm run build`
3. **Set publish directory:** `dist`
4. **Add environment variables in Netlify dashboard**

## 🔧 **Environment-Specific Configuration**

### **Development (.env.local)**
```bash
VITE_APP_ENVIRONMENT=development
VITE_ENABLE_DEBUG_LOGGING=true
VITE_ENABLE_FIREBASE_EMULATORS=false
VITE_ENABLE_SECURITY_LOGGING=true
```

### **Production (.env.production)**
```bash
VITE_APP_ENVIRONMENT=production
VITE_ENABLE_DEBUG_LOGGING=false
VITE_ENABLE_FIREBASE_EMULATORS=false
VITE_ENABLE_SECURITY_LOGGING=true
VITE_ENABLE_ERROR_REPORTING=true
```

## 🧪 **Testing Before Deployment**

### **1. Local Testing**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test all features:
# - User registration/login
# - Lesson navigation
# - Progress tracking
# - Live sessions
# - Teacher dashboard
# - System manager features
```

### **2. Build Testing**
```bash
# Build the project
npm run build

# Preview the build
npm run preview

# Test the production build locally
```

### **3. Security Testing**
```bash
# Check for hardcoded secrets
grep -r "AIzaSy" src/

# Verify environment variables are used
grep -r "import.meta.env" src/

# Test error boundaries
# - Disconnect internet
# - Navigate to invalid routes
# - Test authentication failures
```

## 📊 **Post-Deployment Verification**

### **1. Functionality Tests**
- [ ] User registration works
- [ ] User login works
- [ ] Lesson navigation works
- [ ] Progress tracking works
- [ ] Live sessions work
- [ ] Teacher dashboard works
- [ ] System manager features work

### **2. Security Tests**
- [ ] Environment variables are loaded correctly
- [ ] No hardcoded secrets in console
- [ ] Firebase security rules are enforced
- [ ] Error boundaries catch and handle errors
- [ ] Authentication state is properly managed

### **3. Performance Tests**
- [ ] No memory leaks (check browser dev tools)
- [ ] Fast loading times
- [ ] Smooth animations
- [ ] Responsive design works

## 🚨 **Troubleshooting**

### **Common Issues**

**1. Firebase Configuration Errors**
```bash
# Error: Missing required Firebase environment variables
# Solution: Check your .env files and ensure all variables are set
```

**2. Memory Leaks**
```bash
# Check browser dev tools > Memory tab
# Look for increasing memory usage
# Ensure all timers and listeners are cleaned up
```

**3. Build Errors**
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

**4. Environment Variables Not Loading**
```bash
# Ensure variables start with VITE_
# Restart development server
# Check .env file location
```

## 📈 **Monitoring & Maintenance**

### **1. Error Monitoring**
- Monitor browser console for errors
- Check Firebase console for authentication issues
- Review security logs for suspicious activity

### **2. Performance Monitoring**
- Monitor page load times
- Check for memory leaks
- Monitor Firebase usage and costs

### **3. Security Monitoring**
- Review authentication logs
- Monitor for unauthorized access attempts
- Check for data breaches

## 🎯 **Production Checklist**

### **Before Going Live**
- [ ] Environment variables configured
- [ ] Firebase security rules updated
- [ ] Error boundaries tested
- [ ] Memory leaks fixed
- [ ] Performance optimized
- [ ] Security tested
- [ ] All features working
- [ ] Documentation updated

### **After Going Live**
- [ ] Monitor error logs
- [ ] Check user feedback
- [ ] Monitor performance
- [ ] Update security as needed
- [ ] Plan for scaling

## 🔄 **Update Process**

### **1. Development**
```bash
# Make changes
git add .
git commit -m "Description of changes"
git push origin main
```

### **2. Testing**
```bash
# Test locally
npm run dev

# Test build
npm run build
npm run preview
```

### **3. Deployment**
```bash
# Deploy to production
npm run deploy  # For GitHub Pages
# OR
vercel --prod   # For Vercel
```

## 📞 **Support**

If you encounter issues during deployment:

1. **Check the console logs** for error messages
2. **Verify environment variables** are set correctly
3. **Test locally** before deploying
4. **Review this guide** for common solutions
5. **Contact support** if issues persist

---

**🎉 Your Israel Cyber Academy is now ready for production deployment!** 