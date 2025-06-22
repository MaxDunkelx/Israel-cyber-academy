<<<<<<< HEAD
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
=======
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useAuth';
import Card from './ui/Card';

const DebugAuth = () => {
  const { currentUser, loading } = useAuth();
  const { role, displayName, email } = useUserProfile();

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="p-4 bg-gray-800/90 backdrop-blur-sm border border-gray-600">
        <h3 className="text-white font-bold mb-2">🔍 Debug Info</h3>
        <div className="text-xs text-gray-300 space-y-1">
          <div>Loading: {loading ? 'Yes' : 'No'}</div>
          <div>User: {currentUser ? 'Logged In' : 'Not Logged In'}</div>
          <div>Email: {email || 'N/A'}</div>
          <div>Display Name: {displayName || 'N/A'}</div>
          <div>Role: <span className={role === 'teacher' ? 'text-green-400' : 'text-blue-400'}>{role || 'N/A'}</span></div>
          <div>UID: {currentUser?.uid || 'N/A'}</div>
        </div>
      </Card>
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
    </div>
  );
};

export default DebugAuth; 