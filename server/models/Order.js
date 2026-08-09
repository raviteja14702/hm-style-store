const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  image:     { type: String },
  size:      { type: String, required: true },
  qty:       { type: Number, required: true },
  subtotal:  { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username:   { type: String, required: true },
  items:      [orderItemSchema],
  totalPrice: { type: Number, required: true },
  status:     { type: String, default: 'confirmed' },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
