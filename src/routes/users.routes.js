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
  checkRole('admin'), // 👈 solo admin puede ver todos los usuarios
  getUsers
);

router.get(
  '/:uid',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin', 'user'), // 👈 admin y user pueden ver
  getUserById
);

router.put(
  '/:uid',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin', 'user'), // 👈 permitir edición propia o por admin
  updateUser
);

router.delete(
  '/:uid',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'), // 👈 solo admin puede eliminar
  deleteUser
);

export default router;



// router.get('/', passport.authenticate('jwt', { session: false }), getUsers);
// router.get('/:uid', passport.authenticate('jwt', { session: false }), getUserById);
// router.put('/:uid', passport.authenticate('jwt', { session: false }), updateUser);
// router.delete('/:uid', passport.authenticate('jwt', { session: false }), deleteUser);

// export default router;