import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

export default async function aiCoach(
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

    const { userStats, recentActivity, goals } = req.body;

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
            content: `You are an AI productivity coach. Provide personalized, actionable coaching based on user data.

Return JSON:
{
  "greeting": "Personalized greeting",
  "todaysFocus": "Main recommendation for today",
  "strengths": ["Strength 1", "Strength 2"],
  "improvements": ["Area to improve 1", "Area 2"],
  "actionableSteps": ["Step 1", "Step 2", "Step 3"],
  "motivationalQuote": "Relevant inspirational quote",
  "coachingScore": 85
}

Be encouraging, specific, and action-oriented.`
          },
          {
            role: 'user',
            content: `Coach me:\nStats: ${JSON.stringify(userStats)}\nActivity: ${JSON.stringify(recentActivity)}\nGoals: ${JSON.stringify(goals)}`
          }
        ],
        temperature: 0.8,
        max_tokens: 700
      })
    });

    if (!openaiResponse.ok) {
      throw new Error('OpenAI API failed');
    }

    const openaiData = await openaiResponse.json();
    const coaching = JSON.parse(openaiData.choices[0].message.content);

    res.status(200).json({
      success: true,
      coaching
    });

  } catch (error) {
    console.error('AI coach error:', error);
    res.status(500).json({ 
      error: 'Failed to get coaching',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
