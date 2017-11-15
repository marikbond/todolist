var nconf = require('nconf');
var path = require('path');

var environment = process.env.NODE_ENV || 'development';

//TODO +

nconf
    .argv()
    .env()
    .file({file: path.join(__dirname, 'db-config.json')});

module.exports = nconf.get(environment);