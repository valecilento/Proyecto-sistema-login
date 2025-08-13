import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authenticateJWT = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).render('error', { message: 'No autenticado. Por favor inicie sesión.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded JWT payload:', decoded);

    const user = await User.findById(decoded.id).lean();

    console.log('Usuario encontrado en DB con rol:', user); 

    if (!user) {
      return res.status(401).render('error', { message: 'Usuario no encontrado.' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).render('error', { message: 'Token inválido o expirado' });
  }
};

export const injectUserJWT = async (req, res, next) => {
  const token = req.cookies?.token;

console.log('InjectUserJWT - Rol en locals:', res.locals.role);

  if (!token) {
    res.locals.user = null;

    console.log('InjectUserJWT - Usuario en locals:', res.locals.user);
    
    res.locals.role = null;

    console.log('InjectUserJWT - Rol en locals:', res.locals.role);

    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).lean();
    if (!user) {
      res.locals.user = null;
      res.locals.role = null;
      return next();
    }
    req.user = user;
    res.locals.user = user;
    res.locals.role = user.role || null;
  } catch (error) {
    res.locals.user = null;
    res.locals.role = null;
  }
  next();
};


export default authenticateJWT;