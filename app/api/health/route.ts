import { NextResponse } from 'next/server';
import config from '../../../src/config/index.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    error: false,
    message: 'Servidor operativo',
    timestamp: new Date().toISOString(),
    environment: config.env,
    uptime: process.uptime(),
  });
}
