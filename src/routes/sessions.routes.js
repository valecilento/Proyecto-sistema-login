import { Router } from 'express';
import passport from 'passport';
import { register, login, current } from '../controllers/sessions.controller.js';

const sessionRoutes = Router();

sessionRoutes.post('/register', register);
sessionRoutes.post('/login', (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ status: 'error', error: 'Credenciales inválidas' });
    }
    req.user = user;
    next();
  })(req, res, next);
}, login);
sessionRoutes.get('/current', passport.authenticate('jwt', { session: false }), current);

export default sessionRoutes;