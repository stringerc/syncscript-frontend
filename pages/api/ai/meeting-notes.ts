import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

export default async function meetingNotes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getSession(req, res);
    if (!session || !session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: 'Meeting transcript required' });
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a meeting notes assistant. Extract action items and key decisions from meeting transcripts.

Return JSON:
{
  "summary": "Brief meeting summary",
  "keyDecisions": ["Decision 1", "Decision 2"],
  "actionItems": [
    {
      "task": "Task description",
      "assignee": "Person name or 'Unassigned'",
      "dueDate": "YYYY-MM-DD or null",
      "priority": 1-5,
      "energy": 1-5
    }
  ],
  "nextSteps": ["Next step 1", "Next step 2"],
  "attendees": ["Name 1", "Name 2"]
}

Focus on clear, actionable items.`
          },
          {
            role: 'user',
            content: `Extract action items from this meeting:\n\n${transcript}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!openaiResponse.ok) {
      throw new Error('OpenAI API failed');
    }

    const openaiData = await openaiResponse.json();
    const notes = JSON.parse(openaiData.choices[0].message.content);

    res.status(200).json({
      success: true,
      notes
    });

  } catch (error) {
    console.error('Meeting notes error:', error);
    res.status(500).json({ 
      error: 'Failed to process meeting notes',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
