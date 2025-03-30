const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const programsController = require('../controllers/programsController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', programsController.getAllPrograms);
router.get('/:slug', programsController.getProgram);

// Protected routes
router.use(auth);

router.post('/',
  upload.single('featuredImage'),
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('status').isIn(['draft', 'published'])
  ],
  programsController.createProgram
);

router.put('/:id',
  upload.single('featuredImage'),
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('status').isIn(['draft', 'published'])
  ],
  programsController.updateProgram
);

router.delete('/:id', programsController.deleteProgram);

module.exports = router;