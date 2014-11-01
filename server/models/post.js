var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
 	id: String,
 	icon: String,
 	description: String
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;