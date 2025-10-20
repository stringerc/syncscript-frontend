'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { XCircle, ArrowLeft } from 'lucide-react';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'unknown_error';

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'access_denied':
        return 'Access was denied. Please try again.';
      case 'configuration_error':
        return 'There was a configuration error. Please contact support.';
      case 'auth_processing_failed':
        return 'Authentication processing failed. Please try again.';
      default:
        return 'An unexpected error occurred during authentication.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
          <p className="text-gray-600 mb-6">
            {getErrorMessage(error)}
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Login
          </Link>

          <div className="text-sm text-gray-500">
            If you continue to experience issues, please contact support.
          </div>
        </div>
      </div>
    </div>
  );
}
