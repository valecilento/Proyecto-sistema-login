import { Router } from 'express';
import * as CartController from '../controllers/cart.controller.js';
import authenticateJWT from '../middlewares/authenticateJWT.js';

const router = Router();

router.get('/', authenticateJWT, CartController.showUserCart);
router.get('/:cid', authenticateJWT, CartController.showCart);
router.post('/add', authenticateJWT, CartController.addToCart);
router.delete('/remove/:productId', authenticateJWT, CartController.removeFromCart);
router.post('/purchase', authenticateJWT, CartController.purchase);
router.get('/purchase/confirmation/:tid', authenticateJWT, CartController.buyConfirmation);
router.get('/mycart', authenticateJWT, CartController.showUserCart);


export default router;