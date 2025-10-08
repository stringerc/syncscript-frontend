import { useCallback } from 'react';

export const useAuthenticatedFetch = () => {
  const authenticatedFetch = useCallback(async (
    url: string, 
    options: RequestInit = {}
  ) => {
    try {
      // Get the access token from Auth0 using the token endpoint
      console.log('Fetching access token from /api/auth/token...');
      const tokenResponse = await fetch('/api/auth/token');
      
      console.log('Token response status:', tokenResponse.status);
      
      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error('Token endpoint error:', errorText);
        throw new Error('Failed to get access token');
      }

      const tokenData = await tokenResponse.json();
      console.log('Token data received:', tokenData);
      
      const { accessToken } = tokenData;
      
      if (!accessToken) {
        console.error('No access token in response');
        throw new Error('No access token received');
      }

      // Make authenticated request
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        ...options.headers,
      };

      console.log(`Making authenticated request to: ${process.env.NEXT_PUBLIC_API_URL}${url}`);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        headers,
      });

      console.log('Response status:', response.status);

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
