const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const settingsController = require('../controllers/settingsController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public route to get settings
router.get('/', settingsController.getSettings);

// Protected routes
router.use(auth);

router.put('/',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'favicon', maxCount: 1 }
  ]),
  [
    body('siteName').notEmpty().trim(),
    body('siteDescription').notEmpty().trim(),
    body('contactEmail').isEmail(),
    body('contactPhone').optional().trim(),
    body('address').optional().trim(),
    body('socialMedia').optional().isObject(),
    body('footer').optional().isObject(),
    body('seo').optional().isObject(),
    body('appearance').optional().isObject()
  ],
  settingsController.updateSettings
);

module.exports = router;
