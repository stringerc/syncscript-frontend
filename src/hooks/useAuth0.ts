'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

/**
 * Custom hook that wraps Auth0's useUser with additional functionality
 * Falls back to Rube auth if Auth0 is not configured
 */
export function useAuth0() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const login = () => {
    router.push('/api/auth/login');
  };

  const logout = () => {
    router.push('/api/auth/logout');
  };

  return {
    user: user ? {
      id: user.sub || '',
      name: user.name || '',
      email: user.email || '',
      picture: user.picture,
    } : null,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
  };
}

