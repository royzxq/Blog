
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
		next(null, sub);
	})
}

exports.addSubject = function(sub, next){
	var newSub = new Subject({
		name: sub.name,
		page_titles : []
	});

	newSub.save(function(err){
		if(err){
			return next(err);
		}
		next(null);
	})
}

exports.updateSubject = function(name, sub, next){
	Subject.findOne({name: name}, function(err, subject){
		if (err) {
			return next(err);
		}
		subject.name = sub.name,
		subject.page_titles = sub.page_titles;
		subject.save(function(err){
			if (err) {
				next(err);
			}
			next(null);
		})
	})
}

exports.deleteSubject = function(name, next){
	Subject.remove({name: name}, function(err){
		if (err) {
			return next(err);
		}
		next(null);
	})
}