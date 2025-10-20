import { NextApiRequest, NextApiResponse } from 'next';

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: string;
  end: string;
  location?: string;
}

interface GoogleCalendarResponse {
  items: Array<{
    id: string;
    summary: string;
    description?: string;
    start: {
      dateTime?: string;
      date?: string;
    };
    end: {
      dateTime?: string;
      date?: string;
    };
    location?: string;
  }>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { startDate, endDate, maxResults = 10 } = req.query;
    
    // For now, return mock data
    // In production, this would fetch from Google Calendar API
    
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        summary: 'Team Meeting',
        description: 'Weekly team sync',
        start: '2024-01-15T10:00:00Z',
        end: '2024-01-15T11:00:00Z',
        location: 'Conference Room A'
      },
      {
        id: '2',
        summary: 'Project Review',
        description: 'Review project progress',
        start: '2024-01-16T14:00:00Z',
        end: '2024-01-16T15:30:00Z'
      }
    ];
    
    return res.status(200).json({
      success: true,
      events: mockEvents,
      total: mockEvents.length
    });
    
  } catch (error) {
    console.error('Calendar events error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
