const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Video title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    videoUrl: {
      type: String,
      default: '',
    },
    thumbnail: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['Overview', 'Placement', 'Alumni', 'Campus', 'Research', 'Other'],
      default: 'Other',
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

videoSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Video', videoSchema);
