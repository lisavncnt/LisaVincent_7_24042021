const express = require('express');
const user_routes = require('./routes/user');
const dotenv = require('dotenv').config();
const mysql = require('mysql');
const { database } = require('./models/connexion.js');
const path = require('path');

const app = express();

// Connect database ****************************************************************************
//database.sync({force: true});

// Set Headers for the API ****************************************************************************
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use('./images', express.static(path.join(__dirname, 'images')));
// Connect to MySQL ****************************************************************************
// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// });

// db.connect((error) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('MySQL Connected...');
//     }
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect Routes
app.use('/auth', user_routes);
// app.use('/dashboard', msg_routes);

module.exports = app;