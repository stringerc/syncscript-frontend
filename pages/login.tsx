'use client';

import React, { useState } from 'react';
import Navigation from '../src/components/Navigation';
import Link from 'next/link';
import { useRubeAuth } from '../src/hooks/useRubeAuth';
import { useAuth0 } from '../src/hooks/useAuth0';
import { useRube } from '../src/contexts/RubeContext';
import { 
  Mail, 
  Calendar, 
  HardDrive, 
  BarChart3, 
  MessageSquare, 
  Github, 
  CheckSquare, 
  Users,
  FileText,
  Gamepad2,
  Loader2,
  RefreshCw,
  Chrome
} from 'lucide-react';

const AppIcon = ({ app }: { app: any }) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'gmail': <Mail className="h-6 w-6" />,
    'googlecalendar': <Calendar className="h-6 w-6" />,
    'googledrive': <HardDrive className="h-6 w-6" />,
    'googlesheets': <BarChart3 className="h-6 w-6" />,
    'slack': <MessageSquare className="h-6 w-6" />,
    'github': <Github className="h-6 w-6" />,
    'todoist': <CheckSquare className="h-6 w-6" />,
    'outlook': <Mail className="h-5 w-5" />,
    'microsoft_teams': <Users className="h-6 w-6" />,
    'notion': <FileText className="h-6 w-6" />,
    'discord': <Gamepad2 className="h-6 w-6" />
  };

  return iconMap[app.toolkit] || <div className="h-6 w-6 bg-gray-300 rounded" />;
};

export default function LoginPage() {
  // Try Auth0 first, fallback to Rube auth
  const auth0 = useAuth0();
  const rubeAuth = useRubeAuth();
  const { apps, loading: appsLoading, error: appsError, refreshApps } = useRube();
  
  // Use Auth0 if available, otherwise fall back to Rube
  const user = auth0.user || rubeAuth.user;
  const authLoading = auth0.isLoading || rubeAuth.isLoading;
  const authError = auth0.error || rubeAuth.error;
  const isAuthenticated = auth0.isAuthenticated || rubeAuth.isAuthenticated;
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshApps();
    setIsRefreshing(false);
  };

  const handleSignIn = () => {
    // Use Auth0 if available (when configured), otherwise use Rube mock auth
    if (auth0.login) {
      setIsSigningIn(true);
      setSignInError(null);
      try {
        auth0.login();
      } catch (error) {
        setSignInError(error instanceof Error ? error.message : 'Login failed');
        setIsSigningIn(false);
      }
    } else {
      // Fallback to Rube mock auth
      handleGoogleSignIn();
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setSignInError(null);
    try {
      await rubeAuth.loginWithGoogle();
    } catch (error) {
      setSignInError(error instanceof Error ? error.message : 'Google login failed');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setIsSigningIn(true);
    setSignInError(null);
    try {
      await rubeAuth.loginWithGitHub();
    } catch (error) {
      setSignInError(error instanceof Error ? error.message : 'GitHub login failed');
    } finally {
      setIsSigningIn(false);
    }
  };

  const connectedApps = apps.filter(app => app.connected);
  const totalApps = apps.length;

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated && user) {
    // Use client-side redirect to support cross-domain redirect
    if (typeof window !== 'undefined') {
      const { getDashboardUrl } = require('../src/lib/auth/cross-domain-auth');
      const dashboardUrl = getDashboardUrl();
      window.location.href = dashboardUrl;
      return null;
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-green-600 mb-4">
            <CheckSquare className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600 mb-6">
            You're signed in as {user.name} ({user.email})
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (authLoading || appsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
          <p className="mt-4 text-gray-600">Loading your connected applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to SyncScript
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your productivity command center with integrated applications
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{connectedApps.length}</div>
              <div className="text-sm text-gray-500">Connected Apps</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalApps}</div>
              <div className="text-sm text-gray-500">Total Available</div>
            </div>
          </div>

          {/* Sign In Buttons */}
          <div className="mb-8 space-y-4">
            {/* Primary Auth0 login button - shows when Auth0 is configured */}
            {auth0.login && (
              <button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSigningIn ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Chrome className="h-5 w-5 mr-2" />
                    Sign in with Auth0
                  </>
                )}
              </button>
            )}

            {/* Fallback to mock auth buttons if Auth0 not configured */}
            {!auth0.login && (
              <>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn}
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSigningIn ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Chrome className="h-5 w-5 mr-2" />
                      Sign in with Google
                    </>
                  )}
                </button>

                <div className="text-sm text-gray-500">or</div>

                <button
                  onClick={handleGitHubSignIn}
                  disabled={isSigningIn}
                  className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Github className="h-5 w-5 mr-2" />
                  Sign in with GitHub
                </button>
              </>
            )}
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Apps'}
          </button>
        </div>

        {/* Error States */}
        {(authError || appsError || signInError) && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{authError || appsError || signInError}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Connected Apps Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Your Connected Applications
          </h2>
          
          {connectedApps.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MessageSquare className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No apps connected</h3>
              <p className="text-gray-500 mb-6">
                Connect your applications through Rube to get started with SyncScript.
              </p>
              <Link
                href="https://rube.app"
                target="_blank"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Connect Apps via Rube
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {connectedApps.map((app) => (
                <div
                  key={app.toolkit}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg bg-${app.color}-100 mr-3`}>
                      <AppIcon app={app} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-green-600 font-medium">Connected</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{app.description}</p>
                  
                  <div className="text-xs text-gray-500">
                    Available after sign in
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Powered by{' '}
            <a 
              href="https://rube.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Rube.app
            </a>
            {' '}integration platform
          </p>
        </div>
      </div>
    </div>
  );
}