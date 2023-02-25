var mysql = require("mysql");
const {json} = require("express");
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');
const e = require("express");
var connection = require('../database.js');


exports.addAllTickets= (req, res) => {


    connection.query('UPDATE ticket_price SET ticket_price = ? where ticket_type = ? and ticket_period = ? and ticket_line = ?', [req.body['ticket_price'], req.body['ticket_type'], req.body['ticket_period'], req.body['ticket_lines']], async (error, result) => {

    });

    return res.write("OK");

}
