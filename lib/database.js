var mysql = require('mysql');
var config = require(__base + '/config.json');
var logger = require(__lib + '/logger');
var cache = require('memory-cache');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: config.DB.host,
    port: config.DB.port,
    user: config.DB.user,
    password: config.DB.password,
    database: config.DB.database
});