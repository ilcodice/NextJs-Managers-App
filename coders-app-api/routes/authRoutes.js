const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middlewares/validators/authValidator');

router.post('/register/coder', validateRegistration, authController.registerCoder);
router.post('/register/manager', validateRegistration, authController.registerManager);
router.post('/login/coder', validateLogin, authController.loginCoder);
router.post('/login/manager', validateLogin, authController.loginManager);

module.exports = router;
