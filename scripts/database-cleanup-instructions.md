# Database Cleanup Instructions

## Offensive Content Removal

This document provides instructions for removing offensive content from the Firebase database.

### Offensive Text to Remove
```
זיבי תומר קפלון אוכל זרע של חמור מת גוסס
```

### Collections to Check

1. **teacherActivities** - Contains teacher activity logs
2. **classes** - Contains classroom information
3. **sessions** - Contains session data
4. **students** - Contains student information
5. **users** - Contains user profiles

### Manual Cleanup Steps

1. **Set up Firebase Admin SDK authentication:**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase use <your-project-id>
   ```

2. **Create a cleanup script:**
   ```javascript
   const { initializeApp, applicationDefault } = require('firebase-admin/app');
   const { getFirestore } = require('firebase-admin/firestore');

   initializeApp({
     credential: applicationDefault(),
   });

   const db = getFirestore();
   const OFFENSIVE_TEXT = 'זיבי תומר קפלון אוכל זרע של חמור מת גוסס';

   async function cleanupDatabase() {
     const collections = ['teacherActivities', 'classes', 'sessions', 'students', 'users'];
     
     for (const collectionName of collections) {
       console.log(`Checking collection: ${collectionName}`);
       const snapshot = await db.collection(collectionName).get();
       
       for (const doc of snapshot.docs) {
         const data = doc.data();
         let shouldDelete = false;
         
         for (const [key, value] of Object.entries(data)) {
           if (typeof value === 'string' && value.includes(OFFENSIVE_TEXT)) {
             shouldDelete = true;
             break;
           }
         }
         
         if (shouldDelete) {
           await doc.ref.delete();
           console.log(`Deleted document: ${doc.id} from ${collectionName}`);
         }
       }
     }
   }

   cleanupDatabase().catch(console.error);
   ```

3. **Run the cleanup script:**
   ```bash
   node cleanup-script.js
   ```

### Firebase Console Alternative

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Firestore Database
4. Search for the offensive text in each collection
5. Manually delete any documents containing the offensive content

### Verification

After cleanup, verify that:
- No activity logs contain the offensive text
- No classroom names contain the offensive text
- No user profiles contain the offensive text
- No session data contains the offensive text

### Prevention

To prevent future incidents:
1. Implement input validation for classroom names
2. Add content filtering for user-generated content
3. Set up automated monitoring for inappropriate content
4. Train users on appropriate naming conventions 