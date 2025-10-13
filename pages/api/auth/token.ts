import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function token(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('[TOKEN] Endpoint called - attempting to get access token');
    
    // Try to get access token from Auth0
    try {
      const tokenResponse = await getAccessToken(req, res, {
        scopes: ['openid', 'profile', 'email'],
      });
      
      console.log('[TOKEN] getAccessToken response:', {
        hasToken: !!tokenResponse.accessToken,
        tokenLength: tokenResponse.accessToken?.length || 0,
      });
      
      if (tokenResponse.accessToken) {
        return res.status(200).json({ accessToken: tokenResponse.accessToken });
      }
    } catch (accessTokenError: any) {
      console.log('[TOKEN] getAccessToken failed:', accessTokenError.message);
    }

    // Fallback: Get session and extract access token from it
    const session = await getSession(req, res);
    
    console.log('[TOKEN] Session check:', {
      hasSession: !!session,
      sessionKeys: session ? Object.keys(session) : []
    });
    
    if (!session) {
      console.error('[TOKEN] No session found - user not authenticated');
      return res.status(401).json({ 
        error: 'Not authenticated',
        message: 'No active session found'
      });
    }

    // Auth0 session should have accessToken in it
    const accessToken = (session as any).accessToken;
    
    if (accessToken) {
      console.log('[TOKEN] Found access token in session');
      return res.status(200).json({ accessToken });
    }

    // Last resort: Return error with details
    console.error('[TOKEN] No access token found anywhere');
    return res.status(500).json({ 
      error: 'Failed to get access token',
      message: 'Unable to retrieve access token from Auth0 session. Make sure API is configured in Auth0 dashboard.',
      debug: {
        hasSession: !!session,
        sessionHasAccessToken: !!(session as any).accessToken,
        audience: process.env.AUTH0_AUDIENCE
      }
    });
    
  } catch (error) {
    console.error('[TOKEN] Endpoint error:', error);
    res.status(500).json({ 
      error: 'Failed to get access token',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

