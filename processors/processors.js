var mongoose = require('mongoose');

var log = require('npmlog');
log.level = 'info';
log.heading = 'Kue';

var Schema=mongoose.Schema; 

var AnySchema=new Schema({}, { strict: false });

exports.default=function(name,job,done){
    
    var AnyModel=mongoose.model(name,AnySchema);

    log.info('Default processor','Started processing job=%j ',job.id);
   
    var data=job.data;

    var options={upsert:true};

    AnyModel.findOneAndUpdate({id:data.id},data,options,function(err,data){
	if(err){
	    log.error('Default processor','Error while processing %j',job.id);
	}
	if(data){
	    done();
	    log.info('Default Processor','Processed Job id=%j',job.id);
	}
    });
    
}

exports.likesProcessor=function(name,job,done){
    //save to db
    log.verbose('likesProcessor','started processing job=%j',job.id);
    done();
}
