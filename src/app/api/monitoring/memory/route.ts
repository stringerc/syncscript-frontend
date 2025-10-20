// app/api/monitoring/memory/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit, timestamp, url } = body;
    
    console.log(`[MEMORY] Used: ${usedJSHeapSize}, Total: ${totalJSHeapSize}, Limit: ${jsHeapSizeLimit} at ${timestamp}`);
    console.log(`URL: ${url}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing memory data:', error);
    return NextResponse.json({ error: 'Failed to process data' }, { status: 500 });
  }
}

