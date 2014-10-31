/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);
app.set('env', 'development');

// Models
var Record  = require('../server/models/record.js');
var Post = require('../server/models/post.js');
var Like  = require('../server/models/like.js');

// Connect to database
var options = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
mongoose.connect('mongodb://narwhaldo:waterford9@ds047950.mongolab.com:47950/impressions', options);


// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;