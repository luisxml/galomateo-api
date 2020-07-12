'use strict'

var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
    server: 'localhost:8080',
    user: 'root',
    password: '',
    database: 'galomateo'
});

// Get recibos por fechas
app.get('/recibos/:desde/:hasta', (req, res, next ) => {

    var desde = req.params.desde;
    var hasta = req.params.hasta;
    desde = desde + ' 00:00';
    hasta = hasta + ' 23:59';
    var lsql = `select *, cast(fecha_devolucion as char(10)) as fhDevolucion, cast(fecha_registro as char(10)) as fhRegistro from recibos_devueltos where (fecha_registro >= '${desde}' and fecha_registro <= '${hasta}')`;

    connection.query(lsql, (err, recibos) => {
        if (err) {
            res.status(500).send({
                ok: false,
                message: 'Erro en la petición.',
                error: err
            });
        } else {
            res.status(200).send({
                ok: true,
                recibos
            });
            // connection.end();
        }
    });
});

// Get recibos por fechas y cliente
app.get('/reccompania/:desde/:hasta/:compania', (req, res, next ) => {

    var desde = req.params.desde;
    var hasta = req.params.hasta;
    var compania = req.params.compania;
    desde = desde + ' 00:00';
    hasta = hasta + ' 23:59';
    var lsql = `select *, cast(fecha_devolucion as char(10)) as fhDevolucion, cast(fecha_registro as char(10)) as fhRegistro from recibos_devueltos where (fecha_registro >= '${desde}' and fecha_registro <= '${hasta}') and compania = '${compania}'`;

    connection.query(lsql, (err, recibos) => {
        if (err) {
            res.status(500).send({
                ok: false,
                message: 'Erro en la petición.',
                error: err
            });
        } else {
            res.status(200).send({
                ok: true,
                recibos
            });
        }
    });
});

// Get cantidad de recibos por fechas y cliente
app.get('/cantidad/:desde/:hasta', (req, res, next ) => {

    var desde = req.params.desde;
    var hasta = req.params.hasta;

    desde = desde + ' 00:00';
    hasta = hasta + ' 23:59';
    var lsql = `SELECT count(nro) cantidad, compania FROM recibos_devueltos where (fecha_registro >= '${desde}' and fecha_registro <= '${hasta}') 
    group by compania 
    order by compania`;
    
    connection.query(lsql, (err, recibos) => {
        if (err) {
            res.status(500).send({
                ok: false,
                message: 'Erro en la petición.',
                error: err
            });
        } else {
            res.status(200).send({
                ok: true,
                recibos
            });
        }
    });
});

// Get cantidad de recibos por fechas y motivo
app.get('/cantidadmot/:desde/:hasta', (req, res, next ) => {

    var desde = req.params.desde;
    var hasta = req.params.hasta;

    desde = desde + ' 00:00';
    hasta = hasta + ' 23:59';
    var lsql = `SELECT count(nro) cantidad, motivo FROM recibos_devueltos where (fecha_registro >= '${desde}' and fecha_registro <= '${hasta}') 
    group by motivo 
    order by motivo`;
    
    connection.query(lsql, (err, recibos) => {
        if (err) {
            res.status(500).send({
                ok: false,
                message: 'Erro en la petición.',
                error: err
            });
        } else {
            res.status(200).send({
                ok: true,
                recibos
            });
        }
    });
});

// Get importe recibos por fechas y compañia
app.get('/importe/:desde/:hasta', (req, res, next ) => {

    var desde = req.params.desde;
    var hasta = req.params.hasta;

    desde = desde + ' 00:00';
    hasta = hasta + ' 23:59';
    var lsql = `SELECT CAST(SUM(REPLACE(REPLACE(importe,'.',''),',','.')) as decimal(18,2)) as importe, compania FROM recibos_devueltos where (fecha_registro >= '${desde}' and fecha_registro <= '${hasta}') 
    group by compania 
    order by compania`;
    
    connection.query(lsql, (err, recibos) => {
        if (err) {
            res.status(500).send({
                ok: false,
                message: 'Erro en la petición.',
                error: err
            });
        } else {
            res.status(200).send({
                ok: true,
                recibos
            });
        }
    });
});

// Get importe recibos por fechas y motivo
app.get('/importemotivo/:desde/:hasta', (req, res, next ) => {

    var desde = req.params.desde;
    var hasta = req.params.hasta;

    desde = desde + ' 00:00';
    hasta = hasta + ' 23:59';
    var lsql = `SELECT CAST(SUM(REPLACE(REPLACE(importe,'.',''),',','.')) as decimal(18,2)) as importe, motivo FROM recibos_devueltos where (fecha_registro >= '${desde}' and fecha_registro <= '${hasta}') 
    group by motivo 
    order by motivo`;
    
    connection.query(lsql, (err, recibos) => {
        if (err) {
            res.status(500).send({
                ok: false,
                message: 'Erro en la petición.',
                error: err
            });
        } else {
            res.status(200).send({
                ok: true,
                recibos
            });
        }
    });
});

module.exports = app;
