import { NextResponse } from 'next/server';
import config from '../../../src/config/index.js';
import { query } from '../../../src/db/index.js';
import validators from '../../../src/validators/index.js';
import requestIdUtils from '../../../src/utils/requestId.js';
import safeCompareUtils from '../../../src/utils/safeCompare.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const { createRequestId } = requestIdUtils;
const { safeCompare } = safeCompareUtils;

function jsonWithRequestId(payload, init, requestId) {
  const response = NextResponse.json(payload, init);
  response.headers.set('X-Request-Id', requestId);
  return response;
}

function hasValidAdminKey(request) {
  const directKey = request.headers.get('x-api-key');
  if (directKey && safeCompare(directKey.trim(), config.apiKey)) {
    return true;
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return safeCompare(authHeader.slice('Bearer '.length).trim(), config.apiKey);
  }

  return false;
}

function parseComentario(comentario) {
  if (!comentario) {
    return { texto: '', ciudad: '' };
  }
  if (typeof comentario === 'object') {
    return {
      texto: comentario.texto || '',
      ciudad: comentario.ciudad || '',
    };
  }
  const trimmed = String(comentario).trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      return {
        texto: parsed.texto || '',
        ciudad: parsed.ciudad || '',
      };
    } catch (_error) {
      return { texto: trimmed, ciudad: '' };
    }
  }
  return { texto: trimmed, ciudad: '' };
}

function mapResenaRow(row) {
  const comentario = parseComentario(row.comentario);
  return {
    id: row.id,
    nombre: row.nombre,
    ciudad: comentario.ciudad || '',
    texto: comentario.texto || '',
    calificacion: row.calificacion ?? 5,
    estado: row.aprobada ? 'publicada' : 'pendiente',
    fechaCreacion: row.created_at ? row.created_at.toISOString() : null,
  };
}

function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
}

export async function POST(request) {
  const requestId = createRequestId();
  let body;
  try {
    body = await request.json();
  } catch (_error) {
    return jsonWithRequestId(
      { error: true, message: 'JSON inválido', requestId },
      { status: 400 },
      requestId,
    );
  }

  const { valid, value, error } = validators.validate(validators.schemas.resena, body);
  if (!valid) {
    return jsonWithRequestId(
      { error: true, message: 'Datos inválidos', details: error, requestId },
      { status: 400 },
      requestId,
    );
  }

  const { nombre, ciudad, texto } = value;
  const comentarioPayload = {
    texto: texto.trim(),
    ciudad: (ciudad || '').trim(),
    estado: 'pendiente',
  };

  const insertResult = await query(
    `INSERT INTO resenas (nombre, email, calificacion, comentario, aprobada)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, nombre, email, calificacion, comentario, aprobada, created_at`,
    [nombre.trim(), null, 5, JSON.stringify(comentarioPayload), false],
  );

  const resena = mapResenaRow(insertResult.rows[0]);

  return jsonWithRequestId(
    {
      error: false,
      message: 'Reseña creada exitosamente',
      data: resena,
      requestId,
    },
    { status: 201 },
    requestId,
  );
}

export async function GET(request) {
  const requestId = createRequestId();
  const { searchParams } = new URL(request.url);
  const showAll = searchParams.get('all') === 'true';
  const page = parsePositiveInt(searchParams.get('page') || '1', 1);
  const limit = Math.min(parsePositiveInt(searchParams.get('limit') || '50', 50), 200);
  const offset = (page - 1) * limit;

  if (showAll) {
    if (!hasValidAdminKey(request)) {
      return jsonWithRequestId(
        { error: true, message: 'No autorizado. API key inválida o ausente.', requestId },
        { status: 401 },
        requestId,
      );
    }

    const result = await query(
      `SELECT id, nombre, email, calificacion, comentario, aprobada, created_at
       FROM resenas
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const data = result.rows.map(mapResenaRow);
    const countResult = await query(
      'SELECT COUNT(*)::int AS total FROM resenas',
    );
    const pendientesResult = await query(
      'SELECT COUNT(*)::int AS pendientes FROM resenas WHERE aprobada = false',
    );
    const total = countResult.rows[0]?.total || 0;
    const pendientes = pendientesResult.rows[0]?.pendientes || 0;

    return jsonWithRequestId(
      {
        error: false,
        data,
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
        pendientes,
        requestId,
      },
      undefined,
      requestId,
    );
  }

  const result = await query(
    `SELECT id, nombre, email, calificacion, comentario, aprobada, created_at
     FROM resenas
     WHERE aprobada = true
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset],
  );

  const data = result.rows.map(mapResenaRow);
  const countResult = await query(
    'SELECT COUNT(*)::int AS total FROM resenas WHERE aprobada = true',
  );
  const total = countResult.rows[0]?.total || 0;

  const response = jsonWithRequestId(
    {
      error: false,
      data,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1,
      requestId,
    },
    undefined,
    requestId,
  );
  response.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=300');
  return response;
}
