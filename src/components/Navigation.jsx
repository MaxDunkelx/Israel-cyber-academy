import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, 
  Home, 
  User, 
  LogOut, 
  Menu, 
  X,
  BookOpen,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/cyber-logo.png';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/roadmap', label: 'מסלול למידה', icon: Home },
    ...(userProfile?.role === 'teacher' ? [
      { path: '/teacher', label: 'דשבורד מורה', icon: BarChart3 }
    ] : []),
    { path: '/profile', label: 'פרופיל', icon: User }
  ];

  const isGuest = userProfile?.isGuest;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/roadmap')}
            >
              <img src={logo} alt="Israel Cyber Campus Logo" className="w-16 h-16 object-contain rounded-2xl mr-3 border-2 border-cyber-blue bg-white/0" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-800">
                  ישראל סייבר קמפוס
                </h1>
                <p className="text-xs text-gray-500">
                  מערכת למידה אינטראקטיבית
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-cyber-blue text-white'
                      : 'text-gray-600 hover:text-cyber-blue hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4 ml-2" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* User Info */}
            <div className="hidden sm:flex items-center">
              <div className="text-right ml-3">
                <p className="text-sm font-medium text-gray-800">
                  {isGuest ? 'אורח' : userProfile?.displayName}
                </p>
                <p className="text-xs text-gray-500">
                  {isGuest ? 'צפייה להדגמה' : userProfile?.role === 'teacher' ? 'מורה' : 'תלמיד'}
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-8 h-8 bg-cyber-blue rounded-full flex items-center justify-center text-white font-bold hover:bg-blue-700 transition-colors"
                >
                  {isGuest ? '?' : userProfile?.displayName?.charAt(0) || '?'}
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                      <div className="py-1">
                        {!isGuest && (
                          <button
                            onClick={() => {
                              navigate('/profile');
                              setIsUserMenuOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <User className="h-4 w-4 ml-3" />
                            פרופיל
                          </button>
                        )}
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4 ml-3" />
                          התנתק
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-cyber-blue text-white'
                        : 'text-gray-600 hover:text-cyber-blue hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 ml-3" />
                    {item.label}
                  </button>
                );
              })}
              
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8 h-8 bg-cyber-blue rounded-full flex items-center justify-center text-white font-bold ml-3">
                    {isGuest ? '?' : userProfile?.displayName?.charAt(0) || '?'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {isGuest ? 'אורח' : userProfile?.displayName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isGuest ? 'צפייה להדגמה' : userProfile?.role === 'teacher' ? 'מורה' : 'תלמיד'}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="h-4 w-4 ml-3" />
                  התנתק
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation; 