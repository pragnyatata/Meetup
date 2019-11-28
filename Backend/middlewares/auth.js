const jwt = require("jsonwebtoken");
const config = {
  jwtPrivateKey: "unsecureKey",
  requiresAuth: true
};

module.exports = function(req, res, next) {
  if (!config.requiresAuth) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
