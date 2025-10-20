/**
 * Advanced Rube Authentication Hook
 * Provides comprehensive Rube integration with automatic error handling and state management
 */

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { rubeApi, RubeUser, RubeConnection, RubeApiResponse } from '../services/rubeApi';

export interface RubeAuthState {
  user: RubeUser | null;
  connections: RubeConnection[];
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  lastSync: Date | null;
}

export interface RubeAuthActions {
  login: (apiKey: string) => Promise<boolean>;
  logout: () => void;
  refreshConnections: () => Promise<void>;
  connectApp: (toolkit: string) => Promise<boolean>;
  disconnectApp: (toolkit: string) => Promise<boolean>;
  testConnection: (toolkit: string) => Promise<boolean>;
  executeAction: (toolkit: string, action: string, params: any) => Promise<any>;
  clearError: () => void;
}

export function useRubeAuthAdvanced(): RubeAuthState & RubeAuthActions {
  const router = useRouter();
  
  // State
  const [user, setUser] = useState<RubeUser | null>(null);
  const [connections, setConnections] = useState<RubeConnection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  // Computed
  const isAuthenticated = !!user && !!rubeApi.getApiKey();

  /**
   * Clear any existing errors
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Load user profile from Rube
   */
  const loadUserProfile = useCallback(async (): Promise<void> => {
    if (!rubeApi.getApiKey()) {
      setIsLoading(false);
      return;
    }

    try {
      const response: RubeApiResponse<RubeUser> = await rubeApi.getUserProfile();
      
      if (response.success && response.data) {
        setUser(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to load user profile');
        setUser(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user profile');
      setUser(null);
    }
  }, []);

  /**
   * Load user's connected applications
   */
  const loadConnections = useCallback(async (): Promise<void> => {
    if (!rubeApi.getApiKey()) {
      return;
    }

    try {
      const response: RubeApiResponse<RubeConnection[]> = await rubeApi.getConnectedApps();
      
      if (response.success && response.data) {
        setConnections(response.data);
        setError(null);
        setLastSync(new Date());
      } else {
        setError(response.error || 'Failed to load connections');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load connections');
    }
  }, []);

  /**
   * Refresh connections data
   */
  const refreshConnections = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    await loadConnections();
    setIsLoading(false);
  }, [loadConnections]);

  /**
   * Login with Rube API key
   */
  const login = useCallback(async (apiKey: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      rubeApi.setApiKey(apiKey);
      
      // Load user profile and connections
      await Promise.all([
        loadUserProfile(),
        loadConnections()
      ]);

      if (user) {
        // Store user data in localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('syncscript_user', JSON.stringify(user));
        }
        setIsLoading(false);
        return true;
      } else {
        setError('Authentication failed - invalid API key');
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      setIsLoading(false);
      return false;
    }
  }, [user, loadUserProfile, loadConnections]);

  /**
   * Logout and clear all data
   */
  const logout = useCallback(() => {
    setUser(null);
    setConnections([]);
    setError(null);
    setLastSync(null);
    
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('syncscript_user');
      localStorage.removeItem('rube_api_key');
    }
    
    // Clear API key
    rubeApi.setApiKey('');
    
    // Redirect to home
    router.push('/');
  }, [router]);

  /**
   * Connect a new app
   */
  const connectApp = useCallback(async (toolkit: string): Promise<boolean> => {
    if (!isAuthenticated) {
      setError('Not authenticated');
      return false;
    }

    try {
      const redirectUri = `${window.location.origin}/auth/success`;
      const response = await rubeApi.initiateOAuth(toolkit, redirectUri);
      
      if (response.success && response.data?.authUrl) {
        // Redirect to OAuth URL
        window.location.href = response.data.authUrl;
        return true;
      } else {
        setError(response.error || 'Failed to initiate OAuth');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect app');
      return false;
    }
  }, [isAuthenticated]);

  /**
   * Disconnect an app
   */
  const disconnectApp = useCallback(async (toolkit: string): Promise<boolean> => {
    if (!isAuthenticated) {
      setError('Not authenticated');
      return false;
    }

    try {
      const response = await rubeApi.disconnectApp(toolkit);
      
      if (response.success) {
        // Refresh connections
        await refreshConnections();
        return true;
      } else {
        setError(response.error || 'Failed to disconnect app');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect app');
      return false;
    }
  }, [isAuthenticated, refreshConnections]);

  /**
   * Test connection for an app
   */
  const testConnection = useCallback(async (toolkit: string): Promise<boolean> => {
    if (!isAuthenticated) {
      setError('Not authenticated');
      return false;
    }

    try {
      const response = await rubeApi.testConnection(toolkit);
      
      if (response.success) {
        return response.data?.connected || false;
      } else {
        setError(response.error || 'Failed to test connection');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to test connection');
      return false;
    }
  }, [isAuthenticated]);

  /**
   * Execute action on connected app
   */
  const executeAction = useCallback(async (toolkit: string, action: string, params: any): Promise<any> => {
    if (!isAuthenticated) {
      setError('Not authenticated');
      return null;
    }

    try {
      const response = await rubeApi.executeAction(toolkit, action, params);
      
      if (response.success) {
        return response.data;
      } else {
        setError(response.error || 'Failed to execute action');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute action');
      return null;
    }
  }, [isAuthenticated]);

  // Initialize on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      // Check for existing API key
      const existingApiKey = rubeApi.getApiKey();
      if (existingApiKey) {
        await loadUserProfile();
        await loadConnections();
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, [loadUserProfile, loadConnections]);

  return {
    // State
    user,
    connections,
    isLoading,
    error,
    isAuthenticated,
    lastSync,
    
    // Actions
    login,
    logout,
    refreshConnections,
    connectApp,
    disconnectApp,
    testConnection,
    executeAction,
    clearError
  };
}
