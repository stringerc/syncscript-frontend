// pages/api/monitoring/unhandled-rejection.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, reason, timestamp, url } = req.body;
  
  console.log(`[${type.toUpperCase()}] ${timestamp}: ${reason}`);
  console.log(`URL: ${url}`);
  
  res.status(200).json({ success: true });
}