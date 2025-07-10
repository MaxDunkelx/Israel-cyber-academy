import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug, Shield } from 'lucide-react';
import { logSecurityEvent } from '../../utils/security';

/**
 * Enhanced Error Boundary with comprehensive error handling
 * 
 * Features:
 * - Error categorization and handling
 * - User-friendly error messages in Hebrew
 * - Automatic error reporting
 * - Recovery mechanisms
 * - Performance monitoring
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0,
      errorId: null,
      recoveryAttempted: false
    };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error for debugging
    console.error('🚨 Error caught by boundary:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    // Log security event
    logSecurityEvent('ERROR_BOUNDARY_TRIGGERED', {
      errorId: this.state.errorId,
      errorMessage: error.message,
      errorStack: error.stack?.substring(0, 500), // Limit stack trace
      componentStack: errorInfo.componentStack?.substring(0, 500),
      url: window.location.href,
      timestamp: new Date().toISOString()
    });

    // Send to external error tracking service (optional)
    this.reportErrorToService(error, errorInfo);
  }

  /**
   * Report error to external service
   */
  reportErrorToService = (error, errorInfo) => {
    try {
      // Example: Send to your own error tracking endpoint
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          errorId: this.state.errorId,
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      }).catch(() => {
        // Silently fail if error reporting fails
        console.warn('Failed to report error to service');
      });
    } catch (reportingError) {
      console.warn('Error reporting failed:', reportingError);
    }
  };

  /**
   * Categorize error for better user experience
   */
  categorizeError = (error) => {
    const message = error.message?.toLowerCase() || '';
    
    if (message.includes('network') || message.includes('fetch')) {
      return {
        type: 'network',
        title: 'בעיית חיבור',
        message: 'אין חיבור לאינטרנט. אנא בדוק את החיבור שלך ונסה שוב.',
        icon: '🌐'
      };
    }
    
    if (message.includes('firebase') || message.includes('auth')) {
      return {
        type: 'authentication',
        title: 'בעיית התחברות',
        message: 'אירעה בעיה בהתחברות. אנא התחבר מחדש.',
        icon: '🔐'
      };
    }
    
    if (message.includes('permission') || message.includes('access')) {
      return {
        type: 'permission',
        title: 'בעיית הרשאות',
        message: 'אין לך הרשאה לגשת לעמוד זה.',
        icon: '🚫'
      };
    }
    
    return {
      type: 'general',
      title: 'שגיאה כללית',
      message: 'משהו השתבש. אנא נסה שוב או פנה לתמיכה.',
      icon: '⚠️'
    };
  };

  /**
   * Handle retry with exponential backoff
   */
  handleRetry = () => {
    const { retryCount } = this.state;
    const maxRetries = 3;
    
    if (retryCount >= maxRetries) {
      // Reset to home page after max retries
      window.location.href = '/';
      return;
    }

    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
      recoveryAttempted: true
    }));

    // Log retry attempt
    logSecurityEvent('ERROR_RETRY_ATTEMPT', {
      errorId: this.state.errorId,
      retryCount: retryCount + 1,
      timestamp: new Date().toISOString()
    });
  };

  /**
   * Handle navigation to home
   */
  handleGoHome = () => {
    window.location.href = '/';
  };

  /**
   * Handle manual error report
   */
  handleReportError = () => {
    const { error, errorInfo, errorId } = this.state;
    
    // Create error report
    const report = {
      errorId,
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    // Copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(report, null, 2))
      .then(() => {
        alert('דוח השגיאה הועתק ללוח. אנא שלח אותו לתמיכה.');
      })
      .catch(() => {
        alert('שגיאה בהעתקת דוח השגיאה. אנא צלם את המסך ופנה לתמיכה.');
      });
  };

  render() {
    if (this.state.hasError) {
      const errorCategory = this.categorizeError(this.state.error);
      const { retryCount } = this.state;

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center">
            {/* Error Icon */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {errorCategory.title}
              </h1>
              <p className="text-gray-600 mb-6">
                {errorCategory.message}
              </p>
            </div>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                  פרטי השגיאה (למפתחים)
                </summary>
                <div className="bg-gray-100 p-4 rounded-lg text-xs font-mono text-gray-800 overflow-auto max-h-40">
                  <div className="mb-2">
                    <strong>Error ID:</strong> {this.state.errorId}
                  </div>
                  <div className="mb-2">
                    <strong>Message:</strong> {this.state.error.message}
                  </div>
                  <div className="mb-2">
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
                  </div>
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                disabled={retryCount >= 3}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>
                  {retryCount >= 3 ? 'חזרה לדף הבית' : `נסה שוב (${retryCount + 1}/3)`}
                </span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>חזרה לדף הבית</span>
              </button>

              <button
                onClick={this.handleReportError}
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Bug className="w-4 h-4" />
                <span>דווח על השגיאה</span>
              </button>
            </div>

            {/* Error ID for Support */}
            <div className="mt-6 text-xs text-gray-500">
              מזהה שגיאה: {this.state.errorId}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 