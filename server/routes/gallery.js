const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const galleryController = require('../controllers/galleryController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const albumController = require('../controllers/albumController');
const mongoose = require('mongoose');

// Public routes
router.get('/', galleryController.getAllImages);
router.get('/published', galleryController.getPublishedImages);

// Album routes - MUST BE BEFORE /:id route to avoid conflict
router.get('/albums', (req, res) => {
  try {
    // Check if the Album model exists
    if (!mongoose.models['Album']) {
      return res.json({ data: [] });
    }
    albumController.getAllAlbums(req, res);
  } catch (error) {
    res.json({ data: [] });
  }
});

router.get('/albums/:id', albumController.getAlbum);
router.get('/albums/:id/images', galleryController.getAlbumImages);
router.post('/albums', upload.single('coverImage'), albumController.createAlbum);
router.put('/albums/:id', upload.single('coverImage'), albumController.updateAlbum);
router.delete('/albums/:id', albumController.deleteAlbum);

// Individual image routes - MUST BE AFTER /albums to avoid conflict
router.get('/:id', galleryController.getOne);

// Add these routes before the protected routes
router.get('/albums/:id/images', galleryController.getAlbumImages);

// Protected routes
router.use(auth);

router.post('/',
  upload.single('image'),
  [
    body('title').notEmpty().trim(),
    body('album').optional().isMongoId(),
    body('status').optional().isIn(['private', 'public'])
  ],
  galleryController.create
);

router.put('/:id',
  upload.single('image'),
  [
    body('title').optional().trim(),
    body('album').optional(),
    body('status').optional().isIn(['private', 'public'])
  ],
  galleryController.update
);

router.delete('/:id', galleryController.delete);

// Debug middleware
router.use((req, res, next) => {
  console.log(`Gallery API Request: ${req.method} ${req.originalUrl}`);
  if (req.file) {
    console.log('File received:', req.file.filename);
  } else if (req.method === 'POST' || req.method === 'PUT') {
    console.log('No file in request but method is', req.method);
    console.log('Body keys:', Object.keys(req.body));
  }
  next();
});

module.exports = router;
