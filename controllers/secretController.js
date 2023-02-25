var mysql = require("mysql");
const {json} = require("express");
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');
var connection = require('../database.js');


exports.getAllLines = (req, res) => {

    connection.query('SELECT line_number FROM line', async (error, result) => {
        if (error) console.log(error);
        if (result.length > 0) {
            results = "|";
            for (let i = 0; i < result.length; i++) {
                results += result[i].line_number + "|";
            }
            res.write(results);
            res.end();
        }
        else if (!error && result.length == 0) {
            res.end();
        }
    });

};

exports.getStops = (req, res) => {

    let paramString = req.url.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    for (let pair of queryString.entries()) {
        line = pair[1];
    }

    connection.query('SELECT line_przystanki, line_type FROM line WHERE line_number = ?', [line], async (error, result) => {
        if (error) console.log(error);
        const responseData = {
            stops: result[0].line_przystanki,
            lineType: result[0].line_type
        };
        if (result.length > 0) {
            const jsonContent = JSON.stringify(responseData);
            res.write(jsonContent);
            res.end();
        }
    });
};

exports.getNotifi = (req, res) => {
    var token = req.cookies.SesionCookie;
    var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
    console.log(decotedInfo);
    var user_id = decotedInfo.user_id;
    all_users = -1;

    connection.query('SELECT notification_message FROM notification WHERE (user_id = ? or user_id = ?)', [user_id,all_users], async (error, result) => {
        if (error) console.log(error);
        results = "";
        for (let i = 0; i < result.length; i++) {
            if(i == result.length - 1)
                results += result[i].notification_message;
            else
                results += result[i].notification_message + "|";
        }
        res.write(results);
        res.end();
    });
}

exports.getAllBuses = (req, res) => {

    connection.query('SELECT line_number FROM line where line_type = 0', async (error, result) => {
        if (error) console.log(error);
        if (result.length > 0) {
            results = "|";
            for (let i = 0; i < result.length; i++) {
                results += result[i].line_number + "|";
            }
            res.write(results);
            res.end();
        }
        else if (!error && result.length == 0) {
            res.end();
        }
    });

};

exports.getAllTrams = (req, res) => {

    connection.query('SELECT line_number FROM line where line_type = 1', async (error, result) => {
        if (error) console.log(error);
        if (result.length > 0) {
            results = "|";
            for (let i = 0; i < result.length; i++) {
                results += result[i].line_number + "|";
            }
            res.write(results);
            res.end();
        }
        else if (!error && result.length == 0) {
            res.end();
        }
    });

};

