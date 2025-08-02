const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const { validateChallenge } = require('../middlewares/validators/challengeValidator');

router.post('/', validateChallenge, challengeController.createChallenge);
router.get('/', challengeController.getAllChallenges); 
router.get('/:id', challengeController.getChallengeById);
router.get('/categories/all', challengeController.getAllCategories);

module.exports = router;
