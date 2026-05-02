const express = require('express');
const { body, validationResult } = require('express-validator');
const Video = require('../models/Video');
const auth = require('../middleware/auth');
const router = express.Router();

/** GET /api/videos — Public */
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find({ published: true }).sort({ createdAt: -1 }).limit(12);
    res.json({ success: true, videos });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos.' });
  }
});

/** POST /api/videos — Admin only */
router.post('/', auth, [
  body('title').trim().notEmpty().withMessage('Title is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, description, videoUrl, thumbnail, duration, category } = req.body;
    const video = new Video({ title, description, videoUrl, thumbnail, duration, category: category || 'Other' });
    await video.save();
    res.status(201).json({ success: true, video });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add video.' });
  }
});

/** DELETE /api/videos/:id — Admin only */
router.delete('/:id', auth, async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Video deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed.' });
  }
});

module.exports = router;
