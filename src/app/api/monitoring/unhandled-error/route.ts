// app/api/monitoring/unhandled-error/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, message, filename, lineno, colno, timestamp, url } = body;
    
    console.log(`[${type.toUpperCase()}] ${timestamp}: ${message}`);
    console.log(`File: ${filename}:${lineno}:${colno}`);
    console.log(`URL: ${url}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing unhandled error data:', error);
    return NextResponse.json({ error: 'Failed to process data' }, { status: 500 });
  }
}

