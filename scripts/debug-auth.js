// Simple debug script to check authentication issues
console.log('🔍 Debug Authentication Issues');
console.log('==============================\n');

console.log('1. Check if you are logged in as a teacher');
console.log('2. Check the browser console for these debug messages:');
console.log('   - "StudentPool Debug Info:"');
console.log('   - "Loading data with teacher ID:"');
console.log('   - "Data loaded successfully:"');
console.log('\n3. Common issues and solutions:');
console.log('   ❌ "Teacher ID is undefined"');
console.log('      → Make sure you are logged in');
console.log('      → Check that your user has role: "teacher" in the database');
console.log('      → Try logging out and back in');
console.log('\n   ❌ "The query requires an index"');
console.log('      → This should be fixed now with simplified queries');
console.log('      → If still happening, check Firebase Console > Firestore > Indexes');
console.log('\n   ❌ "Error loading data"');
console.log('      → Check Firebase Console > Firestore > Rules');
console.log('      → Make sure rules allow read/write for authenticated users');
console.log('\n4. To check your user role:');
console.log('   - Go to Firebase Console > Firestore Database');
console.log('   - Look for your user document in the "users" collection');
console.log('   - Check the "role" field - it should be "teacher"');
console.log('\n5. To fix user role:');
console.log('   - Find your user document in Firestore');
console.log('   - Edit the document and set role: "teacher"');
console.log('   - Save the changes');
console.log('\n6. Test the system:');
console.log('   - Refresh the page after fixing the role');
console.log('   - Check the browser console for success messages');
console.log('   - The StudentPool should load without errors');

console.log('\n✅ Debug instructions completed'); 