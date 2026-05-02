const express = require('express');
const Student = require('../models/Student');
const QuizResult = require('../models/QuizResult');
const Post = require('../models/Post');
const Video = require('../models/Video');
const auth = require('../middleware/auth');
const router = express.Router();

/** GET /api/analytics — Admin only */
router.get('/', auth, async (req, res) => {
  try {
    const [totalStudents, totalQuiz, totalPosts, totalVideos] = await Promise.all([
      Student.countDocuments(),
      QuizResult.countDocuments(),
      Post.countDocuments({ published: true }),
      Video.countDocuments({ published: true }),
    ]);

    // Interest distribution
    const interestDist = await Student.aggregate([
      { $group: { _id: '$interestLevel', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Quiz suggestion distribution
    const quizDist = await QuizResult.aggregate([
      { $group: { _id: '$suggestion', count: { $sum: 1 } } },
    ]);

    // Registrations over last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentStudents = await Student.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Top colleges
    const topColleges = await Student.aggregate([
      { $group: { _id: '$college', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      success: true,
      overview: { totalStudents, totalQuiz, totalPosts, totalVideos },
      interestDistribution: interestDist,
      quizDistribution: quizDist,
      recentRegistrations: recentStudents,
      topColleges,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch analytics.' });
  }
});

module.exports = router;
