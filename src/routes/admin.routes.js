import { Router } from 'express';
import Product from '../models/product.model.js';
import authenticateJWT from '../middlewares/authenticateJWT.js';
import * as AdminController from '../controllers/admin.controller.js';
import { checkRole } from '../middlewares/checkRole.js';

const router = Router();

router.get('/products', authenticateJWT, checkRole('admin'), async (req, res) => {
  const products = await Product.find().lean();
  const userRole = req.user?.role || 'user';
  res.render('panelAdmin', { products, role: userRole });
});
router.get('/products/edit/:id', authenticateJWT, checkRole('admin'), async (req, res) => {
  try {
    const products = await Product.find().lean();
    const product = await Product.findById(req.params.id).lean();
    res.render('panelAdmin', { title: 'Editar Producto', products, product, editing: true });
  } catch (err) {
    res.status(500).send('Error al cargar el producto');
  }
});
router.get('/', authenticateJWT, checkRole('admin'), AdminController.renderAdminPanel);
router.post('/products/new', authenticateJWT, checkRole('admin'), async (req, res) => {
  try {
    const { title, description, price, stock } = req.body;
    await Product.create({ title, description, price, stock });
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Error al crear el producto');
  }
});
router.post('/products/edit/:id', authenticateJWT, checkRole('admin'), async (req, res) => {
  try {
    const { title, description, price, stock } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { title, description, price, stock });
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Error al actualizar el producto');
  }
});
router.post('/products/delete/:id', authenticateJWT, checkRole('admin'), async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Error al eliminar el producto');
  }
});

export default router;