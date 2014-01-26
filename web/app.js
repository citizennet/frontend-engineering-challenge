
/**
 * Module dependencies.
 */
 var express = require('express');
 var http = require('http');
 var util=require('util');
 var mongoose = require('mongoose');

 var env = process.env.NODE_ENV || 'development';
//Bootstrapping
var config = require('./config/config')[env];
mongoose.connect(config.db);

var app = express();

// Bootstrap express settings
require('./config/express')(app, config);
// Bootstrap routes
require('./config/routes')(app);
//Runtime excpetion catch to prevent Node to knowck-off
process.on('uncaughtException', function (err) {
	console.error(err);
	console.log("uncaughtException");
});

// Start the app by listening on <port>
app.listen(process.env.PORT || 5000, function(){
	console.log('Express server started on ' + new Date());
	console.log('Express server listening on port ' + app.get('port'));

});

// Expose app
module.exports = app
