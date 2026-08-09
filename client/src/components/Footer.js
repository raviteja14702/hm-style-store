import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cols">
        <div>
          <h4>Shop</h4>
          <Link to="/shop?category=women">Women</Link>
          <Link to="/shop?category=men">Men</Link>
          <Link to="/shop?category=kids">Kids</Link>
        </div>
        <div>
          <h4>Customer Service</h4>
          <Link to="/contact">Contact Us</Link>
          <Link to="/cart">My Bag</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <h4>About</h4>
          <a href="#">Sustainability</a>
          <a href="#">Careers</a>
        </div>
      </div>
      <div className="footer-bottom">© 2026 H&M Style Store. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
