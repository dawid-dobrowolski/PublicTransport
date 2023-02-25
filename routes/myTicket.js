const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router.post('/delete', ticketController.deleteTicket);
module.exports = router;
