'use strict';

var orm      = require('orm');
var settings = require('./../config/settings');

var connection = null;

function setup(db, cb) {
  require('./Person')(orm, db);
  require('./User')(orm, db);

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