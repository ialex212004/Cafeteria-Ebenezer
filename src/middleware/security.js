// ============================================================
//  MIDDLEWARE SEGURIDAD
// ============================================================

const cors = require('cors');
const config = require('../config');
const logger = require('../utils/logger')('Security');
const { createRequestId } = require('../utils/requestId');

/**
 * Configuración CORS personalizada
 */
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir sin origin (navegación directa, requests desde el mismo servidor)
    if (!origin || config.allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn('CORS rechazado', { origin });
      callback(new Error('CORS no permitido'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'X-Request-Id'],
  maxAge: 86400, // 24 horas
};

/**
 * Middleware de headers de seguridad
 */
const securityHeaders = (req, res, next) => {
  // Prevenir clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevenir MIME-type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Habilitar XSS protection en navegadores antiguos
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Content Security Policy
  res.setHeader('Content-Security-Policy', "default-src 'self'");

  // Referrer Policy
  res.setHeader('Referrer-Policy', 'no-referrer');

  // Permissions Policy
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  // Strict-Transport-Security (solo en producción)
  if (config.isProduction) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  next();
};

/**
 * Middleware de request id
 */
const requestId = (req, res, next) => {
  const incomingId = req.headers['x-request-id'];
  const id = (Array.isArray(incomingId) ? incomingId[0] : incomingId) || createRequestId();
  req.requestId = String(id);
  res.setHeader('X-Request-Id', req.requestId);
  next();
};

/**
 * Middleware para logging de requests
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 400 ? 'warn' : 'info';
    logger[level](`${req.method} ${req.path}`, {
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      requestId: req.requestId,
    });
  });

  next();
};

module.exports = {
  cors: cors(corsOptions),
  securityHeaders,
  requestId,
  requestLogger,
};
