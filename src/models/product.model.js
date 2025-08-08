import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: String,
  category: String,
  code: { type: String, unique: true },
  owner: { type: String, default: 'admin' }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);