const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  coverImage: {
    type: String
  },
  imageCount: {
    type: Number,
    default: 0
  },
  cloudinaryFolder: {
    type: String
  }
}, {
  timestamps: true
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album; 