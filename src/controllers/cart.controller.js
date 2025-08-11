import * as CartService from '../services/cart.service.js';
import Ticket from '../models/ticket.model.js';

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const cart = await CartService.addProductToCart(userId, productId, quantity);
    console.log('Carrito actualizado:', cart); 
    res.json({ status: 'success', cart });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar al carrito' });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const cart = await CartService.removeProductFromCart(userId, productId);
    res.json({ status: 'success', cart });
  } catch (err) {
    res.status(500).json({ error: 'Error al quitar el producto' });
  }
};

export const purchase = async (req, res) => {
  const userId = req.user.id;
  const email = req.user.email;

  try {
    const ticket = await CartService.purchaseCart(userId, email);
    res.json({ status: 'success', ticket });
    res.redirect(`/api/cart/buy/confirmation/${ticket._id}`);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const showCart = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await CartService.getCartById(cid);
    if (!cart) {
      return res.status(404).send('error', { message: 'Carrito no encontrado' });
    }

    res.render('cart', { cart });
  } catch (err) {
    res.status(404).send('error', { message: 'Carrito no encontrado'});
  }
};
export const showUserCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await CartService.getCartByUserId(userId);
    if (!cart) {
      return res.status(404).send('error', { message: 'Carrito no encontrado' });
    }
    res.render('cart', { cart });
  } catch (error) {
    res.status(500).send('error', { message: 'Error al cargar el carrito' });
  }
};
export const buyConfirmation = async (req, res) => {
  const { tid } = req.params;

  try {
    const ticket = await Ticket.findById(tid).lean();
    if (!ticket) return res.status(404).send('Ticket no encontrado');

    res.render('buyConfirmation', { title: 'Compra realizada', ticket });
  } catch (error) {
    res.status(500).send('Error al cargar el ticket');
  }
};
