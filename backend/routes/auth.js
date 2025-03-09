const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Add this route before the login route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({
      email,
      password,
      role: 'admin'
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;