// pages/api/monitoring/console-warn.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, message, timestamp, url, userAgent } = req.body;
  
  console.log(`[${type.toUpperCase()}] ${timestamp}: ${message}`);
  console.log(`URL: ${url}`);
  console.log(`User Agent: ${userAgent}`);
  
  res.status(200).json({ success: true });
}
