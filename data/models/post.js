var mongoose=require('mongoose');
var PostSchema=require('../schemas/post');

var post=mongoose.model('Post',PostSchema);

module.exports=post;
