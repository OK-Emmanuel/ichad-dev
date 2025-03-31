const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ichad-dev.vercel.app', // Add your frontend URL
  ],
  credentials: true
}));
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
const eventsRoutes = require('./routes/events');
const settingsRoutes = require('./routes/settings');
const pagesRoutes = require('./routes/pages');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/programs', programsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/pages', pagesRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'ICHAD API is running',
    status: 'healthy',
    mongoConnection: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

module.exports = app;