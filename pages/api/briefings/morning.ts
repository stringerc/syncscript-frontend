import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { date } = req.query;
    const targetDate = date as string || new Date().toISOString().split('T')[0];

    // Mock morning brief data
    const morningBrief = {
      id: `morning-${Date.now()}`,
      date: targetDate,
      greeting: 'Good morning! Ready to tackle the day?',
      weather: { 
        condition: 'sunny', 
        temperature: 22, 
        location: 'Your City' 
      },
      tasks: {
        pending: 3,
        overdue: 1,
        highPriority: 2,
        today: [
          { id: '1', title: 'Review project proposal', priority: 'high', energy: 'medium' },
          { id: '2', title: 'Team standup meeting', priority: 'medium', energy: 'low' },
          { id: '3', title: 'Update documentation', priority: 'low', energy: 'high' }
        ]
      },
      insights: {
        productivity: { score: 85, trend: 'up' },
        energy: { level: 7, optimal: 'morning' },
        focus: { duration: 45, breaks: 2 }
      },
      recommendations: [
        'Start with high-energy tasks in the morning',
        'Schedule your most important meeting before lunch',
        'Take breaks every 45 minutes for optimal focus'
      ],
      quotes: [
        { text: 'The way to get started is to quit talking and begin doing.', author: 'Walt Disney' }
      ]
    };

    res.status(200).json({
      success: true,
      data: morningBrief
    });

  } catch (error) {
    console.error('Morning brief generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate morning brief'
    });
  }
}
