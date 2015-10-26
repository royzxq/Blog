var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageService = require('../services/page-service');

var pageSchema = new Schema({
	title: String,
	subject: {
		type: Schema.Types.ObjectId,
		ref: 'Subject'
	},
	content: String,
	create: {type: Date, default: Date.now},
	update: {type: Date, default: Date.now}
},{collection: "page"});

pageSchema.path('title').validate(function  (value, next) {
	pageService.getPageByTitle(value, function(err, page){
		if (err) {
			return next(false);
		}
		next(!page);
	});
}, 'The page is already existed');

var Page = mongoose.model('Page', pageSchema);
module.exports = Page;