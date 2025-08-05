const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const { validateChallenge } = require('../middlewares/validators/challengeValidator');
import { updateChallenge } from '../controllers/challengesController.js';


router.post('/', validateChallenge, challengeController.createChallenge);
router.get('/', challengeController.getAllChallenges); 
router.get('/categories/all', challengeController.getAllCategories);
router.get('/:id', challengeController.getChallengeById);
router.put('/api/challenges/:id', updateChallenge);


module.exports = router;
