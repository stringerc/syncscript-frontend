import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getSession(req, res);
    
    if (!session || !session.accessToken) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    return res.status(200).json({
      accessToken: session.accessToken,
      user: session.user,
    });
  } catch (error) {
    console.error('Error getting auth token:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

