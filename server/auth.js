var passport = require('passport');

exports.authenticate = function(req, res, next){
	
	var auth = passport.authenticate('local', function(err, user){
		req.body.username = req.body.username.toLowerCase();
		if(err){return next(err);}
		if(!user){return res.send({success: false});}
		req.logIn(user, function(err){
			if(err){return next(err);}
			res.send({success: true, user: user});
		})
	})
	
	auth(req, res, next);
}