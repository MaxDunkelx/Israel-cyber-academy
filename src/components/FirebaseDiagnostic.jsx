import React, { useState } from 'react';
import { diagnoseFirestoreConnection } from '../firebase/firebase-config';

/**
 * Firebase Diagnostic Component
 * 
 * A development tool to diagnose Firebase/Firestore connection issues.
 * This component provides detailed information about the connection status
 * and helps identify common configuration problems.
 */
const FirebaseDiagnostic = () => {
  const [diagnosis, setDiagnosis] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnosis = async () => {
    setIsRunning(true);
    setDiagnosis(null);
    
    try {
      const result = await diagnoseFirestoreConnection();
      setDiagnosis(result);
    } catch (error) {
      setDiagnosis({
        success: false,
        error: error.message,
        code: error.code
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-700 rounded-lg p-4 max-w-md z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">Firebase Diagnostic</h3>
        <button
          onClick={runDiagnosis}
          disabled={isRunning}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-sm rounded"
        >
          {isRunning ? 'Running...' : 'Test Connection'}
        </button>
      </div>
      
      {diagnosis && (
        <div className="text-sm">
          {diagnosis.success ? (
            <div className="text-green-400">
              <p>✅ Connection successful</p>
              <p>Project: {diagnosis.projectId}</p>
              <p>Domain: {diagnosis.authDomain}</p>
            </div>
          ) : (
            <div className="text-red-400">
              <p>❌ Connection failed</p>
              <p>Error: {diagnosis.error}</p>
              {diagnosis.code && <p>Code: {diagnosis.code}</p>}
            </div>
          )}
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-400">
        <p>Check browser console for detailed logs</p>
      </div>
    </div>
  );
};

export default FirebaseDiagnostic; 