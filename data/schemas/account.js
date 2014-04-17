var mongoose = require('mongoose')
, Schema = mongoose.Schema;


/**
 * User Schema
 */

var AccountSchema = new Schema({
	users:[Number],
	new_users:[Number],
	likes:[Number],
	new_likes:[Number]
});

module.exports=AccountSchema;