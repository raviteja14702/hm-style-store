import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function Product() {
  const { id }            = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize]   = useState('');
  const [qty, setQty]     = useState(1);
  const [msg, setMsg]     = useState('');
  const [msgType, setMsgType] = useState('');
  const [sizeError, setSizeError] = useState(false);
  const { addToCart }     = useCart();

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setProduct(null));
  }, [id]);

  const handleAddToCart = async () => {
    if (!size) { setSizeError(true); return; }
    setSizeError(false);
    try {
      await addToCart(product.id, size, qty);
      setMsg('Added to your bag!');
      setMsgType('success');
    } catch (err) {
      const error = err.response?.data?.error || 'Please log in to add items';
      setMsg(error);
      setMsgType('error');
    }
    setTimeout(() => setMsg(''), 3000);
  };

  if (!product) return <p style={{ textAlign: 'center', padding: '60px' }}>Loading...</p>;

  return (
    <div className="product-detail">
      <div className="product-swatch">
        <img src={`/${product.image}`} alt={product.name} />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <div className="price">${product.price.toFixed(2)}</div>
        <p className="desc">{product.desc}</p>
        <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '16px' }}>
          In stock: <strong>{product.stock}</strong> items
        </p>

        <div className="form-control">
          <label>Select Size</label>
          <div className="size-selector">
            {['XS','S','M','L','XL'].map(s => (
              <button
                key={s}
                type="button"
                className={size === s ? 'selected' : ''}
                onClick={() => { setSize(s); setSizeError(false); }}
              >{s}</button>
            ))}
          </div>
          {sizeError && <small style={{ color: '#e50010', display: 'block', marginTop: '4px' }}>Please select a size</small>}
        </div>

        <div className="form-control" style={{ maxWidth: '160px' }}>
          <label>Quantity</label>
          <div className="qty-selector">
            <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
            <input type="number" value={qty} readOnly />
            <button type="button" onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
          </div>
        </div>

        <button className="btn" onClick={handleAddToCart}>Add to Bag</button>

        {msg && (
          <p style={{ marginTop: '14px', color: msgType === 'success' ? '#2c8f4d' : '#e50010' }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

export default Product;
