var mongoose = require('mongoose');

var recordSchema = mongoose.Schema({
  date: String,
  time: String,
  id:  	String
});

var Record = mongoose.model('Record', recordSchema);
module.exports = Record;