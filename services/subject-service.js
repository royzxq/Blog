
var Subject = require('../models/subject');
var pageService = require('../services/page-service');

exports.getSubjects = function (next) {
	Subject.find({})
		.populate('pages')
		.exec(function(err, subs){
			if(err){
				return next(err);
			}
			next(null, subs);
		});
	
}

exports.getSubject = function(name, next){
	Subject.findOne({name: name})
		.populate('pages')
		.exec(function(err, sub){
			if(err){
				return next(err);
			}
			next(null, sub);
		});
}

exports.addSubject = function(sub, next){
	var newSub = new Subject({
		name: sub.name.trim(),
		pages : []
	});

	newSub.save(function(err){
		if(err){
			return next(err);
		}
		next(null);
	})
}

exports.updateSubject = function(name, sub, next){
	Subject.findOne({name: name.trim()}, function(err, subject){
		if (err) {
			return next(err);
		}
		subject.name = sub.name;
		subject.save(function(err){
			if (err) {
				next(err);
			}
			next(null);
		});
	});
}

exports.deleteSubject = function(name, next){
	Subject.remove({name: name}, function(err){
		if (err) {
			return next(err);
		}
		pageService.deletePagesSubject(name, function(err){
			if (err) {
				return next(err);
			}
			next(null);
		})
	});
}