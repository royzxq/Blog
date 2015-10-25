var bcrypt = require('bcrypt');
var User = require('../models/user');

exports.addUser = function (user, next) {
	bcrypt.hash(user.password,10, function(err, hash){
		if (err) {
			return next(err);
		};
		var newUser = new User({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email.toLowerCase(),
			password: hash
		})
		newUser.save(function(err){
			if (err) {
				return next(err);
			}
			next(null);
		})
	})
}

exports.findUser = function(email, next){
	User.findOne({email:email.toLowerCase()}, function(err, user){
		return next(err, user);
	})
}