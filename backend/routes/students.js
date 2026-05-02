const express = require('express');
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');
const auth = require('../middleware/auth');
const router = express.Router();

const validate = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('college').trim().notEmpty().withMessage('College is required'),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('interestLevel')
    .isIn(['Very High', 'High', 'Medium', 'Low'])
    .withMessage('Invalid interest level'),
];

/**
 * POST /api/students
 * Submit student interest form
 */
router.post('/', validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, college, email, phone, interestLevel } = req.body;

    // Check duplicate
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'This email has already been registered.' });
    }

    const student = new Student({ name, college, email, phone, interestLevel });
    await student.save();

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully! We will contact you soon.',
      student: { id: student._id, name: student.name, email: student.email },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save registration. Please try again.' });
  }
});

/**
 * GET /api/students — Admin only
 */
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 50, interest, search } = req.query;
    const query = {};
    if (interest) query.interestLevel = interest;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { college: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Student.countDocuments(query);
    const students = await Student.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, total, page: Number(page), students });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students.' });
  }
});

/**
 * PATCH /api/students/:id — Mark contacted
 */
router.patch('/:id', auth, async (req, res) => {
  try {
    const { contacted, notes } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { ...(contacted !== undefined && { contacted }), ...(notes && { notes }) },
      { new: true }
    );
    if (!student) return res.status(404).json({ error: 'Student not found.' });
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Update failed.' });
  }
});

/**
 * DELETE /api/students/:id — Admin only
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Record deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed.' });
  }
});

module.exports = router;
