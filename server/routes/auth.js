const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], authController.login);

router.post('/logout', auth, authController.logout);
router.post('/refresh', authController.refreshToken);
router.get('/me', auth, authController.getCurrentUser);

module.exports = router; 