const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = process.env.JWT_SECRET || "aurum_secret_key";

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered', userId: user._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email }, // include name & email
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,        // can't be accessed by JS (secure)
            sameSite: 'lax',       // helps cross-site navigation
            secure: false,         // true if you're using HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ message: 'Login successful', token });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/check-login', (req, res) => {
  const token = req.cookies.token; // read cookie
  if (!token) return res.json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ loggedIn: true, user: decoded });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});

// ---------------- LOGOUT ----------------
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
