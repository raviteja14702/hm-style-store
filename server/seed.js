/*
  seed.js - Populates LOCAL MongoDB with all 13 products and a demo user
  Run with: node seed.js
*/

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const Product  = require('./models/Product');
const User     = require('./models/User');

// LOCAL MongoDB - no internet needed
const MONGO_URI = 'mongodb://127.0.0.1:27017/hm_store';

const products = [
  { id:1,  name:'Regular Fit Cotton T-Shirt', category:'men',   price:12.99, image:'img/products/men-tshirt.jpg',    desc:'Soft cotton jersey t-shirt with a ribbed crew neck. Regular fit.', stock:50 },
  { id:2,  name:'Slim Fit Denim Jeans',       category:'men',   price:29.99, image:'img/products/men-jeans.jpg',     desc:'Five-pocket jeans in washed stretch denim. Slim fit through hip and thigh.', stock:50 },
  { id:3,  name:'Classic Bomber Jacket',      category:'men',   price:39.99, image:'img/products/men-jacket.jpg',    desc:'Lightweight jacket with a ribbed collar, cuffs and hem.', stock:50 },
  { id:4,  name:'Linen Blend Shirt',          category:'men',   price:21.99, image:'img/products/men-shirt.jpg',     desc:'Relaxed fit shirt in a linen-blend weave with a button front.', stock:50 },
  { id:5,  name:'Wrap Midi Dress',            category:'women', price:34.99, image:'img/products/women-dress.jpg',   desc:'Fitted dress in woven fabric with a wrap-effect front and tie belt.', stock:50 },
  { id:6,  name:'High-Waisted Trousers',      category:'women', price:27.99, image:'img/products/women-trousers.jpg',desc:'Tailored trousers with a high waist, side pockets and concealed zip.', stock:50 },
  { id:7,  name:'Ribbed Knit Sweater',        category:'women', price:22.99, image:'img/products/women-sweater.jpg', desc:'Fine-knit sweater in a soft rib knit with dropped shoulders.', stock:50 },
  { id:8,  name:'Pleated Skirt',              category:'women', price:18.99, image:'img/products/women-skirt.jpg',   desc:'Calf-length skirt in woven fabric with permanent pleats.', stock:50 },
  { id:9,  name:'Cropped Puffer Vest',        category:'women', price:26.99, image:'img/products/women-vest.jpg',    desc:'Cropped, padded vest with a stand-up collar and zip front.', stock:50 },
  { id:10, name:'Print Dress',                category:'kids',  price:14.99, image:'img/products/kids-dress.jpg',    desc:'Soft jersey dress with a fun printed motif.', stock:50 },
  { id:11, name:'Zip-Through Hoodie',         category:'kids',  price:16.99, image:'img/products/kids-hoodie.jpg',   desc:'Soft cotton-blend hoodie with a zip front and kangaroo pocket.', stock:50 },
  { id:12, name:'Jogger Pants',               category:'kids',  price:11.99, image:'img/products/kids-pants.jpg',    desc:'Joggers in soft sweatshirt fabric with an elasticated waist.', stock:50 },
  { id:13, name:'Pleated Skirt',              category:'kids',  price:12.99, image:'img/products/kids-skirt.jpg',    desc:'Calf-length pleated skirt in soft woven fabric.', stock:50 }
];

async function seed() {
  try {
    console.log('Connecting to local MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to local MongoDB successfully!');

    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    await Product.insertMany(products);
    console.log('Inserted', products.length, 'products');

    const hashed = await bcrypt.hash('Demo1234', 10);
    await User.create({ username: 'demo_user', email: 'demo@hmstyle.test', password: hashed });
    console.log('Created demo user: demo@hmstyle.test / Demo1234');

    console.log('\nDatabase seeded successfully!');
    console.log('Now run: npm start');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();
