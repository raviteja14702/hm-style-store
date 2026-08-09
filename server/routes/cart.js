const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');
const Order   = require('../models/Order');

function requireLogin(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: 'Please log in first' });
  next();
}

// Get cart
router.get('/', requireLogin, (req, res) => res.json(req.session.cart || []));

// Add to cart
router.post('/', requireLogin, async (req, res) => {
  try {
    const { productId, size, qty } = req.body;
    if (!productId || !size || !qty)
      return res.status(400).json({ error: 'productId, size and qty required' });
    const product = await Product.findOne({ id: parseInt(productId) });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.stock < qty)
      return res.status(400).json({ error: `Only ${product.stock} items left in stock` });
    const cart = req.session.cart || [];
    const existing = cart.find(i => i.productId === product.id && i.size === size);
    if (existing) {
      existing.qty += qty;
      existing.subtotal = parseFloat((existing.qty * product.price).toFixed(2));
    } else {
      cart.push({ productId: product.id, name: product.name, price: product.price, image: product.image, size, qty, subtotal: parseFloat((qty * product.price).toFixed(2)) });
    }
    req.session.cart = cart;
    res.json({ message: 'Added to bag', cart });
  } catch (err) { res.status(500).json({ error: 'Could not add to cart' }); }
});

// Remove from cart
router.delete('/:index', requireLogin, (req, res) => {
  const cart  = req.session.cart || [];
  const index = parseInt(req.params.index);
  if (index < 0 || index >= cart.length)
    return res.status(400).json({ error: 'Invalid cart index' });
  cart.splice(index, 1);
  req.session.cart = cart;
  res.json({ message: 'Item removed', cart });
});

// Checkout - reduces stock in MongoDB
router.post('/checkout', requireLogin, async (req, res) => {
  const cart = req.session.cart || [];
  if (!cart.length) return res.status(400).json({ error: 'Your bag is empty' });
  try {
    for (const item of cart) {
      const product = await Product.findOne({ id: item.productId });
      if (!product) return res.status(404).json({ error: `Product ${item.name} not found` });
      if (product.stock < item.qty)
        return res.status(400).json({ error: `Insufficient stock for ${item.name}` });
      await Product.findOneAndUpdate({ id: item.productId }, { $inc: { stock: -item.qty } });
    }
    const totalPrice = parseFloat(cart.reduce((sum, i) => sum + i.subtotal, 0).toFixed(2));
    const order = await Order.create({
      userId: req.session.userId, username: req.session.username, items: cart, totalPrice
    });
    req.session.cart = [];
    res.json({ message: 'Order confirmed! Thank you for your purchase.', orderId: order._id, total: totalPrice });
  } catch (err) { res.status(500).json({ error: 'Checkout failed' }); }
});

// Get orders
router.get('/orders', requireLogin, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.session.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { res.status(500).json({ error: 'Could not fetch orders' }); }
});

module.exports = router;
