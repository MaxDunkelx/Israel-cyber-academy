import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Eye, EyeOff, User, Lock, Users, GraduationCap, Zap, Target, Cpu, Key } from 'lucide-react';
import toast from 'react-hot-toast';
import logo from '../assets/cyber-logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('student');

  const { login, signup } = useAuth();

  // Guest student login handler
  const handleGuestStudent = () => {
    localStorage.setItem('isGuest', 'true');
    localStorage.setItem('guestRole', 'student');
    window.location.href = '/roadmap';
  };

  // Guest teacher login handler
  const handleGuestTeacher = () => {
    localStorage.setItem('isGuest', 'true');
    localStorage.setItem('guestRole', 'teacher');
    window.location.href = '/teacher-dashboard';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignup) {
        await signup(email, password, displayName, role);
        toast.success('החשבון נוצר בהצלחה!');
      } else {
        await login(email, password);
        toast.success('התחברת בהצלחה!');
      }
    } catch (error) {
      console.error('Auth error:', error);
      let errorMessage = 'אירעה שגיאה בהתחברות';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'משתמש לא נמצא';
          break;
        case 'auth/wrong-password':
          errorMessage = 'סיסמה שגויה';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'כתובת האימייל כבר קיימת במערכת';
          break;
        case 'auth/weak-password':
          errorMessage = 'הסיסמה חייבת להכיל לפחות 6 תווים';
          break;
        case 'auth/invalid-email':
          errorMessage = 'כתובת אימייל לא תקינה';
          break;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyber-blue to-cyber-purple p-4 relative overflow-hidden">
      {/* Cybersecurity-themed background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 animate-pulse">
          <Cpu className="h-8 w-8 text-cyber-green/20" />
        </div>
        <div className="absolute top-20 right-20 animate-pulse delay-1000">
          <Shield className="h-6 w-6 text-cyber-blue/20" />
        </div>
        <div className="absolute bottom-20 left-20 animate-pulse delay-2000">
          <Key className="h-7 w-7 text-cyber-purple/20" />
        </div>
        <div className="absolute bottom-10 right-10 animate-pulse delay-3000">
          <Target className="h-5 w-5 text-cyber-green/20" />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-pulse delay-500">
          <Zap className="h-6 w-6 text-cyber-blue/20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-pulse delay-1500">
          <Users className="h-5 w-5 text-cyber-purple/20" />
        </div>
      </div>

      <div className="max-w-4xl w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="flex flex-col items-center mb-4">
            <div className="relative mb-4 animate-pulse">
              <img
                src={logo}
                alt="Israel Cyber Campus Logo"
                className="mx-auto h-64 w-64 rounded-full drop-shadow-[0_0_60px_#06b6d4,0_0_120px_#3b82f6] animate-glow bg-transparent"
                style={{
                  filter: 'drop-shadow(0 0 120px #06b6d4) drop-shadow(0 0 240px #3b82f6) saturate(2) brightness(1.2)',
                  mixBlendMode: 'screen',
                  background: 'radial-gradient(circle at 50% 50%, #06b6d4 0%, #3b82f6 100%)',
                  border: 'none'
                }}
              />
              <div className="absolute inset-0 rounded-full blur-3xl opacity-80 animate-glow bg-gradient-to-tr from-cyber-blue via-cyber-purple to-cyber-green"></div>
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-wide animate-bounce mt-4" style={{textShadow: '0 0 20px #06b6d4, 0 0 40px #3b82f6'}}>
              ISRAEL CYBER CAMPUS
            </h1>
            <p className="text-xl text-white/90 mt-2 font-medium">מרכז ההכשרה המוביל לסייבר בישראל</p>
          </div>
          
          <div className="flex justify-center space-x-8 mb-6">
            <div className="flex items-center space-x-2 text-white/80">
              <Shield className="h-5 w-5 text-cyber-green" />
              <span>אבטחת מידע מתקדמת</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Cpu className="h-5 w-5 text-cyber-blue" />
              <span>טכנולוגיות חדשניות</span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <GraduationCap className="h-5 w-5 text-cyber-purple" />
              <span>הכשרה מקצועית</span>
            </div>
          </div>

          <h2 className="mt-8 text-4xl font-bold text-white">
            {isSignup ? 'הרשמה למערכת' : 'התחברות למערכת'}
          </h2>
          <p className="mt-2 text-white/80 text-lg">
            {isSignup ? 'צור חשבון חדש' : 'התחבר לחשבון שלך'}
          </p>
        </div>

        <div className="card max-w-md mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                    שם מלא
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="displayName"
                      name="displayName"
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                      placeholder="הכנס את שמך המלא"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    תפקיד
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                  >
                    <option value="student">תלמיד</option>
                    <option value="teacher">מורה</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                כתובת אימייל
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                סיסמה
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                  placeholder="הכנס סיסמה"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isSignup ? 'יוצר חשבון...' : 'מתחבר...'}
                  </div>
                ) : (
                  isSignup ? 'צור חשבון' : 'התחבר'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-cyber-blue hover:text-blue-700 text-sm font-medium"
            >
              {isSignup ? 'יש לך כבר חשבון? התחבר' : 'אין לך חשבון? הירשם'}
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={handleGuestStudent}
              className="w-full btn-secondary text-lg py-3 flex items-center justify-center space-x-2"
            >
              <GraduationCap className="h-5 w-5" />
              <span>היכנס כתלמיד אורח (צפייה להדגמה)</span>
            </button>
            
            <button
              type="button"
              onClick={handleGuestTeacher}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-lg flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>היכנס כמורה אורח (ניהול כיתה)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 