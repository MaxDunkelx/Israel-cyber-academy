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
    </div>
  );
};

export default DebugAuth; 