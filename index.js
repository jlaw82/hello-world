'use strict';

const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv').config();
const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;

// App
const app = express();
app.get('/health',(req,res) => {
    res.send('OK');
});
app.get('/', (req, res) => {
    try {
        let aryDBConn = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS, //ideally to store in kms, retrieved via CI, and inject it
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT
        }
        //console.log('aryDBConn',aryDBConn);
        let con = mysql.createConnection(aryDBConn);
        con.connect();
        con.query('SELECT * FROM test_table', (error, results, fields) => {
            if (error) throw error;
            //console.log(JSON.stringify(results[0].col1));
            let output = results[0].col1;
            console.log(output)
            res.send(output);
        });
        con.end();
        //res.send('200');
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);