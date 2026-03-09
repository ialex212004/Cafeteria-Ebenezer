import path from 'path';
import { NextResponse } from 'next/server';
import config from '../../../../src/config/index.js';
import dataManager from '../../../../src/utils/dataManager.js';

const { readJSON } = dataManager;
const RESENAS_FILE = path.join(config.dataDir, 'resenas.json');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function hasValidAdminKey(request) {
  const directKey = request.headers.get('x-api-key');
  if (directKey && directKey.trim() === config.apiKey) {
    return true;
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim() === config.apiKey;
  }

  return false;
}

export async function GET(request) {
  if (!hasValidAdminKey(request)) {
    return NextResponse.json(
      { error: true, message: 'No autorizado. API key inválida o ausente.' },
      { status: 401 },
    );
  }

  const resenas = readJSON(RESENAS_FILE);
  const sorted = resenas.sort(
    (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion),
  );

  return NextResponse.json({
    error: false,
    data: sorted,
    total: sorted.length,
    pendientes: sorted.filter(r => r.estado === 'pendiente').length,
  });
}
