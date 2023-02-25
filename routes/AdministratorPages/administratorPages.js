const express = require('express');
const linesManagementController = require("../../controllers/linesManagementController");
const ticketPriceController = require("../../controllers/ticketPriceController");
const router = express.Router();

router.get('/editTicketPrice',(req, res) => {
    res.render('../views/AdministratorPages/editTicketPrice');
});

router.post('/editTicketPrice', ticketPriceController.addAllTickets);

router.get('/timetable',(req, res) => {
    res.render('../views/AdministratorPages/timeTableAdmin');
});
router.get('/addNewLine',(req, res) => {
    res.render('../views/AdministratorPages/addNewLine');
});

router.get('/deleteLine',(req, res) => {
    res.render('../views/AdministratorPages/deleteLine');
});

router.post('/deleteLine', linesManagementController.deleteLine);

router.post('/addNewLine', linesManagementController.addLine);

router.get('/editLine',(req, res) => {
    res.render('../views/AdministratorPages/editLine');
});
router.post('/editLine', linesManagementController.editLine);

router.get('/stops',(req, res) => {
    res.render('../views/AdministratorPages/stopsAdmin');
});

router.get('/editOffer',(req, res) => {
    res.render('../views/AdministratorPages/editOffer');
});

module.exports = router;