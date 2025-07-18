import React, { useState } from 'react';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { authenticateUser } from '../firebase/pure-firestore-auth';

const DatabaseTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState([]);

  const testDatabaseConnection = async () => {
    setLoading(true);
    try {
      console.log('🧪 Testing database connection...');
      
      // Test 1: Read from users collection
      console.log('📖 Test 1: Reading from users collection...');
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      console.log('✅ Users collection read successful:', usersSnapshot.size, 'documents');
      
      // Test 2: Try to write a test document
      console.log('✍️ Test 2: Writing test document...');
      const testRef = collection(db, '_test');
      const testDoc = await addDoc(testRef, {
        test: true,
        timestamp: new Date().toISOString(),
        message: 'Database connection test'
      });
      console.log('✅ Test document written successfully:', testDoc.id);
      
      setTestResult({
        success: true,
        usersCount: usersSnapshot.size,
        testDocId: testDoc.id,
        message: 'Database connection successful!'
      });
      
    } catch (error) {
      console.error('❌ Database test failed:', error);
      setTestResult({
        success: false,
        error: error.message,
        code: error.code,
        message: 'Database connection failed!'
      });
    } finally {
      setLoading(false);
    }
  };

  const testAuthentication = async () => {
    setLoading(true);
    try {
      console.log('🧪 Testing authentication...');
      const userSession = await authenticateUser('student001@cyber.academy', 'password123');
      console.log('✅ Authentication successful!');
      setTestResult({
        success: true,
        userId: userSession.id,
        displayName: userSession.displayName,
        role: userSession.role,
        message: 'Authentication successful!'
      });
    } catch (error) {
      console.error('❌ Authentication failed:', error);
      setTestResult({
        success: false,
        error: error.message,
        code: error.code,
        message: 'Authentication failed!'
      });
    } finally {
      setLoading(false);
    }
  };

  const testSpecificUser = async () => {
    setTestResults(prev => [...prev, '🧪 Testing specific user: student001@cyber.academy']);
    
    try {
      // Test 1: Direct database query
      const usersRef = collection(db, 'users');
      const emailQuery = query(usersRef, where('email', '==', 'student001@cyber.academy'));
      const querySnapshot = await getDocs(emailQuery);
      
      if (querySnapshot.empty) {
        setTestResults(prev => [...prev, '❌ No user found with email: student001@cyber.academy']);
        return;
      }
      
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      
      setTestResults(prev => [
        ...prev,
        `✅ User found: ${userDoc.id}`,
        `📧 Email: ${userData.email}`,
        `🔑 Has password: ${!!userData.password}`,
        `🔑 Password value: ${userData.password}`,
        `👤 Role: ${userData.role}`,
        `📊 Status: ${userData.status}`,
        `🔒 Has Firebase Auth: ${userData.hasFirebaseAuth}`
      ]);
      
      // Test 2: Try authentication
      setTestResults(prev => [...prev, '🔐 Testing authentication...']);
      
      try {
        const userSession = await authenticateUser('student001@cyber.academy', 'password123');
        setTestResults(prev => [
          ...prev,
          `✅ Authentication successful!`,
          `👤 User ID: ${userSession.id}`,
          `👤 Display Name: ${userSession.displayName}`,
          `👤 Role: ${userSession.role}`
        ]);
      } catch (authError) {
        setTestResults(prev => [
          ...prev,
          `❌ Authentication failed: ${authError.message}`,
          `🔍 Error details: ${JSON.stringify(authError)}`
        ]);
      }
      
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Database query failed: ${error.message}`]);
    }
  };

  const testCurrentUserStructure = async () => {
    setTestResults(prev => [...prev, '🧪 Testing current user structure...']);
    
    try {
      // Import the auth hook
      const { useAuth } = await import('../hooks/useAuth');
      
      // This is a bit tricky to test in a component, so let's just log what we know
      setTestResults(prev => [
        ...prev,
        '📋 Current user structure should be:',
        '   - currentUser.id (document ID for pure auth)',
        '   - currentUser.email',
        '   - currentUser.role',
        '   - currentUser.displayName',
        '   - currentUser.isAuthenticated'
      ]);
      
      setTestResults(prev => [
        ...prev,
        '⚠️ Note: currentUser.uid is deprecated, use currentUser.id instead'
      ]);
      
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Error testing user structure: ${error.message}`]);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Database Connection Test</h2>
      
      <div className="space-y-4">
        <button
          onClick={testDatabaseConnection}
          disabled={loading}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Test Database Connection'}
        </button>
        
        <button
          onClick={testAuthentication}
          disabled={loading}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Test Authentication'}
        </button>
        
        <button
          onClick={testSpecificUser}
          disabled={loading}
          className="mb-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Test Specific User (student001)'}
        </button>
        
        <button
          onClick={testCurrentUserStructure}
          disabled={loading}
          className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:bg-indigo-400"
        >
          {loading ? 'Testing...' : 'Test Current User Structure'}
        </button>
      </div>
      
      {testResult && (
        <div className={`p-4 rounded-lg ${testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <h3 className="font-bold mb-2">{testResult.success ? '✅ Success' : '❌ Error'}</h3>
          <p className="mb-2">{testResult.message}</p>
          {testResult.success && (
            <div className="text-sm">
              <p><strong>Users found:</strong> {testResult.usersCount}</p>
              <p><strong>Test document ID:</strong> {testResult.testDocId}</p>
            </div>
          )}
          {!testResult.success && (
            <div className="text-sm">
              <p><strong>Error code:</strong> {testResult.code}</p>
              <p><strong>Error message:</strong> {testResult.error}</p>
            </div>
          )}
        </div>
      )}

      {testResults.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-bold text-yellow-800 mb-2">Test Results</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            {testResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-bold text-yellow-800 mb-2">Troubleshooting Tips</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Check if Firestore database exists in Firebase Console</li>
          <li>• Verify Firestore rules allow read/write operations</li>
          <li>• Check browser console for additional error details</li>
          <li>• Try refreshing the page to clear cache</li>
        </ul>
      </div>
    </div>
  );
};

export default DatabaseTest; 