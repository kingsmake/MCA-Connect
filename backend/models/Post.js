const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title too long'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['News', 'Update', 'Announcement', 'Achievement', 'Event'],
      default: 'News',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    published: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ createdAt: -1 });
postSchema.index({ category: 1 });

module.exports = mongoose.model('Post', postSchema);
