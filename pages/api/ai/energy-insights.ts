import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

export default async function energyInsights(
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

    const { energyLogs } = req.body;

    if (!energyLogs || !Array.isArray(energyLogs)) {
      return res.status(400).json({ error: 'Energy logs required' });
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
            content: `You are an energy pattern analyst. Analyze energy logs and provide insights.

Return JSON:
{
  "patterns": ["Pattern 1 description", "Pattern 2 description"],
  "recommendations": ["Actionable recommendation 1", "Recommendation 2"],
  "peakHours": [9, 14, 16],
  "lowHours": [13, 19, 22],
  "insights": "Overall detailed analysis",
  "score": 85
}

Focus on:
- Identifying consistent patterns
- Actionable recommendations
- Optimal scheduling advice
- Health/lifestyle suggestions`
          },
          {
            role: 'user',
            content: `Analyze these energy logs:\n${JSON.stringify(energyLogs.slice(-30))}`
          }
        ],
        temperature: 0.7,
        max_tokens: 600
      })
    });

    if (!openaiResponse.ok) {
      throw new Error('OpenAI API failed');
    }

    const openaiData = await openaiResponse.json();
    const insights = JSON.parse(openaiData.choices[0].message.content);

    res.status(200).json({
      success: true,
      insights
    });

  } catch (error) {
    console.error('Energy insights error:', error);
    res.status(500).json({ 
      error: 'Failed to generate insights',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
