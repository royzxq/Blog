
var Subject = require('../models/subject');
// var Page = require('../models/page');

exports.getSubjects = function (next) {
	Subject.find({},function(err, subs){
		if(err){
			return next(err);
		}
		next(null, subs);
	})
}

exports.getSubject = function(name, next){
	Subject.findOne({name: name}, function(err, sub){
		if(err){
			return next(err);
		}
		next(null, subs);
	})
}