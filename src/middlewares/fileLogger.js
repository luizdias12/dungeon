const winston = require('winston');
const fs = require('fs');
const path = require('path');

// Cria pasta se não existir
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
      })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDir, 'erro.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDir, 'acesso.log') }),
  ]
});

function limparIp(ip) {
  return ip?.replace('::ffff:', '') || '';
}

const logMiddleware = (req, res, next) => {
  const start = Date.now();
  const ip = limparIp(req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress);

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMsg = `${req.method} ${req.originalUrl} - IP: ${ip} - Status: ${res.statusCode} - Tempo: ${duration}ms`;

    logger.info(logMsg);

    if (res.statusCode >= 400) {
      logger.error(`Erro detectado: ${logMsg}`);
    }
  });

  next();
};

module.exports = { logger, logMiddleware };