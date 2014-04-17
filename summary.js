var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var log = require('npmlog');
var Schema=mongoose.Schema; 
var util=require('util');
var config=require('./config/config')[env];
//models
var post = require('./data/models/post');
var account = require('./data/models/account');
mongoose.connect(config.db, function (err) {
	  if (err){ 
	      log.error('Mongodb connection failed');
	      throw err;
	  }
	});
	 var total=0;

    post.find({},function(err,data){
    	if(err)
    		console.log(err)

		data.forEach(function(post) {

        	if(post.likes.count)
        		total+=post.likes.count;
    	});

    	log.info('Todays likes count','%j',total);

	account.findOneAndUpdate({},{$push:{likes:total}},function(err,data){
		if(err) console.log('error'+err);

		process.exit(1);
	})

    });

    

