var Page = require('../models/page');
var Subject = require('../models/subject');
var subjectService = require('../services/subject-service');
exports.getPages = function(next){
	Page.find({}, function(err,pages){
		if (err) {
			return next(err);
		}
		next(null, pages);
	})
}

exports.getPage = function (title, subject, next) {
	
	Subject.findOne({name: subject})
		.populate({
			path: 'pages',
			match: {title: title}
		})
		.exec(function(err, page){
			if (err) {
				return next(err);
			}
			next(null, page);
		});
	
}

exports.getPageByTitle = function (title, next) {
	Page.findOne({title: title}, function(err, page){
		if (err) {
			return next(err);
		}
		next(null, page);
	})
}

exports.getPagesBySubject = function(subject, next){
	
	Subject.findOne({name:subject})
		.populate('pages')
		.exec(function(err, pages){
			if (err) {
			return next(err);
			}
			next(null, pages);
		});
	
}

exports.addPage = function(page, next){
	var newPage = new Page({
		title: page.title,
		content: page.content
	});

	Subject.findOne({name: page.subject})
		.populate('pages')
		.exec(function(err, sub){
			if (err) {
				return next(err);
			}
			newPage.subject = sub._id;
			sub.pages.push(newPage._id);
			newPage.save(function(err){
				if (err) {
					return next(err);
				}
				next(null);
			});
		});
}

// just update page itself, not the subject it belongs to
exports.updatePage = function(title, page, next){
	Page.findOne({title: title}, function(err, p){
		if (err) {
			return next(err);
		}
		p.title = page.title;
		p.content = page.content;
		p.save(function(err){
			if (err) {
				return next(err);
			}	
			next(null);
		});
	})
}

exports.updatePagesSubject = function(pre_subject_id, subject, next){
	Subject.findOne({name: subject}, function(err, sub){
		Page.update({subject: pre_subject_id}, {$set:{subject: sub_id}}, { multi: true }, function(err, pages){
			if (err) {
				return next(err);
			}
		});
	})
}

exports.deletePage = function(title, next){
	Subject.find()
		.populate({
			path: 'pages',
			match: {title: title}
		})
		.exec(function(err, page){
			page.remove(function(err){
				if (err) {
					return next(err);
				}
				next(null);
			});
		});
}

exports.deletePagesSubject = function(subject, next){
	Subject.findOne({name: subject}, function(err, sub){
		if (err) {
			return next(err);
		}
		Page.remove({subject:sub._id}, function(err){
			if (err) {
				return next(err);
			}
			next(null);
		});
	});
};