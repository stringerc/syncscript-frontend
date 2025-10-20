'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRubeAuth } from '../../../hooks/useRubeAuth';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser, user, isLoading } = useRubeAuth();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processAuthSuccess = async () => {
      try {
        // Check if we have authentication data from Rube in URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const rubeToken = urlParams.get('token');
        const rubeUser = urlParams.get('user');
        
        if (rubeToken && rubeUser) {
          // Store Rube authentication data
          localStorage.setItem('rube_token', rubeToken);
          localStorage.setItem('rube_user', rubeUser);
          localStorage.setItem('syncscript_user', rubeUser);
        }
        
        // Refresh user data after successful authentication
        await refreshUser();
        
        // Wait a moment for the user data to load
        setTimeout(() => {
          setIsProcessing(false);
          // Redirect to dashboard after successful authentication
          router.push('/dashboard');
        }, 2000);
      } catch (error) {
        console.error('Error processing authentication success:', error);
        setIsProcessing(false);
        // Redirect to login with error
        router.push('/login?error=auth_processing_failed');
      }
    };

    processAuthSuccess();
  }, [refreshUser, router]);

  if (isLoading || isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Authentication</h2>
          <p className="text-gray-600">Please wait while we complete your sign-in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Successful!</h2>
        <p className="text-gray-600 mb-6">
          Welcome to SyncScript{user ? `, ${user.name}` : ''}!
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to your dashboard...
        </p>
      </div>
    </div>
  );
}
