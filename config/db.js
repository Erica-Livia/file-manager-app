const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'erica',
    password: 'ericalivia@2004',
    database: 'file_manager'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

module.exports = connection;
