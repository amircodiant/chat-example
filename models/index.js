'use strict';

var fs        = require('fs');
var path      = require('path');
var orm       = require('orm');
var settings  = require('./../config/settings');

var connection = null;

function setup(db, cb) {

  fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  }).forEach(file => {
      require(path.join(__dirname, file))(orm, db);
  });
  // require('./Person')(orm, db);
  // require('./User')(orm, db);

  return cb(null, db);
}

module.exports = function (cb) {
  if (connection) return cb(null, connection);

  orm.connect(settings.database, function (err, db) {
    if (err) return cb(err);
    console.log('connected database');

    connection = db;
    db.settings.set('instance.returnAllErrors', true);
    setup(db, cb);
  });
};