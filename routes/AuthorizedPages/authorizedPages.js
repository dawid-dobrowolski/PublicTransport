const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var jwt = require('jsonwebtoken');
var connection = require('../../database.js');

router.get('/account',(req, res) => {
    res.render('../views/AuthorizedUserPages/accountManagement');
});

router.get('/myTickets', (req, res) =>{
    var token = req.cookies.SesionCookie;
    var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
    var user_id = decotedInfo.user_id;
    let sql = 'SELECT * FROM ticket WHERE user_user_id = ?'
     connection.query(sql,[user_id], function(err, results){

        if(err){
            throw err
        }

               res.render('../views/AuthorizedUserPages/myTickets.ejs', { data: results, message: ""});


     })

    
});

router.get('/buyTicket',(req, res) => {
    res.render('../views/AuthorizedUserPages/buyTicketAuth');
});

router.get('/timetable',(req, res) => {
    res.render('../views/AuthorizedUserPages/timetableAuth');
});

router.get('/notifications',(req, res) => {
    res.render('../views/AuthorizedUserPages/notifications');
});

router.get('/help',(req, res) => {
    res.render('../views/AuthorizedUserPages/helpSectionAuth');
});

router.get('/stops',(req, res) => {
    res.render('../views/AuthorizedUserPages/stopsAuth');
});

router.get('/news', (req,res) =>{
    res.render('../views/AuthorizedUserPages/newsAuth');
});

router.get('/ticketPrices',(req, res) => {
    res.render('../views/AuthorizedUserPages/ticketPrices');
});

module.exports = router;