const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.post('/updateAccount', accountController.updateAccount);

router.get('/deleteAccount', accountController.deleteAccount);

module.exports = router;