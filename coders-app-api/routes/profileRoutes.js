const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/coder/:id', profileController.getCoderProfile);
router.get('/manager/:id', profileController.getManagerProfile);
router.put('/coder/:id', profileController.updateCoderProfile);
router.put('/manager/:id', profileController.updateManagerProfile);

module.exports = router;
