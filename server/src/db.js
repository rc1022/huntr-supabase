require('dotenv').config({path:'../.env'});

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})


pool.on('error', (err) => {
    console.error('Pool error', err.message, err.code, err.stack)
})


module.exports = pool;