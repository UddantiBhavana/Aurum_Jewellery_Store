// routes/contact.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

// Create model (avoid redefining)
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(200).json({ success: true, message: 'Message saved successfully!' });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ error: 'Server error while saving message.' });
  }
});

module.exports = router;
