'use strict';

/* Load modules */
var http = require('http')
	, express = require('express')
	, path = require('path');



/* Define the server */
var server = express();

/* Configure the server */
server.set('env', 'development');
server.set('port', 8080);


/* Setup Express */
server.use(express.logger('dev'));
server.use(express.bodyParser());
server.use(express.methodOverride());
server.use(express.cookieParser());
server.use(express.static(path.join(__dirname, '../client')));
server.use(express.favicon());

/* Setup Session */
server.use(express.cookieParser());
server.use(express.session({secret: 'HireMe'}));

/* Setup Route Files */ 
var files = require('./routes/files.js');


/* Routes */
server.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '../client/index.html'));
});


server.get('/API/file/',files.download);

/* Start the server */
http.createServer(server).listen(server.get('port'), function () {
    console.log('Express server environment configuration is set for ' + server.get('env'));
    console.log('Express server listening on port ' + server.get('port'));
});
