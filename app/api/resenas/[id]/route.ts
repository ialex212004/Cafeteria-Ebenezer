import path from 'path';
import { NextResponse } from 'next/server';
import config from '../../../../src/config/index.js';
import dataManager from '../../../../src/utils/dataManager.js';

const { readJSON, writeJSON } = dataManager;
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

export async function GET(_request, { params }) {
  const id = Number(params.id);
  const resenas = readJSON(RESENAS_FILE);
  const resena = resenas.find(r => r.id === id);

  if (!resena) {
    return NextResponse.json(
      { error: true, message: 'Reseña no encontrada' },
      { status: 404 },
    );
  }

  return NextResponse.json({
    error: false,
    data: resena,
  });
}

export async function PATCH(request, { params }) {
  if (!hasValidAdminKey(request)) {
    return NextResponse.json(
      { error: true, message: 'No autorizado. API key inválida o ausente.' },
      { status: 401 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (_error) {
    return NextResponse.json(
      { error: true, message: 'JSON inválido' },
      { status: 400 },
    );
  }

  const { estado } = body;
  if (!['publicada', 'rechazada', 'pendiente'].includes(estado)) {
    return NextResponse.json(
      { error: true, message: 'Estado inválido. Usa: publicada, rechazada o pendiente' },
      { status: 400 },
    );
  }

  const id = Number(params.id);
  const resenas = readJSON(RESENAS_FILE);
  const resena = resenas.find(r => r.id === id);

  if (!resena) {
    return NextResponse.json(
      { error: true, message: 'Reseña no encontrada' },
      { status: 404 },
    );
  }

  resena.estado = estado;
  resena.fechaActualizacion = new Date().toISOString();

  const success = writeJSON(RESENAS_FILE, resenas);
  if (!success) {
    return NextResponse.json(
      { error: true, message: 'Error al actualizar la reseña' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    error: false,
    message: 'Reseña actualizada exitosamente',
    data: resena,
  });
}

export async function DELETE(request, { params }) {
  if (!hasValidAdminKey(request)) {
    return NextResponse.json(
      { error: true, message: 'No autorizado. API key inválida o ausente.' },
      { status: 401 },
    );
  }

  const id = Number(params.id);
  const resenas = readJSON(RESENAS_FILE);
  const index = resenas.findIndex(r => r.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: true, message: 'Reseña no encontrada' },
      { status: 404 },
    );
  }

  resenas.splice(index, 1);
  const success = writeJSON(RESENAS_FILE, resenas);
  if (!success) {
    return NextResponse.json(
      { error: true, message: 'Error al eliminar la reseña' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    error: false,
    message: 'Reseña eliminada exitosamente',
  });
}
