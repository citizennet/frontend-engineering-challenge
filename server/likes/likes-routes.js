'use strict';

var fs = require('fs');

exports.getLikes = function(req, res){
    var likes = fs.readFileSync('./cache/likes.json', 'utf8');
    res.send(likes, 200);
};