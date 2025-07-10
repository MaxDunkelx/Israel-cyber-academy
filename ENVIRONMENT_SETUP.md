# Environment Variables Setup Guide

## 🔐 Firebase Security Configuration

### Problem Fixed
The application was showing a security warning:
```
⚠️ SECURITY WARNING: Using hardcoded Firebase config in production!
```

### Solution Implemented
Created `.env.production` file with proper environment variables for secure Firebase configuration.

### Environment Variables Required

Create a `.env.production` file in the root directory with these variables:

```bash
# Firebase Configuration - Production Environment
VITE_FIREBASE_API_KEY=AIzaSyC35sH38k9co_R0zBsbDT0S6RE1Cp-ksHE
VITE_FIREBASE_AUTH_DOMAIN=israel-cyber-academy.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=israel-cyber-academy
VITE_FIREBASE_STORAGE_BUCKET=israel-cyber-academy.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=750693821908
VITE_FIREBASE_APP_ID=1:750693821908:web:6518d1facad1d8095cfa41
```

### For Development
Create a `.env.local` file with the same variables for local development.

### Security Benefits
- ✅ **No more security warnings** in production
- ✅ **Environment-specific configuration** 
- ✅ **Secure credential management**
- ✅ **Follows Firebase best practices**

### Deployment Process
1. Ensure `.env.production` exists with correct values
2. Run `npm run build` - environment variables will be included
3. Run `firebase deploy` - secure configuration deployed

### Important Notes
- `.env.production` is in `.gitignore` for security (correct behavior)
- Environment variables are embedded during build time
- No runtime configuration changes needed
- Works with Firebase Hosting deployment

### Verification
After deployment, check the browser console - you should see:
```
✅ Using secure environment variables for Firebase config
```

Instead of the security warning. 