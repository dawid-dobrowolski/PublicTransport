const jwt = require("jsonwebtoken");
var mysql = require("mysql");

var connection = require('../database.js');


exports.deleteTicket = (req, res) => {
    console.log(req.body);
    const {ticket_id} = req.body;
    console.log(ticket_id);

    connection.query('DELETE  FROM ticket Where ticket_id = ?',[ticket_id], async (error, results) => {

        if(error) console.log(error);
         });
         var token = req.cookies.SesionCookie;
         var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
         var user_id = decotedInfo.user_id;
         let sql = 'SELECT * FROM ticket WHERE user_user_id = ?'
         connection.query(sql,[user_id], function(err, results){
    
            if(err) throw err;
                
                res.render('../views/AuthorizedUserPages/myTickets.ejs', { data: results, message:"Bilet zwrócony"});
         })
    
}



const {stringify} = require("nodemon/lib/utils");
const {response} = require("express");


exports.buyTicket_1 = (req, res) => {

    console.log(req);
    let {radio_a, radio_b, radio_c, line_sign, imie, nazwisko, email, dateofstart} = req.body;

    var token = req.cookies.SesionCookie;
    var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
    var user_id = decotedInfo.user_id;

    var ticket_id = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++ ) {
        ticket_id += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    if(radio_c === 'bilet_na_wszystkie_linie'){
        line_sign = 0;
    }


    connection.query('INSERT INTO ticket SET ?', {ticket_id:ticket_id, ticket_type:radio_a, ticket_date: dateofstart, ticket_period: radio_b,
        ticket_status:"1", ticket_line: line_sign, user_user_id:user_id }, (error, result) => {
        if(error) {
            console.log(error);
        }
        else {
            return res.render('../views/common/loadingsite', {
                register: true
            });
        }
    })
};


exports.buyTicket_Un = (req, res) => {

    //console.log(req.body);
    let {radio_a, radio_b, imie, nazwisko, email} = req.body;


        var ticket_id = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            ticket_id += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        let dateofstart = new Date();
        let day = dateofstart.getDate();
        let month = dateofstart.getMonth() + 1;
        let year = dateofstart.getFullYear();
        let currentDate = `${year}-${month}-${day}`;

        connection.query('INSERT INTO ticket SET ?', {
            ticket_id: ticket_id,
            ticket_type: radio_a,
            ticket_date: currentDate,
            ticket_period: radio_b,
            ticket_status: "1",
            ticket_line: "-1",
            user_user_id: "-1"
        }, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                return res.render('../views/common/loadingsite', {
                    register: true
                });
            }
        });
};

