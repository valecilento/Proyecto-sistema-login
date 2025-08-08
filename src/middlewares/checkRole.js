export function checkRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('No autenticado');
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).send('No autorizado');
    }

    next();
  };
}