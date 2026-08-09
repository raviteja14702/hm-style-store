const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');

// GET all products with optional category filter
router.get('/', async (req, res) => {
  try {
    const filter = req.query.category && req.query.category !== 'all'
      ? { category: req.query.category } : {};
    const products = await Product.find(filter).select('-__v');
    res.json(products);
  } catch (err) { res.status(500).json({ error: 'Failed to fetch products' }); }
});

// GET single product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) }).select('-__v');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) { res.status(500).json({ error: 'Failed to fetch product' }); }
});

module.exports = router;
