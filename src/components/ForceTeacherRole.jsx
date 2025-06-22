/**
 * Force Teacher Role Component - Development Only
 * 
 * This component forces the teacher role for testing purposes.
 * Only available in development mode.
 * 
 * @component
 */

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { toast } from 'react-hot-toast';

const ForceTeacherRole = () => {
  const { currentUser } = useAuth();
  const { role } = useUserProfile();
  const [isUpdating, setIsUpdating] = useState(false);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const forceTeacherRole = async () => {
    if (!currentUser) {
      toast.error('No user logged in');
      return;
    }

    setIsUpdating(true);
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        role: 'teacher',
        updatedAt: new Date()
      });
      
      toast.success('Role updated to teacher! Please refresh the page.');
      console.log('✅ Role forced to teacher');
      
      // Force page refresh
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 bg-red-800 border border-red-600 rounded-lg p-4 text-white text-sm z-50">
      <h3 className="font-bold mb-2">🔧 Force Teacher Role</h3>
      <div className="space-y-2">
        <p><strong>Current Role:</strong> {role}</p>
        <p><strong>User:</strong> {currentUser?.email}</p>
        <button
          onClick={forceTeacherRole}
          disabled={isUpdating}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs disabled:opacity-50"
        >
          {isUpdating ? 'Updating...' : 'Force Teacher Role'}
        </button>
      </div>
    </div>
  );
};

export default ForceTeacherRole; 