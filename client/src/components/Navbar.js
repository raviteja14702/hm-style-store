import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount }    = useCart();
  const navigate         = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="top-bar">FREE SHIPPING ON ORDERS OVER $50 &nbsp;|&nbsp; NEW SEASON STYLES JUST DROPPED</div>
      <nav className="main-nav">
        <Link to="/" className="logo">
          <img src="/img/logo/logo.svg" alt="H&M Style Store" className="logo-img" />
        </Link>
        <div className="nav-links">
          <Link to="/shop?category=women">Women</Link>
          <Link to="/shop?category=men">Men</Link>
          <Link to="/shop?category=kids">Kids</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="nav-icons">
          {user ? (
            <>
              <span style={{ fontWeight: 600 }}>Hi, {user.username}</span>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          <Link to="/cart">Bag <span className="cart-count">{cartCount}</span></Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
