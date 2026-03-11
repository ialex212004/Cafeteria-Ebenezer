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
  const comentarioPayload = {
    texto: texto.trim(),
    ciudad: (ciudad || '').trim(),
  };

  const insertResult = await query(
    `INSERT INTO resenas (nombre, email, calificacion, comentario, aprobada)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, nombre, email, calificacion, comentario, aprobada, created_at`,
    [nombre.trim(), null, 5, JSON.stringify(comentarioPayload), false],
  );

  const resena = mapResenaRow(insertResult.rows[0]);

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
  const { searchParams } = new URL(request.url);
  const showAll = searchParams.get('all') === 'true';

  if (showAll) {
    if (!hasValidAdminKey(request)) {
      return NextResponse.json(
        { error: true, message: 'No autorizado. API key inválida o ausente.' },
        { status: 401 },
      );
    }

    const result = await query(
      `SELECT id, nombre, email, calificacion, comentario, aprobada, created_at
       FROM resenas
       ORDER BY created_at DESC`,
    );

    const data = result.rows.map(mapResenaRow);
    const pendientes = data.filter(r => r.estado === 'pendiente').length;

    return NextResponse.json({
      error: false,
      data,
      total: data.length,
      pendientes,
    });
  }

  const result = await query(
    `SELECT id, nombre, email, calificacion, comentario, aprobada, created_at
     FROM resenas
     WHERE aprobada = true
     ORDER BY created_at DESC`,
  );

  const data = result.rows.map(mapResenaRow);

  return NextResponse.json({
    error: false,
    data,
    total: data.length,
  });
}
