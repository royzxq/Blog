var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subSchema = new Schema({
	name: String,
	page_title: []
});
var Subject = mongoose.model('Subject', subSchema);
module.exports = Subject;