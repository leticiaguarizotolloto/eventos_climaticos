const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'registos_climaticos'
});

module.exports = connection;