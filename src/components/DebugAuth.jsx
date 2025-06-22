/**
 * DebugAuth Component - Development Only
 * 
 * Debug component to troubleshoot authentication and role detection.
 * Only available in development mode.
 * 
 * @component
 */

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useAuth';

const DebugAuth = () => {
  const { currentUser, loading } = useAuth();
  const { displayName, email, role } = useUserProfile();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 border border-gray-600 rounded-lg p-4 text-white text-sm z-50 max-w-md">
      <h3 className="font-bold mb-2">🔧 Debug Auth Info</h3>
      <div className="space-y-1">
        <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
        <p><strong>User:</strong> {currentUser ? 'Logged In' : 'Not Logged In'}</p>
        <p><strong>UID:</strong> {currentUser?.uid || 'N/A'}</p>
        <p><strong>Display Name:</strong> {displayName || 'N/A'}</p>
        <p><strong>Email:</strong> {email || 'N/A'}</p>
        <p><strong>Role:</strong> {role || 'N/A'}</p>
        <p><strong>Current Path:</strong> {window.location.pathname}</p>
        <p><strong>Hash:</strong> {window.location.hash}</p>
      </div>
      
      {role === 'teacher' && (
        <div className="mt-3 p-2 bg-green-600/20 border border-green-500/30 rounded">
          <p className="text-green-400 text-xs">✅ Teacher detected - should redirect to /teacher/dashboard</p>
        </div>
      )}
      
      {role === 'student' && (
        <div className="mt-3 p-2 bg-blue-600/20 border border-blue-500/30 rounded">
          <p className="text-blue-400 text-xs">📚 Student detected - should redirect to /roadmap</p>
        </div>
      )}
    </div>
  );
};

export default DebugAuth; 