var mongoose = require('mongoose');

var likeSchema = mongoose.Schema({
  any: mongoose.Schema.Types.Mixed
});

var Like = mongoose.model('Like', likeSchema);
module.exports = Like;