import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userModel from '../models/user.model.js';
import { validatePassword } from '../utils/hash.js';
import { JWT_SECRET } from './jwt.js';

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user || !validatePassword(user, password)) {
      return done(null, false, { message: 'Credenciales inválidas' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
}, async (jwtPayload, done) => {
  try {
    const user = await userModel.findById(jwtPayload.id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));