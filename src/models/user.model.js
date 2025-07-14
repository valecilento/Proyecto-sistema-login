import mongoose from "mongoose";

const userCollection = "users";

const userSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name:  { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  age:        { type: Number },
  password:   { type: String, required: true },
  cart:       { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  role:       { type: String, default: 'user' }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;