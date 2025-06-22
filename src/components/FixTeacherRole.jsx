import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { CheckCircle, AlertCircle, Loader2, Shield, User } from 'lucide-react';

const FixTeacherRole = () => {
  const [email, setEmail] = useState('maxbunnyshow@gmail.com');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fixTeacherRole = async () => {
    if (!password) {
      toast.error('אנא הכנס סיסמה');
      return;
    }

    try {
      setStatus('checking');
      setError(null);

      console.log('🔍 Checking teacher role for:', email);
      
      // Sign in with the user
      const auth = getAuth();
      console.log('📝 Attempting to sign in...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('✅ Successfully signed in as:', user.email);
      console.log('🆔 User UID:', user.uid);
      
      // Check current role in Firestore
      console.log('📋 Checking current user data in Firestore...');
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        console.log('📊 Current user data:', data);
        
        if (data.role === 'teacher') {
          console.log('✅ User already has teacher role!');
          setStatus('success');
          toast.success('המשתמש כבר מורה!');
          return;
        } else {
          console.log('⚠️ User has role:', data.role, '- updating to teacher...');
        }
      } else {
        console.log('📝 User document doesn\'t exist - creating with teacher role...');
      }
      
      // Update or create user document with teacher role
      const newUserData = {
        email: user.email,
        role: 'teacher',
        displayName: user.displayName || 'Teacher',
        createdAt: new Date(),
        updatedAt: new Date(),
        permissions: ['view_dashboard', 'manage_students', 'view_analytics', 'manage_classes', 'preview_lessons', 'add_notes'],
        isActive: true,
        teacherId: user.uid,
        teacherEmail: user.email
      };
      
      console.log('💾 Saving teacher role to Firestore...');
      await setDoc(userDocRef, newUserData, { merge: true });
      
      console.log('✅ Successfully updated user to teacher role!');
      setUserData(newUserData);
      setStatus('success');
      toast.success('המשתמש עודכן למורה בהצלחה!');
      
    } catch (error) {
      console.error('❌ Error:', error.message);
      setError(error.message);
      setStatus('error');
      
      if (error.code === 'auth/user-not-found') {
        toast.error('משתמש לא נמצא. אנא צור את המשתמש תחילה');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('סיסמה שגויה');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('פורמט אימייל לא תקין');
      } else {
        toast.error('שגיאה: ' + error.message);
      }
    }
  };

  const renderStatus = () => {
    switch (status) {
      case 'checking':
        return (
          <div className="flex items-center space-x-2 text-blue-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>בודק ועדכן הרשאות מורה...</span>
          </div>
        );
      
      case 'success':
        return (
          <div className="flex items-center space-x-2 text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span>✅ מורה מורשה - גישה מלאה למערכת</span>
          </div>
        );
      
      case 'error':
        return (
          <div className="flex items-center space-x-2 text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span>שגיאה: {error}</span>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 max-w-md mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-100">עדכון הרשאות מורה</h3>
          <p className="text-gray-400 text-sm">הגדר משתמש כמורה במערכת</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            אימייל
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="הכנס אימייל"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            סיסמה
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="הכנס סיסמה"
          />
        </div>
        
        <button
          onClick={fixTeacherRole}
          disabled={status === 'checking'}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <User className="w-4 h-4" />
          <span>עדכן למורה</span>
        </button>
        
        {renderStatus()}
        
        {userData && (
          <div className="bg-gray-700/50 rounded p-4">
            <h4 className="text-sm font-medium text-gray-200 mb-2">נתוני משתמש:</h4>
            <div className="text-xs text-gray-300 space-y-1">
              <p><strong>אימייל:</strong> {userData.email}</p>
              <p><strong>תפקיד:</strong> {userData.role}</p>
              <p><strong>שם:</strong> {userData.displayName}</p>
              <p><strong>סטטוס:</strong> {userData.isActive ? 'פעיל' : 'לא פעיל'}</p>
            </div>
          </div>
        )}
        
        {status === 'success' && (
          <div className="bg-green-900/20 border border-green-700 rounded p-4">
            <p className="text-green-300 text-sm">
              <strong>הצלחה!</strong> המשתמש עודכן למורה.
            </p>
            <p className="text-green-400 text-xs mt-2">
              כעת ניתן לגשת ללוח בקרת המורה בכתובת: /teacher
            </p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded p-4">
            <p className="text-red-300 text-sm">
              <strong>שגיאה:</strong> {error}
            </p>
            <p className="text-red-400 text-xs mt-2">
              אנא ודא שהסיסמה נכונה ושהמשתמש קיים במערכת.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FixTeacherRole; 