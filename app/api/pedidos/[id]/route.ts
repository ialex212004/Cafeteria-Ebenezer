import path from 'path';
import { NextResponse } from 'next/server';
import config from '../../../../src/config/index.js';
import dataManager from '../../../../src/utils/dataManager.js';
import validators from '../../../../src/validators/index.js';

const { readJSON, writeJSON } = dataManager;
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

export async function GET(request, { params }) {
  if (!hasValidAdminKey(request)) {
    return NextResponse.json(
      { error: true, message: 'No autorizado. API key inválida o ausente.' },
      { status: 401 },
    );
  }

  const id = Number(params.id);
  const pedidos = readJSON(PEDIDOS_FILE);
  const pedido = pedidos.find(p => p.id === id);

  if (!pedido) {
    return NextResponse.json(
      { error: true, message: 'Pedido no encontrado' },
      { status: 404 },
    );
  }

  return NextResponse.json({ error: false, data: pedido });
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
  const pedidos = readJSON(PEDIDOS_FILE);
  const pedido = pedidos.find(p => p.id === id);

  if (!pedido) {
    return NextResponse.json(
      { error: true, message: 'Pedido no encontrado' },
      { status: 404 },
    );
  }

  pedido.estado = value.estado;
  pedido.fechaActualizacion = new Date().toISOString();

  const success = writeJSON(PEDIDOS_FILE, pedidos);
  if (!success) {
    return NextResponse.json(
      { error: true, message: 'Error al actualizar el pedido' },
      { status: 500 },
    );
  }

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
  const pedidos = readJSON(PEDIDOS_FILE);
  const index = pedidos.findIndex(p => p.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: true, message: 'Pedido no encontrado' },
      { status: 404 },
    );
  }

  pedidos.splice(index, 1);
  const success = writeJSON(PEDIDOS_FILE, pedidos);
  if (!success) {
    return NextResponse.json(
      { error: true, message: 'Error al eliminar el pedido' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    error: false,
    message: 'Pedido eliminado exitosamente',
  });
}
