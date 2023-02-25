const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser')

const database = require('./database')
require('dotenv').config();
const path = require('path');
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');
const publicDirectory = path.join(__dirname,'./public');

var app = express();
app.use(cookieParser());
const ejs = require('ejs');

app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(publicDirectory));

app.use('/', require('./routes/UnauthorizedPages/unauthorizedPages'));
app.use('/user', require('./routes/AuthorizedPages/authorizedPages'));
app.use('/admin', require('./routes/AdministratorPages/administratorPages'));
app.use('/auth', require('./routes/AuthorizationPages/authorizationPages'));
app.use('/authorization', require('./routes/authorization'));
app.use('/account', require('./routes/account'));
app.use('/secret', require('./routes/SecretPages/secretPages'));
app.use('/ticket', require('./routes/myTicket'));
app.use('/ticket', require('./routes/ticket'));



app.get('/logout', (req,res) => {
    res.status(200).clearCookie('SesionCookie',{
        path:'/'
    });
    res.render('../views/UnauthorizedUserPages/news');
});

app.listen(3000, function(){
    console.log('App listening on port 3000');
})

app.get("*",(req,res) =>{
    res.render("../views/Common/404");
})