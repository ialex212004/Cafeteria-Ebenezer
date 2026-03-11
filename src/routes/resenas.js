// ============================================================
//  RUTAS RESEÑAS
// ============================================================

const express = require('express');
const router = express.Router();

const logger = require('../utils/logger')('Routes/Resenas');
const { query } = require('../db');
const { validateResena } = require('../middleware/validation');
const { createResenaLimiter } = require('../middleware/rateLimiter');
const { hasValidAdminKey, requireAdminAuth } = require('../middleware/auth');

function parseComentario(comentario) {
  if (!comentario) {
    return { texto: '', ciudad: '', estado: null };
  }

  if (typeof comentario === 'object') {
    return {
      texto: comentario.texto || comentario.comentario || '',
      ciudad: comentario.ciudad || '',
      estado: comentario.estado || null,
    };
  }

  try {
    const parsed = JSON.parse(comentario);
    if (parsed && typeof parsed === 'object') {
      return {
        texto: parsed.texto || parsed.comentario || '',
        ciudad: parsed.ciudad || '',
        estado: parsed.estado || null,
      };
    }
  } catch (_error) {
    // ignore parse error
  }

  return { texto: comentario, ciudad: '', estado: null };
}

function buildComentario({ texto, ciudad, estado }) {
  return JSON.stringify({ texto, ciudad, estado });
}

function mapResena(row) {
  const parsed = parseComentario(row.comentario);
  const createdAt = row.created_at ? new Date(row.created_at).toISOString() : null;
  const estado = parsed.estado || (row.aprobada ? 'publicada' : 'pendiente');

  return {
    id: row.id,
    nombre: row.nombre || '',
    ciudad: parsed.ciudad || '',
    texto: parsed.texto || '',
    calificacion: row.calificacion ?? 5,
    estado,
    fechaCreacion: createdAt,
    fechaActualizacion: createdAt,
  };
}

function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  return id;
}

/**
 * POST /api/resenas
 * Crear nueva reseña
 */
router.post('/', createResenaLimiter, validateResena, async (req, res) => {
  try {
    const { nombre, ciudad, texto } = req.validatedBody;
    const comentario = buildComentario({
      texto: texto.trim(),
      ciudad: (ciudad || '').trim(),
      estado: 'pendiente',
    });

    const insertResult = await query(
      'insert into resenas (nombre, email, calificacion, comentario, aprobada) values ($1, $2, $3, $4, $5) returning *',
      [nombre.trim(), null, 5, comentario, false],
    );

    const resena = mapResena(insertResult.rows[0]);

    logger.info('Reseña creada', {
      id: resena.id,
      nombre: resena.nombre,
      ciudad: resena.ciudad,
    });

    return res.status(201).json({
      error: false,
      message: 'Reseña creada exitosamente',
      data: resena,
    });
  } catch (error) {
    logger.error('Error al crear reseña', { error: error.message });
    return res.status(500).json({
      error: true,
      message: 'Error al procesar la reseña',
    });
  }
});

/**
 * GET /api/resenas
 * Obtener reseñas (públicas por defecto, todas si ?all=true)
 */
router.get('/', async (req, res) => {
  try {
    const showAll = req.query.all === 'true';
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(parseInt(req.query.limit || '50', 10), 200);
    const offset = (page - 1) * limit;

    if (showAll && !hasValidAdminKey(req)) {
      return res.status(401).json({
        error: true,
        message: 'No autorizado. API key inválida o ausente.',
      });
    }

    const resenasResult = showAll
      ? await query('select * from resenas order by created_at desc limit $1 offset $2', [
          limit,
          offset,
        ])
      : await query(
          'select * from resenas where aprobada = true order by created_at desc limit $1 offset $2',
          [limit, offset],
        );

    const resenas = resenasResult.rows.map(mapResena);
    const totalResult = showAll
      ? await query('select count(*)::int as total from resenas')
      : await query('select count(*)::int as total from resenas where aprobada = true');
    const total = totalResult.rows[0]?.total || 0;
    const pendientesResult = showAll
      ? await query('select count(*)::int as pendientes from resenas where aprobada = false')
      : null;
    const pendientes = pendientesResult ? pendientesResult.rows[0]?.pendientes || 0 : 0;

    if (showAll) {
      return res.json({
        error: false,
        data: resenas,
        total,
        page,
        limit,
        pages: Math.ceil(total / limit) || 1,
        pendientes,
      });
    }

    return res.json({
      error: false,
      data: resenas,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    logger.error('Error al obtener reseñas', { error: error.message });
    return res.status(500).json({
      error: true,
      message: 'Error al obtener las reseñas',
    });
  }
});

/**
 * GET /api/resenas/todas (privado)
 * Obtener TODAS las reseñas (incluyendo pendientes)
 */
router.get('/todas', requireAdminAuth, async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(parseInt(req.query.limit || '50', 10), 200);
    const offset = (page - 1) * limit;

    const resenasResult = await query(
      'select * from resenas order by created_at desc limit $1 offset $2',
      [limit, offset],
    );
    const resenas = resenasResult.rows.map(mapResena);
    const totalResult = await query('select count(*)::int as total from resenas');
    const pendientesResult = await query(
      'select count(*)::int as pendientes from resenas where aprobada = false',
    );
    const total = totalResult.rows[0]?.total || 0;
    const pendientes = pendientesResult.rows[0]?.pendientes || 0;

    res.json({
      error: false,
      data: resenas,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1,
      pendientes,
    });
  } catch (error) {
    logger.error('Error al obtener todas las reseñas', { error: error.message });
    res.status(500).json({
      error: true,
      message: 'Error al obtener las reseñas',
    });
  }
});

/**
 * GET /api/resenas/:id
 * Obtener una reseña específica
 */
router.get('/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({
        error: true,
        message: 'ID inválido',
      });
    }
    const resenaResult = await query('select * from resenas where id = $1', [id]);

    if (resenaResult.rows.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'Reseña no encontrada',
      });
    }

    return res.json({
      error: false,
      data: mapResena(resenaResult.rows[0]),
    });
  } catch (error) {
    logger.error('Error al obtener reseña', { error: error.message });
    return res.status(500).json({
      error: true,
      message: 'Error al obtener la reseña',
    });
  }
});

/**
 * PATCH /api/resenas/:id
 * Actualizar estado de una reseña (publicar/rechazar)
 */
router.patch('/:id', requireAdminAuth, async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({
        error: true,
        message: 'ID inválido',
      });
    }
    const { estado } = req.body;

    if (!['publicada', 'rechazada', 'pendiente'].includes(estado)) {
      return res.status(400).json({
        error: true,
        message: 'Estado inválido. Usa: publicada, rechazada o pendiente',
      });
    }

    const resenaResult = await query('select * from resenas where id = $1', [id]);

    if (resenaResult.rows.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'Reseña no encontrada',
      });
    }

    const existing = resenaResult.rows[0];
    const parsed = parseComentario(existing.comentario);
    const comentario = buildComentario({
      texto: parsed.texto || '',
      ciudad: parsed.ciudad || '',
      estado,
    });

    const updateResult = await query(
      'update resenas set comentario = $1, aprobada = $2 where id = $3 returning *',
      [comentario, estado === 'publicada', id],
    );

    const resena = mapResena(updateResult.rows[0]);
    const fechaActualizacion = new Date().toISOString();

    logger.info('Reseña actualizada', {
      id: resena.id,
      estado,
    });

    return res.json({
      error: false,
      message: 'Reseña actualizada exitosamente',
      data: {
        ...resena,
        fechaActualizacion,
      },
    });
  } catch (error) {
    logger.error('Error al actualizar reseña', { error: error.message });
    return res.status(500).json({
      error: true,
      message: 'Error al actualizar la reseña',
    });
  }
});

/**
 * DELETE /api/resenas/:id
 * Eliminar una reseña
 */
router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({
        error: true,
        message: 'ID inválido',
      });
    }
    const deleteResult = await query('delete from resenas where id = $1 returning id', [id]);

    if (deleteResult.rows.length === 0) {
      return res.status(404).json({
        error: true,
        message: 'Reseña no encontrada',
      });
    }

    logger.info('Reseña eliminada', {
      id,
    });

    return res.json({
      error: false,
      message: 'Reseña eliminada exitosamente',
    });
  } catch (error) {
    logger.error('Error al eliminar reseña', { error: error.message });
    return res.status(500).json({
      error: true,
      message: 'Error al eliminar la reseña',
    });
  }
});

module.exports = router;
