'use strict';

var path       = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  port       : process.env.NODE_PORT || 3000,
  database   : {
    host:     'localhost',
    database: 'my_test',
    user:     'root',
    password: '',
    protocol: 'mysql',
    port:     '3306',
    query:    {pool: true}
  }
};

module.exports = settings;