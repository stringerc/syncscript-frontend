import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Show what URLs Auth0 will use
  const config = {
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    expectedCallbackUrl: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
    currentUrl: `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`,
  };

  res.status(200).json({
    message: 'Auth0 Configuration Test',
    config,
    instructions: 'The expectedCallbackUrl MUST exactly match what you put in Auth0 dashboard'
  });
}

