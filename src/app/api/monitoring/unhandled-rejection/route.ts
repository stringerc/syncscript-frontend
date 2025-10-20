// app/api/monitoring/unhandled-rejection/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, reason, timestamp, url } = body;
    
    console.log(`[${type.toUpperCase()}] ${timestamp}: ${reason}`);
    console.log(`URL: ${url}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing unhandled rejection data:', error);
    return NextResponse.json({ error: 'Failed to process data' }, { status: 500 });
  }
}

