const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const programsRoutes = require('./routes/programs');
const categoriesRoutes = require('./routes/categories');
const galleryRoutes = require('./routes/gallery');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/programs', programsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/gallery', galleryRoutes);

// After importing routes
console.log('Available routes:', app._router.stack.map(r => r.route?.path).filter(Boolean));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Before exporting
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('API endpoints:');
  console.log('- /api/auth');
  console.log('- /api/posts');
  console.log('- /api/programs');
  console.log('- /api/categories');
  console.log('- /api/gallery');
});

// Export app
module.exports = app;