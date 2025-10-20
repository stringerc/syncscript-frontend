// pages/api/monitoring/page-load.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { loadTime, domContentLoaded, timestamp, url } = req.body;
  
  console.log(`[PAGE LOAD] Load: ${loadTime}ms, DOM: ${domContentLoaded}ms at ${timestamp}`);
  console.log(`URL: ${url}`);
  
  res.status(200).json({ success: true });
}
