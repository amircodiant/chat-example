'use strict';

var orm = require('orm');

module.exports =  function(cb) {
  let opts = {
    host:     'localhost',
    database: 'my_test',
    user:     'root',
    password: '',
    protocol: 'mysql',
    port:     '3306',
    query:    {pool: true}
  };
  
  orm.connect(opts, function(err, db) { 
    if (err) return console.error('Connection error: ' + err);
    console.log('connected database');

    db.load("./../models", function (err) {
      // loaded!
      // var User = db.models.user;
      var Person = db.models.person;


      Person.count({ }, function (err, count) {
        console.log("We have %d Does in our db", count);
      });

    });

    // cb(null, db);
  });  
};