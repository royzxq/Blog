var express = require('express');
var router = express.Router();


var restrict = require('../auth/restrict');
var subService = require('../services/subject-service');
var pageService = require('../services/page-service');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/subjects', function(req, res){
	subService.getSubjects(function(err, subs){
		if(err){
			return res.status(500).json({error: "Failed"});
		}
		res.json(subs);
	})
})

router.get('/subjects/:name', function(req, res){
	subService.getSubject(req.params.name, function(err, sub){
		if(err){
			return res.status(500).json({error: "Failed"});
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
	res.render('subjects/create');
});

router.post('/create', function(req, res){
	subService.addSubject(req.body, function(err){
		if (err) {
			return res.status(500).json({error: "Failed"});
		}
		res.render('index');
	});

});

router.get('/update/:name',restrict, function(req, res){
	var vm = {
		name: req.params.name
	}
	res.render('subjects/create', vm);
});

router.post('/update/:name',restrict, function(req,res){
	subService.updateSubject(req.params.name, req.body, function(err){
		if (err) {
			return res.status(500).json({error: "Failed"});
		}
		res.render('index');
	})
});

router.delete('/:name',restrict, function(req ,res){
	subService.deleteSubject(req.params.name, function(err){
		if (err) {
			return res.status(500).json({error: "Failed"});
		}
		res.render('index');
	})
})


module.exports = router;
