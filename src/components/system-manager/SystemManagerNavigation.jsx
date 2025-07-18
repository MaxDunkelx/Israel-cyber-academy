/**
 * SystemManagerNavigation Component
 * 
 * Navigation component for the system manager interface
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, Settings, User } from 'lucide-react';
import { usePureAuth } from '../../contexts/PureAuthContext';
import Button from '../ui/Button';

const SystemManagerNavigation = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = usePureAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-gray-800/50 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-white">מנהל המערכת</h1>
              <p className="text-gray-300 text-sm">
                {currentUser?.displayName || currentUser?.email}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => navigate('/system-manager/settings')}
            variant="secondary"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>הגדרות</span>
          </Button>
          
          <Button
            onClick={() => navigate('/system-manager/profile')}
            variant="secondary"
            size="sm"
            className="flex items-center space-x-2"
          >
            <User className="w-4 h-4" />
            <span>פרופיל</span>
          </Button>
          
          <Button
            onClick={handleLogout}
            variant="danger"
            size="sm"
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>התנתק</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default SystemManagerNavigation; 