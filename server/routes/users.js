const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const isSuperAdmin = require('../middleware/isSuperAdmin');

// All routes require authentication
router.use(auth);

// Get all users (superadmin only)
router.get('/', isSuperAdmin, usersController.getAllUsers);

// Get single user
router.get('/:id', usersController.getUser);

// Create new user (superadmin only)
router.post('/',
  isSuperAdmin,
  upload.single('avatar'),
  [
    body('name').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('role').isIn(['admin', 'superadmin']),
    body('status').isIn(['active', 'inactive'])
  ],
  usersController.createUser
);

// Update user
router.put('/:id',
  upload.single('avatar'),
  [
    body('name').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('password').optional().isLength({ min: 6 }),
    body('role').optional().isIn(['admin', 'superadmin']),
    body('status').optional().isIn(['active', 'inactive'])
  ],
  usersController.updateUser
);

// Delete user (superadmin only)
router.delete('/:id', isSuperAdmin, usersController.deleteUser);

module.exports = router; 