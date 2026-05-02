const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

/**
 * POST /api/admin/login
 * Admin authentication
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const validUser = username === process.env.ADMIN_USERNAME;
    const validPass = password === process.env.ADMIN_PASSWORD;

    if (!validUser || !validPass) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      token,
      admin: { username, role: 'admin' },
      message: 'Login successful',
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login.' });
  }
});

/**
 * GET /api/admin/verify
 * Verify token validity
 */
router.get('/verify', require('../middleware/auth'), (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

module.exports = router;
