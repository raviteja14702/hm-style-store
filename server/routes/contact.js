const express = require('express');
const router  = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: 'All fields are required' });
  console.log('Contact form:', { name, email, message });
  res.json({ message: 'Thank you! Your message has been received.' });
});

module.exports = router;
