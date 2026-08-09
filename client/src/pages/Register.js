import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [username, setUsername]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState('');
  const { register }              = useAuth();
  const navigate                  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !password2) { setError('All fields are required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (password !== password2) { setError('Passwords do not match'); return; }

    try {
      const res = await register(username, email, password);
      setSuccess(res.message);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="form-wrapper">
      <h1>Create Account</h1>
      <p className="subtitle">Join H&M Style Store today</p>

      {error   && <div className="form-message show error">{error}</div>}
      {success && <div className="form-message show success">{success}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-control">
          <label>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Choose a username" />
        </div>
        <div className="form-control">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" />
        </div>
        <div className="form-control">
          <label>Confirm Password</label>
          <input type="password" value={password2} onChange={e => setPassword2(e.target.value)} placeholder="Repeat your password" />
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
      <p className="form-footer">Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}

export default Register;
