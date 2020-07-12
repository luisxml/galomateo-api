'use strict'

// Requires
var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var mysql = require('mysql');

var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS ");
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Content-Type', 'text/plain');
    next();
});

// Import Routes
var appRoutes = require('./routes/app');

// Conexion mysql
var connection = mysql.createConnection({
    server: 'localhost:8080',
    user: 'root',
    password: '',
    database: 'galomateo'
});

connection.connect((err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Base de datos: ' + connection.config.database + '\x1b[32m%s\x1b[0m', ' Online');
        // Escuchar peticiones
        app.listen(3000, () => {
            console.log('Express Server Puerto: 3000: \x1b[32m%s\x1b[0m', 'Online');
        });
    }
})

connection.end();

// Routes
app.use('/api/app', appRoutes);


app.use('/api', appRoutes);