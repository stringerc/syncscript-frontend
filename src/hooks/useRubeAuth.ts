'use client';

import { useState, useEffect } from 'react';
import { rubeAuth, RubeUser } from '../services/rubeAuth';

export interface UseRubeAuthReturn {
  user: RubeUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithGitHub: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export function useRubeAuth(): UseRubeAuthReturn {
  const [user, setUser] = useState<RubeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Auth timeout')), 2000)
      );
      
      const userDataPromise = rubeAuth.getUser();
      const userData = await Promise.race([userDataPromise, timeoutPromise]) as RubeUser | null;
      
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user');
      // Don't set user to null on error, just stop loading
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      await rubeAuth.loginWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed');
      throw err;
    }
  };

  const loginWithGitHub = async () => {
    try {
      setError(null);
      await rubeAuth.loginWithGitHub();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'GitHub login failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await rubeAuth.logout();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
      throw err;
    }
  };

  const refreshUser = async () => {
    await loadUser();
  };

  useEffect(() => {
    loadUser();
  }, []);

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    loginWithGoogle,
    loginWithGitHub,
    logout,
    refreshUser
  };
}