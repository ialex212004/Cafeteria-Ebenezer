// ============================================================
//  CAFETERÍA EBENEZER — Backend Profesional
//  Node.js / Express + Validación + Logging
// ============================================================

const express = require('express');
const path = require('path');

// Cargar configuración y utilidades
const config = require('./src/config');
const logger = require('./src/utils/logger')('Server');

// Middleware
const { cors, securityHeaders, requestId, requestLogger } = require('./src/middleware/security');
const { apiLimiter } = require('./src/middleware/rateLimiter');
const { errorHandler, notFound } = require('./src/middleware/errorHandler');

// Rutas
const healthRoutes = require('./src/routes/health');
const pedidosRoutes = require('./src/routes/pedidos');
const reseniasRoutes = require('./src/routes/resenas');

function createApp() {
  // Inicializar Express
  const app = express();

  // ── MIDDLEWARES GLOBALES ────────────────────────────────
  app.use(requestId);
  app.use(securityHeaders);
  app.use(cors);
  app.use(requestLogger);
  app.use(express.json({ limit: config.maxJsonSize }));
  app.use(express.urlencoded({ limit: config.maxRequestBodySize, extended: true }));

  // ── ARCHIVOS ESTÁTICOS ──────────────────────────────────
  app.use(express.static(path.join(__dirname, 'public')));

  // ── RATE LIMITING ───────────────────────────────────────
  app.use('/api/', apiLimiter);

  // ── RUTAS DE API ────────────────────────────────────────
  app.use('/api', healthRoutes);
  app.use('/api/pedidos', pedidosRoutes);
  app.use('/api/resenas', reseniasRoutes);

  // ── FALLBACK SPA (Serve index.html para rutas no reconocidas)
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // ── MANEJO DE ERRORES ───────────────────────────────────
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

function attachProcessHandlers(serverInstance) {
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection', {
      reason: reason.message || String(reason),
      promise,
    });
  });

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
    process.exit(1);
  });

  const shutdown = (signal) => {
    logger.info(`${signal} recibido. Cerrando servidor gracefully...`);
    serverInstance.close(() => {
      logger.info('Servidor cerrado');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

function startServer() {
  const app = createApp();
  const server = app.listen(config.port, config.host, () => {
    logger.info('🚀 Servidor iniciado', {
      puerto: config.port,
      entorno: config.env,
      url: `http://${config.host}:${config.port}`,
    });
  });

  attachProcessHandlers(server);
  return { app, server };
}

if (require.main === module) {
  startServer();
}

module.exports = {
  createApp,
  startServer,
};
