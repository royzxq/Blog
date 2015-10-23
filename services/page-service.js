var Page = require('../models/page');

exports.getPage = function (title, next) {
	Page.findOne({title: title}, function(err, page){
		if (err) {
			return next(err);
		}
		return next(null, page);
	})
}