'use strict';

var fs = require('fs');

exports.getPosts = function(req, res){
    var posts = fs.readFileSync('./cache/posts.json', 'utf8');
    res.send(posts, 200);
};
