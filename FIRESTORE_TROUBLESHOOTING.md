# Firestore Connection Troubleshooting Guide

## Current Issue: 400 Bad Request Errors

You're experiencing 400 Bad Request errors when trying to connect to Firestore. This guide will help you diagnose and fix the issue.

## Quick Diagnostic Steps

### 1. Check Browser Console
Open your browser's developer tools (F12) and look for:
- Detailed error messages in the Console tab
- Network requests in the Network tab
- Any Firebase-related errors

### 2. Use the Diagnostic Tool
A diagnostic component has been added to your app (bottom-right corner in development mode). Click "Test Connection" to get detailed information.

## Common Causes and Solutions

### 🔴 Issue 1: Firestore Database Not Created

**Symptoms:**
- 400 Bad Request errors
- "Database not found" errors
- Connection timeouts

**Solution:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `israel-cyber-academy`
3. In the left sidebar, click "Firestore Database"
4. Click "Create Database"
5. Choose "Start in test mode" (for development)
6. Select a location (choose the closest to your users)
7. Click "Done"

### 🔴 Issue 2: Security Rules Blocking Access

**Symptoms:**
- "Permission denied" errors
- 400 Bad Request with permission-related messages

**Solution:**
1. In Firebase Console, go to Firestore Database
2. Click the "Rules" tab
3. Replace the rules with this development-friendly version:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read/write test collections
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**⚠️ Important:** These rules are for development only. For production, use more restrictive rules.

### 🔴 Issue 3: Project Configuration Issues

**Symptoms:**
- Authentication works but Firestore fails
- Inconsistent behavior

**Solution:**
1. Verify your Firebase project settings:
   - Project ID: `israel-cyber-academy`
   - API Key: `AIzaSyC35sH38k9co_R0zBsbDT0S6RE1Cp-ksHE`
   - Auth Domain: `israel-cyber-academy.firebaseapp.com`

2. Check if Firestore is enabled:
   - Go to Firebase Console
   - Look for "Firestore Database" in the sidebar
   - If not visible, you need to enable it

### 🔴 Issue 4: Network/Firewall Issues

**Symptoms:**
- Connection timeouts
- Intermittent failures

**Solution:**
1. Check your internet connection
2. Try disabling VPN if you're using one
3. Check if your firewall is blocking Firebase connections
4. Try accessing from a different network

## Step-by-Step Fix Process

### Step 1: Create Firestore Database
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select project: `israel-cyber-academy`
3. Click "Firestore Database" in sidebar
4. Click "Create Database"
5. Choose "Start in test mode"
6. Select location (e.g., `us-central1`)
7. Click "Done"

### Step 2: Update Security Rules
1. In Firestore Database, click "Rules" tab
2. Replace with the development rules above
3. Click "Publish"

### Step 3: Test Connection
1. Refresh your app
2. Check browser console for new logs
3. Use the diagnostic tool (bottom-right corner)
4. Try logging in with your user account

### Step 4: Verify User Profile Creation
1. After logging in, check if a user profile is created
2. Look for console logs about profile creation
3. Check Firestore Database for a `users` collection

## Debug Information

The enhanced diagnostic system will provide:
- ✅ Connection status
- 📋 Detailed error messages
- 🔧 Configuration verification
- 💡 Specific solution suggestions

## Production Considerations

When moving to production:
1. Update security rules to be more restrictive
2. Remove diagnostic components
3. Use environment variables for API keys
4. Set up proper user authentication flows

## Still Having Issues?

If the problem persists:
1. Check the browser console for specific error codes
2. Verify your Firebase project is active and not suspended
3. Ensure you have the correct billing setup (Firestore requires billing)
4. Contact Firebase support if needed

## Useful Links

- [Firebase Console](https://console.firebase.google.com/)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Pricing](https://firebase.google.com/pricing) 