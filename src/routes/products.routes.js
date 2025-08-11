import express from 'express';
import { updateProduct } from '../controllers/product.controller.js';
import authenticate from '../middlewares/authenticateJWT.js';
import { checkRole } from '../middlewares/checkRole.js';

const router = express.Router();

router.put('/api/products/:pid', authenticate, checkRole('admin'), updateProduct);

export default router;
