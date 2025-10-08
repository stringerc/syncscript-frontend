import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

export default handleAuth({
  login: handleLogin({
    returnTo: '/dashboard',
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile email read:users write:users read:tasks write:tasks read:energy write:energy read:projects write:projects'
    }
  }),
  logout: handleLogout({
    returnTo: '/'
  })
});