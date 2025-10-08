'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

export function useAuthenticatedFetch() {
  const { getAccessTokenSilently } = useAuth0();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.syncscript.app';

  const authenticatedFetch = useCallback(
    async (endpoint: string, options: RequestInit = {}) => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
          },
        });

        const response = await fetch(`${apiUrl}${endpoint}`, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('API call failed:', error);
        throw error;
      }
    },
    [getAccessTokenSilently, apiUrl]
  );

  return { authenticatedFetch };
}
