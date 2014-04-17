var User=require('../../data/models/user');

function loadUser(req,res,next){
    console.log(req.params.name);
    User.findOne({_id:req.params.name},function(err,user){
	if(err)
	    return next(err);
	if(!user)
	    return res.send('Not Found',404);
	req.user=user;
	next();
    });

}
module.exports=loadUser;
