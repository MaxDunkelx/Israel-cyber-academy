import React, { useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { useAuth } from '../hooks/useAuth';

/**
 * Data Test Component
 * 
 * A simple component to test saving and retrieving data from Firestore.
 * This helps verify that the database connection is working properly.
 */
const DataTest = () => {
  const [testData, setTestData] = useState('');
  const [savedData, setSavedData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { currentUser } = useAuth();

  const saveTestData = async () => {
    if (!currentUser) {
      setMessage('❌ Please log in first');
      return;
    }

    if (!testData.trim()) {
      setMessage('❌ Please enter some test data');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Create a test document
      const testDoc = {
        userId: currentUser.uid,
        email: currentUser.email,
        testData: testData,
        timestamp: new Date(),
        message: 'This is a test document from the Israel Cyber Academy app'
      };

      // Save to Firestore
      const docRef = doc(db, 'test-data', currentUser.uid);
      await setDoc(docRef, testDoc);

      setMessage('✅ Data saved successfully!');
      console.log('✅ Test data saved:', testDoc);
    } catch (error) {
      console.error('❌ Error saving data:', error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTestData = async () => {
    if (!currentUser) {
      setMessage('❌ Please log in first');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Load from Firestore
      const docRef = doc(db, 'test-data', currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setSavedData(JSON.stringify(data, null, 2));
        setMessage('✅ Data loaded successfully!');
        console.log('✅ Test data loaded:', data);
      } else {
        setMessage('ℹ️ No test data found for this user');
        setSavedData('');
      }
    } catch (error) {
      console.error('❌ Error loading data:', error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    setTestData('');
    setSavedData('');
    setMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">🧪 Firestore Data Test</h2>
      
      {!currentUser ? (
        <div className="text-yellow-400 text-center py-4">
          Please log in to test data saving
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-white mb-2">Test Data to Save:</label>
            <textarea
              value={testData}
              onChange={(e) => setTestData(e.target.value)}
              placeholder="Enter some test data here..."
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
            />
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={saveTestData}
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium"
            >
              {isLoading ? 'Saving...' : '💾 Save Data'}
            </button>
            
            <button
              onClick={loadTestData}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium"
            >
              {isLoading ? 'Loading...' : '📥 Load Data'}
            </button>
            
            <button
              onClick={clearData}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium"
            >
              🗑️ Clear
            </button>
          </div>

          {message && (
            <div className={`p-3 rounded-lg mb-4 ${
              message.includes('✅') ? 'bg-green-900 text-green-100' : 
              message.includes('❌') ? 'bg-red-900 text-red-100' : 
              'bg-blue-900 text-blue-100'
            }`}>
              {message}
            </div>
          )}

          {savedData && (
            <div className="mb-4">
              <label className="block text-white mb-2">Loaded Data:</label>
              <pre className="bg-gray-900 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
                {savedData}
              </pre>
            </div>
          )}

          <div className="text-sm text-gray-400 mt-4">
            <p>🔍 This test saves data to: <code>test-data/{currentUser.uid}</code></p>
            <p>📊 Check Firebase Console to see the saved data</p>
          </div>
        </>
      )}
    </div>
  );
};

export default DataTest; 