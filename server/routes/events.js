const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const eventsController = require('../controllers/eventsController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', eventsController.getAllEvents);
router.get('/:id', eventsController.getEvent);

// Protected routes
router.use(auth);

router.post('/',
  upload.single('featuredImage'),
  [
    body('title').notEmpty().trim(),
    body('description').notEmpty(),
    body('date').notEmpty().isISO8601(),
    body('time').notEmpty(),
    body('location').notEmpty(),
    body('category').notEmpty(),
    body('status').isIn(['draft', 'published'])
  ],
  eventsController.createEvent
);

router.put('/:id',
  upload.single('featuredImage'),
  [
    body('title').notEmpty().trim(),
    body('description').notEmpty(),
    body('date').notEmpty().isISO8601(),
    body('time').notEmpty(),
    body('location').notEmpty(),
    body('category').notEmpty(),
    body('status').isIn(['draft', 'published'])
  ],
  eventsController.updateEvent
);

router.delete('/:id', eventsController.deleteEvent);

module.exports = router;
