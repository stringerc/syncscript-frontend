import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function token(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['openid', 'profile', 'email']
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Token endpoint error:', error);
    res.status(500).json({ 
      error: 'Failed to get access token',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

