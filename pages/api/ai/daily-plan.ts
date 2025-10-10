import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

export default async function dailyPlan(
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

    const { tasks, energyPredictions } = req.body;

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
            content: `You are a daily planning assistant. Create an optimized daily plan based on tasks and energy predictions.

Return JSON:
{
  "morning": {
    "message": "Motivational morning message",
    "tasks": ["taskId1", "taskId2"],
    "focusBlock": "9-11am",
    "energyLevel": "high"
  },
  "afternoon": {
    "message": "Afternoon guidance",
    "tasks": ["taskId3"],
    "focusBlock": "2-4pm",
    "energyLevel": "medium"
  },
  "evening": {
    "message": "Evening wrap-up",
    "tasks": ["taskId4"],
    "focusBlock": null,
    "energyLevel": "low"
  },
  "tips": ["tip1", "tip2", "tip3"]
}

Prioritize high-energy tasks for high-energy periods.`
          },
          {
            role: 'user',
            content: `Create daily plan:\nTasks: ${JSON.stringify(tasks.slice(0, 10))}\nEnergy: ${JSON.stringify(energyPredictions)}`
          }
        ],
        temperature: 0.8,
        max_tokens: 800
      })
    });

    if (!openaiResponse.ok) {
      throw new Error('OpenAI API failed');
    }

    const openaiData = await openaiResponse.json();
    const plan = JSON.parse(openaiData.choices[0].message.content);

    res.status(200).json({
      success: true,
      plan
    });

  } catch (error) {
    console.error('Daily plan error:', error);
    res.status(500).json({ 
      error: 'Failed to generate daily plan',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
