import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  purchaser: { type: String, required: true },
  amount: { type: Number, required: true },
  purchase_datetime: { type: Date, default: Date.now }
});

export default mongoose.model('Ticket', ticketSchema);