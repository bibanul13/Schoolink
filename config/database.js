//!!READ THE README.md FILE
const mysql = require('mysql');

//Create connection to Schoolink database
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB
});

module.exports = pool;
