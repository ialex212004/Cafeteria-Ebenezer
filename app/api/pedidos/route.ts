import path from 'path';
import { NextResponse } from 'next/server';
import config from '../../../src/config/index.js';
import dataManager from '../../../src/utils/dataManager.js';
import validators from '../../../src/validators/index.js';

const { readJSON, writeJSON, getNextId } = dataManager;
const PEDIDOS_FILE = path.join(config.dataDir, 'pedidos.json');

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

  const { valid, value, error } = validators.validate(validators.schemas.pedido, body);
  if (!valid) {
    return NextResponse.json(
      { error: true, message: 'Datos inválidos', details: error },
      { status: 400 },
    );
  }

  const { nombre, telefono, producto, cantidad, notas } = value;
  const pedidos = readJSON(PEDIDOS_FILE);

  const pedidoActivo = pedidos.find(
    p => p.telefono === telefono && ['pendiente', 'confirmado'].includes(p.estado),
  );

  if (pedidoActivo) {
    return NextResponse.json(
      {
        error: true,
        message: 'Ya existe un pedido activo con este teléfono',
        conflictId: pedidoActivo.id,
      },
      { status: 409 },
    );
  }

  const pedido = {
    id: getNextId(pedidos),
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    producto: producto.trim(),
    cantidad: cantidad || 1,
    notas: (notas || '').trim(),
    estado: 'pendiente',
    fechaCreacion: new Date().toISOString(),
    fechaActualizacion: new Date().toISOString(),
  };

  pedidos.push(pedido);
  const success = writeJSON(PEDIDOS_FILE, pedidos);
  if (!success) {
    return NextResponse.json(
      { error: true, message: 'Error al guardar el pedido' },
      { status: 500 },
    );
  }

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

  let pedidos = readJSON(PEDIDOS_FILE);
  const { searchParams } = new URL(request.url);

  if (searchParams.get('estado')) {
    const estadoFiltro = searchParams.get('estado').toLowerCase();
    const estadosValidos = ['pendiente', 'confirmado', 'entregado'];

    if (!estadosValidos.includes(estadoFiltro)) {
      return NextResponse.json(
        { error: true, message: `Estado inválido. Usa: ${estadosValidos.join(', ')}` },
        { status: 400 },
      );
    }

    pedidos = pedidos.filter(p => p.estado === estadoFiltro);
  }

  const sorted = pedidos.sort(
    (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion),
  );

  const page = Number.parseInt(searchParams.get('page') || '1', 10);
  const limit = Number.parseInt(searchParams.get('limit') || '50', 10);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = sorted.slice(start, end);

  return NextResponse.json({
    error: false,
    data: paginated,
    total: sorted.length,
    page,
    limit,
    pages: Math.ceil(sorted.length / limit),
  });
}
