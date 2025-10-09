import { useCallback } from 'react';

export const useAuthenticatedFetch = () => {
  const authenticatedFetch = useCallback(async (
    url: string, 
    options: RequestInit = {}
  ) => {
    try {
      // Get the access token from Auth0 using the token endpoint
      const tokenResponse = await fetch('/api/auth/token');
      
      if (!tokenResponse.ok) {
        throw new Error('Failed to get access token');
      }

      const tokenData = await tokenResponse.json();
      const { accessToken } = tokenData;
      
      if (!accessToken) {
        throw new Error('No access token received');
      }

      // Make authenticated request
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        ...options.headers,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error('Authenticated fetch error:', error);
      throw error;
    }
  }, []);

  return authenticatedFetch;
};
