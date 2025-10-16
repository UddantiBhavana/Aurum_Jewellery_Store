// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: '*',  // allows any frontend
  credentials: true
}));

// Import routes
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const orderRoutes = require('./routes/order');

// Define Product model globally
const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  price: Number
}));

// Connect to MongoDB and initialize DB
const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');

    // Check if products collection has documents
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.create({ name: 'Sample Jewelry', price: 100 });
      console.log('Sample product inserted');
    } else {
      console.log('Products already exist');
    }

    app.use('/api/auth', authRoutes);
    app.use('/api/contact', contactRoutes);
    app.use('/api/orders', orderRoutes);

    // Example route
    app.get('/', (req, res) => {
      res.send('Backend is running and database is ready!');
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();