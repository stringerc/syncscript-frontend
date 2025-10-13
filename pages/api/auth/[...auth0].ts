import { handleAuth, handleLogin, handleLogout, handleCallback } from '@auth0/nextjs-auth0';

export default handleAuth({
  login: handleLogin({
    returnTo: '/dashboard',
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile email read:users write:users read:tasks write:tasks read:energy write:energy read:projects write:projects'
    }
  }),
  callback: handleCallback({
    redirectUri: process.env.AUTH0_BASE_URL + '/api/auth/callback',
    afterCallback: async (req, res, session) => {
      // Log successful authentication
      console.log('Auth0 callback successful:', session.user.email);
      return session;
    }
  }),
  logout: handleLogout({
    returnTo: '/'
  })
});