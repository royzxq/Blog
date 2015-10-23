var Page = require('../models/page');

exports.getPages = function(next){
	Page.find({}, function(err,pages){
		if (err) {
			return next(err);
		}
		return next(null, pages);
	})
}

exports.getPage = function (title, next) {
	Page.findOne({title: title}, function(err, page){
		if (err) {
			return next(err);
		}
		return next(null, page);
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

exports.deletePage = function(title, next){
	Page.remove({title: title}, function(err){
		if (err) {
			return next(err);
		}
		next(null);
	})
}