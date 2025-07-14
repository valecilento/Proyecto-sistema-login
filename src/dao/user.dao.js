import userModel from '../models/user.model.js';

export const createUser = async user => await userModel.create(user);
export const findUserByEmail = async email => await userModel.findOne({ email });
export const findUserById = async id => await userModel.findById(id);
export const getAllUsers = async () => await userModel.find();
export const updateUserById = async (id, data) => await userModel.findByIdAndUpdate(id, data, { new: true });
export const deleteUserById = async id => await userModel.findByIdAndDelete(id);
