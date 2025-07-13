/**
 * Main Entry Point - Israel Cyber Campus React Application
 * 
 * This file initializes the React application and renders the root component.
 * It sets up the necessary providers and configurations for the app to run.
 * 
 * Key Responsibilities:
 * - Create React root for DOM mounting
 * - Import global CSS styles
 * - Render the main App component
 * - Global error handling
 */

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global error handlers to catch unhandled errors
window.addEventListener('error', (event) => {
  console.error('🚨 Global error caught:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', {
    reason: event.reason,
    promise: event.promise
  });
  // Prevent the default browser behavior
  event.preventDefault();
});

// Global console error interceptor to catch anonymous function errors
const originalConsoleError = console.error;
console.error = (...args) => {
  // Check if this is an anonymous function error
  const errorString = args.join(' ');
  if (errorString.includes('(anonymous)') || errorString.includes('anonymous')) {
    console.warn('🔍 Anonymous function error detected:', args);
  }
  
  // Call the original console.error
  originalConsoleError.apply(console, args);
};

// Create React root and mount the application
// This replaces the legacy ReactDOM.render() method
createRoot(document.getElementById('root')).render(
    <App />
)
