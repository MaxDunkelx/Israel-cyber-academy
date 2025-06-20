/**
 * Main Entry Point - Israel Cyber Academy React Application
 * 
 * This file serves as the entry point for the React application.
 * It initializes the React root and renders the main App component.
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
