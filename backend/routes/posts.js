const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const router = express.Router();

/** GET /api/posts — Public */
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = { published: true };
    if (category) query.category = category;
    const posts = await Post.find(query).sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts.' });
  }
});

/** POST /api/posts — Admin only */
router.post('/', auth, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, content, category, imageUrl } = req.body;
    const post = new Post({ title, content, category: category || 'News', imageUrl: imageUrl || '' });
    await post.save();
    res.status(201).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post.' });
  }
});

/** PATCH /api/posts/:id — Admin only */
router.patch('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ error: 'Post not found.' });
    res.json({ success: true, post });
  } catch (err) {
    res.status(500).json({ error: 'Update failed.' });
  }
});

/** DELETE /api/posts/:id — Admin only */
router.delete('/:id', auth, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Post deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed.' });
  }
});

module.exports = router;
