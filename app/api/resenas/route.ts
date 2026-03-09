import path from 'path';
import { NextResponse } from 'next/server';
import config from '../../../src/config/index.js';
import dataManager from '../../../src/utils/dataManager.js';
import validators from '../../../src/validators/index.js';

const { readJSON, writeJSON, getNextId } = dataManager;
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

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (_error) {
    return NextResponse.json(
      { error: true, message: 'JSON inválido' },
      { status: 400 },
    );
  }

  const { valid, value, error } = validators.validate(validators.schemas.resena, body);
  if (!valid) {
    return NextResponse.json(
      { error: true, message: 'Datos inválidos', details: error },
      { status: 400 },
    );
  }

  const { nombre, ciudad, texto } = value;
  const resenas = readJSON(RESENAS_FILE);
  const resena = {
    id: getNextId(resenas),
    nombre: nombre.trim(),
    ciudad: (ciudad || '').trim(),
    texto: texto.trim(),
    calificacion: 5,
    estado: 'pendiente',
    fechaCreacion: new Date().toISOString(),
  };

  resenas.push(resena);
  const success = writeJSON(RESENAS_FILE, resenas);
  if (!success) {
    return NextResponse.json(
      { error: true, message: 'Error al guardar la reseña' },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      error: false,
      message: 'Reseña creada exitosamente',
      data: resena,
    },
    { status: 201 },
  );
}

export async function GET(request) {
  const resenas = readJSON(RESENAS_FILE);
  const { searchParams } = new URL(request.url);
  const showAll = searchParams.get('all') === 'true';

  if (showAll) {
    if (!hasValidAdminKey(request)) {
      return NextResponse.json(
        { error: true, message: 'No autorizado. API key inválida o ausente.' },
        { status: 401 },
      );
    }

    const sortedAll = resenas.sort(
      (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion),
    );

    return NextResponse.json({
      error: false,
      data: sortedAll,
      total: sortedAll.length,
      pendientes: sortedAll.filter(r => r.estado === 'pendiente').length,
    });
  }

  const filtered = resenas.filter(r => r.estado === 'publicada');
  const sorted = filtered.sort(
    (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion),
  );

  return NextResponse.json({
    error: false,
    data: sorted,
    total: sorted.length,
  });
}
