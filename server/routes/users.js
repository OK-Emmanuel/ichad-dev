const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const isSuperAdmin = require('../middleware/isSuperAdmin');

// Public routes
router.get('/test', (req, res) => {
  res.json({ message: 'Users router is working!' });
});

// Protected routes - require authentication
router.use(auth);

// Get all users (superadmin only)
router.get('/', isSuperAdmin, userController.getAllUsers);

// Get single user
router.get('/:id', userController.getUser);

// Create new user (superadmin only)
router.post('/',
  isSuperAdmin,
  upload.single('avatar'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['admin', 'editor', 'user']).withMessage('Invalid role')
  ],
  userController.createUser
);

// Update user
router.put('/:id',
  upload.single('avatar'),
  [
    body('name').optional(),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['admin', 'editor', 'user']).withMessage('Invalid role')
  ],
  userController.updateUser
);

// Delete user (superadmin only)
router.delete('/:id', isSuperAdmin, userController.deleteUser);

module.exports = router; 