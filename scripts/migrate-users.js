/**
 * User Migration Script for Israel Cyber Academy
 * Migrates existing users to the new database schema
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  updateDoc, 
  writeBatch,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Migrate existing users to new schema
 */
async function migrateUsers() {
  console.log('🔄 Starting user migration...');

  try {
    // Check if user is authenticated
    const user = auth.currentUser;
    if (!user) {
      console.log('⚠️  No authenticated user found. Please log in first.');
      return;
    }

    console.log(`✅ Authenticated as: ${user.email}`);

    // Get all existing users
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    
    console.log(`📊 Found ${usersSnapshot.size} users to migrate`);

    const batch = writeBatch(db);
    let migratedCount = 0;
    let skippedCount = 0;

    usersSnapshot.forEach((userDoc) => {
      const userData = userDoc.data();
      const userId = userDoc.id;

      // Check if user already has the new schema
      if (isUserMigrated(userData)) {
        console.log(`⏭️  User ${userId} already migrated, skipping...`);
        skippedCount++;
        return;
      }

      // Migrate user to new schema
      const migratedUserData = migrateUserData(userData);
      
      batch.update(doc(db, 'users', userId), {
        ...migratedUserData,
        updatedAt: serverTimestamp()
      });

      console.log(`✅ Migrated user: ${userId}`);
      migratedCount++;
    });

    // Commit all changes
    if (migratedCount > 0) {
      await batch.commit();
      console.log(`✅ Successfully migrated ${migratedCount} users`);
    }

    console.log(`📊 Migration Summary:`);
    console.log(`   - Migrated: ${migratedCount} users`);
    console.log(`   - Skipped: ${skippedCount} users`);
    console.log(`   - Total: ${usersSnapshot.size} users`);

  } catch (error) {
    console.error('❌ User migration failed:', error);
    throw error;
  }
}

/**
 * Check if user already has the new schema
 */
function isUserMigrated(userData) {
  // Check for new schema fields
  const hasNewFields = userData.hasOwnProperty('assignedClasses') &&
                      userData.hasOwnProperty('profile') &&
                      userData.hasOwnProperty('academic') &&
                      userData.hasOwnProperty('progress');

  return hasNewFields;
}

/**
 * Migrate user data to new schema
 */
function migrateUserData(userData) {
  const migratedData = {
    // Keep existing fields
    email: userData.email || '',
    displayName: userData.displayName || '',
    role: userData.role || 'student',
    
    // Add new schema fields
    profile: {
      firstName: extractFirstName(userData.displayName || ''),
      lastName: extractLastName(userData.displayName || ''),
      phone: userData.phone || '',
      avatar: userData.avatar || '',
      bio: userData.bio || getDefaultBio(userData.role)
    },
    
    academic: {
      grade: userData.grade || '',
      school: userData.school || '',
      graduationYear: userData.graduationYear || getDefaultGraduationYear(),
      specialization: userData.specialization || '',
      experience: userData.experience || '',
      education: userData.education || ''
    },
    
    progress: userData.progress || {},
    completedLessons: userData.completedLessons || [],
    currentLesson: userData.currentLesson || 1,
    assignedClasses: userData.assignedClasses || [],
    
    // Timestamps
    createdAt: userData.createdAt || serverTimestamp(),
    lastLogin: userData.lastLogin || serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  return migratedData;
}

/**
 * Extract first name from display name
 */
function extractFirstName(displayName) {
  if (!displayName) return '';
  
  // Handle Hebrew names (right to left)
  const nameParts = displayName.trim().split(' ');
  return nameParts[nameParts.length - 1] || '';
}

/**
 * Extract last name from display name
 */
function extractLastName(displayName) {
  if (!displayName) return '';
  
  // Handle Hebrew names (right to left)
  const nameParts = displayName.trim().split(' ');
  return nameParts.slice(0, -1).join(' ') || '';
}

/**
 * Get default bio based on role
 */
function getDefaultBio(role) {
  switch (role) {
    case 'teacher':
      return 'מורה באקדמיה לאבטחת סייבר';
    case 'student':
      return 'תלמיד באקדמיה לאבטחת סייבר';
    default:
      return 'משתמש באקדמיה לאבטחת סייבר';
  }
}

/**
 * Get default graduation year
 */
function getDefaultGraduationYear() {
  const currentYear = new Date().getFullYear();
  return currentYear + 2; // Assume 2 years from now for students
}

/**
 * Migrate specific user by email
 */
async function migrateUserByEmail(email) {
  console.log(`🔄 Migrating user with email: ${email}`);

  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log(`❌ No user found with email: ${email}`);
      return false;
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    const userId = userDoc.id;

    if (isUserMigrated(userData)) {
      console.log(`⏭️  User ${userId} already migrated`);
      return true;
    }

    // Migrate user data
    const migratedUserData = migrateUserData(userData);
    
    await updateDoc(doc(db, 'users', userId), {
      ...migratedUserData,
      updatedAt: serverTimestamp()
    });

    console.log(`✅ Successfully migrated user: ${userId}`);
    return true;

  } catch (error) {
    console.error(`❌ Failed to migrate user ${email}:`, error);
    return false;
  }
}

/**
 * Create missing user profiles
 */
async function createMissingProfiles() {
  console.log('🔄 Creating missing user profiles...');

  try {
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    
    const batch = writeBatch(db);
    let createdCount = 0;

    usersSnapshot.forEach((userDoc) => {
      const userData = userDoc.data();
      const userId = userDoc.id;

      // Check if user has profile
      if (!userData.profile) {
        const profile = {
          firstName: extractFirstName(userData.displayName || ''),
          lastName: extractLastName(userData.displayName || ''),
          phone: '',
          avatar: '',
          bio: getDefaultBio(userData.role)
        };

        batch.update(doc(db, 'users', userId), {
          profile,
          updatedAt: serverTimestamp()
        });

        console.log(`✅ Created profile for user: ${userId}`);
        createdCount++;
      }
    });

    if (createdCount > 0) {
      await batch.commit();
      console.log(`✅ Created ${createdCount} missing profiles`);
    } else {
      console.log('✅ All users already have profiles');
    }

  } catch (error) {
    console.error('❌ Failed to create missing profiles:', error);
    throw error;
  }
}

/**
 * Update user roles
 */
async function updateUserRoles() {
  console.log('🔄 Updating user roles...');

  try {
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    
    const batch = writeBatch(db);
    let updatedCount = 0;

    usersSnapshot.forEach((userDoc) => {
      const userData = userDoc.data();
      const userId = userDoc.id;

      // Set default role if missing
      if (!userData.role) {
        batch.update(doc(db, 'users', userId), {
          role: 'student', // Default to student
          updatedAt: serverTimestamp()
        });

        console.log(`✅ Set default role for user: ${userId}`);
        updatedCount++;
      }
    });

    if (updatedCount > 0) {
      await batch.commit();
      console.log(`✅ Updated ${updatedCount} user roles`);
    } else {
      console.log('✅ All users already have roles');
    }

  } catch (error) {
    console.error('❌ Failed to update user roles:', error);
    throw error;
  }
}

/**
 * Verify migration
 */
async function verifyMigration() {
  console.log('🔍 Verifying migration...');

  try {
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    
    let verifiedCount = 0;
    let issuesCount = 0;

    usersSnapshot.forEach((userDoc) => {
      const userData = userDoc.data();
      const userId = userDoc.id;

      // Check required fields
      const hasRequiredFields = userData.email && 
                               userData.displayName && 
                               userData.role &&
                               userData.profile &&
                               userData.academic;

      if (hasRequiredFields) {
        verifiedCount++;
      } else {
        console.log(`⚠️  User ${userId} missing required fields`);
        issuesCount++;
      }
    });

    console.log(`📊 Verification Summary:`);
    console.log(`   - Verified: ${verifiedCount} users`);
    console.log(`   - Issues: ${issuesCount} users`);
    console.log(`   - Total: ${usersSnapshot.size} users`);

    return issuesCount === 0;

  } catch (error) {
    console.error('❌ Migration verification failed:', error);
    return false;
  }
}

/**
 * Rollback migration (if needed)
 */
async function rollbackMigration() {
  console.log('⚠️  Rolling back migration...');

  try {
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    
    const batch = writeBatch(db);
    let rollbackCount = 0;

    usersSnapshot.forEach((userDoc) => {
      const userData = userDoc.data();
      const userId = userDoc.id;

      // Remove new schema fields
      const rollbackData = {
        email: userData.email,
        displayName: userData.displayName,
        role: userData.role,
        createdAt: userData.createdAt,
        lastLogin: userData.lastLogin,
        updatedAt: serverTimestamp()
      };

      batch.set(doc(db, 'users', userId), rollbackData, { merge: true });
      console.log(`✅ Rolled back user: ${userId}`);
      rollbackCount++;
    });

    await batch.commit();
    console.log(`✅ Rolled back ${rollbackCount} users`);

  } catch (error) {
    console.error('❌ Rollback failed:', error);
    throw error;
  }
}

// Export functions
export {
  migrateUsers,
  migrateUserByEmail,
  createMissingProfiles,
  updateUserRoles,
  verifyMigration,
  rollbackMigration
};

// Run migration if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];
  
  switch (command) {
    case 'migrate':
      migrateUsers()
        .then(() => verifyMigration())
        .then(() => {
          console.log('🎉 User migration completed successfully!');
          process.exit(0);
        })
        .catch((error) => {
          console.error('💥 User migration failed:', error);
          process.exit(1);
        });
      break;
      
    case 'verify':
      verifyMigration()
        .then((success) => {
          if (success) {
            console.log('✅ Migration verification passed!');
            process.exit(0);
          } else {
            console.log('❌ Migration verification failed!');
            process.exit(1);
          }
        })
        .catch((error) => {
          console.error('💥 Verification failed:', error);
          process.exit(1);
        });
      break;
      
    case 'rollback':
      rollbackMigration()
        .then(() => {
          console.log('✅ Migration rollback completed!');
          process.exit(0);
        })
        .catch((error) => {
          console.error('💥 Rollback failed:', error);
          process.exit(1);
        });
      break;
      
    default:
      console.log('Usage: node migrate-users.js [migrate|verify|rollback]');
      process.exit(1);
  }
} 