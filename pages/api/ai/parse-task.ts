import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

export default async function parseTask(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify authentication
    const session = await getSession(req, res);
    if (!session || !session.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { input } = req.body;

    if (!input || typeof input !== 'string') {
      return res.status(400).json({ error: 'Input text required' });
    }

    // Call OpenAI API
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
            content: `You are a task parsing assistant for a productivity app. Parse natural language into structured task data.
            
Return JSON with this structure:
{
  "title": "Clear, actionable task title (max 100 chars)",
  "description": "Detailed description of what needs to be done",
  "priority": 1-5 (1=low, 5=urgent),
  "energy_requirement": 1-5 (1=low energy, 5=high energy),
  "estimated_duration": minutes (integer),
  "tags": ["tag1", "tag2"] (relevant categories),
  "due_date": "ISO datetime string if mentioned, otherwise null"
}

Energy requirement guide:
- 1-2: Simple tasks (email, quick calls)
- 3: Moderate tasks (meetings, writing)
- 4-5: Complex tasks (coding, creative work)

Priority guide:
- 1-2: Can wait
- 3: Normal
- 4-5: Important/urgent`
          },
          {
            role: 'user',
            content: input
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text();
      console.error('OpenAI API error:', error);
      throw new Error('OpenAI API failed');
    }

    const openaiData = await openaiResponse.json();
    const aiResponse = openaiData.choices[0].message.content;
    
    // Parse the JSON response
    const taskData = JSON.parse(aiResponse);

    res.status(200).json({
      success: true,
      task: taskData
    });

  } catch (error) {
    console.error('AI parse task error:', error);
    res.status(500).json({ 
      error: 'Failed to parse task',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
