import { findUserById, updateUserById, deleteUserById, getAllUsers } from '../dao/user.dao.js';
import { createHash } from '../utils/hash.js';


export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send({ message:  'success', users });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.uid);
    if (!user) return res.status(404).send({ error: 'Usuario no encontrado' });
    res.status(200).send({ message:  'success', user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const updateData = password ? { ...rest, password: createHash(password) } : rest;
    const updated = await updateUserById(req.params.uid, updateData);
    if (!updated) return res.status(404).send({ error: 'Usuario no encontrado' });
    res.status(200).send({ message:  'success', updated });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await deleteUserById(req.params.uid);
    if (!deleted) return res.status(404).send({ error: 'Usuario no encontrado' });
    res.status(200).send({ message:  'success', deleted });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};