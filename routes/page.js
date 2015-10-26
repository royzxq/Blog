var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');
var pageService = require('../services/page-service');

// router.get('/page/:title', function  (req, res) {
// 	pageService.getPage(req.params.title, function(err, page){
// 		if (err) {
// 			return res.status(500).json({error: "Failed"});
// 		}
// 		res.render('page', page);
// 	});
// });

router.get('/create',restrict, function(req, res, next){
	res.render('pages/create');
})

router.post('/create',restrict, function(req, res, next){

	pageService.addPage(req.body, function(err){
		if (err) {
			return res.status(500).json({error: "Failed to create page"});
		}
		res.redirect('/');
	});
});

router.get('/update/:title',restrict, function(req, res, next){
	var vm = {
		title: req.params.title,
		subject: req.subject,
		content: req.content
	}
	res.render('pages/create', vm);
});

router.post('/update/:title',restrict, function(req, res, next){
	pageService.updatePage(req.params.title, req.body, function(err){
		if (err) {
			return res.status(500).json({error: "Failed to updage page"});
		}
		res.redirect('/subjects/'+req.subject);
	});
});

router.delete('/:title',restrict, function(req, res, next){
	pageService.deletePage(req.params.title, function(err){
		if (err) {
			return res.status(500).json({error: "Failed"});
		}
		res.redirect('/subjects/'+req.subject);
	})
})

module.exports = router;
