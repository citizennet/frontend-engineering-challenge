'use strict';

//TODO: Separate out all config settings to an external file.
//TODO: Extract out the routes to an external file

/* Load modules */
var http = require('http')
    , express = require('express')
    , path = require('path')
    , request = require('request')
    , fs = require('fs');


/* Load route files */
var likes = require('./likes/likes-routes.js');
var posts = require('./posts/posts-routes.js');

/* Define the server */
var server = express();

/* Configure the server */
server.set('env', 'development');
server.set('port', 80);

/* Setup Express */
server.use(express.logger('dev'));
server.use(express.bodyParser());
server.use(express.methodOverride());
server.use(express.cookieParser());
//server.use(express.static(path.join(__dirname, '../public')));
server.use(express.favicon());

/* This is the IE cache issue solution for Angular*/
server.use(function (req, res, next) {
    //TODO: move this to a separate file
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 0);
    next();
});

server.use(server.router);

/* API Routes */
server.get('/api/likes', likes.getLikes);
server.get('/api/posts', posts.getPosts);

// Development only. Return a 500 error page.
if ('development' == server.get('env')) {
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

/* Start the HTTP server */
http.createServer(server).listen(server.get('port'), function () {
    console.log('Express HTTP server listening on port ' + server.get('port'));
});

