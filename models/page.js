var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
	title: String,
	subject: String,
	context: String,
	create: {type: Date, default: Date.now},
	update: {type: Date, default: Date.now}
});

var Page = mongoose.model('Page', pageSchema);
module.exports = Page;