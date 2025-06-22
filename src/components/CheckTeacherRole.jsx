import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const CheckTeacherRole = () => {
  const [status, setStatus] = useState('checking');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const EMAIL = 'maxbunnyshow@gmail.com';
  const PASSWORD = 'your_password_here'; // You'll need to provide the actual password

  useEffect(() => {
    checkAndFixTeacherRole();
  }, []);

  const checkAndFixTeacherRole = async () => {
    try {
      setStatus('checking');
      setError(null);

      console.log('🔍 Checking teacher role for:', EMAIL);
      
      // Sign in with the user
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, EMAIL, PASSWORD);
      const user = userCredential.user;
      
      console.log('✅ Successfully signed in as:', user.email);
      
      // Check current role in Firestore
      const db = getFirestore();
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        console.log('📋 Current user data:', data);
        
        if (data.role === 'teacher') {
          console.log('✅ User already has teacher role!');
          setStatus('success');
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
        permissions: ['view_dashboard', 'manage_students', 'view_analytics', 'manage_classes'],
        isActive: true
      };
      
      await setDoc(userDocRef, newUserData, { merge: true });
      
      console.log('✅ Successfully updated user to teacher role!');
      setUserData(newUserData);
      setStatus('success');
      
    } catch (error) {
      console.error('❌ Error:', error.message);
      setError(error.message);
      setStatus('error');
      
      if (error.code === 'auth/user-not-found') {
        toast.error('User not found. Please create the user first.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Wrong password. Please provide the correct password.');
      } else {
        toast.error('Error: ' + error.message);
      }
    }
  };

  const renderStatus = () => {
    switch (status) {
      case 'checking':
        return (
          <div className="flex items-center space-x-2 text-blue-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>בודק הרשאות מורה...</span>
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
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">בדיקת הרשאות מורה</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-300 text-sm">אימייל: {EMAIL}</p>
        </div>
        
        {renderStatus()}
        
        {userData && (
          <div className="bg-gray-700/50 rounded p-4">
            <h4 className="text-sm font-medium text-gray-200 mb-2">נתוני משתמש:</h4>
            <pre className="text-xs text-gray-300 overflow-auto">
              {JSON.stringify(userData, null, 2)}
            </pre>
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

export default CheckTeacherRole; 