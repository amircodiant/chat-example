'use strict';
module.exports = function(orm, db){
	db.define('user', {
	  id:      {type: 'serial', key: true}, // the auto-incrementing primary key
	  name:    {type: 'text'},
	  surname: {type: 'text'},
	  age:     {type: 'number'},
	}, {
	    methods : {
	      fullName: function() {
	        return this.name + ' ' + this.surname;
	      }
	    },
	    validations:{
	      name: orm.enforce.unique("name already taken!")
	    }
	});
} 
