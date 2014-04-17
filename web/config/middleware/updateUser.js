var User=require('../../data/models/user');

function updateUser(req,res,next){
	console.log('req.body.nick '+req.body.uNick);
    User.findByIdAndUpdate(req.body._id,
    	{$set:{
    			name:req.body.name,
    			uNick:req.body.uNick,
    			nick:req.body.nick}
    	},
    	function(err,user){
			if(err){
				console.log('error in update query '+err);
			    return next(err);
			}
			if(!user)
			    return res.send('Not Found',404);

			console.log('user after update:'+user); 
			req.user=user;

			next();
    	});

}
module.exports=updateUser; 