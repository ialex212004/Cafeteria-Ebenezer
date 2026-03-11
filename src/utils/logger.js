// ============================================================
//  LOGGER CENTRALIZADO
// ============================================================

const fs = require('fs');
const path = require('path');
const config = require('../config');

const logsDir = config.logsDir;
const shouldWriteToFile = false;

function ensureLogsDir() {
  if (!shouldWriteToFile) {
    return;
  }
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
}

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

class Logger {
  constructor(module) {
    this.module = module;
    this.currentLevel = logLevels[config.logLevel] || logLevels.info;
  }

  getTimestamp() {
    return new Date().toISOString();
  }

  formatMessage(level, message, data = null) {
    const timestamp = this.getTimestamp();
    const meta = data ? ` | ${JSON.stringify(data)}` : '';
    return `[${timestamp}] [${level}] [${this.module}]${meta} ${message}`;
  }

  writeToFile(level, message) {
    ensureLogsDir();
    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(logsDir, `${level}.${date}.log`);
    const formatted = this.formatMessage(level.toUpperCase(), message);
    fs.appendFileSync(logFile, formatted + '\n', 'utf8');
  }

  log(level, message, data = null) {
    if (logLevels[level] > this.currentLevel) {
      return;
    }

    const formatted = this.formatMessage(level.toUpperCase(), message, data);

    // Consola con color
    const color = colors[level] || colors.reset;
    // eslint-disable-next-line no-console
    console.log(`${color}${formatted}${colors.reset}`);

    // Archivo (solo para prod fuera de Vercel)
    if (shouldWriteToFile) {
      this.writeToFile(level, `${message} ${data ? JSON.stringify(data) : ''}`);
    }
  }

  error(message, data = null) {
    this.log('error', message, data);
  }

  warn(message, data = null) {
    this.log('warn', message, data);
  }

  info(message, data = null) {
    this.log('info', message, data);
  }

  debug(message, data = null) {
    this.log('debug', message, data);
  }
}

module.exports = (moduleName) => new Logger(moduleName);
