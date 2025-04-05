const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.get('/google-reviews', reviewsController.getGoogleReviews);

module.exports = router;