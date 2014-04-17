
var env = process.env.NODE_ENV || 'development';
var log = require('npmlog');

var kue = require('kue'),
redis = require('redis'),
mongoose = require('mongoose'),
service=require('./services/rest').service,
processor=require('./processors/processors'),
config=require('./config/config')[env];

mongoose.connect(config.db, function (err) {
  if (err){ 
      log.error('Mongodb connection failed');
      throw err;
  }
});

log.level = 'info';
log.heading = 'Kue';

kue.redis.createClient = function() {
    var client = redis.createClient(config.redis.port, config.redis.url);
    client.auth(config.redis.password);
    return client;
};

//start the redis web UI at port 3000
kue.app.listen(3000);
log.info('Kue UI  server started listening at 3000'); 

//Create the queue 
var jobs = kue.createQueue();

var apis=config.api;//Get list of API's from config object

//For each API get the response and add jobs to queue  
for( api in apis){
    service(apis[api],function(api,records){
        log.verbose('Kue','Received %j records for %j',records.length,api.name);
	for (record in records){
            jobs.create(api.name,records[record]).save();
        }
	//Process the jobs.This can be a separate application and can be processed 
	//concurrently and using Node Cluster as well.For simplicity we are processing the jobs
	//individually for each API as it finishes adding all the jobs.
	jobs.process(api.name, function(job, done){//For concurrency,invoke jobs.process(api.name,10, functi...
	    processor[api.processor](api.name,job, done);
	});
    });

}

