import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const config = {
    hasSecret: !!process.env.AUTH0_SECRET,
    hasBaseUrl: !!process.env.AUTH0_BASE_URL,
    hasIssuerUrl: !!process.env.AUTH0_ISSUER_BASE_URL,
    hasClientId: !!process.env.AUTH0_CLIENT_ID,
    hasClientSecret: !!process.env.AUTH0_CLIENT_SECRET,
    hasAudience: !!process.env.AUTH0_AUDIENCE,
    baseUrl: process.env.AUTH0_BASE_URL,
    nodeEnv: process.env.NODE_ENV,
  };
  
  res.status(200).json(config);
}
