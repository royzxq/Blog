var app = require('../app');

var should = require('should'),
	supertest = require('supertest');

describe('web', function () {
	it('should return root index', function(done){
		supertest(app)
		.get('/')
		.expect(200)
		.end(function(err, res){
			res.status.should.equal(200);
			done();
		});
	});

	it('should get all subjects', function(done){
		supertest(app)
		.get('/subjects')
		.expect(200)
		.end(function(err,res){
			res.status.should.equal(200);
			done();

		})
	})

	it('should return create page', function(done){
		supertest(app)
		.get('/create')
		.expect(200)
		.end(function(err,res){
			res.status.should.equal(200);
			done();

		})
	})

	it('should return create page page', function(done){
		supertest(app)
		.get('/pages/create')
		.expect(200)
		.end(function(err,res){
			res.status.should.equal(200);
			done();

		})
	})

})