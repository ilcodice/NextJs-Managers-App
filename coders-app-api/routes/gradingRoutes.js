const express = require('express');
const router = express.Router();
const gradingController = require('../controllers/gradingController');
const { validateSubmission } = require('../middlewares/validators/gradingValidator');

router.post('/', validateSubmission, gradingController.submitCode);

module.exports = router;
