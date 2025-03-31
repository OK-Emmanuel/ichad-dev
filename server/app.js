const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Temporary more permissive CORS for debugging
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

// Add this near your root route
app.get('/api/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({
      message: 'ICHAD API is running',
      status: 'healthy',
      mongoConnection: states[dbState],
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      mongoHost: mongoose.connection.host || 'not connected'
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
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