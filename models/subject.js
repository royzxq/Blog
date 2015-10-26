var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var subService = require('../services/subject-service');

var subSchema = new Schema({
	name: String,
	pages: [{
		type: Schema.Types.ObjectId,
		ref: 'Page'
	}]
},{collection: 'subject'});

subSchema.path('name').validate(function (value, next) {
	subService.getSubject(value, function(err, sub){
		if (err) {
			return next(false);
		}
		next(!sub);
	});
}, 'The subject is already existed.');

var Subject = mongoose.model('Subject', subSchema);
module.exports = Subject;