import { getAccessToken, withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function token(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Try to get access token from Auth0
    try {
      const { accessToken } = await getAccessToken(req, res);
      
      if (accessToken) {
        return res.status(200).json({ accessToken });
      }
    } catch (accessTokenError) {
      console.log('getAccessToken failed, trying alternate method:', accessTokenError);
    }

    // Fallback: Get session and extract access token from it
    const session = await getSession(req, res);
    
    if (!session) {
      return res.status(401).json({ 
        error: 'Not authenticated',
        message: 'No active session found'
      });
    }

    // Auth0 session should have accessToken in it
    const accessToken = (session as { accessToken?: string }).accessToken;
    
    if (accessToken) {
      return res.status(200).json({ accessToken });
    }

    // Last resort: Return error
    return res.status(500).json({ 
      error: 'Failed to get access token',
      message: 'Unable to retrieve access token from Auth0 session'
    });
    
  } catch (error) {
    console.error('Token endpoint error:', error);
    res.status(500).json({ 
      error: 'Failed to get access token',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

