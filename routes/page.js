var express = require('express');
var router = express.Router();

var pageService = require('../services/page-service');

router.get('/:title', function  (req, res) {
	pageService.getPage(req.params.title, function(err, page){
		if (err) {
			return res.status(500).json({error: "Failed"});
		}
		res.render('page', page);
	});
});

router.get('/create', function(req, res, next){
	res.render('pages/create');
})

router.post('/create', function(req, res, next){
	pageService.addPage(req, function(err){
		if (err) {
			return res.status(500).json({error: "Failed"});
		}
		res.redirect('/subjects/'+req.subject);
	});
});

router.get('/update/:title', function(req, res, next){
	var vm = {}
	res.render('pages/create', vm);
})

router.post('/update/:title', function(req, res, next){
	pageService.updatePage(req.params.title, req, function(err){
		if (err) {
			return res.status(500).json({error: "Failed"});
		}
		res.redirect('/subjects/'+req.subject);
	});
});

router.delete('/:title', function(req, res, next){
	pageService.deletePage(req.params.title, function(err){
		if (err) {
			return res.status(500).json({error: "Failed"});
		}
		res.redirect('/subjects/'+req.subject);
	})
})

module.exports = router;