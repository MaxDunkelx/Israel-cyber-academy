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
 */

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Create React root and mount the application
// This replaces the legacy ReactDOM.render() method
createRoot(document.getElementById('root')).render(
    <App />
)
