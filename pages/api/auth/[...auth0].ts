import { handleAuth, handleLogin, handleLogout, handleCallback } from '@auth0/nextjs-auth0';

/**
 * Get the dashboard URL based on environment
 * In production: redirects to dashboard.syncscript.app
 * In development: redirects to /dashboard
 */
function getDashboardUrl(req?: any): string {
  const baseUrl = process.env.AUTH0_BASE_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  
  const hostname = req?.headers?.host || process.env.VERCEL_URL || '';
  
  // In production (syncscript.app domains), redirect to dashboard subdomain
  if (hostname.includes('syncscript.app') && !hostname.includes('dashboard.')) {
    const protocol = hostname.includes('localhost') ? 'http' : 'https';
    // Extract root domain (remove www. if present)
    const rootDomain = hostname.replace(/^www\./, '').replace(/^dashboard\./, '');
    return `${protocol}://dashboard.${rootDomain}`;
  }
  
  // Development or already on dashboard domain - use relative path
  return '/dashboard';
}

export default handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE || process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      scope: 'openid profile email',
    },
    returnTo: (req) => {
      // Get return URL from query param or use default
      const returnTo = req.query.returnTo as string | undefined;
      if (returnTo) {
        return returnTo;
      }
      // Use environment-aware dashboard URL
      return getDashboardUrl(req);
    },
  }),
  logout: handleLogout({
    returnTo: (req) => {
      // On logout, redirect to main domain (syncscript.app)
      const baseUrl = process.env.AUTH0_BASE_URL || 
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
      
      if (baseUrl.includes('dashboard.')) {
        // If on dashboard subdomain, redirect to main domain
        return baseUrl.replace('dashboard.', '');
      }
      return '/';
    },
  }),
  callback: handleCallback({
    afterCallback: async (req, res, session) => {
      // Store token in session for API calls
      // In production, also set a cookie for cross-domain access
      if (process.env.VERCEL_ENV === 'production' || req.headers.host?.includes('syncscript.app')) {
        // Set cross-domain cookie with auth token
        const cookieValue = JSON.stringify({
          user: {
            id: session.user.sub,
            name: session.user.name,
            email: session.user.email,
            picture: session.user.picture,
          },
          token: session.accessToken,
        });
        
        res.setHeader(
          'Set-Cookie',
          `syncscript_auth=${encodeURIComponent(cookieValue)}; Domain=.syncscript.app; Path=/; SameSite=Lax; Secure; HttpOnly=false; Max-Age=${7 * 24 * 60 * 60}` // 7 days
        );
      }
      
      return session;
    },
  }),
});

