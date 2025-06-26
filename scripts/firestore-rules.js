/**
 * Firestore Security Rules and Index Configuration
 * 
 * This file contains the security rules and index configurations
 * for the lessons and slides collections.
 */

// Firestore Security Rules
const securityRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Lessons collection
    match /lessons/{lessonId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'system-manager';
    }
    
    // Slides collection
    match /slides/{slideId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'system-manager';
    }
    
    // Media collection (for future use)
    match /media/{mediaId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'system-manager';
    }
  }
}
`;

// Firestore Indexes Configuration
const indexes = `
{
  "indexes": [
    {
      "collectionGroup": "slides",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "lessonId",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "order",
          "order": "ASCENDING"
        }
      ]
    },
    {
      "collectionGroup": "slides",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "lessonId",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "id",
          "order": "ASCENDING"
        }
      ]
    },
    {
      "collectionGroup": "lessons",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "id",
          "order": "ASCENDING"
        }
      ]
    }
  ],
  "fieldOverrides": []
}
`;

console.log('📋 Firestore Configuration Generated');
console.log('\n🔐 Security Rules:');
console.log(securityRules);
console.log('\n📊 Indexes Configuration:');
console.log(indexes);

console.log('\n💡 To apply these configurations:');
console.log('1. Go to Firebase Console > Firestore Database > Rules');
console.log('2. Replace the rules with the security rules above');
console.log('3. Go to Firebase Console > Firestore Database > Indexes');
console.log('4. Add the composite indexes manually or use Firebase CLI');

export { securityRules, indexes }; 