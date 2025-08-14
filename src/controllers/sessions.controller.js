import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../dao/user.dao.js';
import { createHash } from '../utils/hash.js';
import { JWT_SECRET } from '../config/jwt.js';
import * as CartService from '../services/cart.service.js';

export const register = async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  try {
    if (await findUserByEmail(email)) {
      return res.status(400).send({ error: 'Usuario ya existe' });
    }
    const newUser = await createUser({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password)
    });
    res.status(200).send({ message: "success", user: newUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    let cart = await CartService.getCartByUserId(req.user._id);
    console.log('Usuario en req.user', req.user);
    console.log('Carrito encontrado', cart);
    if (!cart) {
      cart = await CartService.createCartForUser(req.user._id);
    }
    const token = jwt.sign(
      { 
        id: req.user._id,
        email: req.user.email,
        role: req.user.role,
        cartId: cart._id.toString()
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000
    });

    res.json({ status: 'success', token, cartId: cart._id.toString() });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

export const current = (req, res) => {
  const { first_name, last_name, email, age, role } = req.user;
      res.status(200).send({ message: "success", user:{ first_name, last_name, email, age, role } });
};