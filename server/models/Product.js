const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id:       { type: Number, required: true, unique: true },
  name:     { type: String, required: true },
  category: { type: String, required: true, enum: ['men', 'women', 'kids'] },
  price:    { type: Number, required: true },
  image:    { type: String, required: true },
  desc:     { type: String, required: true },
  stock:    { type: Number, required: true, default: 50 }
});

module.exports = mongoose.model('Product', productSchema);
