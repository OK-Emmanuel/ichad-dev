// Add this at the top of the file for debugging
// console.log('Loading Program model');

const mongoose = require('mongoose');
const slugify = require('slugify');

// console.log('Creating program schema');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  summary: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  coverImage: {
    type: String
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Generate slug from title before saving
programSchema.pre('save', function(next) {
  console.log('Pre-save hook running for program:', this.title);
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    console.log('Generated slug:', this.slug);
  }
  next();
});

console.log('Creating Program model');
const Program = mongoose.model('Program', programSchema);
console.log('Program model created');

module.exports = Program; 