import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { CheckCircle, AlertCircle, Loader2, User } from 'lucide-react';

const UpdateToTeacher = () => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const EMAIL = 'maxbunnyshow@gmail.com';

  const updateToTeacher = async () => {
    if (!password) {
      toast.error('אנא הכנס סיסמה');
      return;
    }

    try {
      setStatus('updating');
      setError(null);

      console.log('🔍 Updating user to teacher role:', EMAIL);
      
      // Sign in
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, EMAIL, password);
      const user = userCredential.user;
      
      console.log('✅ Signed in successfully:', user.email);
      
      // Update user document
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      const teacherData = {
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
      
      await setDoc(userDocRef, teacherData, { merge: true });
      
      console.log('✅ Successfully updated to teacher role!');
      setUserData(teacherData);
      setStatus('success');
      toast.success('המשתמש עודכן למורה בהצלחה!');
      
    } catch (error) {
      console.error('❌ Error:', error.message);
      setError(error.message);
      setStatus('error');
      
      if (error.code === 'auth/wrong-password') {
        toast.error('סיסמה שגויה');
      } else if (error.code === 'auth/user-not-found') {
        toast.error('משתמש לא נמצא');
      } else {
        toast.error('שגיאה: ' + error.message);
      }
    }
  };

  const renderStatus = () => {
    switch (status) {
      case 'updating':
        return (
          <div className="flex items-center space-x-2 text-blue-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>מעדכן למורה...</span>
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
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-100">עדכון למורה</h3>
        <p className="text-gray-400 text-sm">הגדר משתמש כמורה במערכת</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            אימייל
          </label>
          <input
            type="email"
            value={EMAIL}
            disabled
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 cursor-not-allowed"
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
          onClick={updateToTeacher}
          disabled={status === 'updating'}
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
              כעת ניתן לגשת ללוח בקרת המורה בכתובת: /instructor/dashboard
            </p>
            <p className="text-green-400 text-xs">
              התחבר מחדש כדי לראות את השינויים.
            </p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded p-4">
            <p className="text-red-300 text-sm">
              <strong>שגיאה:</strong> {error}
            </p>
            <p className="text-red-400 text-xs mt-2">
              אנא ודא שהסיסמה נכונה.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateToTeacher; 