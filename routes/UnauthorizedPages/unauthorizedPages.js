const express = require('express');
const linesManagementController = require("../../controllers/linesManagementController");
const router = express.Router();

router.get('/',(req, res) => {
    res.render('../views/UnauthorizedUserPages/news');
});
router.get('/news',(req, res) => {
    res.render('../views/UnauthorizedUserPages/news');
});
router.get('/buyTicket',(req, res) => {
    res.render('../views/UnauthorizedUserPages/buyTicketUnauthorized');
});
router.get('/timetable',(req, res) => {
    res.render('../views/UnauthorizedUserPages/timetable');
});
router.get('/stops',(req, res) => {
    res.render('../views/UnauthorizedUserPages/stops');
});
router.get('/help',(req, res) => {
    res.render('../views/UnauthorizedUserPages/helpSection');
});
router.get('/loadingsite', (req,res) =>{
    res.render('../views/Common/loadingsite');
});

router.get('/ticketPricesUn', (req,res) =>{
    res.render('../views/UnauthorizedUserPages/ticketPricesUn');
});




module.exports = router;