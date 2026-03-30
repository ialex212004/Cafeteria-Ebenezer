// ============================================================
//  CONFIGURACIÓN CENTRALIZADA
// ============================================================

// Carga variables de entorno desde /private si existe, si no desde raíz
const fs = require('fs');
const dotenvPath = fs.existsSync('./private/.env') ? './private/.env' : '.env';
require('dotenv').config({ path: dotenvPath });

const config = {
  // Entorno
  env: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',

  // Servidor
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || '0.0.0.0',

  // Rutas
  dataDir: process.env.DATA_DIR || './data',
  logsDir: process.env.LOG_DIR || (process.env.VERCEL ? '/tmp/logs' : './logs'),

  // CORS
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(','),

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutos
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',

  // Seguridad
  jwtSecret: process.env.JWT_SECRET,
  apiKey: process.env.API_KEY || 'dev-api-key',

  // Validación
  maxRequestBodySize: '10mb',
  maxJsonSize: '10mb',

  // Limites de datos
  limits: {
    maxPedidosPerMinuto: 10,
    maxReseniasPerMinuto: 20,
    maxLengthNombre: 100,
    maxLengthTelefono: 20,
    maxLengthProducto: 200,
    maxLengthNotas: 500,
    maxLengthResenia: 1000,
    maxLengthCiudad: 100,
  },
};

// Validar configuración requerida (excepto durante build de Next.js)
const isNextBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
if (config.isProduction && !isNextBuildPhase) {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    // eslint-disable-next-line no-console
    console.warn(
      '⚠️  JWT_SECRET no está configurado o es corto. ' +
      'Configúralo antes de habilitar autenticación JWT.',
    );
  }
  if (process.env.ALLOWED_ORIGINS === 'http://localhost:3000') {
    // eslint-disable-next-line no-console
    console.warn('⚠️  ALLOWED_ORIGINS aún contiene localhost. Configúralo antes de producción.');
  }
}

module.exports = config;
