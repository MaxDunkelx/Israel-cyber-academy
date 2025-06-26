/**
 * Setup Firestore Indexes Script
 * 
 * This script helps you set up the required Firestore indexes
 * for the content management system.
 * 
 * Usage: node scripts/setup-firestore-indexes.js
 */

console.log('🔧 Firestore Indexes Setup Guide');
console.log('================================\n');

console.log('📋 Required Indexes for Content Management:');
console.log('');

console.log('1. 📚 Lessons Collection Index:');
console.log('   Collection: lessons');
console.log('   Fields: id (Ascending)');
console.log('   Purpose: Order lessons by ID');
console.log('');

console.log('2. 📄 Slides Collection Index (Primary):');
console.log('   Collection: slides');
console.log('   Fields: lessonId (Ascending), order (Ascending)');
console.log('   Purpose: Query slides by lesson with proper ordering');
console.log('');

console.log('3. 📄 Slides Collection Index (Alternative):');
console.log('   Collection: slides');
console.log('   Fields: lessonId (Ascending), id (Ascending)');
console.log('   Purpose: Query slides by lesson with ID ordering');
console.log('');

console.log('🚀 How to Create These Indexes:');
console.log('');

console.log('Option 1: Firebase Console (Recommended)');
console.log('1. Go to: https://console.firebase.google.com/');
console.log('2. Select your project: israel-cyber-academy');
console.log('3. Go to Firestore Database > Indexes');
console.log('4. Click "Add Index"');
console.log('5. Create each index as shown above');
console.log('');

console.log('Option 2: Use the Direct Links');
console.log('');

// Generate the direct links from the error messages
const indexLinks = [
  {
    name: 'Slides Collection - lessonId + order',
    url: 'https://console.firebase.google.com/v1/r/project/israel-cyber-academy/firestore/indexes?create_composite=ClNwcm9qZWN0cy9pc3JhZWwtY3liZXItYWNhZGVteS9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvc2xpZGVzL2luZGV4ZXMvXxABGgwKCGxlc3NvbklkEAEaCQoFb3JkZXIQARoMCghfX25hbWVfXxAB'
  },
  {
    name: 'Slides Collection - lessonId + id',
    url: 'https://console.firebase.google.com/v1/r/project/israel-cyber-academy/firestore/indexes?create_composite=ClNwcm9qZWN0cy9pc3JhZWwtY3liZXItYWNhZGVteS9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvc2xpZGVzL2luZGV4ZXMvXxABGgwKCGxlc3NvbklkEAEaBgoCaWQQARoMCghfX25hbWVfXxAB'
  }
];

indexLinks.forEach((index, i) => {
  console.log(`${i + 1}. ${index.name}:`);
  console.log(`   ${index.url}`);
  console.log('');
});

console.log('📝 Manual Index Creation Steps:');
console.log('');

console.log('For Slides Collection (lessonId + order):');
console.log('1. Collection ID: slides');
console.log('2. Fields:');
console.log('   - Field path: lessonId, Order: Ascending');
console.log('   - Field path: order, Order: Ascending');
console.log('3. Query scope: Collection');
console.log('4. Click "Create Index"');
console.log('');

console.log('For Slides Collection (lessonId + id):');
console.log('1. Collection ID: slides');
console.log('2. Fields:');
console.log('   - Field path: lessonId, Order: Ascending');
console.log('   - Field path: id, Order: Ascending');
console.log('3. Query scope: Collection');
console.log('4. Click "Create Index"');
console.log('');

console.log('⏱️ Index Creation Time:');
console.log('- Indexes typically take 1-5 minutes to build');
console.log('- You can monitor progress in the Firebase Console');
console.log('- Once built, your queries will work properly');
console.log('');

console.log('🧪 After Creating Indexes:');
console.log('1. Wait for indexes to finish building');
console.log('2. Run: node scripts/test-content-management.js');
console.log('3. All tests should pass');
console.log('');

console.log('💡 Troubleshooting:');
console.log('- If you get index errors, wait a few more minutes');
console.log('- Make sure you\'re using the correct project');
console.log('- Check that the field names match exactly');
console.log('- Ensure you have proper permissions');
console.log('');

console.log('🎯 Next Steps:');
console.log('1. Create the indexes using one of the methods above');
console.log('2. Wait for them to finish building');
console.log('3. Test the content management system');
console.log('4. Start editing lessons and slides!');
console.log('');

console.log('✅ Setup complete! Follow the steps above to create your indexes.'); 