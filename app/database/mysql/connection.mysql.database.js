var config = require('../config/config')
var mysql = require('mysql');
var pool =  mysql.createPool(config.database.mysql);

module.exports = pool