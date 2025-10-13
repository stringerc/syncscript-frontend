import { handleAuth } from '@auth0/nextjs-auth0';

// Use default handleAuth which reads from env variables
// The lib/auth0.ts file validates all required env vars
export default handleAuth();