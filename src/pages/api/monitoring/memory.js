// pages/api/monitoring/memory.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit, timestamp, url } = req.body;
  
  console.log(`[MEMORY] Used: ${usedJSHeapSize}, Total: ${totalJSHeapSize}, Limit: ${jsHeapSizeLimit} at ${timestamp}`);
  console.log(`URL: ${url}`);
  
  res.status(200).json({ success: true });
}

