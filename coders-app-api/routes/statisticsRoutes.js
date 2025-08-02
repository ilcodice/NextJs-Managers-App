const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

router.get('/solved', statisticsController.getSolvedStats);
router.get('/trending', statisticsController.getTrendingCategories);
router.get('/heatmap', statisticsController.getHeatmap);

module.exports = router;
