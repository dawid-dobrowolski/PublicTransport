const express = require('express');
const authController = require('../controllers/authorizationController');
const router = express.Router();



router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/restart', authController.restart);

module.exports = router;
