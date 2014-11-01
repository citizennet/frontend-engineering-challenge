/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var Record = require('./models/record.js');
var Post = require('./models/post.js');
var Like = require('./models/like.js');

module.exports = function(app) {
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  app.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
  });

  app.get('/records', function(req, res){
    var records = Record.find()
    .limit(20)
    .exec(function(err, records){
      // create the json data for our API endpoint
      res.json({
        records: records
      });
    });

  });

  app.post('/record', function(req, res){
    var id = req.body.id;
    var time = req.body.time;
    var datetime = req.body.date;

    // Create Record object
    var recordObj = new Record({
      id: id,
      time: time,
      date: datetime
    });

    console.log(recordObj);

    // Save the Blazon
    recordObj.save();

  });

  app.post('/post', function(req, res){

    var posts = req.body;

    // Must iterate over posts because there is no bulk saving in Mongoose
    posts.forEach(function(element, index, array){

      // Create Post object with info we find relevant
      var postObj = new Post({
        id:   element.id,
        icon: element.icon,
        description: element.description
      });

      // Save Post Object to DB
      postObj.save();
    });

  });

  app.post('/like', function(req, res){

    var likes = req.body;

    // Must iterate over likes because there is no bulk saving in Mongoose
    likes.forEach(function(element, index, array){
      
      // Create Like Object
      var likeObj = new Like({
        id: element.id,
        name: element.name,
        category: element.category
      })
      
      likeObj.save();
    });

  });



  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
