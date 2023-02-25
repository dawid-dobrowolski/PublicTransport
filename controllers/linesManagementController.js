var mysql = require("mysql");
var connection = require('../database.js');


exports.addLine = (req, res) => {
    if (req.body['line_type'] == "autobus")
        line_type = 0;
    else
        line_type = 1;

    line_numer = req.body['line_number'];
    notifi = 'Sprawdź trasę nowej linii ' + line_numer +'.';

    connection.query('INSERT INTO line VALUES (?,?,?)', [req.body['line_number'], line_type, req.body['stops']], async (error, result) => {
        if (error) console.log(error);
            connection.query("INSERT INTO notification (notification_message,user_id) VALUES (?,-1)", [notifi], async (error, result) => {
            });
    });

    return res.write("OK");

};

exports.editLine = (req, res) => {
    line_numer = req.body['line_number'];
    notifi = "Linia " + line_numer + " zmieniła swoją trasę.";

    connection.query('UPDATE line SET line_type = ?, line_przystanki = ? where line_number = ?', [req.body['line_type'], req.body['stops'], +req.body['line_number']], async (error, result) => {
        if (error) console.log(error);
        connection.query("INSERT INTO notification (notification_message,user_id) VALUES (?,-1)", [notifi], async (error2, result2) => {
        });

    });

    return res.write("OK");
}

exports.deleteLine = (req, res) => {

    line_numer = req.body['line_number'];
    notifi = "Linia " + line_numer + " już dłużej nie kursuje.";

    connection.query('DELETE FROM line WHERE line_number = ?', [+req.body['line_number']], async (error, result) => {
        if (error) console.log(error);
        connection.query("INSERT INTO notification (notification_message,user_id) VALUES (?,-1)", [notifi], async (error2, result2) => {
        });

    });

    return res.write("OK");
};