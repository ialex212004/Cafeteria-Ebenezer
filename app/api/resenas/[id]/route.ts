import { NextResponse } from 'next/server';
import config from '../../../../src/config/index.js';
import { query } from '../../../../src/db/index.js';
import requestIdUtils from '../../../../src/utils/requestId.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const { createRequestId } = requestIdUtils;

function jsonWithRequestId(payload, init, requestId) {
  const response = NextResponse.json(payload, init);
  response.headers.set('X-Request-Id', requestId);
  return response;
}

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

export async function GET(_request, { params }) {
  const requestId = createRequestId();
  const id = Number(params.id);
  const result = await query(
    `SELECT id, nombre, email, calificacion, comentario, aprobada, created_at
     FROM resenas
     WHERE id = $1`,
    [id],
  );

  if (result.rows.length === 0) {
    return jsonWithRequestId(
      { error: true, message: 'Reseña no encontrada', requestId },
      { status: 404 },
      requestId,
    );
  }

  return jsonWithRequestId(
    { error: false, data: mapResenaRow(result.rows[0]), requestId },
    undefined,
    requestId,
  );
}

export async function PATCH(request, { params }) {
  const requestId = createRequestId();
  if (!hasValidAdminKey(request)) {
    return jsonWithRequestId(
      { error: true, message: 'No autorizado. API key inválida o ausente.', requestId },
      { status: 401 },
      requestId,
    );
  }

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

  const { estado } = body;
  if (!['publicada', 'rechazada', 'pendiente'].includes(estado)) {
    return jsonWithRequestId(
      { error: true, message: 'Estado inválido. Usa: publicada, rechazada o pendiente', requestId },
      { status: 400 },
      requestId,
    );
  }

  const id = Number(params.id);
  const aprobada = estado === 'publicada';

  const updateResult = await query(
    `UPDATE resenas
     SET aprobada = $1
     WHERE id = $2
     RETURNING id, nombre, email, calificacion, comentario, aprobada, created_at`,
    [aprobada, id],
  );

  if (updateResult.rows.length === 0) {
    return jsonWithRequestId(
      { error: true, message: 'Reseña no encontrada', requestId },
      { status: 404 },
      requestId,
    );
  }

  const resena = mapResenaRow(updateResult.rows[0]);
  resena.estado = estado;

  return jsonWithRequestId(
    {
      error: false,
      message: 'Reseña actualizada exitosamente',
      data: resena,
      requestId,
    },
    undefined,
    requestId,
  );
}

export async function DELETE(request, { params }) {
  const requestId = createRequestId();
  if (!hasValidAdminKey(request)) {
    return jsonWithRequestId(
      { error: true, message: 'No autorizado. API key inválida o ausente.', requestId },
      { status: 401 },
      requestId,
    );
  }

  const id = Number(params.id);
  const deleteResult = await query(
    `DELETE FROM resenas
     WHERE id = $1
     RETURNING id`,
    [id],
  );

  if (deleteResult.rows.length === 0) {
    return jsonWithRequestId(
      { error: true, message: 'Reseña no encontrada', requestId },
      { status: 404 },
      requestId,
    );
  }

  return jsonWithRequestId(
    {
      error: false,
      message: 'Reseña eliminada exitosamente',
      requestId,
    },
    undefined,
    requestId,
  );
}
