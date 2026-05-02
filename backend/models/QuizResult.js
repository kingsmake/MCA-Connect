const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    totalQuestions: {
      type: Number,
      default: 5,
    },
    answers: {
      type: [Number],
      default: [],
    },
    suggestion: {
      type: String,
      enum: ['Excellent Fit', 'Good Fit', 'Explore First'],
      required: true,
    },
    percentage: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

quizResultSchema.pre('save', function (next) {
  this.percentage = Math.round((this.score / this.totalQuestions) * 100);
  next();
});

quizResultSchema.index({ createdAt: -1 });

module.exports = mongoose.model('QuizResult', quizResultSchema);
