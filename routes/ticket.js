const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();


router.post('/buyTicket', ticketController.buyTicket_1)

router.post('/buyTicketUnauthorized', ticketController.buyTicket_Un)

module.exports = router;