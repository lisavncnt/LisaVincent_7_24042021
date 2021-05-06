const express = require('express');
const path = require('path');

const app = express();

// Connect database ****************************************************************************
const sequelize = require('./utils/database.js');
sequelize.sync({force: true});

// Connect .env ****************************************************************************
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// Set Headers for the API ****************************************************************************
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Connect to MySQL ****************************************************************************
const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('MySQL Connected...');
    }
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Routes
const user_routes = require('./routes/user');
app.use('/api', user_routes);

module.exports = app;