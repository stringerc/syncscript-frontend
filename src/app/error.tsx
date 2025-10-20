"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home,
  Bug
} from 'lucide-react';

interface ErrorPageProps {
  error?: Error;
  reset?: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleReload = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-8"
        >
          <AlertTriangle className="h-12 w-12 text-red-600" />
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-8">
            We're sorry, but something unexpected happened. Don't worry, 
            our team has been notified and we're working to fix it.
          </p>
        </motion.div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left"
          >
            <div className="flex items-center mb-2">
              <Bug className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="font-semibold text-red-800">Error Details:</h3>
            </div>
            <pre className="text-sm text-red-700 whitespace-pre-wrap">
              {error.message}
            </pre>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-sm text-red-600 cursor-pointer">
                  Show Stack Trace
                </summary>
                <pre className="text-xs text-red-600 mt-2 whitespace-pre-wrap">
                  {error.stack}
                </pre>
              </details>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleReload}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </button>
            <button
              onClick={handleGoHome}
              className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </button>
          </div>

          {/* Additional Help */}
          <div className="text-sm text-gray-500">
            <p className="mb-2">
              If this problem persists, please contact our support team.
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Contact Support
            </button>
          </div>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">You might also find these helpful:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="/help" className="text-blue-600 hover:text-blue-700">
              Help Center
            </a>
            <a href="/contact" className="text-blue-600 hover:text-blue-700">
              Contact Us
            </a>
            <a href="/status" className="text-blue-600 hover:text-blue-700">
              System Status
            </a>
            <a href="/faq" className="text-blue-600 hover:text-blue-700">
              FAQ
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
