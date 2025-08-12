import { Router } from 'express';
import passport from 'passport';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';
import { checkRole } from '../middlewares/checkRole.js'; 

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'), 
  getUsers
);

router.get(
  '/:uid',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin', 'user'), 
  getUserById
);

router.put(
  '/:uid',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin', 'user'), 
  updateUser
);

router.delete(
  '/:uid',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'), 
  deleteUser
);

export default router;
