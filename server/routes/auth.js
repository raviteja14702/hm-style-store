const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: 'All fields are required' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ error: 'Invalid email format' });
    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(409).json({
      error: exists.email === email ? 'Email already exists' : 'Username already taken'
    });
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashed });
    res.status(201).json({ message: 'Account created successfully. You can now log in.' });
  } catch (err) { res.status(500).json({ error: 'Registration failed' }); }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required' });
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password))
      return res.status(401).json({ error: 'Invalid email or password' });
    req.session.userId   = user._id;
    req.session.username = user.username;
    req.session.cart     = req.session.cart || [];
    res.json({ message: 'Login successful', username: user.username });
  } catch (err) { res.status(500).json({ error: 'Login failed' }); }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ message: 'Logged out successfully' }));
});

// Session check
router.get('/session', (req, res) => {
  res.json(req.session.userId
    ? { loggedIn: true, username: req.session.username }
    : { loggedIn: false });
});

module.exports = router;
