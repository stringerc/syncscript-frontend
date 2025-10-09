import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function token(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Request access token with API audience
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['read:users', 'write:users', 'read:tasks', 'write:tasks', 'read:energy', 'write:energy', 'read:projects', 'write:projects']
    });

    if (!accessToken) {
      return res.status(401).json({ 
        error: 'No access token available',
        message: 'Failed to retrieve access token from Auth0'
      });
    }

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Token endpoint error:', error);
    res.status(500).json({ 
      error: 'Failed to get access token',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

