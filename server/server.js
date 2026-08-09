/*
  server.js - H&M Style Store Deliverable 2
  Full MERN Stack: MongoDB (local) + Express + Node.js
  React frontend served separately on port 3000
  API runs on port 5000
*/

const express    = require('express');
const mongoose   = require('mongoose');
const session    = require('express-session');
const MongoStore = require('connect-mongo');
const cors       = require('cors');
const path       = require('path');

const productRoutes = require('./routes/products');
const authRoutes    = require('./routes/auth');
const cartRoutes    = require('./routes/cart');
const contactRoutes = require('./routes/contact');

const app  = express();
const PORT = 5000;

// Local MongoDB connection - no internet needed
const MONGO_URI = 'process.env.MONGO_URI';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to local MongoDB'))
  .catch(err => { console.error('MongoDB error:', err.message); process.exit(1); });

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'hmstyle_secret_key_2024',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24, sameSite: 'lax', httpOnly: true }
}));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/auth',     authRoutes);
app.use('/api/cart',     cartRoutes);
app.use('/api/contact',  contactRoutes);

const path = require('path');
app.use(require('express').static(path.join(__dirname, 'build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));
app.listen(PORT, () => {
  console.log(`API Server running at http://localhost:${PORT}`);
  console.log('Database: Local MongoDB (process.env.MONGO_URI)');
});

