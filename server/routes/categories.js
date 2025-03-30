const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const categoriesController = require('../controllers/categoriesController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', categoriesController.getAllCategories);

// Protected routes
router.use(auth);

router.post('/',
  [
    body('name').notEmpty().trim(),
    body('type').optional().isIn(['gallery'])
  ],
  categoriesController.createCategory
);

router.delete('/:id', categoriesController.deleteCategory);

module.exports = router; 