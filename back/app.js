const express = require('express');
const user_routes = require('./routes/user');
const post_routes = require('./routes/post');
const img_routes = require('./routes/img');
require('dotenv').config();
const { database } = require('./models/connexion.js');
const path = require('path');

const app = express();

// Set Headers for the API ****************************************************************************
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use('./images', express.static(path.join(__dirname, 'images')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', user_routes);
app.use('/dashboard/messages', post_routes);
app.use('/dashboard/images', img_routes);
// database.sync({force: true});

module.exports = app;