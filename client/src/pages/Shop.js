import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Shop() {
  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const url = category === 'all' ? '/api/products' : `/api/products?category=${category}`;
    axios.get(url)
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [category]);

  const filters = ['all', 'women', 'men', 'kids'];

  return (
    <>
      <h1 className="section-title">All Products</h1>
      <div className="filter-bar">
        {filters.map(f => (
          <button
            key={f}
            className={category === f ? 'active' : ''}
            onClick={() => setSearchParams({ category: f })}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {loading ? (
        <p style={{ textAlign: 'center', padding: '40px' }}>Loading products...</p>
      ) : (
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
      )}
    </>
  );
}

export default Shop;
