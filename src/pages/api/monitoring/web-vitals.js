// pages/api/monitoring/web-vitals.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { metric, value, timestamp, url } = req.body;
  
  console.log(`[WEB VITALS] ${metric}: ${value}ms at ${timestamp}`);
  console.log(`URL: ${url}`);
  
  // TODO: Store in database or send to monitoring service
  // Example: await db.webVitals.create({ metric, value, timestamp, url });
  
  res.status(200).json({ success: true });
}

