const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    default: null
  },
  status: {
    type: String,
    enum: ['private', 'public'],
    default: 'public'
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image; 