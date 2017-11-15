var mysql = require('mysql');
var config = require('../config');

var pool = mysql.createPool({
    connectionLimit : config.options.connectionLimit,
    host            : config.options.host,
    user            : config.user,
    password        : config.password,
    database        : config.database
});

module.exports = pool;