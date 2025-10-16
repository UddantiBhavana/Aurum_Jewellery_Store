const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    console.log('Incoming order:', req.body); // debug incoming data
    const newOrder = await Order.create(req.body);
    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
});

module.exports = router;
