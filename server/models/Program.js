const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String
  },
  imagePublicId: {
    type: String
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Add pre-save hook to set publishedAt date when status changes to published
programSchema.pre('save', function(next) {
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
  next();
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program; 