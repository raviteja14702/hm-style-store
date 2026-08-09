import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data.slice(0, 8)))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <section className="hero">
        <h1>NEW SEASON ARRIVALS</h1>
        <p>Discover the latest styles for Women, Men and Kids at prices you'll love.</p>
        <Link to="/shop" className="btn">Shop Now</Link>
      </section>

      <h2 className="section-title">Shop by Category</h2>
      <div className="categories">
        <Link to="/shop?category=women" className="category-card" style={{ backgroundImage: "url('/img/categories/women.jpg')" }}><span>Women</span></Link>
        <Link to="/shop?category=men"   className="category-card" style={{ backgroundImage: "url('/img/categories/men.jpg')" }}><span>Men</span></Link>
        <Link to="/shop?category=kids"  className="category-card" style={{ backgroundImage: "url('/img/categories/kids.jpg')" }}><span>Kids</span></Link>
      </div>

      <h2 className="section-title">Best Sellers</h2>
      <div className="product-grid">
        {products.map(p => (
          <div key={p.id} className="product-card" onClick={() => navigate(`/product/${p.id}`)}>
            <div className="product-swatch">
              <img src={`/${p.image}`} alt={p.name} loading="lazy" />
            </div>
            <div className="product-name">{p.name}</div>
            <div className="product-price">${p.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
