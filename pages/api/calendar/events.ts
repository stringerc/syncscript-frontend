import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

export default async function calendarEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Verify user is authenticated
    const session = await getSession(req, res);
    
    if (!session || !session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Get Google access token from cookie
    const googleAccessToken = req.cookies.google_access_token;

    if (!googleAccessToken) {
      return res.status(401).json({ 
        error: 'Not connected to Google Calendar',
        message: 'Please connect your Google Calendar first'
      });
    }

    // Fetch calendar events from Google Calendar API
    const timeMin = new Date().toISOString();
    const timeMax = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(); // Next 90 days

    const calendarResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=50`,
      {
        headers: {
          'Authorization': `Bearer ${googleAccessToken}`,
        },
      }
    );

    if (!calendarResponse.ok) {
      const error = await calendarResponse.json();
      console.error('Google Calendar API error:', error);
      
      // If token expired, clear cookie and return error
      if (calendarResponse.status === 401) {
        res.setHeader('Set-Cookie', 'google_access_token=; Path=/; Max-Age=0');
        return res.status(401).json({ 
          error: 'Calendar access expired',
          message: 'Please reconnect your Google Calendar'
        });
      }
      
      return res.status(500).json({ 
        error: 'Failed to fetch calendar events',
        message: error.error?.message || 'Unknown error'
      });
    }

    const calendarData = await calendarResponse.json();
    
    // Transform Google Calendar events to our format
    const events = calendarData.items?.map((item: { id: string; summary?: string; description?: string; start?: { dateTime?: string; date?: string }; end?: { dateTime?: string; date?: string }; location?: string; attendees?: unknown[] }) => ({
      id: item.id,
      summary: item.summary || 'Untitled Event',
      description: item.description || '',
      start: item.start?.dateTime || item.start?.date,
      end: item.end?.dateTime || item.end?.date,
      location: item.location,
      attendees: item.attendees?.length || 0,
    })) || [];

    res.status(200).json({
      success: true,
      data: {
        events,
        calendarName: calendarData.summary || 'Primary Calendar',
        total: events.length
      }
    });
    
  } catch (error) {
    console.error('Calendar events error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch calendar events',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
