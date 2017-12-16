var nconf = require('nconf');
var path = require('path');

var env = process.env.NODE_ENV || 'development';

console.log('environment: ', env);

nconf
    .argv()
    .env()
    .file({file: path.join(__dirname, 'db-config.json')});

module.exports = nconf.get(env);