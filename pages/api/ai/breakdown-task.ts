import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

export default async function breakdownTask(
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

    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Task title required' });
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
            content: `You are a task breakdown assistant. Break down complex tasks into clear, actionable subtasks.

Return JSON with this structure:
{
  "subtasks": ["Step 1", "Step 2", ...],
  "estimatedDuration": total_minutes,
  "suggestedOrder": [0, 1, 2, ...],
  "tips": "Helpful tips for completing this task"
}

Guidelines:
- Break into 3-7 subtasks (not too many)
- Each subtask should be clear and actionable
- Order by logical sequence
- Estimate realistic total duration in minutes`
          },
          {
            role: 'user',
            content: `Break down this task:\nTitle: ${title}\nDescription: ${description || 'None provided'}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!openaiResponse.ok) {
      throw new Error('OpenAI API failed');
    }

    const openaiData = await openaiResponse.json();
    const aiResponse = openaiData.choices[0].message.content;
    const breakdown = JSON.parse(aiResponse);

    res.status(200).json({
      success: true,
      breakdown
    });

  } catch (error) {
    console.error('AI breakdown error:', error);
    res.status(500).json({ 
      error: 'Failed to breakdown task',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
