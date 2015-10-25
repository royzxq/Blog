var Page = require('../models/page');
var 
exports.getPages = function(next){
	Page.find({}, function(err,pages){
		if (err) {
			return next(err);
		}
		next(null, pages);
	})
}

exports.getPage = function (title, subject, next) {
	Page.findOne({title: title, subject: subject}, function(err, page){
		if (err) {
			return next(err);
		}
		next(null, page);
	})
}

exports.getPageByTitle = function (title, next) {
	Page.findOne({title: title}, function(err, page){
		if (err) {
			return next(err);
		}
		next(null, page);
	})
}

exports.getPageBySubject = function(subject, next){
	Page.find({subject:subject}, function(err, pages){
		if (err) {
			return next(err);
		}
		next(null, pages);
	})
}

exports.addPage = function(page, next){
	var newPage = new Page({
		title: page.title,
		content: page.content,
		subject: page.subject,
	});
	newPage.save(function(err){
		if (err) {
			return next(err);
		}
		next(null);
	});
}

exports.updatePage = function(title, page, next){
	Page.findOne({title: title}, function(err, p){
		if (err) {
			return next(err);
		}
		p.title = page.title;
		p.subject = page.subject;
		p.content = page.content;
		p.save(function(err){
			if (err) {
				return next(err);
			}	
			next(null);
		})
	})
}

exports.updatePagesSubject = function(pre_subject, subject, next){
	Page.update({subject: pre_subject}, {$set:{subject: subject}}, { multi: true }, function(err, pages){
		if (err) {
			return next(err);
		}
	});
}

exports.deletePage = function(title, next){
	Page.remove({title: title}, function(err){
		if (err) {
			return next(err);
		}
		next(null);
	})
}

exports.deletePagesSubject = function(subject, next){
	Page.remove({subject:subject},function(err){
		if (err) {
			return next(err);
		}
		next(null);
	});
};