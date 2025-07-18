import React, { useState, useEffect } from 'react';
import { diagnoseFirestoreConnection, getFirebaseConfigStatus } from '../firebase/firebase-config';

const FirebaseDiagnostic = () => {
  const [diagnosticResult, setDiagnosticResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [configStatus, setConfigStatus] = useState(null);

  useEffect(() => {
    // Get initial config status
    setConfigStatus(getFirebaseConfigStatus());
  }, []);

  const runDiagnostic = async () => {
    setIsRunning(true);
    try {
      const result = await diagnoseFirestoreConnection();
      setDiagnosticResult(result);
    } catch (error) {
      setDiagnosticResult({
        success: false,
        error: error.message
      });
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusColor = (success) => {
    return success ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Firebase Connection Diagnostic</h2>
      
      {/* Configuration Status */}
      {configStatus && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Configuration Status</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><strong>Project ID:</strong> {configStatus.projectId}</div>
            <div><strong>Auth Domain:</strong> {configStatus.authDomain}</div>
            <div><strong>Environment:</strong> {configStatus.environment}</div>
            <div><strong>Using Env Vars:</strong> {configStatus.usingEnvVars ? 'Yes' : 'No'}</div>
            <div><strong>Secure:</strong> {configStatus.secure ? 'Yes' : 'No'}</div>
            <div><strong>GitHub Pages:</strong> {configStatus.isGitHubPages ? 'Yes' : 'No'}</div>
          </div>
        </div>
      )}

      {/* Authentication Status */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Authentication Status</h3>
        <div className="text-sm">
          <div><strong>Auth System:</strong> Pure Firestore Authentication (No Firebase Auth)</div>
          <div><strong>Status:</strong> Using database-only authentication</div>
        </div>
      </div>

      {/* Diagnostic Button */}
      <button
        onClick={runDiagnostic}
        disabled={isRunning}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isRunning ? 'Running Diagnostic...' : 'Run Connection Diagnostic'}
      </button>

      {/* Diagnostic Results */}
      {diagnosticResult && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Diagnostic Results</h3>
          <div className={`text-lg font-bold mb-2 ${getStatusColor(diagnosticResult.success)}`}>
            {diagnosticResult.success ? '✅ Connection Successful' : '❌ Connection Failed'}
          </div>
          
          {diagnosticResult.error && (
            <div className="mb-2 p-2 bg-red-100 rounded text-red-800">
              <strong>Error:</strong> {diagnosticResult.error}
            </div>
          )}
          
          {diagnosticResult.code && (
            <div className="mb-2 p-2 bg-yellow-100 rounded text-yellow-800">
              <strong>Error Code:</strong> {diagnosticResult.code}
            </div>
          )}

          {/* Additional Info */}
          {diagnosticResult.isAuthenticated !== undefined && (
            <div className="text-sm">
              <div><strong>Authenticated:</strong> {diagnosticResult.isAuthenticated ? 'Yes' : 'No'}</div>
              {diagnosticResult.userEmail && (
                <div><strong>User Email:</strong> {diagnosticResult.userEmail}</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Troubleshooting Tips */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Troubleshooting Tips</h3>
        <ul className="text-sm space-y-1">
          <li>• Check if you're logged in to the application</li>
          <li>• Verify your internet connection</li>
          <li>• Check Firebase Console for project status</li>
          <li>• Ensure Firestore database exists and is in test mode</li>
          <li>• Check browser console for additional error details</li>
        </ul>
      </div>
    </div>
  );
};

export default FirebaseDiagnostic; 