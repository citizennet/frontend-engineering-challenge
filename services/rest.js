var rest = require('restler');
var log = require('npmlog');

exports.service=function(api,cb){
   	rest.get(api.options.hostname+api.options.path).on('complete', function(data) {
	    if (data instanceof Error) {
	    log.error('Error: Application will retry in 5 secs', data.message);
	    this.retry(5000); // try again after 5 sec
	  } else {
	      log.verbose(data.data[0]);
	      cb(api,data.data);
	  }
	});
}
