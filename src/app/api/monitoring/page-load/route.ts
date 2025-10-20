// app/api/monitoring/page-load/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { loadTime, domContentLoaded, timestamp, url } = body;
    
    console.log(`[PAGE LOAD] Load: ${loadTime}ms, DOM: ${domContentLoaded}ms at ${timestamp}`);
    console.log(`URL: ${url}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing page load data:', error);
    return NextResponse.json({ error: 'Failed to process data' }, { status: 500 });
  }
}
