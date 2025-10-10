import { NextApiRequest, NextApiResponse } from 'next';

export default async function testOAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // This endpoint helps debug the OAuth URL
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = 'https://www.syncscript.app/api/auth/google/callback';
  const scope = 'https://www.googleapis.com/auth/calendar.readonly';
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + new URLSearchParams({
    client_id: googleClientId!,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scope,
    access_type: 'offline',
    prompt: 'consent',
    state: 'calendar_connect'
  }).toString();

  res.status(200).json({
    authUrl,
    clientId: googleClientId,
    redirectUri,
    scope,
    message: 'Copy the authUrl and paste it in your browser to test OAuth flow'
  });
}
