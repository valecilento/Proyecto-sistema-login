import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).render('error', { message: 'No autenticado. Por favor inicie sesión.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).render('error', { message: 'Token inválido o expirado' });
  }
};

export const injectUserJWT = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    res.locals.user = null;
    res.locals.role = null;
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.locals.user = decoded;
    res.locals.role = decoded.role || null;
  } catch (error) {
    res.locals.user = null;
    res.locals.role = null;
  }
  next();
};


export default authenticateJWT;