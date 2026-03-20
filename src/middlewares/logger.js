module.exports = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    let color = '\x1b[32m'; // verde

    if (res.statusCode >= 400) color = '\x1b[33m'; // amarelo
    if (res.statusCode >= 500) color = '\x1b[31m'; // vermelho

    console.log(
      `${color}${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms\x1b[0m`
    );
  });

  next();
};