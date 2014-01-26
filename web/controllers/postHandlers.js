
/**
 * Module dependencies.
 */
var log=require('npmlog');
var mongoose = require('mongoose')
, Post = require('../data/models/post');
 
    exports.findAll=function(req,res,next){
    	var query=Post.find();
    	query.exec(function(err,posts){
    		if(err)
    			return next(err)
    		if(posts)
    			res.send(posts);
    		else
    			res.send();
    	})
    }

    exports.findById=function(req,res,next){
    	var id=req.params.id;
    	Post.findById(id,function(err,post){
			if(err){
				console.log('in error')
    			return next(err)
			}
    		if(post)
    			res.send(post);
    		else{
    			res.send();
    		}
    	})
    }
    exports.find=function(req,res,next){
    	var query=req.body;
    	var query=Post.find(query);
    	query.exec(function(err,posts){
    		if(err)
    			return next(err)
    		if(posts)
    			res.send(posts);
    		else
    			res.send();
    	})
    }

    exports.create=function(req,res,next){

    	console.log(req.body)
		var newUser = new Post(req.body);
		
		Post.
			findOne({email:newUser.email}).
			exec(function(err,post){
				if(err)
					return next(err)
				if(!post){
					newUser.save(function(err,post){
						if(err) return next(err);
						if(post){
							res.send(post);
						}
					});
				}else{
					res.send('post already exists');
				}
		});

    };
    exports.update=function(req,res,next){
    	var set=req.body;
    	var id=req.params.id;
    	Post.update({_id:id},{$set:set},errorCb);
    }

    exports.upload=function(req,res,next){
        require('fs').readFile(req.files.userimage.path, function (err, data) {
          // ...
          var newPath = __dirname;
          fs.writeFile(newPath, data, function (err) {
            res.redirect("back");
          });
        });
    }

    exports.findByIdAndUpdate=function(req,res,next){
    	var id=req.params.id;

    	Post.findByIdAndUpdate(id,{$set:set},function(err,post){
    		if(err)
    			return next(err);
    		res.send(post);
    	});
    }

    exports.delete=function(req,res,next){
    	var id=req.params.id;
    	Post.remove({_id:id},errorCb);
    }

    function errorCb(err){
    	if(err) return next(err);
    }
