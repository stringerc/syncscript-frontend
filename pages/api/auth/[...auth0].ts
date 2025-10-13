import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

// Wrap handleAuth with error logging
export default handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      console.log('[Auth0] Callback received:', {
        hasCode: !!req.query.code,
        hasState: !!req.query.state,
        query: req.query,
      });
      
      // Call the default callback handler
      return await handleCallback(req, res);
    } catch (error: any) {
      console.error('[Auth0] Callback error:', {
        message: error.message,
        stack: error.stack,
        cause: error.cause,
      });
      
      // Return error details for debugging
      return res.status(500).json({
        error: 'Auth0 callback failed',
        message: error.message,
        details: error.cause?.message || 'No additional details',
      });
    }
  },
});