# H&M Style Clothing Store - Deliverable 1 & 2
## Full MERN Stack (MongoDB + Express + React + Node.js)

## 1. Description of Website Functionalities

A full-stack H&M-style clothing store built with the complete MERN stack.

### Pages
- **Home** - Hero banner, Shop by Category tiles (Women/Men/Kids), Best-sellers grid
- **Shop** - Full product catalogue with category filter (All/Women/Men/Kids)
- **Product Detail** - Size selector, quantity control, live stock count, Add to Bag
- **Shopping Bag** - Server-side cart with item removal and checkout
- **Register** - Account creation with full client-side and server-side validation
- **Login** - Authentication with MongoDB session management
- **Contact** - Contact form with validation

### Key Features (Deliverable 2)
- **MongoDB** local database with 3 inter-related collections: Products, Users, Orders
- **Express** REST API with 12 endpoints
- **React.js** frontend - Single Page Application with React Router v6
- **Node.js** backend runtime
- Server-side **session management** (login/logout/cart persists via express-session)
- **Stock reduction** on checkout - product quantity updates automatically in MongoDB
- **Password hashing** with bcryptjs (passwords never stored in plain text)
- **Responsive design** with CSS media queries for mobile

## 2. How to Install and Run (Locally)

### Requirements
- Node.js v16 or later (https://nodejs.org)
- MongoDB Community Server v8 installed and running as a Windows Service

### Step 1 - Start MongoDB Service
Open PowerShell as Administrator and run:
```
net start MongoDB
```

### Step 2 - Set up the Backend (Express API Server)
Open PowerShell in the `server` folder:
```
cd server
npm install
node seed.js
npm start
```
API runs at: http://localhost:5000

### Step 3 - Set up the Frontend (React App)
Open a NEW PowerShell window in the `client` folder:
```
cd client
npm install
npm start
```
Website opens automatically at: http://localhost:3000

## 3. Access Information

### Demo Account
| Field    | Value               |
|----------|---------------------|
| Email    | demo@hmstyle.test   |
| Password | Demo1234            |

### Local MongoDB Database
| Field      | Value                              |
|------------|------------------------------------|
| Connection | mongodb://127.0.0.1:27017/hm_store |
| Database   | hm_store                           |
| Collections| products, users, orders            |

To view data visually, open MongoDB Compass and connect with:
```
mongodb://127.0.0.1:27017
```

## 4. Database Design

### Collection: products
Stores all 13 products with live stock levels that update on purchase.
| Field    | Type   | Description                    |
|----------|--------|--------------------------------|
| id       | Number | Unique product identifier      |
| name     | String | Product name                   |
| category | String | men / women / kids             |
| price    | Number | Product price                  |
| image    | String | Path to product image          |
| desc     | String | Product description            |
| stock    | Number | Available stock (reduces on purchase) |

### Collection: users
Registered user accounts with bcrypt-hashed passwords.
| Field     | Type   | Description                    |
|-----------|--------|--------------------------------|
| username  | String | Unique username                |
| email     | String | Unique email address           |
| password  | String | Bcrypt hashed password         |
| createdAt | Date   | Account creation date          |

### Collection: orders
Created on every checkout. References the users collection.
| Field      | Type     | Description                        |
|------------|----------|------------------------------------|
| userId     | ObjectId | Reference to users collection      |
| username   | String   | Username of buyer                  |
| items      | Array    | Array of purchased items           |
| totalPrice | Number   | Total order value                  |
| status     | String   | Order status (confirmed)           |
| createdAt  | Date     | Order creation date                |

## 5. Project Structure

```
hm-mern/
├── server/                    # Node.js + Express Backend
│   ├── server.js              # Main Express server (port 5000)
│   ├── seed.js                # Database seeder - run once
│   ├── package.json
│   ├── models/
│   │   ├── Product.js         # MongoDB Product schema
│   │   ├── User.js            # MongoDB User schema
│   │   └── Order.js           # MongoDB Order schema
│   └── routes/
│       ├── products.js        # GET /api/products
│       ├── auth.js            # POST /api/auth/login|register|logout
│       ├── cart.js            # GET|POST|DELETE /api/cart
│       └── contact.js         # POST /api/contact
├── client/                    # React.js Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── css/style.css      # Main stylesheet
│   │   └── img/               # All product/category/hero images
│   └── src/
│       ├── App.js             # Main React app with routes
│       ├── index.js
│       ├── context/
│       │   ├── AuthContext.js # Login/logout state management
│       │   └── CartContext.js # Cart state management
│       ├── components/
│       │   ├── Navbar.js      # Navigation bar
│       │   └── Footer.js      # Footer
│       └── pages/
│           ├── Home.js        # Homepage
│           ├── Shop.js        # Product listing with filters
│           ├── Product.js     # Product detail page
│           ├── Cart.js        # Shopping bag
│           ├── Login.js       # Login form
│           ├── Register.js    # Registration form
│           └── Contact.js     # Contact form
└── database/
    ├── db_products.json       # Products database export
    ├── db_users.json          # Users database export
    └── db_orders.json         # Orders database export
```

## 6. API Endpoints

| Method | Route                | Description                          |
|--------|----------------------|--------------------------------------|
| GET    | /api/products        | Get all products (filter by category)|
| GET    | /api/products/:id    | Get single product by ID             |
| POST   | /api/auth/register   | Register new user account            |
| POST   | /api/auth/login      | Login and create session             |
| POST   | /api/auth/logout     | Logout and destroy session           |
| GET    | /api/auth/session    | Check current session status         |
| GET    | /api/cart            | Get current user's cart              |
| POST   | /api/cart            | Add item to cart                     |
| DELETE | /api/cart/:index     | Remove item from cart                |
| POST   | /api/cart/checkout   | Confirm purchase + reduce stock in DB|
| GET    | /api/cart/orders     | Get user's order history             |
| POST   | /api/contact         | Submit contact form                  |
