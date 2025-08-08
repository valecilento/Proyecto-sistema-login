import Cart from '../models/cart.model.js';
import Ticket from '../models/ticket.model.js';
import { ticketCode } from '../utils/ticketCode.js';

export const createCartForUser = async (userId) => {
  const newCart = new Cart({
    user: userId,
    products: []
  });
  await newCart.save();
  return newCart;
};

export const addProductToCart = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId }) || await createCartForUser(userId);
  const productInCart = cart.products.find(p => p.product.equals(productId));
  if (productInCart) {
    productInCart.quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }
  return await cart.save();
};

export const removeProductFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return null;
  cart.products = cart.products.filter(p => !p.product.equals(productId));
  return await cart.save();
};

export const purchaseCart = async (userId, email) => {
  const cart = await Cart.findOne({ user: userId }).populate('products.product');
  if (!cart) throw new Error('Carrito no encontrado');

  let total = 0;
  const productsToBuy = [];

  for (const item of cart.products) {
    const product = item.product;
    if (product.stock >= item.quantity) {
      product.stock -= item.quantity;
      total += product.price * item.quantity;
      await product.save();
      productsToBuy.push(item);
    }
  }

  if (productsToBuy.length === 0) {
    throw new Error('No hay stock suficiente para ningún producto del carrito.');
  }

  cart.products = cart.products.filter(item => !productsToBuy.includes(item));
  await cart.save();

  const ticket = await Ticket.create({
    code: ticketCode(),
    purchaser: email,
    amount: total
  });

  return ticket;
};
export const getCartById = async (cid) => {
  return await Cart.findById(cid).populate('products.product').lean();
};

export const getCartByUserId = async (userId) => {
  console.log('Buscando carrito para el usuario:', userId);
  return await Cart.findOne({ user: userId }).populate('products.product').lean();
}
