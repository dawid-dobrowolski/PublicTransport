const jwt = require("jsonwebtoken");
var mysql = require("mysql");

var connection = require('../database.js');



exports.register = (req, res) => {
const {imie,nazwisko,mail, password, repeatedPassword,numerKartyMiejskiej} = req.body;
    if(password != repeatedPassword) {
        return res.render('../views/AuthorizationPages/registration', {
            message: "Hasła się różnią"
        })
    }

    connection.query('SELECT user_email FROM user Where user_email = ?', [mail], async (error, result) => {
        if(error) console.log(error);
        if(result.length > 0) {
            return res.render('../views/AuthorizationPages/registration', {
                message: "Ten mail jest już w użyciu"
            })
        } 

        connection.query('INSERT INTO user SET ?', {user_name:imie, user_surname:nazwisko,user_email:mail, user_password:password, user_mpkNumber:numerKartyMiejskiej}, (error, result) => {
            if(error) {
                console.log(error);
            }
            else {
                return res.render('../views/AuthorizationPages/login', {
                    message: "Użytkownik zarejestrowany",
                    register: true
                });
            }
        })

    });
};

exports.login = (req, res) => {
    
    console.log(req.body);
    const {mail, password} = req.body;
    
    if(mail == "admin" && password == "admin") {
        return res.render('../views/AdministratorPages/editOffer');
    }

    connection.query('SELECT * FROM user Where user_email = ?', [mail], async (error, result) => {
        if(error) console.log(error);
        if(result.length == 0) {
            return res.render('../views/AuthorizationPages/login', {
                message: "Niepoprawny adres email"
            })
         }
        else {
            console.log(result);
            if(result[0].user_password != password) {
                return res.render('../views/AuthorizationPages/login', {
                    message: "Niepoprawne hasło"
                })
            }     
        }
        jwt.sign({user_id:result[0].user_id}, process.env.JWT_KEY, (err,token) =>{
            res.cookie('SesionCookie',token, {httpOnly:false})
        });
        return res.render('../views/AuthorizedUserPages/newsAuth');
    }); 
};

exports.restart = (req, res) => {
    
    const {mail, password, repeatedPassword, numerKartyMiejskiej} = req.body;
    
    connection.query('SELECT * FROM user Where user_email = ?', [mail], async (error, result) => {
        if(error) console.log(error);
        if(result.length == 0) {
            return res.render('../views/AuthorizationPages/restart', {
                message: "Nieprawidłowe dane autoryzacyjne"
            })
         }
        if (result[0].user_mpkNumber != numerKartyMiejskiej) {
            return res.render('../views/AuthorizationPages/restart', {
                message: "Nieprawidłowe dane autoryzacyjne"
            })
        } 
        if(password != repeatedPassword) {
                return res.render('../views/AuthorizationPages/restart', {
                    message: "Hasła się różnią"
                })
            }

            else{
                connection.query('UPDATE user SET user_password = ? WHERE user_email = ? AND user_mpkNumber = ?',
                [password, mail, numerKartyMiejskiej], async (error, result) => {
                    if(error) console.log(error);
                    else{
                        return res.render('../views/AuthorizationPages/login', {
                            message: "Hasło zrestartowane pomyślnie",
                            register: true
                        })
                    }
                }) 
            }
        });
};