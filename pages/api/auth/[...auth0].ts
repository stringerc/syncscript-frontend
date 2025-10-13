import { handleAuth, handleLogin, handleCallback, handleLogout } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

// Configure Auth0 with proper redirects
export default handleAuth({
  async login(req: NextApiRequest, res: NextApiResponse) {
    try {
      console.log('[Auth0] Login initiated');
      return await handleLogin(req, res, {
        returnTo: '/dashboard',
        authorizationParams: {
          audience: process.env.AUTH0_AUDIENCE,
          scope: 'openid profile email',
        },
      });
    } catch (error: any) {
      console.error('[Auth0] Login error:', error);
      return res.status(500).json({ error: 'Login failed', message: error.message });
    }
  },
  
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      console.log('[Auth0] Callback received:', {
        hasCode: !!req.query.code,
        hasState: !!req.query.state,
      });
      
      // Handle the callback and create session
      await handleCallback(req, res);
      
      console.log('[Auth0] Callback successful - redirecting to dashboard');
    } catch (error: any) {
      console.error('[Auth0] Callback error:', {
        message: error.message,
        cause: error.cause,
      });
      
      return res.status(500).json({
        error: 'Auth0 callback failed',
        message: error.message,
        details: error.cause?.message || 'No additional details',
      });
    }
  },
  
  async logout(req: NextApiRequest, res: NextApiResponse) {
    try {
      return await handleLogout(req, res, {
        returnTo: '/',
      });
    } catch (error: any) {
      console.error('[Auth0] Logout error:', error);
      return res.status(500).json({ error: 'Logout failed', message: error.message });
    }
  },
});