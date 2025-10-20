// Console Log Monitoring System
// Add this to your dashboard component

'use client';

import { useEffect } from 'react';

export function ConsoleMonitor() {
  useEffect(() => {
    // Capture console errors
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      // Send to monitoring service
      if (typeof window !== 'undefined') {
        fetch('/api/monitoring/console-error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'error',
            message: args.join(' '),
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
          })
        }).catch(() => {}); // Silent fail
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      // Send to monitoring service
      if (typeof window !== 'undefined') {
        fetch('/api/monitoring/console-warn', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'warn',
            message: args.join(' '),
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
          })
        }).catch(() => {}); // Silent fail
      }
      originalWarn.apply(console, args);
    };

    // Capture unhandled errors
    window.addEventListener('error', (event) => {
      fetch('/api/monitoring/unhandled-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'unhandled-error',
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          timestamp: new Date().toISOString(),
          url: window.location.href
        })
      }).catch(() => {});
    });

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      fetch('/api/monitoring/unhandled-rejection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'unhandled-rejection',
          reason: event.reason?.toString() || 'Unknown',
          timestamp: new Date().toISOString(),
          url: window.location.href
        })
      }).catch(() => {});
    });

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
