import { Router } from 'express';
import {
  requestPasswordReset,
  showResetForm,
  resetPassword 
} from '../controllers/password.controller.js';

const router = Router();

router.post('/request', requestPasswordReset);
router.get('/reset/:token', showResetForm);
router.post('/reset', resetPassword);

export default router;