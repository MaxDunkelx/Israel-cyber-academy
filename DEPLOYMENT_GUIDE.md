# Deployment Guide - Advanced Editor Features

## Overview
This guide ensures that the new advanced editor features (AdvancedSlideEditor, LessonGenerator) work properly when deployed to your server.

## Current Setup
- **Framework**: React + Vite
- **Deployment**: GitHub Pages
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth

## Pre-Deployment Checklist

### 1. Firebase Configuration ✅
Your Firebase configuration is already set up correctly in `src/firebase/firebase-config.js`:
- Project ID: `israel-cyber-academy`
- Auth Domain: `israel-cyber-academy.firebaseapp.com`
- API Key: Configured

### 2. Firestore Database ✅
- Database exists and is accessible
- Security rules allow read/write access
- All collections are properly structured

### 3. New Features Added ✅
- **AdvancedSlideEditor**: Visual and JSON editing with image library
- **LessonGenerator**: Template-based lesson creation
- **Editor Toggle**: Switch between basic and advanced editors
- **Image Library**: 20+ pre-made images for slides
- **Interactive Templates**: Code editor, drag-drop, quiz, simulator

## Deployment Steps

### Step 1: Build the Application
```bash
npm run build
```
This creates a production-ready build in the `dist/` folder.

### Step 2: Test Locally (Optional)
```bash
npm run preview
```
This serves the built files locally to test before deployment.

### Step 3: Deploy to GitHub Pages
```bash
npm run deploy
```
This will:
1. Build the application (`npm run build`)
2. Deploy to GitHub Pages using `gh-pages`

## Post-Deployment Verification

### 1. Check Firebase Connection
After deployment, verify that Firebase is working:
- Open browser console on your deployed site
- Look for Firebase initialization messages
- Test login functionality

### 2. Test Advanced Editor Features
1. **Login as System Manager**
2. **Navigate to Content Management**
3. **Test Editor Toggle**:
   - Click the "Advanced/Basic" toggle button
   - Verify the editor changes
4. **Test Lesson Generator**:
   - Click "Generate Lesson" button
   - Select a template (Cybersecurity, Computer Basics, Networking)
   - Customize slide types
   - Generate the lesson
5. **Test Advanced Slide Editor**:
   - Create or edit a slide
   - Switch to Advanced Editor
   - Test image library
   - Test JSON editing
   - Test drag-and-drop functionality

### 3. Verify Data Persistence
- Create a new lesson using the generator
- Edit slides with the advanced editor
- Verify changes are saved to Firestore
- Refresh the page and confirm data persists

## Troubleshooting

### Issue: Firebase Not Connecting
**Symptoms**: Console errors about Firebase initialization
**Solution**: 
1. Check Firebase project settings
2. Verify domain is added to authorized domains
3. Check Firestore security rules

### Issue: Advanced Editor Not Loading
**Symptoms**: Editor toggle doesn't work or shows errors
**Solution**:
1. Check browser console for errors
2. Verify all imports are correct
3. Check if framer-motion is properly installed

### Issue: Lesson Generator Not Working
**Symptoms**: Generator modal doesn't open or templates don't load
**Solution**:
1. Check if LessonGenerator component is properly imported
2. Verify template data is accessible
3. Check for JavaScript errors in console

### Issue: Images Not Loading
**Symptoms**: Image library shows broken images
**Solution**:
1. Check if image URLs are accessible
2. Verify CORS settings
3. Consider hosting images locally

## Performance Optimization

### Bundle Size
The current build shows a large bundle size (2.9MB). To optimize:

1. **Code Splitting**: Use dynamic imports for large components
2. **Lazy Loading**: Load components only when needed
3. **Image Optimization**: Compress and optimize images

### Recommended Optimizations
```javascript
// In vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          'editor': ['framer-motion', 'lucide-react'],
          'ui': ['@headlessui/react', 'react-beautiful-dnd']
        }
      }
    }
  }
})
```

## Security Considerations

### Firebase Security Rules
Ensure your Firestore security rules are properly configured:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Specific rules for lessons and slides
    match /lessons/{lessonId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (request.auth.token.role == 'system_manager' || 
         request.auth.token.role == 'teacher');
    }
    
    match /slides/{slideId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (request.auth.token.role == 'system_manager' || 
         request.auth.token.role == 'teacher');
    }
  }
}
```

### Environment Variables
For production, consider using environment variables for sensitive data:

```javascript
// .env.production
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## Monitoring and Maintenance

### 1. Firebase Console
- Monitor Firestore usage and costs
- Check authentication logs
- Review security rules

### 2. GitHub Pages
- Monitor deployment status
- Check for build errors
- Review deployment logs

### 3. Application Monitoring
- Monitor user interactions with new features
- Track performance metrics
- Monitor error rates

## Rollback Plan

If issues occur after deployment:

1. **Revert to Previous Version**:
   ```bash
   git checkout HEAD~1
   npm run build
   npm run deploy
   ```

2. **Disable Advanced Features**:
   - Set `useAdvancedEditor` to `false` by default
   - Hide the "Generate Lesson" button temporarily

3. **Database Rollback**:
   - Use Firebase console to restore from backup
   - Or manually revert changes in Firestore

## Success Criteria

The deployment is successful when:

✅ **Advanced Editor Toggle** works properly
✅ **Lesson Generator** creates lessons with all slide types
✅ **Image Library** displays and adds images to slides
✅ **JSON Editor** allows editing and saves changes
✅ **Drag-and-Drop** functionality works for slide elements
✅ **Data Persistence** saves all changes to Firestore
✅ **Performance** is acceptable (load times < 3 seconds)
✅ **No Console Errors** in production environment

## Next Steps

After successful deployment:

1. **User Training**: Create guides for system managers
2. **Feature Documentation**: Document all new features
3. **Performance Monitoring**: Set up monitoring tools
4. **User Feedback**: Collect feedback on new features
5. **Iterative Improvements**: Plan future enhancements

---

**Note**: This deployment guide ensures that all advanced editor features work seamlessly in production while maintaining data integrity and user experience. 