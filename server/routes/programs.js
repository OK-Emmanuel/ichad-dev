const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const programController = require('../controllers/programController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Debug route to test if programs router is working
router.get('/test', (req, res) => {
  res.json({ message: 'Programs router is working!' });
});

// Public routes
router.get('/', programController.getAllPrograms);
router.get('/:slug', programController.getProgram);

// Protected routes
router.use(auth);

router.post('/',
  upload.single('coverImage'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('status').optional().isIn(['draft', 'published'])
  ],
  programController.createProgram
);

router.put('/:id',
  upload.single('coverImage'),
  [
    body('title').optional(),
    body('content').optional(),
    body('status').optional().isIn(['draft', 'published'])
  ],
  programController.updateProgram
);

router.delete('/:id', programController.deleteProgram);

module.exports = router;