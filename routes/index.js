var express = require('express');
var router = express.Router();


var restrict = require('../auth/restrict');
var subService = require('../services/subject-service');
var pageService = require('../services/page-service');
/* GET home page. */
router.get('/', function(req, res, next) {
	var vm = {
		firstName: req.user ? req.user.firstName : null
	}
  res.render('index', vm);
});

router.get('/subjects', function(req, res){
	subService.getSubjects(function(err, subs){
		if(err){
			return res.status(500).json({error: "Failed to get subjects"});
		}
		res.json(subs);
	})
})

router.get('/subjects/:name', function(req, res){
	subService.getSubject(req.params.name, function(err, sub){
		if(err){
			return res.status(500).json({error: "Failed to get subject"});
		}
		res.json(sub);
	})
})

router.get('/subjects/:name/:title', function(req, res){
	pageService.getPage(req.params.title, req.params.name,function(err, page){
		if (err) {
			return res.status(500).json({error: "Failed to get page"});
		}
		res.json(page);
	});

});

router.get('/create', function(req, res){
	var vm = {
		firstName: req.user ? req.user.firstName : null
	}
	res.render('subjects/create', vm);
});

router.post('/create', function(req, res){
	subService.addSubject(req.body, function(err){
		if (err) {
			return res.status(500).json({error: "Failed"});
		}
		res.redirect('/');
	});

});

router.get('/update/:name',restrict, function(req, res){
	var vm = {
		name: req.params.name,
		firstName: req.user ? req.user.firstName : null
	}
	res.render('subjects/create', vm);
});

router.post('/update/:name',restrict, function(req,res){
	subService.updateSubject(req.params.name, req.body, function(err){
		if (err) {
			return res.status(500).json({error: "Failed"});
		}
		res.redirect('/');
	})
});

router.delete('/:name',restrict, function(req ,res){
	subService.deleteSubject(req.params.name, function(err){
		if (err) {
			return res.status(500).json({error: "Failed"});
		}
		res.redirect('/');
	})
})


module.exports = router;
