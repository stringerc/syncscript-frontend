import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Log all environment variables (safely)
    const env = {
      hasSecret: !!process.env.AUTH0_SECRET,
      hasBaseUrl: !!process.env.AUTH0_BASE_URL,
      baseUrl: process.env.AUTH0_BASE_URL,
      hasIssuerUrl: !!process.env.AUTH0_ISSUER_BASE_URL,
      issuerUrl: process.env.AUTH0_ISSUER_BASE_URL,
      hasClientId: !!process.env.AUTH0_CLIENT_ID,
      clientId: process.env.AUTH0_CLIENT_ID,
      hasClientSecret: !!process.env.AUTH0_CLIENT_SECRET,
      clientSecretPrefix: process.env.AUTH0_CLIENT_SECRET?.substring(0, 10) + '...',
      hasAudience: !!process.env.AUTH0_AUDIENCE,
      audience: process.env.AUTH0_AUDIENCE,
    };

    // Log request details
    const requestInfo = {
      method: req.method,
      url: req.url,
      query: req.query,
      hasCode: !!req.query.code,
      hasState: !!req.query.state,
    };

    res.status(200).json({
      message: 'Debug callback info',
      env,
      requestInfo,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
}

