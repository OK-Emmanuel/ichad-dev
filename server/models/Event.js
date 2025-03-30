const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String
  },
  imagePublicId: {
    type: String
  },
  isUpcoming: {
    type: Boolean,
    default: true
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
  },
  registrationLink: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Add pre-save hook to automatically set isUpcoming based on date
eventSchema.pre('save', function(next) {
  this.isUpcoming = new Date(this.date) >= new Date();
  next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event; 