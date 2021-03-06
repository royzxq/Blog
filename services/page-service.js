var Page = require('../models/page');
var Subject = require('../models/subject');

exports.getPages = function(next){
	Page.find({}, function(err,pages){
		if (err) {
			return next(err);
		}
		next(null, pages);
	})
}

exports.getPage = function (title, subject, next) {
	
	Page.find({title: title})
		.populate({
			path: 'subject',
			match: {name: subject}
		})
		.exec(function(err, page) {
		    if (err) {
				return next(err);
			}
			next(null, page[0]);
		});
	
}

exports.getPageByTitle = function (title, next) {
	Page.findOne({title: title})
		.populate('subject')
		.exec(function(err, page){
			if (err) {
				return next(err);
			}
			next(null, page);
		});
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
		content: page.content,
		author: page.author
	});
	if(page.tags){
		page.tags = page.tags.split(',');
		newPage.tags = page.tags;
	}
	Subject.findOne({name: page.subject})
		// .populate('pages')
		.exec(function(err, sub){
			if (err) {
				console.log("Fail to get subject");
				return next(err);
			}
			newPage.subject = sub._id;
			
			sub.pages.push(newPage._id);
			newPage.save(function(err){
				if (err) {
					console.log("fail to save page")
					return next(err);
				}
				Subject.update({_id: sub._id}, {$set:{pages: sub.pages}}, function(err){
					if (err) {
						return next(err);
					}
					next(null);
				});
			});
		});
}

// just update page itself, not the subject it belongs to
exports.updatePage = function(title, page, next){
	Page.findOne({title: title})
		.populate('subject')
		.exec(function(err, p){
			if (err) {
				return next(err);
			}
			p.title = page.title;
			p.content = page.content;
			p.author = page.author;
			var idx = p.subject.pages.indexOf(p);
			if (idx > -1) {
				p.subject.pages.splice(idx,1);
			}
			// p.subject = page.subject;
			if(page.tags){
				page.tags = page.tags.split(',');
				// p.tags = page.tags;
				for(var i = 0; i < page.tags.length; i++){
					p.tags.push(page.tags[i]);
				}
			}
			Subject.findOne({name: page.subject}, function(err, sub){
				if (err) {
					return next(err);
				}
				p.subject = sub;
				sub.pages.push(p._id);
				p.save(function(err){
					if (err) {
						return next(err);
					}	
					
					next(null);	
				});
			});
			
		});

}

exports.updatePagesSubject = function(pre_subject_id, subject, next){
	Subject.findOne({name: subject}, function(err, sub){
		Page.update({subject: pre_subject_id}, {$set:{subject: sub._id}}, { multi: true }, function(err, pages){
			if (err) {
				return next(err);
			}
		});
	})
}

exports.deletePage = function(title, next){
	// Subject.find()
	// 	.populate({
	// 		path: 'pages',
	// 		match: {title: title}
	// 	})
	// 	.exec(function(err, page){
	// 		page.remove(function(err){
	// 			if (err) {
	// 				return next(err);
	// 			}
	// 			next(null);
	// 		});
	// 	});
	Page.findOne({title: title})
		.populate('subject')
		.exec(function(err,page){
			var idx = page.subject.pages.indexOf(page._id);
			if (idx > -1) {
				page.subject.pages.splice(idx,1);	
			};
			page.remove(function(err){
				if (err) {
					return next(err);
				}
				next(null);
			})
		})
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