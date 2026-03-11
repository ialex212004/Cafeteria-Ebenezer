import { NextResponse } from 'next/server';
import config from '../../../src/config/index.js';
import { query } from '../../../src/db/index.js';
import validators from '../../../src/validators/index.js';

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

  const { valid, value, error } = validators.validate(validators.schemas.pedido, body);
  if (!valid) {
    return NextResponse.json(
      { error: true, message: 'Datos inválidos', details: error },
      { status: 400 },
    );
  }

  const { nombre, telefono, producto, cantidad, notas } = value;

  const existing = await query(
    `SELECT id
     FROM pedidos
     WHERE estado IN ('pendiente', 'confirmado')
       AND (items->>'telefono') = $1
     ORDER BY created_at DESC
     LIMIT 1`,
    [telefono.trim()],
  );

  if (existing.rows.length > 0) {
    return NextResponse.json(
      {
        error: true,
        message: 'Ya existe un pedido activo con este teléfono',
        conflictId: existing.rows[0].id,
      },
      { status: 409 },
    );
  }

  const items = {
    producto: producto.trim(),
    cantidad: cantidad || 1,
    telefono: telefono.trim(),
  };

  const insertResult = await query(
    `INSERT INTO pedidos (cliente_nombre, cliente_email, items, total, estado, notas)
     VALUES ($1, $2, $3::jsonb, $4, $5, $6)
     RETURNING id, cliente_nombre, items, total, estado, notas, created_at`,
    [
      nombre.trim(),
      null,
      JSON.stringify(items),
      0,
      'pendiente',
      (notas || '').trim(),
    ],
  );

  const pedido = mapPedidoRow(insertResult.rows[0]);

  return NextResponse.json(
    {
      error: false,
      message: 'Pedido creado exitosamente',
      data: pedido,
    },
    { status: 201 },
  );
}

export async function GET(request) {
  if (!hasValidAdminKey(request)) {
    return NextResponse.json(
      { error: true, message: 'No autorizado. API key inválida o ausente.' },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const estadosValidos = ['pendiente', 'confirmado', 'entregado'];
  let estadoFiltro = null;

  if (searchParams.get('estado')) {
    const estado = searchParams.get('estado').toLowerCase();
    if (!estadosValidos.includes(estado)) {
      return NextResponse.json(
        { error: true, message: `Estado inválido. Usa: ${estadosValidos.join(', ')}` },
        { status: 400 },
      );
    }
    estadoFiltro = estado;
  }

  const page = Number.parseInt(searchParams.get('page') || '1', 10);
  const limit = Number.parseInt(searchParams.get('limit') || '50', 10);
  const offset = (page - 1) * limit;

  const whereClause = estadoFiltro ? 'WHERE estado = $1' : '';
  const params = estadoFiltro ? [estadoFiltro, limit, offset] : [limit, offset];
  const paramOffset = estadoFiltro ? 2 : 1;

  const dataResult = await query(
    `SELECT id, cliente_nombre, items, total, estado, notas, created_at
     FROM pedidos
     ${whereClause}
     ORDER BY created_at DESC
     LIMIT $${paramOffset} OFFSET $${paramOffset + 1}`,
    params,
  );

  const countResult = await query(
    `SELECT COUNT(*)::int AS total
     FROM pedidos
     ${whereClause}`,
    estadoFiltro ? [estadoFiltro] : [],
  );

  const total = countResult.rows[0]?.total || 0;
  const data = dataResult.rows.map(mapPedidoRow);

  return NextResponse.json({
    error: false,
    data,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  });
}
