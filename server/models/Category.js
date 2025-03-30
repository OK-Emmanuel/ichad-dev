const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['gallery'], // We can add more types if needed (e.g., 'post', 'event')
    default: 'gallery'
  }
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category; 