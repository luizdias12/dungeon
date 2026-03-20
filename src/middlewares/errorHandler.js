module.exports = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  const status = err.statusCode || err.status || 500;

  const message = isProd && status === 500
    ? 'Erro interno do servidor'
    : err.message;

  if (!isProd) {
    console.error(`[${new Date().toISOString()}] ${err.stack}`);
  } else {
    console.error(`[${new Date().toISOString()}] [ERROR] ${err.message}`);
  }

  res.status(status).json({
    success: false,
    error: {
      code: status,
      message,
      controller: err.controller || 'desconhecido',
      details: err.details || null
    },
    timestamp: new Date().toISOString()
  });
};