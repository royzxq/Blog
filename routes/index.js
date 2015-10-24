var express = require('express');
var router = express.Router();

// var Subject = require('../models/subject');
var subService = require('../services/subject-service');
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

router.get('/subject/:name', function(req, res){
	subService.getSubject(req.params.name, function(err, sub){
		if(err){
			return res.status(500).json({error: "Failed"});
		}
		res.json(subs);
	})
})


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

router.get('/update/:name', function(req, res){
	var vm = {
		name: req.params.name
	}
	res.render('subjects/create', vm);
});

router.post('/update/:name',function(req,res){
	subService.updateSubject(req.params.name, req.body, function(err){
		if (err) {
			return res.status(500).json({error: "Failed"});
		}
		res.render('index');
	})
});

router.delete('/:name', function(req ,res){
	subService.deleteSubject(req.params.name, function(err){
		if (err) {
			return res.status(500).json({error: "Failed"});
		}
		res.render('index');
	})
})


module.exports = router;
