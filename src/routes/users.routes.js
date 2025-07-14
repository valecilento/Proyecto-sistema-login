import { Router } from 'express';
import passport from 'passport';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getUsers);
router.get('/:uid', passport.authenticate('jwt', { session: false }), getUserById);
router.put('/:uid', passport.authenticate('jwt', { session: false }), updateUser);
router.delete('/:uid', passport.authenticate('jwt', { session: false }), deleteUser);

export default router;