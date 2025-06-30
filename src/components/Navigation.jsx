import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  User, 
  Terminal
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import cyberLogo from '../assets/cyber-logo.png';

const Navigation = () => {
  const { currentUser, logout } = useAuth();

  // Get user display name and role
  const displayName = currentUser?.displayName || currentUser?.email || 'User';
  const role = currentUser?.role || 'student';

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('התנתקת בהצלחה');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('אירעה שגיאה בהתנתקות');
    }
  };

  return (
    <header className="bg-black/80 backdrop-blur-xl border-b border-green-500/30 p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side - Logo and Brand */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <img src={cyberLogo} alt="Cyber Logo" className="w-16 h-16 animate-pulse" />
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Israel Cyber Campus
            </h1>
            <p className="text-green-400 text-sm font-mono">Terminal v2.0.1</p>
          </div>
        </div>

        {/* Right Side - Home Button, Profile Button and User Info */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <Link to={role === 'teacher' ? '/teacher/dashboard' : '/student/roadmap'}>
            <button className="group relative bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 border border-green-400/30">
              <div className="absolute inset-0 bg-green-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2 space-x-reverse">
                <Terminal className="w-5 h-5" />
                <span>בית</span>
              </span>
            </button>
          </Link>
          
          <Link to="/profile">
            <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 border border-blue-400/30">
              <div className="absolute inset-0 bg-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2 space-x-reverse">
                <User className="w-5 h-5" />
                <span>פרופיל</span>
              </span>
            </button>
          </Link>
          
          <div className="text-right">
            <p className="text-white font-semibold">{displayName}</p>
            <p className="text-green-400 text-sm font-mono">
              {role === 'teacher' ? 'TEACHER' : 'STUDENT'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation; 