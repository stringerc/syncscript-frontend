import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BackendStatusProps {
  onClose: () => void;
}

const BackendStatusIndicator: React.FC<BackendStatusProps> = ({ onClose }) => {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline' | 'error'>('checking');
  const [lastCheck, setLastCheck] = useState<Date>(new Date());
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch('https://syncscript-backend-1.onrender.com/api/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(5000) // 5 second timeout
        });
        
        if (response.ok) {
          setBackendStatus('online');
          setErrorCount(0);
        } else {
          setBackendStatus('error');
          setErrorCount(prev => prev + 1);
        }
      } catch (error) {
        setBackendStatus('offline');
        setErrorCount(prev => prev + 1);
      }
      
      setLastCheck(new Date());
    };

    // Check immediately
    checkBackendStatus();
    
    // Check every 30 seconds
    const interval = setInterval(checkBackendStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (backendStatus) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'error': return 'bg-yellow-500';
      case 'checking': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (backendStatus) {
      case 'online': return 'Backend Online';
      case 'offline': return 'Backend Offline';
      case 'error': return 'Backend Error';
      case 'checking': return 'Checking...';
      default: return 'Unknown';
    }
  };

  const getStatusIcon = () => {
    switch (backendStatus) {
      case 'online': return '✅';
      case 'offline': return '❌';
      case 'error': return '⚠️';
      case 'checking': return '🔄';
      default: return '❓';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-800">Backend Status</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-800">
              {getStatusIcon()} {getStatusText()}
            </div>
            <div className="text-xs text-gray-500">
              Last checked: {lastCheck.toLocaleTimeString()}
            </div>
            {errorCount > 0 && (
              <div className="text-xs text-red-600">
                Errors: {errorCount}
              </div>
            )}
          </div>
        </div>
        
        {backendStatus === 'offline' && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
            <strong>Offline Mode:</strong> Using local data. Some features may be limited.
          </div>
        )}
        
        {backendStatus === 'error' && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
            <strong>Backend Error:</strong> Server is responding but with errors. Check server logs.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BackendStatusIndicator;
