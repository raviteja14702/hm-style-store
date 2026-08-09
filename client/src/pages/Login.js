import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const { login }               = useAuth();
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('All fields are required'); return; }
    try {
      const res = await login(email, password);
      setSuccess(`Welcome back, ${res.username}!`);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="form-wrapper">
      <h1>Login</h1>
      <p className="subtitle">Welcome back to H&M Style Store</p>

      {error   && <div className="form-message show error">{error}</div>}
      {success && <div className="form-message show success">{success}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-control">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <p className="form-footer">Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;
