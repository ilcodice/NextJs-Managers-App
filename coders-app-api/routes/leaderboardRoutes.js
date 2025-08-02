const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const { validateTopK } = require('../middlewares/validators/leaderboardValidator');

router.get('/', leaderboardController.getLeaderboard);
router.get('/top', validateTopK, leaderboardController.getTopKCoders);

module.exports = router;
