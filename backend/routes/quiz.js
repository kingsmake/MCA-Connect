const express = require('express');
const { body, validationResult } = require('express-validator');
const QuizResult = require('../models/QuizResult');
const auth = require('../middleware/auth');
const router = express.Router();

/**
 * POST /api/quiz
 * Submit quiz result
 */
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('score').isInt({ min: 0, max: 5 }).withMessage('Score must be 0–5'),
  body('suggestion').isIn(['Excellent Fit', 'Good Fit', 'Explore First']),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, score, answers, suggestion } = req.body;
    const result = new QuizResult({ name, email: email || '', score, answers: answers || [], suggestion });
    await result.save();
    res.status(201).json({ success: true, message: 'Quiz result saved.', result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save quiz result.' });
  }
});

/**
 * GET /api/quiz — Admin only
 */
router.get('/', auth, async (req, res) => {
  try {
    const results = await QuizResult.find().sort({ createdAt: -1 }).limit(200);
    res.json({ success: true, total: results.length, results });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quiz results.' });
  }
});

module.exports = router;
