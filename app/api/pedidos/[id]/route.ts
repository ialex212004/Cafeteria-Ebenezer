import { NextResponse } from 'next/server';
import config from '../../../../src/config/index.js';
import { query } from '../../../../src/db/index.js';
import validators from '../../../../src/validators/index.js';

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
  if (!hasValidAdminKey(request)) {
    return NextResponse.json(
      { error: true, message: 'No autorizado. API key inválida o ausente.' },
      { status: 401 },
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
    return NextResponse.json(
      { error: true, message: 'Pedido no encontrado' },
      { status: 404 },
    );
  }

  return NextResponse.json({ error: false, data: mapPedidoRow(result.rows[0]) });
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

  const { valid, value, error } = validators.validate(
    validators.schemas.actualizarPedido,
    body,
  );
  if (!valid) {
    return NextResponse.json(
      { error: true, message: 'Datos inválidos', details: error },
      { status: 400 },
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
    return NextResponse.json(
      { error: true, message: 'Pedido no encontrado' },
      { status: 404 },
    );
  }

  const pedido = mapPedidoRow(updateResult.rows[0]);
  pedido.fechaActualizacion = new Date().toISOString();

  return NextResponse.json({
    error: false,
    message: 'Pedido actualizado exitosamente',
    data: pedido,
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
  const deleteResult = await query(
    `DELETE FROM pedidos
     WHERE id = $1
     RETURNING id`,
    [id],
  );

  if (deleteResult.rows.length === 0) {
    return NextResponse.json(
      { error: true, message: 'Pedido no encontrado' },
      { status: 404 },
    );
  }

  return NextResponse.json({
    error: false,
    message: 'Pedido eliminado exitosamente',
  });
}
