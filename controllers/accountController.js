var mysql = require("mysql");
var connection = require('../database.js');
var jwt = require('jsonwebtoken');

exports.updateAccount = (req, res) => {

    var token = req.cookies.SesionCookie;
    var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
    var user_id = decotedInfo.user_id;
        connection.query('UPDATE user SET ? WHERE user_id = ?', [req.body, user_id], (error, result) => {
            if(error) {
                console.log(error);                
            }
            else {
                return res.render('../views/AuthorizedUserPages/accountManagement', {
                    message: "Dane użytkownika zauktualizowane",
                    updated: true
                });}
            })
        }
    exports.deleteAccount = (req, res) => {
                var token = req.cookies.SesionCookie;
                var decotedInfo = jwt.verify(token,process.env.JWT_KEY);
                var user_id = decotedInfo.user_id;
        
                connection.query('DELETE FROM user WHERE user_id = ?', [user_id], (error, result) => {
                    if(error) {
                        console.log(error);                
                    }
                    else {
                        res.status(200).clearCookie('SesionCookie',{
                            path:'/'
                        });
                        return res.render('../views/AuthorizationPages/login', {
                            message: "Konto usunięte",
                        });}
                    })
                }
    