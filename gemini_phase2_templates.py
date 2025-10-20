#!/usr/bin/env python3
"""
🧠 GEMINI PHASE 2: Authentication System Template Generator
Mission: Generate clean templates for 8 authentication-related files
"""

import os

def generate_auth0_handler_ts():
    """Generate clean pages/api/auth/[...auth0].ts"""
    return '''import { handleAuth, handleLogin, handleLogout, handleCallback, handleProfile } from '@auth0/nextjs-auth0';

export default handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile email'
    },
    returnTo: '/dashboard'
  }),
  logout: handleLogout({
    returnTo: '/'
  }),
  callback: handleCallback(),
  profile: handleProfile()
});
'''

def generate_debug_callback_ts():
    """Generate clean pages/api/auth/debug-callback.ts"""
    return '''import { NextApiRequest, NextApiResponse } from 'next';
import { handleAuth } from '@auth0/nextjs-auth0';

export default async function debugCallback(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('[Auth0] Debug callback initiated');
    
    // Log request details for debugging
    console.log('[Auth0] Request method:', req.method);
    console.log('[Auth0] Request URL:', req.url);
    console.log('[Auth0] Request headers:', req.headers);
    
    // Handle the callback
    const authHandler = handleAuth();
    return authHandler(req, res);
  } catch (error) {
    console.error('[Auth0] Debug callback error:', error);
    return res.status(500).json({ 
      error: 'Authentication callback failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
'''

def generate_google_callback_ts():
    """Generate clean pages/api/auth/google/callback.ts"""
    return '''import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

export default async function googleCallback(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[Google OAuth] Callback initiated');
    
    const { code, state, error } = req.query;
    
    if (error) {
      console.error('[Google OAuth] Error:', error);
      return res.redirect(`/?error=${encodeURIComponent(error as string)}`);
    }
    
    if (!code) {
      console.error('[Google OAuth] No authorization code received');
      return res.redirect('/?error=no_code');
    }
    
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code as string,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),
    });
    
    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for tokens');
    }
    
    const tokens = await tokenResponse.json();
    console.log('[Google OAuth] Tokens received successfully');
    
    // Redirect to dashboard with success
    return res.redirect('/dashboard?auth=success');
    
  } catch (error) {
    console.error('[Google OAuth] Callback error:', error);
    return res.redirect(`/?error=${encodeURIComponent('authentication_failed')}`);
  }
}
'''

def generate_test_oauth_ts():
    """Generate clean pages/api/auth/google/test-oauth.ts"""
    return '''import { NextApiRequest, NextApiResponse } from 'next';

export default async function testOAuth(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[Google OAuth Test] Test initiated');
    
    // Check environment variables
    const requiredEnvVars = [
      'GOOGLE_CLIENT_ID',
      'GOOGLE_CLIENT_SECRET',
      'GOOGLE_REDIRECT_URI'
    ];
    
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      return res.status(400).json({
        error: 'Missing environment variables',
        missing: missingVars
      });
    }
    
    // Test OAuth URL generation
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID!);
    authUrl.searchParams.set('redirect_uri', process.env.GOOGLE_REDIRECT_URI!);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'openid profile email');
    authUrl.searchParams.set('access_type', 'offline');
    
    const state = Math.random().toString(36).substring(7);
    authUrl.searchParams.set('state', state);
    
    return res.status(200).json({
      success: true,
      message: 'OAuth configuration is valid',
      authUrl: authUrl.toString(),
      state: state
    });
    
  } catch (error) {
    console.error('[Google OAuth Test] Error:', error);
    return res.status(500).json({
      error: 'OAuth test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
'''

def generate_test_config_ts():
    """Generate clean pages/api/auth/test-config.ts"""
    return '''import { NextApiRequest, NextApiResponse } from 'next';

export default async function testConfig(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[Auth Config Test] Configuration test initiated');
    
    // Test Auth0 configuration
    const auth0Config = {
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET ? '***SET***' : 'NOT_SET',
      audience: process.env.AUTH0_AUDIENCE,
      baseUrl: process.env.AUTH0_BASE_URL,
      secret: process.env.AUTH0_SECRET ? '***SET***' : 'NOT_SET'
    };
    
    // Test Google OAuth configuration
    const googleConfig = {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ? '***SET***' : 'NOT_SET',
      redirectUri: process.env.GOOGLE_REDIRECT_URI
    };
    
    // Check for missing required variables
    const requiredAuth0Vars = [
      'AUTH0_DOMAIN',
      'AUTH0_CLIENT_ID',
      'AUTH0_CLIENT_SECRET',
      'AUTH0_BASE_URL',
      'AUTH0_SECRET'
    ];
    
    const missingAuth0Vars = requiredAuth0Vars.filter(varName => !process.env[varName]);
    
    const requiredGoogleVars = [
      'GOOGLE_CLIENT_ID',
      'GOOGLE_CLIENT_SECRET',
      'GOOGLE_REDIRECT_URI'
    ];
    
    const missingGoogleVars = requiredGoogleVars.filter(varName => !process.env[varName]);
    
    const isConfigValid = missingAuth0Vars.length === 0 && missingGoogleVars.length === 0;
    
    return res.status(200).json({
      success: isConfigValid,
      message: isConfigValid ? 'All configurations are valid' : 'Some configurations are missing',
      config: {
        auth0: auth0Config,
        google: googleConfig
      },
      issues: {
        missingAuth0Vars,
        missingGoogleVars
      }
    });
    
  } catch (error) {
    console.error('[Auth Config Test] Error:', error);
    return res.status(500).json({
      error: 'Configuration test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
'''

def generate_test_login_ts():
    """Generate clean pages/api/auth/test-login.ts"""
    return '''import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

export default async function testLogin(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[Auth Test] Login test initiated');
    
    // Test session retrieval
    const session = await getSession(req, res);
    
    if (!session) {
      return res.status(200).json({
        authenticated: false,
        message: 'No active session found',
        instructions: 'Please log in to test authentication'
      });
    }
    
    // Test user data
    const user = session.user;
    
    if (!user) {
      return res.status(200).json({
        authenticated: false,
        message: 'Session exists but no user data found',
        session: session
      });
    }
    
    // Return successful authentication data
    return res.status(200).json({
      authenticated: true,
      message: 'Authentication test successful',
      user: {
        id: user.sub,
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
        email_verified: user.email_verified,
        updated_at: user.updated_at
      },
      session: {
        createdAt: session.createdAt,
        expiresAt: session.expiresAt
      }
    });
    
  } catch (error) {
    console.error('[Auth Test] Error:', error);
    return res.status(500).json({
      error: 'Authentication test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
'''

def generate_token_ts():
    """Generate clean pages/api/auth/token.ts"""
    return '''import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

export default async function token(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[Auth Token] Token request initiated');
    
    const session = await getSession(req, res);
    
    if (!session || !session.user) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'No valid session found'
      });
    }
    
    // Generate a simple token for API access
    const tokenData = {
      userId: session.user.sub,
      email: session.user.email,
      name: session.user.name,
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };
    
    // In a real application, you would sign this token with a secret
    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');
    
    return res.status(200).json({
      success: true,
      token: token,
      expiresIn: 86400, // 24 hours in seconds
      user: {
        id: session.user.sub,
        email: session.user.email,
        name: session.user.name
      }
    });
    
  } catch (error) {
    console.error('[Auth Token] Error:', error);
    return res.status(500).json({
      error: 'Token generation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
'''

def generate_briefings_settings_ts():
    """Generate clean pages/api/briefings/settings.ts"""
    return '''import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

interface BriefingSettings {
  userId: string;
  morningBriefing: {
    enabled: boolean;
    time: string;
    includeWeather: boolean;
    includeTasks: boolean;
    includeCalendar: boolean;
  };
  eveningBriefing: {
    enabled: boolean;
    time: string;
    includeSummary: boolean;
    includeTomorrow: boolean;
    includeReflection: boolean;
  };
  preferences: {
    timezone: string;
    language: string;
    format: 'detailed' | 'summary' | 'minimal';
  };
}

export default async function briefingSettings(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return handleGetSettings(req, res);
  } else if (req.method === 'POST') {
    return handleUpdateSettings(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGetSettings(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession(req, res);
    
    if (!session || !session.user) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Please log in to access briefing settings'
      });
    }
    
    const userId = session.user.sub;
    
    // In a real application, you would fetch this from a database
    const defaultSettings: BriefingSettings = {
      userId: userId,
      morningBriefing: {
        enabled: true,
        time: '08:00',
        includeWeather: true,
        includeTasks: true,
        includeCalendar: true
      },
      eveningBriefing: {
        enabled: true,
        time: '18:00',
        includeSummary: true,
        includeTomorrow: true,
        includeReflection: true
      },
      preferences: {
        timezone: 'UTC',
        language: 'en',
        format: 'detailed'
      }
    };
    
    return res.status(200).json({
      success: true,
      settings: defaultSettings
    });
    
  } catch (error) {
    console.error('[Briefing Settings] Get error:', error);
    return res.status(500).json({
      error: 'Failed to retrieve briefing settings',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function handleUpdateSettings(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession(req, res);
    
    if (!session || !session.user) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Please log in to update briefing settings'
      });
    }
    
    const userId = session.user.sub;
    const { settings } = req.body;
    
    if (!settings) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Settings data is required'
      });
    }
    
    // Validate settings structure
    const requiredFields = ['morningBriefing', 'eveningBriefing', 'preferences'];
    const missingFields = requiredFields.filter(field => !settings[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Invalid settings format',
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    
    // In a real application, you would save this to a database
    const updatedSettings: BriefingSettings = {
      userId: userId,
      ...settings
    };
    
    console.log('[Briefing Settings] Settings updated for user:', userId);
    
    return res.status(200).json({
      success: true,
      message: 'Briefing settings updated successfully',
      settings: updatedSettings
    });
    
  } catch (error) {
    console.error('[Briefing Settings] Update error:', error);
    return res.status(500).json({
      error: 'Failed to update briefing settings',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
'''

def main():
    """Generate all Phase 2 templates"""
    print("🧠 GENERATING PHASE 2 TEMPLATES...")
    
    templates = {
        'pages/api/auth/[...auth0].ts': generate_auth0_handler_ts(),
        'pages/api/auth/debug-callback.ts': generate_debug_callback_ts(),
        'pages/api/auth/google/callback.ts': generate_google_callback_ts(),
        'pages/api/auth/google/test-oauth.ts': generate_test_oauth_ts(),
        'pages/api/auth/test-config.ts': generate_test_config_ts(),
        'pages/api/auth/test-login.ts': generate_test_login_ts(),
        'pages/api/auth/token.ts': generate_token_ts(),
        'pages/api/briefings/settings.ts': generate_briefings_settings_ts()
    }
    
    for file_path, content in templates.items():
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Generated: {file_path}")
    
    print("🎉 PHASE 2 TEMPLATES GENERATED!")
    print("📁 Files created: 8")
    print("⚡ Ready for Aider to process!")

if __name__ == "__main__":
    main()
