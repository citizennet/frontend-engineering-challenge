var mongoose=require('mongoose');
var AccountSchema=require('../schemas/account');

var account=mongoose.model('Account',AccountSchema);

module.exports=account;