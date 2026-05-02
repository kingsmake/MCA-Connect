const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    college: {
      type: String,
      required: [true, 'College is required'],
      trim: true,
      maxlength: [150, 'College name too long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
      match: [/^[+\d\s\-()]{7,20}$/, 'Please enter a valid phone number'],
    },
    interestLevel: {
      type: String,
      required: [true, 'Interest level is required'],
      enum: ['Very High', 'High', 'Medium', 'Low'],
    },
    source: {
      type: String,
      default: 'Website',
    },
    contacted: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast queries
studentSchema.index({ email: 1 });
studentSchema.index({ interestLevel: 1 });
studentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Student', studentSchema);
