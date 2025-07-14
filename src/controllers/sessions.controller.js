import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../dao/user.dao.js';
import { createHash } from '../utils/hash.js';
import { JWT_SECRET } from '../config/jwt.js';

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
    res.send({ status: 'success', user: newUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const login = (req, res) => {
  const token = jwt.sign(
    { id: req.user._id, email: req.user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.send({ status: 'success', token });
};

export const current = (req, res) => {
  const { first_name, last_name, email, age, role } = req.user;
  res.send({ status: 'success', user: { first_name, last_name, email, age, role } });
};