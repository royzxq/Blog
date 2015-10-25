var express = require('express');
var passport = require('passport');
var router = express.Router();

var userService = require('../services/user-service');
var config = require('../config');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/create', function(req, res, next){
	res.render('users/create');
});

router.post('/create', function(req, res, next){
	userService.addUser(req.body, function(err){
		if (err) {
			return res.status(500).json({error: "Failed to create user"});
		}
		req.login(req.body, function(err){
			if (err) {
				return res.redirect('/users/create');
			};
			res.redirect('/');
		})

	})
});

router.get('/login', function(req, res, next){
	res.render('users/login');
})

router.post('/login', function(req, res, next){
	if (req.body.rememberMe) {
		req.session.cookie.maxAge = config.cookieMaxAge;
	}
	next();
}, passport.authenticate('local',{
	failureRedirect : 'login',
	successRedirect: '/',
	failureFlash: 'Wrong username or password'
}));

router.get('/logout', function(req, res){
	req.logout();
	res.render('index', {firstName: null});
})

module.exports = router;
