// pages/api/monitoring/console-error.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, message, timestamp, url, userAgent } = req.body;
  
  // Log to console for now (replace with proper logging service)
  console.log(`[${type.toUpperCase()}] ${timestamp}: ${message}`);
  console.log(`URL: ${url}`);
  console.log(`User Agent: ${userAgent}`);
  
  // TODO: Send to monitoring service (Sentry, LogRocket, etc.)
  
  res.status(200).json({ success: true });
}

