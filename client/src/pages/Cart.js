import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Cart() {
  const { cart, removeFromCart, checkout } = useCart();
  const { user }   = useAuth();
  const [msg, setMsg]     = useState('');
  const [msgType, setMsgType] = useState('');

  if (!user) {
    return (
      <div className="empty-cart-msg">
        <p>Please <Link to="/login">log in</Link> to view your bag.</p>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="cart-page">
        <h1 className="section-title">My Bag</h1>
        <div className="empty-cart-msg">
          <p>Your bag is empty.</p>
          <Link to="/shop" className="btn" style={{ marginTop: '16px' }}>Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const total = cart.reduce((sum, i) => sum + i.subtotal, 0);

  const handleCheckout = async () => {
    try {
      const res = await checkout();
      setMsg(res.message + ` | Order Total: $${res.total}`);
      setMsgType('success');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Checkout failed');
      setMsgType('error');
    }
  };

  return (
    <div className="cart-page">
      <h1 className="section-title">My Bag</h1>

      {msg && (
        <div className={`form-message show ${msgType}`}>{msg}</div>
      )}

      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <div className="product-swatch">
            <img src={`/${item.image}`} alt={item.name} />
          </div>
          <div className="cart-item-info">
            <div className="product-name">{item.name}</div>
            <div>Size: {item.size} &nbsp;|&nbsp; Qty: {item.qty}</div>
            <div className="product-price">${item.subtotal.toFixed(2)}</div>
            <button className="cart-item-remove" onClick={() => removeFromCart(index)}>Remove</button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button className="btn" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
