import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

export default async function meetingNotes(req: NextApiRequest, res: NextApiResponse) {
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
            content: 'You are an AI meeting assistant. Generate structured meeting notes from audio transcripts.'
          },
          {
            role: 'user',
            content: `Generate meeting notes from: Transcript: ${audioTranscript}, Context: ${context}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!openaiResponse.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await openaiResponse.json();
    const result = data.choices[0]?.message?.content || 'No response generated';

    res.status(200).json({ result });
  } catch (error) {
    console.error('Error in meetingNotes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
