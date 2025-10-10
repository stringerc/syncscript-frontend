import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

export default async function googleCallback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Verify user is authenticated with Auth0
    const session = await getSession(req, res);
    
    if (!session || !session.user) {
      return res.redirect('/dashboard?error=not_authenticated');
    }

    const { code } = req.query;

    if (!code) {
      return res.redirect('/dashboard?error=no_code');
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code as string,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'https://www.syncscript.app/api/auth/google/callback',
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      console.error('Failed to exchange code for token:', await tokenResponse.text());
      return res.redirect('/dashboard?error=token_exchange_failed');
    }

    const tokens = await tokenResponse.json();
    
    // Store the access token and refresh token in session or database
    // For now, we'll store it temporarily in a cookie
    res.setHeader('Set-Cookie', [
      `google_access_token=${tokens.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
      tokens.refresh_token ? `google_refresh_token=${tokens.refresh_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000` : ''
    ].filter(Boolean));

    // Redirect back to dashboard with success
    res.redirect('/dashboard?calendar=connected');
    
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    res.redirect('/dashboard?error=callback_failed');
  }
}
