/**
 * Auth0 Configuration
 * 
 * Centralized Auth0 configuration for the application
 */

import { initAuth0 } from '@auth0/nextjs-auth0';

if (!process.env.AUTH0_SECRET) {
  throw new Error('AUTH0_SECRET is not set');
}

if (!process.env.AUTH0_BASE_URL) {
  throw new Error('AUTH0_BASE_URL is not set');
}

if (!process.env.AUTH0_ISSUER_BASE_URL) {
  throw new Error('AUTH0_ISSUER_BASE_URL is not set');
}

if (!process.env.AUTH0_CLIENT_ID) {
  throw new Error('AUTH0_CLIENT_ID is not set');
}

if (!process.env.AUTH0_CLIENT_SECRET) {
  throw new Error('AUTH0_CLIENT_SECRET is not set');
}

export const auth0 = initAuth0({
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  authorizationParams: {
    audience: process.env.AUTH0_AUDIENCE,
    scope: 'openid profile email read:users write:users read:tasks write:tasks read:energy write:energy read:projects write:projects',
  },
  routes: {
    callback: '/api/auth/callback',
    postLogoutRedirect: '/',
  },
  session: {
    rollingDuration: 60 * 60 * 24, // 24 hours
    absoluteDuration: 60 * 60 * 24 * 7, // 7 days
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  },
});

export default auth0;

