import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [msg, setMsg]         = useState('');
  const [msgType, setMsgType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) { setMsg('All fields are required'); setMsgType('error'); return; }
    try {
      const res = await axios.post('/api/contact', { name, email, message });
      setMsg(res.data.message);
      setMsgType('success');
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Failed to send message');
      setMsgType('error');
    }
  };

  return (
    <>
      <h1 className="section-title">Contact Us</h1>
      <div className="contact-page">
        {msg && <div className={`form-message show ${msgType}`}>{msg}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-control">
            <label>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div className="form-control">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" />
          </div>
          <div className="form-control">
            <label>Message</label>
            <textarea rows="6" value={message} onChange={e => setMessage(e.target.value)} placeholder="Your message"></textarea>
          </div>
          <button type="submit" className="btn">Send Message</button>
        </form>
      </div>
    </>
  );
}

export default Contact;
