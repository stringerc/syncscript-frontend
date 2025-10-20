// app/api/monitoring/web-vitals/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { metric, value, timestamp, url } = body;
    
    console.log(`[WEB VITALS] ${metric}: ${value}ms at ${timestamp}`);
    console.log(`URL: ${url}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing web vitals data:', error);
    return NextResponse.json({ error: 'Failed to process data' }, { status: 500 });
  }
}
