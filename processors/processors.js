var mongoose = require('mongoose');

var log = require('npmlog');
var Schema=mongoose.Schema; 

var AnySchema=new Schema({}, { strict: false });

exports.default=function(name,job,done){
    
    var AnyModel=mongoose.model(name,AnySchema);
    log.verbose('Default processor','Started processing job=%j ',job.id);
   
    var post=new AnyModel(job.data);
    log.info('data','%j',job.data);
    log.info('model','%j',post);
    post.save(function(err,data){
	if(err){
	    log.error('Default processor','Error while processing %j',job.id);
	    //done(err);
	}
	if(data){
	    done();
	    log.info('Default Processor','Processed Job id=%j',job.id);
	}
    });
    
}

exports.likesProcessor=function(job,done){
    //save to db
    log.verbose('likesProcessor','started processing job=%j',job.id);
    done();
}
