import express from 'express';
import { updateProduct } from '../controllers/product.controller.js';
import authenticate from '../middlewares/authenticateJWT.js';
import { checkRole } from '../middlewares/checkRole.js';
import Product from '../models/product.model.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  const products = await Product.find().lean();
  res.render('products', { products, role: req.user?.role, user: req.user });
});
router.put('/:pid', authenticate, checkRole('admin'), updateProduct);
router.post('/admin/products/edit/:id', authenticate, checkRole('admin'), updateProduct);

export default router;
