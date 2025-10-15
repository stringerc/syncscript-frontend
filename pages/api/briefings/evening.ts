import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { date } = req.query;
    const targetDate = date as string || new Date().toISOString().split('T')[0];

    // Mock evening brief data
    const eveningBrief = {
      id: `evening-${Date.now()}`,
      date: targetDate,
      greeting: 'Great work today! Let\'s wrap up with a reflection.',
      summary: {
        tasksCompleted: 8,
        tasksRemaining: 2,
        productivity: 87,
        energyUsed: 6.5,
        focusTime: 320
      },
      achievements: [
        { id: '1', title: 'Completed project milestone', type: 'major', points: 100 },
        { id: '2', title: 'Helped team member', type: 'collaboration', points: 50 }
      ],
      insights: {
        peakProductivity: '10:30 AM',
        energyDips: ['2:00 PM', '4:30 PM'],
        focusSessions: 7,
        interruptions: 3
      },
      tomorrow: {
        priorityTasks: [
          { id: '1', title: 'Follow up on client feedback', priority: 'high' },
          { id: '2', title: 'Prepare presentation slides', priority: 'medium' }
        ],
        meetings: [
          { time: '9:00 AM', title: 'Sprint planning', duration: 60 },
          { time: '2:00 PM', title: 'Client call', duration: 30 }
        ],
        recommendations: [
          'Schedule creative work in the morning',
          'Block time for deep focus sessions'
        ]
      },
      reflection: {
        whatWentWell: 'Completed the major project milestone ahead of schedule',
        challenges: 'Had some interruptions during focus time',
        learnings: 'Morning sessions are most productive for complex tasks',
        mood: 'satisfied',
        energy: 7,
        stress: 3
      }
    };

    res.status(200).json({
      success: true,
      data: eveningBrief
    });

  } catch (error) {
    console.error('Evening brief generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate evening brief'
    });
  }
}
