const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ error: "Token ausente" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    req.user = user;
    next();
  });
};