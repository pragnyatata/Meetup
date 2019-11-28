const config = {
  requireAuth: true
};

module.exports = function(req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden
  if (!config.requireAuth) return next();

  if (!req.user.isHost) return res.status(403).send("Access denied.");

  next();
};
