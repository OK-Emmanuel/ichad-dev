const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const postsController = require('../controllers/postsController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

console.log('Loading posts routes');

// Public routes - no auth required
router.get('/', postsController.getAllPosts);
router.get('/:slug', postsController.getPost);

// Protected routes - require auth
router.use(auth);

// Handle post creation with optional image
router.post('/', 
  upload.single('featuredImage'),
  [
    body('title')
      .notEmpty().withMessage('Title is required')
      .trim(),
    body('content')
      .notEmpty().withMessage('Content is required'),
    body('status')
      .notEmpty().withMessage('Status is required')
      .isIn(['draft', 'published']).withMessage('Status must be either draft or published')
  ],
  (req, res) => {
    console.log('POST /api/posts - Request received');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    postsController.createPost(req, res);
  }
);

// Handle post update with optional image
router.put('/:id',
  upload.single('featuredImage'),
  [
    body('title').notEmpty().trim(),
    body('content').notEmpty(),
    body('status').isIn(['draft', 'published'])
  ],
  postsController.updatePost
);

router.delete('/:id', postsController.deletePost);

module.exports = router;
