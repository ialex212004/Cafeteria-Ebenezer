import { NextResponse } from 'next/server';
import config from '../../../../src/config/index.js';
import { query } from '../../../../src/db/index.js';
import validators from '../../../../src/validators/index.js';
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

function mapPedidoRow(row) {
  const rowItems = row.items || {};
  return {
    id: row.id,
    nombre: row.cliente_nombre,
    telefono: rowItems.telefono || '',
    producto: rowItems.producto || '',
    cantidad: rowItems.cantidad || 1,
    notas: row.notas || '',
    estado: row.estado,
    fechaCreacion: row.created_at ? row.created_at.toISOString() : null,
    fechaActualizacion: row.created_at ? row.created_at.toISOString() : null,
  };
}

export async function GET(request, { params }) {
  const requestId = createRequestId();
  if (!hasValidAdminKey(request)) {
    return jsonWithRequestId(
      { error: true, message: 'No autorizado. API key inválida o ausente.', requestId },
      { status: 401 },
      requestId,
    );
  }

  const id = Number(params.id);
  const result = await query(
    `SELECT id, cliente_nombre, items, total, estado, notas, created_at
     FROM pedidos
     WHERE id = $1`,
    [id],
  );

  if (result.rows.length === 0) {
    return jsonWithRequestId(
      { error: true, message: 'Pedido no encontrado', requestId },
      { status: 404 },
      requestId,
    );
  }

  return jsonWithRequestId(
    { error: false, data: mapPedidoRow(result.rows[0]), requestId },
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

  const { valid, value, error } = validators.validate(
    validators.schemas.actualizarPedido,
    body,
  );
  if (!valid) {
    return jsonWithRequestId(
      { error: true, message: 'Datos inválidos', details: error, requestId },
      { status: 400 },
      requestId,
    );
  }

  const id = Number(params.id);
  const updateResult = await query(
    `UPDATE pedidos
     SET estado = $1
     WHERE id = $2
     RETURNING id, cliente_nombre, items, total, estado, notas, created_at`,
    [value.estado, id],
  );

  if (updateResult.rows.length === 0) {
    return jsonWithRequestId(
      { error: true, message: 'Pedido no encontrado', requestId },
      { status: 404 },
      requestId,
    );
  }

  const pedido = mapPedidoRow(updateResult.rows[0]);
  pedido.fechaActualizacion = new Date().toISOString();

  return jsonWithRequestId(
    {
      error: false,
      message: 'Pedido actualizado exitosamente',
      data: pedido,
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
    `DELETE FROM pedidos
     WHERE id = $1
     RETURNING id`,
    [id],
  );

  if (deleteResult.rows.length === 0) {
    return jsonWithRequestId(
      { error: true, message: 'Pedido no encontrado', requestId },
      { status: 404 },
      requestId,
    );
  }

  return jsonWithRequestId(
    {
      error: false,
      message: 'Pedido eliminado exitosamente',
      requestId,
    },
    undefined,
    requestId,
  );
}
