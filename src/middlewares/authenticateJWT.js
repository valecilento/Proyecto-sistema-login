import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js'; 

const authenticateJWT = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).render('error', { message: 'No autenticado. Por favor inicie sesión.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id); 
    if (!user) {
      return res.status(401).render('error', { message: 'Usuario no encontrado' });
    }

    req.user = user; 
    next();
  } catch (error) {
    return res.status(403).render('error', { message: 'Token inválido o expirado' });
  }
};

export default authenticateJWT;
