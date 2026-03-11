// ============================================================
//  MIDDLEWARE ERROR HANDLER
// ============================================================

const logger = require('../utils/logger')('ErrorHandler');

/**
 * Middleware para manejar errores de la aplicación
 */
const errorHandler = (err, req, res, _next) => {
  logger.error('Unhandled error', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    requestId: req.requestId,
  });

  const statusCode = err.status || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    error: true,
    message,
    requestId: req.requestId,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

/**
 * Middleware para manejar rutas no encontradas
 */
const notFound = (req, res, _next) => {
  res.status(404).json({
    error: true,
    message: `Ruta no encontrada: ${req.originalUrl}`,
    requestId: req.requestId,
  });
};

/**
 * Middleware para respuestas exitosas
 */
const successResponse = (data, _statusCode = 200) => {
  return {
    error: false,
    data,
  };
};

module.exports = {
  errorHandler,
  notFound,
  successResponse,
};
