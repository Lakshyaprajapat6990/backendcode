
const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.post('/', reviewsController.createReview);
router.get('/', reviewsController.getAllReviews);

module.exports = router;
