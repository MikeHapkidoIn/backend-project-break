module.exports = function requireAuth(req, res, next) {
  // Si hay sesión y logeado continua
  if (req.session && req.session.isAuthenticated) {
    return next();
  }

  // Si no está logeado te manda al login
  res.redirect('/login?error=Acceso denegado');
};