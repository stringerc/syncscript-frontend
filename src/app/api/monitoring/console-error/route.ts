// app/api/monitoring/console-error/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, message, timestamp, url, userAgent } = body;
    
    console.log(`[${type.toUpperCase()}] ${timestamp}: ${message}`);
    console.log(`URL: ${url}`);
    console.log(`User Agent: ${userAgent}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing console error data:', error);
    return NextResponse.json({ error: 'Failed to process data' }, { status: 500 });
  }
}

