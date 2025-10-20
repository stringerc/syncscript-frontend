import { NextApiRequest, NextApiResponse } from 'next';
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
