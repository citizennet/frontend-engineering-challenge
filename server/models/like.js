var mongoose = require('mongoose');

var likeSchema = mongoose.Schema({
	id: String,
	name: String,
	category: String,
});

var Like = mongoose.model('Like', likeSchema);
module.exports = Like;