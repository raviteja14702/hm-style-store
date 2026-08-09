import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart]           = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await axios.get('/api/cart');
      setCart(res.data);
      setCartCount(res.data.reduce((sum, i) => sum + i.qty, 0));
    } catch { setCart([]); setCartCount(0); }
  };

  useEffect(() => { fetchCart(); }, []);

  const addToCart = async (productId, size, qty) => {
    const res = await axios.post('/api/cart', { productId, size, qty });
    setCart(res.data.cart);
    setCartCount(res.data.cart.reduce((sum, i) => sum + i.qty, 0));
    return res.data;
  };

  const removeFromCart = async (index) => {
    const res = await axios.delete(`/api/cart/${index}`);
    setCart(res.data.cart);
    setCartCount(res.data.cart.reduce((sum, i) => sum + i.qty, 0));
  };

  const checkout = async () => {
    const res = await axios.post('/api/cart/checkout');
    setCart([]);
    setCartCount(0);
    return res.data;
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, fetchCart, addToCart, removeFromCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() { return useContext(CartContext); }
