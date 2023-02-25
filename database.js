const mysql = require('mysql');
require('dotenv').config()

var connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});


connection.connect(function(err) {
    if (err) throw err;
    // connection.query("CREATE DATABASE IF NOT EXISTS publicTransport", function (err, result) {
    //   if (err) throw err;
    // });
    connection.query("CREATE TABLE IF NOT EXISTS `line` (`line_number` INT NOT NULL,`line_type` TINYINT(1) NOT NULL,`line_przystanki` VARCHAR(1000) NOT NULL,PRIMARY KEY (`line_number`))", function (err, result) {
        if (err) throw err;
    });
    connection.query("CREATE TABLE IF NOT EXISTS `notification` (`notification_id` INT NOT NULL AUTO_INCREMENT,`notification_message` VARCHAR(1000) NOT NULL,`user_id` INT NOT NULL,PRIMARY KEY (`notification_id`))", function (err, result) {
        if (err) throw err;
    });
    connection.query("CREATE TABLE IF NOT EXISTS `user` (`user_id` INT NOT NULL AUTO_INCREMENT,`user_name` VARCHAR(45) NOT NULL,`user_surname` VARCHAR(45) NOT NULL,`user_email` VARCHAR(50) NOT NULL,`user_password` VARCHAR(32) NOT NULL,`user_mpkNumber` VARCHAR(45) NOT NULL,PRIMARY KEY (`user_id`))", function (err, result) {
        if (err) throw err;
    });
    connection.query("CREATE TABLE IF NOT EXISTS `ticket` (`ticket_id` VARCHAR(45) NOT NULL,`ticket_type` TINYINT(1) NOT NULL,`ticket_date` DATE NOT NULL,`ticket_period` INT NOT NULL,`ticket_status` TINYINT(1) NULL DEFAULT NULL,`ticket_line` INT NULL DEFAULT NULL,`user_user_id` INT NOT NULL,PRIMARY KEY (`ticket_id`))", function (err, result) {
        if (err) throw err;
    });
    connection.query("CREATE TABLE IF NOT EXISTS `ticket` (`ticket_id` VARCHAR(45) NOT NULL,`ticket_type` TINYINT(1) NOT NULL,`ticket_date` DATE ,`ticket_period` INT ,`ticket_status` TINYINT(1) NULL DEFAULT NULL,`ticket_line` INT NULL DEFAULT NULL ,`user_user_id` INT ,PRIMARY KEY (`ticket_id`))", function (err, result) {
        if (err) throw err;
    });
    connection.query("CREATE TABLE IF NOT EXISTS `ticket_price` (`ticket_number` INT NOT NULL,`ticket_type` TINYINT(1) NOT NULL,`ticket_price` INT NOT NULL,`ticket_period` INT NOT NULL,`ticket_line` INT NULL DEFAULT NULL,PRIMARY KEY (`ticket_number`))", function (err, result) {
        if (err) throw err;
    });

    // let prices = [
    //     [1, 0, 13, 3, 0], [2, 0, 13, 3, 1], [3, 1, 15, 3, 0], [4, 1, 15, 3, 1], [5, 0, 21, 7, 0], [6, 0, 21, 7, 1], [7, 1, 74, 1, 1], [8, 1, 95, 1, 0], [9, 0, 95, 1, 1], [10, 0, 95, 1, 0], [11, 0, 150, 2, 0], [12, 0, 120, 2, 1],
    //     [13, 1, 180, 2, 0], [14, 1, 150, 2, 1], [15, 0, 320, 5, 0], [16, 0, 280, 5, 1], [17, 1, 360, 5, 0], [18, 1, 320, 5, 1]
    // ];
    // let lines = [
    //     [1,0,'Wesoła|Miodowa|Stare Miasto|Elektrociepłownia|Dworzec Główny'],
    //     [2,0,'Muzeum Narodowe|Łącznik|Galeria Świat|Bagatela|Bohaterów Polskich'],
    //     [3,0,'Teatr Główny|Park Miejski|Targ'],
    //     [100,1,'Deszczowa|Stacja podziemna|Kabel|M2'],
    //     [101,1,'Wiślana|Plac Nowy|Słomiana|R2'],
    //     [102,1,'Torowa|Opaczności|Nowy Świat|Zarzecze']
    // ];
    
    // connection.query("INSERT INTO ticket_price(ticket_number, ticket_type, ticket_price, ticket_period, ticket_line) VALUES ?", [prices], async (error, result) => {
    //     if (error) throw error;
    // });
    // connection.query("INSERT INTO line(line_number, line_type, line_przystanki) VALUES ?", [lines], async (error, result) => {
    //     if (error) throw error;
    // });
  });

module.exports = connection;

